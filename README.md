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
        body {
            font-family:'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif;
            background:#e9edf2;
            min-height:100vh;
            display:flex;
            justify-content:center;
            align-items:center;
            transition:background 0.3s;
        }

        /* ===== 长者关怀模式 ===== */
        body.elder-mode { zoom:1.3; }
        @-moz-document url-prefix() { body.elder-mode { transform:scale(1.3); transform-origin:top left; width:76.92%; margin:0 auto; } }

        /* ===== 登录页 ===== */
        #loginPage {
            width:100%;
            min-height:100vh;
            display:flex;
            justify-content:center;
            align-items:center;
            background:linear-gradient(145deg,#0b2a4a 0%,#1a4a6e 100%);
            padding:20px;
        }
        .login-card {
            background:#ffffff;
            border-radius:24px;
            padding:44px 40px 36px;
            width:100%;
            max-width:420px;
            box-shadow:0 25px 60px rgba(0,20,40,0.45);
            transition:transform 0.25s ease;
        }
        .login-card:hover { transform:translateY(-2px); }
        .login-logo { text-align:center; margin-bottom:28px; }
        .login-logo .icon { font-size:44px; line-height:1; display:block; margin-bottom:6px; }
        .login-logo h1 { font-size:26px; font-weight:700; color:#0b2a4a; letter-spacing:2px; }
        .login-logo p { font-size:14px; color:#7a8a9e; margin-top:2px; letter-spacing:1px; }
        .login-form .form-group { margin-bottom:20px; }
        .login-form label { display:block; font-size:14px; font-weight:600; color:#2c3e50; margin-bottom:6px; letter-spacing:0.5px; }
        .login-form input[type="text"], .login-form input[type="password"] {
            width:100%; padding:14px 18px; font-size:16px; border:2px solid #dce3ec; border-radius:12px;
            background:#f8fafc; transition:border-color 0.25s, box-shadow 0.25s; outline:none; color:#1a2a3a;
        }
        .login-form input:focus { border-color:#1a6e9e; box-shadow:0 0 0 4px rgba(26,110,158,0.12); background:#ffffff; }
        .login-btn {
            width:100%; padding:16px; font-size:18px; font-weight:700; color:#ffffff;
            background:linear-gradient(135deg,#1a6e9e,#0b4a72); border:none; border-radius:12px;
            cursor:pointer; transition:background 0.25s, transform 0.15s, box-shadow 0.25s; letter-spacing:2px; margin-top:4px;
        }
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

        /* ===== 模态框通用 ===== */
        .modal-overlay {
            display:none;
            position:fixed;
            inset:0;
            background:rgba(0,0,0,0.55);
            backdrop-filter:blur(4px);
            z-index:999;
            justify-content:center;
            align-items:center;
            padding:20px;
            animation:fadeIn 0.25s ease;
        }
        .modal-overlay.active { display:flex; }
        @keyframes fadeIn { from{opacity:0; transform:scale(0.96);} to{opacity:1; transform:scale(1);} }
        .modal-card {
            background:#ffffff;
            border-radius:24px;
            padding:36px 32px 32px;
            width:100%;
            max-width:580px;
            box-shadow:0 30px 80px rgba(0,0,0,0.45);
            max-height:90vh;
            overflow-y:auto;
        }
        .modal-card .modal-title { font-size:24px; font-weight:700; color:#0b2a4a; text-align:center; margin-bottom:24px; letter-spacing:1px; }
        .modal-card .form-group { margin-bottom:18px; }
        .modal-card label { display:block; font-size:14px; font-weight:600; color:#2c3e50; margin-bottom:5px; }
        .modal-card input[type="text"], .modal-card input[type="password"], .modal-card input[type="number"] {
            width:100%; padding:12px 16px; font-size:15px; border:2px solid #dce3ec; border-radius:10px;
            background:#f8fafc; transition:border-color 0.25s; outline:none; color:#1a2a3a;
        }
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

        .register-modal .verify-question, .forgot-modal .verify-question {
            background:#eef4fa; padding:12px 16px; border-radius:10px; font-size:15px; color:#0b2a4a;
            margin-bottom:10px; border-left:4px solid #1a6e9e; font-weight:500;
        }

        /* ===== 签到答题 ===== */
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
        .quiz-start-area { margin:10px 0 16px; }
        .quiz-start-area .start-btn { padding:14px 48px; font-size:22px; font-weight:700; border-radius:40px; border:none; background:linear-gradient(135deg,#27ae60,#1e8449); color:#fff; cursor:pointer; transition:transform 0.2s, box-shadow 0.2s; box-shadow:0 4px 16px rgba(39,174,96,0.3); }
        .quiz-start-area .start-btn:hover { transform:scale(1.03); box-shadow:0 6px 24px rgba(39,174,96,0.4); }
        .quiz-start-area .countdown { font-size:56px; font-weight:900; color:#1a6e9e; letter-spacing:4px; display:none; }
        .quiz-start-area .countdown.active { display:block; }

        /* ===== 首页布局 ===== */
        #homePage {
            display:none;
            width:100%;
            min-height:100vh;
            background:#eef2f7;
            flex-direction:column;
        }
        .navbar {
            background:linear-gradient(135deg,#0b2a4a,#1a4a6e);
            padding:0 40px;
            height:72px;
            display:flex;
            align-items:center;
            justify-content:space-between;
            box-shadow:0 4px 20px rgba(0,0,0,0.15);
            position:sticky;
            top:0;
            z-index:100;
            flex-shrink:0;
        }
        .navbar .brand { display:flex; align-items:center; gap:12px; color:#ffffff; font-size:22px; font-weight:700; letter-spacing:1px; }
        .navbar .brand .brand-icon { font-size:30px; line-height:1; }
        .navbar .brand .brand-sub { font-size:13px; font-weight:400; opacity:0.7; margin-left:4px; }
        .navbar .user-area { display:flex; align-items:center; gap:16px; flex-wrap:wrap; justify-content:flex-end; }
        .navbar .user-area .user-info { display:flex; align-items:center; gap:12px; color:#ffffff; font-size:14px; }
        .navbar .user-area .user-info .user-name {
            font-weight:600;
            background:rgba(255,255,255,0.12);
            padding:5px 16px;
            border-radius:30px;
            display:flex;
            align-items:center;
            gap:8px;
            cursor:pointer;
            transition:background 0.2s;
            user-select:none;
        }
        .navbar .user-area .user-info .user-name:hover { background:rgba(255,255,255,0.22); }
        .navbar .user-area .user-info .user-name .avatar-img {
            width:28px;
            height:28px;
            border-radius:50%;
            object-fit:cover;
            border:1px solid rgba(255,255,255,0.3);
        }

        .hero-banner {
            background:linear-gradient(135deg,#b71c1c,#c0392b);
            padding:24px 20px;
            text-align:center;
            border-bottom:4px solid #922b21;
            box-shadow:0 4px 20px rgba(192,57,43,0.25);
            flex-shrink:0;
        }
        .hero-banner h1 { font-family:'Ma Shan Zheng','华文行楷','STXingkai','KaiTi',cursive; font-size:52px; color:#ffffff; letter-spacing:8px; text-shadow:0 2px 12px rgba(0,0,0,0.20); font-weight:400; line-height:1.2; }

        /* ===== 主内容区（首页） ===== */
        #homeMain {
            flex:1;
            padding:28px 40px 20px;
            max-width:1280px;
            margin:0 auto;
            width:100%;
            display:block;
        }
        #homeMain.hidden { display:none; }

        .welcome-banner {
            background:linear-gradient(135deg,#ffffff,#f5f9ff);
            border-radius:20px;
            padding:22px 30px;
            margin-bottom:28px;
            box-shadow:0 2px 12px rgba(0,0,0,0.04);
            border:1px solid rgba(255,255,255,0.6);
            display:flex;
            justify-content:space-between;
            align-items:center;
            flex-wrap:wrap;
            gap:12px;
        }
        .welcome-banner .greeting h2 { font-size:22px; font-weight:700; color:#0b2a4a; }
        .welcome-banner .greeting h2 .highlight { color:#1a6e9e; }
        .welcome-banner .greeting p { color:#5a6a7a; font-size:14px; margin-top:2px; }
        .welcome-banner .datetime { text-align:right; color:#3a5a7a; font-size:15px; background:#eef4fa; padding:8px 20px; border-radius:40px; font-weight:500; white-space:nowrap; }
        .welcome-banner .datetime .time { font-size:20px; font-weight:700; color:#0b2a4a; margin-right:6px; }

        .section-title { font-size:18px; font-weight:700; color:#1a2a3a; margin-bottom:14px; display:flex; align-items:center; gap:10px; }
        .section-title .title-line { flex:1; height:2px; background:linear-gradient(to right,#d0dae6,transparent); }

        .card-grid { display:grid; grid-template-columns:1fr 1fr; gap:22px; margin-bottom:28px; }
        .line-card {
            background:#ffffff;
            border-radius:18px;
            padding:20px 24px 18px;
            box-shadow:0 2px 12px rgba(0,0,0,0.04);
            border:1px solid #eef2f7;
            transition:box-shadow 0.2s, transform 0.2s;
        }
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

        .quick-actions { display:grid; grid-template-columns:repeat(6,1fr); gap:16px; margin-bottom:8px; }
        .quick-action {
            background:#ffffff;
            border-radius:16px;
            padding:24px 12px 20px;
            text-align:center;
            box-shadow:0 2px 12px rgba(0,0,0,0.04);
            border:1px solid #eef2f7;
            cursor:pointer;
            transition:box-shadow 0.2s, transform 0.2s, border-color 0.2s;
            user-select:none;
        }
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
        .quick-action.my-action { border-color:#8e44ad; background:#f4ecf7; }
        .quick-action.my-action:hover { border-color:#6c3483; }

        .home-footer { text-align:center; padding:20px 20px 8px; color:#8a9aaa; font-size:13px; border-top:1px solid #e0e6ee; margin-top:12px; }
        .home-footer strong { color:#1a4a6e; }

        /* ===== “我的”页面 ===== */
        #myPage {
            display:none;
            flex:1;
            padding:28px 40px 20px;
            max-width:640px;
            margin:0 auto;
            width:100%;
            flex-direction:column;
        }
        #myPage.active { display:flex; }
        #myPage .my-header {
            display:flex;
            align-items:center;
            gap:16px;
            margin-bottom:24px;
        }
        #myPage .my-header .back-btn {
            background:#eef2f7;
            border:none;
            border-radius:30px;
            padding:8px 20px;
            font-size:16px;
            font-weight:600;
            color:#1a2a3a;
            cursor:pointer;
            transition:background 0.2s;
        }
        #myPage .my-header .back-btn:hover { background:#dce3ec; }
        #myPage .my-header .my-title { font-size:26px; font-weight:700; color:#0b2a4a; }

        .my-avatar-section {
            display:flex;
            flex-direction:column;
            align-items:center;
            margin-bottom:28px;
        }
        .my-avatar-section .avatar-wrapper {
            position:relative;
            cursor:pointer;
            width:120px;
            height:120px;
            border-radius:50%;
            overflow:hidden;
            border:4px solid #dce3ec;
            background:#f0f4fa;
            transition:border-color 0.2s;
        }
        .my-avatar-section .avatar-wrapper:hover { border-color:#1a6e9e; }
        .my-avatar-section .avatar-wrapper img {
            width:100%;
            height:100%;
            object-fit:cover;
            display:block;
        }
        .my-avatar-section .avatar-wrapper .avatar-placeholder {
            font-size:64px;
            line-height:120px;
            text-align:center;
            color:#8a9aaa;
        }
        .my-avatar-section .avatar-hint { font-size:14px; color:#8a9aaa; margin-top:8px; }
        #avatarInput { display:none; }

        .my-info-row {
            display:flex;
            justify-content:space-between;
            padding:14px 0;
            border-bottom:1px solid #eef2f7;
            font-size:17px;
        }
        .my-info-row .label { color:#5a6a7a; }
        .my-info-row .value { font-weight:600; color:#0b2a4a; }
        .my-info-row .value .balance-amount { color:#1a6e9e; }

        .my-action-btns {
            display:flex;
            gap:12px;
            margin:24px 0 20px;
        }
        .my-action-btns button {
            flex:1;
            padding:14px;
            font-size:17px;
            font-weight:600;
            border:none;
            border-radius:12px;
            cursor:pointer;
            transition:background 0.25s, transform 0.15s;
        }
        .my-action-btns .btn-logout { background:#eef2f7; color:#4a5a6a; }
        .my-action-btns .btn-logout:hover { background:#dce3ec; }
        .my-action-btns .btn-delete-account { background:#fadbd8; color:#922b21; }
        .my-action-btns .btn-delete-account:hover:not(:disabled) { background:#f5b7b1; }
        .my-action-btns .btn-delete-account:disabled { opacity:0.6; cursor:not-allowed; transform:none; }

        .my-elder-toggle {
            display:flex;
            align-items:center;
            justify-content:space-between;
            padding:16px 0;
            border-top:1px solid #eef2f7;
            margin-top:6px;
        }
        .my-elder-toggle .elder-label {
            display:flex;
            align-items:center;
            gap:12px;
            font-size:17px;
            font-weight:600;
            color:#0b2a4a;
        }
        .my-elder-toggle .elder-label .elder-icon { font-size:28px; }
        .my-elder-toggle .toggle-switch {
            position:relative;
            width:56px;
            height:30px;
            background:#dce3ec;
            border-radius:15px;
            cursor:pointer;
            transition:background 0.3s;
            flex-shrink:0;
        }
        .my-elder-toggle .toggle-switch.active { background:#1a6e9e; }
        .my-elder-toggle .toggle-switch .toggle-knob {
            position:absolute;
            top:3px;
            left:3px;
            width:24px;
            height:24px;
            background:#ffffff;
            border-radius:50%;
            transition:transform 0.3s;
            box-shadow:0 2px 6px rgba(0,0,0,0.15);
        }
        .my-elder-toggle .toggle-switch.active .toggle-knob { transform:translateX(26px); }
        .my-elder-toggle .toggle-desc { font-size:13px; color:#8a9aaa; margin-left:4px; }

        /* ===== 管理面板 ===== */
        .admin-modal .modal-card { max-width:900px; }
        .admin-modal .tab-bar { display:flex; gap:4px; border-bottom:2px solid #e0e6ee; margin-bottom:24px; flex-wrap:wrap; }
        .admin-modal .tab-bar .tab-btn { padding:10px 24px; font-size:16px; font-weight:600; border:none; background:transparent; cursor:pointer; color:#5a6a7a; border-bottom:3px solid transparent; transition:color 0.2s, border-color 0.2s; }
        .admin-modal .tab-bar .tab-btn.active { color:#0b2a4a; border-bottom-color:#1a6e9e; }
        .admin-modal .tab-bar .tab-btn:hover { color:#0b2a4a; }
        .admin-modal .tab-content { display:none; }
        .admin-modal .tab-content.active { display:block; }
        .admin-modal .user-table-wrap { overflow-x:auto; }
        .admin-modal table { width:100%; border-collapse:collapse; font-size:14px; }
        .admin-modal table th { background:#eef4fa; color:#0b2a4a; font-weight:700; padding:12px 10px; text-align:left; border-bottom:2px solid #d0dae6; white-space:nowrap; }
        .admin-modal table td { padding:10px 10px; border-bottom:1px solid #eef2f7; vertical-align:middle; }
        .admin-modal table tr:hover td { background:#f8fafc; }
        .admin-modal .table-actions { display:flex; gap:6px; flex-wrap:wrap; }
        .admin-modal .table-actions button { padding:4px 12px; font-size:12px; border:none; border-radius:6px; font-weight:600; cursor:pointer; transition:background 0.2s; }
        .admin-modal .btn-reset { background:#fdebd0; color:#a04000; }
        .admin-modal .btn-reset:hover { background:#fad7a0; }
        .admin-modal .btn-balance { background:#d4e6f1; color:#1a4a6e; }
        .admin-modal .btn-balance:hover { background:#b0d0e6; }
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

        /* ===== Toast ===== */
        .toast-container {
            position:fixed;
            top:100px;
            left:50%;
            transform:translateX(-50%);
            z-index:9999;
            pointer-events:none;
        }
        .toast {
            background:#1a2a3a;
            color:#ffffff;
            padding:14px 32px;
            border-radius:12px;
            font-size:15px;
            font-weight:500;
            box-shadow:0 8px 32px rgba(0,0,0,0.30);
            opacity:0;
            transform:translateY(-20px) scale(0.95);
            transition:opacity 0.35s ease, transform 0.35s ease;
            pointer-events:auto;
            display:flex;
            align-items:center;
            gap:10px;
            white-space:nowrap;
        }
        .toast.show { opacity:1; transform:translateY(0) scale(1); }
        .toast .toast-icon { font-size:20px; }

        /* ===== 响应式 ===== */
        @media (max-width:992px) {
            .card-grid { grid-template-columns:1fr; gap:16px; }
            .quick-actions { grid-template-columns:repeat(3,1fr); }
            #homeMain, #myPage { padding:20px 24px 16px; }
            .navbar { padding:0 24px; height:64px; }
            .navbar .brand { font-size:18px; }
            .navbar .brand .brand-sub { display:none; }
            .hero-banner h1 { font-size:38px; letter-spacing:4px; }
            .welcome-banner { flex-direction:column; align-items:flex-start; }
            .welcome-banner .datetime { text-align:left; width:100%; white-space:normal; }
            .admin-modal .modal-card { max-width:95%; padding:24px 16px; }
            .quiz-modal .modal-card { max-width:95%; }
        }
        @media (max-width:600px) {
            .login-card { padding:28px 18px 24px; }
            .login-logo h1 { font-size:22px; }
            .navbar .user-area .user-info { font-size:12px; gap:6px; flex-wrap:wrap; justify-content:flex-end; }
            .navbar .user-area .user-info .user-name { padding:3px 12px; font-size:12px; }
            .navbar { padding:0 14px; height:58px; }
            .navbar .brand { font-size:16px; gap:6px; }
            .navbar .brand .brand-icon { font-size:22px; }
            .hero-banner h1 { font-size:28px; letter-spacing:2px; }
            .hero-banner { padding:16px 12px; }
            .quick-actions { grid-template-columns:1fr 1fr 1fr; gap:10px; }
            .quick-action { padding:16px 6px 14px; }
            .quick-action .qa-icon { font-size:26px; }
            .quick-action .qa-label { font-size:14px; }
            .quick-action .qa-desc { font-size:11px; }
            .line-card { padding:14px 16px; }
            .line-card .line-stations { gap:2px 10px; padding-left:10px; }
            .line-card .line-stations .station { font-size:13px; }
            #homeMain, #myPage { padding:14px 14px 12px; }
            .welcome-banner { padding:14px 16px; }
            .welcome-banner .greeting h2 { font-size:18px; }
            .modal-card { padding:24px 18px 20px; }
            .modal-card .form-actions { flex-direction:column; }
            .toast { padding:12px 20px; font-size:14px; white-space:normal; }
            .admin-modal table th, .admin-modal table td { padding:6px 4px; font-size:12px; }
            .admin-modal .table-actions button { font-size:10px; padding:2px 8px; }
            .admin-modal .scenery-item-admin { flex-direction:column; align-items:stretch; }
            .admin-modal .scenery-item-admin .info { flex-wrap:wrap; }
            .quiz-modal .quiz-body .question-text { font-size:24px; }
            .quiz-modal .quiz-body .answer-input { width:80px; font-size:22px; }
            .quiz-start-area .start-btn { font-size:18px; padding:12px 32px; }
            .quiz-start-area .countdown { font-size:40px; }
            .my-action-btns { flex-direction:column; }
            .my-avatar-section .avatar-wrapper { width:90px; height:90px; }
            .my-avatar-section .avatar-wrapper .avatar-placeholder { font-size:48px; line-height:90px; }
            .my-elder-toggle { flex-wrap:wrap; gap:8px; }
        }
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
    <div class="modal-overlay forgot-modal" id="forgotModal">
        <div class="modal-card">
            <div class="modal-title">🔑 重置密码</div>
            <div class="form-group"><label for="forgotUsername">账号</label><input type="text" id="forgotUsername" placeholder="请输入您的账号" /></div>
            <div class="form-group">
                <label>身份验证</label>
                <div class="verify-question">❓ 固局更高速度实验列车的车号是？</div>
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
                <div class="quiz-start-area" id="quizStartArea">
                    <button class="start-btn" id="startQuizBtn">🚀 开始挑战</button>
                    <div class="countdown" id="countdownDisplay">3</div>
                </div>
                <input type="number" class="answer-input" id="answerInput" placeholder="?" autofocus disabled style="display:none;" />
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
                <div class="user-table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>头像</th>
                                <th>用户名</th>
                                <th>密码</th>
                                <th>余额</th>
                                <th>最近登录</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody id="userTableBody"></tbody>
                    </table>
                </div>
                <p class="text-muted mt-8">* 管理员可重置普通用户密码（24h内仅一次），修改余额，注销账号（不能注销自己）</p>
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
        <!-- 导航栏 -->
        <nav class="navbar">
            <div class="brand"><span class="brand-icon">🚇</span><span>固原地铁</span><span class="brand-sub">· 售票系统</span></div>
            <div class="user-area">
                <div class="user-info">
                    <span class="user-name" id="userNameClick">
                        <img class="avatar-img" id="navAvatarImg" src="" alt="avatar" style="display:none;" />
                        <span id="navUsername">用户</span>
                    </span>
                </div>
            </div>
        </nav>
        <div class="hero-banner"><h1>🚇 固原地铁欢迎您！</h1></div>

        <!-- 首页主内容 -->
        <div id="homeMain">
            <div class="welcome-banner">
                <div class="greeting"><h2>👋 欢迎回来，<span class="highlight" id="greetingUser">用户</span></h2><p>固原地铁 · 智能售票系统 v5.0（云端版）</p></div>
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
                <div class="quick-action my-action" data-action="my">
                    <span class="qa-icon">👤</span><div class="qa-label">我的</div>
                    <div class="qa-desc">个人中心</div>
                </div>
                <div class="quick-action admin-action" data-action="admin" id="adminEntry" style="display:none;">
                    <span class="qa-icon">⚙️</span><div class="qa-label">管理面板</div><div class="qa-desc">管理员专用</div>
                </div>
            </div>
            <div class="home-footer">&copy; 2026 <strong>固原地铁</strong> · 虚拟线网数据 · 仅供演示</div>
        </div>

        <!-- 我的页面（独立页面） -->
        <div id="myPage">
            <div class="my-header">
                <button class="back-btn" id="myBackBtn">← 返回首页</button>
                <span class="my-title">👤 我的</span>
            </div>
            <div class="my-avatar-section">
                <div class="avatar-wrapper" id="avatarWrapper">
                    <img id="myAvatarImg" src="" alt="头像" style="display:none;" />
                    <span class="avatar-placeholder" id="myAvatarPlaceholder">👤</span>
                </div>
                <span class="avatar-hint">点击头像上传图片</span>
                <input type="file" id="avatarInput" accept="image/*" />
            </div>
            <div class="my-info-row"><span class="label">用户名</span><span class="value" id="myUsername">--</span></div>
            <div class="my-info-row"><span class="label">余额</span><span class="value"><span class="balance-amount" id="myBalance">¥0.00</span></span></div>
            <div class="my-action-btns">
                <button class="btn-logout" id="myLogoutBtn">🚪 退出登录</button>
                <button class="btn-delete-account" id="myDeleteAccountBtn">🗑️ 注销账号</button>
            </div>
            <div class="my-elder-toggle">
                <div class="elder-label">
                    <span class="elder-icon">🌙</span>
                    <span>长者关怀</span>
                    <span class="toggle-desc">(放大文字)</span>
                </div>
                <div class="toggle-switch" id="elderToggle">
                    <div class="toggle-knob"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- ===== Toast ===== -->
    <div class="toast-container" id="toastContainer"></div>

    <script>
        (function() {
            'use strict';

            // ==================== 云端后端 API 配置 ====================
            const API_BASE = 'https://gysubwaygithubio-production.up.railway.app/api';
            // 若本地测试可改为 'http://localhost:3000/api'

            // ==================== API 调用封装 ====================
            async function apiCall(endpoint, options = {}) {
                const url = `${API_BASE}${endpoint}`;
                const config = {
                    ...options,
                    headers: {
                        'Content-Type': 'application/json',
                        ...(options.headers || {})
                    },
                    body: options.body ? JSON.stringify(options.body) : undefined
                };
                const res = await fetch(url, config);
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.message || '请求失败');
                }
                return data;
            }

            // ==================== 常量 ====================
            const LINE_DATA = [
                { id: 1, name: '1号线', code: 'M1', color: '#e74c3c', stations: ['火车站', '市政府', '人民广场', '大学城', '科技园', '体育中心'] },
                { id: 2, name: '2号线', code: 'M2', color: '#3498db', stations: ['机场', '会展中心', '市中心', '体育馆', '高铁站', '生态园'] },
                { id: 3, name: '3号线', code: 'M3', color: '#2ecc71', stations: ['汽车站', '商业街', '文化宫', '图书馆', '政务中心', '智慧谷'] },
                { id: 4, name: '4号线', code: 'M4', color: '#f39c12', stations: ['古雁岭', '新区医院', '实验中学', '万达广场', '行政中心', '固原南站'] }
            ];
            const VERIFY_ANSWER = 'CRH380CM-0304';
            const SIGNIN_AMOUNT = 20;
            const TOTAL_QUESTIONS = 20;
            const TIME_LIMIT_DEFAULT = 30;
            const TIME_LIMIT_ELDER = 35;
            const PASS_SCORE = 18;

            // ==================== 数据操作 ====================
            async function loginUser(username, password) {
                const data = await apiCall('/login', { method: 'POST', body: { username, password } });
                return data;
            }
            async function registerUser(username, password) {
                const data = await apiCall('/register', { method: 'POST', body: { username, password } });
                return data;
            }
            async function fetchAllUsers() {
                const data = await apiCall('/users');
                return data;
            }
            async function updateUserAPI(username, updates) {
                const data = await apiCall(`/user/${username}`, { method: 'PUT', body: updates });
                return data;
            }
            async function resetPasswordAPI(username) {
                const data = await apiCall(`/user/${username}/reset`, { method: 'POST' });
                return data;
            }
            async function deleteUserAPI(username) {
                const data = await apiCall(`/user/${username}`, { method: 'DELETE' });
                return data;
            }
            async function fetchSigninStatus(username) {
                const data = await apiCall(`/signin/${username}`);
                return data;
            }
            async function updateSigninStatusAPI(username, updates) {
                const data = await apiCall(`/signin/${username}`, { method: 'POST', body: updates });
                return data;
            }
            async function fetchScenery() {
                const data = await apiCall('/scenery');
                return data;
            }
            async function addSceneryAPI(item) {
                const data = await apiCall('/scenery', { method: 'POST', body: item });
                return data;
            }
            async function updateSceneryAPI(id, item) {
                const data = await apiCall(`/scenery/${id}`, { method: 'PUT', body: item });
                return data;
            }
            async function deleteSceneryAPI(id) {
                const data = await apiCall(`/scenery/${id}`, { method: 'DELETE' });
                return data;
            }

            // ==================== DOM 引用 ====================
            const loginPage = document.getElementById('loginPage');
            const homePage = document.getElementById('homePage');
            const loginForm = document.getElementById('loginForm');
            const loginUsername = document.getElementById('loginUsername');
            const loginPassword = document.getElementById('loginPassword');
            const loginError = document.getElementById('loginError');
            const errorMessage = document.getElementById('errorMessage');
            const homeMain = document.getElementById('homeMain');
            const myPage = document.getElementById('myPage');
            const navUsername = document.getElementById('navUsername');
            const navAvatarImg = document.getElementById('navAvatarImg');
            const greetingUser = document.getElementById('greetingUser');
            const lineGrid = document.getElementById('lineGrid');
            const currentTimeEl = document.getElementById('currentTime');
            const currentDateEl = document.getElementById('currentDate');
            const adminEntry = document.getElementById('adminEntry');
            const signinEntry = document.getElementById('signinEntry');
            const signinDesc = document.getElementById('signinDesc');
            const userNameClick = document.getElementById('userNameClick');
            const myBackBtn = document.getElementById('myBackBtn');
            const myAvatarImg = document.getElementById('myAvatarImg');
            const myAvatarPlaceholder = document.getElementById('myAvatarPlaceholder');
            const avatarWrapper = document.getElementById('avatarWrapper');
            const avatarInput = document.getElementById('avatarInput');
            const myUsername = document.getElementById('myUsername');
            const myBalance = document.getElementById('myBalance');
            const myLogoutBtn = document.getElementById('myLogoutBtn');
            const myDeleteAccountBtn = document.getElementById('myDeleteAccountBtn');
            const elderToggle = document.getElementById('elderToggle');

            // 注册
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

            // 忘记密码
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

            // 答题
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
            const startQuizBtn = document.getElementById('startQuizBtn');
            const countdownDisplay = document.getElementById('countdownDisplay');
            const quizStartArea = document.getElementById('quizStartArea');

            // 管理
            const adminModal = document.getElementById('adminModal');
            const closeAdminBtn = document.getElementById('closeAdminBtn');
            const userTableBody = document.getElementById('userTableBody');
            const sceneryAdminList = document.getElementById('sceneryAdminList');
            const addSceneryBtn = document.getElementById('addSceneryBtn');
            const tabBtns = document.querySelectorAll('.tab-btn');
            const tabContents = { users: document.getElementById('tabUsers'), scenery: document.getElementById('tabScenery') };

            // 编辑风采
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
            let currentAvatar = ''; // 存储图片的 base64 或空
            let clockInterval = null;
            let elderMode = false;
            let deleteCountdown = 0;
            let deleteCountdownInterval = null;

            // ===== 签到答题状态 =====
            let quizQuestions = [];
            let currentIndex = 0;
            let correctAnswers = 0;
            let wrongAnswers = 0;
            let timer = TIME_LIMIT_DEFAULT;
            let timerInterval = null;
            let quizActive = false;
            let isWaiting = false;
            let isCountingDown = false;

            // ==================== 工具函数 ====================
            function formatDate(now) {
                const y = now.getFullYear(),
                    m = String(now.getMonth() + 1).padStart(2, '0'),
                    d = String(now.getDate()).padStart(2, '0');
                return y + '年' + m + '月' + d + '日 ' + ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][now.getDay()];
            }
            function formatTime(now) { return String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes())
                    .padStart(2, '0') + ':' + String(now.getSeconds()).padStart(2, '0'); }
            function formatBalance(val) { return '¥' + Number(val).toFixed(2); }
            function formatDateTime(iso) {
                if (!iso) return '从未登录';
                const d = new Date(iso);
                return d.toLocaleString('zh-CN', { hour12: false });
            }

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

            // ==================== 长者关怀 ====================
            function applyElderMode(enabled) {
                elderMode = enabled;
                document.body.classList.toggle('elder-mode', enabled);
                elderToggle.classList.toggle('active', enabled);
                localStorage.setItem('metro_elder_mode', enabled ? '1' : '0');
                // 如果签到答题界面打开，更新计时器显示
                if (quizModal.classList.contains('active')) {
                    updateTimerDisplay();
                }
            }
            function loadElderMode() {
                const enabled = localStorage.getItem('metro_elder_mode') === '1';
                applyElderMode(enabled);
                return enabled;
            }
            function getTimeLimit() {
                return elderMode ? TIME_LIMIT_ELDER : TIME_LIMIT_DEFAULT;
            }

            // ==================== 头像处理 ====================
            function updateAvatarUI(avatarData) {
                currentAvatar = avatarData || '';
                if (avatarData && avatarData.startsWith('data:image')) {
                    // 显示图片
                    navAvatarImg.src = avatarData;
                    navAvatarImg.style.display = 'inline-block';
                    myAvatarImg.src = avatarData;
                    myAvatarImg.style.display = 'block';
                    myAvatarPlaceholder.style.display = 'none';
                } else {
                    // 无图片，显示占位符
                    navAvatarImg.style.display = 'none';
                    myAvatarImg.style.display = 'none';
                    myAvatarPlaceholder.style.display = 'block';
                }
            }

            async function handleAvatarUpload(file) {
                if (!file) return;
                if (!file.type.startsWith('image/')) {
                    showToast('请选择图片文件', '⚠️');
                    return;
                }
                if (file.size > 2 * 1024 * 1024) {
                    showToast('图片大小不能超过2MB', '⚠️');
                    return;
                }
                const reader = new FileReader();
                reader.onload = async function(e) {
                    const base64 = e.target.result;
                    try {
                        await updateUserAPI(currentUser, { avatar: base64 });
                        updateAvatarUI(base64);
                        showToast('头像已更新', '✅');
                    } catch (err) {
                        showToast('上传失败: ' + err.message, '❌');
                    }
                };
                reader.readAsDataURL(file);
            }

            // ==================== 切换页面（首页/我的） ====================
            function showHomePage() {
                homeMain.classList.remove('hidden');
                myPage.classList.remove('active');
                myPage.style.display = 'none';
                homeMain.style.display = 'block';
                // 重置注销倒计时
                resetDeleteButton();
            }

            function showMyPage() {
                homeMain.classList.add('hidden');
                homeMain.style.display = 'none';
                myPage.style.display = 'flex';
                myPage.classList.add('active');
                // 刷新用户信息
                refreshMyInfo();
            }

            async function refreshMyInfo() {
                if (!currentUser) return;
                try {
                    const users = await fetchAllUsers();
                    const me = users.find(u => u.username === currentUser);
                    if (!me) { showToast('获取用户信息失败', '❌'); return; }
                    myUsername.textContent = me.username;
                    myBalance.textContent = formatBalance(me.balance);
                    // 管理员隐藏注销按钮
                    if (me.username === 'admin') {
                        myDeleteAccountBtn.style.display = 'none';
                    } else {
                        myDeleteAccountBtn.style.display = 'block';
                    }
                    // 头像
                    if (me.avatar) {
                        updateAvatarUI(me.avatar);
                    } else {
                        updateAvatarUI('');
                    }
                    // 导航栏用户名
                    navUsername.textContent = me.username;
                    greetingUser.textContent = me.username;
                } catch (e) {
                    showToast('刷新信息失败', '❌');
                }
            }

            // ==================== 注销倒计时 ====================
            function resetDeleteButton() {
                if (deleteCountdownInterval) {
                    clearInterval(deleteCountdownInterval);
                    deleteCountdownInterval = null;
                }
                deleteCountdown = 0;
                myDeleteAccountBtn.disabled = false;
                myDeleteAccountBtn.textContent = '🗑️ 注销账号';
                myDeleteAccountBtn.className = 'btn-delete-account';
                myDeleteAccountBtn.onclick = startDeleteCountdown;
            }

            function startDeleteCountdown() {
                // 管理员不可注销
                if (currentUser === 'admin') {
                    showToast('管理员不可注销', '⛔');
                    return;
                }
                if (deleteCountdownInterval) return;
                deleteCountdown = 5;
                myDeleteAccountBtn.disabled = true;
                myDeleteAccountBtn.textContent = `⚠️ 确认注销 (${deleteCountdown}s)`;
                myDeleteAccountBtn.className = 'btn-danger';
                deleteCountdownInterval = setInterval(() => {
                    deleteCountdown--;
                    if (deleteCountdown <= 0) {
                        clearInterval(deleteCountdownInterval);
                        deleteCountdownInterval = null;
                        myDeleteAccountBtn.disabled = false;
                        myDeleteAccountBtn.textContent = '⚠️ 确认注销';
                        myDeleteAccountBtn.className = 'btn-danger';
                        myDeleteAccountBtn.onclick = confirmDeleteAccount;
                    } else {
                        myDeleteAccountBtn.textContent = `⚠️ 确认注销 (${deleteCountdown}s)`;
                    }
                }, 1000);
                myDeleteAccountBtn.onclick = null;
            }

            async function confirmDeleteAccount() {
                if (!currentUser || currentUser === 'admin') {
                    showToast('管理员账号不可注销', '⛔');
                    resetDeleteButton();
                    return;
                }
                if (!confirm('⚠️ 此操作不可恢复！确定要注销账号吗？')) {
                    resetDeleteButton();
                    return;
                }
                try {
                    await deleteUserAPI(currentUser);
                    showToast('账号已注销', '🗑️');
                    resetDeleteButton();
                    handleLogout();
                } catch (e) {
                    showToast('注销失败: ' + e.message, '❌');
                    resetDeleteButton();
                }
            }

            // ==================== 退出登录 ====================
            function handleMyLogout() {
                if (confirm('确定要退出登录吗？')) {
                    resetDeleteButton();
                    handleLogout();
                }
            }

            // ==================== 签到 UI ====================
            async function updateSigninUI() {
                if (!currentUser || currentUser === 'admin') { signinEntry.style.display = 'none'; return; }
                signinEntry.style.display = 'block';
                try {
                    const status = await fetchSigninStatus(currentUser);
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

            // ==================== 签到答题 ====================
            async function openQuizModal() {
                if (!currentUser || currentUser === 'admin') { showToast('普通用户专享', 'ℹ️'); return; }
                try {
                    const status = await fetchSigninStatus(currentUser);
                    if (status.signed) { showToast('今日已签到，明天再来吧！', '✅'); return; }
                    if (status.attempts <= 0) { showToast('今日机会已用完，明天再来！', '❌'); return; }
                } catch (e) { showToast('获取签到状态失败', '❌'); return; }

                quizQuestions = generateQuizQuestions(TOTAL_QUESTIONS);
                currentIndex = 0;
                correctAnswers = 0;
                wrongAnswers = 0;
                timer = getTimeLimit();
                quizActive = false;
                isWaiting = false;
                isCountingDown = false;

                quizModal.classList.add('active');
                renderQuestion();
                updateStats();
                quizStartArea.style.display = 'block';
                startQuizBtn.style.display = 'inline-block';
                countdownDisplay.classList.remove('active');
                countdownDisplay.style.display = 'none';
                answerInput.style.display = 'none';
                answerInput.disabled = true;
                feedback.textContent = '';
                feedback.className = 'feedback';
                updateTimerDisplay(); // 显示当前设定时间
                stopTimer();
                if (timerInterval) clearInterval(timerInterval);
                answerInput.value = '';
                const extra = document.querySelector('.quiz-footer ~ div[style]');
                if (extra) extra.remove();
            }

            function generateQuizQuestions(count) {
                const qs = [];
                for (let i = 0; i < count; i++) qs.push(generateQuestion());
                return qs;
            }

            function generateQuestion() {
                const ops = ['+', '-', '*', '/'];
                let op, a, b, answer, symbol;
                let attempts = 0;
                while (attempts < 30) {
                    op = ops[Math.floor(Math.random() * ops.length)];
                    a = Math.floor(Math.random() * 11);
                    b = Math.floor(Math.random() * 11);
                    if (op === '+') { answer = a + b;
                        symbol = '+'; if (answer <= 20) break; } else if (op === '-') { if (a >= b) { answer = a - b;
                            symbol = '-'; break; } } else if (op === '*') { answer = a * b;
                        symbol = '×'; if (answer <= 100) break; } else if (op === '/') { if (b !== 0 && a % b === 0) { answer =
                                a / b;
                            symbol = '÷'; break; } }
                    attempts++;
                }
                if (attempts >= 30) { a = Math.floor(Math.random() * 11);
                    b = Math.floor(Math.random() * 11);
                    answer = a + b;
                    symbol = '+'; }
                const text = a + ' ' + symbol + ' ' + b + ' = ?';
                return { text, answer };
            }

            function renderQuestion() {
                if (currentIndex >= TOTAL_QUESTIONS) { finishQuiz(false); return; }
                const q = quizQuestions[currentIndex];
                questionNumber.textContent = '第 ' + (currentIndex + 1) + ' 题';
                questionText.textContent = q.text;
                quizProgress.textContent = (currentIndex + 1) + '/' + TOTAL_QUESTIONS;
                answerInput.value = '';
                if (quizActive) {
                    answerInput.disabled = false;
                    answerInput.focus();
                } else {
                    answerInput.disabled = true;
                }
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
                timer = getTimeLimit();
                updateTimerDisplay();
                timerInterval = setInterval(() => {
                    timer--;
                    updateTimerDisplay();
                    if (timer <= 0) {
                        clearInterval(timerInterval);
                        timerInterval = null;
                        if (quizActive) finishQuiz(true);
                    }
                }, 1000);
            }

            function updateTimerDisplay() {
                quizTimer.textContent = '⏳ ' + timer + 's';
                quizTimer.style.color = '#d94a4a';
            }

            function stopTimer() { if (timerInterval) { clearInterval(timerInterval);
                    timerInterval = null; } }

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

                if (correct) { correctAnswers++;
                    feedback.textContent = '✅ 正确！';
                    feedback.className = 'feedback correct'; } else { wrongAnswers++;
                    feedback.textContent = '❌ 错误，正确答案是 ' + q.answer;
                    feedback.className = 'feedback wrong'; }
                updateStats();
                isWaiting = true;

                setTimeout(() => {
                    if (!quizActive) return;
                    currentIndex++;
                    if (currentIndex >= TOTAL_QUESTIONS) { finishQuiz(false); } else { renderQuestion();
                        if (quizActive) {
                            answerInput.disabled = false;
                            answerInput.focus();
                        } }
                }, 300);
            }

            async function finishQuiz(timeout) {
                if (!quizActive && !timeout) return;
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

                try {
                    const status = await fetchSigninStatus(currentUser);
                    const remaining = Math.max(0, status.attempts - 1);
                    if (success) {
                        const allUsers = await fetchAllUsers();
                        const target = allUsers.find(u => u.username === currentUser);
                        if (!target) throw new Error('用户不存在');
                        const newBalance = (target.balance || 0) + SIGNIN_AMOUNT;
                        await updateUserAPI(currentUser, { balance: newBalance });
                        await updateSigninStatusAPI(currentUser, { signed: true, attempts: 0 });
                        // 更新“我的”余额
                        refreshMyInfo();
                        showToast('签到成功！获得 ¥' + SIGNIN_AMOUNT, '💰');
                    } else {
                        await updateSigninStatusAPI(currentUser, { attempts: remaining });
                        if (remaining <= 0) showToast('今日机会已用完', '❌');
                        else showToast('还剩 ' + remaining + ' 次机会', 'ℹ️');
                    }
                } catch (e) {
                    showToast('更新签到状态失败: ' + e.message, '❌');
                }

                await updateSigninUI();
                quizProgress.textContent = (currentIndex + 1) + '/' + TOTAL_QUESTIONS;
                let resultMsg = document.querySelector('.quiz-footer ~ div[style]');
                if (!resultMsg) {
                    resultMsg = document.createElement('div');
                    resultMsg.style.marginTop = '16px';
                    resultMsg.style.fontSize = '18px';
                    resultMsg.style.fontWeight = '700';
                    resultMsg.style.textAlign = 'center';
                    const footer = document.querySelector('.quiz-footer');
                    footer.parentNode.insertBefore(resultMsg, footer.nextSibling);
                }
                if (success) {
                    resultMsg.style.color = '#27ae60';
                    resultMsg.textContent = '✅ 签到成功！余额 +' + SIGNIN_AMOUNT;
                } else {
                    resultMsg.style.color = '#e74c3c';
                    resultMsg.textContent = '❌ 签到失败';
                }
            }

            function closeQuizModal() {
                stopTimer();
                quizActive = false;
                isCountingDown = false;
                quizModal.classList.remove('active');
                const extra = document.querySelector('.quiz-footer ~ div[style]');
                if (extra) extra.remove();
                answerInput.disabled = true;
                answerInput.style.display = 'none';
                answerInput.value = '';
                feedback.textContent = '';
                feedback.className = 'feedback';
                quizStartArea.style.display = 'block';
                startQuizBtn.style.display = 'inline-block';
                countdownDisplay.classList.remove('active');
                countdownDisplay.style.display = 'none';
                if (currentUser) updateSigninUI();
            }

            // ==================== 渲染线路 ====================
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
                    card.innerHTML =
                        `<div class="line-header"><div class="line-color" style="background:${line.color};"></div><span class="line-name">${line.name}<span class="line-code">${line.code}</span></span></div><div class="line-stations">${stationsHtml}</div>`;
                    lineGrid.appendChild(card);
                });
            }

            // ==================== 管理面板 ====================
            async function renderUserTable() {
                try {
                    const users = await fetchAllUsers();
                    userTableBody.innerHTML = '';
                    users.forEach(u => {
                        const tr = document.createElement('tr');
                        // 头像列
                        let avatarHtml = '';
                        if (u.avatar && u.avatar.startsWith('data:image')) {
                            avatarHtml =
                                `<img src="${u.avatar}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;" alt="头像" />`;
                        } else {
                            avatarHtml = `<span style="font-size:24px;">👤</span>`;
                        }
                        // 操作按钮
                        let actions = '';
                        if (u.username !== 'admin') {
                            actions += `<button class="btn-reset" data-username="${u.username}" data-action="reset">重置密码</button>`;
                        }
                        actions += `<button class="btn-balance" data-username="${u.username}" data-action="changeBalance">改余额</button>`;
                        if (u.username !== 'admin') {
                            actions += `<button class="btn-delete" data-username="${u.username}" data-action="delete">注销</button>`;
                        } else {
                            actions += `<span style="color:#aaa;font-size:12px;">(管理员)</span>`;
                        }
                        tr.innerHTML =
                            `<td>${avatarHtml}</td>` +
                            `<td><strong>${u.username}</strong></td>` +
                            `<td><code style="background:#f0f0f0;padding:2px 6px;border-radius:4px;">${u.password}</code></td>` +
                            `<td>${formatBalance(u.balance)}</td>` +
                            `<td>${formatDateTime(u.lastLogin)}</td>` +
                            `<td><div class="table-actions">${actions}</div></td>`;
                        userTableBody.appendChild(tr);
                    });
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
                if (action === 'reset') {
                    if (username === 'admin') { showToast('不能重置管理员', '⚠️'); return; }
                    if (!confirm(`确认将用户 ${username} 的密码重置为 gy123456 吗？（24小时内仅一次）`)) return;
                    try {
                        const result = await resetPasswordAPI(username);
                        showToast(result.message || '重置成功', '✅');
                        renderUserTable();
                    } catch (e) {
                        showToast(e.message || '重置失败', '❌');
                    }
                } else if (action === 'changeBalance') {
                    const input = prompt('请输入新的余额（数字）：');
                    if (input === null) return;
                    const val = parseFloat(input);
                    if (isNaN(val) || val < 0) { showToast('请输入有效数字', '⚠️'); return; }
                    try {
                        await updateUserAPI(username, { balance: val });
                        showToast('余额已更新', '✅');
                        renderUserTable();
                        if (username === currentUser) refreshMyInfo();
                    } catch (e) { showToast('修改失败', '❌'); }
                } else if (action === 'delete') {
                    if (username === 'admin') { showToast('不能注销管理员', '⚠️'); return; }
                    if (confirm('确定注销用户 ' + username + ' 吗？')) {
                        try {
                            await deleteUserAPI(username);
                            showToast('已注销', '🗑️');
                            renderUserTable();
                            if (username === currentUser) handleLogout();
                        } catch (e) { showToast('注销失败', '❌'); }
                    }
                }
            }

            async function renderSceneryAdmin() {
                try {
                    const items = await fetchScenery();
                    sceneryAdminList.innerHTML = '';
                    items.forEach(item => {
                        const div = document.createElement('div');
                        div.className = 'scenery-item-admin';
                        div.innerHTML =
                            `<div class="info"><span class="icon">${item.icon}</span><span class="name">${item.name}</span><span class="desc">${item.desc}</span></div><div class="actions"><button class="btn-edit" data-id="${item.id}">编辑</button><button class="btn-delete" data-id="${item.id}">删除</button></div>`;
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
                } catch (e) { showToast('加载风采失败', '❌'); }
            }

            async function openEditScenery(id) {
                if (id) {
                    try {
                        const items = await fetchScenery();
                        const item = items.find(i => i.id === id);
                        if (item) {
                            editSceneryTitle.textContent = '✏️ 编辑风采';
                            editSceneryId.value = item.id;
                            editSceneryIcon.value = item.icon || '';
                            editSceneryName.value = item.name || '';
                            editSceneryDesc.value = item.desc || '';
                        } else { showToast('未找到', '❌'); return; }
                    } catch (e) { showToast('加载失败', '❌'); return; }
                } else {
                    editSceneryTitle.textContent = '➕ 新增风采';
                    editSceneryId.value = '';
                    editSceneryIcon.value = '';
                    editSceneryName.value = '';
                    editSceneryDesc.value = '';
                }
                editSceneryError.classList.remove('show');
                editSceneryModal.classList.add('active');
            }

            function closeEditScenery() { editSceneryModal.classList.remove('active');
                editSceneryError.classList.remove('show'); }

            async function saveSceneryItem() {
                const id = editSceneryId.value.trim(),
                    icon = editSceneryIcon.value.trim(),
                    name = editSceneryName.value.trim(),
                    desc = editSceneryDesc.value.trim();
                editSceneryError.classList.remove('show');
                if (!name) { editSceneryErrorMessage.textContent = '名称不能为空';
                    editSceneryError.classList.add('show'); return; }
                try {
                    if (id) {
                        await updateSceneryAPI(parseInt(id), { icon, name, desc });
                        showToast('已更新', '✅');
                    } else {
                        await addSceneryAPI({ icon, name, desc });
                        showToast('已添加', '✅');
                    }
                    closeEditScenery();
                    renderSceneryAdmin();
                } catch (e) { showToast('操作失败', '❌'); }
            }

            async function deleteSceneryItem(id) {
                try {
                    await deleteSceneryAPI(id);
                    renderSceneryAdmin();
                    showToast('已删除', '🗑️');
                } catch (e) { showToast('删除失败', '❌'); }
            }

            // ==================== 站车风采浏览 ====================
            async function openSceneryViewer() {
                try {
                    const items = await fetchScenery();
                    const modal = document.createElement('div');
                    modal.className = 'modal-overlay active';
                    modal.style.zIndex = '1000';
                    let html =
                        `<div class="modal-card" style="max-width:600px;"><div class="modal-title">🚉 站车风采</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:16px 0;">`;
                    items.forEach(item => {
                        html +=
                            `<div style="background:#f8fafc;border-radius:14px;padding:16px 14px;border:1px solid #eef2f7;"><span style="font-size:28px;display:block;margin-bottom:4px;">${item.icon}</span><div style="font-weight:700;font-size:16px;color:#0b2a4a;">${item.name}</div><div style="font-size:13px;color:#5a6a7a;margin-top:2px;line-height:1.4;">${item.desc}</div></div>`;
                    });
                    html +=
                        `</div><div class="form-actions"><button class="btn-cancel" id="closeSceneryViewerBtn" style="flex:1;">关闭</button></div></div>`;
                    modal.innerHTML = html;
                    document.body.appendChild(modal);
                    modal.querySelector('#closeSceneryViewerBtn').addEventListener('click', function() { modal
                            .remove(); });
                    modal.addEventListener('click', function(e) { if (e.target === this) modal.remove(); });
                } catch (e) { showToast('加载风采失败', '❌'); }
            }

            // ==================== 管理面板开关 ====================
            function openAdminPanel() {
                if (currentUser !== 'admin') { showToast('权限不足', '⛔'); return; }
                renderUserTable();
                renderSceneryAdmin();
                adminModal.classList.add('active');
                switchTab('users');
            }

            function closeAdminPanel() { adminModal.classList.remove('active'); }

            function switchTab(tabName) {
                tabBtns.forEach(btn => { const t = btn.dataset.tab;
                    btn.classList.toggle('active', t === tabName); });
                Object.keys(tabContents).forEach(key => {
                    tabContents[key].classList.toggle('active', key === tabName);
                });
                if (tabName === 'users') renderUserTable();
                if (tabName === 'scenery') renderSceneryAdmin();
            }

            // ==================== 登录 / 登出 ====================
            async function handleLogin(e) {
                e.preventDefault();
                const username = loginUsername.value.trim(),
                    password = loginPassword.value.trim();
                loginError.classList.remove('show');
                if (!username || !password) { errorMessage.textContent = '请输入账号和密码';
                    loginError.classList.add('show'); return; }
                try {
                    const result = await loginUser(username, password);
                    if (result.success) {
                        loginSuccess(username, result.balance, result.avatar);
                    } else {
                        errorMessage.textContent = result.message || '账号或密码错误';
                        loginError.classList.add('show');
                        loginPassword.value = '';
                        loginPassword.focus();
                    }
                } catch (e) {
                    errorMessage.textContent = '网络错误，请检查后端服务';
                    loginError.classList.add('show');
                }
            }

            function loginSuccess(username, balance, avatar) {
                currentUser = username;
                sessionStorage.setItem('metro_session_user', username);
                loginPage.style.display = 'none';
                homePage.style.display = 'flex';
                // 更新导航
                navUsername.textContent = username;
                greetingUser.textContent = username;
                // 头像
                if (avatar) {
                    updateAvatarUI(avatar);
                } else {
                    updateAvatarUI('');
                }
                // 显示首页
                showHomePage();
                adminEntry.style.display = (username === 'admin') ? 'block' : 'none';
                updateSigninUI();
                renderLines();
                startClock();
                loadElderMode();
                // 刷新“我的”信息（后台加载）
                refreshMyInfo();
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
                resetDeleteButton();
                showToast('已安全退出', '👋');
            }

            // ==================== 时钟 ====================
            function updateClock() {
                const now = new Date();
                if (currentTimeEl) currentTimeEl.textContent = formatTime(now);
                if (currentDateEl) currentDateEl.textContent = formatDate(now);
            }
            function startClock() { if (clockInterval) clearInterval(clockInterval);
                updateClock();
                clockInterval = setInterval(updateClock, 1000); }
            function stopClock() { if (clockInterval) { clearInterval(clockInterval);
                    clockInterval = null; } }

            // ==================== 注册 ====================
            function clearRegisterForm() {
                regUsername.value = '';
                regPassword.value = '';
                regConfirm.value = '';
                regVerify.value = '';
                regError.classList.remove('show');
                regSuccess.classList.remove('show');
            }
            function openRegisterModal() { clearRegisterForm();
                registerModal.classList.add('active'); }
            function closeRegisterModal() { registerModal.classList.remove('active');
                clearRegisterForm(); }

            async function handleRegister() {
                const username = regUsername.value.trim(),
                    password = regPassword.value.trim(),
                    confirm = regConfirm.value.trim(),
                    verify = regVerify.value.trim();
                regError.classList.remove('show');
                regSuccess.classList.remove('show');
                if (!username || username.length < 2) { regErrorMessage.textContent = '账号至少需要2个字符';
                    regError.classList.add('show'); return; }
                if (!password || password.length < 6) { regErrorMessage.textContent = '密码至少需要6个字符';
                    regError.classList.add('show'); return; }
                if (password !== confirm) { regErrorMessage.textContent = '两次输入的密码不一致';
                    regError.classList.add('show'); return; }
                if (!verify) { regErrorMessage.textContent = '请回答验证问题';
                    regError.classList.add('show'); return; }
                if (verify.trim().toUpperCase() !== VERIFY_ANSWER.toUpperCase()) {
                    regErrorMessage.textContent = '验证答案错误，请重新输入';
                    regError.classList.add('show');
                    regVerify.value = '';
                    regVerify.focus();
                    return;
                }
                try {
                    const result = await registerUser(username, password);
                    if (result.success) {
                        regSuccessMessage.textContent = '🎉 注册成功！即将自动登录...';
                        regSuccess.classList.add('show');
                        setTimeout(async () => {
                            closeRegisterModal();
                            const loginResult = await loginUser(username, password);
                            if (loginResult.success) loginSuccess(username, loginResult.balance, loginResult
                                .avatar);
                            else showToast('自动登录失败，请手动登录', '⚠️');
                        }, 1200);
                    } else {
                        regErrorMessage.textContent = result.message || '注册失败';
                        regError.classList.add('show');
                    }
                } catch (e) {
                    regErrorMessage.textContent = '网络错误，请检查后端';
                    regError.classList.add('show');
                }
            }

            // ==================== 忘记密码 ====================
            function openForgotModal() {
                forgotUsername.value = '';
                forgotVerify.value = '';
                forgotNewPassword.value = '';
                forgotError.classList.remove('show');
                forgotSuccess.classList.remove('show');
                forgotModal.classList.add('active');
            }
            function closeForgotModal() { forgotModal.classList.remove('active');
                forgotError.classList.remove('show');
                forgotSuccess.classList.remove('show'); }

            async function handleForgot() {
                const username = forgotUsername.value.trim(),
                    verify = forgotVerify.value.trim(),
                    newPwd = forgotNewPassword.value.trim();
                forgotError.classList.remove('show');
                forgotSuccess.classList.remove('show');
                if (!username) { forgotErrorMessage.textContent = '请输入账号';
                    forgotError.classList.add('show'); return; }
                if (!verify) { forgotErrorMessage.textContent = '请回答验证问题';
                    forgotError.classList.add('show'); return; }
                if (verify.trim().toUpperCase() !== VERIFY_ANSWER.toUpperCase()) {
                    forgotErrorMessage.textContent = '验证答案错误，请重新输入';
                    forgotError.classList.add('show');
                    forgotVerify.value = '';
                    forgotVerify.focus();
                    return;
                }
                if (!newPwd || newPwd.length < 6) { forgotErrorMessage.textContent = '新密码至少需要6个字符';
                    forgotError.classList.add('show'); return; }
                if (username === 'admin') { forgotErrorMessage.textContent = '管理员密码不可在此重置';
                    forgotError.classList.add('show'); return; }
                try {
                    const users = await fetchAllUsers();
                    if (!users.find(u => u.username === username)) {
                        forgotErrorMessage.textContent = '该账号不存在';
                        forgotError.classList.add('show');
                        return;
                    }
                    await updateUserAPI(username, { password: newPwd });
                    forgotSuccessMessage.textContent = '✅ 密码已重置，请使用新密码登录';
                    forgotSuccess.classList.add('show');
                    setTimeout(() => { closeForgotModal();
                        showToast('密码已重置，请重新登录', '🔑'); }, 1500);
                } catch (e) {
                    forgotErrorMessage.textContent = '重置失败，请稍后重试';
                    forgotError.classList.add('show');
                }
            }

            // ==================== 检查登录状态 ====================
            async function checkSession() {
                const username = sessionStorage.getItem('metro_session_user');
                if (username) {
                    try {
                        const users = await fetchAllUsers();
                        const me = users.find(u => u.username === username);
                        if (me) {
                            currentUser = username;
                            loginPage.style.display = 'none';
                            homePage.style.display = 'flex';
                            navUsername.textContent = username;
                            greetingUser.textContent = username;
                            if (me.avatar) {
                                updateAvatarUI(me.avatar);
                            } else {
                                updateAvatarUI('');
                            }
                            adminEntry.style.display = (username === 'admin') ? 'block' : 'none';
                            showHomePage();
                            updateSigninUI();
                            renderLines();
                            startClock();
                            loadElderMode();
                            refreshMyInfo();
                            return true;
                        } else {
                            sessionStorage.removeItem('metro_session_user');
                            return false;
                        }
                    } catch (e) {
                        sessionStorage.removeItem('metro_session_user');
                        return false;
                    }
                }
                return false;
            }

            // ==================== 事件绑定 ====================
            loginForm.addEventListener('submit', handleLogin);
            loginPassword.addEventListener('keydown', function(e) { if (e.key === 'Enter') loginForm.dispatchEvent(new Event(
                        'submit')); });

            // 点击用户名打开“我的”
            userNameClick.addEventListener('click', showMyPage);

            // 快捷功能
            document.querySelectorAll('.quick-action[data-action]').forEach(el => {
                el.addEventListener('click', function() {
                    const action = this.dataset.action;
                    if (action === 'ticket') showToast('购票功能开发中，敬请期待！', '🎟️');
                    else if (action === 'line') showToast('线路查询功能开发中，敬请期待！', '🗺️');
                    else if (action === 'scenery') openSceneryViewer();
                    else if (action === 'signin') openQuizModal();
                    else if (action === 'admin') openAdminPanel();
                    else if (action === 'my') showMyPage();
                });
            });

            // 我的页面 - 返回首页
            myBackBtn.addEventListener('click', showHomePage);

            // 头像上传
            avatarWrapper.addEventListener('click', function() {
                if (!currentUser) return;
                avatarInput.click();
            });
            avatarInput.addEventListener('change', function(e) {
                if (this.files && this.files[0]) {
                    handleAvatarUpload(this.files[0]);
                }
                this.value = ''; // 重置，允许重复选择同一文件
            });

            // 退出登录
            myLogoutBtn.addEventListener('click', handleMyLogout);

            // 注销账号（初始点击触发倒计时）
            myDeleteAccountBtn.addEventListener('click', function() {
                if (this.disabled) return;
                if (deleteCountdownInterval) return;
                if (this.textContent === '⚠️ 确认注销') {
                    confirmDeleteAccount();
                    return;
                }
                startDeleteCountdown();
            });

            // 长者关怀开关
            elderToggle.addEventListener('click', function() {
                const newState = !elderMode;
                applyElderMode(newState);
                showToast(newState ? '长者关怀已开启' : '长者关怀已关闭', newState ? '🌙' : '☀️');
            });

            // 注册
            openRegisterBtn.addEventListener('click', openRegisterModal);
            closeRegisterBtn.addEventListener('click', closeRegisterModal);
            registerBtn.addEventListener('click', handleRegister);
            registerModal.addEventListener('click', function(e) { if (e.target === this) closeRegisterModal(); });
            regVerify.addEventListener('keydown', function(e) { if (e.key === 'Enter') registerBtn.click(); });

            // 忘记密码
            openForgotBtn.addEventListener('click', openForgotModal);
            closeForgotBtn.addEventListener('click', closeForgotModal);
            forgotBtn.addEventListener('click', handleForgot);
            forgotModal.addEventListener('click', function(e) { if (e.target === this) closeForgotModal(); });
            forgotNewPassword.addEventListener('keydown', function(e) { if (e.key === 'Enter') forgotBtn.click(); });

            // 答题
            startQuizBtn.addEventListener('click', function() {
                // 开始前确保计时器显示正确的时间
                timer = getTimeLimit();
                updateTimerDisplay();
                startQuiz();
            });
            answerInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') { e.preventDefault();
                    handleAnswer(); }
            });
            closeQuizBtn.addEventListener('click', closeQuizModal);
            quizModal.addEventListener('click', function(e) { if (e.target === this) closeQuizModal(); });

            // 管理
            closeAdminBtn.addEventListener('click', closeAdminPanel);
            adminModal.addEventListener('click', function(e) { if (e.target === this) closeAdminPanel(); });
            tabBtns.forEach(btn => {
                btn.addEventListener('click', function() { switchTab(this.dataset.tab); });
            });
            addSceneryBtn.addEventListener('click', function() { openEditScenery(null); });
            closeEditSceneryBtn.addEventListener('click', closeEditScenery);
            saveSceneryBtn.addEventListener('click', saveSceneryItem);
            editSceneryModal.addEventListener('click', function(e) { if (e.target === this) closeEditScenery(); });

            // 登录框清除错误
            loginUsername.addEventListener('focus', function() { loginError.classList.remove('show'); });
            loginPassword.addEventListener('focus', function() { loginError.classList.remove('show'); });

            // 修正 startQuiz 函数（覆盖原函数）
            const originalStartQuiz = startQuiz;
            startQuiz = function() {
                if (isCountingDown || quizActive) return;
                timer = getTimeLimit();
                updateTimerDisplay();
                isCountingDown = true;
                startQuizBtn.style.display = 'none';
                countdownDisplay.style.display = 'block';
                countdownDisplay.classList.add('active');
                let count = 3;
                countdownDisplay.textContent = count;
                const cdInterval = setInterval(() => {
                    count--;
                    if (count <= 0) {
                        clearInterval(cdInterval);
                        countdownDisplay.classList.remove('active');
                        countdownDisplay.style.display = 'none';
                        isCountingDown = false;
                        quizActive = true;
                        answerInput.style.display = 'inline-block';
                        answerInput.disabled = false;
                        answerInput.focus();
                        startTimer();
                    } else {
                        countdownDisplay.textContent = count;
                    }
                }, 1000);
            };

            // ==================== 初始化 ====================
            (async function init() {
                const hasSession = await checkSession();
                if (!hasSession) {
                    loginPage.style.display = 'flex';
                    homePage.style.display = 'none';
                    loginUsername.value = '';
                    loginPassword.value = '';
                }
            })();

        })();
    </script>
</body>
</html>
