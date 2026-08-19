const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const DB_PATH = './db.json';

function initDB() {
    if (!fs.existsSync(DB_PATH)) {
        const defaultData = {
            users: {
                admin: {
                    password: 'gysubway2026',
                    balance: 1000000,
                    lastLogin: null,
                    lastResetTime: null,
                    avatar: '👤'                 // 新增默认头像
                }
            },
            scenery: [
                { id: 1, icon: '🏛️', name: '固原站', desc: '固原地铁1号线起点站，集交通、商业、文化于一体的综合枢纽，日均客流量超10万人次。' },
                { id: 2, icon: '🏙️', name: '人民广场站', desc: '位于城市核心区，2号线与3号线换乘站，毗邻市政府与商业中心，是城市最繁忙的站点之一。' },
                { id: 3, icon: '🌳', name: '古雁岭站', desc: '4号线站点，毗邻古雁岭生态公园，车站设计融入自然元素，被誉为"最美地铁站"。' },
                { id: 4, icon: '🎙️', name: '丹尼尔模仿器', desc: '在部分站点设有丹尼尔低音炮模仿器，AI根据声音、动作、着装多方面评定相似度。' },
                { id: 5, icon: '🚇', name: '固原地铁 A 型车', desc: '6节编组，最高时速80km/h，采用永磁同步电机与节能空调，绿色环保，噪音更低。' },
                { id: 6, icon: '🛤️', name: '智慧运维系统', desc: '基于大数据与AI的列车智能运维平台，实时监测车辆状态，保障运营安全可靠。' }
            ],
            signinData: {}
        };
        fs.writeFileSync(DB_PATH, JSON.stringify(defaultData, null, 2));
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
        lastResetTime: null,
        avatar: '👤'                 // 新用户默认头像
    };
    writeDB(db);
    res.json({ success: true, message: '注册成功' });
});

// 登录（返回 avatar）
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const db = readDB();
    const user = db.users[username];
    if (!user || user.password !== password) {
        return res.status(401).json({ success: false, message: '账号或密码错误' });
    }
    user.lastLogin = new Date().toISOString();
    writeDB(db);
    res.json({
        success: true,
        username,
        balance: user.balance,
        avatar: user.avatar || '👤'   // 返回头像
    });
});

// 获取所有用户（含 avatar）
app.get('/api/users', (req, res) => {
    const db = readDB();
    const users = Object.keys(db.users).map(name => ({
        username: name,
        password: db.users[name].password,
        balance: db.users[name].balance,
        lastLogin: db.users[name].lastLogin || null,
        lastResetTime: db.users[name].lastResetTime || null,
        avatar: db.users[name].avatar || '👤'
    }));
    res.json(users);
});

// 更新用户信息（支持 balance 和 avatar）
app.put('/api/user/:username', (req, res) => {
    const { username } = req.params;
    const { balance, avatar } = req.body;
    const db = readDB();
    if (!db.users[username]) {
        return res.status(404).json({ success: false, message: '用户不存在' });
    }
    if (balance !== undefined) db.users[username].balance = balance;
    if (avatar !== undefined) db.users[username].avatar = avatar;
    writeDB(db);
    res.json({ success: true });
});

// 重置密码（24小时限制）
app.post('/api/user/:username/reset', (req, res) => {
    const { username } = req.params;
    const db = readDB();
    if (!db.users[username]) {
        return res.status(404).json({ success: false, message: '用户不存在' });
    }
    if (username === 'admin') {
        return res.status(403).json({ success: false, message: '不能重置管理员密码' });
    }
    const now = new Date();
    const lastReset = db.users[username].lastResetTime;
    if (lastReset) {
        const diff = now - new Date(lastReset);
        if (diff < 24 * 60 * 60 * 1000) {
            return res.status(429).json({
                success: false,
                message: '该用户24小时内已被重置过，请稍后再试'
            });
        }
    }
    db.users[username].password = 'gy123456';
    db.users[username].lastResetTime = now.toISOString();
    writeDB(db);
    res.json({ success: true, message: '密码已重置为 gy123456' });
});

// 删除用户
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

// 签到状态
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

// 站车风采
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
