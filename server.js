const { createClient } = require('@supabase/supabase-js');

// 辅助函数：统一返回 JSON 并处理 CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

// ========== Worker 入口 ==========
export default {
  async fetch(request, env, ctx) {
    // 1. 处理跨域预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;
    const parts = path.split('/').filter(Boolean); // 例如 /api/user/admin -> ['api', 'user', 'admin']

    // 2. 初始化 Supabase（从环境变量读取）
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

    try {
      // ========== 用户相关 ==========
      if (path === '/api/register' && method === 'POST') {
        const { username, password } = await request.json();
        // 检查是否存在
        const { data: exist } = await supabase.from('users').select('username').eq('username', username).single();
        if (exist) return jsonResponse({ success: false, message: '用户已存在' }, 400);
        
        const { error } = await supabase.from('users').insert({ username, password, balance: 0 });
        if (error) throw error;
        return jsonResponse({ success: true, message: '注册成功' });
      }

      if (path === '/api/login' && method === 'POST') {
        const { username, password } = await request.json();
        const { data: user, error } = await supabase.from('users').select('*').eq('username', username).single();
        if (error || !user || user.password !== password) {
          return jsonResponse({ success: false, message: '账号或密码错误' }, 401);
        }
        await supabase.from('users').update({ last_login: new Date().toISOString() }).eq('username', username);
        return jsonResponse({ success: true, username, balance: user.balance, avatar: user.avatar || '' });
      }

      if (path === '/api/users' && method === 'GET') {
        const { data: users, error } = await supabase.from('users').select('*');
        if (error) throw error;
        const result = users.map(u => ({
          username: u.username,
          password: u.password,
          balance: u.balance,
          lastLogin: u.last_login,
          lastResetTime: u.last_reset_time,
          avatar: u.avatar || ''
        }));
        return jsonResponse(result);
      }

      // 匹配 /api/user/:username (PUT)
      if (parts[1] === 'user' && parts[2] && method === 'PUT') {
        const username = parts[2];
        const body = await request.json();
        const updates = {};
        if (body.balance !== undefined) updates.balance = body.balance;
        if (body.avatar !== undefined) updates.avatar = body.avatar;
        
        const { error } = await supabase.from('users').update(updates).eq('username', username);
        if (error) throw error;
        return jsonResponse({ success: true });
      }

      // 匹配 /api/user/:username/reset (POST)
      if (parts[1] === 'user' && parts[2] && parts[3] === 'reset' && method === 'POST') {
        const username = parts[2];
        if (username === 'admin') return jsonResponse({ success: false, message: '不能重置管理员密码' }, 403);
        
        const { data: user } = await supabase.from('users').select('last_reset_time').eq('username', username).single();
        if (!user) return jsonResponse({ success: false, message: '用户不存在' }, 404);
        
        if (user.last_reset_time) {
          const diff = new Date() - new Date(user.last_reset_time);
          if (diff < 24 * 60 * 60 * 1000) {
            return jsonResponse({ success: false, message: '该用户24小时内已被重置过，请稍后再试' }, 429);
          }
        }
        await supabase.from('users').update({ password: 'gy123456', last_reset_time: new Date().toISOString() }).eq('username', username);
        return jsonResponse({ success: true, message: '密码已重置为 gy123456' });
      }

      // 匹配 /api/user/:username (DELETE)
      if (parts[1] === 'user' && parts[2] && method === 'DELETE') {
        const username = parts[2];
        if (username === 'admin') return jsonResponse({ success: false, message: '不能删除管理员' }, 403);
        await supabase.from('users').delete().eq('username', username);
        return jsonResponse({ success: true });
      }

      // ========== 签到 ==========
      if (parts[1] === 'signin' && parts[2]) {
        const username = parts[2];
        const today = new Date().toISOString().split('T')[0];
        
        if (method === 'GET') {
          let { data: record } = await supabase.from('signin').select('*').eq('username', username).single();
          if (!record) {
            await supabase.from('signin').insert({ username, date: today, attempts: 2, signed: false });
            return jsonResponse({ date: today, attempts: 2, signed: false });
          }
          if (record.date !== today) {
            await supabase.from('signin').update({ date: today, attempts: 2, signed: false }).eq('username', username);
            return jsonResponse({ date: today, attempts: 2, signed: false });
          }
          return jsonResponse(record);
        }
        
        if (method === 'POST') {
          const body = await request.json();
          const updates = {};
          if (body.attempts !== undefined) updates.attempts = body.attempts;
          if (body.signed !== undefined) updates.signed = body.signed;
          // 确保日期更新
          updates.date = today;
          await supabase.from('signin').upsert({ username, ...updates, date: today });
          return jsonResponse({ success: true });
        }
      }

      // ========== 站车风采 ==========
      if (path === '/api/scenery') {
        if (method === 'GET') {
          const { data, error } = await supabase.from('scenery').select('*').order('id');
          if (error) throw error;
          return jsonResponse(data);
        }
        if (method === 'POST') {
          const { icon, name, desc } = await request.json();
          const { data, error } = await supabase.from('scenery').insert({ icon, name, desc }).select().single();
          if (error) throw error;
          return jsonResponse({ success: true, item: data });
        }
      }

      if (parts[1] === 'scenery' && parts[2]) {
        const id = parseInt(parts[2]);
        if (method === 'PUT') {
          const { icon, name, desc } = await request.json();
          const { error } = await supabase.from('scenery').update({ icon, name, desc }).eq('id', id);
          if (error) throw error;
          return jsonResponse({ success: true });
        }
        if (method === 'DELETE') {
          const { error } = await supabase.from('scenery').delete().eq('id', id);
          if (error) throw error;
          return jsonResponse({ success: true });
        }
      }

      // ========== 订单管理 ==========
      if (parts[1] === 'orders' && parts[2] && method === 'GET') {
        const username = parts[2];
        const today = new Date().toISOString().split('T')[0];
        const { data, error } = await supabase.from('orders').select('*').eq('username', username).eq('date', today);
        if (error) throw error;
        return jsonResponse(data);
      }

      if (path === '/api/order' && method === 'POST') {
        const { username, from, to, fare, lines, path: orderPath } = await request.json();
        if (!username || !from || !to || fare === undefined) return jsonResponse({ success: false, message: '参数不全' }, 400);
        
        const { data: user } = await supabase.from('users').select('balance').eq('username', username).single();
        if (!user) return jsonResponse({ success: false, message: '用户不存在' }, 404);
        if (user.balance < fare) return jsonResponse({ success: false, message: '余额不足' }, 400);

        // 扣减余额
        await supabase.from('users').update({ balance: user.balance - fare }).eq('username', username);
        
        // 清理今日之前的旧订单
        const today = new Date().toISOString().split('T')[0];
        await supabase.from('orders').delete().eq('username', username).neq('date', today);

        // 插入新订单
        const newOrder = { id: Date.now(), username, from, to, fare, lines, path: orderPath, date: today };
        const { error } = await supabase.from('orders').insert(newOrder);
        if (error) throw error;
        return jsonResponse({ success: true, message: '购票成功', order: newOrder });
      }

      // ========== 模拟驾驶 ==========
      if (path === '/api/scores' && method === 'POST') {
        const { username, map, score, elapsed, finishedAt } = await request.json();
        if (!username || !map || score === undefined || elapsed === undefined) return jsonResponse({ success: false, message: '参数不全' }, 400);
        if (map !== 'normal' && map !== 'express') return jsonResponse({ success: false, message: '无效的地图类型' }, 400);
        
        const record = {
          id: Date.now() + Math.floor(Math.random() * 1000),
          username, map, score: Number(score), elapsed: Number(elapsed),
          finished_at: finishedAt || new Date().toISOString(), created_at: new Date().toISOString()
        };
        await supabase.from('scores').insert(record);
        
        // 限制每用户 200 条（删除最旧的）
        const { data: userScores } = await supabase.from('scores').select('id').eq('username', username).order('finished_at', { ascending: false });
        if (userScores && userScores.length > 200) {
          const toDelete = userScores.slice(200).map(s => s.id);
          await supabase.from('scores').delete().in('id', toDelete);
        }
        return jsonResponse({ success: true, record });
      }

      if (path === '/api/leaderboard' && method === 'GET') {
        const map = url.searchParams.get('map');
        const limit = parseInt(url.searchParams.get('limit') || '20');
        let query = supabase.from('scores').select('*');
        if (map) query = query.eq('map', map);
        const { data: scores, error } = await query;
        if (error) throw error;
        
        // 排序：分数降序，同分用时短优先
        scores.sort((a, b) => b.score !== a.score ? b.score - a.score : a.elapsed - b.elapsed);
        const byUser = new Map();
        for (const s of scores) {
          if (!byUser.has(s.username)) byUser.set(s.username, s);
        }
        const result = Array.from(byUser.values()).slice(0, limit).map(s => ({
          player: s.username, score: s.score, elapsed: s.elapsed, finishedAt: s.finished_at, map: s.map
        }));
        return jsonResponse(result);
      }

      if (path === '/api/history' && method === 'GET') {
        const username = url.searchParams.get('username');
        const limit = parseInt(url.searchParams.get('limit') || '30');
        if (!username) return jsonResponse([]);
        const { data, error } = await supabase.from('scores').select('*').eq('username', username).order('finished_at', { ascending: false }).limit(limit);
        if (error) throw error;
        const result = data.map(s => ({ map: s.map, score: s.score, elapsed: s.elapsed, finishedAt: s.finished_at }));
        return jsonResponse(result);
      }

      // 404
      return jsonResponse({ error: 'Not Found' }, 404);
    } catch (err) {
      console.error('Server Error:', err);
      return jsonResponse({ error: err.message || 'Internal Server Error' }, 500);
    }
  }
};
