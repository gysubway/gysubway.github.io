<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>固原地铁 · 售票系统</title>
    <link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap" rel="stylesheet" />
    <style>
        /* ===== 全局重置 ===== */
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family:'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif; background:#e9edf2; min-height:100vh; display:flex; justify-content:center; align-items:center; transition:background 0.3s; }
        #loginPage { width:100%; min-height:100vh; display:flex; justify-content:center; align-items:center; background:linear-gradient(145deg,#0b2a4a 0%,#1a4a6e 100%); padding:20px; }
        .login-card { background:#ffffff; border-radius:24px; padding:44px 40px 36px; width:100%; max-width:420px; box-shadow:0 25px 60px rgba(0,20,40,0.45); transition:transform 0.25s ease; }
        .login-card:hover { transform:translateY(-2px); }
        .login-logo { text-align:center; margin-bottom:28px; }
        .login-logo .icon { font-size:44px; line-height:1; display:block; margin-bottom:6px; }
        .login-logo h1 { font-size:26px; font-weight:700; color:#0b2a4a; letter-spacing:2px; }
        .login-logo p { font-size:14px; color:#7a8a9e; margin-top:2px; letter-spacing:1px; }
        .login-form .form-group { margin-bottom:20px; }
        .login-form label { display:block; font-size:14px; font-weight:600; color:#2c3e50; margin-bottom:6px; letter-spacing:0.5px; }
        .login-form input[type="text"], .login-form input[type="password"] { width:100%; padding:14px 18px; font-size:16px; border:2px solid #dce3ec; border-radius:12px; background:#f8fafc; transition:border-color 0.25s, box-shadow 0.25s; outline:none; color:#1a2a3a; }
        .login-form input:focus { border-color:#1a6e9e; box-shadow:0 0 0 4px rgba(26,110,158,0.12); background:#ffffff; }
        .login-btn { width:100%; padding:16px; font-size:18px; font-weight:700; color:#ffffff; background:linear-gradient(135deg,#1a6e9e,#0b4a72); border:none; border-radius:12px; cursor:pointer; transition:background 0.25s, transform 0.15s, box-shadow 0.25s; letter-spacing:2px; margin-top:4px; }
        .login-btn:hover { background:linear-gradient(135deg,#1f7eb2,#0e5580); box-shadow:0 8px 24px rgba(26,110,158,0.30); transform:translateY(-1px); }
        .login-btn:active { transform:scale(0.98); }
        .login-error { margin-top:16px; padding:12px 16px; background:#fef2f0; border-left:4px solid #d94a4a; border-radius:8px; color:#b33a3a; font-size:14px; display:none; align-items:center; gap:8px; }
        .login-error.show { display:flex; }
        .login-error .err-icon { font-size:18px; }
        .login-footer { text-align:center; margin-top:22px; font-size:14px; color:#9aabba; }
        .login-footer .register-link { display:inline-block; margin-top:6px; color:#1a6e9e; font-weight:600; cursor:pointer; text-decoration:underline; transition:color 0.2s; }
        .login-footer .register-link:hover { color:#0b4a72; }
        .login-footer .forgot-link { display:inline-block; margin-top:4px; color:#7a8a9e; font-size:13px; cursor:pointer; transition:color 0.2s; text-decoration:underline; }
        .login-footer .forgot-link:hover { color:#1a6e9e; }
        .modal-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.55); backdrop-filter:blur(4px); z-index:999; justify-content:center; align-items:center; padding:20px; animation:fadeIn 0.25s ease; }
        .modal-overlay.active { display:flex; }
        @keyframes fadeIn { from{opacity:0; transform:scale(0.96);} to{opacity:1; transform:scale(1);} }
        .modal-card { background:#ffffff; border-radius:24px; padding:36px 32px 32px; width:100%; max-width:580px; box-shadow:0 30px 80px rgba(0,0,0,0.45); max-height:90vh; overflow-y:auto; }
        .modal-card .modal-title { font-size:24px; font-weight:700; color:#0b2a4a; text-align:center; margin-bottom:24px; letter-spacing:1px; }
        .modal-card .form-group { margin-bottom:18px; }
        .modal-card label { display:block; font-size:14px; font-weight:600; color:#2c3e50; margin-bottom:5px; }
        .modal-card input[type="text"], .modal-card input[type="password"], .modal-card input[type="number"] { width:100%; padding:12px 16px; font-size:15px; border:2px solid #dce3ec; border-radius:10px; background:#f8fafc; transition:border-color 0.25s; outline:none; color:#1a2a3a; }
        .modal-card input:focus { border-color:#1a6e9e; background:#ffffff; }
        .modal-card .form-actions { display:flex; gap:12px; margin-top:20px; }
        .modal-card .form-actions button { flex:1; padding:14px; font-size:16px; font-weight:700; border:none; border-radius:10px; cursor:pointer; transition:background 0.25s, transform 0.15s; }
        .modal-card .btn-primary { background:linear-gradient(135deg,#1a6e9e,#0b4a72); color:#ffffff; }
        .modal-card .btn-primary:hover { background:linear-gradient(135deg,#1f7eb2,#0e5580); }
        .modal-card .btn-danger { background:#d94a4a; color:#ffffff; }
        .modal-card .btn-danger:hover { background:#c0392b; }
        .modal-card .btn-cancel { background:#eef2f7; color:#4a5a6a; }
        .modal-card .btn-cancel:hover { background:#e0e6ee; }
        .modal-card .modal-error { margin-top:14px; padding:10px 14px; background:#fef2f0; border-left:4px solid #d94a4a; border-radius:6px; color:#b33a3a; font-size:14px; display:none; align-items:center; gap:8px; }
        .modal-card .modal-error.show { display:flex; }
        .modal-card .modal-success { margin-top:14px; padding:10px 14px; background:#ecf9f0; border-left:4px solid #2ecc71; border-radius:6px; color:#1a7a4a; font-size:14px; display:none; align-items:center; gap:8px; }
        .modal-card .modal-success.show { display:flex; }
        .register-modal .verify-question { background:#eef4fa; padding:12px 16px; border-radius:10px; font-size:15px; color:#0b2a4a; margin-bottom:10px; border-left:4px solid #1a6e9e; font-weight:500; }

        /* ===== 签到答题（键盘版） ===== */
        .quiz-modal .modal-card { max-width:600px; }
        .quiz-modal .quiz-header { display:flex; justify-content:space-between; font-size:18px; font-weight:600; color:#0b2a4a; padding:0 4px 16px 4px; border-bottom:2px solid #eef2f7; }
        .quiz-modal .quiz-header .timer { color:#d94a4a; }
        .quiz-modal .quiz-body { padding:24px 0 16px; text-align:center; }
        .quiz-modal .quiz-body .question-number { font-size:16px; color:#5a6a7a; }
        .quiz-modal .quiz-body .question-text { font-size:32px; font-weight:700; color:#0b2a4a; margin:16px 0 20px; letter-spacing:2px; }
        .quiz-modal .quiz-body .answer-input { display:inline-block; width:120px; padding:10px 16px; font-size:28px; text-align:center; border:3px solid #dce3ec; border-radius:12px; outline:none; transition:border-color 0.2s; background:#f8fafc; }
        .quiz-modal .quiz-body .answer-input:focus { border-color:#1a6e9e; background:#ffffff; }
        .quiz-modal .quiz-body .answer-input:disabled { background:#eef2f7; border-color:#d0dae6; }
        .quiz-modal .quiz-body .feedback { margin-top:16px; font-size:20px; font-weight:600; min-height:40px; }
        .quiz-modal .quiz-body .feedback.correct { color:#27ae60; }
        .quiz-modal .quiz-body .feedback.wrong { color:#e74c3c; }
        .quiz-modal .quiz-footer { display:flex; justify-content:space-between; align-items:center; padding-top:16px; border-top:2px solid #eef2f7; font-size:14px; color:#5a6a7a; }
        .quiz-modal .quiz-footer .score { font-weight:600; color:#0b2a4a; }
        .quiz-modal .quiz-footer .score span { color:#1a6e9e; }

        /* ===== 首页 ===== */
        #homePage { display:none; width:100%; min-height:100vh; background:#eef2f7; flex-direction:column; }
        .navbar { background:linear-gradient(135deg,#0b2a4a,#1a4a6e); padding:0 40px; height:72px; display:flex; align-items:center; justify-content:space-between; box-shadow:0 4px 20px rgba(0,0,0,0.15); position:sticky; top:0; z-index:100; flex-shrink:0; }
        .navbar .brand { display:flex; align-items:center; gap:12px; color:#ffffff; font-size:22px; font-weight:700; letter-spacing:1px; }
        .navbar .brand .brand-icon { font-size:30px; line-height:1; }
        .navbar .brand .brand-sub { font-size:13px; font-weight:400; opacity:0.7; margin-left:4px; }
        .navbar .user-area { display:flex; align-items:center; gap:16px; flex-wrap:wrap; justify-content:flex-end; }
        .navbar .user-area .user-info { display:flex; align-items:center; gap:12px; color:#ffffff; font-size:14px; }
        .navbar .user-area .user-info .user-name { font-weight:600; background:rgba(255,255,255,0.12); padding:5px 16px; border-radius:30px; display:flex; align-items:center; gap:6px; }
        .navbar .user-area .user-info .user-balance { background:rgba(255,215,0,0.20); padding:5px 16px; border-radius:30px; display:flex; align-items:center; gap:4px; color:#ffd700; font-weight:600; }
        .navbar .logout-btn { background:rgba(255,255,255,0.10); border:1.5px solid rgba(255,255,255,0.25); color:#ffffff; padding:7px 22px; border-radius:30px; font-size:14px; font-weight:600; cursor:pointer; transition:background 0.25s, border-color 0.25s; letter-spacing:0.5px; white-space:nowrap; }
        .navbar .logout-btn:hover { background:rgba(255,255,255,0.20); border-color:rgba(255,255,255,0.45); }
        .hero-banner { background:#c0392b; background:linear-gradient(135deg,#b71c1c,#c0392b); padding:24px 20px; text-align:center; border-bottom:4px solid #922b21; box-shadow:0 4px 20px rgba(192,57,43,0.25); flex-shrink:0; }
        .hero-banner h1 { font-family:'Ma Shan Zheng','华文行楷','STXingkai','KaiTi',cursive; font-size:52px; color:#ffffff; letter-spacing:8px; text-shadow:0 2px 12px rgba(0,0,0,0.20); font-weight:400; line-height:1.2; }
        .home-main { flex:1; padding:28px 40px 20px; max-width:1280px; margin:0 auto; width:100%; }
        .welcome-banner { background:linear-gradient(135deg,#ffffff,#f5f9ff); border-radius:20px; padding:22px 30px; margin-bottom:28px; box-shadow:0 2px 12px rgba(0,0,0,0.04); border:1px solid rgba(255,255,255,0.6); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; }
        .welcome-banner .greeting h2 { font-size:22px; font-weight:700; color:#0b2a4a; }
        .welcome-banner .greeting h2 .highlight { color:#1a6e9e; }
        .welcome-banner .greeting p { color:#5a6a7a; font-size:14px; margin-top:2px; }
        .welcome-banner .datetime { text-align:right; color:#3a5a7a; font-size:15px; background:#eef4fa; padding:8px 20px; border-radius:40px; font-weight:500; white-space:nowrap; }
        .welcome-banner .datetime .time { font-size:20px; font-weight:700; color:#0b2a4a; margin-right:6px; }
        .section-title { font-size:18px; font-weight:700; color:#1a2a3a; margin-bottom:14px; display:flex; align-items:center; gap:10px; }
        .section-title .title-line { flex:1; height:2px; background:linear-gradient(to right,#d0dae6,transparent); }
        .card-grid { display:grid; grid-template-columns:1fr 1fr; gap:22px; margin-bottom:28px; }
        .line-card { background:#ffffff; border-radius:18px; padding:20px 24px 18px; box-shadow:0 2px 12px rgba(0,0,0,0.04); border:1px solid #eef2f7; transition:box-shadow 0.2s, transform 0.2s; }
        .line-card:hover { box-shadow:0 8px 28px rgba(0,20,40,0.08); transform:translateY(-2px); }
        .line-card .line-header { display:flex; align-items:center; gap:12px; margin-bottom:10px; }
        .line-card .line-color { width:6px; height:30px; border-radius:6px; flex-shrink:0; }
        .line-card .line-name { font-size:18px; font-weight:700; color:#0b2a4a; }
        .line-card .line-name .line-code { font-size:14px; font-weight:400; color:#7a8a9e; margin-left:6px; }
        .line-card .line-stations { display:flex; flex-wrap:wrap; gap:4px 14px; padding-left:18px; margin-top:4px; }
        .line-card .line-stations .station { font-size:14px; color:#2a4a6a; padding:2px 0; position:relative; }
        .line-card .line-stations .station::after { content:"·"; color:#b0c4d8; margin-left:10px; }
        .line-card .line-stations .station:last-child::after { content:""; margin:0; }
        .line-card .line-stations .station .dir-icon { font-size:12px; color:#8a9aaa; margin:0 2px; }
        .quick-actions { display:grid; grid-template-columns:repeat(5,1fr); gap:16px; margin-bottom:8px; }
        .quick-action { background:#ffffff; border-radius:16px; padding:24px 12px 20px; text-align:center; box-shadow:0 2px 12px rgba(0,0,0,0.04); border:1px solid #eef2f7; cursor:pointer; transition:box-shadow 0.2s, transform 0.2s, border-color 0.2s; user-select:none; }
        .quick-action:hover { box-shadow:0 8px 28px rgba(0,20,40,0.10); transform:translateY(-3px); border-color:#c8d8e8; }
        .quick-action:active { transform:scale(0.97); }
        .quick-action .qa-icon { font-size:34px; display:block; margin-bottom:8px; }
        .quick-action .qa-label { font-size:16px; font-weight:600; color:#1a2a3a; }
        .quick-action .qa-desc { font-size:12px; color:#8a9aaa; margin-top:2px; }
        .quick-action.admin-action { border-color:#f1c40f; background:#fef9e7; }
        .quick-action.admin-action:hover { border-color:#d4ac0d; }
        .quick-action.signin-action { border-color:#2ecc71; background:#eafaf1; }
        .quick-action.signin-action:hover { border-color:#1e8449; }
        .quick-action.signin-action.disabled { opacity:0.6; cursor:not-allowed; filter:grayscale(0.3); }
        .quick-action.signin-action.disabled:hover { transform:none; box-shadow:0 2px 12px rgba(0,0,0,0.04); border-color:#eef2f7; }
        .home-footer { text-align:center; padding:20px 20px 8px; color:#8a9aaa; font-size:13px; border-top:1px solid #e0e6ee; margin-top:12px; }
        .home-footer strong { color:#1a4a6e; }

        /* ===== 管理面板 ===== */
        .admin-modal .modal-card { max-width:820px; }
        .admin-modal .tab-bar { display:flex; gap:4px; border-bottom:2px solid #e0e6ee; margin-bottom:24px; flex-wrap:wrap; }
        .admin-modal .tab-bar .tab-btn { padding:10px 24px; font-size:16px; font-weight:600; border:none; background:transparent; cursor:pointer; color:#5a6a7a; border-bottom:3px solid transparent; transition:color 0.2s, border-color 0.2s; }
        .admin-modal .tab-bar .tab-btn.active { color:#0b2a4a; border-bottom-color:#1a6e9e; }
        .admin-modal .tab-bar .tab-btn:hover { color:#0b2a4a; }
        .admin-modal .tab-content { display:none; }
        .admin-modal .tab-content.active { display:block; }
        .admin-modal .user-table-wrap { overflow-x:auto; }
        .admin-modal table { width:100%; border-collapse:collapse; font-size:14px; }
        .admin-modal table th { background:#eef4fa; color:#0b2a4a; font-weight:700; padding:12px 10px; text-align:left; border-bottom:2px solid #d0dae6; }
        .admin-modal table td { padding:10px 10px; border-bottom:1px solid #eef2f7; vertical-align:middle; }
        .admin-modal table tr:hover td { background:#f8fafc; }
        .admin-modal .table-actions { display:flex; gap:6px; flex-wrap:wrap; }
        .admin-modal .table-actions button { padding:4px 12px; font-size:12px; border:none; border-radius:6px; font-weight:600; cursor:pointer; transition:background 0.2s; }
        .admin-modal .btn-edit { background:#d4e6f1; color:#1a4a6e; }
        .admin-modal .btn-edit:hover { background:#b0d0e6; }
        .admin-modal .btn-balance { background:#fdebd0; color:#a04000; }
        .admin-modal .btn-balance:hover { background:#fad7a0; }
        .admin-modal .btn-delete { background:#fadbd8; color:#922b21; }
        .admin-modal .btn-delete:hover { background:#f5b7b1; }
        .admin-modal .add-btn { margin-top:16px; padding:10px 20px; background:#1a6e9e; color:#fff; border:none; border-radius:8px; font-weight:600; cursor:pointer; transition:background 0.2s; }
        .admin-modal .add-btn:hover { background:#0b4a72; }
        .admin-modal .scenery-list { display:flex; flex-direction:column; gap:12px; margin-top:8px; }
        .admin-modal .scenery-item-admin { background:#f8fafc; border-radius:12px; padding:14px 18px; border:1px solid #eef2f7; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; }
        .admin-modal .scenery-item-admin .info { display:flex; align-items:center; gap:12px; flex:1; min-width:150px; }
        .admin-modal .scenery-item-admin .info .icon { font-size:28px; }
        .admin-modal .scenery-item-admin .info .name { font-weight:700; color:#0b2a4a; }
        .admin-modal .scenery-item-admin .info .desc { color:#5a6a7a; font-size:13px; }
        .admin-modal .scenery-item-admin .actions { display:flex; gap:6px; }
        .admin-modal .scenery-item-admin .actions button { padding:4px 14px; font-size:12px; border:none; border-radius:6px; font-weight:600; cursor:pointer; transition:background 0.2s; }
        .admin-modal .scenery-item-admin .actions .btn-edit { background:#d4e6f1; color:#1a4a6e; }
        .admin-modal .scenery-item-admin .actions .btn-edit:hover { background:#b0d0e6; }
        .admin-modal .scenery-item-admin .actions .btn-delete { background:#fadbd8; color:#922b21; }
        .admin-modal .scenery-item-admin .actions .btn-delete:hover { background:#f5b7b1; }
        /* 新增提示 */
        .admin-modal .local-hint { background:#f0f5fb; padding:8px 16px; border-radius:8px; font-size:13px; color:#3a5a7a; margin-bottom:16px; border-left:4px solid #1a6e9e; }

        .toast-container { position:fixed; top:100px; left:50%; transform:translateX(-50%); z-index:9999; pointer-events:none; }
        .toast { background:#1a2a3a; color:#ffffff; padding:14px 32px; border-radius:12px; font-size:15px; font-weight:500; box-shadow:0 8px 32px rgba(0,0,0,0.30); opacity:0; transform:translateY(-20px) scale(0.95); transition:opacity 0.35s ease, transform 0.35s ease; pointer-events:auto; display:flex; align-items:center; gap:10px; white-space:nowrap; }
        .toast.show { opacity:1; transform:translateY(0) scale(1); }
        .toast .toast-icon { font-size:20px; }

        @media (max-width:992px) { .card-grid { grid-template-columns:1fr; gap:16px; } .quick-actions { grid-template-columns:repeat(3,1fr); } .home-main { padding:20px 24px 16px; } .navbar { padding:0 24px; height:64px; } .navbar .brand { font-size:18px; } .navbar .brand .brand-sub { display:none; } .hero-banner h1 { font-size:38px; letter-spacing:4px; } .welcome-banner { flex-direction:column; align-items:flex-start; } .welcome-banner .datetime { text-align:left; width:100%; white-space:normal; } .admin-modal .modal-card { max-width:95%; padding:24px 16px; } .quiz-modal .modal-card { max-width:95%; } }
        @media (max-width:600px) { .login-card { padding:28px 18px 24px; } .login-logo h1 { font-size:22px; } .navbar .user-area .user-info { font-size:12px; gap:6px; flex-wrap:wrap; justify-content:flex-end; } .navbar .user-area .user-info .user-name, .navbar .user-area .user-info .user-balance { padding:3px 12px; font-size:12px; } .navbar .logout-btn { font-size:12px; padding:5px 14px; } .navbar { padding:0 14px; height:58px; } .navbar .brand { font-size:16px; gap:6px; } .navbar .brand .brand-icon { font-size:22px; } .hero-banner h1 { font-size:28px; letter-spacing:2px; } .hero-banner { padding:16px 12px; } .quick-actions { grid-template-columns:1fr 1fr 1fr; gap:10px; } .quick-action { padding:16px 6px 14px; } .quick-action .qa-icon { font-size:26px; } .quick-action .qa-label { font-size:14px; } .quick-action .qa-desc { font-size:11px; } .line-card { padding:14px 16px; } .line-card .line-stations { gap:2px 10px; padding-left:10px; } .line-card .line-stations .station { font-size:13px; } .home-main { padding:14px 14px 12px; } .welcome-banner { padding:14px 16px; } .welcome-banner .greeting h2 { font-size:18px; } .modal-card { padding:24px 18px 20px; } .modal-card .form-actions { flex-direction:column; } .toast { padding:12px 20px; font-size:14px; white-space:normal; } .admin-modal table th, .admin-modal table td { padding:6px 4px; font-size:12px; } .admin-modal .table-actions button { font-size:10px; padding:2px 8px; } .admin-modal .scenery-item-admin { flex-direction:column; align-items:stretch; } .admin-modal .scenery-item-admin .info { flex-wrap:wrap; } .quiz-modal .quiz-body .question-text { font-size:24px; } .quiz-modal .quiz-body .answer-input { width:80px; font-size:22px; } }
        .text-muted { color:#8a9aaa; font-size:13px; }
        .mt-8 { margin-top:8px; }
        .flex-center { display:flex; align-items:center; gap:6px; }
        .text-center { text-align:center; }
        .w-full { width:100%; }
    </style>
</head>
<body>

    <!-- ===== 登录页 ===== -->
    <div id="loginPage">
        <div class="login-card">
            <div class="login-logo"><span class="icon">🚇</span><h1>固原地铁</h1><p>售票系统 · 运营中心</p></div>
            <form class="login-form" id="loginForm" autocomplete="off">
                <div class="form-group"><label for="loginUsername">账号</label><input type="text" id="loginUsername" placeholder="请输入账号" required /></div>
                <div class="form-group"><label for="loginPassword">密码</label><input type="password" id="loginPassword" placeholder="请输入密码" required /></div>
                <button type="submit" class="login-btn">登 录</button>
                <div class="login-error" id="loginError"><span class="err-icon">⚠️</span><span id="errorMessage">账号或密码错误，请重试</span></div>
            </form>
            <div class="login-footer">
                <div><span>还没有账号？</span><span class="register-link" id="openRegisterBtn">立即注册</span></div>
                <div><span class="forgot-link" id="openForgotBtn">🔑 忘记密码？</span></div>
            </div>
        </div>
    </div>

    <!-- ===== 注册模态框 ===== -->
    <div class="modal-overlay register-modal" id="registerModal">
        <div class="modal-card">
            <div class="modal-title">📝 注册新账号</div>
            <div class="form-group"><label for="regUsername">账号</label><input type="text" id="regUsername" placeholder="请设置账号（至少2个字符）" /></div>
            <div class="form-group"><label for="regPassword">密码</label><input type="password" id="regPassword" placeholder="请设置密码（至少6个字符）" /></div>
            <div class="form-group"><label for="regConfirm">确认密码</label><input type="password" id="regConfirm" placeholder="请再次输入密码" /></div>
            <div class="form-group">
                <label>验证身份</label>
                <div class="verify-question">❓ 固局更高速度实验列车的车号是？</div>
                <input type="text" id="regVerify" placeholder="请输入答案" />
            </div>
            <div class="modal-error" id="regError"><span class="err-icon">⚠️</span><span id="regErrorMessage">错误信息</span></div>
            <div class="modal-success" id="regSuccess"><span>✅</span><span id="regSuccessMessage">注册成功！</span></div>
            <div class="form-actions"><button class="btn-cancel" id="closeRegisterBtn">取消</button><button class="btn-primary" id="registerBtn">注 册</button></div>
        </div>
    </div>

    <!-- ===== 忘记密码模态框 ===== -->
    <div class="modal-overlay" id="forgotModal">
        <div class="modal-card">
            <div class="modal-title">🔑 重置密码</div>
            <div class="form-group"><label for="forgotUsername">账号</label><input type="text" id="forgotUsername" placeholder="请输入您的账号" /></div>
            <div class="form-group">
                <label>身份验证</label>
                <div class="verify-question" style="background:#eef4fa;padding:12px 16px;border-radius:10px;font-size:15px;color:#0b2a4a;margin-bottom:10px;border-left:4px solid #1a6e9e;font-weight:500;">❓ 固局更高速度实验列车的车号是？</div>
                <input type="text" id="forgotVerify" placeholder="请输入答案" />
            </div>
            <div class="form-group"><label for="forgotNewPassword">新密码</label><input type="password" id="forgotNewPassword" placeholder="请设置新密码（至少6个字符）" /></div>
            <div class="modal-error" id="forgotError"><span class="err-icon">⚠️</span><span id="forgotErrorMessage">错误信息</span></div>
            <div class="modal-success" id="forgotSuccess"><span>✅</span><span id="forgotSuccessMessage">密码已重置！</span></div>
            <div class="form-actions"><button class="btn-cancel" id="closeForgotBtn">取消</button><button class="btn-primary" id="forgotBtn">重置密码</button></div>
        </div>
    </div>

    <!-- ===== 签到答题模态框 ===== -->
    <div class="modal-overlay quiz-modal" id="quizModal">
        <div class="modal-card">
            <div class="modal-title">⏱️ 速算挑战 · 每日签到</div>
            <div class="quiz-header">
                <span>📝 <span id="quizProgress">1/20</span></span>
                <span class="timer" id="quizTimer">⏳ 30s</span>
            </div>
            <div class="quiz-body">
                <div class="question-number" id="questionNumber">第 1 题</div>
                <div class="question-text" id="questionText">3 + 5 = ?</div>
                <input type="number" class="answer-input" id="answerInput" placeholder="?" autofocus />
                <div class="feedback" id="feedback"></div>
            </div>
            <div class="quiz-footer">
                <span>✅ 正确: <span id="correctCount">0</span></span>
                <span>❌ 错误: <span id="wrongCount">0</span></span>
                <span class="score">得分: <span id="scoreDisplay">0</span> / 20</span>
            </div>
            <div class="form-actions" style="margin-top:16px;">
                <button class="btn-cancel" id="closeQuizBtn">关闭</button>
            </div>
        </div>
    </div>

    <!-- ===== 管理面板 ===== -->
    <div class="modal-overlay admin-modal" id="adminModal">
        <div class="modal-card">
            <div class="modal-title">⚙️ 管理面板</div>
            <div class="tab-bar">
                <button class="tab-btn active" data-tab="users">👥 用户管理</button>
                <button class="tab-btn" data-tab="scenery">📸 站车风采</button>
            </div>
            <div class="tab-content active" id="tabUsers">
                <div class="local-hint">💡 显示所有用户（跨设备/浏览器互通）</div>
                <div class="user-table-wrap"><table><thead><tr><th>用户名</th><th>余额</th><th>操作</th></tr></thead><tbody id="userTableBody"></tbody></table></div>
                <p class="text-muted mt-8">* 管理员可修改密码、余额，注销账号（不能注销自己）</p>
            </div>
            <div class="tab-content" id="tabScenery">
                <div class="scenery-list" id="sceneryAdminList"></div>
                <button class="add-btn" id="addSceneryBtn">➕ 新增风采</button>
            </div>
            <div class="form-actions" style="margin-top:20px;"><button class="btn-cancel" id="closeAdminBtn" style="flex:1;">关闭</button></div>
        </div>
    </div>

    <!-- ===== 编辑风采模态框 ===== -->
    <div class="modal-overlay" id="editSceneryModal">
        <div class="modal-card">
            <div class="modal-title" id="editSceneryTitle">编辑风采</div>
            <input type="hidden" id="editSceneryId" value="" />
            <div class="form-group"><label>图标 (Emoji)</label><input type="text" id="editSceneryIcon" placeholder="例如 🏛️" /></div>
            <div class="form-group"><label>名称</label><input type="text" id="editSceneryName" placeholder="站点或车型名称" /></div>
            <div class="form-group"><label>描述</label><input type="text" id="editSceneryDesc" placeholder="简要描述" /></div>
            <div class="modal-error" id="editSceneryError"><span class="err-icon">⚠️</span><span id="editSceneryErrorMessage">错误信息</span></div>
            <div class="form-actions"><button class="btn-cancel" id="closeEditSceneryBtn">取消</button><button class="btn-primary" id="saveSceneryBtn">保存</button></div>
        </div>
    </div>

    <!-- ===== 首页 ===== -->
    <div id="homePage">
        <nav class="navbar">
            <div class="brand"><span class="brand-icon">🚇</span><span>固原地铁</span><span class="brand-sub">· 售票系统</span></div>
            <div class="user-area">
                <div class="user-info"><span class="user-name">👤 <span id="displayUsername">用户</span></span><span class="user-balance">💰 <span id="displayBalance">0.00</span></span></div>
                <button class="logout-btn" id="logoutBtn">退出登录</button>
            </div>
        </nav>
        <div class="hero-banner"><h1>🚇 固原地铁欢迎您！</h1></div>
        <main class="home-main">
            <div class="welcome-banner">
                <div class="greeting"><h2>👋 欢迎回来，<span class="highlight" id="greetingUser">用户</span></h2><p>固原地铁 · 智能售票系统 v4.0</p></div>
                <div class="datetime" id="datetimeDisplay"><span class="time" id="currentTime">--:--:--</span><span id="currentDate">----年--月--日</span></div>
            </div>
            <div class="section-title">📍 线路概览<span class="title-line"></span></div>
            <div class="card-grid" id="lineGrid"></div>
            <div class="section-title" style="margin-top:6px;">🎫 快捷功能<span class="title-line"></span></div>
            <div class="quick-actions" id="quickActions">
                <div class="quick-action" data-action="ticket"><span class="qa-icon">🎟️</span><div class="qa-label">购票</div><div class="qa-desc">即将开放</div></div>
                <div class="quick-action" data-action="line"><span class="qa-icon">🗺️</span><div class="qa-label">线路查询</div><div class="qa-desc">即将开放</div></div>
                <div class="quick-action" data-action="scenery"><span class="qa-icon">📸</span><div class="qa-label">站车风采</div><div class="qa-desc">点击欣赏</div></div>
                <div class="quick-action signin-action" data-action="signin" id="signinEntry">
                    <span class="qa-icon">⌨️</span><div class="qa-label">每日签到</div>
                    <div class="qa-desc" id="signinDesc">速算挑战</div>
                </div>
                <div class="quick-action admin-action" data-action="admin" id="adminEntry" style="display:none;">
                    <span class="qa-icon">⚙️</span><div class="qa-label">管理面板</div><div class="qa-desc">管理员专用</div>
                </div>
            </div>
            <div class="home-footer">&copy; 2026 <strong>固原地铁</strong> · 虚拟线网数据 · 仅供演示</div>
        </main>
    </div>

    <!-- ===== Toast ===== -->
    <div class="toast-container" id="toastContainer"></div>

    <script>
        (function() {
            'use strict';

            // ===== 后端 API 地址 =====
            const API_BASE = 'https://gysubwaygithubio-production.up.railway.app/api';

            // ===== 封装 API 调用 =====
            async function apiCall(endpoint, options = {}) {
                const url = `${API_BASE}${endpoint}`;
                const config = {
                    ...options,
                    headers: {
                        'Content-Type': 'application/json',
                        ...options.headers
                    },
                    body: options.body ? JSON.stringify(options.body) : undefined
                };
                const res = await fetch(url, config);
                if (!res.ok) {
                    const err = await res.json().catch(() => ({ message: '请求失败' }));
                    throw new Error(err.message || '网络错误');
                }
                return res.json();
            }

            // ===== 常量 =====
            const LINE_DATA = [
                { id: 1, name: '1号线', code: 'M1', color: '#e74c3c', stations: ['火车站', '市政府', '人民广场', '大学城', '科技园', '体育中心'] },
                { id: 2, name: '2号线', code: 'M2', color: '#3498db', stations: ['机场', '会展中心', '市中心', '体育馆', '高铁站', '生态园'] },
                { id: 3, name: '3号线', code: 'M3', color: '#2ecc71', stations: ['汽车站', '商业街', '文化宫', '图书馆', '政务中心', '智慧谷'] },
                { id: 4, name: '4号线', code: 'M4', color: '#f39c12', stations: ['古雁岭', '新区医院', '实验中学', '万达广场', '行政中心', '固原南站'] }
            ];
            const VERIFY_QUESTION = '固局更高速度实验列车的车号是？';
            const VERIFY_ANSWER = 'CRH380CM-0304';
            const SIGNIN_AMOUNT = 20;
            const MAX_ATTEMPTS_PER_DAY = 2;
            const TOTAL_QUESTIONS = 20;
            const TIME_LIMIT = 30;
            const PASS_SCORE = 16;

            // ===== DOM 引用 =====
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
            const adminEntry = document.getElementById('adminEntry');
            const signinEntry = document.getElementById('signinEntry');
            const signinDesc = document.getElementById('signinDesc');

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

            const forgotModal = document.getElementById('forgotModal');
            const openForgotBtn = document.getElementById('openForgotBtn');
            const closeForgotBtn = document.getElementById('closeForgotBtn');
            const forgotBtn = document.getElementById('forgotBtn');
            const forgotUsername = document.getElementById('forgotUsername');
            const forgotVerify = document.getElementById('forgotVerify');
            const forgotNewPassword = document.getElementById('forgotNewPassword');
            const forgotError = document.getElementById('forgotError');
            const forgotErrorMessage = document.getElementById('forgotErrorMessage');
            const forgotSuccess = document.getElementById('forgotSuccess');
            const forgotSuccessMessage = document.getElementById('forgotSuccessMessage');

            const quizModal = document.getElementById('quizModal');
            const quizProgress = document.getElementById('quizProgress');
            const quizTimer = document.getElementById('quizTimer');
            const questionNumber = document.getElementById('questionNumber');
            const questionText = document.getElementById('questionText');
            const answerInput = document.getElementById('answerInput');
            const feedback = document.getElementById('feedback');
            const correctCount = document.getElementById('correctCount');
            const wrongCount = document.getElementById('wrongCount');
            const scoreDisplay = document.getElementById('scoreDisplay');
            const closeQuizBtn = document.getElementById('closeQuizBtn');

            const adminModal = document.getElementById('adminModal');
            const closeAdminBtn = document.getElementById('closeAdminBtn');
            const userTableBody = document.getElementById('userTableBody');
            const sceneryAdminList = document.getElementById('sceneryAdminList');
            const addSceneryBtn = document.getElementById('addSceneryBtn');
            const tabBtns = document.querySelectorAll('.tab-btn');
            const tabContents = { users: document.getElementById('tabUsers'), scenery: document.getElementById('tabScenery') };

            const editSceneryModal = document.getElementById('editSceneryModal');
            const closeEditSceneryBtn = document.getElementById('closeEditSceneryBtn');
            const saveSceneryBtn = document.getElementById('saveSceneryBtn');
            const editSceneryId = document.getElementById('editSceneryId');
            const editSceneryIcon = document.getElementById('editSceneryIcon');
            const editSceneryName = document.getElementById('editSceneryName');
            const editSceneryDesc = document.getElementById('editSceneryDesc');
            const editSceneryError = document.getElementById('editSceneryError');
            const editSceneryErrorMessage = document.getElementById('editSceneryErrorMessage');
            const editSceneryTitle = document.getElementById('editSceneryTitle');

            const toastContainer = document.getElementById('toastContainer');

            let currentUser = null;
            let clockInterval = null;

            // ===== 签到答题状态 =====
            let quizQuestions = [];
            let currentIndex = 0;
            let correctAnswers = 0;
            let wrongAnswers = 0;
            let timer = TIME_LIMIT;
            let timerInterval = null;
            let quizActive = false;
            let isWaiting = false;

            // ===== 工具函数 =====
            function formatDate(now) {
                const y = now.getFullYear(), m = String(now.getMonth()+1).padStart(2,'0'), d = String(now.getDate()).padStart(2,'0');
                return y+'年'+m+'月'+d+'日 '+['星期日','星期一','星期二','星期三','星期四','星期五','星期六'][now.getDay()];
            }
            function formatTime(now) { return String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0')+':'+String(now.getSeconds()).padStart(2,'0'); }
            function formatBalance(val) { return '¥'+Number(val).toFixed(2); }
            function showToast(msg, icon) {
                icon = icon || 'ℹ️';
                const t = document.createElement('div');
                t.className = 'toast';
                t.innerHTML = `<span class="toast-icon">${icon}</span> ${msg}`;
                toastContainer.appendChild(t);
                requestAnimationFrame(() => t.classList.add('show'));
                setTimeout(() => {
                    t.classList.remove('show');
                    setTimeout(() => { if (t.parentNode) t.parentNode.removeChild(t); }, 400);
                }, 2800);
            }
            function closeAllModals() {
                registerModal.classList.remove('active');
                adminModal.classList.remove('active');
                editSceneryModal.classList.remove('active');
                forgotModal.classList.remove('active');
                quizModal.classList.remove('active');
            }

            // ===== 生成随机题目 =====
            function generateQuestion() {
                const ops = ['+', '-', '*', '/'];
                let op, a, b, answer, symbol;
                let attempts = 0;
                while (attempts < 30) {
                    op = ops[Math.floor(Math.random() * ops.length)];
                    a = Math.floor(Math.random() * 11);
                    b = Math.floor(Math.random() * 11);
                    if (op === '+') {
                        answer = a + b;
                        symbol = '+';
                        if (answer <= 20) break;
                    } else if (op === '-') {
                        if (a >= b) {
                            answer = a - b;
                            symbol = '-';
                            break;
                        }
                    } else if (op === '*') {
                        answer = a * b;
                        symbol = '×';
                        if (answer <= 100) break;
                    } else if (op === '/') {
                        if (b !== 0 && a % b === 0) {
                            answer = a / b;
                            symbol = '÷';
                            break;
                        }
                    }
                    attempts++;
                }
                if (attempts >= 30) {
                    a = Math.floor(Math.random() * 11);
                    b = Math.floor(Math.random() * 11);
                    answer = a + b;
                    symbol = '+';
                }
                const text = a + ' ' + symbol + ' ' + b + ' = ?';
                return { text, answer };
            }

            function generateQuizQuestions(count) {
                const qs = [];
                for (let i = 0; i < count; i++) {
                    qs.push(generateQuestion());
                }
                return qs;
            }

            // ===== 签到UI更新（从后端获取状态） =====
            async function updateSigninUI() {
                if (!currentUser || currentUser === 'admin') { signinEntry.style.display = 'none'; return; }
                signinEntry.style.display = 'block';
                try {
                    const status = await apiCall(`/signin/${currentUser}`);
                    if (status.signed) {
                        signinDesc.textContent = '✅ 今日已签到';
                        signinEntry.classList.add('disabled');
                    } else if (status.attempts <= 0) {
                        signinDesc.textContent = '❌ 今日机会已用完';
                        signinEntry.classList.add('disabled');
                    } else {
                        signinDesc.textContent = `⌨️ 剩余 ${status.attempts} 次机会`;
                        signinEntry.classList.remove('disabled');
                    }
                } catch (e) {
                    signinDesc.textContent = '⚠️ 加载失败';
                    signinEntry.classList.add('disabled');
                }
            }

            // ===== 打开签到模态框 =====
            function openQuizModal() {
                if (!currentUser || currentUser === 'admin') { showToast('普通用户专享', 'ℹ️'); return; }
                // 先获取状态
                apiCall(`/signin/${currentUser}`).then(status => {
                    if (status.signed) { showToast('今日已签到，明天再来吧！', '✅'); return; }
                    if (status.attempts <= 0) { showToast('今日机会已用完，明天再来！', '❌'); return; }

                    // 重置状态
                    quizQuestions = generateQuizQuestions(TOTAL_QUESTIONS);
                    currentIndex = 0;
                    correctAnswers = 0;
                    wrongAnswers = 0;
                    timer = TIME_LIMIT;
                    quizActive = true;
                    isWaiting = false;

                    quizModal.classList.add('active');
                    renderQuestion();
                    updateStats();
                    startTimer();
                    answerInput.value = '';
                    answerInput.disabled = false;
                    answerInput.focus();
                    feedback.textContent = '';
                    feedback.className = 'feedback';
                }).catch(() => showToast('获取签到状态失败', '❌'));
            }

            function renderQuestion() {
                if (currentIndex >= TOTAL_QUESTIONS) {
                    finishQuiz();
                    return;
                }
                const q = quizQuestions[currentIndex];
                questionNumber.textContent = '第 ' + (currentIndex + 1) + ' 题';
                questionText.textContent = q.text;
                quizProgress.textContent = (currentIndex + 1) + '/' + TOTAL_QUESTIONS;
                answerInput.value = '';
                answerInput.disabled = false;
                answerInput.focus();
                feedback.textContent = '';
                feedback.className = 'feedback';
                isWaiting = false;
            }

            function updateStats() {
                correctCount.textContent = correctAnswers;
                wrongCount.textContent = wrongAnswers;
                scoreDisplay.textContent = correctAnswers;
            }

            function startTimer() {
                if (timerInterval) clearInterval(timerInterval);
                timer = TIME_LIMIT;
                updateTimerDisplay();
                timerInterval = setInterval(() => {
                    timer--;
                    updateTimerDisplay();
                    if (timer <= 0) {
                        clearInterval(timerInterval);
                        timerInterval = null;
                        if (quizActive) {
                            finishQuiz(true);
                        }
                    }
                }, 1000);
            }

            function updateTimerDisplay() {
                quizTimer.textContent = '⏳ ' + timer + 's';
                if (timer <= 5) {
                    quizTimer.style.color = '#d94a4a';
                } else {
                    quizTimer.style.color = '#d94a4a';
                }
            }

            function stopTimer() {
                if (timerInterval) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                }
            }

            // ===== 提交答案 =====
            function handleAnswer() {
                if (!quizActive || isWaiting) return;
                if (currentIndex >= TOTAL_QUESTIONS) return;
                const input = answerInput.value.trim();
                if (input === '') return;
                const userAns = Number(input);
                if (isNaN(userAns)) { showToast('请输入有效数字', '⚠️'); return; }

                const q = quizQuestions[currentIndex];
                const correct = userAns === q.answer;

                answerInput.disabled = true;

                if (correct) {
                    correctAnswers++;
                    feedback.textContent = '✅ 正确！';
                    feedback.className = 'feedback correct';
                } else {
                    wrongAnswers++;
                    feedback.textContent = '❌ 错误，正确答案是 ' + q.answer;
                    feedback.className = 'feedback wrong';
                }
                updateStats();
                isWaiting = true;

                setTimeout(() => {
                    if (!quizActive) return;
                    currentIndex++;
                    if (currentIndex >= TOTAL_QUESTIONS) {
                        finishQuiz(false);
                    } else {
                        renderQuestion();
                        answerInput.disabled = false;
                        answerInput.focus();
                    }
                }, 600);
            }

            // ===== 结束答题 =====
            function finishQuiz(timeout) {
                if (!quizActive) return;
                quizActive = false;
                stopTimer();
                answerInput.disabled = true;

                let success = false;
                if (timeout) {
                    success = false;
                    feedback.textContent = '⏰ 时间到！';
                    feedback.className = 'feedback wrong';
                } else {
                    success = correctAnswers >= PASS_SCORE;
                    if (success) {
                        feedback.textContent = '🎉 达标！签到成功！';
                        feedback.className = 'feedback correct';
                    } else {
                        feedback.textContent = '😞 未达标（需要 ≥' + PASS_SCORE + ' 题正确）';
                        feedback.className = 'feedback wrong';
                    }
                }

                // 更新后端签到状态
                apiCall(`/signin/${currentUser}`, { method: 'POST', body: { attempts: -1, signed: success } })
                    .then(() => {
                        // 若成功，还需更新用户余额
                        if (success) {
                            // 获取最新用户信息并更新显示
                            apiCall(`/login`, { method: 'POST', body: { username: currentUser, password: '' } })
                                .then(data => {
                                    if (data.success) {
                                        displayBalance.textContent = formatBalance(data.balance);
                                        showToast('签到成功！获得 ¥' + SIGNIN_AMOUNT, '💰');
                                    }
                                });
                        }
                        updateSigninUI();
                    })
                    .catch(() => showToast('更新签到状态失败', '❌'));

                // 显示结果信息
                const resultMsg = document.createElement('div');
                resultMsg.style.marginTop = '16px';
                resultMsg.style.fontSize = '18px';
                resultMsg.style.fontWeight = '700';
                resultMsg.style.textAlign = 'center';
                if (success) {
                    resultMsg.style.color = '#27ae60';
                    resultMsg.textContent = '✅ 签到成功！余额 +' + SIGNIN_AMOUNT;
                } else {
                    resultMsg.style.color = '#e74c3c';
                    resultMsg.textContent = '❌ 签到失败';
                }
                const footer = document.querySelector('.quiz-footer');
                footer.parentNode.insertBefore(resultMsg, footer);
            }

            function closeQuizModal() {
                stopTimer();
                quizActive = false;
                quizModal.classList.remove('active');
                const extra = document.querySelector('.quiz-footer ~ div[style]');
                if (extra) extra.remove();
                answerInput.disabled = false;
                answerInput.value = '';
                feedback.textContent = '';
                feedback.className = 'feedback';
                if (currentUser) updateSigninUI();
            }

            // ===== 渲染线路 =====
            function renderLines() {
                if (!lineGrid) return;
                lineGrid.innerHTML = '';
                LINE_DATA.forEach(line => {
                    const card = document.createElement('div');
                    card.className = 'line-card';
                    const stationsHtml = line.stations.map((s, idx) => {
                        let arrow = (idx < line.stations.length - 1) ? ' <span class="dir-icon">→</span> ' : '';
                        return '<span class="station">' + s + arrow + '</span>';
                    }).join('');
                    card.innerHTML = `<div class="line-header"><div class="line-color" style="background:${line.color};"></div><span class="line-name">${line.name}<span class="line-code">${line.code}</span></span></div><div class="line-stations">${stationsHtml}</div>`;
                    lineGrid.appendChild(card);
                });
            }

            // ===== 管理面板 - 用户 =====
            async function renderUserTable() {
                try {
                    const users = await apiCall('/users');
                    userTableBody.innerHTML = '';
                    users.forEach(u => {
                        const tr = document.createElement('tr');
                        let actions = `<button class="btn-edit" data-username="${u.username}" data-action="changePwd">改密码</button><button class="btn-balance" data-username="${u.username}" data-action="changeBalance">改余额</button>`;
                        if (u.username !== 'admin') {
                            actions += `<button class="btn-delete" data-username="${u.username}" data-action="delete">注销</button>`;
                        } else {
                            actions += `<span style="color:#aaa;font-size:12px;">(管理员)</span>`;
                        }
                        tr.innerHTML = `<td><strong>${u.username}</strong></td><td>${formatBalance(u.balance)}</td><td><div class="table-actions">${actions}</div></td>`;
                        userTableBody.appendChild(tr);
                    });
                    // 绑定事件
                    userTableBody.querySelectorAll('[data-action]').forEach(btn => {
                        btn.addEventListener('click', function() {
                            handleUserAction(this.dataset.action, this.dataset.username);
                        });
                    });
                } catch (e) {
                    showToast('加载用户列表失败', '❌');
                }
            }

            async function handleUserAction(action, username) {
                if (action === 'changePwd') {
                    const p = prompt('请输入新密码（至少6个字符）：');
                    if (p === null) return;
                    if (p.length < 6) { showToast('密码至少6个字符', '⚠️'); return; }
                    try {
                        await apiCall(`/user/${username}`, { method: 'PUT', body: { password: p } });
                        showToast('密码已修改', '✅');
                        renderUserTable();
                    } catch (e) { showToast('修改失败', '❌'); }
                } else if (action === 'changeBalance') {
                    const input = prompt('请输入新的余额（数字）：');
                    if (input === null) return;
                    const val = parseFloat(input);
                    if (isNaN(val) || val < 0) { showToast('请输入有效数字', '⚠️'); return; }
                    try {
                        await apiCall(`/user/${username}`, { method: 'PUT', body: { balance: val } });
                        showToast('余额已更新', '✅');
                        renderUserTable();
                        if (username === currentUser) {
                            const data = await apiCall('/login', { method: 'POST', body: { username: currentUser, password: '' } });
                            if (data.success) displayBalance.textContent = formatBalance(data.balance);
                        }
                    } catch (e) { showToast('修改失败', '❌'); }
                } else if (action === 'delete') {
                    if (username === 'admin') { showToast('不能注销管理员', '⚠️'); return; }
                    if (confirm('确定注销用户 ' + username + ' 吗？')) {
                        try {
                            await apiCall(`/user/${username}`, { method: 'DELETE' });
                            showToast('已注销', '🗑️');
                            renderUserTable();
                            if (username === currentUser) handleLogout();
                        } catch (e) { showToast('注销失败', '❌'); }
                    }
                }
            }

            // ===== 管理面板 - 站车风采 =====
            async function renderSceneryAdmin() {
                try {
                    const items = await apiCall('/scenery');
                    sceneryAdminList.innerHTML = '';
                    items.forEach(item => {
                        const div = document.createElement('div');
                        div.className = 'scenery-item-admin';
                        div.innerHTML = `<div class="info"><span class="icon">${item.icon}</span><span class="name">${item.name}</span><span class="desc">${item.desc}</span></div><div class="actions"><button class="btn-edit" data-id="${item.id}">编辑</button><button class="btn-delete" data-id="${item.id}">删除</button></div>`;
                        sceneryAdminList.appendChild(div);
                    });
                    sceneryAdminList.querySelectorAll('.btn-edit').forEach(btn => {
                        btn.addEventListener('click', function() { openEditScenery(parseInt(this.dataset.id)); });
                    });
                    sceneryAdminList.querySelectorAll('.btn-delete').forEach(btn => {
                        btn.addEventListener('click', function() {
                            if (confirm('确定删除？')) deleteSceneryItem(parseInt(this.dataset.id));
                        });
                    });
                } catch (e) {
                    showToast('加载风采列表失败', '❌');
                }
            }

            async function openEditScenery(id) {
                try {
                    const items = await apiCall('/scenery');
                    const item = items.find(i => i.id === id);
                    if (item) {
                        editSceneryTitle.textContent = '✏️ 编辑风采';
                        editSceneryId.value = item.id;
                        editSceneryIcon.value = item.icon || '';
                        editSceneryName.value = item.name || '';
                        editSceneryDesc.value = item.desc || '';
                    } else {
                        editSceneryTitle.textContent = '➕ 新增风采';
                        editSceneryId.value = '';
                        editSceneryIcon.value = '';
                        editSceneryName.value = '';
                        editSceneryDesc.value = '';
                    }
                    editSceneryError.classList.remove('show');
                    editSceneryModal.classList.add('active');
                } catch (e) { showToast('加载数据失败', '❌'); }
            }

            function closeEditScenery() { editSceneryModal.classList.remove('active'); editSceneryError.classList.remove('show'); }

            async function saveSceneryItem() {
                const id = editSceneryId.value.trim(), icon = editSceneryIcon.value.trim(), name = editSceneryName.value.trim(), desc = editSceneryDesc.value.trim();
                editSceneryError.classList.remove('show');
                if (!name) { editSceneryErrorMessage.textContent = '名称不能为空'; editSceneryError.classList.add('show'); return; }
                try {
                    if (id) {
                        await apiCall(`/scenery/${id}`, { method: 'PUT', body: { icon, name, desc } });
                        showToast('已更新', '✅');
                    } else {
                        await apiCall('/scenery', { method: 'POST', body: { icon, name, desc } });
                        showToast('已添加', '✅');
                    }
                    closeEditScenery();
                    renderSceneryAdmin();
                } catch (e) { showToast('操作失败', '❌'); }
            }

            async function deleteSceneryItem(id) {
                try {
                    await apiCall(`/scenery/${id}`, { method: 'DELETE' });
                    renderSceneryAdmin();
                    showToast('已删除', '🗑️');
                } catch (e) { showToast('删除失败', '❌'); }
            }

            // ===== 站车风采浏览（公共） =====
            async function openSceneryViewer() {
                try {
                    const items = await apiCall('/scenery');
                    const modal = document.createElement('div');
                    modal.className = 'modal-overlay active';
                    modal.style.zIndex = '1000';
                    let html = `<div class="modal-card" style="max-width:600px;"><div class="modal-title">🚉 站车风采</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:16px 0;">`;
                    items.forEach(item => {
                        html += `<div style="background:#f8fafc;border-radius:14px;padding:16px 14px;border:1px solid #eef2f7;"><span style="font-size:28px;display:block;margin-bottom:4px;">${item.icon}</span><div style="font-weight:700;font-size:16px;color:#0b2a4a;">${item.name}</div><div style="font-size:13px;color:#5a6a7a;margin-top:2px;line-height:1.4;">${item.desc}</div></div>`;
                    });
                    html += `</div><div class="form-actions"><button class="btn-cancel" id="closeSceneryViewerBtn" style="flex:1;">关闭</button></div></div>`;
                    modal.innerHTML = html;
                    document.body.appendChild(modal);
                    modal.querySelector('#closeSceneryViewerBtn').addEventListener('click', function() { modal.remove(); });
                    modal.addEventListener('click', function(e) { if (e.target === this) modal.remove(); });
                } catch (e) { showToast('加载失败', '❌'); }
            }

            // ===== 管理面板开关 =====
            function openAdminPanel() {
                if (currentUser !== 'admin') { showToast('权限不足', '⛔'); return; }
                renderUserTable();
                renderSceneryAdmin();
                adminModal.classList.add('active');
                switchTab('users');
            }
            function closeAdminPanel() { adminModal.classList.remove('active'); }
            function switchTab(tabName) {
                tabBtns.forEach(btn => { const t = btn.dataset.tab; btn.classList.toggle('active', t === tabName); });
                Object.keys(tabContents).forEach(key => { tabContents[key].classList.toggle('active', key === tabName); });
                if (tabName === 'users') renderUserTable();
                if (tabName === 'scenery') renderSceneryAdmin();
            }

            // ===== 登录 / 登出 =====
            async function handleLogin(e) {
                e.preventDefault();
                const username = loginUsername.value.trim(), password = loginPassword.value.trim();
                loginError.classList.remove('show');
                if (!username || !password) { errorMessage.textContent = '请输入账号和密码'; loginError.classList.add('show'); return; }
                try {
                    const data = await apiCall('/login', { method: 'POST', body: { username, password } });
                    if (data.success) {
                        loginSuccess(username, data.balance);
                    } else {
                        errorMessage.textContent = '账号或密码错误';
                        loginError.classList.add('show');
                        loginPassword.value = '';
                        loginPassword.focus();
                    }
                } catch (e) {
                    errorMessage.textContent = '网络错误，请检查后端服务';
                    loginError.classList.add('show');
                }
            }

            function loginSuccess(username, balance) {
                currentUser = username;
                sessionStorage.setItem('metro_session_user', username);
                loginPage.style.display = 'none';
                homePage.style.display = 'flex';
                displayUsername.textContent = username;
                greetingUser.textContent = username;
                displayBalance.textContent = formatBalance(balance);
                adminEntry.style.display = (username === 'admin') ? 'block' : 'none';
                updateSigninUI();
                renderLines();
                startClock();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                showToast('欢迎回来，' + username + '！', '👋');
            }

            function handleLogout() {
                currentUser = null;
                sessionStorage.removeItem('metro_session_user');
                stopClock();
                homePage.style.display = 'none';
                loginPage.style.display = 'flex';
                loginError.classList.remove('show');
                loginPassword.value = '';
                loginUsername.value = '';
                closeAllModals();
                showToast('已安全退出', '👋');
            }

            // ===== 时钟 =====
            function updateClock() {
                const now = new Date();
                if (currentTimeEl) currentTimeEl.textContent = formatTime(now);
                if (currentDateEl) currentDateEl.textContent = formatDate(now);
            }
            function startClock() { if (clockInterval) clearInterval(clockInterval); updateClock(); clockInterval = setInterval(updateClock, 1000); }
            function stopClock() { if (clockInterval) { clearInterval(clockInterval); clockInterval = null; } }

            // ===== 注册 =====
            function clearRegisterForm() {
                regUsername.value = ''; regPassword.value = ''; regConfirm.value = ''; regVerify.value = '';
                regError.classList.remove('show'); regSuccess.classList.remove('show');
            }
            function openRegisterModal() { clearRegisterForm(); registerModal.classList.add('active'); }
            function closeRegisterModal() { registerModal.classList.remove('active'); clearRegisterForm(); }

            async function handleRegister() {
                const username = regUsername.value.trim(), password = regPassword.value.trim(), confirm = regConfirm.value.trim(), verify = regVerify.value.trim();
                regError.classList.remove('show'); regSuccess.classList.remove('show');
                if (!username || username.length < 2) { regErrorMessage.textContent = '账号至少需要2个字符'; regError.classList.add('show'); return; }
                if (!password || password.length < 6) { regErrorMessage.textContent = '密码至少需要6个字符'; regError.classList.add('show'); return; }
                if (password !== confirm) { regErrorMessage.textContent = '两次输入的密码不一致'; regError.classList.add('show'); return; }
                if (!verify) { regErrorMessage.textContent = '请回答验证问题'; regError.classList.add('show'); return; }
                if (verify.trim().toUpperCase() !== VERIFY_ANSWER.toUpperCase()) {
                    regErrorMessage.textContent = '验证答案错误，请重新输入';
                    regError.classList.add('show');
                    regVerify.value = '';
                    regVerify.focus();
                    return;
                }
                try {
                    const data = await apiCall('/register', { method: 'POST', body: { username, password } });
                    if (data.success) {
                        regSuccessMessage.textContent = '🎉 注册成功！即将自动登录...';
                        regSuccess.classList.add('show');
                        setTimeout(() => { closeRegisterModal(); loginSuccess(username, 0); }, 1200);
                    } else {
                        regErrorMessage.textContent = data.message || '注册失败';
                        regError.classList.add('show');
                    }
                } catch (e) {
                    regErrorMessage.textContent = '网络错误，请稍后重试';
                    regError.classList.add('show');
                }
            }

            // ===== 忘记密码 =====
            function openForgotModal() {
                forgotUsername.value = ''; forgotVerify.value = ''; forgotNewPassword.value = '';
                forgotError.classList.remove('show'); forgotSuccess.classList.remove('show');
                forgotModal.classList.add('active');
            }
            function closeForgotModal() { forgotModal.classList.remove('active'); forgotError.classList.remove('show'); forgotSuccess.classList.remove('show'); }

            async function handleForgot() {
                const username = forgotUsername.value.trim(), verify = forgotVerify.value.trim(), newPwd = forgotNewPassword.value.trim();
                forgotError.classList.remove('show'); forgotSuccess.classList.remove('show');
                if (!username) { forgotErrorMessage.textContent = '请输入账号'; forgotError.classList.add('show'); return; }
                if (!verify) { forgotErrorMessage.textContent = '请回答验证问题'; forgotError.classList.add('show'); return; }
                if (verify.trim().toUpperCase() !== VERIFY_ANSWER.toUpperCase()) {
                    forgotErrorMessage.textContent = '验证答案错误，请重新输入';
                    forgotError.classList.add('show');
                    forgotVerify.value = '';
                    forgotVerify.focus();
                    return;
                }
                if (!newPwd || newPwd.length < 6) { forgotErrorMessage.textContent = '新密码至少需要6个字符'; forgotError.classList.add('show'); return; }
                try {
                    await apiCall(`/user/${username}`, { method: 'PUT', body: { password: newPwd } });
                    forgotSuccessMessage.textContent = '✅ 密码已重置，请使用新密码登录';
                    forgotSuccess.classList.add('show');
                    setTimeout(() => { closeForgotModal(); showToast('密码已重置，请重新登录', '🔑'); }, 1500);
                } catch (e) {
                    forgotErrorMessage.textContent = '重置失败，请稍后重试';
                    forgotError.classList.add('show');
                }
            }

            // ===== 检查登录状态 =====
            async function checkSession() {
                const username = sessionStorage.getItem('metro_session_user');
                if (username) {
                    try {
                        // 用登录接口验证token，但我们没做token，直接用密码验证？简化：尝试获取用户信息，若失败则退出
                        const data = await apiCall('/login', { method: 'POST', body: { username, password: '' } });
                        if (data.success) {
                            loginSuccess(username, data.balance);
                            return true;
                        }
                    } catch (e) {
                        // 无效，清除session
                        sessionStorage.removeItem('metro_session_user');
                    }
                }
                return false;
            }

            // ===== 事件绑定 =====
            loginForm.addEventListener('submit', handleLogin);
            loginPassword.addEventListener('keydown', function(e) { if (e.key === 'Enter') loginForm.dispatchEvent(new Event('submit')); });
            logoutBtn.addEventListener('click', handleLogout);

            openRegisterBtn.addEventListener('click', openRegisterModal);
            closeRegisterBtn.addEventListener('click', closeRegisterModal);
            registerBtn.addEventListener('click', handleRegister);
            registerModal.addEventListener('click', function(e) { if (e.target === this) closeRegisterModal(); });
            regVerify.addEventListener('keydown', function(e) { if (e.key === 'Enter') registerBtn.click(); });

            openForgotBtn.addEventListener('click', openForgotModal);
            closeForgotBtn.addEventListener('click', closeForgotModal);
            forgotBtn.addEventListener('click', handleForgot);
            forgotModal.addEventListener('click', function(e) { if (e.target === this) closeForgotModal(); });
            forgotNewPassword.addEventListener('keydown', function(e) { if (e.key === 'Enter') forgotBtn.click(); });

            document.querySelectorAll('.quick-action[data-action]').forEach(el => {
                el.addEventListener('click', function() {
                    const action = this.dataset.action;
                    if (action === 'ticket') showToast('购票功能开发中，敬请期待！', '🎟️');
                    else if (action === 'line') showToast('线路查询功能开发中，敬请期待！', '🗺️');
                    else if (action === 'scenery') openSceneryViewer();
                    else if (action === 'signin') openQuizModal();
                    else if (action === 'admin') openAdminPanel();
                });
            });

            answerInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAnswer();
                }
            });

            closeQuizBtn.addEventListener('click', closeQuizModal);
            quizModal.addEventListener('click', function(e) { if (e.target === this) closeQuizModal(); });

            closeAdminBtn.addEventListener('click', closeAdminPanel);
            adminModal.addEventListener('click', function(e) { if (e.target === this) closeAdminPanel(); });
            tabBtns.forEach(btn => {
                btn.addEventListener('click', function() { switchTab(this.dataset.tab); });
            });

            addSceneryBtn.addEventListener('click', function() { openEditScenery(null); });
            closeEditSceneryBtn.addEventListener('click', closeEditScenery);
            saveSceneryBtn.addEventListener('click', saveSceneryItem);
            editSceneryModal.addEventListener('click', function(e) { if (e.target === this) closeEditScenery(); });

            loginUsername.addEventListener('focus', function() { loginError.classList.remove('show'); });
            loginPassword.addEventListener('focus', function() { loginError.classList.remove('show'); });

            // ===== 初始化 =====
            (function init() {
                // 先检查session
                checkSession().then(hasSession => {
                    if (!hasSession) {
                        loginPage.style.display = 'flex';
                        homePage.style.display = 'none';
                        loginUsername.value = '';
                        loginPassword.value = '';
                    }
                });
                // 如果后端没有默认管理员，初始化时由后端处理，前端不需要创建
            })();

        })();
    </script>
</body>
</html>
