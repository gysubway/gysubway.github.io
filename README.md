<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>固原地铁 · 售票系统</title>
    <style>
        /* ==================== 全局重置 & 基础 ==================== */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
            background: #e9edf2;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: background 0.3s;
        }

        /* ==================== 登录页面 ==================== */
        #loginPage {
            width: 100%;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(145deg, #0b2a4a 0%, #1a4a6e 100%);
            padding: 20px;
        }

        .login-card {
            background: #ffffff;
            border-radius: 24px;
            padding: 48px 40px 40px;
            width: 100%;
            max-width: 420px;
            box-shadow: 0 25px 60px rgba(0, 20, 40, 0.45);
            transition: transform 0.25s ease;
        }

        .login-card:hover {
            transform: translateY(-2px);
        }

        .login-logo {
            text-align: center;
            margin-bottom: 32px;
        }

        .login-logo .icon {
            font-size: 44px;
            line-height: 1;
            display: block;
            margin-bottom: 8px;
        }

        .login-logo h1 {
            font-size: 26px;
            font-weight: 700;
            color: #0b2a4a;
            letter-spacing: 2px;
        }

        .login-logo p {
            font-size: 14px;
            color: #7a8a9e;
            margin-top: 4px;
            letter-spacing: 1px;
        }

        .login-form .form-group {
            margin-bottom: 22px;
        }

        .login-form label {
            display: block;
            font-size: 14px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 6px;
            letter-spacing: 0.5px;
        }

        .login-form input[type="text"],
        .login-form input[type="password"] {
            width: 100%;
            padding: 14px 18px;
            font-size: 16px;
            border: 2px solid #dce3ec;
            border-radius: 12px;
            background: #f8fafc;
            transition: border-color 0.25s, box-shadow 0.25s;
            outline: none;
            color: #1a2a3a;
        }

        .login-form input:focus {
            border-color: #1a6e9e;
            box-shadow: 0 0 0 4px rgba(26, 110, 158, 0.12);
            background: #ffffff;
        }

        .login-form .input-hint {
            font-size: 12px;
            color: #8a9aaa;
            margin-top: 4px;
            padding-left: 4px;
        }

        .login-btn {
            width: 100%;
            padding: 16px;
            font-size: 18px;
            font-weight: 700;
            color: #ffffff;
            background: linear-gradient(135deg, #1a6e9e, #0b4a72);
            border: none;
            border-radius: 12px;
            cursor: pointer;
            transition: background 0.25s, transform 0.15s, box-shadow 0.25s;
            letter-spacing: 2px;
            margin-top: 6px;
        }

        .login-btn:hover {
            background: linear-gradient(135deg, #1f7eb2, #0e5580);
            box-shadow: 0 8px 24px rgba(26, 110, 158, 0.30);
            transform: translateY(-1px);
        }

        .login-btn:active {
            transform: scale(0.98);
        }

        .login-error {
            margin-top: 16px;
            padding: 12px 16px;
            background: #fef2f0;
            border-left: 4px solid #d94a4a;
            border-radius: 8px;
            color: #b33a3a;
            font-size: 14px;
            display: none;
            align-items: center;
            gap: 8px;
        }

        .login-error.show {
            display: flex;
        }

        .login-error .err-icon {
            font-size: 18px;
        }

        .login-footer {
            text-align: center;
            margin-top: 24px;
            font-size: 13px;
            color: #9aabba;
        }

        .login-footer .demo-accounts {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 8px;
            flex-wrap: wrap;
        }

        .login-footer .demo-accounts span {
            background: #eef2f7;
            padding: 4px 14px;
            border-radius: 20px;
            font-size: 13px;
            color: #1a4a6e;
            font-weight: 500;
        }

        /* ==================== 首页 ==================== */
        #homePage {
            display: none;
            width: 100%;
            min-height: 100vh;
            background: #eef2f7;
            flex-direction: column;
        }

        /* ---- 顶部导航 ---- */
        .navbar {
            background: linear-gradient(135deg, #0b2a4a, #1a4a6e);
            padding: 0 40px;
            height: 72px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            position: sticky;
            top: 0;
            z-index: 100;
            flex-shrink: 0;
        }

        .navbar .brand {
            display: flex;
            align-items: center;
            gap: 12px;
            color: #ffffff;
            font-size: 22px;
            font-weight: 700;
            letter-spacing: 1px;
        }

        .navbar .brand .brand-icon {
            font-size: 30px;
            line-height: 1;
        }

        .navbar .brand .brand-sub {
            font-size: 13px;
            font-weight: 400;
            opacity: 0.7;
            margin-left: 4px;
        }

        .navbar .user-area {
            display: flex;
            align-items: center;
            gap: 18px;
        }

        .navbar .user-area .user-name {
            color: #ffffff;
            font-size: 15px;
            font-weight: 500;
            background: rgba(255, 255, 255, 0.12);
            padding: 6px 18px;
            border-radius: 30px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .navbar .user-area .user-name .avatar {
            font-size: 18px;
        }

        .navbar .logout-btn {
            background: rgba(255, 255, 255, 0.10);
            border: 1.5px solid rgba(255, 255, 255, 0.25);
            color: #ffffff;
            padding: 8px 22px;
            border-radius: 30px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.25s, border-color 0.25s;
            letter-spacing: 0.5px;
        }

        .navbar .logout-btn:hover {
            background: rgba(255, 255, 255, 0.20);
            border-color: rgba(255, 255, 255, 0.45);
        }

        /* ---- 首页主体 ---- */
        .home-main {
            flex: 1;
            padding: 32px 40px 20px;
            max-width: 1280px;
            margin: 0 auto;
            width: 100%;
        }

        /* 欢迎横幅 */
        .welcome-banner {
            background: linear-gradient(135deg, #ffffff, #f5f9ff);
            border-radius: 20px;
            padding: 28px 34px;
            margin-bottom: 32px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.6);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 12px;
        }

        .welcome-banner .greeting h2 {
            font-size: 24px;
            font-weight: 700;
            color: #0b2a4a;
        }

        .welcome-banner .greeting h2 .highlight {
            color: #1a6e9e;
        }

        .welcome-banner .greeting p {
            color: #5a6a7a;
            font-size: 15px;
            margin-top: 4px;
        }

        .welcome-banner .datetime {
            text-align: right;
            color: #3a5a7a;
            font-size: 15px;
            background: #eef4fa;
            padding: 10px 22px;
            border-radius: 40px;
            font-weight: 500;
            white-space: nowrap;
        }

        .welcome-banner .datetime .time {
            font-size: 20px;
            font-weight: 700;
            color: #0b2a4a;
            margin-right: 6px;
        }

        /* ---- 卡片网格 ---- */
        .section-title {
            font-size: 18px;
            font-weight: 700;
            color: #1a2a3a;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .section-title .title-line {
            flex: 1;
            height: 2px;
            background: linear-gradient(to right, #d0dae6, transparent);
        }

        .card-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            margin-bottom: 32px;
        }

        .card-grid.full {
            grid-template-columns: 1fr;
        }

        /* ---- 线路卡片 ---- */
        .line-card {
            background: #ffffff;
            border-radius: 18px;
            padding: 22px 26px 20px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
            border: 1px solid #eef2f7;
            transition: box-shadow 0.2s, transform 0.2s;
        }

        .line-card:hover {
            box-shadow: 0 8px 28px rgba(0, 20, 40, 0.08);
            transform: translateY(-2px);
        }

        .line-card .line-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
        }

        .line-card .line-color {
            width: 6px;
            height: 32px;
            border-radius: 6px;
            flex-shrink: 0;
        }

        .line-card .line-name {
            font-size: 18px;
            font-weight: 700;
            color: #0b2a4a;
        }

        .line-card .line-name .line-code {
            font-size: 14px;
            font-weight: 400;
            color: #7a8a9e;
            margin-left: 6px;
        }

        .line-card .line-stations {
            display: flex;
            flex-wrap: wrap;
            gap: 6px 14px;
            padding-left: 18px;
            margin-top: 4px;
        }

        .line-card .line-stations .station {
            font-size: 14px;
            color: #2a4a6a;
            padding: 2px 0;
            position: relative;
        }

        .line-card .line-stations .station::after {
            content: "·";
            color: #b0c4d8;
            margin-left: 10px;
        }

        .line-card .line-stations .station:last-child::after {
            content: "";
            margin: 0;
        }

        .line-card .line-stations .station .dir-icon {
            font-size: 12px;
            color: #8a9aaa;
            margin: 0 2px;
        }

        /* ---- 功能快捷入口 ---- */
        .quick-actions {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            margin-bottom: 12px;
        }

        .quick-action {
            background: #ffffff;
            border-radius: 16px;
            padding: 24px 12px;
            text-align: center;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
            border: 1px solid #eef2f7;
            cursor: default;
            transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
        }

        .quick-action:hover {
            box-shadow: 0 8px 28px rgba(0, 20, 40, 0.08);
            transform: translateY(-3px);
            border-color: #c8d8e8;
        }

        .quick-action .qa-icon {
            font-size: 32px;
            display: block;
            margin-bottom: 8px;
        }

        .quick-action .qa-label {
            font-size: 15px;
            font-weight: 600;
            color: #1a2a3a;
        }

        .quick-action .qa-desc {
            font-size: 12px;
            color: #8a9aaa;
            margin-top: 2px;
        }

        .quick-action.disabled {
            opacity: 0.6;
            cursor: not-allowed;
            filter: grayscale(0.3);
        }

        .quick-action.disabled:hover {
            transform: none;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
            border-color: #eef2f7;
        }

        /* ---- 底部 ---- */
        .home-footer {
            text-align: center;
            padding: 24px 20px 12px;
            color: #8a9aaa;
            font-size: 13px;
            border-top: 1px solid #e0e6ee;
            margin-top: 8px;
        }

        .home-footer strong {
            color: #1a4a6e;
        }

        /* ==================== 响应式 ==================== */
        @media (max-width: 992px) {
            .card-grid {
                grid-template-columns: 1fr;
                gap: 18px;
            }
            .quick-actions {
                grid-template-columns: repeat(2, 1fr);
            }
            .home-main {
                padding: 20px 24px 16px;
            }
            .navbar {
                padding: 0 24px;
                height: 64px;
            }
            .navbar .brand {
                font-size: 18px;
            }
            .navbar .brand .brand-sub {
                display: none;
            }
            .welcome-banner {
                flex-direction: column;
                align-items: flex-start;
            }
            .welcome-banner .datetime {
                text-align: left;
                width: 100%;
                white-space: normal;
            }
        }

        @media (max-width: 480px) {
            .login-card {
                padding: 32px 20px 28px;
            }
            .login-logo h1 {
                font-size: 22px;
            }
            .navbar .user-area .user-name {
                font-size: 13px;
                padding: 4px 12px;
            }
            .navbar .logout-btn {
                font-size: 12px;
                padding: 6px 16px;
            }
            .quick-actions {
                grid-template-columns: 1fr 1fr;
                gap: 12px;
            }
            .quick-action {
                padding: 18px 8px;
            }
            .quick-action .qa-icon {
                font-size: 26px;
            }
            .line-card {
                padding: 16px 18px;
            }
            .line-card .line-stations {
                gap: 4px 10px;
                padding-left: 12px;
            }
            .home-main {
                padding: 14px 14px 12px;
            }
            .welcome-banner {
                padding: 18px 20px;
            }
            .welcome-banner .greeting h2 {
                font-size: 20px;
            }
        }

        /* ==================== 工具类 ==================== */
        .text-muted {
            color: #8a9aaa;
            font-size: 13px;
        }
        .mt-8 {
            margin-top: 8px;
        }
        .mb-8 {
            margin-bottom: 8px;
        }
        .flex-center {
            display: flex;
            align-items: center;
            gap: 6px;
        }
    </style>
</head>
<body>

    <!-- ============================================================ -->
    <!--                     登 录 页 面                                 -->
    <!-- ============================================================ -->
    <div id="loginPage">
        <div class="login-card">
            <div class="login-logo">
                <span class="icon">🚇</span>
                <h1>固原地铁</h1>
                <p>售票系统 · 运营中心</p>
            </div>

            <form class="login-form" id="loginForm" autocomplete="off">
                <div class="form-group">
                    <label for="loginUsername">账号</label>
                    <input
                    type="text"
                    id="loginUsername"
                    placeholder="请输入账号"
                    value="admin"
                    required
                    />
                </div>
                <div class="form-group">
                    <label for="loginPassword">密码</label>
                    <input
                    type="password"
                    id="loginPassword"
                    placeholder="请输入密码"
                    value="123456"
                    required
                    />
                    <div class="input-hint">默认账号 admin / 密码 123456</div>
                </div>

                <button type="submit" class="login-btn">登 录</button>

                <div class="login-error" id="loginError">
                    <span class="err-icon">⚠️</span>
                    <span id="errorMessage">账号或密码错误，请重试</span>
                </div>
            </form>

            <div class="login-footer">
                <div>演示账号</div>
                <div class="demo-accounts">
                    <span>admin / 123456</span>
                    <span>user / 123456</span>
                    <span>guiyuan / 123456</span>
                </div>
            </div>
        </div>
    </div>

    <!-- ============================================================ -->
    <!--                     首 页                                      -->
    <!-- ============================================================ -->
    <div id="homePage">
        <!-- 顶部导航 -->
        <nav class="navbar">
            <div class="brand">
                <span class="brand-icon">🚇</span>
                <span>固原地铁</span>
                <span class="brand-sub">· 售票系统</span>
            </div>
            <div class="user-area">
                <span class="user-name">
                    <span class="avatar">👤</span>
                    <span id="displayUsername">admin</span>
                </span>
                <button class="logout-btn" id="logoutBtn">退出登录</button>
            </div>
        </nav>

        <!-- 主体 -->
        <main class="home-main">
            <!-- 欢迎横幅 -->
            <div class="welcome-banner">
                <div class="greeting">
                    <h2>👋 欢迎回来，<span class="highlight" id="greetingUser">admin</span></h2>
                    <p>固原地铁 · 智能售票系统 v2.0</p>
                </div>
                <div class="datetime" id="datetimeDisplay">
                    <span class="time" id="currentTime">--:--:--</span>
                    <span id="currentDate">----年--月--日</span>
                </div>
            </div>

            <!-- 线路概览 -->
            <div class="section-title">
                📍 线路概览
                <span class="title-line"></span>
            </div>
            <div class="card-grid" id="lineGrid">
                <!-- 由 JavaScript 动态渲染 -->
            </div>

            <!-- 快捷功能 -->
            <div class="section-title" style="margin-top:8px;">
                🎫 快捷功能
                <span class="title-line"></span>
            </div>
            <div class="quick-actions">
                <div class="quick-action disabled">
                    <span class="qa-icon">🎟️</span>
                    <div class="qa-label">购票</div>
                    <div class="qa-desc">即将开放</div>
                </div>
                <div class="quick-action disabled">
                    <span class="qa-icon">🗺️</span>
                    <div class="qa-label">线路查询</div>
                    <div class="qa-desc">即将开放</div>
                </div>
                <div class="quick-action disabled">
                    <span class="qa-icon">📍</span>
                    <div class="qa-label">站点查询</div>
                    <div class="qa-desc">即将开放</div>
                </div>
                <div class="quick-action disabled">
                    <span class="qa-icon">💰</span>
                    <div class="qa-label">票价查询</div>
                    <div class="qa-desc">即将开放</div>
                </div>
            </div>
            <p class="text-muted mt-8" style="padding-left:4px;">
                ⚡ 更多功能持续开发中……
            </p>

            <!-- 底部 -->
            <div class="home-footer">
                &copy; 2026 <strong>固原地铁</strong> · 虚拟线网数据 · 仅供演示
            </div>
        </main>
    </div>

    <!-- ============================================================ -->
    <!--                      JavaScript                                -->
    <!-- ============================================================ -->
    <script>
        (function() {
            'use strict';

            // ======================== 数据 ============================
            // ★★★ 虚拟地铁线网数据（用户可替换为自己的数据） ★★★
            const LINE_DATA = [{
                id: 1,
                name: '1号线',
                code: 'M1',
                color: '#e74c3c',
                stations: ['火车站', '市政府', '人民广场', '大学城', '科技园', '体育中心']
            }, {
                id: 2,
                name: '2号线',
                code: 'M2',
                color: '#3498db',
                stations: ['机场', '会展中心', '市中心', '体育馆', '高铁站', '生态园']
            }, {
                id: 3,
                name: '3号线',
                code: 'M3',
                color: '#2ecc71',
                stations: ['汽车站', '商业街', '文化宫', '图书馆', '政务中心', '智慧谷']
            }, {
                id: 4,
                name: '4号线',
                code: 'M4',
                color: '#f39c12',
                stations: ['古雁岭', '新区医院', '实验中学', '万达广场', '行政中心', '固原南站']
            }];

            // ★★★ 预设账号（用户可添加或修改） ★★★
            const ACCOUNTS = {
                admin: '123456',
                user: '123456',
                guiyuan: '123456'
            };

            // ======================== DOM 引用 ========================
            const loginPage = document.getElementById('loginPage');
            const homePage = document.getElementById('homePage');
            const loginForm = document.getElementById('loginForm');
            const loginUsername = document.getElementById('loginUsername');
            const loginPassword = document.getElementById('loginPassword');
            const loginError = document.getElementById('loginError');
            const errorMessage = document.getElementById('errorMessage');
            const logoutBtn = document.getElementById('logoutBtn');
            const displayUsername = document.getElementById('displayUsername');
            const greetingUser = document.getElementById('greetingUser');
            const lineGrid = document.getElementById('lineGrid');
            const currentTimeEl = document.getElementById('currentTime');
            const currentDateEl = document.getElementById('currentDate');

            // ======================== 工具函数 ========================
            function formatDate(now) {
                const y = now.getFullYear();
                const m = String(now.getMonth() + 1).padStart(2, '0');
                const d = String(now.getDate()).padStart(2, '0');
                const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
                const wd = weekdays[now.getDay()];
                return y + '年' + m + '月' + d + '日 ' + wd;
            }

            function formatTime(now) {
                return String(now.getHours()).padStart(2, '0') +
                    ':' + String(now.getMinutes()).padStart(2, '0') +
                    ':' + String(now.getSeconds()).padStart(2, '0');
            }

            // ======================== 渲染线路 ========================
            function renderLines() {
                if (!lineGrid) return;
                lineGrid.innerHTML = '';
                LINE_DATA.forEach(line => {
                    const card = document.createElement('div');
                    card.className = 'line-card';

                    // 站点列表（用箭头连接）
                    const stationsHtml = line.stations.map((s, idx) => {
                        let arrow = '';
                        if (idx < line.stations.length - 1) {
                            arrow = ' <span class="dir-icon">→</span> ';
                        }
                        return '<span class="station">' + s + arrow + '</span>';
                    }).join('');

                    card.innerHTML = `
                        <div class="line-header">
                            <div class="line-color" style="background:${line.color};"></div>
                            <span class="line-name">
                                ${line.name}
                                <span class="line-code">${line.code}</span>
                            </span>
                        </div>
                        <div class="line-stations">
                            ${stationsHtml}
                        </div>
                    `;
                    lineGrid.appendChild(card);
                });
            }

            // ======================== 更新时间 ========================
            function updateClock() {
                const now = new Date();
                currentTimeEl.textContent = formatTime(now);
                currentDateEl.textContent = formatDate(now);
            }

            // ======================== 登录逻辑 ========================
            function handleLogin(e) {
                e.preventDefault();

                const username = loginUsername.value.trim();
                const password = loginPassword.value.trim();

                // 清除旧错误
                loginError.classList.remove('show');

                if (!username || !password) {
                    errorMessage.textContent = '请输入账号和密码';
                    loginError.classList.add('show');
                    return;
                }

                // 验证账号
                if (ACCOUNTS.hasOwnProperty(username) && ACCOUNTS[username] === password) {
                    // 登录成功
                    loginSuccess(username);
                } else {
                    errorMessage.textContent = '账号或密码错误，请重新输入';
                    loginError.classList.add('show');
                    loginPassword.value = '';
                    loginPassword.focus();
                }
            }

            function loginSuccess(username) {
                // 保存登录状态
                sessionStorage.setItem('metro_user', username);

                // 切换页面
                loginPage.style.display = 'none';
                homePage.style.display = 'flex';

                // 更新用户信息
                displayUsername.textContent = username;
                greetingUser.textContent = username;

                // 渲染线路
                renderLines();

                // 启动时钟
                updateClock();
                if (window._clockInterval) clearInterval(window._clockInterval);
                window._clockInterval = setInterval(updateClock, 1000);

                // 滚动到顶部
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // ======================== 退出登录 ========================
            function handleLogout() {
                sessionStorage.removeItem('metro_user');
                if (window._clockInterval) {
                    clearInterval(window._clockInterval);
                    window._clockInterval = null;
                }
                homePage.style.display = 'none';
                loginPage.style.display = 'flex';
                loginError.classList.remove('show');
                loginPassword.value = '';
                // 如果有默认账号可以填充
                loginUsername.value = 'admin';
                loginPassword.value = '123456';
            }

            // ======================== 检查登录状态 ========================
            function checkSession() {
                const user = sessionStorage.getItem('metro_user');
                if (user && ACCOUNTS.hasOwnProperty(user)) {
                    // 直接登录
                    loginPage.style.display = 'none';
                    homePage.style.display = 'flex';
                    displayUsername.textContent = user;
                    greetingUser.textContent = user;
                    renderLines();
                    updateClock();
                    if (window._clockInterval) clearInterval(window._clockInterval);
                    window._clockInterval = setInterval(updateClock, 1000);
                    return true;
                }
                return false;
            }

            // ======================== 绑定事件 ========================
            loginForm.addEventListener('submit', handleLogin);

            logoutBtn.addEventListener('click', handleLogout);

            // 回车键在密码框也能触发登录
            loginPassword.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    loginForm.dispatchEvent(new Event('submit'));
                }
            });

            // ======================== 初始化 ========================
            (function init() {
                // 默认填好演示账号
                loginUsername.value = 'admin';
                loginPassword.value = '123456';

                // 检查是否已有登录会话
                const hasSession = checkSession();

                if (!hasSession) {
                    loginPage.style.display = 'flex';
                    homePage.style.display = 'none';
                }

                // 时钟（登录页不显示时钟，但首页会启动）
                // 如果首页已显示，时钟已在 checkSession 中启动
            })();

        })();
    </script>

</body>
</html>
