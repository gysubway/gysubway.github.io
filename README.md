<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>固原地铁 · 售票系统</title>
    <!-- 行楷字体 (Ma Shan Zheng) -->
    <link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap" rel="stylesheet" />
    <style>
        /* ============================================================
               全局重置 & 基础
               ============================================================ */
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

        /* ============================================================
               登录页面
               ============================================================ */
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
            padding: 44px 40px 36px;
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
            margin-bottom: 28px;
        }

        .login-logo .icon {
            font-size: 44px;
            line-height: 1;
            display: block;
            margin-bottom: 6px;
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
            margin-top: 2px;
            letter-spacing: 1px;
        }

        .login-form .form-group {
            margin-bottom: 20px;
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
            margin-top: 4px;
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
            margin-top: 22px;
            font-size: 14px;
            color: #9aabba;
        }

        .login-footer .register-link {
            display: inline-block;
            margin-top: 6px;
            color: #1a6e9e;
            font-weight: 600;
            cursor: pointer;
            text-decoration: underline;
            transition: color 0.2s;
        }

        .login-footer .register-link:hover {
            color: #0b4a72;
        }

        /* ============================================================
               注册模态框
               ============================================================ */
        .modal-overlay {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.55);
            backdrop-filter: blur(4px);
            z-index: 999;
            justify-content: center;
            align-items: center;
            padding: 20px;
            animation: fadeIn 0.25s ease;
        }

        .modal-overlay.active {
            display: flex;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: scale(0.96);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        .modal-card {
            background: #ffffff;
            border-radius: 24px;
            padding: 36px 32px 32px;
            width: 100%;
            max-width: 460px;
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
            max-height: 90vh;
            overflow-y: auto;
        }

        .modal-card .modal-title {
            font-size: 24px;
            font-weight: 700;
            color: #0b2a4a;
            text-align: center;
            margin-bottom: 24px;
            letter-spacing: 1px;
        }

        .modal-card .form-group {
            margin-bottom: 18px;
        }

        .modal-card label {
            display: block;
            font-size: 14px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 5px;
        }

        .modal-card input[type="text"],
        .modal-card input[type="password"] {
            width: 100%;
            padding: 12px 16px;
            font-size: 15px;
            border: 2px solid #dce3ec;
            border-radius: 10px;
            background: #f8fafc;
            transition: border-color 0.25s;
            outline: none;
            color: #1a2a3a;
        }

        .modal-card input:focus {
            border-color: #1a6e9e;
            background: #ffffff;
        }

        .modal-card .verify-question {
            background: #eef4fa;
            padding: 12px 16px;
            border-radius: 10px;
            font-size: 15px;
            color: #0b2a4a;
            margin-bottom: 10px;
            border-left: 4px solid #1a6e9e;
            font-weight: 500;
        }

        .modal-card .form-actions {
            display: flex;
            gap: 12px;
            margin-top: 20px;
        }

        .modal-card .form-actions button {
            flex: 1;
            padding: 14px;
            font-size: 16px;
            font-weight: 700;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: background 0.25s, transform 0.15s;
        }

        .modal-card .btn-register {
            background: linear-gradient(135deg, #1a6e9e, #0b4a72);
            color: #ffffff;
        }

        .modal-card .btn-register:hover {
            background: linear-gradient(135deg, #1f7eb2, #0e5580);
        }

        .modal-card .btn-cancel {
            background: #eef2f7;
            color: #4a5a6a;
        }

        .modal-card .btn-cancel:hover {
            background: #e0e6ee;
        }

        .modal-card .modal-error {
            margin-top: 14px;
            padding: 10px 14px;
            background: #fef2f0;
            border-left: 4px solid #d94a4a;
            border-radius: 6px;
            color: #b33a3a;
            font-size: 14px;
            display: none;
            align-items: center;
            gap: 8px;
        }

        .modal-card .modal-error.show {
            display: flex;
        }

        .modal-card .modal-success {
            margin-top: 14px;
            padding: 10px 14px;
            background: #ecf9f0;
            border-left: 4px solid #2ecc71;
            border-radius: 6px;
            color: #1a7a4a;
            font-size: 14px;
            display: none;
            align-items: center;
            gap: 8px;
        }

        .modal-card .modal-success.show {
            display: flex;
        }

        /* ============================================================
               首页
               ============================================================ */
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
            gap: 16px;
            flex-wrap: wrap;
            justify-content: flex-end;
        }

        .navbar .user-area .user-info {
            display: flex;
            align-items: center;
            gap: 12px;
            color: #ffffff;
            font-size: 14px;
        }

        .navbar .user-area .user-info .user-name {
            font-weight: 600;
            background: rgba(255, 255, 255, 0.12);
            padding: 5px 16px;
            border-radius: 30px;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .navbar .user-area .user-info .user-balance {
            background: rgba(255, 215, 0, 0.20);
            padding: 5px 16px;
            border-radius: 30px;
            display: flex;
            align-items: center;
            gap: 4px;
            color: #ffd700;
            font-weight: 600;
        }

        .navbar .logout-btn {
            background: rgba(255, 255, 255, 0.10);
            border: 1.5px solid rgba(255, 255, 255, 0.25);
            color: #ffffff;
            padding: 7px 22px;
            border-radius: 30px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.25s, border-color 0.25s;
            letter-spacing: 0.5px;
            white-space: nowrap;
        }

        .navbar .logout-btn:hover {
            background: rgba(255, 255, 255, 0.20);
            border-color: rgba(255, 255, 255, 0.45);
        }

        /* ---- 行楷 红底白字 标语 ---- */
        .hero-banner {
            background: #c0392b;
            background: linear-gradient(135deg, #b71c1c, #c0392b);
            padding: 24px 20px;
            text-align: center;
            border-bottom: 4px solid #922b21;
            box-shadow: 0 4px 20px rgba(192, 57, 43, 0.25);
            flex-shrink: 0;
        }

        .hero-banner h1 {
            font-family: 'Ma Shan Zheng', '华文行楷', 'STXingkai', 'KaiTi', cursive;
            font-size: 52px;
            color: #ffffff;
            letter-spacing: 8px;
            text-shadow: 0 2px 12px rgba(0, 0, 0, 0.20);
            font-weight: 400;
            line-height: 1.2;
        }

        /* ---- 首页主体 ---- */
        .home-main {
            flex: 1;
            padding: 28px 40px 20px;
            max-width: 1280px;
            margin: 0 auto;
            width: 100%;
        }

        /* 欢迎横幅 */
        .welcome-banner {
            background: linear-gradient(135deg, #ffffff, #f5f9ff);
            border-radius: 20px;
            padding: 22px 30px;
            margin-bottom: 28px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.6);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 12px;
        }

        .welcome-banner .greeting h2 {
            font-size: 22px;
            font-weight: 700;
            color: #0b2a4a;
        }

        .welcome-banner .greeting h2 .highlight {
            color: #1a6e9e;
        }

        .welcome-banner .greeting p {
            color: #5a6a7a;
            font-size: 14px;
            margin-top: 2px;
        }

        .welcome-banner .datetime {
            text-align: right;
            color: #3a5a7a;
            font-size: 15px;
            background: #eef4fa;
            padding: 8px 20px;
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
            margin-bottom: 14px;
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
            gap: 22px;
            margin-bottom: 28px;
        }

        /* ---- 线路卡片 ---- */
        .line-card {
            background: #ffffff;
            border-radius: 18px;
            padding: 20px 24px 18px;
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
            margin-bottom: 10px;
        }

        .line-card .line-color {
            width: 6px;
            height: 30px;
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
            gap: 4px 14px;
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

        /* ---- 快捷功能 ---- */
        .quick-actions {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin-bottom: 8px;
        }

        .quick-action {
            background: #ffffff;
            border-radius: 16px;
            padding: 24px 12px 20px;
            text-align: center;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
            border: 1px solid #eef2f7;
            cursor: pointer;
            transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
            user-select: none;
        }

        .quick-action:hover {
            box-shadow: 0 8px 28px rgba(0, 20, 40, 0.10);
            transform: translateY(-3px);
            border-color: #c8d8e8;
        }

        .quick-action:active {
            transform: scale(0.97);
        }

        .quick-action .qa-icon {
            font-size: 34px;
            display: block;
            margin-bottom: 8px;
        }

        .quick-action .qa-label {
            font-size: 16px;
            font-weight: 600;
            color: #1a2a3a;
        }

        .quick-action .qa-desc {
            font-size: 12px;
            color: #8a9aaa;
            margin-top: 2px;
        }

        /* ---- 底部 ---- */
        .home-footer {
            text-align: center;
            padding: 20px 20px 8px;
            color: #8a9aaa;
            font-size: 13px;
            border-top: 1px solid #e0e6ee;
            margin-top: 12px;
        }

        .home-footer strong {
            color: #1a4a6e;
        }

        /* ============================================================
               站车风采 模态框 (独立于注册模态框)
               ============================================================ */
        .modal-scenery .scenery-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin: 16px 0 8px;
        }

        .modal-scenery .scenery-item {
            background: #f8fafc;
            border-radius: 14px;
            padding: 16px 14px;
            border: 1px solid #eef2f7;
            transition: background 0.2s;
        }

        .modal-scenery .scenery-item:hover {
            background: #eef4fa;
        }

        .modal-scenery .scenery-item .scenery-icon {
            font-size: 28px;
            display: block;
            margin-bottom: 4px;
        }

        .modal-scenery .scenery-item .scenery-name {
            font-weight: 700;
            font-size: 16px;
            color: #0b2a4a;
        }

        .modal-scenery .scenery-item .scenery-desc {
            font-size: 13px;
            color: #5a6a7a;
            margin-top: 2px;
            line-height: 1.4;
        }

        .modal-scenery .modal-card {
            max-width: 580px;
        }

        /* ============================================================
               Toast 通知
               ============================================================ */
        .toast-container {
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
            pointer-events: none;
        }

        .toast {
            background: #1a2a3a;
            color: #ffffff;
            padding: 14px 32px;
            border-radius: 12px;
            font-size: 15px;
            font-weight: 500;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.30);
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
            transition: opacity 0.35s ease, transform 0.35s ease;
            pointer-events: auto;
            display: flex;
            align-items: center;
            gap: 10px;
            white-space: nowrap;
        }

        .toast.show {
            opacity: 1;
            transform: translateY(0) scale(1);
        }

        .toast .toast-icon {
            font-size: 20px;
        }

        /* ============================================================
               响应式
               ============================================================ */
        @media (max-width: 992px) {
            .card-grid {
                grid-template-columns: 1fr;
                gap: 16px;
            }
            .quick-actions {
                grid-template-columns: repeat(3, 1fr);
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
            .hero-banner h1 {
                font-size: 38px;
                letter-spacing: 4px;
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
            .modal-scenery .scenery-grid {
                grid-template-columns: 1fr 1fr;
            }
        }

        @media (max-width: 600px) {
            .login-card {
                padding: 28px 18px 24px;
            }
            .login-logo h1 {
                font-size: 22px;
            }
            .navbar .user-area .user-info {
                font-size: 12px;
                gap: 6px;
                flex-wrap: wrap;
                justify-content: flex-end;
            }
            .navbar .user-area .user-info .user-name,
            .navbar .user-area .user-info .user-balance {
                padding: 3px 12px;
                font-size: 12px;
            }
            .navbar .logout-btn {
                font-size: 12px;
                padding: 5px 14px;
            }
            .navbar {
                padding: 0 14px;
                height: 58px;
            }
            .navbar .brand {
                font-size: 16px;
                gap: 6px;
            }
            .navbar .brand .brand-icon {
                font-size: 22px;
            }
            .hero-banner h1 {
                font-size: 28px;
                letter-spacing: 2px;
            }
            .hero-banner {
                padding: 16px 12px;
            }
            .quick-actions {
                grid-template-columns: 1fr 1fr 1fr;
                gap: 10px;
            }
            .quick-action {
                padding: 16px 6px 14px;
            }
            .quick-action .qa-icon {
                font-size: 26px;
            }
            .quick-action .qa-label {
                font-size: 14px;
            }
            .quick-action .qa-desc {
                font-size: 11px;
            }
            .line-card {
                padding: 14px 16px;
            }
            .line-card .line-stations {
                gap: 2px 10px;
                padding-left: 10px;
            }
            .line-card .line-stations .station {
                font-size: 13px;
            }
            .home-main {
                padding: 14px 14px 12px;
            }
            .welcome-banner {
                padding: 14px 16px;
            }
            .welcome-banner .greeting h2 {
                font-size: 18px;
            }
            .modal-card {
                padding: 24px 18px 20px;
            }
            .modal-scenery .scenery-grid {
                grid-template-columns: 1fr;
            }
            .modal-card .form-actions {
                flex-direction: column;
            }
            .toast {
                padding: 12px 20px;
                font-size: 14px;
                white-space: normal;
            }
        }

        @media (max-width: 420px) {
            .quick-actions {
                grid-template-columns: 1fr 1fr;
            }
            .quick-actions .quick-action:last-child {
                grid-column: span 2;
            }
        }

        /* ============================================================
               工具类
               ============================================================ */
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
        .gap-4 {
            gap: 4px;
        }
    </style>
</head>
<body>

    <!-- ============================================================
    登 录 页
    ============================================================ -->
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
                    <input type="text" id="loginUsername" placeholder="请输入账号" required />
                </div>
                <div class="form-group">
                    <label for="loginPassword">密码</label>
                    <input type="password" id="loginPassword" placeholder="请输入密码" required />
                </div>

                <button type="submit" class="login-btn">登 录</button>

                <div class="login-error" id="loginError">
                    <span class="err-icon">⚠️</span>
                    <span id="errorMessage">账号或密码错误，请重试</span>
                </div>
            </form>

            <div class="login-footer">
                <span>还没有账号？</span>
                <span class="register-link" id="openRegisterBtn">立即注册</span>
            </div>
        </div>
    </div>

    <!-- ============================================================
    注 册 模 态 框
    ============================================================ -->
    <div class="modal-overlay" id="registerModal">
        <div class="modal-card">
            <div class="modal-title">📝 注册新账号</div>

            <div class="form-group">
                <label for="regUsername">账号</label>
                <input type="text" id="regUsername" placeholder="请设置账号（至少2个字符）" />
            </div>
            <div class="form-group">
                <label for="regPassword">密码</label>
                <input type="password" id="regPassword" placeholder="请设置密码（至少6个字符）" />
            </div>
            <div class="form-group">
                <label for="regConfirm">确认密码</label>
                <input type="password" id="regConfirm" placeholder="请再次输入密码" />
            </div>

            <div class="form-group">
                <label>验证身份</label>
                <div class="verify-question">
                    ❓ 固局更高速度实验列车的车号是？
                </div>
                <input type="text" id="regVerify" placeholder="请输入答案" />
            </div>

            <div class="modal-error" id="regError">
                <span class="err-icon">⚠️</span>
                <span id="regErrorMessage">错误信息</span>
            </div>
            <div class="modal-success" id="regSuccess">
                <span>✅</span>
                <span id="regSuccessMessage">注册成功！</span>
            </div>

            <div class="form-actions">
                <button class="btn-cancel" id="closeRegisterBtn">取消</button>
                <button class="btn-register" id="registerBtn">注 册</button>
            </div>
        </div>
    </div>

    <!-- ============================================================
    站 车 风 采 模 态 框
    ============================================================ -->
    <div class="modal-overlay modal-scenery" id="sceneryModal">
        <div class="modal-card">
            <div class="modal-title">🚉 站车风采</div>

            <div class="scenery-grid">
                <div class="scenery-item">
                    <span class="scenery-icon">🏛️</span>
                    <div class="scenery-name">固原站</div>
                    <div class="scenery-desc">固原地铁1号线起点站，集交通、商业、文化于一体的综合枢纽，日均客流量超10万人次。</div>
                </div>
                <div class="scenery-item">
                    <span class="scenery-icon">🏙️</span>
                    <div class="scenery-name">人民广场站</div>
                    <div class="scenery-desc">位于城市核心区，2号线与3号线换乘站，毗邻市政府与商业中心，是城市最繁忙的站点之一。</div>
                </div>
                <div class="scenery-item">
                    <span class="scenery-icon">🌳</span>
                    <div class="scenery-name">古雁岭站</div>
                    <div class="scenery-desc">4号线站点，毗邻古雁岭生态公园，车站设计融入自然元素，被誉为"最美地铁站"。</div>
                </div>
                <div class="scenery-item">
                    <span class="scenery-icon">🚄</span>
                    <div class="scenery-name">CRH380 系列</div>
                    <div class="scenery-desc">高速动车组，最高运营时速380km/h，中国高铁的标杆车型，安全、舒适、快捷。</div>
                </div>
                <div class="scenery-item">
                    <span class="scenery-icon">🚇</span>
                    <div class="scenery-name">固原地铁 A 型车</div>
                    <div class="scenery-desc">6节编组，最高时速80km/h，采用永磁同步电机与节能空调，绿色环保，噪音更低。</div>
                </div>
                <div class="scenery-item">
                    <span class="scenery-icon">🛤️</span>
                    <div class="scenery-name">智慧运维系统</div>
                    <div class="scenery-desc">基于大数据与AI的列车智能运维平台，实时监测车辆状态，保障运营安全可靠。</div>
                </div>
            </div>

            <div class="form-actions" style="margin-top: 12px;">
                <button class="btn-cancel" id="closeSceneryBtn" style="flex:1;">关 闭</button>
            </div>
        </div>
    </div>

    <!-- ============================================================
    首 页
    ============================================================ -->
    <div id="homePage">
        <!-- 顶部导航 -->
        <nav class="navbar">
            <div class="brand">
                <span class="brand-icon">🚇</span>
                <span>固原地铁</span>
                <span class="brand-sub">· 售票系统</span>
            </div>
            <div class="user-area">
                <div class="user-info">
                    <span class="user-name">
                        👤 <span id="displayUsername">用户</span>
                    </span>
                    <span class="user-balance">
                        💰 <span id="displayBalance">0.00</span>
                    </span>
                </div>
                <button class="logout-btn" id="logoutBtn">退出登录</button>
            </div>
        </nav>

        <!-- 行楷 红底白字 标语 -->
        <div class="hero-banner">
            <h1>🚇 固原地铁欢迎您！</h1>
        </div>

        <!-- 主体 -->
        <main class="home-main">
            <!-- 欢迎横幅 -->
            <div class="welcome-banner">
                <div class="greeting">
                    <h2>👋 欢迎回来，<span class="highlight" id="greetingUser">用户</span></h2>
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
            <div class="section-title" style="margin-top:6px;">
                🎫 快捷功能
                <span class="title-line"></span>
            </div>
            <div class="quick-actions">
                <div class="quick-action" data-action="ticket">
                    <span class="qa-icon">🎟️</span>
                    <div class="qa-label">购票</div>
                    <div class="qa-desc">即将开放</div>
                </div>
                <div class="quick-action" data-action="line">
                    <span class="qa-icon">🗺️</span>
                    <div class="qa-label">线路查询</div>
                    <div class="qa-desc">即将开放</div>
                </div>
                <div class="quick-action" data-action="scenery">
                    <span class="qa-icon">📸</span>
                    <div class="qa-label">站车风采</div>
                    <div class="qa-desc">点击欣赏</div>
                </div>
            </div>

            <!-- 底部 -->
            <div class="home-footer">
                &copy; 2026 <strong>固原地铁</strong> · 虚拟线网数据 · 仅供演示
            </div>
        </main>
    </div>

    <!-- ============================================================
    Toast 容器
    ============================================================ -->
    <div class="toast-container" id="toastContainer"></div>


    <!-- ============================================================
    JavaScript
    ============================================================ -->
    <script>
        (function() {
            'use strict';

            // ============================================================
            //  数据
            // ============================================================

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

            // ★★★ 预设 admin 账号 ★★★
            const PRESET_USER = {
                username: 'admin',
                password: 'gysubway2026',
                balance: 1000000
            };

            // ★★★ 验证问题与答案 ★★★
            const VERIFY_QUESTION = '固局更高速度实验列车的车号是？';
            const VERIFY_ANSWER = 'CRH380CM-0304';

            // ============================================================
            //  存储工具
            // ============================================================

            const STORAGE_KEY = 'metro_users_data';

            function loadUsers() {
                try {
                    const raw = localStorage.getItem(STORAGE_KEY);
                    if (raw) {
                        const data = JSON.parse(raw);
                        // 确保 admin 存在
                        if (!data.admin) {
                            data.admin = {
                                password: PRESET_USER.password,
                                balance: PRESET_USER.balance
                            };
                        }
                        return data;
                    }
                } catch (_) { /* ignore */ }
                // 默认初始化
                const defaultData = {
                    admin: {
                        password: PRESET_USER.password,
                        balance: PRESET_USER.balance
                    }
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
                return defaultData;
            }

            function saveUsers(users) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
            }

            function getUser(username) {
                const users = loadUsers();
                return users[username] || null;
            }

            function userExists(username) {
                const users = loadUsers();
                return users.hasOwnProperty(username);
            }

            function createUser(username, password) {
                const users = loadUsers();
                if (users[username]) return false;
                users[username] = {
                    password: password,
                    balance: 0 // 新用户余额为 0
                };
                saveUsers(users);
                return true;
            }

            function updateBalance(username, amount) {
                const users = loadUsers();
                if (!users[username]) return false;
                users[username].balance = amount;
                saveUsers(users);
                return true;
            }

            // ============================================================
            //  DOM 引用
            // ============================================================

            const loginPage = document.getElementById('loginPage');
            const homePage = document.getElementById('homePage');
            const loginForm = document.getElementById('loginForm');
            const loginUsername = document.getElementById('loginUsername');
            const loginPassword = document.getElementById('loginPassword');
            const loginError = document.getElementById('loginError');
            const errorMessage = document.getElementById('errorMessage');
            const logoutBtn = document.getElementById('logoutBtn');
            const displayUsername = document.getElementById('displayUsername');
            const displayBalance = document.getElementById('displayBalance');
            const greetingUser = document.getElementById('greetingUser');
            const lineGrid = document.getElementById('lineGrid');
            const currentTimeEl = document.getElementById('currentTime');
            const currentDateEl = document.getElementById('currentDate');

            // 注册模态框
            const registerModal = document.getElementById('registerModal');
            const openRegisterBtn = document.getElementById('openRegisterBtn');
            const closeRegisterBtn = document.getElementById('closeRegisterBtn');
            const registerBtn = document.getElementById('registerBtn');
            const regUsername = document.getElementById('regUsername');
            const regPassword = document.getElementById('regPassword');
            const regConfirm = document.getElementById('regConfirm');
            const regVerify = document.getElementById('regVerify');
            const regError = document.getElementById('regError');
            const regErrorMessage = document.getElementById('regErrorMessage');
            const regSuccess = document.getElementById('regSuccess');
            const regSuccessMessage = document.getElementById('regSuccessMessage');

            // 站车风采模态框
            const sceneryModal = document.getElementById('sceneryModal');
            const closeSceneryBtn = document.getElementById('closeSceneryBtn');

            // Toast
            const toastContainer = document.getElementById('toastContainer');

            // ============================================================
            //  工具函数
            // ============================================================

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

            function formatBalance(val) {
                return '¥' + Number(val).toFixed(2);
            }

            // ============================================================
            //  Toast 通知
            // ============================================================

            function showToast(message, icon) {
                icon = icon || 'ℹ️';
                const toast = document.createElement('div');
                toast.className = 'toast';
                toast.innerHTML = `<span class="toast-icon">${icon}</span> ${message}`;
                toastContainer.appendChild(toast);
                // 触发动画
                requestAnimationFrame(() => {
                    toast.classList.add('show');
                });
                // 自动消失
                setTimeout(() => {
                    toast.classList.remove('show');
                    setTimeout(() => {
                        if (toast.parentNode) toast.parentNode.removeChild(toast);
                    }, 400);
                }, 2500);
            }

            // ============================================================
            //  渲染线路
            // ============================================================

            function renderLines() {
                if (!lineGrid) return;
                lineGrid.innerHTML = '';
                LINE_DATA.forEach(line => {
                    const card = document.createElement('div');
                    card.className = 'line-card';

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

            // ============================================================
            //  时钟
            // ============================================================

            let clockInterval = null;

            function updateClock() {
                const now = new Date();
                if (currentTimeEl) currentTimeEl.textContent = formatTime(now);
                if (currentDateEl) currentDateEl.textContent = formatDate(now);
            }

            function startClock() {
                if (clockInterval) clearInterval(clockInterval);
                updateClock();
                clockInterval = setInterval(updateClock, 1000);
            }

            function stopClock() {
                if (clockInterval) {
                    clearInterval(clockInterval);
                    clockInterval = null;
                }
            }

            // ============================================================
            //  登录 / 登出
            // ============================================================

            function handleLogin(e) {
                e.preventDefault();

                const username = loginUsername.value.trim();
                const password = loginPassword.value.trim();

                loginError.classList.remove('show');

                if (!username || !password) {
                    errorMessage.textContent = '请输入账号和密码';
                    loginError.classList.add('show');
                    return;
                }

                const user = getUser(username);
                if (user && user.password === password) {
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
                // 保存会话
                sessionStorage.setItem('metro_session_user', username);

                // 切换页面
                loginPage.style.display = 'none';
                homePage.style.display = 'flex';

                // 更新用户信息
                const user = getUser(username);
                displayUsername.textContent = username;
                greetingUser.textContent = username;
                if (user) {
                    displayBalance.textContent = formatBalance(user.balance);
                } else {
                    displayBalance.textContent = '¥0.00';
                }

                // 渲染线路
                renderLines();

                // 启动时钟
                startClock();

                // 滚动到顶部
                window.scrollTo({ top: 0, behavior: 'smooth' });

                // 显示欢迎 Toast
                showToast('欢迎回来，' + username + '！', '👋');
            }

            function handleLogout() {
                sessionStorage.removeItem('metro_session_user');
                stopClock();
                homePage.style.display = 'none';
                loginPage.style.display = 'flex';
                loginError.classList.remove('show');
                loginPassword.value = '';
                loginUsername.value = '';
                // 清空注册表单
                clearRegisterForm();
                // 关闭所有模态框
                registerModal.classList.remove('active');
                sceneryModal.classList.remove('active');
                showToast('已安全退出', '👋');
            }

            // ============================================================
            //  注册逻辑
            // ============================================================

            function clearRegisterForm() {
                regUsername.value = '';
                regPassword.value = '';
                regConfirm.value = '';
                regVerify.value = '';
                regError.classList.remove('show');
                regSuccess.classList.remove('show');
            }

            function openRegisterModal() {
                clearRegisterForm();
                registerModal.classList.add('active');
            }

            function closeRegisterModal() {
                registerModal.classList.remove('active');
                clearRegisterForm();
            }

            function handleRegister() {
                const username = regUsername.value.trim();
                const password = regPassword.value.trim();
                const confirm = regConfirm.value.trim();
                const verify = regVerify.value.trim();

                // 清除旧状态
                regError.classList.remove('show');
                regSuccess.classList.remove('show');

                // 验证
                if (!username || username.length < 2) {
                    regErrorMessage.textContent = '账号至少需要2个字符';
                    regError.classList.add('show');
                    return;
                }
                if (userExists(username)) {
                    regErrorMessage.textContent = '该账号已存在，请换一个';
                    regError.classList.add('show');
                    return;
                }
                if (!password || password.length < 6) {
                    regErrorMessage.textContent = '密码至少需要6个字符';
                    regError.classList.add('show');
                    return;
                }
                if (password !== confirm) {
                    regErrorMessage.textContent = '两次输入的密码不一致';
                    regError.classList.add('show');
                    return;
                }
                if (!verify) {
                    regErrorMessage.textContent = '请回答验证问题';
                    regError.classList.add('show');
                    return;
                }
                // 验证答案（忽略大小写）
                if (verify.trim().toUpperCase() !== VERIFY_ANSWER.toUpperCase()) {
                    regErrorMessage.textContent = '验证答案错误，请重新输入';
                    regError.classList.add('show');
                    regVerify.value = '';
                    regVerify.focus();
                    return;
                }

                // 创建账号
                const success = createUser(username, password);
                if (success) {
                    regSuccessMessage.textContent = '🎉 注册成功！即将自动登录...';
                    regSuccess.classList.add('show');

                    // 自动登录
                    setTimeout(() => {
                        closeRegisterModal();
                        loginSuccess(username);
                    }, 1200);
                } else {
                    regErrorMessage.textContent = '注册失败，请稍后重试';
                    regError.classList.add('show');
                }
            }

            // ============================================================
            //  站车风采
            // ============================================================

            function openSceneryModal() {
                sceneryModal.classList.add('active');
            }

            function closeSceneryModal() {
                sceneryModal.classList.remove('active');
            }

            // ============================================================
            //  快捷功能处理
            // ============================================================

            function handleQuickAction(action) {
                switch (action) {
                    case 'ticket':
                        showToast('购票功能开发中，敬请期待！', '🎟️');
                        break;
                    case 'line':
                        showToast('线路查询功能开发中，敬请期待！', '🗺️');
                        break;
                    case 'scenery':
                        openSceneryModal();
                        break;
                    default:
                        showToast('功能开发中', '🔧');
                }
            }

            // ============================================================
            //  检查登录状态
            // ============================================================

            function checkSession() {
                const username = sessionStorage.getItem('metro_session_user');
                if (username && userExists(username)) {
                    // 自动登录
                    loginPage.style.display = 'none';
                    homePage.style.display = 'flex';
                    const user = getUser(username);
                    displayUsername.textContent = username;
                    greetingUser.textContent = username;
                    if (user) {
                        displayBalance.textContent = formatBalance(user.balance);
                    }
                    renderLines();
                    startClock();
                    return true;
                }
                return false;
            }

            // ============================================================
            //  绑定事件
            // ============================================================

            // 登录
            loginForm.addEventListener('submit', handleLogin);
            loginPassword.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    loginForm.dispatchEvent(new Event('submit'));
                }
            });

            // 登出
            logoutBtn.addEventListener('click', handleLogout);

            // 注册模态框
            openRegisterBtn.addEventListener('click', openRegisterModal);
            closeRegisterBtn.addEventListener('click', closeRegisterModal);
            registerBtn.addEventListener('click', handleRegister);
            // 点击背景关闭注册模态框
            registerModal.addEventListener('click', function(e) {
                if (e.target === this) closeRegisterModal();
            });
            // 注册表单回车
            regVerify.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    registerBtn.click();
                }
            });

            // 站车风采模态框
            closeSceneryBtn.addEventListener('click', closeSceneryModal);
            sceneryModal.addEventListener('click', function(e) {
                if (e.target === this) closeSceneryModal();
            });

            // 快捷功能点击
            document.querySelectorAll('.quick-action').forEach(el => {
                el.addEventListener('click', function() {
                    const action = this.dataset.action;
                    if (action) handleQuickAction(action);
                });
            });

            // 如果登录页的输入框获得焦点，清除错误
            loginUsername.addEventListener('focus', function() {
                loginError.classList.remove('show');
            });
            loginPassword.addEventListener('focus', function() {
                loginError.classList.remove('show');
            });

            // ============================================================
            //  初始化
            // ============================================================

            (function init() {
                // 确保预设 admin 账号存在
                const users = loadUsers();
                if (!users.admin) {
                    users.admin = {
                        password: PRESET_USER.password,
                        balance: PRESET_USER.balance
                    };
                    saveUsers(users);
                }

                // 检查是否已有登录会话
                const hasSession = checkSession();

                if (!hasSession) {
                    loginPage.style.display = 'flex';
                    homePage.style.display = 'none';
                    // 清空输入框
                    loginUsername.value = '';
                    loginPassword.value = '';
                }

                // 预置验证问题（仅用于显示）
                // 不显示在登录页

                // 如果首页已显示，时钟已在 checkSession 中启动
            })();

        })();
    </script>

</body>
</html>
