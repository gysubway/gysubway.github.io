<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>固原地铁 · 售票系统</title>
    <link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap" rel="stylesheet" />
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
            background: #e9edf2; min-height: 100vh; display: flex;
            justify-content: center; align-items: center; transition: background 0.3s;
        }

        /* 登录页 */
        #loginPage {
            width: 100%; min-height: 100vh; display: flex;
            justify-content: center; align-items: center;
            background: linear-gradient(145deg, #0b2a4a 0%, #1a4a6e 100%); padding: 20px;
        }
        .login-card {
            background: #ffffff; border-radius: 24px; padding: 44px 40px 36px;
            width: 100%; max-width: 420px;
            box-shadow: 0 25px 60px rgba(0, 20, 40, 0.45); transition: transform 0.25s ease;
        }
        .login-card:hover { transform: translateY(-2px); }
        .login-logo { text-align: center; margin-bottom: 28px; }
        .login-logo .icon { font-size: 44px; line-height: 1; display: block; margin-bottom: 6px; }
        .login-logo h1 { font-size: 26px; font-weight: 700; color: #0b2a4a; letter-spacing: 2px; }
        .login-logo p { font-size: 14px; color: #7a8a9e; margin-top: 2px; letter-spacing: 1px; }
        .login-form .form-group { margin-bottom: 20px; }
        .login-form label {
            display: block; font-size: 14px; font-weight: 600; color: #2c3e50;
            margin-bottom: 6px; letter-spacing: 0.5px;
        }
        .login-form input[type="text"], .login-form input[type="password"] {
            width: 100%; padding: 14px 18px; font-size: 16px;
            border: 2px solid #dce3ec; border-radius: 12px; background: #f8fafc;
            transition: border-color 0.25s, box-shadow 0.25s; outline: none; color: #1a2a3a;
        }
        .login-form input:focus {
            border-color: #1a6e9e; box-shadow: 0 0 0 4px rgba(26, 110, 158, 0.12); background: #ffffff;
        }
        .login-btn {
            width: 100%; padding: 16px; font-size: 18px; font-weight: 700; color: #ffffff;
            background: linear-gradient(135deg, #1a6e9e, #0b4a72); border: none;
            border-radius: 12px; cursor: pointer; transition: background 0.25s, transform 0.15s, box-shadow 0.25s;
            letter-spacing: 2px; margin-top: 4px;
        }
        .login-btn:hover {
            background: linear-gradient(135deg, #1f7eb2, #0e5580);
            box-shadow: 0 8px 24px rgba(26, 110, 158, 0.30); transform: translateY(-1px);
        }
        .login-btn:active { transform: scale(0.98); }
        .login-error {
            margin-top: 16px; padding: 12px 16px; background: #fef2f0;
            border-left: 4px solid #d94a4a; border-radius: 8px; color: #b33a3a;
            font-size: 14px; display: none; align-items: center; gap: 8px;
        }
        .login-error.show { display: flex; }
        .login-error .err-icon { font-size: 18px; }
        .login-footer { text-align: center; margin-top: 22px; font-size: 14px; color: #9aabba; }
        .login-footer .register-link {
            display: inline-block; margin-top: 6px; color: #1a6e9e; font-weight: 600;
            cursor: pointer; text-decoration: underline; transition: color 0.2s;
        }
        .login-footer .register-link:hover { color: #0b4a72; }
        .login-footer .forgot-link {
            display: inline-block; margin-top: 4px; color: #7a8a9e; font-size: 13px;
            cursor: pointer; transition: color 0.2s; text-decoration: underline;
        }
        .login-footer .forgot-link:hover { color: #1a6e9e; }

        /* 模态框通用 */
        .modal-overlay {
            display: none; position: fixed; inset: 0; background: rgba(0, 0, 0, 0.55);
            backdrop-filter: blur(4px); z-index: 999; justify-content: center; align-items: center;
            padding: 20px; animation: fadeIn 0.25s ease;
        }
        .modal-overlay.active { display: flex; }
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.96); }
            to { opacity: 1; transform: scale(1); }
        }
        .modal-card {
            background: #ffffff; border-radius: 24px; padding: 36px 32px 32px;
            width: 100%; max-width: 580px; box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
            max-height: 90vh; overflow-y: auto;
        }
        .modal-card .modal-title {
            font-size: 24px; font-weight: 700; color: #0b2a4a; text-align: center;
            margin-bottom: 24px; letter-spacing: 1px;
        }
        .modal-card .form-group { margin-bottom: 18px; }
        .modal-card label {
            display: block; font-size: 14px; font-weight: 600; color: #2c3e50; margin-bottom: 5px;
        }
        .modal-card input[type="text"], .modal-card input[type="password"],
        .modal-card input[type="number"], .modal-card textarea {
            width: 100%; padding: 12px 16px; font-size: 15px;
            border: 2px solid #dce3ec; border-radius: 10px; background: #f8fafc;
            transition: border-color 0.25s; outline: none; color: #1a2a3a; font-family: inherit;
        }
        .modal-card input:focus, .modal-card textarea:focus {
            border-color: #1a6e9e; background: #ffffff;
        }
        .modal-card .form-actions {
            display: flex; gap: 12px; margin-top: 20px;
        }
        .modal-card .form-actions button {
            flex: 1; padding: 14px; font-size: 16px; font-weight: 700;
            border: none; border-radius: 10px; cursor: pointer;
            transition: background 0.25s, transform 0.15s;
        }
        .modal-card .btn-primary {
            background: linear-gradient(135deg, #1a6e9e, #0b4a72); color: #ffffff;
        }
        .modal-card .btn-primary:hover { background: linear-gradient(135deg, #1f7eb2, #0e5580); }
        .modal-card .btn-danger { background: #d94a4a; color: #ffffff; }
        .modal-card .btn-danger:hover { background: #c0392b; }
        .modal-card .btn-cancel { background: #eef2f7; color: #4a5a6a; }
        .modal-card .btn-cancel:hover { background: #e0e6ee; }
        .modal-card .modal-error {
            margin-top: 14px; padding: 10px 14px; background: #fef2f0;
            border-left: 4px solid #d94a4a; border-radius: 6px; color: #b33a3a;
            font-size: 14px; display: none; align-items: center; gap: 8px;
        }
        .modal-card .modal-error.show { display: flex; }
        .modal-card .modal-success {
            margin-top: 14px; padding: 10px 14px; background: #ecf9f0;
            border-left: 4px solid #2ecc71; border-radius: 6px; color: #1a7a4a;
            font-size: 14px; display: none; align-items: center; gap: 8px;
        }
        .modal-card .modal-success.show { display: flex; }

        /* 注册模态框 */
        .register-modal .verify-question {
            background: #eef4fa; padding: 12px 16px; border-radius: 10px;
            font-size: 15px; color: #0b2a4a; margin-bottom: 10px;
            border-left: 4px solid #1a6e9e; font-weight: 500;
        }

        /* 首页 */
        #homePage {
            display: none; width: 100%; min-height: 100vh;
            background: #eef2f7; flex-direction: column;
        }
        .navbar {
            background: linear-gradient(135deg, #0b2a4a, #1a4a6e); padding: 0 40px;
            height: 72px; display: flex; align-items: center; justify-content: space-between;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15); position: sticky; top: 0; z-index: 100; flex-shrink: 0;
        }
        .navbar .brand {
            display: flex; align-items: center; gap: 12px; color: #ffffff;
            font-size: 22px; font-weight: 700; letter-spacing: 1px;
        }
        .navbar .brand .brand-icon { font-size: 30px; line-height: 1; }
        .navbar .brand .brand-sub { font-size: 13px; font-weight: 400; opacity: 0.7; margin-left: 4px; }
        .navbar .user-area {
            display: flex; align-items: center; gap: 16px; flex-wrap: wrap; justify-content: flex-end;
        }
        .navbar .user-area .user-info {
            display: flex; align-items: center; gap: 12px; color: #ffffff; font-size: 14px;
        }
        .navbar .user-area .user-info .user-name {
            font-weight: 600; background: rgba(255, 255, 255, 0.12);
            padding: 5px 16px; border-radius: 30px; display: flex; align-items: center; gap: 6px;
        }
        .navbar .user-area .user-info .user-balance {
            background: rgba(255, 215, 0, 0.20); padding: 5px 16px; border-radius: 30px;
            display: flex; align-items: center; gap: 4px; color: #ffd700; font-weight: 600;
        }
        .navbar .logout-btn {
            background: rgba(255, 255, 255, 0.10); border: 1.5px solid rgba(255, 255, 255, 0.25);
            color: #ffffff; padding: 7px 22px; border-radius: 30px; font-size: 14px;
            font-weight: 600; cursor: pointer; transition: background 0.25s, border-color 0.25s;
            letter-spacing: 0.5px; white-space: nowrap;
        }
        .navbar .logout-btn:hover {
            background: rgba(255, 255, 255, 0.20); border-color: rgba(255, 255, 255, 0.45);
        }
        .hero-banner {
            background: linear-gradient(135deg, #b71c1c, #c0392b); padding: 24px 20px;
            text-align: center; border-bottom: 4px solid #922b21;
            box-shadow: 0 4px 20px rgba(192, 57, 43, 0.25); flex-shrink: 0;
        }
        .hero-banner h1 {
            font-family: 'Ma Shan Zheng', '华文行楷', 'STXingkai', 'KaiTi', cursive;
            font-size: 52px; color: #ffffff; letter-spacing: 8px;
            text-shadow: 0 2px 12px rgba(0, 0, 0, 0.20); font-weight: 400; line-height: 1.2;
        }
        .home-main {
            flex: 1; padding: 28px 40px 20px; max-width: 1280px;
            margin: 0 auto; width: 100%;
        }
        .welcome-banner {
            background: linear-gradient(135deg, #ffffff, #f5f9ff); border-radius: 20px;
            padding: 22px 30px; margin-bottom: 28px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.6); display: flex;
            justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;
        }
        .welcome-banner .greeting h2 { font-size: 22px; font-weight: 700; color: #0b2a4a; }
        .welcome-banner .greeting h2 .highlight { color: #1a6e9e; }
        .welcome-banner .greeting p { color: #5a6a7a; font-size: 14px; margin-top: 2px; }
        .welcome-banner .datetime {
            text-align: right; color: #3a5a7a; font-size: 15px; background: #eef4fa;
            padding: 8px 20px; border-radius: 40px; font-weight: 500; white-space: nowrap;
        }
        .welcome-banner .datetime .time {
            font-size: 20px; font-weight: 700; color: #0b2a4a; margin-right: 6px;
        }
        .section-title {
            font-size: 18px; font-weight: 700; color: #1a2a3a; margin-bottom: 14px;
            display: flex; align-items: center; gap: 10px;
        }
        .section-title .title-line { flex: 1; height: 2px; background: linear-gradient(to right, #d0dae6, transparent); }
        .card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-bottom: 28px; }
        .line-card {
            background: #ffffff; border-radius: 18px; padding: 20px 24px 18px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04); border: 1px solid #eef2f7;
            transition: box-shadow 0.2s, transform 0.2s;
        }
        .line-card:hover {
            box-shadow: 0 8px 28px rgba(0, 20, 40, 0.08); transform: translateY(-2px);
        }
        .line-card .line-header { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
        .line-card .line-color { width: 6px; height: 30px; border-radius: 6px; flex-shrink: 0; }
        .line-card .line-name { font-size: 18px; font-weight: 700; color: #0b2a4a; }
        .line-card .line-name .line-code { font-size: 14px; font-weight: 400; color: #7a8a9e; margin-left: 6px; }
        .line-card .line-stations {
            display: flex; flex-wrap: wrap; gap: 4px 14px; padding-left: 18px; margin-top: 4px;
        }
        .line-card .line-stations .station {
            font-size: 14px; color: #2a4a6a; padding: 2px 0; position: relative;
        }
        .line-card .line-stations .station::after {
            content: "·"; color: #b0c4d8; margin-left: 10px;
        }
        .line-card .line-stations .station:last-child::after { content: ""; margin: 0; }
        .line-card .line-stations .station .dir-icon { font-size: 12px; color: #8a9aaa; margin: 0 2px; }

        /* 快捷功能 */
        .quick-actions { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; margin-bottom: 8px; }
        .quick-action {
            background: #ffffff; border-radius: 16px; padding: 24px 12px 20px;
            text-align: center; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
            border: 1px solid #eef2f7; cursor: pointer;
            transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s; user-select: none;
        }
        .quick-action:hover {
            box-shadow: 0 8px 28px rgba(0, 20, 40, 0.10);
            transform: translateY(-3px); border-color: #c8d8e8;
        }
        .quick-action:active { transform: scale(0.97); }
        .quick-action .qa-icon { font-size: 34px; display: block; margin-bottom: 8px; }
        .quick-action .qa-label { font-size: 16px; font-weight: 600; color: #1a2a3a; }
        .quick-action .qa-desc { font-size: 12px; color: #8a9aaa; margin-top: 2px; }
        .quick-action.admin-action { border-color: #f1c40f; background: #fef9e7; }
        .quick-action.admin-action:hover { border-color: #d4ac0d; }
        .quick-action.signin-action { border-color: #2ecc71; background: #eafaf1; }
        .quick-action.signin-action:hover { border-color: #1e8449; }
        .quick-action.signin-action.disabled {
            opacity: 0.6; cursor: not-allowed; filter: grayscale(0.3);
        }
        .quick-action.signin-action.disabled:hover {
            transform: none; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04); border-color: #eef2f7;
        }
        .home-footer {
            text-align: center; padding: 20px 20px 8px; color: #8a9aaa; font-size: 13px;
            border-top: 1px solid #e0e6ee; margin-top: 12px;
        }
        .home-footer strong { color: #1a4a6e; }

        /* ===== 答题签到模态框 ===== */
        .quiz-modal .modal-card { max-width: 720px; }
        .quiz-container { padding: 8px 0; }
        .quiz-stats {
            display: flex; gap: 20px; font-size: 15px; color: #2c3e50;
            font-weight: 600; margin-bottom: 20px; flex-wrap: wrap;
        }
        .quiz-stats span { background: #eef4fa; padding: 6px 16px; border-radius: 20px; }
        .quiz-stats .stat-attempts { color: #d94a4a; }
        .quiz-stats .stat-status { color: #1a6e9e; }
        .quiz-question-box {
            background: #f8fafc; border-radius: 16px; padding: 24px;
            border: 1px solid #e0e6ee; margin-bottom: 16px;
        }
        .quiz-question {
            font-size: 17px; color: #0b2a4a; line-height: 1.7;
            font-weight: 500; margin-bottom: 20px;
        }
        .quiz-options { display: flex; flex-direction: column; gap: 10px; }
        .quiz-option {
            display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px;
            background: #ffffff; border: 2px solid #dce3ec; border-radius: 12px;
            cursor: pointer; transition: all 0.2s; font-size: 15px;
            color: #1a2a3a; line-height: 1.5;
        }
        .quiz-option:hover { border-color: #1a6e9e; background: #f0f7ff; }
        .quiz-option.selected { border-color: #1a6e9e; background: #e6f2ff; }
        .quiz-option.correct { border-color: #2ecc71; background: #eafaf1; }
        .quiz-option.wrong { border-color: #e74c3c; background: #fef2f0; }
        .quiz-option.disabled { opacity: 0.6; cursor: not-allowed; }
        .quiz-option .opt-label { font-weight: 700; color: #1a6e9e; min-width: 28px; }
        .quiz-result {
            padding: 14px 20px; border-radius: 12px; font-weight: 700;
            font-size: 16px; text-align: center; display: none; margin-top: 12px;
        }
        .quiz-result.success { display: block; background: #d5f5e3; color: #1a7a4a; }
        .quiz-result.fail { display: block; background: #fadbd8; color: #922b21; }
        .quiz-result.info { display: block; background: #d4e6f1; color: #1a4a6e; }

        /* ===== 管理面板 ===== */
        .admin-modal .modal-card { max-width: 900px; }
        .admin-modal .tab-bar {
            display: flex; gap: 4px; border-bottom: 2px solid #e0e6ee; margin-bottom: 24px;
        }
        .admin-modal .tab-bar .tab-btn {
            padding: 10px 24px; font-size: 16px; font-weight: 600; border: none;
            background: transparent; cursor: pointer; color: #5a6a7a;
            border-bottom: 3px solid transparent; transition: color 0.2s, border-color 0.2s;
        }
        .admin-modal .tab-bar .tab-btn.active { color: #0b2a4a; border-bottom-color: #1a6e9e; }
        .admin-modal .tab-bar .tab-btn:hover { color: #0b2a4a; }
        .admin-modal .tab-content { display: none; }
        .admin-modal .tab-content.active { display: block; }
        .admin-modal .user-table-wrap { overflow-x: auto; }
        .admin-modal table { width: 100%; border-collapse: collapse; font-size: 14px; }
        .admin-modal table th {
            background: #eef4fa; color: #0b2a4a; font-weight: 700;
            padding: 12px 10px; text-align: left; border-bottom: 2px solid #d0dae6;
        }
        .admin-modal table td {
            padding: 10px 10px; border-bottom: 1px solid #eef2f7; vertical-align: middle;
        }
        .admin-modal table tr:hover td { background: #f8fafc; }
        .admin-modal .table-actions { display: flex; gap: 6px; flex-wrap: wrap; }
        .admin-modal .table-actions button {
            padding: 4px 12px; font-size: 12px; border: none; border-radius: 6px;
            font-weight: 600; cursor: pointer; transition: background 0.2s;
        }
        .admin-modal .btn-edit { background: #d4e6f1; color: #1a4a6e; }
        .admin-modal .btn-edit:hover { background: #b0d0e6; }
        .admin-modal .btn-balance { background: #fdebd0; color: #a04000; }
        .admin-modal .btn-balance:hover { background: #fad7a0; }
        .admin-modal .btn-delete { background: #fadbd8; color: #922b21; }
        .admin-modal .btn-delete:hover { background: #f5b7b1; }
        .admin-modal .add-btn {
            margin-top: 16px; padding: 10px 20px; background: #1a6e9e; color: #fff;
            border: none; border-radius: 8px; font-weight: 600; cursor: pointer;
            transition: background 0.2s;
        }
        .admin-modal .add-btn:hover { background: #0b4a72; }
        .admin-modal .scenery-list {
            display: flex; flex-direction: column; gap: 12px; margin-top: 8px;
        }
        .admin-modal .scenery-item-admin {
            background: #f8fafc; border-radius: 12px; padding: 14px 18px;
            border: 1px solid #eef2f7; display: flex;
            justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;
        }
        .admin-modal .scenery-item-admin .info {
            display: flex; align-items: center; gap: 12px; flex: 1; min-width: 150px;
        }
        .admin-modal .scenery-item-admin .info .icon { font-size: 28px; }
        .admin-modal .scenery-item-admin .info .name { font-weight: 700; color: #0b2a4a; }
        .admin-modal .scenery-item-admin .info .desc { color: #5a6a7a; font-size: 13px; }
        .admin-modal .scenery-item-admin .actions { display: flex; gap: 6px; }
        .admin-modal .scenery-item-admin .actions button {
            padding: 4px 14px; font-size: 12px; border: none; border-radius: 6px;
            font-weight: 600; cursor: pointer; transition: background 0.2s;
        }

        /* 题库管理样式 */
        .question-list { max-height: 420px; overflow-y: auto; }
        .question-item-admin {
            background: #f8fafc; border-radius: 12px; padding: 14px 18px;
            border: 1px solid #eef2f7; margin-bottom: 10px;
        }
        .question-item-admin .q-header {
            display: flex; justify-content: space-between; align-items: flex-start;
            gap: 12px; margin-bottom: 8px;
        }
        .question-item-admin .q-id {
            background: #1a6e9e; color: #fff; font-size: 12px; font-weight: 700;
            padding: 2px 10px; border-radius: 20px; flex-shrink: 0;
        }
        .question-item-admin .q-text {
            font-size: 15px; color: #0b2a4a; font-weight: 500; line-height: 1.5; flex: 1;
        }
        .question-item-admin .q-answer {
            font-size: 13px; color: #2ecc71; font-weight: 600; margin-top: 6px;
        }
        .question-item-admin .q-actions {
            display: flex; gap: 6px; margin-top: 10px;
        }
        .question-item-admin .q-actions button {
            padding: 4px 14px; font-size: 12px; border: none; border-radius: 6px;
            font-weight: 600; cursor: pointer; transition: background 0.2s;
        }
        .question-item-admin.current-q {
            border-color: #2ecc71; background: #eafaf1;
        }

        /* Toast */
        .toast-container {
            position: fixed; top: 100px; left: 50%; transform: translateX(-50%);
            z-index: 9999; pointer-events: none;
        }
        .toast {
            background: #1a2a3a; color: #ffffff; padding: 14px 32px; border-radius: 12px;
            font-size: 15px; font-weight: 500; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.30);
            opacity: 0; transform: translateY(-20px) scale(0.95);
            transition: opacity 0.35s ease, transform 0.35s ease;
            pointer-events: auto; display: flex; align-items: center; gap: 10px; white-space: nowrap;
        }
        .toast.show { opacity: 1; transform: translateY(0) scale(1); }
        .toast .toast-icon { font-size: 20px; }

        /* 响应式 */
        @media (max-width: 992px) {
            .card-grid { grid-template-columns: 1fr; gap: 16px; }
            .quick-actions { grid-template-columns: repeat(3, 1fr); }
            .home-main { padding: 20px 24px 16px; }
            .navbar { padding: 0 24px; height: 64px; }
            .navbar .brand { font-size: 18px; }
            .navbar .brand .brand-sub { display: none; }
            .hero-banner h1 { font-size: 38px; letter-spacing: 4px; }
            .welcome-banner { flex-direction: column; align-items: flex-start; }
            .welcome-banner .datetime { text-align: left; width: 100%; white-space: normal; }
            .admin-modal .modal-card { max-width: 95%; padding: 24px 16px; }
        }
        @media (max-width: 600px) {
            .login-card { padding: 28px 18px 24px; }
            .login-logo h1 { font-size: 22px; }
            .navbar .user-area .user-info { font-size: 12px; gap: 6px; flex-wrap: wrap; justify-content: flex-end; }
            .navbar .user-area .user-info .user-name, .navbar .user-area .user-info .user-balance {
                padding: 3px 12px; font-size: 12px;
            }
            .navbar .logout-btn { font-size: 12px; padding: 5px 14px; }
            .navbar { padding: 0 14px; height: 58px; }
            .navbar .brand { font-size: 16px; gap: 6px; }
            .navbar .brand .brand-icon { font-size: 22px; }
            .hero-banner h1 { font-size: 28px; letter-spacing: 2px; }
            .hero-banner { padding: 16px 12px; }
            .quick-actions { grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
            .quick-action { padding: 16px 6px 14px; }
            .quick-action .qa-icon { font-size: 26px; }
            .quick-action .qa-label { font-size: 14px; }
            .quick-action .qa-desc { font-size: 11px; }
            .line-card { padding: 14px 16px; }
            .line-card .line-stations { gap: 2px 10px; padding-left: 10px; }
            .line-card .line-stations .station { font-size: 13px; }
            .home-main { padding: 14px 14px 12px; }
            .welcome-banner { padding: 14px 16px; }
            .welcome-banner .greeting h2 { font-size: 18px; }
            .modal-card { padding: 24px 18px 20px; }
            .modal-card .form-actions { flex-direction: column; }
            .toast { padding: 12px 20px; font-size: 14px; white-space: normal; }
            .admin-modal table th, .admin-modal table td { padding: 6px 4px; font-size: 12px; }
            .admin-modal .table-actions button { font-size: 10px; padding: 2px 8px; }
            .admin-modal .scenery-item-admin { flex-direction: column; align-items: stretch; }
            .admin-modal .scenery-item-admin .info { flex-wrap: wrap; }
            .quiz-option { padding: 10px 12px; font-size: 14px; }
            .quiz-question { font-size: 15px; }
        }

        .text-muted { color: #8a9aaa; font-size: 13px; }
        .mt-8 { margin-top: 8px; }
        .mb-8 { margin-bottom: 8px; }
        .flex-center { display: flex; align-items: center; gap: 6px; }
        .gap-4 { gap: 4px; }
        .text-center { text-align: center; }
        .w-full { width: 100%; }
    </style>
<base target="_blank">
</head>
<body>


    <!-- 登录页 -->
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
                <div>
                    <span>还没有账号？</span>
                    <span class="register-link" id="openRegisterBtn">立即注册</span>
                </div>
                <div>
                    <span class="forgot-link" id="openForgotBtn">🔑 忘记密码？</span>
                </div>
            </div>
        </div>
    </div>

    <!-- 注册模态框 -->
    <div class="modal-overlay register-modal" id="registerModal">
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
                <div class="verify-question">❓ 固局更高速度实验列车的车号是？</div>
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
                <button class="btn-primary" id="registerBtn">注 册</button>
            </div>
        </div>
    </div>

    <!-- 忘记密码模态框 -->
    <div class="modal-overlay" id="forgotModal">
        <div class="modal-card">
            <div class="modal-title">🔑 重置密码</div>
            <div class="form-group">
                <label for="forgotUsername">账号</label>
                <input type="text" id="forgotUsername" placeholder="请输入您的账号" />
            </div>
            <div class="form-group">
                <label>身份验证</label>
                <div class="verify-question" style="background:#eef4fa;padding:12px 16px;border-radius:10px;font-size:15px;color:#0b2a4a;margin-bottom:10px;border-left:4px solid #1a6e9e;font-weight:500;">❓ 固局更高速度实验列车的车号是？</div>
                <input type="text" id="forgotVerify" placeholder="请输入答案" />
            </div>
            <div class="form-group">
                <label for="forgotNewPassword">新密码</label>
                <input type="password" id="forgotNewPassword" placeholder="请设置新密码（至少6个字符）" />
            </div>
            <div class="modal-error" id="forgotError">
                <span class="err-icon">⚠️</span>
                <span id="forgotErrorMessage">错误信息</span>
            </div>
            <div class="modal-success" id="forgotSuccess">
                <span>✅</span>
                <span id="forgotSuccessMessage">密码已重置！</span>
            </div>
            <div class="form-actions">
                <button class="btn-cancel" id="closeForgotBtn">取消</button>
                <button class="btn-primary" id="forgotBtn">重置密码</button>
            </div>
        </div>
    </div>

    <!-- 答题签到模态框 -->
    <div class="modal-overlay quiz-modal" id="quizModal">
        <div class="modal-card">
            <div class="modal-title">🧠 每日签到 · 逻辑推理</div>
            <div class="quiz-container">
                <div class="quiz-stats">
                    <span>📅 今日题目</span>
                    <span class="stat-attempts">💡 剩余机会: <span id="quizAttempts">2</span></span>
                    <span class="stat-status" id="quizStatus">▶ 待答题</span>
                </div>
                <div class="quiz-question-box">
                    <div class="quiz-question" id="quizQuestion">题目加载中...</div>
                    <div class="quiz-options" id="quizOptions"></div>
                </div>
                <div class="quiz-result" id="quizResult"></div>
                <div class="form-actions" style="margin-top:16px;">
                    <button class="btn-cancel" id="closeQuizBtn">关闭</button>
                    <button class="btn-primary" id="submitAnswerBtn" style="flex:2;">提交答案</button>
                </div>
            </div>
        </div>
    </div>

    <!-- 管理面板模态框 -->
    <div class="modal-overlay admin-modal" id="adminModal">
        <div class="modal-card">
            <div class="modal-title">⚙️ 管理面板</div>
            <div class="tab-bar">
                <button class="tab-btn active" data-tab="users">👥 用户管理</button>
                <button class="tab-btn" data-tab="scenery">📸 站车风采</button>
                <button class="tab-btn" data-tab="questions">🧠 题库管理</button>
            </div>
            <div class="tab-content active" id="tabUsers">
                <div class="user-table-wrap">
                    <table>
                        <thead><tr><th>用户名</th><th>余额</th><th>操作</th></tr></thead>
                        <tbody id="userTableBody"></tbody>
                    </table>
                </div>
                <p class="text-muted mt-8">* 管理员可修改密码、余额，注销账号（不能注销自己）</p>
            </div>
            <div class="tab-content" id="tabScenery">
                <div class="scenery-list" id="sceneryAdminList"></div>
                <button class="add-btn" id="addSceneryBtn">➕ 新增风采</button>
            </div>
            <div class="tab-content" id="tabQuestions">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px;">
                    <div>
                        <button class="add-btn" id="changeDailyQuestionBtn" style="margin-top:0;">🎲 随机更换今日题目</button>
                        <span class="text-muted" style="margin-left:10px;">当前题目ID: <span id="currentDailyQuestionId">--</span></span>
                    </div>
                    <div style="font-size:14px;color:#5a6a7a;">题库共 <strong id="totalQuestionCount">0</strong> 题</div>
                </div>
                <div class="question-list" id="questionAdminList"></div>
                <button class="add-btn" id="addQuestionBtn">➕ 新增题目</button>
            </div>
            <div class="form-actions" style="margin-top:20px;">
                <button class="btn-cancel" id="closeAdminBtn" style="flex:1;">关闭</button>
            </div>
        </div>
    </div>

    <!-- 编辑风采模态框 -->
    <div class="modal-overlay" id="editSceneryModal">
        <div class="modal-card">
            <div class="modal-title" id="editSceneryTitle">编辑风采</div>
            <input type="hidden" id="editSceneryId" value="" />
            <div class="form-group">
                <label>图标 (Emoji)</label>
                <input type="text" id="editSceneryIcon" placeholder="例如 🏛️" />
            </div>
            <div class="form-group">
                <label>名称</label>
                <input type="text" id="editSceneryName" placeholder="站点或车型名称" />
            </div>
            <div class="form-group">
                <label>描述</label>
                <input type="text" id="editSceneryDesc" placeholder="简要描述" />
            </div>
            <div class="modal-error" id="editSceneryError">
                <span class="err-icon">⚠️</span>
                <span id="editSceneryErrorMessage">错误信息</span>
            </div>
            <div class="form-actions">
                <button class="btn-cancel" id="closeEditSceneryBtn">取消</button>
                <button class="btn-primary" id="saveSceneryBtn">保存</button>
            </div>
        </div>
    </div>

    <!-- 编辑题目模态框 -->
    <div class="modal-overlay" id="editQuestionModal">
        <div class="modal-card" style="max-width: 700px;">
            <div class="modal-title" id="editQuestionTitle">编辑题目</div>
            <input type="hidden" id="editQuestionId" value="" />
            <div class="form-group">
                <label>题目内容</label>
                <textarea id="editQuestionText" rows="3" placeholder="请输入题目内容"></textarea>
            </div>
            <div class="form-group">
                <label>选项（每行一个，以 A. B. C. 等开头，至少6个选项）</label>
                <textarea id="editQuestionOptions" rows="8" placeholder="A. 选项一&#10;B. 选项二&#10;C. 选项三&#10;D. 选项四&#10;E. 选项五&#10;F. 选项六"></textarea>
            </div>
            <div class="form-group">
                <label>正确答案选项字母</label>
                <input type="text" id="editQuestionAnswer" placeholder="例如：A" style="width:120px;text-transform:uppercase;" />
            </div>
            <div class="modal-error" id="editQuestionError">
                <span class="err-icon">⚠️</span>
                <span id="editQuestionErrorMessage">错误信息</span>
            </div>
            <div class="form-actions">
                <button class="btn-cancel" id="closeEditQuestionBtn">取消</button>
                <button class="btn-primary" id="saveQuestionBtn">保存</button>
            </div>
        </div>
    </div>

    <!-- 首页 -->
    <div id="homePage">
        <nav class="navbar">
            <div class="brand">
                <span class="brand-icon">🚇</span>
                <span>固原地铁</span>
                <span class="brand-sub">· 售票系统</span>
            </div>
            <div class="user-area">
                <div class="user-info">
                    <span class="user-name">👤 <span id="displayUsername">用户</span></span>
                    <span class="user-balance">💰 <span id="displayBalance">0.00</span></span>
                </div>
                <button class="logout-btn" id="logoutBtn">退出登录</button>
            </div>
        </nav>
        <div class="hero-banner">
            <h1>🚇 固原地铁欢迎您！</h1>
        </div>
        <main class="home-main">
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
            <div class="section-title">
                📍 线路概览
                <span class="title-line"></span>
            </div>
            <div class="card-grid" id="lineGrid"></div>
            <div class="section-title" style="margin-top:6px;">
                🎫 快捷功能
                <span class="title-line"></span>
            </div>
            <div class="quick-actions" id="quickActions">
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
                <div class="quick-action signin-action" data-action="signin" id="signinEntry">
                    <span class="qa-icon">✅</span>
                    <div class="qa-label">每日签到</div>
                    <div class="qa-desc" id="signinDesc">签到得 ¥20</div>
                </div>
                <div class="quick-action admin-action" data-action="admin" id="adminEntry" style="display:none;">
                    <span class="qa-icon">⚙️</span>
                    <div class="qa-label">管理面板</div>
                    <div class="qa-desc">管理员专用</div>
                </div>
            </div>
            <div class="home-footer">
                &copy; 2026 <strong>固原地铁</strong> · 虚拟线网数据 · 仅供演示
            </div>
        </main>
    </div>

    <!-- Toast容器 -->
    <div class="toast-container" id="toastContainer"></div>


    <script>
    (function() {
        'use strict';

        // ============================================================
        //  数据常量
        // ============================================================

        const LINE_DATA = [
            { id: 1, name: '1号线', code: 'M1', color: '#e74c3c', stations: ['火车站','市政府','人民广场','大学城','科技园','体育中心'] },
            { id: 2, name: '2号线', code: 'M2', color: '#3498db', stations: ['机场','会展中心','市中心','体育馆','高铁站','生态园'] },
            { id: 3, name: '3号线', code: 'M3', color: '#2ecc71', stations: ['汽车站','商业街','文化宫','图书馆','政务中心','智慧谷'] },
            { id: 4, name: '4号线', code: 'M4', color: '#f39c12', stations: ['古雁岭','新区医院','实验中学','万达广场','行政中心','固原南站'] }
        ];

        const PRESET_USER = { username: 'admin', password: 'gysubway2026', balance: 1000000 };
        const VERIFY_QUESTION = '固局更高速度实验列车的车号是？';
        const VERIFY_ANSWER = 'CRH380CM-0304';
        const SIGNIN_AMOUNT = 20;
        const MAX_ATTEMPTS = 2;
        const HISTORY_DAYS = 30;

        const DEFAULT_SCENERY = [
            { id: 1, icon: '🏛️', name: '固原站', desc: '固原地铁1号线起点站，集交通、商业、文化于一体的综合枢纽，日均客流量超10万人次。' },
            { id: 2, icon: '🏙️', name: '人民广场站', desc: '位于城市核心区，2号线与3号线换乘站，毗邻市政府与商业中心，是城市最繁忙的站点之一。' },
            { id: 3, icon: '🌳', name: '古雁岭站', desc: '4号线站点，毗邻古雁岭生态公园，车站设计融入自然元素，被誉为"最美地铁站"。' },
            { id: 4, icon: '🚄', name: 'CRH380 系列', desc: '高速动车组，最高运营时速380km/h，中国高铁的标杆车型，安全、舒适、快捷。' },
            { id: 5, icon: '🚇', name: '固原地铁 A 型车', desc: '6节编组，最高时速80km/h，采用永磁同步电机与节能空调，绿色环保，噪音更低。' },
            { id: 6, icon: '🛤️', name: '智慧运维系统', desc: '基于大数据与AI的列车智能运维平台，实时监测车辆状态，保障运营安全可靠。' }
        ];

        // ===== 预设100道逻辑推理题 =====
        const DEFAULT_QUESTION_BANK = [            { id: 1, question: "如果某地铁线路延伸，则该线路客流量会增加。已知3号线客流量未增加。由此可以推出？", options: ["3号线一定没有延伸", "3号线一定延伸了", "客流量增加是线路延伸的充分条件", "只有线路延伸才能增加客流量", "线路延伸必然导致客流量增加", "如果3号线没有延伸，则客流量不会增加"], answer: 0 },
            { id: 2, question: "只有提高运营效率，地铁公司才能实现盈利。某地铁公司未能实现盈利。由此可以推出？", options: ["该公司一定没有提高运营效率", "该公司可能提高了运营效率但受其他因素影响", "不提高运营效率也能盈利", "提高运营效率必然实现盈利", "盈利是提高效率的必要条件", "该公司效率一定低于行业平均水平"], answer: 0 },
            { id: 3, question: "某车站规定：只有持有效车票的乘客才能进入站台。小张进入了站台。由此可以推出？", options: ["小张一定持有效车票", "小张可能持员工卡而非车票", "持有效车票就一定能进入站台", "没有车票就一定不能进入站台", "小张一定是工作人员", "站台入口管理可能不严格"], answer: 0 },
            { id: 4, question: "如果列车准点到达，则调度系统正常运作；如果调度系统正常运作，则信号设备无故障。已知信号设备发生了故障。由此可以推出？", options: ["调度系统一定正常运作", "列车一定准点到达", "列车可能晚点", "列车一定晚点", "调度系统可能正常运作", "信号故障不影响调度系统"], answer: 3 },
            { id: 5, question: "所有地铁司机都必须通过体检。有些人通过体检的人视力很好。由此可以推出？", options: ["有些地铁司机视力很好", "所有视力很好的人都是地铁司机", "地铁司机视力一定很好", "有些视力很好的人通过了体检", "没有通过体检的人不能当司机", "视力不好的人一定不是司机"], answer: 3 },
            { id: 6, question: "除非下雨，否则地铁口不会摆放防滑垫。今天地铁口摆放了防滑垫。由此可以推出？", options: ["今天一定下雨了", "今天可能下雨了", "摆放防滑垫是因为下雨", "没有下雨就不会摆放防滑垫", "下雨一定会摆放防滑垫", "今天一定没有下雨"], answer: 0 },
            { id: 7, question: "如果早高峰时段列车拥挤，则调度中心会增加发车频次；如果增加发车频次，则运营成本会上升。若要避免运营成本上升，必须？", options: ["减少发车频次", "避免早高峰时段列车拥挤", "提高地铁票价", "降低人力成本", "优化地铁线路规划", "限制高峰时段客流量"], answer: 1 },
            { id: 8, question: "某地铁线路要么是地下线路，要么是高架线路，不会同时既是地下又是高架。已知该线路不是地下线路。由此可以推出？", options: ["该线路一定是高架线路", "该线路可能既不是地下也不是高架", "该线路可能是地下线路", "该线路一定不是高架线路", "该线路可能同时是两者之一", "无法确定该线路类型"], answer: 0 },
            { id: 9, question: "如果乘客携带危险品，则安检门一定会报警。安检门没有报警。由此可以推出？", options: ["乘客一定没有携带危险品", "乘客可能携带了非危险品", "安检门可能发生故障", "没有携带危险品就不会报警", "乘客携带了危险品但安检门未检出", "安检系统一定运行正常"], answer: 0 },
            { id: 10, question: "所有换乘站都有两条或以上的线路经过。某车站只有一条线路经过。由此可以推出？", options: ["该车站一定不是换乘站", "该车站可能是换乘站", "该车站一定是起点站", "该车站一定是终点站", "该车站客流量一定很小", "无法确定该车站类型"], answer: 0 },
            { id: 11, question: "如果A线路通车，则B区域房价上升；如果C线路通车，则D区域房价上升。已知B区域房价未上升且D区域房价上升了。由此可以推出？", options: ["A线路一定通车了", "A线路一定没有通车", "C线路一定没有通车", "C线路一定通车了", "A和C线路都通车了", "无法确定任何线路的通车情况"], answer: 1 },
            { id: 12, question: "只有专业人才，才能解决该类技术故障。解决该故障的人不是专业人才。由此可以推出？", options: ["该故障可能已被解决", "该故障一定未被解决", "不是专业人才也能解决该故障", "该故障不需要专业人才", "专业人才一定能解决该故障", "解决故障的人可能是专业人才"], answer: 1 },
            { id: 13, question: "如果列车超速行驶，则自动制动系统会启动；如果自动制动系统启动，则列车会减速。列车最终没有减速。由此可以推出？", options: ["列车一定超速行驶了", "列车一定没有超速行驶", "自动制动系统一定启动了", "自动制动系统可能启动了但未生效", "列车可能超速行驶了", "减速系统可能发生故障"], answer: 1 },
            { id: 14, question: "某地铁公司承诺：如果列车晚点超过10分钟，则乘客可申请全额退票。某乘客申请了全额退票。由此可以推出？", options: ["列车一定晚点超过10分钟", "列车可能晚点超过10分钟", "乘客一定符合退票条件", "乘客可能因其他原因申请退票", "晚点不超过10分钟也能退票", "公司一定履行了承诺"], answer: 3 },
            { id: 15, question: "所有A型车都在1号线运行。所有在1号线运行的列车都使用直流电驱动。由此可以推出？", options: ["所有使用直流电的车都是A型车", "所有A型车都使用直流电驱动", "不使用直流电的车不在1号线运行", "1号线只有A型车运行", "A型车可能使用交流电驱动", "直流电只供A型车使用"], answer: 1 },
            { id: 16, question: "如果发生信号故障，则列车必须限速运行。列车正在限速运行。由此可以推出？", options: ["一定发生了信号故障", "可能发生了信号故障", "没有发生信号故障", "限速运行一定由信号故障引起", "信号系统一定正常", "如果列车没有限速运行，则一定没有发生信号故障"], answer: 5 },
            { id: 17, question: "某车站规定：只有刷卡或投币，乘客才能通过闸机。小王通过了闸机。由此可以推出？", options: ["小王一定刷卡了", "小王一定投币了", "小王可能刷卡了也可能投币了", "小王没有刷卡也没有投币", "闸机可能出现故障", "小王使用了人脸识别进站"], answer: 2 },
            { id: 18, question: "如果地铁票价上涨，则部分乘客会转乘公交。部分乘客转乘了公交。由此可以推出？", options: ["票价一定上涨了", "票价可能上涨了", "票价没有上涨", "转乘公交一定是因为票价上涨", "公交比地铁更便利", "无法确定票价是否上涨"], answer: 5 },
            { id: 19, question: "所有工程师都懂信号系统。有些人懂信号系统但不是工程师。由此可以推出？", options: ["有些工程师不懂信号系统", "懂信号系统的人都是工程师", "工程师一定比其他人更懂信号系统", "有些懂信号系统的人不是工程师", "所有懂信号系统的人都是工程师", "工程师和懂信号系统的人是同一群体"], answer: 3 },
            { id: 20, question: "当且仅当天下雨时，地铁口才会摆放防滑垫。今天地铁口没有摆放防滑垫。由此可以推出？", options: ["今天一定下雨了", "今天一定没有下雨", "今天可能下雨了", "防滑垫可能用完了", "今天雨很小", "无法确定是否下雨"], answer: 1 },
            { id: 21, question: "甲、乙、丙、丁四人参加地铁志愿活动，分别担任引导、售票、安检、保洁四项工作，每人一项。已知：(1) 甲不做引导；(2) 乙不做售票；(3) 如果丙做安检，则丁做保洁；(4) 丁不做引导。如果丙做安检，则以下哪项一定为真？", options: ["甲做售票", "乙做引导", "丁做保洁", "甲做保洁", "乙做安检", "丁做售票"], answer: 2 },
            { id: 22, question: "五辆列车A、B、C、D、E依次进站，编号为1至5。已知：(1) A不是第1个进站；(2) B在C之后进站；(3) D和E相邻，且D在E前面；(4) C不是第5个；(5) A在B之后。如果E是第5个进站，则以下哪项一定为真？", options: ["A是第3个", "B是第1个", "C是第2个", "A是第2个", "B是第3个", "C是第3个"], answer: 0 },
            { id: 23, question: "某地铁检修班组有张、王、李、赵、刘五名工人，需在一周内（周一至周五）每天安排一人值班，每人一天。已知：(1) 张不在周一值班；(2) 王在周四之前值班；(3) 李在赵之后值班；(4) 刘在周五值班。则以下哪项可能为真？", options: ["张在周二值班", "王在周五值班", "李在周一值班", "赵在周五值班", "王在周四值班", "张在周三值班且李在周二值班"], answer: 0 },
            { id: 24, question: "甲、乙、丙、丁、戊五人坐在一排五个座位上，座位号1至5从左到右。已知：(1) 甲不在两端；(2) 乙紧挨着丙且在丙的左边；(3) 丁和戊之间恰好隔一个座位。如果戊坐在第5个座位，则以下哪项一定为真？", options: ["甲坐在第2个座位", "乙坐在第1个座位", "丙坐在第3个座位", "丁坐在第4个座位", "甲坐在第3个座位", "乙坐在第4个座位"], answer: 4 },
            { id: 25, question: "某地铁站有A、B、C、D四个出口，分别通向商场、医院、学校和公园。已知：(1) A出口不通向商场；(2) B出口通向医院；(3) C出口不通向学校；(4) D出口不通向公园。如果A出口通向学校，则以下哪项一定为真？", options: ["C出口通向商场", "D出口通向商场", "C出口通向公园", "D出口通向学校", "A出口通向公园", "C出口通向医院"], answer: 2 },
            { id: 26, question: "六名实习生F、G、H、I、J、K被分配到三个车站（每个车站两人）。已知：(1) F和G必须在同一车站；(2) H和I不能在同一车站；(3) J被分配到1号车站。如果K被分配到2号车站，则以下哪项一定为真？", options: ["H被分配到1号车站", "I被分配到3号车站", "F和G被分配到3号车站", "H被分配到2号车站", "I被分配到2号车站", "F被分配到1号车站"], answer: 2 },
            { id: 27, question: "某列车有6节车厢，编号1至6。已知：(1) 头等舱在3号车厢；(2) 餐车在头等舱之后且与头等舱相邻；(3) 行李车在1号车厢；(4) 商务车厢在餐车之后。则以下哪项一定为真？", options: ["餐车在2号车厢", "商务车厢在4号车厢", "餐车在4号车厢", "商务车厢在5号或6号车厢", "行李车与头等舱相邻", "餐车在5号车厢"], answer: 3 },
            { id: 28, question: "甲、乙、丙、丁、己五人参加地铁知识竞赛，排名1至5且无并列。已知：(1) 甲不是第一名也不是第五名；(2) 乙的排名在丙之后且与丙相邻；(3) 丁的排名比己高；(4) 丙不是第五名。如果丁是第二名，则以下哪项可能为真？", options: ["甲是第一名", "乙是第三名", "己是第五名", "丙是第一名", "甲是第四名", "己是第三名且丙是第四名"], answer: 4 },
            { id: 29, question: "某地铁线路的五个站点P、Q、R、S、T依次排列在一条直线上（不一定按字母顺序）。已知：(1) P在Q的左边；(2) R和S相邻；(3) T在R的右边但在S的左边；(4) Q不在最右边。则从左到右的排列顺序是？", options: ["P-Q-R-T-S", "P-R-T-S-Q", "Q-P-R-T-S", "P-Q-T-R-S", "R-T-S-P-Q", "P-R-S-T-Q"], answer: 1 },
            { id: 30, question: "四位调度员甲、乙、丙、丁轮流值班，每人一班，顺序不固定。已知：(1) 甲不值第一班；(2) 如果乙值第二班，则丙值第四班；(3) 丁在甲之后值班；(4) 丙不值第一班。如果乙值第一班，则以下哪项一定为真？", options: ["甲值第二班", "丙值第二班", "丁值第三班", "甲值第三班", "丙值第三班", "丁值第四班"], answer: 2 },
            { id: 31, question: "某地铁公司的五个部门——人事、财务、运营、技术、客服——要搬迁到一栋楼的五个楼层（1至5层），每层一个部门。已知：(1) 人事部不在1层和5层；(2) 运营部在客服部正上方一层；(3) 技术部在财务部上方；(4) 财务部不在1层。如果人事部在2层，则以下哪项可能为真？", options: ["财务部在3层", "运营部在4层", "技术部在1层", "客服部在5层", "运营部在3层且客服部在2层", "财务部在4层且技术部在5层"], answer: 5 },
            { id: 32, question: "甲、乙、丙、丁、戊、己六人分两组进行地铁安全演练，每组三人。已知：(1) 甲和乙必须在同一组；(2) 丙和丁不能在同一组；(3) 如果戊在第一组，则己也在第一组。如果丙在第一组且戊在第二组，则以下哪项一定为真？", options: ["丁在第一组", "己在第一组", "甲和乙在第一组", "丁在第二组", "己在第二组", "甲在第一组且乙在第二组"], answer: 3 },
            { id: 33, question: "某列车员在五个连续的车站A、B、C、D、E依次检查车票。已知：(1) A站在B站之前检查；(2) C站和D站之间恰好隔一个站；(3) E站不是最后一个检查的；(4) B站不是第一个检查的。则第三个检查的车站是？", options: ["A站", "B站", "C站", "D站", "E站", "无法确定"], answer: 2 },
            { id: 34, question: "四个地铁项目W、X、Y、Z的完工时间各不相同，分别在第1、2、3、4季度。已知：(1) W不在第1季度完工；(2) X在第3季度之前完工；(3) Y在Z之后完工；(4) Z不在第4季度完工。如果W在第4季度完工，则以下哪项一定为真？", options: ["X在第1季度完工", "Y在第2季度完工", "Z在第3季度完工", "X在第2季度完工", "Y在第3季度完工", "Z在第1季度完工"], answer: 0 },
            { id: 35, question: "五位专家甲、乙、丙、丁、戊被邀请参加地铁论坛，发言顺序为第1至第5。已知：(1) 甲不是第一个发言；(2) 乙在丙之后发言；(3) 丁和戊的发言顺序相邻，且丁在戊之前；(4) 丙不是最后一个发言。如果乙是第五个发言，则以下哪项一定为真？", options: ["甲是第二个发言", "丙是第一个发言", "丁是第三个发言且戊是第四个", "甲是第三个发言", "丙是第二个发言", "丁是第一个发言且戊是第二个"], answer: 2 },
            { id: 36, question: "某地铁公司宣称：自从安装了新型节能空调后，车站用电量下降了30%。因此，新型节能空调能显著降低车站能耗。以下哪项如果为真，最能削弱上述论证？", options: ["安装空调的同时，车站关闭了部分照明设备", "新型空调的价格比普通空调高50%", "用电量下降主要发生在空调未运行的时段", "该数据仅来自一个车站，样本量太小", "新型空调维护成本更高", "车站客流量同期也下降了30%"], answer: 2 },
            { id: 37, question: "某城市地铁1号线开通后，沿线房价平均上涨了20%。因此，地铁开通是导致房价上涨的主要原因。以下哪项如果为真，最能削弱上述结论？", options: ["地铁规划公布时房价已经开始上涨", "沿线新建了多所优质学校", "其他城市地铁开通后房价并未上涨", "房价上涨幅度与距地铁站距离无关", "地铁建设期间房价曾出现下跌", "政府同时出台了购房补贴政策"], answer: 1 },
            { id: 38, question: "一项调查显示，经常乘坐地铁的上班族患呼吸道疾病的比例低于经常乘坐公交的上班族。因此，地铁环境比公交环境更有利于呼吸道健康。以下哪项如果为真，最能削弱上述论证？", options: ["地铁车厢内人流量通常小于公交车", "乘坐地铁的上班族整体收入更高，更注重健康", "地铁票价高于公交", "公交车线路覆盖更多区域", "地铁内禁止饮食", "调查样本量不足"], answer: 1 },
            { id: 39, question: "某地铁公司决定：由于A线路客流量持续下降，将减少A线路的发车间隔。以下哪项如果为真，最能质疑该决定的合理性？", options: ["A线路客流量下降是因为周边道路施工结束", "减少发车间隔会进一步降低乘客满意度", "A线路是连接高铁站的重要通道", "其他线路客流量也在下降", "减少发车间隔可降低运营成本", "A线路乘客多为固定通勤人群"], answer: 1 },
            { id: 40, question: "某研究表明：地铁站内安装艺术装饰后，乘客的投诉率下降了15%。因此，艺术装饰能有效提升乘客满意度。以下哪项如果为真，最能削弱该结论？", options: ["艺术装饰的安装费用很高", "投诉率下降主要是因为同时改善了空调系统", "艺术装饰的风格不被所有乘客接受", "投诉率下降幅度在统计上不显著", "艺术装饰增加了清洁工作量", "乘客满意度调查与艺术装饰安装同时进行"], answer: 1 },
            { id: 41, question: "某地铁公司声称：使用新型闸机后，逃票率下降了40%。因此，新型闸机有效防止逃票。以下哪项如果为真，最能削弱上述论证？", options: ["新型闸机经常发生故障", "同期公司加派了巡查人员", "新型闸机通行速度更慢", "逃票者转向了其他出入口", "40%的下降率是基于很小的基数", "新型闸机成本较高"], answer: 1 },
            { id: 42, question: "一项实验证明：在地铁站播放轻音乐后，乘客上下车的速度提高了10%。因此，播放轻音乐能提高地铁运营效率。以下哪项如果为真，最能削弱该结论？", options: ["10%的提高幅度很小", "轻音乐掩盖了安全提示广播", "实验期间同时增加了引导人员", "乘客对轻音乐的评价褒贬不一", "播放轻音乐需要支付版权费", "上下车速度提高可能增加安全隐患"], answer: 2 },
            { id: 43, question: "某城市地铁票价上调后，客流量减少了12%。因此，票价上调是导致客流量减少的原因。以下哪项如果为真，最能削弱上述因果关系？", options: ["票价上调前客流量已经开始下降", "同期该城市开通了多条公交线路", "12%的减少主要来自非高峰时段", "票价上调幅度低于通货膨胀率", "地铁公司服务质量同期下降", "上调票价是为了弥补亏损"], answer: 1 },
            { id: 44, question: "调查显示：拥有地铁直达的写字楼租金比无地铁直达的高出25%。因此，地铁直达是租金高的原因。以下哪项如果为真，最能削弱该论证？", options: ["地铁直达的写字楼通常位于商务区核心", "25%的差距在逐年缩小", "租户更在意办公环境而非交通", "地铁直达的写字楼房龄较新", "租金统计未考虑楼层因素", "地铁噪音可能影响办公"], answer: 0 },
            { id: 45, question: "某地铁线路延长后，日均客流量增加了30%。因此，线路延长显著提升了客流量。以下哪项如果为真，最能削弱上述结论？", options: ["延长段覆盖了大型居住区", "延长期间沿线举办了大型活动", "30%的增长主要来自周末", "其他未延长的线路客流量也在增长", "延长段建设成本超出预算", "延长后列车拥挤度显著上升"], answer: 1 },
            { id: 46, question: "某地铁公司计划在所有车站安装智能导航系统。公司论据是：试点车站安装后，乘客寻路时间平均减少了25%。以下哪项如果为真，最能支持该计划？", options: ["智能导航系统的维护成本很低", "试点车站的乘客满意度因此大幅提升", "其他城市的地铁也安装了类似系统", "寻路时间减少提高了列车准点率", "试点车站具有代表性，能反映一般情况", "智能导航系统技术成熟"], answer: 4 },
            { id: 47, question: "专家认为：地铁车厢内设置静音车厢能提升整体乘车体验。以下哪项如果为真，最能支持该专家观点？", options: ["多数乘客在车厢内使用手机外放", "调查显示超过70%的乘客支持设置静音车厢", "静音车厢在其他国家地铁已有先例", "设置静音车厢不需要额外成本", "噪音是乘客投诉的主要原因之一", "静音车厢可以提高车厢利用率"], answer: 4 },
            { id: 48, question: "某论证：因为地铁A线路的准点率高于B线路，所以A线路的运营管理优于B线路。该论证要成立，必须假设以下哪项？", options: ["A线路的客流量小于B线路", "准点率是衡量运营管理优劣的主要指标", "A线路的车龄比B线路新", "两条线路的里程相同", "乘客更看重准点率而非舒适度", "B线路经过更多商业区"], answer: 1 },
            { id: 49, question: "一项政策建议：应提高高峰时段地铁票价以缓解拥挤。以下哪项如果为真，最能支持该建议？", options: ["高峰时段拥挤导致安全隐患", "提高票价可增加公司收入", "价格敏感型乘客会避开高峰时段", "其他城市的类似政策取得了效果", "高峰时段运营成本更高", "乘客普遍接受浮动票价机制"], answer: 2 },
            { id: 50, question: "某研究结论：地铁通风系统能有效降低车厢内PM2.5浓度。该结论基于以下实验：在通风系统开启和关闭两种状态下测量PM2.5浓度，发现开启时浓度更低。该实验必须假设以下哪项？", options: ["测量仪器精度足够高", "两次测量的时间段客流量相似", "PM2.5对人体有害", "通风系统耗电量在可接受范围", "车厢内PM2.5主要来源于外部", "测量时列车运行速度相同"], answer: 1 },
            { id: 51, question: "论证：某地铁线路采用无人驾驶技术后，事故率下降了50%。因此，无人驾驶技术比有人驾驶更安全。以下哪项如果为真，最能支持该论证？", options: ["无人驾驶列车反应速度更快", "事故率下降主要体现在人为失误导致的类型", "无人驾驶技术成本更低", "该线路同时更新了信号系统", "50%的下降具有统计显著性", "无人驾驶列车速度更慢"], answer: 1 },
            { id: 52, question: "专家建议：地铁公司应建立实时客流预警系统。以下哪项如果为真，最能支持该建议的必要性？", options: ["实时预警系统技术已经成熟", "多起拥挤踩踏事件本可通过预警避免", "建立系统需要大量资金投入", "其他交通方式已有类似系统", "预警系统可以集成到现有APP中", "乘客愿意接收预警信息"], answer: 1 },
            { id: 53, question: "某论证：因为地铁建设带动了周边商业发展，所以地铁建设是城市经济增长的重要引擎。该论证要成立，必须假设以下哪项？", options: ["周边商业发展确实发生了", "商业发展对城市经济增长有贡献", "地铁建设成本低于带来的收益", "没有其他因素同时促进商业发展", "城市经济增长需要交通改善", "地铁沿线人口密度在增加"], answer: 1 },
            { id: 54, question: "某地铁公司声称：延长运营时间至凌晨1点能满足夜间出行需求。以下哪项如果为真，最能支持该声称？", options: ["夜间出租车价格较高", "调查显示午夜后有稳定的客流需求", "延长运营不会显著增加成本", "其他城市的地铁也延长了运营时间", "夜间出行者多为年轻人群", "延长运营时间可提高设备利用率"], answer: 1 },
            { id: 55, question: "论证：某地铁站加装屏蔽门后，站台事故归零。因此，屏蔽门是防止站台事故的有效措施。该论证要成立，必须假设以下哪项？", options: ["加装屏蔽门前站台事故频发", "屏蔽门本身不会引发新类型事故", "乘客适应使用屏蔽门", "事故归零不是偶然现象", "屏蔽门成本在预算内", "其他安全措施未同时实施"], answer: 5 },
            { id: 56, question: "某大学地铁协会对100名学生进行调查：喜欢1号线的有60人，喜欢2号线的有50人，喜欢3号线的有40人。已知至少喜欢一条线路的有90人。则同时喜欢三条线路的最多可能有多少人？", options: ["10人", "20人", "25人", "30人", "35人", "40人"], answer: 3 },
            { id: 57, question: "某地铁线路一周客流量（万人次）：周一10，周二12，周三11，周四13，周五16，周六24，周日25。根据数据，以下哪项推断最合理？", options: ["该线路主要服务于通勤出行", "工作日平均每天客流量约为12万人次", "周末客流量恰好是工作日的两倍", "周五客流量激增是因为票价优惠", "该线路总客流量每周超过120万人次", "周日客流量低于周六是因为部分乘客选择休息"], answer: 1 },
            { id: 58, question: "某地铁站有A、B两个出入口。统计显示：从A口进入的乘客中80%乘坐1号线；从B口进入的乘客中60%乘坐1号线。已知今日从A口进入200人，从B口进入300人。则今日乘坐1号线的乘客中，从B口进入的约占多少？", options: ["36%", "45%", "52%", "56%", "60%", "64%"], answer: 2 },
            { id: 59, question: "某地铁公司四条线路的准点率分别为：1号线98%，2号线97%，3号线99%，4号线96%。已知全年总班次1号线>2号线>3号线>4号线。则以下哪项一定为真？", options: ["3号线的晚点班次最少", "4号线的晚点班次最多", "1号线的晚点班次多于3号线", "2号线的准点班次多于4号线", "1号线的准点班次一定最多", "3号线的准点班次多于2号线"], answer: 3 },
            { id: 60, question: "某列车有6节车厢，每节车厢载客量相同。调查发现：第1节车厢上车人数占总人数的30%，第2节占25%，第3节占20%，其余三节共占25%。如果第1节比第3节多上了50人，则第2节上了多少人？", options: ["100人", "125人", "150人", "200人", "250人", "300人"], answer: 1 },
            { id: 61, question: "某地铁线路早高峰发车间隔为3分钟，平峰期为6分钟。假设每列车载客量相同，则早高峰单位时间运力是平峰期的多少倍？", options: ["1.5倍", "2倍", "2.5倍", "3倍", "3.5倍", "4倍"], answer: 1 },
            { id: 62, question: "某地铁站台长120米，列车以每秒2米的速度通过站台。从车头进入站台到车尾离开站台共需80秒。则该列车长度约为多少米？", options: ["20米", "30米", "40米", "50米", "60米", "80米"], answer: 2 },
            { id: 63, question: "某地铁公司去年运营成本中，人力成本占40%，电力成本占25%，维护成本占20%，其他占15%。今年总成本上升10%，其中人力成本上升5%，电力成本上升20%，维护成本不变。则今年其他成本相比去年？", options: ["上升5%", "上升10%", "下降5%", "下降约3.3%", "不变", "上升15%"], answer: 3 },
            { id: 64, question: "某城市地铁网络有5条线路，任意两条线路之间都有且仅有一个换乘站。则该网络共有多少个换乘站？", options: ["5个", "8个", "10个", "12个", "15个", "20个"], answer: 2 },
            { id: 65, question: "某地铁站自动扶梯从下往上运行，乘客静止站在扶梯上需30秒到达顶部；如果乘客同时步行向上，需18秒到达顶部。若扶梯停止运行，乘客步行向上需要多少秒？", options: ["36秒", "40秒", "45秒", "48秒", "54秒", "60秒"], answer: 2 },
            { id: 66, question: "某地铁线路有10个车站，每两个相邻车站之间运行时间相同。从首站到末站全程需45分钟。若列车在每个车站都停靠2分钟（首末站除外），则相邻两站之间的纯运行时间为多少分钟？", options: ["2分钟", "2.5分钟", "3分钟", "3.5分钟", "4分钟", "4.5分钟"], answer: 1 },
            { id: 67, question: "某地铁车厢内有60个座位，站立区每平方米可站6人。车厢座位区占30平方米，站立区占50平方米。若该车厢满载时共有300人，则站立区每平方米实际站立多少人？", options: ["4人", "4.4人", "4.8人", "5人", "5.2人", "6人"], answer: 2 },
            { id: 68, question: "某地铁公司三个车间的工人数量比为3:4:5。已知第一车间比第三车间少60人。则三个车间共有多少人？", options: ["240人", "300人", "360人", "400人", "480人", "540人"], answer: 2 },
            { id: 69, question: "某地铁线路工作日日均客流量为12万人次，周末日均客流量为20万人次。若该线路全年无休，则全年客流量约为多少万人次？（一年按52周计算）", options: ["5200万", "5500万", "5800万", "6000万", "6200万", "6500万"], answer: 2 },
            { id: 70, question: "某地铁站有4部电梯，每部电梯载客量为20人，运行一周（上或下）需40秒。早高峰时段，从站厅到站台需在5分钟内运送400人。假设电梯连续运行无间隔，则至少需要几部电梯同时工作？", options: ["2部", "3部", "4部", "5部", "6部", "7部"], answer: 1 },
            { id: 71, question: "关于某次列车晚点的原因，四位调度员作出判断：甲：或者是信号故障，或者是天气原因。乙：如果信号没有故障，那么就是天气原因。丙：信号有故障，但天气没有问题。丁：信号有故障，当且仅当天气没有问题。已知四人中只有一人说假话，则以下哪项一定为真？", options: ["信号有故障且天气有问题", "信号有故障且天气没有问题", "信号没有故障且天气有问题", "信号没有故障且天气没有问题", "甲和乙说的都是真话", "丙和丁说的都是假话"], answer: 2 },
            { id: 72, question: "甲、乙、丙、丁四人中只有一人说了真话。甲说：乙在说谎。乙说：丙在说谎。丙说：甲和乙都在说谎。丁说：我没有说谎。则说真话的是？", options: ["甲", "乙", "丙", "丁", "无法确定", "四人都在说谎"], answer: 1 },
            { id: 73, question: "某车站四个工作人员对客流量预测如下：张：明天客流量会超过10万。王：明天客流量不会超过10万。李：如果明天不下雨，客流量会超过10万。赵：明天会下雨且客流量不超过10万。已知只有一人预测错误，则以下哪项一定为真？", options: ["明天客流量超过10万", "明天客流量不超过10万", "明天会下雨", "张和李的预测都为真", "王的预测为真", "赵的预测为真"], answer: 0 },
            { id: 74, question: "甲、乙、丙三人中只有一人是地铁司机。甲说：乙是司机。乙说：我不是司机。丙说：甲是司机。已知三人中只有一人说了真话，则谁是司机？", options: ["甲", "乙", "丙", "无法确定", "甲和丙", "三人中没有司机"], answer: 1 },
            { id: 75, question: "四个安检员对某乘客是否携带危险品判断如下：A：如果携带了液体，则携带了危险品。B：携带了液体但没有携带危险品。C：要么携带了液体，要么携带了危险品。D：没有携带液体，也没有携带危险品。已知只有一人判断正确，则以下哪项一定为真？", options: ["携带了液体且携带了危险品", "携带了液体但没有携带危险品", "没有携带液体但携带了危险品", "没有携带液体也没有携带危险品", "无法确定", "A和C的判断都正确"], answer: 1 },
            { id: 76, question: "甲、乙、丙、丁四人讨论某列车是否准点。甲说：列车准点。乙说：如果列车准点，则信号系统正常。丙说：信号系统不正常。丁说：列车没有准点。已知四人中只有一人说了假话，则以下哪项一定为真？", options: ["列车准点且信号系统正常", "列车准点但信号系统不正常", "列车没有准点且信号系统正常", "列车没有准点且信号系统不正常", "甲和丁都说真话", "乙和丙都说假话"], answer: 0 },
            { id: 77, question: "三位工程师对故障原因判断如下：工程师1：是软件问题而非硬件问题。工程师2：如果不是硬件问题，则是软件问题。工程师3：是硬件问题。已知只有一人判断错误，则故障原因是？", options: ["软件问题", "硬件问题", "软件和硬件都有问题", "既非软件也非硬件问题", "无法确定", "工程师1和3都正确"], answer: 0 },
            { id: 78, question: "甲、乙、丙、丁四人中只有一人通过了考核。甲说：通过考核的人在乙、丙、丁之中。乙说：通过考核的不是我。丙说：通过考核的是甲。丁说：通过考核的是丙。已知只有一人说了真话，则通过考核的是？", options: ["甲", "乙", "丙", "丁", "无法确定", "四人都没有通过"], answer: 1 },
            { id: 79, question: "四个指示牌分别写着：A：B牌说的是真话。B：C牌说的是假话。C：A牌和B牌至少有一个说真话。D：A牌说的是假话。已知只有一块牌子说的是真话，则说真话的是？", options: ["A牌", "B牌", "C牌", "D牌", "无法确定", "没有牌子说真话"], answer: 3 },
            { id: 80, question: "甲、乙、丙三人中只有一人是维修工。甲说：维修工是乙或丙。乙说：维修工是甲或丙。丙说：维修工是甲或乙。已知只有维修工本人说了真话，则维修工是？", options: ["甲", "乙", "丙", "无法确定", "甲和乙", "三人中没有维修工"], answer: 2 },
            { id: 81, question: "地铁车厢：载客 :: 图书馆：？", options: ["阅读", "藏书", "借阅", "建筑", "安静", "学习"], answer: 1 },
            { id: 82, question: "驾驶员：列车 :: 船长：？", options: ["港口", "轮船", "海洋", "货物", "船员", "航线"], answer: 1 },
            { id: 83, question: "闸机：检票 :: 安检门：？", options: ["通行", "检查", "报警", "安全", "扫描", "隔离"], answer: 4 },
            { id: 84, question: "早高峰：拥挤 :: 深夜：？", options: ["安静", "空旷", "危险", "寒冷", "黑暗", "稀少"], answer: 1 },
            { id: 85, question: "地铁线路图：出行规划 :: 菜谱：？", options: ["烹饪", "食材", "餐厅", "营养", "口味", "厨师"], answer: 0 },
            { id: 86, question: "信号系统：列车运行 :: 大脑：？", options: ["思考", "身体", "神经", "心脏", "行为", "意识"], answer: 4 },
            { id: 87, question: "换乘站：线路交汇 :: 十字路口：？", options: ["红绿灯", "道路交汇", "行人", "车辆", "交通事故", "城市规划"], answer: 1 },
            { id: 88, question: "自动售票机：购票 :: 自动售货机：？", options: ["商品", "购物", "投币", "出货", "零食", "饮料"], answer: 1 },
            { id: 89, question: "屏蔽门：安全 :: 安全带：？", options: ["汽车", "保护", "舒适", "法律", "驾驶", "乘客"], answer: 1 },
            { id: 90, question: "调度中心：列车运行 :: 指挥中心：？", options: ["军队", "作战", "战略", "协调", "通信", "决策"], answer: 1 },
            { id: 91, question: ""通勤时间"是指从居住地到工作地单向出行所花费的时间，不包括在工作地内部的移动时间。根据上述定义，以下哪项属于通勤时间？", options: ["从家乘地铁到办公室楼下，再乘电梯到工位，全程45分钟", "从家开车到公司停车场，耗时30分钟", "午休时从公司去附近餐厅吃饭，往返20分钟", "下班后从公司去健身房，耗时25分钟", "出差时从酒店到客户公司，耗时40分钟", "周末从家去商场购物，耗时35分钟"], answer: 1 },
            { id: 92, question: ""准点率"是指在给定时间段内，实际到达时间与计划到达时间之差不超过规定阈值的列车次数占总次数的比例。根据上述定义，以下哪项不影响准点率的计算？", options: ["列车因信号故障晚点3分钟", "列车提前1分钟到达", "列车因乘客延误发车2分钟但最终准点到达", "计划运行时间的设定标准", "晚点列车的具体晚点时长", "统计时间段的选择"], answer: 4 },
            { id: 93, question: ""地铁TOD模式"是指以地铁站点为核心，在步行可达范围内进行高密度、混合功能的开发，使居住、工作、商业、休闲等功能围绕站点集中布局。根据上述定义，以下哪项最符合TOD模式？", options: ["在郊区地铁站旁建设大型住宅小区", "在市中心地铁站上方建设集商场、写字楼、公寓于一体的综合体", "在地铁站附近建设大型停车场", "沿地铁线路分散建设低密度别墅区", "在地铁站旁建设单一功能的工厂", "在远离地铁站的区域建设商业中心"], answer: 1 },
            { id: 94, question: ""潮汐客流"是指地铁线路中客流方向在早高峰和晚高峰呈现明显相反特征的客流现象，通常表现为早高峰单向集中进城、晚高峰单向集中出城。根据上述定义，以下哪项最可能是潮汐客流？", options: ["连接机场和市中心的线路，全天双向客流均衡", "连接居住区和商业区的线路，早高峰进城方向拥挤、晚高峰出城方向拥挤", "连接两个商业区的线路，全天双向均较拥挤", "旅游线路，周末客流明显高于工作日", "连接大学和住宅区的线路，开学季客流激增", "环线地铁，各方向客流基本均匀"], answer: 1 },
            { id: 95, question: ""地铁互联互通"是指不同城市或同一城市不同运营商的地铁系统之间，通过统一的技术标准和票务规则，实现乘客跨系统无缝换乘和一票通达。根据上述定义，以下哪项属于互联互通？", options: ["同一城市两条地铁线路在换乘站实现站内换乘", "两个城市的地铁使用相同的列车车型", "乘客使用一张交通卡可在A市和B市的地铁系统通用乘车", "不同地铁公司共享维修技术", "两个城市的地铁APP可互相查询线路", "同一运营商的不同线路使用统一标识"], answer: 2 },
            { id: 96, question: ""地铁保护区"是指为保障地铁结构安全和运营安全，在地铁车站、隧道、高架等设施周边划定的一定范围区域，在该区域内进行施工等活动需经地铁公司许可。根据上述定义，以下哪项行为需要经过地铁公司许可？", options: ["在地铁隧道正上方50米处进行地质勘探", "在距离地铁站出入口200米外的街道铺设电缆", "在地铁高架桥下方10米处种植绿化", "在地铁站内开设便利店", "在距离地铁隧道水平距离100米外的区域建造住宅", "在地铁车辆段围墙外燃放烟花爆竹"], answer: 0 },
            { id: 97, question: ""发车间隔"是指同一线路、同一方向相邻两列列车从同一车站出发的时间差。根据上述定义，以下哪项正确描述了发车间隔？", options: ["早高峰发车间隔为3分钟意味着每小时发出20列车", "发车间隔缩短一半，运力提高一倍", "发车间隔与列车运行速度成正比", "发车间隔越短，乘客等待时间一定越短", "发车间隔是指列车在车站的停靠时间", "发车间隔在不同车站可能不同"], answer: 1 },
            { id: 98, question: ""地铁上盖物业"是指在地铁车站、车辆段等设施上方或紧邻区域建设的建筑物，其结构设计与地铁设施相协调。根据上述定义，以下哪项属于地铁上盖物业？", options: ["距离地铁站500米的大型住宅小区", "建在地铁停车场顶部的商业综合体", "地铁站地下层的便利店", "与地铁站通过地下通道连接的商场", "地铁隧道上方道路两侧的商铺", "地铁站周边的公交枢纽"], answer: 1 },
            { id: 99, question: ""客流控制"是指在高峰期通过限制进站速度、关闭部分进站闸机、引导绕行等措施，减缓乘客进入站台的速度，以防止站台过度拥挤。根据上述定义，以下哪项属于客流控制措施？", options: ["增加列车发车频次以运送更多乘客", "在站厅层设置绕行栏杆延缓进站", "关闭部分出入口进行维修", "提高高峰时段票价以减少客流", "在站台增加安全员维持秩序", "延长运营时间分散客流"], answer: 1 },
            { id: 100, question: ""地铁接驳"是指地铁与其他交通方式（公交、出租车、自行车等）之间的连接换乘服务，旨在解决"最后一公里"出行问题。根据上述定义，以下哪项属于地铁接驳服务？", options: ["地铁站内设置便利店供乘客购物", "地铁公司与共享单车企业合作，在地铁站旁设置停车点", "地铁车厢内提供免费WiFi", "地铁站安装空调改善候车环境", "地铁线路延伸至机场", "地铁站内设置母婴室"], answer: 1 }
        ];


        // ============================================================
        //  存储工具
        // ============================================================

        const USER_STORAGE_KEY = 'metro_users_data';
        const SCENERY_STORAGE_KEY = 'metro_scenery_data';
        const SIGNIN_STORAGE_KEY = 'metro_signin_data';
        const QUESTION_BANK_KEY = 'metro_question_bank';
        const DAILY_QUESTION_KEY = 'metro_daily_question';
        const QUESTION_HISTORY_KEY = 'metro_question_history';

        function loadUsers() {
            try {
                const raw = localStorage.getItem(USER_STORAGE_KEY);
                if (raw) {
                    const data = JSON.parse(raw);
                    if (!data.admin) data.admin = { password: PRESET_USER.password, balance: PRESET_USER.balance };
                    return data;
                }
            } catch (_) {}
            const defaultData = { admin: { password: PRESET_USER.password, balance: PRESET_USER.balance } };
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(defaultData));
            return defaultData;
        }
        function saveUsers(users) { localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users)); }
        function getUser(username) { return loadUsers()[username] || null; }
        function userExists(username) { return loadUsers().hasOwnProperty(username); }
        function createUser(username, password) {
            const users = loadUsers();
            if (users[username]) return false;
            users[username] = { password: password, balance: 0 };
            saveUsers(users);
            return true;
        }
        function updateUser(username, updates) {
            const users = loadUsers();
            if (!users[username]) return false;
            Object.assign(users[username], updates);
            saveUsers(users);
            return true;
        }
        function deleteUser(username) {
            if (username === 'admin') return false;
            const users = loadUsers();
            if (!users[username]) return false;
            delete users[username];
            saveUsers(users);
            return true;
        }

        // --- 站车风采 ---
        function loadScenery() {
            try {
                const raw = localStorage.getItem(SCENERY_STORAGE_KEY);
                if (raw) {
                    const data = JSON.parse(raw);
                    if (Array.isArray(data) && data.length) return data;
                }
            } catch (_) {}
            localStorage.setItem(SCENERY_STORAGE_KEY, JSON.stringify(DEFAULT_SCENERY));
            return DEFAULT_SCENERY.slice();
        }
        function saveScenery(items) { localStorage.setItem(SCENERY_STORAGE_KEY, JSON.stringify(items)); }
        function getNextId(items) { return items.length ? Math.max(...items.map(i => i.id)) + 1 : 1; }

        // --- 题库 ---
        function loadQuestionBank() {
            try {
                const raw = localStorage.getItem(QUESTION_BANK_KEY);
                if (raw) {
                    const data = JSON.parse(raw);
                    if (Array.isArray(data) && data.length) return data;
                }
            } catch (_) {}
            localStorage.setItem(QUESTION_BANK_KEY, JSON.stringify(DEFAULT_QUESTION_BANK));
            return DEFAULT_QUESTION_BANK.slice();
        }
        function saveQuestionBank(bank) { localStorage.setItem(QUESTION_BANK_KEY, JSON.stringify(bank)); }
        function getQuestionById(id) { return loadQuestionBank().find(q => q.id === id) || null; }

        // --- 题目历史（用于30天不重复） ---
        function loadQuestionHistory() {
            try {
                const raw = localStorage.getItem(QUESTION_HISTORY_KEY);
                if (raw) return JSON.parse(raw);
            } catch (_) {}
            return [];
        }
        function saveQuestionHistory(history) { localStorage.setItem(QUESTION_HISTORY_KEY, JSON.stringify(history)); }

        // --- 今日题目 ---
        function getTodayStr() { return new Date().toISOString().split('T')[0]; }

        function getDailyQuestion(forceNew) {
            const today = getTodayStr();
            const bank = loadQuestionBank();
            if (!bank.length) return null;

            const stored = localStorage.getItem(DAILY_QUESTION_KEY);
            if (!forceNew && stored) {
                const data = JSON.parse(stored);
                if (data.date === today) {
                    const q = bank.find(x => x.id === data.questionId);
                    if (q) return q;
                }
            }

            // 需要选新题：排除最近30天用过的
            const history = loadQuestionHistory();
            const cutoffDate = new Date(); cutoffDate.setDate(cutoffDate.getDate() - HISTORY_DAYS);
            const cutoff = cutoffDate.toISOString().split('T')[0];
            const recentIds = new Set(history.filter(h => h.date >= cutoff).map(h => h.id));

            let available = bank.filter(q => !recentIds.has(q.id));
            if (available.length === 0) available = bank; // 若全部用完则放宽

            const question = available[Math.floor(Math.random() * available.length)];

            // 更新历史：移除今天的旧记录（如果有），添加新记录
            const newHistory = history.filter(h => h.date !== today);
            newHistory.push({ date: today, id: question.id });
            // 只保留最近90天的记录防止数据膨胀
            const cutoff90 = new Date(); cutoff90.setDate(cutoff90.getDate() - 90);
            const cutoff90Str = cutoff90.toISOString().split('T')[0];
            const trimmedHistory = newHistory.filter(h => h.date >= cutoff90Str);
            saveQuestionHistory(trimmedHistory);

            localStorage.setItem(DAILY_QUESTION_KEY, JSON.stringify({ date: today, questionId: question.id }));
            return question;
        }

        function setDailyQuestion(questionId) {
            const today = getTodayStr();
            localStorage.setItem(DAILY_QUESTION_KEY, JSON.stringify({ date: today, questionId: questionId }));
            const history = loadQuestionHistory().filter(h => h.date !== today);
            history.push({ date: today, id: questionId });
            saveQuestionHistory(history);
        }

        // --- 签到数据 ---
        function loadSigninData() {
            try {
                const raw = localStorage.getItem(SIGNIN_STORAGE_KEY);
                if (raw) return JSON.parse(raw);
            } catch (_) {}
            return {};
        }
        function saveSigninData(data) { localStorage.setItem(SIGNIN_STORAGE_KEY, JSON.stringify(data)); }

        function getSigninStatus(username) {
            const data = loadSigninData();
            const today = getTodayStr();
            const dailyQ = getDailyQuestion();
            const userData = data[username];

            // 如果记录不存在，或是旧日期的，或是题目已更换，则重置
            if (!userData || userData.date !== today || (dailyQ && userData.questionId !== dailyQ.id)) {
                return {
                    date: today,
                    attempts: MAX_ATTEMPTS,
                    signed: false,
                    questionId: dailyQ ? dailyQ.id : null,
                    answered: false
                };
            }
            return {
                date: today,
                attempts: userData.attempts !== undefined ? userData.attempts : MAX_ATTEMPTS,
                signed: userData.signed || false,
                questionId: userData.questionId || null,
                answered: userData.answered || false
            };
        }

        function updateSigninStatus(username, updates) {
            const data = loadSigninData();
            const today = getTodayStr();
            const dailyQ = getDailyQuestion();
            if (!data[username] || data[username].date !== today || (dailyQ && data[username].questionId !== dailyQ.id)) {
                data[username] = {
                    date: today,
                    attempts: MAX_ATTEMPTS,
                    signed: false,
                    questionId: dailyQ ? dailyQ.id : null,
                    answered: false
                };
            }
            Object.assign(data[username], updates);
            saveSigninData(data);
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
        const adminEntry = document.getElementById('adminEntry');
        const signinEntry = document.getElementById('signinEntry');
        const signinDesc = document.getElementById('signinDesc');

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

        // 答题签到
        const quizModal = document.getElementById('quizModal');
        const quizQuestion = document.getElementById('quizQuestion');
        const quizOptions = document.getElementById('quizOptions');
        const quizAttempts = document.getElementById('quizAttempts');
        const quizStatus = document.getElementById('quizStatus');
        const quizResult = document.getElementById('quizResult');
        const closeQuizBtn = document.getElementById('closeQuizBtn');
        const submitAnswerBtn = document.getElementById('submitAnswerBtn');

        // 管理面板
        const adminModal = document.getElementById('adminModal');
        const closeAdminBtn = document.getElementById('closeAdminBtn');
        const userTableBody = document.getElementById('userTableBody');
        const sceneryAdminList = document.getElementById('sceneryAdminList');
        const addSceneryBtn = document.getElementById('addSceneryBtn');
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = {
            users: document.getElementById('tabUsers'),
            scenery: document.getElementById('tabScenery'),
            questions: document.getElementById('tabQuestions')
        };
        const changeDailyQuestionBtn = document.getElementById('changeDailyQuestionBtn');
        const currentDailyQuestionId = document.getElementById('currentDailyQuestionId');
        const totalQuestionCount = document.getElementById('totalQuestionCount');
        const questionAdminList = document.getElementById('questionAdminList');
        const addQuestionBtn = document.getElementById('addQuestionBtn');

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

        // 编辑题目
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

        // Toast
        const toastContainer = document.getElementById('toastContainer');

        let currentUser = null;
        let quizState = { selectedOption: -1, submitted: false, question: null };

        // ============================================================
        //  工具函数
        // ============================================================

        function formatDate(now) {
            const y = now.getFullYear();
            const m = String(now.getMonth() + 1).padStart(2, '0');
            const d = String(now.getDate()).padStart(2, '0');
            const weekdays = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
            return y + '年' + m + '月' + d + '日 ' + weekdays[now.getDay()];
        }
        function formatTime(now) {
            return String(now.getHours()).padStart(2, '0') + ':' +
                   String(now.getMinutes()).padStart(2, '0') + ':' +
                   String(now.getSeconds()).padStart(2, '0');
        }
        function formatBalance(val) { return '¥' + Number(val).toFixed(2); }
        function showToast(message, icon) {
            icon = icon || 'ℹ️';
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.innerHTML = '<span class="toast-icon">' + icon + '</span> ' + message;
            toastContainer.appendChild(toast);
            requestAnimationFrame(() => toast.classList.add('show'));
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 400);
            }, 2500);
        }

        // ============================================================
        //  渲染函数
        // ============================================================

        function renderLines() {
            if (!lineGrid) return;
            lineGrid.innerHTML = '';
            LINE_DATA.forEach(line => {
                const card = document.createElement('div');
                card.className = 'line-card';
                const stationsHtml = line.stations.map((s, idx) => {
                    let arrow = idx < line.stations.length - 1 ? ' <span class="dir-icon">→</span> ' : '';
                    return '<span class="station">' + s + arrow + '</span>';
                }).join('');
                card.innerHTML = '<div class="line-header"><div class="line-color" style="background:' + line.color + ';"></div><span class="line-name">' + line.name + '<span class="line-code">' + line.code + '</span></span></div><div class="line-stations">' + stationsHtml + '</div>';
                lineGrid.appendChild(card);
            });
        }

        function renderUserTable() {
            const users = loadUsers();
            userTableBody.innerHTML = '';
            Object.keys(users).forEach(uname => {
                const user = users[uname];
                const tr = document.createElement('tr');
                let actions = '<button class="btn-edit" data-username="' + uname + '" data-action="changePwd">改密码</button>' +
                              '<button class="btn-balance" data-username="' + uname + '" data-action="changeBalance">改余额</button>';
                if (uname !== 'admin') actions += '<button class="btn-delete" data-username="' + uname + '" data-action="delete">注销</button>';
                else actions += '<span style="color:#aaa;font-size:12px;">(管理员)</span>';
                tr.innerHTML = '<td><strong>' + uname + '</strong></td><td>' + formatBalance(user.balance) + '</td><td><div class="table-actions">' + actions + '</div></td>';
                userTableBody.appendChild(tr);
            });
            userTableBody.querySelectorAll('[data-action]').forEach(btn => {
                btn.addEventListener('click', function() { handleUserAction(this.dataset.action, this.dataset.username); });
            });
        }

        function renderSceneryAdmin() {
            const items = loadScenery();
            sceneryAdminList.innerHTML = '';
            items.forEach(item => {
                const div = document.createElement('div');
                div.className = 'scenery-item-admin';
                div.innerHTML = '<div class="info"><span class="icon">' + item.icon + '</span><span class="name">' + item.name + '</span><span class="desc">' + item.desc + '</span></div><div class="actions"><button class="btn-edit" data-id="' + item.id + '">编辑</button><button class="btn-delete" data-id="' + item.id + '">删除</button></div>';
                sceneryAdminList.appendChild(div);
            });
            sceneryAdminList.querySelectorAll('.btn-edit').forEach(btn => {
                btn.addEventListener('click', function() { openEditScenery(parseInt(this.dataset.id)); });
            });
            sceneryAdminList.querySelectorAll('.btn-delete').forEach(btn => {
                btn.addEventListener('click', function() { if (confirm('确定要删除这条风采吗？')) deleteSceneryItem(parseInt(this.dataset.id)); });
            });
        }

        function renderQuestionAdmin() {
            const bank = loadQuestionBank();
            const dailyQ = getDailyQuestion();
            totalQuestionCount.textContent = bank.length;
            currentDailyQuestionId.textContent = dailyQ ? dailyQ.id : '--';
            questionAdminList.innerHTML = '';
            bank.forEach(q => {
                const div = document.createElement('div');
                div.className = 'question-item-admin' + (dailyQ && dailyQ.id === q.id ? ' current-q' : '');
                const optLabels = ['A','B','C','D','E','F','G','H','I','J'];
                const ansLabel = optLabels[q.answer] || '?';
                div.innerHTML = '<div class="q-header"><span class="q-id">ID:' + q.id + '</span><span class="q-text">' + q.question + '</span></div><div class="q-answer">✅ 正确答案：' + ansLabel + '</div><div class="q-actions"><button class="btn-edit" data-id="' + q.id + '">编辑</button><button class="btn-delete" data-id="' + q.id + '">删除</button><button class="btn-balance" data-id="' + q.id + '" style="background:#d5f5e3;color:#1a7a4a;">设为今日题目</button></div>';
                questionAdminList.appendChild(div);
            });
            questionAdminList.querySelectorAll('.btn-edit').forEach(btn => {
                btn.addEventListener('click', function() { openEditQuestion(parseInt(this.dataset.id)); });
            });
            questionAdminList.querySelectorAll('.btn-delete').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = parseInt(this.dataset.id);
                    const bank = loadQuestionBank();
                    if (bank.length <= 10) { showToast('题库题目不能少于10道', '⚠️'); return; }
                    if (confirm('确定要删除这道题目吗？')) deleteQuestionItem(id);
                });
            });
            questionAdminList.querySelectorAll('[data-id]').forEach(btn => {
                if (btn.textContent === '设为今日题目') {
                    btn.addEventListener('click', function() {
                        const id = parseInt(this.dataset.id);
                        adminSetDailyQuestion(id);
                    });
                }
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
            if (clockInterval) { clearInterval(clockInterval); clockInterval = null; }
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
            if (user && user.password === password) loginSuccess(username);
            else {
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
            adminEntry.style.display = username === 'admin' ? 'block' : 'none';
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

        function closeAllModals() {
            registerModal.classList.remove('active');
            adminModal.classList.remove('active');
            editSceneryModal.classList.remove('active');
            forgotModal.classList.remove('active');
            quizModal.classList.remove('active');
            editQuestionModal.classList.remove('active');
        }


        // ============================================================
        //  注册逻辑
        // ============================================================

        function clearRegisterForm() {
            regUsername.value = ''; regPassword.value = '';
            regConfirm.value = ''; regVerify.value = '';
            regError.classList.remove('show'); regSuccess.classList.remove('show');
        }
        function openRegisterModal() { clearRegisterForm(); registerModal.classList.add('active'); }
        function closeRegisterModal() { registerModal.classList.remove('active'); clearRegisterForm(); }
        function handleRegister() {
            const username = regUsername.value.trim();
            const password = regPassword.value.trim();
            const confirm = regConfirm.value.trim();
            const verify = regVerify.value.trim();
            regError.classList.remove('show'); regSuccess.classList.remove('show');
            if (!username || username.length < 2) { regErrorMessage.textContent = '账号至少需要2个字符'; regError.classList.add('show'); return; }
            if (userExists(username)) { regErrorMessage.textContent = '该账号已存在，请换一个'; regError.classList.add('show'); return; }
            if (!password || password.length < 6) { regErrorMessage.textContent = '密码至少需要6个字符'; regError.classList.add('show'); return; }
            if (password !== confirm) { regErrorMessage.textContent = '两次输入的密码不一致'; regError.classList.add('show'); return; }
            if (!verify) { regErrorMessage.textContent = '请回答验证问题'; regError.classList.add('show'); return; }
            if (verify.trim().toUpperCase() !== VERIFY_ANSWER.toUpperCase()) {
                regErrorMessage.textContent = '验证答案错误，请重新输入'; regError.classList.add('show');
                regVerify.value = ''; regVerify.focus(); return;
            }
            if (createUser(username, password)) {
                regSuccessMessage.textContent = '🎉 注册成功！即将自动登录...';
                regSuccess.classList.add('show');
                setTimeout(() => { closeRegisterModal(); loginSuccess(username); }, 1200);
            } else { regErrorMessage.textContent = '注册失败，请稍后重试'; regError.classList.add('show'); }
        }

        // ============================================================
        //  忘记密码逻辑
        // ============================================================

        function openForgotModal() {
            forgotUsername.value = ''; forgotVerify.value = '';
            forgotNewPassword.value = '';
            forgotError.classList.remove('show'); forgotSuccess.classList.remove('show');
            forgotModal.classList.add('active');
        }
        function closeForgotModal() { forgotModal.classList.remove('active'); forgotError.classList.remove('show'); forgotSuccess.classList.remove('show'); }
        function handleForgot() {
            const username = forgotUsername.value.trim();
            const verify = forgotVerify.value.trim();
            const newPwd = forgotNewPassword.value.trim();
            forgotError.classList.remove('show'); forgotSuccess.classList.remove('show');
            if (!username) { forgotErrorMessage.textContent = '请输入账号'; forgotError.classList.add('show'); return; }
            if (!userExists(username)) { forgotErrorMessage.textContent = '该账号不存在'; forgotError.classList.add('show'); return; }
            if (username === 'admin') { forgotErrorMessage.textContent = '管理员账号请通过其他方式重置'; forgotError.classList.add('show'); return; }
            if (!verify) { forgotErrorMessage.textContent = '请回答验证问题'; forgotError.classList.add('show'); return; }
            if (verify.trim().toUpperCase() !== VERIFY_ANSWER.toUpperCase()) {
                forgotErrorMessage.textContent = '验证答案错误，请重新输入'; forgotError.classList.add('show');
                forgotVerify.value = ''; forgotVerify.focus(); return;
            }
            if (!newPwd || newPwd.length < 6) { forgotErrorMessage.textContent = '新密码至少需要6个字符'; forgotError.classList.add('show'); return; }
            if (updateUser(username, { password: newPwd })) {
                forgotSuccessMessage.textContent = '✅ 密码已重置，请使用新密码登录';
                forgotSuccess.classList.add('show');
                setTimeout(() => { closeForgotModal(); showToast('密码已重置，请重新登录', '🔑'); }, 1500);
            } else { forgotErrorMessage.textContent = '重置失败，请稍后重试'; forgotError.classList.add('show'); }
        }

        // ============================================================
        //  答题签到逻辑
        // ============================================================

        function updateSigninUI() {
            if (!currentUser || currentUser === 'admin') { signinEntry.style.display = 'none'; return; }
            signinEntry.style.display = 'block';
            const status = getSigninStatus(currentUser);
            if (status.signed) {
                signinDesc.textContent = '✅ 今日已签到';
                signinEntry.classList.add('disabled');
            } else if (status.attempts <= 0) {
                signinDesc.textContent = '❌ 今日机会已用完';
                signinEntry.classList.add('disabled');
            } else {
                signinDesc.textContent = '🧠 剩余 ' + status.attempts + ' 次机会';
                signinEntry.classList.remove('disabled');
            }
        }

        function openQuizModal() {
            if (!currentUser || currentUser === 'admin') { showToast('普通用户专享', 'ℹ️'); return; }
            const status = getSigninStatus(currentUser);
            if (status.signed) { showToast('今日已签到，明天再来吧！', '✅'); return; }
            if (status.attempts <= 0) { showToast('今日答题机会已用完，明天再来！', '❌'); return; }

            const question = getDailyQuestion();
            if (!question) { showToast('题库为空，请联系管理员', '⚠️'); return; }

            quizState = { selectedOption: -1, submitted: false, question: question };
            quizResult.style.display = 'none';
            quizResult.className = 'quiz-result';
            submitAnswerBtn.style.display = 'block';
            submitAnswerBtn.textContent = '提交答案';
            submitAnswerBtn.disabled = false;

            quizQuestion.textContent = question.question;
            quizOptions.innerHTML = '';
            const labels = ['A','B','C','D','E','F','G','H','I','J'];
            question.options.forEach((opt, idx) => {
                const div = document.createElement('div');
                div.className = 'quiz-option';
                div.innerHTML = '<span class="opt-label">' + labels[idx] + '.</span><span>' + opt + '</span>';
                div.addEventListener('click', function() {
                    if (quizState.submitted) return;
                    quizOptions.querySelectorAll('.quiz-option').forEach(el => el.classList.remove('selected'));
                    div.classList.add('selected');
                    quizState.selectedOption = idx;
                });
                quizOptions.appendChild(div);
            });

            quizAttempts.textContent = status.attempts;
            quizStatus.textContent = '▶ 待答题';
            quizModal.classList.add('active');
        }

        function closeQuizModal() {
            quizModal.classList.remove('active');
            const status = getSigninStatus(currentUser);
            if (status.signed) {
                updateSigninUI();
                const user = getUser(currentUser);
                if (user) displayBalance.textContent = formatBalance(user.balance);
            }
        }

        function submitAnswer() {
            if (quizState.submitted) return;
            if (quizState.selectedOption === -1) { showToast('请先选择一个答案', '⚠️'); return; }

            const question = quizState.question;
            const isCorrect = quizState.selectedOption === question.answer;
            quizState.submitted = true;

            const options = quizOptions.querySelectorAll('.quiz-option');
            options.forEach((el, idx) => {
                el.classList.add('disabled');
                el.style.cursor = 'default';
                if (idx === question.answer) el.classList.add('correct');
                else if (idx === quizState.selectedOption && !isCorrect) el.classList.add('wrong');
            });

            if (isCorrect) {
                quizStatus.textContent = '🎉 回答正确';
                quizResult.textContent = '✅ 回答正确！签到成功，获得 ¥' + SIGNIN_AMOUNT;
                quizResult.className = 'quiz-result success';
                quizResult.style.display = 'block';
                submitAnswerBtn.style.display = 'none';
                completeSignin();
            } else {
                const status = getSigninStatus(currentUser);
                const newAttempts = status.attempts - 1;
                updateSigninStatus(currentUser, { attempts: newAttempts, answered: true });
                quizAttempts.textContent = newAttempts;

                if (newAttempts <= 0) {
                    quizStatus.textContent = '❌ 机会已用完';
                    quizResult.textContent = '💔 回答错误，今日答题机会已用完。正确答案不会显示，请明日再来挑战新题目！';
                    quizResult.className = 'quiz-result fail';
                    quizResult.style.display = 'block';
                    submitAnswerBtn.style.display = 'none';
                    updateSigninUI();
                    setTimeout(() => { showToast('今日机会已用完，明天再来吧', '❌'); closeQuizModal(); }, 2500);
                } else {
                    quizStatus.textContent = '💡 还有 ' + newAttempts + ' 次机会';
                    quizResult.textContent = '❌ 回答错误，请再试一次（剩余 ' + newAttempts + ' 次机会）';
                    quizResult.className = 'quiz-result fail';
                    quizResult.style.display = 'block';
                    submitAnswerBtn.textContent = '再试一次';
                    submitAnswerBtn.disabled = false;
                    quizState.submitted = false;
                    quizState.selectedOption = -1;
                    options.forEach(el => {
                        el.classList.remove('selected', 'correct', 'wrong', 'disabled');
                        el.style.cursor = 'pointer';
                    });
                }
            }
        }

        function completeSignin() {
            const user = getUser(currentUser);
            if (user) {
                const newBalance = (user.balance || 0) + SIGNIN_AMOUNT;
                updateUser(currentUser, { balance: newBalance });
                displayBalance.textContent = formatBalance(newBalance);
            }
            updateSigninStatus(currentUser, { signed: true });
            updateSigninUI();
            showToast('签到成功！获得 ¥' + SIGNIN_AMOUNT, '💰');
        }


        // ============================================================
        //  管理面板 - 用户操作
        // ============================================================

        function handleUserAction(action, username) {
            if (action === 'changePwd') {
                const newPwd = prompt('请输入新密码（至少6个字符）：');
                if (newPwd === null) return;
                if (newPwd.length < 6) { showToast('密码至少6个字符', '⚠️'); return; }
                if (updateUser(username, { password: newPwd })) {
                    showToast('用户 ' + username + ' 密码已修改', '✅');
                    renderUserTable();
                } else showToast('修改失败', '❌');
            } else if (action === 'changeBalance') {
                const input = prompt('请输入新的余额（数字）：');
                if (input === null) return;
                const val = parseFloat(input);
                if (isNaN(val) || val < 0) { showToast('请输入有效数字', '⚠️'); return; }
                if (updateUser(username, { balance: val })) {
                    showToast('用户 ' + username + ' 余额已更新', '✅');
                    renderUserTable();
                    if (username === currentUser) displayBalance.textContent = formatBalance(val);
                } else showToast('修改失败', '❌');
            } else if (action === 'delete') {
                if (username === 'admin') { showToast('不能注销管理员账号', '⚠️'); return; }
                if (confirm('确定要注销用户 ' + username + ' 吗？此操作不可恢复！')) {
                    if (deleteUser(username)) {
                        showToast('用户 ' + username + ' 已注销', '🗑️');
                        renderUserTable();
                        if (username === currentUser) handleLogout();
                    } else showToast('注销失败', '❌');
                }
            }
        }

        // ============================================================
        //  管理面板 - 站车风采操作
        // ============================================================

        function openEditScenery(id) {
            const items = loadScenery();
            let item = items.find(i => i.id === id);
            if (!item) {
                editSceneryTitle.textContent = '➕ 新增风采';
                editSceneryId.value = ''; editSceneryIcon.value = '';
                editSceneryName.value = ''; editSceneryDesc.value = '';
            } else {
                editSceneryTitle.textContent = '✏️ 编辑风采';
                editSceneryId.value = item.id;
                editSceneryIcon.value = item.icon || '';
                editSceneryName.value = item.name || '';
                editSceneryDesc.value = item.desc || '';
            }
            editSceneryError.classList.remove('show');
            editSceneryModal.classList.add('active');
        }
        function closeEditScenery() { editSceneryModal.classList.remove('active'); editSceneryError.classList.remove('show'); }
        function saveSceneryItem() {
            const id = editSceneryId.value.trim();
            const icon = editSceneryIcon.value.trim();
            const name = editSceneryName.value.trim();
            const desc = editSceneryDesc.value.trim();
            editSceneryError.classList.remove('show');
            if (!name) { editSceneryErrorMessage.textContent = '名称不能为空'; editSceneryError.classList.add('show'); return; }
            let items = loadScenery();
            if (id) {
                const idx = items.findIndex(i => i.id === parseInt(id));
                if (idx !== -1) { items[idx] = { ...items[idx], icon, name, desc }; saveScenery(items); showToast('风采已更新', '✅'); }
                else { showToast('未找到该条目', '❌'); return; }
            } else {
                items.push({ id: getNextId(items), icon, name, desc });
                saveScenery(items); showToast('新增风采成功', '✅');
            }
            closeEditScenery(); renderSceneryAdmin();
        }
        function deleteSceneryItem(id) {
            let items = loadScenery().filter(i => i.id !== id);
            saveScenery(items); renderSceneryAdmin(); showToast('已删除', '🗑️');
        }

        // ============================================================
        //  管理面板 - 题库操作
        // ============================================================

        function openEditQuestion(id) {
            const bank = loadQuestionBank();
            let q = bank.find(x => x.id === id);
            const labels = ['A','B','C','D','E','F','G','H','I','J'];
            if (!q) {
                editQuestionTitle.textContent = '➕ 新增题目';
                editQuestionId.value = '';
                editQuestionText.value = '';
                editQuestionOptions.value = '';
                editQuestionAnswer.value = '';
            } else {
                editQuestionTitle.textContent = '✏️ 编辑题目 (ID:' + q.id + ')';
                editQuestionId.value = q.id;
                editQuestionText.value = q.question;
                editQuestionOptions.value = q.options.map((opt, idx) => labels[idx] + '. ' + opt).join('\n');
                editQuestionAnswer.value = labels[q.answer];
            }
            editQuestionError.classList.remove('show');
            editQuestionModal.classList.add('active');
        }
        function closeEditQuestion() { editQuestionModal.classList.remove('active'); editQuestionError.classList.remove('show'); }
        function saveQuestionItem() {
            const idStr = editQuestionId.value.trim();
            const text = editQuestionText.value.trim();
            const optsRaw = editQuestionOptions.value.trim();
            const ansLetter = editQuestionAnswer.value.trim().toUpperCase();
            editQuestionError.classList.remove('show');
            if (!text) { editQuestionErrorMessage.textContent = '题目内容不能为空'; editQuestionError.classList.add('show'); return; }
            if (!optsRaw) { editQuestionErrorMessage.textContent = '选项不能为空'; editQuestionError.classList.add('show'); return; }
            const lines = optsRaw.split('\n').map(l => l.trim()).filter(l => l);
            if (lines.length < 6) { editQuestionErrorMessage.textContent = '至少需要6个选项'; editQuestionError.classList.add('show'); return; }
            const options = [];
            const labels = ['A','B','C','D','E','F','G','H','I','J'];
            for (let i = 0; i < lines.length; i++) {
                const prefix = labels[i] + '.';
                if (!lines[i].startsWith(prefix)) { editQuestionErrorMessage.textContent = '选项格式错误，第' + (i+1) + '行应以 ' + prefix + ' 开头'; editQuestionError.classList.add('show'); return; }
                options.push(lines[i].substring(prefix.length).trim());
            }
            if (options.length > 10) { editQuestionErrorMessage.textContent = '选项不能超过10个'; editQuestionError.classList.add('show'); return; }
            const answer = labels.indexOf(ansLetter);
            if (answer === -1 || answer >= options.length) { editQuestionErrorMessage.textContent = '正确答案字母无效'; editQuestionError.classList.add('show'); return; }

            let bank = loadQuestionBank();
            if (idStr) {
                const idx = bank.findIndex(x => x.id === parseInt(idStr));
                if (idx !== -1) { bank[idx] = { ...bank[idx], question: text, options, answer }; showToast('题目已更新', '✅'); }
                else { showToast('未找到题目', '❌'); return; }
            } else {
                const newId = bank.length ? Math.max(...bank.map(x => x.id)) + 1 : 1;
                bank.push({ id: newId, question: text, options, answer });
                showToast('新增题目成功 (ID:' + newId + ')', '✅');
            }
            saveQuestionBank(bank);
            closeEditQuestion(); renderQuestionAdmin();
        }
        function deleteQuestionItem(id) {
            let bank = loadQuestionBank().filter(x => x.id !== id);
            saveQuestionBank(bank); renderQuestionAdmin(); showToast('题目已删除', '🗑️');
        }
        function adminSetDailyQuestion(id) {
            const bank = loadQuestionBank();
            const q = bank.find(x => x.id === id);
            if (!q) { showToast('题目不存在', '❌'); return; }
            setDailyQuestion(id);
            // 重置所有用户今日签到状态（未签到的用户）
            const signinData = loadSigninData();
            const today = getTodayStr();
            Object.keys(signinData).forEach(uname => {
                if (signinData[uname].date === today && !signinData[uname].signed) {
                    signinData[uname].attempts = MAX_ATTEMPTS;
                    signinData[uname].questionId = id;
                    signinData[uname].answered = false;
                }
            });
            saveSigninData(signinData);
            renderQuestionAdmin();
            showToast('今日题目已更换为 ID:' + id, '✅');
        }
        function adminRandomChangeDailyQuestion() {
            const bank = loadQuestionBank();
            if (bank.length < 2) { showToast('题库题目不足，无法更换', '⚠️'); return; }
            const current = getDailyQuestion();
            const currentId = current ? current.id : null;
            // 排除当前题目，优先选30天内未用过的
            const history = loadQuestionHistory();
            const cutoffDate = new Date(); cutoffDate.setDate(cutoffDate.getDate() - HISTORY_DAYS);
            const cutoff = cutoffDate.toISOString().split('T')[0];
            const recentIds = new Set(history.filter(h => h.date >= cutoff).map(h => h.id));
            let available = bank.filter(q => q.id !== currentId && !recentIds.has(q.id));
            if (available.length === 0) available = bank.filter(q => q.id !== currentId);
            if (available.length === 0) { showToast('没有可用的新题目', '⚠️'); return; }
            const newQ = available[Math.floor(Math.random() * available.length)];
            adminSetDailyQuestion(newQ.id);
        }

        // ============================================================
        //  站车风采展示（普通用户）
        // ============================================================

        function openSceneryViewer() {
            const modal = document.createElement('div');
            modal.className = 'modal-overlay active';
            modal.style.zIndex = '1000';
            const items = loadScenery();
            let html = '<div class="modal-card" style="max-width:600px;"><div class="modal-title">🚉 站车风采</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:16px 0;">';
            items.forEach(item => {
                html += '<div style="background:#f8fafc;border-radius:14px;padding:16px 14px;border:1px solid #eef2f7;"><span style="font-size:28px;display:block;margin-bottom:4px;">' + item.icon + '</span><div style="font-weight:700;font-size:16px;color:#0b2a4a;">' + item.name + '</div><div style="font-size:13px;color:#5a6a7a;margin-top:2px;line-height:1.4;">' + item.desc + '</div></div>';
            });
            html += '</div><div class="form-actions"><button class="btn-cancel" id="closeSceneryViewerBtn" style="flex:1;">关闭</button></div></div>';
            modal.innerHTML = html;
            document.body.appendChild(modal);
            modal.querySelector('#closeSceneryViewerBtn').addEventListener('click', function() { modal.remove(); });
            modal.addEventListener('click', function(e) { if (e.target === this) modal.remove(); });
        }

        // ============================================================
        //  管理面板打开/关闭
        // ============================================================

        function openAdminPanel() {
            if (currentUser !== 'admin') { showToast('权限不足', '⛔'); return; }
            renderUserTable(); renderSceneryAdmin(); renderQuestionAdmin();
            adminModal.classList.add('active');
            switchTab('users');
        }
        function closeAdminPanel() { adminModal.classList.remove('active'); }
        function switchTab(tabName) {
            tabBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabName));
            Object.keys(tabContents).forEach(key => tabContents[key].classList.toggle('active', key === tabName));
        }

        // ============================================================
        //  检查登录状态
        // ============================================================

        function checkSession() {
            const username = sessionStorage.getItem('metro_session_user');
            if (username && userExists(username)) {
                currentUser = username;
                loginPage.style.display = 'none'; homePage.style.display = 'flex';
                const user = getUser(username);
                displayUsername.textContent = username; greetingUser.textContent = username;
                if (user) displayBalance.textContent = formatBalance(user.balance);
                adminEntry.style.display = username === 'admin' ? 'block' : 'none';
                updateSigninUI(); renderLines(); startClock();
                return true;
            }
            return false;
        }


        // ============================================================
        //  事件绑定
        // ============================================================

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

        closeQuizBtn.addEventListener('click', closeQuizModal);
        quizModal.addEventListener('click', function(e) { if (e.target === this) closeQuizModal(); });
        submitAnswerBtn.addEventListener('click', submitAnswer);

        closeAdminBtn.addEventListener('click', closeAdminPanel);
        adminModal.addEventListener('click', function(e) { if (e.target === this) closeAdminPanel(); });
        tabBtns.forEach(btn => btn.addEventListener('click', function() { switchTab(this.dataset.tab); }));

        addSceneryBtn.addEventListener('click', function() { openEditScenery(null); });
        closeEditSceneryBtn.addEventListener('click', closeEditScenery);
        saveSceneryBtn.addEventListener('click', saveSceneryItem);
        editSceneryModal.addEventListener('click', function(e) { if (e.target === this) closeEditScenery(); });

        addQuestionBtn.addEventListener('click', function() { openEditQuestion(null); });
        closeEditQuestionBtn.addEventListener('click', closeEditQuestion);
        saveQuestionBtn.addEventListener('click', saveQuestionItem);
        editQuestionModal.addEventListener('click', function(e) { if (e.target === this) closeEditQuestion(); });
        changeDailyQuestionBtn.addEventListener('click', adminRandomChangeDailyQuestion);

        loginUsername.addEventListener('focus', function() { loginError.classList.remove('show'); });
        loginPassword.addEventListener('focus', function() { loginError.classList.remove('show'); });

        // ============================================================
        //  初始化
        // ============================================================

        (function init() {
            const users = loadUsers();
            if (!users.admin) { users.admin = { password: PRESET_USER.password, balance: PRESET_USER.balance }; saveUsers(users); }
            const scenery = loadScenery();
            if (!scenery.length) saveScenery(DEFAULT_SCENERY);
            const bank = loadQuestionBank();
            if (!bank.length) saveQuestionBank(DEFAULT_QUESTION_BANK);

            // 预加载今日题目
            getDailyQuestion();

            const hasSession = checkSession();
            if (!hasSession) {
                loginPage.style.display = 'flex'; homePage.style.display = 'none';
                loginUsername.value = ''; loginPassword.value = '';
            }

            // 清理过期签到数据
            const signinData = loadSigninData();
            const today = getTodayStr();
            let changed = false;
            Object.keys(signinData).forEach(key => {
                if (signinData[key].date !== today) {
                    signinData[key] = { date: today, attempts: MAX_ATTEMPTS, signed: false, questionId: null, answered: false };
                    changed = true;
                }
            });
            if (changed) saveSigninData(signinData);
            if (currentUser && currentUser !== 'admin') updateSigninUI();
        })();
    })();
    </script>
</body>
</html>
