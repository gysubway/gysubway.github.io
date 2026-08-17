const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const DB_PATH = './db.json';
const RESET_PASSWORD = 'gy123456';
const RESET_COOLDOWN_HOURS = 24;

// 初始化数据库
function initDB() {
    if (!fs.existsSync(DB_PATH)) {
        const defaultData = {
            users: {
                admin: { 
                    password: 'gysubway2026', 
                    balance: 1000000,
                    lastLogin: null,
                    resetTime: null
                }
            },
            scenery: [
                { id: 1, icon: '🏛️', name: '固原站', desc: '固原地铁1号线起点站，集交通、商业、文化于一体的综合枢纽，日均客流量超10万人次。' },
                { id: 2, icon: '🏙️', name: '人民广场站', desc: '位于城市核心区，2号线与3号线换乘站，毗邻市政府与商业中心，是城市最繁忙的站点之一。' },
                { id: 3, icon: '🌳', name: '古雁岭站', desc: '4号线站点，毗邻古雁岭生态公园，车站设计融入自然元素，被誉为"最美地铁站"。' },
                { id: 4, icon: '🚄', name: 'CRH380 系列', desc: '高速动车组，最高运营时速380km/h，中国高铁的标杆车型，安全、舒适、快捷。' },
                { id: 5, icon: '🚇', name: '固原地铁 A 型车', desc: '6节编组，最高时速80km/h，采用永磁同步电机与节能空调，绿色环保，噪音更低。' },
                { id: 6, icon: '🛤️', name: '智慧运维系统', desc: '基于大数据与AI的列车智能运维平台，实时监测车辆状态，保障运营安全可靠。' }
            ],
            signinData: {}
        };
        fs.writeFileSync(DB_PATH, JSON.stringify(defaultData, null, 2));
    } else {
        // 兼容旧数据：为已有用户补充缺失字段
        const db = readDB();
        let needWrite = false;
        Object.keys(db.users).forEach(name => {
            const user = db.users[name];
            if (!user.hasOwnProperty('lastLogin')) {
                user.lastLogin = null;
                needWrite = true;
            }
            if (!user.hasOwnProperty('resetTime')) {
                user.resetTime = null;
                needWrite = true;
            }
        });
        if (needWrite) writeDB(db);
    }
}

function readDB() {
    const data = fs.readFileSync(DB_PATH);
    return JSON.parse(data);
}

function writeDB(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

initDB();

// ===== API 路由 =====

// 注册
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    const db = readDB();
    if (db.users[username]) {
        return res.status(400).json({ success: false, message: '用户已存在' });
    }
    db.users[username] = { 
        password, 
        balance: 0,
        lastLogin: null,
        resetTime: null
    };
    writeDB(db);
    res.json({ success: true, message: '注册成功' });
});

// 登录（记录最近登录时间）
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const db = readDB();
    const user = db.users[username];
    if (!user || user.password !== password) {
        return res.status(401).json({ success: false, message: '账号或密码错误' });
    }
    // 更新最后登录时间
    user.lastLogin = new Date().toISOString();
    writeDB(db);
    res.json({ success: true, username, balance: user.balance });
});

// 获取所有用户（管理员可见完整信息）
app.get('/api/users', (req, res) => {
    const db = readDB();
    const users = Object.keys(db.users).map(name => ({
        username: name,
        password: db.users[name].password,
        balance: db.users[name].balance,
        lastLogin: db.users[name].lastLogin || null,
        resetTime: db.users[name].resetTime || null
    }));
    res.json(users);
});

// 更新用户（仅允许管理员修改余额，密码通过重置接口修改）
app.put('/api/user/:username', (req, res) => {
    const { username } = req.params;
    const { balance } = req.body;
    const db = readDB();
    if (!db.users[username]) {
        return res.status(404).json({ success: false, message: '用户不存在' });
    }
    if (balance !== undefined) {
        if (typeof balance !== 'number' || balance < 0) {
            return res.status(400).json({ success: false, message: '余额必须为非负数字' });
        }
        db.users[username].balance = balance;
        writeDB(db);
    }
    res.json({ success: true });
});

// 删除用户（不能删 admin）
app.delete('/api/user/:username', (req, res) => {
    const { username } = req.params;
    if (username === 'admin') {
        return res.status(403).json({ success: false, message: '不能删除管理员' });
    }
    const db = readDB();
    if (!db.users[username]) {
        return res.status(404).json({ success: false, message: '用户不存在' });
    }
    delete db.users[username];
    writeDB(db);
    res.json({ success: true });
});

// 重置密码（管理员专用，24h冷却）
app.post('/api/reset-password/:username', (req, res) => {
    const { username } = req.params;
    const { adminUser } = req.body;   // 验证管理员身份
    if (adminUser !== 'admin') {
        return res.status(403).json({ success: false, message: '权限不足，仅管理员可重置密码' });
    }
    if (username === 'admin') {
        return res.status(403).json({ success: false, message: '不能重置管理员密码' });
    }
    const db = readDB();
    const user = db.users[username];
    if (!user) {
        return res.status(404).json({ success: false, message: '用户不存在' });
    }
    // 检查冷却时间
    const now = Date.now();
    const lastReset = user.resetTime ? parseInt(user.resetTime) : 0;
    const hoursDiff = (now - lastReset) / (1000 * 60 * 60);
    if (hoursDiff < RESET_COOLDOWN_HOURS && lastReset !== 0) {
        const remaining = Math.ceil(RESET_COOLDOWN_HOURS - hoursDiff);
        return res.status(429).json({ 
            success: false, 
            message: `距离上次重置不足 ${RESET_COOLDOWN_HOURS} 小时，请等待 ${remaining} 小时后重试` 
        });
    }
    // 重置密码
    user.password = RESET_PASSWORD;
    user.resetTime = String(now);
    writeDB(db);
    res.json({ success: true, message: `密码已重置为 ${RESET_PASSWORD}` });
});

// 签到相关（保持不变）
app.get('/api/signin/:username', (req, res) => {
    const { username } = req.params;
    const db = readDB();
    const today = new Date().toISOString().split('T')[0];
    if (!db.signinData[username]) {
        db.signinData[username] = { date: today, attempts: 2, signed: false };
        writeDB(db);
    }
    const data = db.signinData[username];
    if (data.date !== today) {
        data.date = today;
        data.attempts = 2;
        data.signed = false;
        writeDB(db);
    }
    res.json(data);
});

app.post('/api/signin/:username', (req, res) => {
    const { username } = req.params;
    const { attempts, signed } = req.body;
    const db = readDB();
    const today = new Date().toISOString().split('T')[0];
    if (!db.signinData[username]) {
        db.signinData[username] = { date: today, attempts: 2, signed: false };
    }
    if (db.signinData[username].date !== today) {
        db.signinData[username] = { date: today, attempts: 2, signed: false };
    }
    if (attempts !== undefined) db.signinData[username].attempts = attempts;
    if (signed !== undefined) db.signinData[username].signed = signed;
    writeDB(db);
    res.json({ success: true });
});

// 站车风采（保持不变）
app.get('/api/scenery', (req, res) => {
    const db = readDB();
    res.json(db.scenery);
});

app.post('/api/scenery', (req, res) => {
    const { icon, name, desc } = req.body;
    const db = readDB();
    const maxId = db.scenery.reduce((max, item) => Math.max(max, item.id), 0);
    const newItem = { id: maxId + 1, icon, name, desc };
    db.scenery.push(newItem);
    writeDB(db);
    res.json({ success: true, item: newItem });
});

app.put('/api/scenery/:id', (req, res) => {
    const { id } = req.params;
    const { icon, name, desc } = req.body;
    const db = readDB();
    const idx = db.scenery.findIndex(item => item.id === parseInt(id));
    if (idx === -1) {
        return res.status(404).json({ success: false, message: '未找到' });
    }
    db.scenery[idx] = { ...db.scenery[idx], icon, name, desc };
    writeDB(db);
    res.json({ success: true });
});

app.delete('/api/scenery/:id', (req, res) => {
    const { id } = req.params;
    const db = readDB();
    db.scenery = db.scenery.filter(item => item.id !== parseInt(id));
    writeDB(db);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`🚇 固原地铁后端已启动，端口 ${PORT}`);
});
