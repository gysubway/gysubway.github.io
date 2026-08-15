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
        .modal-card input[type="text"], .modal-card input[type="password"], .modal-card input[type="number"], .modal-card textarea { width:100%; padding:12px 16px; font-size:15px; border:2px solid #dce3ec; border-radius:10px; background:#f8fafc; transition:border-color 0.25s; outline:none; color:#1a2a3a; font-family:inherit; }
        .modal-card input:focus, .modal-card textarea:focus { border-color:#1a6e9e; background:#ffffff; }
        .modal-card textarea { min-height:60px; resize:vertical; }
        .modal-card .form-actions { display:flex; gap:12px; margin-top:20px; }
        .modal-card .form-actions button { flex:1; padding:14px; font-size:16px; font-weight:700; border:none; border-radius:10px; cursor:pointer; transition:background 0.25s, transform 0.15s; }
        .modal-card .btn-primary { background:linear-gradient(135deg,#1a6e9e,#0b4a72); color:#ffffff; }
        .modal-card .btn-primary:hover { background:linear-gradient(135deg,#1f7eb2,#0e5580); }
        .modal-card .btn-danger { background:#d94a4a; color:#ffffff; }
        .modal-card .btn-danger:hover { background:#c0392b; }
        .modal-card .btn-cancel { background:#eef2f7; color:#4a5a6a; }
        .modal-card .btn-cancel:hover { background:#e0e6ee; }
        .modal-card .btn-success { background:#27ae60; color:#fff; }
        .modal-card .btn-success:hover { background:#1e8449; }
        .modal-card .modal-error { margin-top:14px; padding:10px 14px; background:#fef2f0; border-left:4px solid #d94a4a; border-radius:6px; color:#b33a3a; font-size:14px; display:none; align-items:center; gap:8px; }
        .modal-card .modal-error.show { display:flex; }
        .modal-card .modal-success { margin-top:14px; padding:10px 14px; background:#ecf9f0; border-left:4px solid #2ecc71; border-radius:6px; color:#1a7a4a; font-size:14px; display:none; align-items:center; gap:8px; }
        .modal-card .modal-success.show { display:flex; }
        .register-modal .verify-question { background:#eef4fa; padding:12px 16px; border-radius:10px; font-size:15px; color:#0b2a4a; margin-bottom:10px; border-left:4px solid #1a6e9e; font-weight:500; }
        .quiz-modal .modal-card { max-width:720px; }
        .quiz-modal .quiz-question { font-size:18px; font-weight:600; color:#0b2a4a; padding:16px 20px; background:#f0f5fb; border-radius:12px; margin-bottom:20px; line-height:1.6; border-left:5px solid #1a6e9e; }
        .quiz-modal .quiz-options { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:16px; }
        .quiz-modal .quiz-options .opt-btn { padding:12px 16px; border:2px solid #dce3ec; border-radius:10px; background:#fafcfd; cursor:pointer; transition:all 0.2s; font-size:15px; text-align:left; display:flex; align-items:center; gap:8px; font-weight:500; color:#1a2a3a; }
        .quiz-modal .quiz-options .opt-btn:hover:not(.disabled) { border-color:#1a6e9e; background:#eaf3fa; transform:translateY(-1px); }
        .quiz-modal .quiz-options .opt-btn .opt-label { display:inline-block; min-width:28px; font-weight:700; color:#1a6e9e; }
        .quiz-modal .quiz-options .opt-btn.correct { border-color:#27ae60; background:#d5f5e3; }
        .quiz-modal .quiz-options .opt-btn.wrong { border-color:#e74c3c; background:#fadbd8; }
        .quiz-modal .quiz-options .opt-btn.disabled { cursor:not-allowed; opacity:0.7; }
        .quiz-modal .quiz-status { display:flex; justify-content:space-between; align-items:center; padding:10px 0; font-weight:600; color:#2c3e50; flex-wrap:wrap; gap:8px; }
        .quiz-modal .quiz-status .attempts-left { color:#d94a4a; }
        .quiz-modal .quiz-status .status-msg { color:#1a6e9e; }
        .quiz-modal .quiz-result-box { padding:14px 20px; border-radius:10px; margin-top:12px; font-weight:600; font-size:16px; display:none; text-align:center; }
        .quiz-modal .quiz-result-box.success { display:block; background:#d5f5e3; color:#1a7a4a; }
        .quiz-modal .quiz-result-box.fail { display:block; background:#fadbd8; color:#922b21; }
        .quiz-modal .quiz-result-box.info { display:block; background:#d4e6f1; color:#1a4a6e; }
        @media (max-width:600px) { .quiz-modal .quiz-options { grid-template-columns:1fr; } .quiz-modal .modal-card { padding:20px 14px; } .quiz-modal .quiz-question { font-size:16px; padding:12px 14px; } }
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
        .admin-modal .modal-card { max-width:900px; }
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
        .admin-modal .admin-toolbar { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:16px; align-items:center; }
        .admin-modal .admin-toolbar button { padding:8px 18px; border:none; border-radius:8px; font-weight:600; cursor:pointer; transition:background 0.2s; font-size:14px; }
        .admin-modal .admin-toolbar .btn-shuffle { background:#f39c12; color:#fff; }
        .admin-modal .admin-toolbar .btn-shuffle:hover { background:#d68910; }
        .admin-modal .admin-toolbar .btn-refresh { background:#1a6e9e; color:#fff; }
        .admin-modal .admin-toolbar .btn-refresh:hover { background:#0b4a72; }
        .admin-modal .admin-toolbar .btn-danger { background:#d94a4a; color:#fff; }
        .admin-modal .admin-toolbar .btn-danger:hover { background:#c0392b; }
        .admin-modal .question-list { display:flex; flex-direction:column; gap:12px; margin-top:8px; max-height:400px; overflow-y:auto; }
        .admin-modal .question-item { background:#f8fafc; border-radius:12px; padding:14px 18px; border:1px solid #eef2f7; display:flex; justify-content:space-between; align-items:flex-start; gap:12px; flex-wrap:wrap; }
        .admin-modal .question-item .q-info { flex:1; min-width:200px; }
        .admin-modal .question-item .q-info .q-text { font-weight:600; color:#0b2a4a; font-size:15px; }
        .admin-modal .question-item .q-info .q-options { font-size:13px; color:#5a6a7a; margin-top:4px; }
        .admin-modal .question-item .q-info .q-options .opt-text { display:inline-block; margin-right:8px; }
        .admin-modal .question-item .q-info .q-answer { font-size:13px; color:#27ae60; font-weight:600; margin-top:2px; }
        .admin-modal .question-item .q-actions { display:flex; gap:6px; flex-shrink:0; }
        .admin-modal .question-item .q-actions button { padding:4px 14px; font-size:12px; border:none; border-radius:6px; font-weight:600; cursor:pointer; transition:background 0.2s; }
        .admin-modal .question-item .q-actions .btn-edit { background:#d4e6f1; color:#1a4a6e; }
        .admin-modal .question-item .q-actions .btn-edit:hover { background:#b0d0e6; }
        .admin-modal .question-item .q-actions .btn-delete { background:#fadbd8; color:#922b21; }
        .admin-modal .question-item .q-actions .btn-delete:hover { background:#f5b7b1; }
        .admin-modal .upload-area { background:#f0f5fb; border:2px dashed #b0c4d8; border-radius:12px; padding:20px; text-align:center; margin-bottom:16px; }
        .admin-modal .upload-area input[type="file"] { display:block; margin:10px auto; }
        .admin-modal .upload-area .upload-hint { font-size:13px; color:#5a6a7a; }
        .toast-container { position:fixed; top:100px; left:50%; transform:translateX(-50%); z-index:9999; pointer-events:none; }
        .toast { background:#1a2a3a; color:#ffffff; padding:14px 32px; border-radius:12px; font-size:15px; font-weight:500; box-shadow:0 8px 32px rgba(0,0,0,0.30); opacity:0; transform:translateY(-20px) scale(0.95); transition:opacity 0.35s ease, transform 0.35s ease; pointer-events:auto; display:flex; align-items:center; gap:10px; white-space:nowrap; }
        .toast.show { opacity:1; transform:translateY(0) scale(1); }
        .toast .toast-icon { font-size:20px; }
        @media (max-width:992px) { .card-grid { grid-template-columns:1fr; gap:16px; } .quick-actions { grid-template-columns:repeat(3,1fr); } .home-main { padding:20px 24px 16px; } .navbar { padding:0 24px; height:64px; } .navbar .brand { font-size:18px; } .navbar .brand .brand-sub { display:none; } .hero-banner h1 { font-size:38px; letter-spacing:4px; } .welcome-banner { flex-direction:column; align-items:flex-start; } .welcome-banner .datetime { text-align:left; width:100%; white-space:normal; } .admin-modal .modal-card { max-width:95%; padding:24px 16px; } .quiz-modal .modal-card { max-width:95%; } }
        @media (max-width:600px) { .login-card { padding:28px 18px 24px; } .login-logo h1 { font-size:22px; } .navbar .user-area .user-info { font-size:12px; gap:6px; flex-wrap:wrap; justify-content:flex-end; } .navbar .user-area .user-info .user-name, .navbar .user-area .user-info .user-balance { padding:3px 12px; font-size:12px; } .navbar .logout-btn { font-size:12px; padding:5px 14px; } .navbar { padding:0 14px; height:58px; } .navbar .brand { font-size:16px; gap:6px; } .navbar .brand .brand-icon { font-size:22px; } .hero-banner h1 { font-size:28px; letter-spacing:2px; } .hero-banner { padding:16px 12px; } .quick-actions { grid-template-columns:1fr 1fr 1fr; gap:10px; } .quick-action { padding:16px 6px 14px; } .quick-action .qa-icon { font-size:26px; } .quick-action .qa-label { font-size:14px; } .quick-action .qa-desc { font-size:11px; } .line-card { padding:14px 16px; } .line-card .line-stations { gap:2px 10px; padding-left:10px; } .line-card .line-stations .station { font-size:13px; } .home-main { padding:14px 14px 12px; } .welcome-banner { padding:14px 16px; } .welcome-banner .greeting h2 { font-size:18px; } .modal-card { padding:24px 18px 20px; } .modal-card .form-actions { flex-direction:column; } .toast { padding:12px 20px; font-size:14px; white-space:normal; } .admin-modal table th, .admin-modal table td { padding:6px 4px; font-size:12px; } .admin-modal .table-actions button { font-size:10px; padding:2px 8px; } .admin-modal .question-item { flex-direction:column; align-items:stretch; } .admin-modal .question-item .q-actions { margin-top:6px; } .admin-modal .admin-toolbar button { font-size:12px; padding:6px 14px; } .quiz-modal .quiz-options { grid-template-columns:1fr; } }
        .text-muted { color:#8a9aaa; font-size:13px; }
        .mt-8 { margin-top:8px; }
        .flex-center { display:flex; align-items:center; gap:6px; }
        .text-center { text-align:center; }
        .w-full { width:100%; }
    </style>
</head>
<body>

    <!-- 登录页 -->
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

    <!-- 注册模态框 -->
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

    <!-- 忘记密码模态框 -->
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

    <!-- 签到答题模态框 -->
    <div class="modal-overlay quiz-modal" id="quizModal">
        <div class="modal-card">
            <div class="modal-title">🧠 每日签到 · 逻辑推理</div>
            <div class="quiz-question" id="quizQuestion">题目加载中...</div>
            <div class="quiz-options" id="quizOptions"></div>
            <div class="quiz-status">
                <span>📅 <span id="quizDate">--</span></span>
                <span>💪 剩余尝试: <span class="attempts-left" id="quizAttempts">2</span></span>
                <span class="status-msg" id="quizStatusMsg">请选择答案</span>
            </div>
            <div class="quiz-result-box" id="quizResult"></div>
            <div class="form-actions" style="margin-top:16px;"><button class="btn-cancel" id="closeQuizBtn">关闭</button></div>
        </div>
    </div>

    <!-- 管理面板 -->
    <div class="modal-overlay admin-modal" id="adminModal">
        <div class="modal-card">
            <div class="modal-title">⚙️ 管理面板</div>
            <div class="tab-bar">
                <button class="tab-btn active" data-tab="users">👥 用户管理</button>
                <button class="tab-btn" data-tab="scenery">📸 站车风采</button>
                <button class="tab-btn" data-tab="questions">📚 题库管理</button>
            </div>
            <!-- 用户 -->
            <div class="tab-content active" id="tabUsers">
                <div class="user-table-wrap"><table><thead><tr><th>用户名</th><th>余额</th><th>操作</th></tr></thead><tbody id="userTableBody"></tbody></table></div>
                <p class="text-muted mt-8">* 管理员可修改密码、余额，注销账号（不能注销自己）</p>
            </div>
            <!-- 风采 -->
            <div class="tab-content" id="tabScenery">
                <div class="scenery-list" id="sceneryAdminList"></div>
                <button class="add-btn" id="addSceneryBtn">➕ 新增风采</button>
            </div>
            <!-- 题库 -->
            <div class="tab-content" id="tabQuestions">
                <div class="admin-toolbar">
                    <button class="btn-shuffle" id="shuffleDailyBtn">🎲 一键换题</button>
                    <button class="btn-refresh" id="refreshQuestionsBtn">🔄 刷新列表</button>
                    <button class="add-btn" id="addQuestionBtn" style="margin:0;">➕ 新增题目</button>
                    <button class="btn-danger" id="clearQuestionsBtn">🗑️ 清空题库</button>
                    <span style="font-size:13px;color:#7a8a9e;margin-left:4px;" id="questionCountInfo">共 0 题</span>
                </div>
                <!-- 上传区域 -->
                <div class="upload-area">
                    <div class="upload-hint">📤 上传题库 (txt格式，每行一道题，格式见说明)</div>
                    <input type="file" id="uploadQuestionFile" accept=".txt" />
                    <button class="btn-primary" id="uploadQuestionsBtn" style="margin-top:8px;">上传并替换题库</button>
                    <div style="font-size:12px;color:#7a8a9e;margin-top:6px;">格式：题目||选项1||选项2||...||选项N||答案字母(A-Z)</div>
                </div>
                <div class="question-list" id="questionList"></div>
            </div>
            <div class="form-actions" style="margin-top:20px;"><button class="btn-cancel" id="closeAdminBtn" style="flex:1;">关闭</button></div>
        </div>
    </div>

    <!-- 编辑风采 -->
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

    <!-- 编辑题目 -->
    <div class="modal-overlay" id="editQuestionModal">
        <div class="modal-card" style="max-width:760px;">
            <div class="modal-title" id="editQuestionTitle">编辑题目</div>
            <input type="hidden" id="editQuestionId" value="" />
            <div class="form-group"><label>题目内容</label><textarea id="editQuestionText" rows="3" placeholder="请输入题目..."></textarea></div>
            <div class="form-group"><label>选项 (每行一个，至少6个，最多10个)</label><textarea id="editQuestionOptions" rows="8" placeholder="选项A&#10;选项B&#10;选项C&#10;..."></textarea></div>
            <div class="form-group"><label>正确答案 (填写对应字母，如 A、B、C...)</label><input type="text" id="editQuestionAnswer" placeholder="例如 A" style="max-width:120px;" /></div>
            <div class="modal-error" id="editQuestionError"><span class="err-icon">⚠️</span><span id="editQuestionErrorMessage">错误信息</span></div>
            <div class="form-actions"><button class="btn-cancel" id="closeEditQuestionBtn">取消</button><button class="btn-primary" id="saveQuestionBtn">保存</button></div>
        </div>
    </div>

    <!-- 首页 -->
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
                <div class="greeting"><h2>👋 欢迎回来，<span class="highlight" id="greetingUser">用户</span></h2><p>固原地铁 · 智能售票系统 v3.0</p></div>
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
                    <span class="qa-icon">✅</span><div class="qa-label">每日签到</div>
                    <div class="qa-desc" id="signinDesc">签到得 ¥20</div>
                </div>
                <div class="quick-action admin-action" data-action="admin" id="adminEntry" style="display:none;">
                    <span class="qa-icon">⚙️</span><div class="qa-label">管理面板</div><div class="qa-desc">管理员专用</div>
                </div>
            </div>
            <div class="home-footer">&copy; 2026 <strong>固原地铁</strong> · 虚拟线网数据 · 仅供演示</div>
        </main>
    </div>

    <!-- Toast -->
    <div class="toast-container" id="toastContainer"></div>

    <script>
        (function() {
            'use strict';

            // ===== 常量 =====
            const LINE_DATA = [
                { id: 1, name: '1号线', code: 'M1', color: '#e74c3c', stations: ['火车站', '市政府', '人民广场', '大学城', '科技园',
                        '体育中心'
                    ] },
                { id: 2, name: '2号线', code: 'M2', color: '#3498db', stations: ['机场', '会展中心', '市中心', '体育馆', '高铁站',
                        '生态园'
                    ] },
                { id: 3, name: '3号线', code: 'M3', color: '#2ecc71', stations: ['汽车站', '商业街', '文化宫', '图书馆', '政务中心',
                        '智慧谷'
                    ] },
                { id: 4, name: '4号线', code: 'M4', color: '#f39c12', stations: ['古雁岭', '新区医院', '实验中学', '万达广场',
                        '行政中心', '固原南站'
                    ] }
            ];
            const PRESET_USER = { username: 'admin', password: 'gysubway2026', balance: 1000000 };
            const VERIFY_QUESTION = '固局更高速度实验列车的车号是？';
            const VERIFY_ANSWER = 'CRH380CM-0304';
            const SIGNIN_AMOUNT = 20;
            const MAX_ATTEMPTS = 2;
            const DAILY_QUESTION_KEY = 'metro_daily_question';
            const QUIZ_STORAGE_KEY = 'metro_quiz_data';
            const QUESTION_BANK_KEY = 'metro_question_bank';
            const USER_STORAGE_KEY = 'metro_users_data';
            const SCENERY_STORAGE_KEY = 'metro_scenery_data';
            const SIGNIN_HISTORY_KEY = 'metro_signin_history';

            // ===== 存储工具 =====
            function getTodayStr() { return new Date().toISOString().split('T')[0]; }

            // 用户
            function loadUsers() {
                try { const raw = localStorage.getItem(USER_STORAGE_KEY); if (raw) { const d = JSON.parse(raw); if (!d
                            .admin) { d.admin = { password: PRESET_USER.password, balance: PRESET_USER.balance }; }
                        return d; } } catch (_) {}
                const d = { admin: { password: PRESET_USER.password, balance: PRESET_USER.balance } };
                localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(d));
                return d;
            }

            function saveUsers(u) { localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(u)); }

            function getUser(name) { const u = loadUsers(); return u[name] || null; }

            function userExists(name) { const u = loadUsers(); return u.hasOwnProperty(name); }

            function createUser(name, pwd) {
                const u = loadUsers();
                if (u[name]) return false;
                u[name] = { password: pwd, balance: 0 };
                saveUsers(u);
                return true;
            }

            function updateUser(name, upd) {
                const u = loadUsers();
                if (!u[name]) return false;
                Object.assign(u[name], upd);
                saveUsers(u);
                return true;
            }

            function deleteUser(name) {
                if (name === 'admin') return false;
                const u = loadUsers();
                if (!u[name]) return false;
                delete u[name];
                saveUsers(u);
                return true;
            }

            // 题库 - 初始为空
            function loadQuestionBank() {
                try {
                    const raw = localStorage.getItem(QUESTION_BANK_KEY);
                    if (raw) { const d = JSON.parse(raw); if (Array.isArray(d)) return d; }
                } catch (_) {}
                return [];
            }

            function saveQuestionBank(qs) { localStorage.setItem(QUESTION_BANK_KEY, JSON.stringify(qs)); }

            function getNextQId(qs) { if (!qs.length) return 1; return Math.max(...qs.map(i => i.id)) + 1; }

            // 每日题目
            function getDailyQuestion() {
                const today = getTodayStr();
                const raw = localStorage.getItem(DAILY_QUESTION_KEY);
                if (raw) {
                    try {
                        const d = JSON.parse(raw);
                        if (d.date === today) {
                            const bank = loadQuestionBank();
                            const q = bank.find(item => item.id === d.questionId);
                            if (q) return { date: d.date, questionId: d.questionId, question: q };
                        }
                    } catch (_) {}
                }
                return null;
            }

            function setDailyQuestion(qId) {
                const today = getTodayStr();
                localStorage.setItem(DAILY_QUESTION_KEY, JSON.stringify({ date: today, questionId: qId }));
            }

            function pickDailyQuestion() {
                const bank = loadQuestionBank();
                if (!bank.length) { localStorage.removeItem(DAILY_QUESTION_KEY); return null; }
                const today = getTodayStr();
                const history = getGlobalQuestionHistory();
                const usedIds = history.slice(-30);
                const available = bank.filter(q => !usedIds.includes(q.id));
                if (!available.length) {
                    resetGlobalQuestionHistory();
                    return pickDailyQuestion();
                }
                const chosen = available[Math.floor(Math.random() * available.length)];
                setDailyQuestion(chosen.id);
                addGlobalQuestionHistory(chosen.id);
                return chosen;
            }

            function getDailyQuestionForToday() {
                let dq = getDailyQuestion();
                if (dq) return dq;
                const q = pickDailyQuestion();
                if (!q) return null;
                return { date: getTodayStr(), questionId: q.id, question: q };
            }

            function getGlobalQuestionHistory() {
                try { const raw = localStorage.getItem('metro_global_q_history'); if (raw) { const d = JSON.parse(raw); if (
                            Array.isArray(d)) return d; } } catch (_) {}
                return [];
            }

            function addGlobalQuestionHistory(id) {
                let hist = getGlobalQuestionHistory();
                hist.push(id);
                if (hist.length > 30) hist = hist.slice(-30);
                localStorage.setItem('metro_global_q_history', JSON.stringify(hist));
            }

            function resetGlobalQuestionHistory() {
                localStorage.setItem('metro_global_q_history', JSON.stringify([]));
            }

            // 签到数据（用户维度）
            function loadQuizData() {
                try { const raw = localStorage.getItem(QUIZ_STORAGE_KEY); if (raw) return JSON.parse(raw); } catch (_) {}
                return {};
            }

            function saveQuizData(d) { localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(d)); }

            function getUserQuizStatus(username) {
                const data = loadQuizData();
                const today = getTodayStr();
                if (!data[username]) { data[username] = { date: today, signed: false, attempts: MAX_ATTEMPTS,
                        questionId: null };
                    saveQuizData(data); }
                const u = data[username];
                if (u.date !== today) { u.date = today;
                    u.signed = false;
                    u.attempts = MAX_ATTEMPTS;
                    u.questionId = null;
                    saveQuizData(data); }
                return u;
            }

            function updateUserQuizStatus(username, updates) {
                const data = loadQuizData();
                const today = getTodayStr();
                if (!data[username]) { data[username] = { date: today, signed: false, attempts: MAX_ATTEMPTS,
                        questionId: null }; }
                if (data[username].date !== today) { data[username] = { date: today, signed: false, attempts: MAX_ATTEMPTS,
                        questionId: null }; }
                Object.assign(data[username], updates);
                saveQuizData(data);
            }

            // 签到历史
            function getSigninHistory(username) {
                try { const raw = localStorage.getItem(SIGNIN_HISTORY_KEY); if (raw) { const d = JSON.parse(raw); return d[
                            username] || []; } } catch (_) {}
                return [];
            }

            function addSigninHistory(username, date) {
                let all = {};
                try { const raw = localStorage.getItem(SIGNIN_HISTORY_KEY); if (raw) all = JSON.parse(raw); } catch (_) {}
                if (!all[username]) all[username] = [];
                all[username].push(date);
                localStorage.setItem(SIGNIN_HISTORY_KEY, JSON.stringify(all));
            }

            // 站车风采
            const DEFAULT_SCENERY = [
                { id: 1, icon: '🏛️', name: '固原站', desc: '固原地铁1号线起点站，集交通、商业、文化于一体的综合枢纽，日均客流量超10万人次。' },
                { id: 2, icon: '🏙️', name: '人民广场站', desc: '位于城市核心区，2号线与3号线换乘站，毗邻市政府与商业中心，是城市最繁忙的站点之一。' },
                { id: 3, icon: '🌳', name: '古雁岭站', desc: '4号线站点，毗邻古雁岭生态公园，车站设计融入自然元素，被誉为"最美地铁站"。' },
                { id: 4, icon: '🚄', name: 'CRH380 系列', desc: '高速动车组，最高运营时速380km/h，中国高铁的标杆车型，安全、舒适、快捷。' },
                { id: 5, icon: '🚇', name: '固原地铁 A 型车', desc: '6节编组，最高时速80km/h，采用永磁同步电机与节能空调，绿色环保，噪音更低。' },
                { id: 6, icon: '🛤️', name: '智慧运维系统', desc: '基于大数据与AI的列车智能运维平台，实时监测车辆状态，保障运营安全可靠。' }
            ];

            function loadScenery() {
                try { const raw = localStorage.getItem(SCENERY_STORAGE_KEY); if (raw) { const d = JSON.parse(raw); if (Array
                            .isArray(d) && d.length) return d; } } catch (_) {}
                localStorage.setItem(SCENERY_STORAGE_KEY, JSON.stringify(DEFAULT_SCENERY));
                return DEFAULT_SCENERY.slice();
            }

            function saveScenery(items) { localStorage.setItem(SCENERY_STORAGE_KEY, JSON.stringify(items)); }

            function getNextSceneryId(items) { if (!items.length) return 1; return Math.max(...items.map(i => i.id)) + 1; }

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
            const quizQuestion = document.getElementById('quizQuestion');
            const quizOptions = document.getElementById('quizOptions');
            const quizDate = document.getElementById('quizDate');
            const quizAttempts = document.getElementById('quizAttempts');
            const quizStatusMsg = document.getElementById('quizStatusMsg');
            const quizResult = document.getElementById('quizResult');
            const closeQuizBtn = document.getElementById('closeQuizBtn');

            const adminModal = document.getElementById('adminModal');
            const closeAdminBtn = document.getElementById('closeAdminBtn');
            const userTableBody = document.getElementById('userTableBody');
            const sceneryAdminList = document.getElementById('sceneryAdminList');
            const addSceneryBtn = document.getElementById('addSceneryBtn');
            const questionList = document.getElementById('questionList');
            const shuffleDailyBtn = document.getElementById('shuffleDailyBtn');
            const refreshQuestionsBtn = document.getElementById('refreshQuestionsBtn');
            const addQuestionBtn = document.getElementById('addQuestionBtn');
            const clearQuestionsBtn = document.getElementById('clearQuestionsBtn');
            const uploadQuestionFile = document.getElementById('uploadQuestionFile');
            const uploadQuestionsBtn = document.getElementById('uploadQuestionsBtn');
            const questionCountInfo = document.getElementById('questionCountInfo');
            const tabBtns = document.querySelectorAll('.tab-btn');
            const tabContents = { users: document.getElementById('tabUsers'), scenery: document.getElementById(
                    'tabScenery'), questions: document.getElementById('tabQuestions') };

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

            const editQuestionModal = document.getElementById('editQuestionModal');
            const closeEditQuestionBtn = document.getElementById('closeEditQuestionBtn');
            const saveQuestionBtn = document.getElementById('saveQuestionBtn');
            const editQuestionId = document.getElementById('editQuestionId');
            const editQuestionText = document.getElementById('editQuestionText');
            const editQuestionOptions = document.getElementById('editQuestionOptions');
            const editQuestionAnswer = document.getElementById('editQuestionAnswer');
            const editQuestionError = document.getElementById('editQuestionError');
            const editQuestionErrorMessage = document.getElementById('editQuestionErrorMessage');
            const editQuestionTitle = document.getElementById('editQuestionTitle');

            const toastContainer = document.getElementById('toastContainer');

            let currentUser = null;
            let clockInterval = null;
            let quizActive = false;

            // ===== 工具 =====
            function formatDate(now) {
                const y = now.getFullYear(),
                    m = String(now.getMonth() + 1).padStart(2, '0'),
                    d = String(now.getDate()).padStart(2, '0');
                return y + '年' + m + '月' + d + '日 ' + ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][now.getDay()];
            }

            function formatTime(now) { return String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes())
                    .padStart(2, '0') + ':' + String(now.getSeconds()).padStart(2, '0'); }

            function formatBalance(val) { return '¥' + Number(val).toFixed(2); }

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
                editQuestionModal.classList.remove('active');
                forgotModal.classList.remove('active');
                quizModal.classList.remove('active');
            }

            // ===== 渲染函数 =====
            function renderLines() {
                if (!lineGrid) return;
                lineGrid.innerHTML = '';
                LINE_DATA.forEach(line => {
                    const card = document.createElement('div');
                    card.className = 'line-card';
                    const stationsHtml = line.stations.map((s, idx) => {
                        let arrow = (idx < line.stations.length - 1) ? ' <span class="dir-icon">→</span> ' :
                            '';
                        return '<span class="station">' + s + arrow + '</span>';
                    }).join('');
                    card.innerHTML =
                        `<div class="line-header"><div class="line-color" style="background:${line.color};"></div><span class="line-name">${line.name}<span class="line-code">${line.code}</span></span></div><div class="line-stations">${stationsHtml}</div>`;
                    lineGrid.appendChild(card);
                });
            }

            function renderUserTable() {
                const users = loadUsers();
                const names = Object.keys(users);
                userTableBody.innerHTML = '';
                names.forEach(uname => {
                    const u = users[uname];
                    const tr = document.createElement('tr');
                    let actions =
                        `<button class="btn-edit" data-username="${uname}" data-action="changePwd">改密码</button><button class="btn-balance" data-username="${uname}" data-action="changeBalance">改余额</button>`;
                    if (uname !== 'admin') {
                        actions +=
                            `<button class="btn-delete" data-username="${uname}" data-action="delete">注销</button>`;
                    } else {
                        actions += `<span style="color:#aaa;font-size:12px;">(管理员)</span>`;
                    }
                    tr.innerHTML =
                        `<td><strong>${uname}</strong></td><td>${formatBalance(u.balance)}</td><td><div class="table-actions">${actions}</div></td>`;
                    userTableBody.appendChild(tr);
                });
                userTableBody.querySelectorAll('[data-action]').forEach(btn => {
                    btn.addEventListener('click', function() {
                        handleUserAction(this.dataset.action, this.dataset.username);
                    });
                });
            }

            function renderSceneryAdmin() {
                const items = loadScenery();
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
            }

            function renderQuestionList() {
                const bank = loadQuestionBank();
                questionList.innerHTML = '';
                bank.forEach(q => {
                    const div = document.createElement('div');
                    div.className = 'question-item';
                    const opts = q.options.map((o, i) => {
                        const label = String.fromCharCode(65 + i);
                        const isAns = i === q.answer;
                        return `<span class="opt-text">${label}. ${o}${isAns ? ' ✓' : ''}</span>`;
                    }).join(' ');
                    div.innerHTML =
                        `<div class="q-info"><div class="q-text">#${q.id} ${q.question}</div><div class="q-options">${opts}</div><div class="q-answer">✅ 正确答案: ${String.fromCharCode(65 + q.answer)}</div></div><div class="q-actions"><button class="btn-edit" data-id="${q.id}">编辑</button><button class="btn-delete" data-id="${q.id}">删除</button></div>`;
                    questionList.appendChild(div);
                });
                questionCountInfo.textContent = '共 ' + bank.length + ' 题';
                questionList.querySelectorAll('.btn-edit').forEach(btn => {
                    btn.addEventListener('click', function() { openEditQuestion(parseInt(this.dataset.id)); });
                });
                questionList.querySelectorAll('.btn-delete').forEach(btn => {
                    btn.addEventListener('click', function() {
                        if (confirm('确定删除此题？')) deleteQuestion(parseInt(this.dataset.id));
                    });
                });
                // 更新签到UI（题库变化可能影响签到状态）
                if (currentUser && currentUser !== 'admin') updateSigninUI();
            }

            // ===== 时钟 =====
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

            // ===== 登录 / 登出 =====
            function handleLogin(e) {
                e.preventDefault();
                const username = loginUsername.value.trim(),
                    password = loginPassword.value.trim();
                loginError.classList.remove('show');
                if (!username || !password) { errorMessage.textContent = '请输入账号和密码';
                    loginError.classList.add('show'); return; }
                const user = getUser(username);
                if (user && user.password === password) { loginSuccess(username); } else {
                    errorMessage.textContent = '账号或密码错误，请重新输入';
                    loginError.classList.add('show');
                    loginPassword.value = '';
                    loginPassword.focus();
                }
            }

            function loginSuccess(username) {
                currentUser = username;
                sessionStorage.setItem('metro_session_user', username);
                loginPage.style.display = 'none';
                homePage.style.display = 'flex';
                const user = getUser(username);
                displayUsername.textContent = username;
                greetingUser.textContent = username;
                if (user) displayBalance.textContent = formatBalance(user.balance);
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

            // ===== 注册 =====
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

            function handleRegister() {
                const username = regUsername.value.trim(),
                    password = regPassword.value.trim(),
                    confirm = regConfirm.value.trim(),
                    verify = regVerify.value.trim();
                regError.classList.remove('show');
                regSuccess.classList.remove('show');
                if (!username || username.length < 2) { regErrorMessage.textContent = '账号至少需要2个字符';
                    regError.classList.add('show'); return; }
                if (userExists(username)) { regErrorMessage.textContent = '该账号已存在，请换一个';
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
                if (createUser(username, password)) {
                    regSuccessMessage.textContent = '🎉 注册成功！即将自动登录...';
                    regSuccess.classList.add('show');
                    setTimeout(() => { closeRegisterModal();
                        loginSuccess(username); }, 1200);
                } else {
                    regErrorMessage.textContent = '注册失败，请稍后重试';
                    regError.classList.add('show');
                }
            }

            // ===== 忘记密码 =====
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

            function handleForgot() {
                const username = forgotUsername.value.trim(),
                    verify = forgotVerify.value.trim(),
                    newPwd = forgotNewPassword.value.trim();
                forgotError.classList.remove('show');
                forgotSuccess.classList.remove('show');
                if (!username) { forgotErrorMessage.textContent = '请输入账号';
                    forgotError.classList.add('show'); return; }
                if (!userExists(username)) { forgotErrorMessage.textContent = '该账号不存在';
                    forgotError.classList.add('show'); return; }
                if (username === 'admin') { forgotErrorMessage.textContent = '管理员账号请通过其他方式重置';
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
                if (updateUser(username, { password: newPwd })) {
                    forgotSuccessMessage.textContent = '✅ 密码已重置，请使用新密码登录';
                    forgotSuccess.classList.add('show');
                    setTimeout(() => { closeForgotModal();
                        showToast('密码已重置，请重新登录', '🔑'); }, 1500);
                } else {
                    forgotErrorMessage.textContent = '重置失败，请稍后重试';
                    forgotError.classList.add('show');
                }
            }

            // ===== 签到 + 答题 =====
            function updateSigninUI() {
                if (!currentUser || currentUser === 'admin') { signinEntry.style.display = 'none'; return; }
                signinEntry.style.display = 'block';
                const bank = loadQuestionBank();
                if (!bank.length) {
                    signinDesc.textContent = '📚 题库更新中，今日无法签到';
                    signinEntry.classList.add('disabled');
                    return;
                }
                const status = getUserQuizStatus(currentUser);
                if (status.signed) {
                    signinDesc.textContent = '✅ 今日已签到';
                    signinEntry.classList.add('disabled');
                } else if (status.attempts <= 0) {
                    signinDesc.textContent = '❌ 今日机会已用完';
                    signinEntry.classList.add('disabled');
                } else {
                    signinDesc.textContent = `🧠 剩余 ${status.attempts} 次机会`;
                    signinEntry.classList.remove('disabled');
                }
            }

            function openQuizModal() {
                if (!currentUser || currentUser === 'admin') { showToast('普通用户专享', 'ℹ️'); return; }
                const bank = loadQuestionBank();
                if (!bank.length) { showToast('题库为空，请管理员上传题库', '⚠️'); return; }
                const status = getUserQuizStatus(currentUser);
                if (status.signed) { showToast('今日已签到，明天再来吧！', '✅'); return; }
                if (status.attempts <= 0) { showToast('今日机会已用完，明天再来！', '❌'); return; }

                const dq = getDailyQuestionForToday();
                if (!dq) { showToast('题库为空或无法抽题', '⚠️'); return; }
                if (status.questionId !== dq.questionId) {
                    updateUserQuizStatus(currentUser, { questionId: dq.questionId });
                }
                quizActive = true;
                quizModal.classList.add('active');
                renderQuiz(dq);
            }

            function renderQuiz(dq) {
                const q = dq.question;
                quizQuestion.textContent = q.question;
                quizDate.textContent = getTodayStr();
                const status = getUserQuizStatus(currentUser);
                quizAttempts.textContent = status.attempts;
                quizStatusMsg.textContent = '请选择答案';
                quizResult.className = 'quiz-result-box';
                quizResult.style.display = 'none';
                quizResult.textContent = '';
                quizOptions.innerHTML = '';
                const labels = 'ABCDEFGHIJ'.split('');
                q.options.forEach((opt, idx) => {
                    const btn = document.createElement('button');
                    btn.className = 'opt-btn';
                    btn.innerHTML = `<span class="opt-label">${labels[idx]}.</span> ${opt}`;
                    btn.dataset.idx = idx;
                    btn.addEventListener('click', function() { handleQuizAnswer(idx); });
                    quizOptions.appendChild(btn);
                });
            }

            function handleQuizAnswer(idx) {
                if (!quizActive) return;
                const status = getUserQuizStatus(currentUser);
                if (status.signed || status.attempts <= 0) return;
                const dq = getDailyQuestionForToday();
                if (!dq) { showToast('题目加载失败', '⚠️'); return; }
                const q = dq.question;
                const correct = idx === q.answer;
                document.querySelectorAll('.opt-btn').forEach(b => b.classList.add('disabled'));
                const btns = document.querySelectorAll('.opt-btn');
                btns.forEach((b, i) => {
                    if (i === q.answer) b.classList.add('correct');
                    if (i === idx && !correct) b.classList.add('wrong');
                });
                const newAttempts = status.attempts - 1;
                if (correct) {
                    const user = getUser(currentUser);
                    const newBalance = (user.balance || 0) + SIGNIN_AMOUNT;
                    updateUser(currentUser, { balance: newBalance });
                    updateUserQuizStatus(currentUser, { signed: true, attempts: newAttempts });
                    addSigninHistory(currentUser, getTodayStr());
                    displayBalance.textContent = formatBalance(newBalance);
                    quizStatusMsg.textContent = '🎉 回答正确！签到成功！';
                    quizResult.className = 'quiz-result-box success';
                    quizResult.style.display = 'block';
                    quizResult.textContent = '✅ 恭喜获得 ¥' + SIGNIN_AMOUNT + '！';
                    quizActive = false;
                    showToast('签到成功！获得 ¥' + SIGNIN_AMOUNT, '💰');
                    updateSigninUI();
                    const u2 = getUser(currentUser);
                    if (u2) displayBalance.textContent = formatBalance(u2.balance);
                    return;
                } else {
                    updateUserQuizStatus(currentUser, { attempts: newAttempts });
                    const remaining = newAttempts;
                    quizAttempts.textContent = remaining;
                    if (remaining <= 0) {
                        quizStatusMsg.textContent = '❌ 机会已用完，签到失败';
                        quizResult.className = 'quiz-result-box fail';
                        quizResult.style.display = 'block';
                        quizResult.textContent = '💔 两次机会均未答对，明天再来吧！';
                        quizActive = false;
                        updateSigninUI();
                    } else {
                        quizStatusMsg.textContent = '❌ 回答错误，剩余 ' + remaining + ' 次机会';
                        quizResult.className = 'quiz-result-box info';
                        quizResult.style.display = 'block';
                        quizResult.textContent = '再想想，还有 ' + remaining + ' 次机会！';
                        setTimeout(() => {
                            document.querySelectorAll('.opt-btn').forEach(b => {
                                b.classList.remove('disabled', 'correct', 'wrong');
                            });
                            quizResult.style.display = 'none';
                            quizStatusMsg.textContent = '请重新选择';
                            quizActive = true;
                        }, 1500);
                    }
                    updateSigninUI();
                }
            }

            function closeQuizModal() { quizModal.classList.remove('active');
                quizActive = false; if (currentUser) updateSigninUI(); }

            // ===== 管理面板 - 用户操作 =====
            function handleUserAction(action, username) {
                if (action === 'changePwd') {
                    const p = prompt('请输入新密码（至少6个字符）：');
                    if (p === null) return;
                    if (p.length < 6) { showToast('密码至少6个字符', '⚠️'); return; }
                    if (updateUser(username, { password: p })) { showToast('密码已修改', '✅');
                        renderUserTable(); } else showToast('修改失败', '❌');
                } else if (action === 'changeBalance') {
                    const input = prompt('请输入新的余额（数字）：');
                    if (input === null) return;
                    const val = parseFloat(input);
                    if (isNaN(val) || val < 0) { showToast('请输入有效数字', '⚠️'); return; }
                    if (updateUser(username, { balance: val })) {
                        showToast('余额已更新', '✅');
                        renderUserTable();
                        if (username === currentUser) { const u = getUser(username);
                            displayBalance.textContent = formatBalance(u.balance); }
                    } else showToast('修改失败', '❌');
                } else if (action === 'delete') {
                    if (username === 'admin') { showToast('不能注销管理员', '⚠️'); return; }
                    if (confirm('确定注销用户 ' + username + ' 吗？')) {
                        if (deleteUser(username)) {
                            showToast('已注销', '🗑️');
                            renderUserTable();
                            if (username === currentUser) handleLogout();
                        } else showToast('注销失败', '❌');
                    }
                }
            }

            // ===== 管理面板 - 站车风采 =====
            function openEditScenery(id) {
                const items = loadScenery();
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
            }

            function closeEditScenery() { editSceneryModal.classList.remove('active');
                editSceneryError.classList.remove('show'); }

            function saveSceneryItem() {
                const id = editSceneryId.value.trim(),
                    icon = editSceneryIcon.value.trim(),
                    name = editSceneryName.value.trim(),
                    desc = editSceneryDesc.value.trim();
                editSceneryError.classList.remove('show');
                if (!name) { editSceneryErrorMessage.textContent = '名称不能为空';
                    editSceneryError.classList.add('show'); return; }
                let items = loadScenery();
                if (id) {
                    const idx = items.findIndex(i => i.id === parseInt(id));
                    if (idx !== -1) { items[idx] = { ...items[idx], icon, name, desc };
                        saveScenery(items);
                        showToast('已更新', '✅'); } else { showToast('未找到', '❌'); return; }
                } else {
                    items.push({ id: getNextSceneryId(items), icon, name, desc });
                    saveScenery(items);
                    showToast('已添加', '✅');
                }
                closeEditScenery();
                renderSceneryAdmin();
            }

            function deleteSceneryItem(id) {
                let items = loadScenery();
                items = items.filter(i => i.id !== id);
                saveScenery(items);
                renderSceneryAdmin();
                showToast('已删除', '🗑️');
            }

            // ===== 管理面板 - 题库管理 =====
            function openEditQuestion(id) {
                const bank = loadQuestionBank();
                let item = bank.find(i => i.id === id);
                if (item) {
                    editQuestionTitle.textContent = '✏️ 编辑题目';
                    editQuestionId.value = item.id;
                    editQuestionText.value = item.question || '';
                    editQuestionOptions.value = item.options.join('\n');
                    editQuestionAnswer.value = String.fromCharCode(65 + item.answer);
                } else {
                    editQuestionTitle.textContent = '➕ 新增题目';
                    editQuestionId.value = '';
                    editQuestionText.value = '';
                    editQuestionOptions.value = '';
                    editQuestionAnswer.value = '';
                }
                editQuestionError.classList.remove('show');
                editQuestionModal.classList.add('active');
            }

            function closeEditQuestion() { editQuestionModal.classList.remove('active');
                editQuestionError.classList.remove('show'); }

            function saveQuestionItem() {
                const id = editQuestionId.value.trim(),
                    text = editQuestionText.value.trim(),
                    optsRaw = editQuestionOptions.value.trim(),
                    ansRaw = editQuestionAnswer.value.trim().toUpperCase();
                editQuestionError.classList.remove('show');
                if (!text) { editQuestionErrorMessage.textContent = '题目内容不能为空';
                    editQuestionError.classList.add('show'); return; }
                const opts = optsRaw.split('\n').filter(s => s.trim()).map(s => s.trim());
                if (opts.length < 6 || opts.length > 10) { editQuestionErrorMessage.textContent = '选项数量应为6-10个';
                    editQuestionError.classList.add('show'); return; }
                if (!ansRaw) { editQuestionErrorMessage.textContent = '请输入正确答案';
                    editQuestionError.classList.add('show'); return; }
                const ansIdx = ansRaw.charCodeAt(0) - 65;
                if (ansIdx < 0 || ansIdx >= opts.length) { editQuestionErrorMessage.textContent = '正确答案字母超出选项范围';
                    editQuestionError.classList.add('show'); return; }
                let bank = loadQuestionBank();
                if (id) {
                    const idx = bank.findIndex(i => i.id === parseInt(id));
                    if (idx !== -1) { bank[idx] = { ...bank[idx], question: text, options: opts, answer: ansIdx };
                        saveQuestionBank(bank);
                        showToast('题目已更新', '✅'); } else { showToast('未找到', '❌'); return; }
                } else {
                    bank.push({ id: getNextQId(bank), question: text, options: opts, answer: ansIdx });
                    saveQuestionBank(bank);
                    showToast('题目已添加', '✅');
                }
                closeEditQuestion();
                renderQuestionList();
                // 刷新每日题目（若当前没有则抽取）
                if (!getDailyQuestion()) pickDailyQuestion();
                updateSigninUI();
            }

            function deleteQuestion(id) {
                let bank = loadQuestionBank();
                bank = bank.filter(i => i.id !== id);
                saveQuestionBank(bank);
                renderQuestionList();
                // 如果删除了当前每日题目，重新抽取
                const dq = getDailyQuestion();
                if (dq && !bank.find(i => i.id === dq.questionId)) {
                    localStorage.removeItem(DAILY_QUESTION_KEY);
                    pickDailyQuestion();
                }
                updateSigninUI();
                showToast('已删除', '🗑️');
            }

            // ===== 上传题库 =====
            function uploadQuestions() {
                const file = uploadQuestionFile.files[0];
                if (!file) { showToast('请选择文件', '⚠️'); return; }
                const reader = new FileReader();
                reader.onload = function(e) {
                    const content = e.target.result;
                    const lines = content.split('\n').filter(line => line.trim() !== '');
                    const newBank = [];
                    let errorCount = 0;
                    lines.forEach((line, idx) => {
                        const parts = line.split('||').map(s => s.trim());
                        if (parts.length < 8) { errorCount++; return; } // 至少题目+6选项+答案
                        const question = parts[0];
                        const options = parts.slice(1, -1);
                        const ansLetter = parts[parts.length - 1].toUpperCase();
                        if (options.length < 6 || options.length > 10) { errorCount++; return; }
                        const ansIdx = ansLetter.charCodeAt(0) - 65;
                        if (ansIdx < 0 || ansIdx >= options.length) { errorCount++; return; }
                        newBank.push({ id: 0, question, options, answer: ansIdx });
                    });
                    if (newBank.length === 0) { showToast('解析失败，请检查格式', '❌'); return; }
                    // 分配ID
                    let maxId = loadQuestionBank().reduce((max, q) => Math.max(max, q.id), 0);
                    newBank.forEach(q => { q.id = ++maxId; });
                    saveQuestionBank(newBank);
                    // 重置每日题目和历史
                    localStorage.removeItem(DAILY_QUESTION_KEY);
                    resetGlobalQuestionHistory();
                    pickDailyQuestion();
                    renderQuestionList();
                    updateSigninUI();
                    showToast('成功上传 ' + newBank.length + ' 道题' + (errorCount ? '，' + errorCount + ' 行格式错误被跳过' : ''),
                        '✅');
                };
                reader.onerror = function() { showToast('读取文件失败', '❌'); };
                reader.readAsText(file, 'UTF-8');
            }

            // ===== 清空题库 =====
            function clearQuestions() {
                if (!confirm('确定清空所有题目吗？此操作不可恢复！')) return;
                saveQuestionBank([]);
                localStorage.removeItem(DAILY_QUESTION_KEY);
                resetGlobalQuestionHistory();
                renderQuestionList();
                updateSigninUI();
                showToast('题库已清空', '🗑️');
            }

            // ===== 一键换题 =====
            function shuffleDailyQuestion() {
                if (currentUser !== 'admin') { showToast('权限不足', '⛔'); return; }
                const bank = loadQuestionBank();
                if (!bank.length) { showToast('题库为空', '⚠️'); return; }
                const history = getGlobalQuestionHistory();
                const usedIds = history.slice(-30);
                const available = bank.filter(q => !usedIds.includes(q.id));
                if (!available.length) {
                    resetGlobalQuestionHistory();
                    showToast('已重置历史，重新洗牌', '🔄');
                    const q = pickDailyQuestion();
                    if (q) { showToast('已换题：' + q.question.slice(0, 30) + '...', '🎲');
                        renderQuestionList(); }
                    return;
                }
                const chosen = available[Math.floor(Math.random() * available.length)];
                setDailyQuestion(chosen.id);
                addGlobalQuestionHistory(chosen.id);
                showToast('已换题：' + chosen.question.slice(0, 30) + '...', '🎲');
                renderQuestionList();
            }

            // ===== 站车风采浏览 =====
            function openSceneryViewer() {
                const modal = document.createElement('div');
                modal.className = 'modal-overlay active';
                modal.style.zIndex = '1000';
                const items = loadScenery();
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
                modal.querySelector('#closeSceneryViewerBtn').addEventListener('click', function() { modal.remove(); });
                modal.addEventListener('click', function(e) { if (e.target === this) modal.remove(); });
            }

            // ===== 管理面板 =====
            function openAdminPanel() {
                if (currentUser !== 'admin') { showToast('权限不足', '⛔'); return; }
                renderUserTable();
                renderSceneryAdmin();
                renderQuestionList();
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
                if (tabName === 'questions') renderQuestionList();
            }

            // ===== 检查登录状态 =====
            function checkSession() {
                const username = sessionStorage.getItem('metro_session_user');
                if (username && userExists(username)) {
                    currentUser = username;
                    loginPage.style.display = 'none';
                    homePage.style.display = 'flex';
                    const user = getUser(username);
                    displayUsername.textContent = username;
                    greetingUser.textContent = username;
                    if (user) displayBalance.textContent = formatBalance(user.balance);
                    adminEntry.style.display = (username === 'admin') ? 'block' : 'none';
                    updateSigninUI();
                    renderLines();
                    startClock();
                    return true;
                }
                return false;
            }

            // ===== 事件绑定 =====
            loginForm.addEventListener('submit', handleLogin);
            loginPassword.addEventListener('keydown', function(e) { if (e.key === 'Enter') loginForm.dispatchEvent(new Event(
                        'submit')); });
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

            shuffleDailyBtn.addEventListener('click', shuffleDailyQuestion);
            refreshQuestionsBtn.addEventListener('click', renderQuestionList);
            addQuestionBtn.addEventListener('click', function() { openEditQuestion(null); });
            clearQuestionsBtn.addEventListener('click', clearQuestions);
            uploadQuestionsBtn.addEventListener('click', uploadQuestions);
            closeEditQuestionBtn.addEventListener('click', closeEditQuestion);
            saveQuestionBtn.addEventListener('click', saveQuestionItem);
            editQuestionModal.addEventListener('click', function(e) { if (e.target === this) closeEditQuestion(); });

            loginUsername.addEventListener('focus', function() { loginError.classList.remove('show'); });
            loginPassword.addEventListener('focus', function() { loginError.classList.remove('show'); });

            // ===== 初始化 =====
            (function init() {
                const users = loadUsers();
                if (!users.admin) { users.admin = { password: PRESET_USER.password, balance: PRESET_USER.balance };
                    saveUsers(users); }
                // 题库初始为空，不做预设
                const sc = loadScenery();
                if (!sc.length) { saveScenery(DEFAULT_SCENERY); }
                // 清理过期签到数据
                const today = getTodayStr();
                const quizData = loadQuizData();
                let changed = false;
                Object.keys(quizData).forEach(key => {
                    if (quizData[key].date !== today) {
                        quizData[key] = { date: today, signed: false, attempts: MAX_ATTEMPTS, questionId: null };
                        changed = true;
                    }
                });
                if (changed) saveQuizData(quizData);

                const hasSession = checkSession();
                if (!hasSession) { loginPage.style.display = 'flex';
                    homePage.style.display = 'none';
                    loginUsername.value = '';
                    loginPassword.value = ''; }

                // 如果题库不为空且没有每日题目，则抽取
                const bank = loadQuestionBank();
                if (bank.length && !getDailyQuestion()) pickDailyQuestion();

                if (currentUser && currentUser !== 'admin') updateSigninUI();
            })();

        })();
    </script>
</body>
</html>
