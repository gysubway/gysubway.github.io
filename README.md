<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>固原地铁 · 售票系统</title>
    <link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap" rel="stylesheet" />
    <style>
        /* ===== 全局重置 ===== */
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

        /* ===== 登录页 ===== */
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
        .login-footer .forgot-link {
            display: inline-block;
            margin-top: 4px;
            color: #7a8a9e;
            font-size: 13px;
            cursor: pointer;
            transition: color 0.2s;
            text-decoration: underline;
        }
        .login-footer .forgot-link:hover {
            color: #1a6e9e;
        }

        /* ===== 模态框通用 ===== */
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
            max-width: 580px;
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
        .modal-card input[type="password"],
        .modal-card input[type="number"],
        .modal-card textarea {
            width: 100%;
            padding: 12px 16px;
            font-size: 15px;
            border: 2px solid #dce3ec;
            border-radius: 10px;
            background: #f8fafc;
            transition: border-color 0.25s;
            outline: none;
            color: #1a2a3a;
            font-family: inherit;
        }
        .modal-card input:focus,
        .modal-card textarea:focus {
            border-color: #1a6e9e;
            background: #ffffff;
        }
        .modal-card textarea {
            min-height: 60px;
            resize: vertical;
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
        .modal-card .btn-primary {
            background: linear-gradient(135deg, #1a6e9e, #0b4a72);
            color: #ffffff;
        }
        .modal-card .btn-primary:hover {
            background: linear-gradient(135deg, #1f7eb2, #0e5580);
        }
        .modal-card .btn-danger {
            background: #d94a4a;
            color: #ffffff;
        }
        .modal-card .btn-danger:hover {
            background: #c0392b;
        }
        .modal-card .btn-cancel {
            background: #eef2f7;
            color: #4a5a6a;
        }
        .modal-card .btn-cancel:hover {
            background: #e0e6ee;
        }
        .modal-card .btn-success {
            background: #27ae60;
            color: #fff;
        }
        .modal-card .btn-success:hover {
            background: #1e8449;
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

        /* ===== 注册模态框 ===== */
        .register-modal .verify-question {
            background: #eef4fa;
            padding: 12px 16px;
            border-radius: 10px;
            font-size: 15px;
            color: #0b2a4a;
            margin-bottom: 10px;
            border-left: 4px solid #1a6e9e;
            font-weight: 500;
        }

        /* ===== 签到答题模态框 ===== */
        .quiz-modal .modal-card {
            max-width: 720px;
        }
        .quiz-modal .quiz-question {
            font-size: 18px;
            font-weight: 600;
            color: #0b2a4a;
            padding: 16px 20px;
            background: #f0f5fb;
            border-radius: 12px;
            margin-bottom: 20px;
            line-height: 1.6;
            border-left: 5px solid #1a6e9e;
        }
        .quiz-modal .quiz-options {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 16px;
        }
        .quiz-modal .quiz-options .opt-btn {
            padding: 12px 16px;
            border: 2px solid #dce3ec;
            border-radius: 10px;
            background: #fafcfd;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 15px;
            text-align: left;
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 500;
            color: #1a2a3a;
        }
        .quiz-modal .quiz-options .opt-btn:hover:not(.disabled) {
            border-color: #1a6e9e;
            background: #eaf3fa;
            transform: translateY(-1px);
        }
        .quiz-modal .quiz-options .opt-btn .opt-label {
            display: inline-block;
            min-width: 28px;
            font-weight: 700;
            color: #1a6e9e;
        }
        .quiz-modal .quiz-options .opt-btn.correct {
            border-color: #27ae60;
            background: #d5f5e3;
        }
        .quiz-modal .quiz-options .opt-btn.wrong {
            border-color: #e74c3c;
            background: #fadbd8;
        }
        .quiz-modal .quiz-options .opt-btn.disabled {
            cursor: not-allowed;
            opacity: 0.7;
        }
        .quiz-modal .quiz-options .opt-btn.selected-correct {
            border-color: #27ae60;
            background: #d5f5e3;
        }
        .quiz-modal .quiz-options .opt-btn.selected-wrong {
            border-color: #e74c3c;
            background: #fadbd8;
        }
        .quiz-modal .quiz-status {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            font-weight: 600;
            color: #2c3e50;
            flex-wrap: wrap;
            gap: 8px;
        }
        .quiz-modal .quiz-status .attempts-left {
            color: #d94a4a;
        }
        .quiz-modal .quiz-status .status-msg {
            color: #1a6e9e;
        }
        .quiz-modal .quiz-result-box {
            padding: 14px 20px;
            border-radius: 10px;
            margin-top: 12px;
            font-weight: 600;
            font-size: 16px;
            display: none;
            text-align: center;
        }
        .quiz-modal .quiz-result-box.success {
            display: block;
            background: #d5f5e3;
            color: #1a7a4a;
        }
        .quiz-modal .quiz-result-box.fail {
            display: block;
            background: #fadbd8;
            color: #922b21;
        }
        .quiz-modal .quiz-result-box.info {
            display: block;
            background: #d4e6f1;
            color: #1a4a6e;
        }
        @media (max-width: 600px) {
            .quiz-modal .quiz-options {
                grid-template-columns: 1fr;
            }
            .quiz-modal .modal-card {
                padding: 20px 14px;
            }
            .quiz-modal .quiz-question {
                font-size: 16px;
                padding: 12px 14px;
            }
        }

        /* ===== 首页 ===== */
        #homePage {
            display: none;
            width: 100%;
            min-height: 100vh;
            background: #eef2f7;
            flex-direction: column;
        }
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
        .home-main {
            flex: 1;
            padding: 28px 40px 20px;
            max-width: 1280px;
            margin: 0 auto;
            width: 100%;
        }
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

        .quick-actions {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
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
        .quick-action.admin-action {
            border-color: #f1c40f;
            background: #fef9e7;
        }
        .quick-action.admin-action:hover {
            border-color: #d4ac0d;
        }
        .quick-action.signin-action {
            border-color: #2ecc71;
            background: #eafaf1;
        }
        .quick-action.signin-action:hover {
            border-color: #1e8449;
        }
        .quick-action.signin-action.disabled {
            opacity: 0.6;
            cursor: not-allowed;
            filter: grayscale(0.3);
        }
        .quick-action.signin-action.disabled:hover {
            transform: none;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
            border-color: #eef2f7;
        }
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

        /* ===== 管理面板 ===== */
        .admin-modal .modal-card {
            max-width: 900px;
        }
        .admin-modal .tab-bar {
            display: flex;
            gap: 4px;
            border-bottom: 2px solid #e0e6ee;
            margin-bottom: 24px;
            flex-wrap: wrap;
        }
        .admin-modal .tab-bar .tab-btn {
            padding: 10px 24px;
            font-size: 16px;
            font-weight: 600;
            border: none;
            background: transparent;
            cursor: pointer;
            color: #5a6a7a;
            border-bottom: 3px solid transparent;
            transition: color 0.2s, border-color 0.2s;
        }
        .admin-modal .tab-bar .tab-btn.active {
            color: #0b2a4a;
            border-bottom-color: #1a6e9e;
        }
        .admin-modal .tab-bar .tab-btn:hover {
            color: #0b2a4a;
        }
        .admin-modal .tab-content {
            display: none;
        }
        .admin-modal .tab-content.active {
            display: block;
        }
        .admin-modal .user-table-wrap {
            overflow-x: auto;
        }
        .admin-modal table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
        }
        .admin-modal table th {
            background: #eef4fa;
            color: #0b2a4a;
            font-weight: 700;
            padding: 12px 10px;
            text-align: left;
            border-bottom: 2px solid #d0dae6;
        }
        .admin-modal table td {
            padding: 10px 10px;
            border-bottom: 1px solid #eef2f7;
            vertical-align: middle;
        }
        .admin-modal table tr:hover td {
            background: #f8fafc;
        }
        .admin-modal .table-actions {
            display: flex;
            gap: 6px;
            flex-wrap: wrap;
        }
        .admin-modal .table-actions button {
            padding: 4px 12px;
            font-size: 12px;
            border: none;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
        }
        .admin-modal .btn-edit {
            background: #d4e6f1;
            color: #1a4a6e;
        }
        .admin-modal .btn-edit:hover {
            background: #b0d0e6;
        }
        .admin-modal .btn-balance {
            background: #fdebd0;
            color: #a04000;
        }
        .admin-modal .btn-balance:hover {
            background: #fad7a0;
        }
        .admin-modal .btn-delete {
            background: #fadbd8;
            color: #922b21;
        }
        .admin-modal .btn-delete:hover {
            background: #f5b7b1;
        }
        .admin-modal .add-btn {
            margin-top: 16px;
            padding: 10px 20px;
            background: #1a6e9e;
            color: #fff;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
        }
        .admin-modal .add-btn:hover {
            background: #0b4a72;
        }
        .admin-modal .admin-toolbar {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            margin-bottom: 16px;
            align-items: center;
        }
        .admin-modal .admin-toolbar button {
            padding: 8px 18px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
            font-size: 14px;
        }
        .admin-modal .admin-toolbar .btn-shuffle {
            background: #f39c12;
            color: #fff;
        }
        .admin-modal .admin-toolbar .btn-shuffle:hover {
            background: #d68910;
        }
        .admin-modal .admin-toolbar .btn-refresh {
            background: #1a6e9e;
            color: #fff;
        }
        .admin-modal .admin-toolbar .btn-refresh:hover {
            background: #0b4a72;
        }
        .admin-modal .question-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-top: 8px;
            max-height: 400px;
            overflow-y: auto;
        }
        .admin-modal .question-item {
            background: #f8fafc;
            border-radius: 12px;
            padding: 14px 18px;
            border: 1px solid #eef2f7;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
            flex-wrap: wrap;
        }
        .admin-modal .question-item .q-info {
            flex: 1;
            min-width: 200px;
        }
        .admin-modal .question-item .q-info .q-text {
            font-weight: 600;
            color: #0b2a4a;
            font-size: 15px;
        }
        .admin-modal .question-item .q-info .q-options {
            font-size: 13px;
            color: #5a6a7a;
            margin-top: 4px;
        }
        .admin-modal .question-item .q-info .q-options .opt-text {
            display: inline-block;
            margin-right: 8px;
        }
        .admin-modal .question-item .q-info .q-answer {
            font-size: 13px;
            color: #27ae60;
            font-weight: 600;
            margin-top: 2px;
        }
        .admin-modal .question-item .q-actions {
            display: flex;
            gap: 6px;
            flex-shrink: 0;
        }
        .admin-modal .question-item .q-actions button {
            padding: 4px 14px;
            font-size: 12px;
            border: none;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
        }
        .admin-modal .question-item .q-actions .btn-edit {
            background: #d4e6f1;
            color: #1a4a6e;
        }
        .admin-modal .question-item .q-actions .btn-edit:hover {
            background: #b0d0e6;
        }
        .admin-modal .question-item .q-actions .btn-delete {
            background: #fadbd8;
            color: #922b21;
        }
        .admin-modal .question-item .q-actions .btn-delete:hover {
            background: #f5b7b1;
        }
        .admin-modal .question-item .q-tag {
            font-size: 11px;
            background: #d4e6f1;
            color: #1a4a6e;
            padding: 2px 10px;
            border-radius: 20px;
            display: inline-block;
            margin-right: 6px;
        }

        /* ===== Toast ===== */
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

        /* ===== 响应式 ===== */
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
            .admin-modal .modal-card {
                max-width: 95%;
                padding: 24px 16px;
            }
            .quiz-modal .modal-card {
                max-width: 95%;
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
            .modal-card .form-actions {
                flex-direction: column;
            }
            .toast {
                padding: 12px 20px;
                font-size: 14px;
                white-space: normal;
            }
            .admin-modal table th,
            .admin-modal table td {
                padding: 6px 4px;
                font-size: 12px;
            }
            .admin-modal .table-actions button {
                font-size: 10px;
                padding: 2px 8px;
            }
            .admin-modal .question-item {
                flex-direction: column;
                align-items: stretch;
            }
            .admin-modal .question-item .q-actions {
                margin-top: 6px;
            }
            .admin-modal .admin-toolbar button {
                font-size: 12px;
                padding: 6px 14px;
            }
            .quiz-modal .quiz-options {
                grid-template-columns: 1fr;
            }
        }
        .text-muted {
            color: #8a9aaa;
            font-size: 13px;
        }
        .mt-8 {
            margin-top: 8px;
        }
        .flex-center {
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .text-center {
            text-align: center;
        }
        .w-full {
            width: 100%;
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
                <div><span>还没有账号？</span><span class="register-link" id="openRegisterBtn">立即注册</span></div>
                <div><span class="forgot-link" id="openForgotBtn">🔑 忘记密码？</span></div>
            </div>
        </div>
    </div>

    <!-- ============================================================
    注 册 模 态 框
    ============================================================ -->
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
            <div class="modal-error" id="regError"><span class="err-icon">⚠️</span><span id="regErrorMessage">错误信息</span></div>
            <div class="modal-success" id="regSuccess"><span>✅</span><span id="regSuccessMessage">注册成功！</span></div>
            <div class="form-actions">
                <button class="btn-cancel" id="closeRegisterBtn">取消</button>
                <button class="btn-primary" id="registerBtn">注 册</button>
            </div>
        </div>
    </div>

    <!-- ============================================================
    忘 记 密 码 模 态 框
    ============================================================ -->
    <div class="modal-overlay" id="forgotModal">
        <div class="modal-card">
            <div class="modal-title">🔑 重置密码</div>
            <div class="form-group">
                <label for="forgotUsername">账号</label>
                <input type="text" id="forgotUsername" placeholder="请输入您的账号" />
            </div>
            <div class="form-group">
                <label>身份验证</label>
                <div class="verify-question" style="background:#eef4fa;padding:12px 16px;border-radius:10px;font-size:15px;color:#0b2a4a;margin-bottom:10px;border-left:4px solid #1a6e9e;font-weight:500;">
                    ❓ 固局更高速度实验列车的车号是？
                </div>
                <input type="text" id="forgotVerify" placeholder="请输入答案" />
            </div>
            <div class="form-group">
                <label for="forgotNewPassword">新密码</label>
                <input type="password" id="forgotNewPassword" placeholder="请设置新密码（至少6个字符）" />
            </div>
            <div class="modal-error" id="forgotError"><span class="err-icon">⚠️</span><span id="forgotErrorMessage">错误信息</span></div>
            <div class="modal-success" id="forgotSuccess"><span>✅</span><span id="forgotSuccessMessage">密码已重置！</span></div>
            <div class="form-actions">
                <button class="btn-cancel" id="closeForgotBtn">取消</button>
                <button class="btn-primary" id="forgotBtn">重置密码</button>
            </div>
        </div>
    </div>

    <!-- ============================================================
    签 到 答 题 模 态 框
    ============================================================ -->
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
            <div class="form-actions" style="margin-top:16px;">
                <button class="btn-cancel" id="closeQuizBtn">关闭</button>
            </div>
        </div>
    </div>

    <!-- ============================================================
    管 理 面 板 模 态 框
    ============================================================ -->
    <div class="modal-overlay admin-modal" id="adminModal">
        <div class="modal-card">
            <div class="modal-title">⚙️ 管理面板</div>
            <div class="tab-bar">
                <button class="tab-btn active" data-tab="users">👥 用户管理</button>
                <button class="tab-btn" data-tab="scenery">📸 站车风采</button>
                <button class="tab-btn" data-tab="questions">📚 题库管理</button>
            </div>
            <!-- 用户管理 -->
            <div class="tab-content active" id="tabUsers">
                <div class="user-table-wrap">
                    <table>
                        <thead><tr><th>用户名</th><th>余额</th><th>操作</th></tr></thead>
                        <tbody id="userTableBody"></tbody>
                    </table>
                </div>
                <p class="text-muted mt-8">* 管理员可修改密码、余额，注销账号（不能注销自己）</p>
            </div>
            <!-- 站车风采 -->
            <div class="tab-content" id="tabScenery">
                <div class="scenery-list" id="sceneryAdminList"></div>
                <button class="add-btn" id="addSceneryBtn">➕ 新增风采</button>
            </div>
            <!-- 题库管理 -->
            <div class="tab-content" id="tabQuestions">
                <div class="admin-toolbar">
                    <button class="btn-shuffle" id="shuffleDailyBtn">🎲 一键换题</button>
                    <button class="btn-refresh" id="refreshQuestionsBtn">🔄 刷新列表</button>
                    <button class="add-btn" id="addQuestionBtn" style="margin:0;">➕ 新增题目</button>
                    <span style="font-size:13px;color:#7a8a9e;margin-left:4px;" id="questionCountInfo">共 0 题</span>
                </div>
                <div class="question-list" id="questionList"></div>
            </div>
            <div class="form-actions" style="margin-top:20px;">
                <button class="btn-cancel" id="closeAdminBtn" style="flex:1;">关闭</button>
            </div>
        </div>
    </div>

    <!-- ============================================================
    编 辑 风 采 模 态 框
    ============================================================ -->
    <div class="modal-overlay" id="editSceneryModal">
        <div class="modal-card">
            <div class="modal-title" id="editSceneryTitle">编辑风采</div>
            <input type="hidden" id="editSceneryId" value="" />
            <div class="form-group"><label>图标 (Emoji)</label><input type="text" id="editSceneryIcon" placeholder="例如 🏛️" /></div>
            <div class="form-group"><label>名称</label><input type="text" id="editSceneryName" placeholder="站点或车型名称" /></div>
            <div class="form-group"><label>描述</label><input type="text" id="editSceneryDesc" placeholder="简要描述" /></div>
            <div class="modal-error" id="editSceneryError"><span class="err-icon">⚠️</span><span id="editSceneryErrorMessage">错误信息</span></div>
            <div class="form-actions">
                <button class="btn-cancel" id="closeEditSceneryBtn">取消</button>
                <button class="btn-primary" id="saveSceneryBtn">保存</button>
            </div>
        </div>
    </div>

    <!-- ============================================================
    编 辑 题 目 模 态 框
    ============================================================ -->
    <div class="modal-overlay" id="editQuestionModal">
        <div class="modal-card" style="max-width:760px;">
            <div class="modal-title" id="editQuestionTitle">编辑题目</div>
            <input type="hidden" id="editQuestionId" value="" />
            <div class="form-group"><label>题目内容</label><textarea id="editQuestionText" rows="3" placeholder="请输入题目..."></textarea></div>
            <div class="form-group"><label>选项 (每行一个，至少6个，最多10个)</label><textarea id="editQuestionOptions" rows="8" placeholder="选项A&#10;选项B&#10;选项C&#10;..."></textarea></div>
            <div class="form-group"><label>正确答案 (填写对应字母，如 A、B、C...)</label><input type="text" id="editQuestionAnswer" placeholder="例如 A" style="max-width:120px;" /></div>
            <div class="modal-error" id="editQuestionError"><span class="err-icon">⚠️</span><span id="editQuestionErrorMessage">错误信息</span></div>
            <div class="form-actions">
                <button class="btn-cancel" id="closeEditQuestionBtn">取消</button>
                <button class="btn-primary" id="saveQuestionBtn">保存</button>
            </div>
        </div>
    </div>

    <!-- ============================================================
    首 页
    ============================================================ -->
    <div id="homePage">
        <nav class="navbar">
            <div class="brand"><span class="brand-icon">🚇</span><span>固原地铁</span><span class="brand-sub">· 售票系统</span></div>
            <div class="user-area">
                <div class="user-info">
                    <span class="user-name">👤 <span id="displayUsername">用户</span></span>
                    <span class="user-balance">💰 <span id="displayBalance">0.00</span></span>
                </div>
                <button class="logout-btn" id="logoutBtn">退出登录</button>
            </div>
        </nav>
        <div class="hero-banner"><h1>🚇 固原地铁欢迎您！</h1></div>
        <main class="home-main">
            <div class="welcome-banner">
                <div class="greeting">
                    <h2>👋 欢迎回来，<span class="highlight" id="greetingUser">用户</span></h2>
                    <p>固原地铁 · 智能售票系统 v3.0</p>
                </div>
                <div class="datetime" id="datetimeDisplay">
                    <span class="time" id="currentTime">--:--:--</span>
                    <span id="currentDate">----年--月--日</span>
                </div>
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

    <!-- ===== Toast 容器 ===== -->
    <div class="toast-container" id="toastContainer"></div>

    <!-- ============================================================
    JavaScript
    ============================================================ -->
    <script>
        (function() {
            'use strict';

            // ============================================================
            //  常量
            // ============================================================
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

            // ============================================================
            //  预置题库（约100道逻辑推理题）
            // ============================================================
            const DEFAULT_QUESTIONS = [
                // 1-10: 真假话 / 逻辑推理
                { id: 1, question: '有三个盒子，分别标有"苹果""香蕉""苹果和香蕉"。所有标签都贴错了。你只能从一个盒子中摸出一个水果，就能确定所有盒子的内容。你应该从哪个盒子摸？', options: ['标"苹果"的盒子',
                        '标"香蕉"的盒子', '标"苹果和香蕉"的盒子', '任意盒子都可以', '无法确定'
                    ], answer: 2 },
                { id: 2, question: '张三说："李四在说谎。"李四说："王五在说谎。"王五说："张三和李四都在说谎。"请问谁在说真话？', options: ['只有张三', '只有李四', '只有王五',
                        '张三和李四', '李四和王五'
                    ], answer: 1 },
                { id: 3, question: '一个岛上居住着骑士和骗子两种人。骑士只说真话，骗子只说假话。你遇到两个人A和B。A说："我们俩都是骗子。"B说："我们俩不都是骗子。"请问A和B分别是什么人？',
                    options: ['A骑士，B骗子', 'A骗子，B骑士', '都是骑士', '都是骗子', '无法确定'], answer: 1 },
                { id: 4, question: '有红、蓝、黄、绿四个球，分别放在四个盒子中。已知：红球不在1号盒；蓝球在2号盒或3号盒；黄球不在4号盒；绿球在1号盒。请问蓝球在几号盒？', options: ['1号', '2号',
                        '3号', '4号', '无法确定'
                    ], answer: 1 },
                { id: 5, question: '甲、乙、丙三人参加考试，成绩分别为优秀、良好、及格。已知：甲不是优秀；乙不是及格；如果甲是良好，则丙是优秀。请问丙的成绩是什么？', options: ['优秀', '良好',
                        '及格', '无法确定', '条件矛盾'
                    ], answer: 0 },
                { id: 6, question: '五个小朋友排成一排，已知：小华在小明左边；小刚在小华右边；小明在小刚左边；小红在最左边；小强不在最右边。请问从右到左第三个是谁？', options: ['小华', '小明',
                        '小刚', '小红', '小强'
                    ], answer: 0 },
                { id: 7, question: '一个密码由4位数字组成，每位数字可以是0-9。已知：第1位是第2位的一半；第2位比第3位大2；第3位是第4位的一半；第4位是第1位的2倍。请问密码是什么？',
                    options: ['1234', '2468', '3625', '4826', '无解'], answer: 4 },
                { id: 8, question: '有100个金币，分给10个人，每人至少分1个，且每人分到的数量都不同。请问最多的人至少分到几个？', options: ['10', '11', '12', '13', '14'],
                answer: 2 },
                { id: 9, question: '某班有40人，其中25人喜欢数学，20人喜欢语文，18人喜欢英语。已知有8人三门都喜欢，有5人三门都不喜欢。请问至少喜欢两门的有多少人？', options: ['8', '10',
                        '12', '15', '18'
                    ], answer: 2 },
                { id: 10, question: '甲乙两人进行乒乓球比赛，三局两胜制。甲每局获胜的概率是0.6。请问甲最终获胜的概率是多少？', options: ['0.36', '0.48', '0.6', '0.72',
                        '0.648'
                    ], answer: 4 },
                // 11-20: 数字/逻辑推理
                { id: 11, question: '数列 2, 6, 12, 20, 30, ? 的下一个数是什么？', options: ['36', '38', '40', '42', '44'],
                answer: 2 },
                { id: 12, question: '数列 1, 4, 9, 16, 25, ? 的下一个数是什么？', options: ['30', '32', '36', '40', '49'],
                answer: 2 },
                { id: 13, question: '数列 3, 7, 15, 31, 63, ? 的下一个数是什么？', options: ['95', '99', '127', '129', '131'],
                    answer: 2 },
                { id: 14, question: '数列 5, 10, 20, 40, 80, ? 的下一个数是什么？', options: ['100', '120', '140', '160', '180'],
                    answer: 3 },
                { id: 15, question: '数列 1, 1, 2, 3, 5, 8, 13, ? 的下一个数是什么？', options: ['18', '21', '25', '27', '30'],
                    answer: 1 },
                { id: 16, question: '数列 2, 5, 10, 17, 26, ? 的下一个数是什么？', options: ['35', '37', '39', '41', '43'],
                answer: 1 },
                { id: 17, question: '数列 1, 8, 27, 64, 125, ? 的下一个数是什么？', options: ['180', '196', '210', '216', '225'],
                    answer: 3 },
                { id: 18, question: '数列 2, 4, 8, 16, 32, ? 的下一个数是什么？', options: ['48', '56', '64', '72', '80'],
                answer: 2 },
                { id: 19, question: '数列 1, 3, 6, 10, 15, 21, ? 的下一个数是什么？', options: ['25', '27', '28', '30', '32'],
                    answer: 2 },
                { id: 20, question: '数列 4, 9, 16, 25, 36, ? 的下一个数是什么？', options: ['42', '44', '48', '49', '52'],
                answer: 3 },
                // 21-30: 条件推理
                { id: 21, question: '有红、黄、蓝、绿四种颜色的球各一个，分别放在A、B、C、D四个盒子中。已知：红球在A盒或B盒；黄球在C盒；蓝球不在A盒；绿球在D盒。请问红球在哪个盒子？',
                    options: ['A盒', 'B盒', 'C盒', 'D盒', '无法确定'], answer: 0 },
                { id: 22, question: '甲、乙、丙、丁四人参加比赛，名次为1-4名。已知：甲比乙名次高；丙比丁名次高；甲和丙名次相邻；乙不是最后一名。请问丁的名次是？', options: ['第1名', '第2名',
                        '第3名', '第4名', '无法确定'
                    ], answer: 3 },
                { id: 23, question: '有A、B、C、D、E五人排成一排，已知：A在B左边；C在D右边；E在A和C中间；B和D不相邻。请问最右边是谁？', options: ['A', 'B', 'C', 'D',
                        'E'
                    ], answer: 2 },
                { id: 24, question: '某公司有经理、副经理、主管、职员四个职位。已知：经理比副经理年长；主管比职员年长；副经理比主管年长；职员年龄是30岁。请问经理年龄可能是？', options: ['32岁',
                        '35岁', '38岁', '40岁', '45岁'
                    ], answer: 4 },
                { id: 25, question: '有红、白、蓝三顶帽子，三个人各戴一顶。他们每人能看到其他两人的帽子，但看不到自己的。A说："我不知道自己帽子的颜色。"B说："我也不知道。"C说："我知道。"请问C的帽子是什么颜色？',
                    options: ['红色', '白色', '蓝色', '无法确定', '条件矛盾'], answer: 2 },
                { id: 26, question: '甲乙丙丁四人中，一人是医生，一人是律师，一人是教师，一人是工程师。已知：甲和乙的年龄相同；丙比丁年龄大；医生的年龄比教师大；律师的年龄比工程师大；甲不是医生。请问谁是工程师？',
                    options: ['甲', '乙', '丙', '丁', '无法确定'], answer: 3 },
                { id: 27, question: '有五张牌，分别是A、2、3、4、5，正面朝下。已知：A在2的左边；3在4的右边；5在A和2中间；4在5的右边。请问从左到右的顺序是？', options: ['A 5 2 4 3',
                        'A 2 5 3 4', 'A 5 2 3 4', '2 5 A 4 3', '无法确定'
                    ], answer: 0 },
                { id: 28, question: '有6个盒子，编号1-6，每个盒子中有一个不同颜色的球。已知：红球在奇数号盒；蓝球在2号或4号；绿球不在6号；黄球在3号；白球在红球右边；黑球在绿球左边。请问白球在几号？',
                    options: ['4号', '5号', '6号', '无法确定', '条件矛盾'], answer: 1 },
                { id: 29, question: '甲、乙、丙三人，一个来自北京，一个来自上海，一个来自广州。已知：甲不是北京人；乙不是上海人；如果甲是广州人，那么丙是北京人；丙不是广州人。请问甲来自哪里？',
                    options: ['北京', '上海', '广州', '无法确定', '条件矛盾'], answer: 1 },
                { id: 30, question: '有7个连续整数，它们的和是49。请问这7个数中最中间的数是多少？', options: ['5', '6', '7', '8', '9'],
                answer: 2 },
                // 31-40: 更多逻辑
                { id: 31, question: '一个正方体的六个面分别涂有红、黄、蓝、绿、白、黑六种颜色。已知：红色对面是蓝色；黄色对面是绿色；白色和黑色相邻。请问白色对面是什么颜色？', options: ['红色',
                        '黄色', '蓝色', '绿色', '无法确定'
                    ], answer: 4 },
                { id: 32, question: '有8个球，其中一个比其他球重。用一架天平，最少称几次可以找出那个重球？', options: ['1次', '2次', '3次', '4次', '5次'],
                answer: 1 },
                { id: 33, question: '有12个球，其中一个重量异常（可能重也可能轻）。用一架天平，最少称几次可以找出异常球并判断其轻重？', options: ['2次', '3次', '4次', '5次',
                        '6次'
                    ], answer: 1 },
                { id: 34, question: '有红、黄、蓝、绿四种颜色的袜子各10只，混在一起。黑暗中至少摸出几只才能保证有一双同色的？', options: ['3只', '4只', '5只', '6只', '7只'],
                    answer: 2 },
                { id: 35, question: '有红、黄、蓝、绿四种颜色的手套各10只（左右手各5只），混在一起。黑暗中至少摸出几只才能保证有一双同色同手？', options: ['6只', '7只', '8只', '9只',
                        '10只'
                    ], answer: 2 },
                { id: 36, question: '一个两位数，十位数字与个位数字之和是9，将这个两位数倒过来后，新的数比原来的数大27。请问原来的数是？', options: ['36', '45', '54', '63',
                        '72'
                    ], answer: 0 },
                { id: 37, question: '一个三位数，百位数字是十位数字的2倍，十位数字是个位数字的3倍，且各位数字之和是16。请问这个三位数是？', options: ['421', '631', '842',
                        '963', '126'
                    ], answer: 2 },
                { id: 38, question: '有红、白、蓝三支球队进行足球比赛，每两队之间比赛一场。已知：红队胜了白队；白队胜了蓝队；红队没有胜蓝队。请问哪个队是冠军？', options: ['红队', '白队',
                        '蓝队', '无法确定', '没有冠军'
                    ], answer: 1 },
                { id: 39, question: '甲乙丙丁四人参加象棋比赛，每两人比赛一场，胜者得2分，平局各得1分，负者得0分。已知：甲得6分，乙得4分，丙得4分，丁得2分。请问甲和乙的比赛结果是什么？',
                    options: ['甲胜', '乙胜', '平局', '无法确定', '数据矛盾'], answer: 0 },
                { id: 40, question: '有5个连续自然数，它们的乘积是120。请问这5个数中最小的数是多少？', options: ['1', '2', '3', '4', '5'],
                answer: 0 },
                // 41-50: 综合推理
                { id: 41, question: '某班有50人，其中30人喜欢篮球，25人喜欢足球，20人喜欢排球。已知有10人三种都喜欢，有5人三种都不喜欢。请问至少喜欢两种的有多少人？', options: ['12',
                        '15', '18', '20', '25'
                    ], answer: 2 },
                { id: 42, question: '有红、黄、蓝、绿、白五个球，分别放在A、B、C、D、E五个盒子中。已知：红球在A或B；黄球在C；蓝球在D；绿球不在E；白球在红球右边。请问白球在哪个盒子？',
                    options: ['A', 'B', 'C', 'D', '无法确定'], answer: 3 },
                { id: 43, question: '甲乙两人玩猜数字游戏，甲想一个1-100之间的整数，乙来猜。甲会告诉乙"大了"或"小了"。乙采用二分法，最多猜几次一定能猜中？', options: ['5次', '6次',
                        '7次', '8次', '9次'
                    ], answer: 2 },
                { id: 44, question: '有8个外观完全相同的硬币，其中7个重量相同，1个较轻。用一架没有砝码的天平，最少称几次可以找出较轻的硬币？', options: ['1次', '2次', '3次',
                        '4次', '5次'
                    ], answer: 1 },
                { id: 45, question: '有15个外观完全相同的硬币，其中14个重量相同，1个较轻。用一架没有砝码的天平，最少称几次可以找出较轻的硬币？', options: ['2次', '3次', '4次',
                        '5次', '6次'
                    ], answer: 1 },
                { id: 46, question: '甲乙丙三人中，一人是工人，一人是农民，一人是军人。已知：甲比工人年龄大；乙和农民年龄相同；丙比军人年龄小；乙不是军人。请问谁是农民？', options: ['甲',
                        '乙', '丙', '无法确定', '条件矛盾'
                    ], answer: 1 },
                { id: 47, question: '有红、黄、蓝、绿四种颜色的珠子各若干个，分别放在四个袋子中，每个袋子中只有一种颜色。已知：红色袋子的珠子数是蓝色袋子的2倍；黄色袋子的珠子数是绿色袋子的3倍；红色和黄色袋子的珠子总数是30；蓝色和绿色袋子的珠子总数是20。请问红色袋子有多少珠子？',
                    options: ['8', '10', '12', '14', '16'], answer: 2 },
                { id: 48, question: '一个时钟的时针和分针在12点整重合，下一次重合是在什么时候？', options: ['12:05', '12:10', '12:15', '1:05',
                        '1:10'
                    ], answer: 3 },
                { id: 49, question: '有A、B、C、D、E五个人，每个人都说了关于其他人的一句话：A说："B是医生。"B说："C是律师。"C说："D是教师。"D说："E是工程师。"E说："A是医生。"已知只有一个人说了真话，且每个人的职业都不同。请问A的职业是什么？',
                    options: ['医生', '律师', '教师', '工程师', '无法确定'], answer: 4 },
                { id: 50, question: '有6个数字：1、2、3、4、5、6，将它们排成一个六位数，使得这个数能被所有数字整除。请问这个数最大是多少？', options: ['123456', '321654',
                        '432156', '543216', '654321'
                    ], answer: 0 },
                // 51-60: 更多
                { id: 51, question: '甲、乙、丙、丁、戊五人参加考试，成绩排名为1-5名。已知：甲不是第1名；乙比丙名次高；丁比戊名次高；甲和丁名次相邻；乙不是第5名。请问丙的名次是？',
                    options: ['第1名', '第2名', '第3名', '第4名', '第5名'], answer: 3 },
                { id: 52, question: '有红、白、蓝三顶帽子，三个人各戴一顶。他们知道只有一顶红帽子。A说："我不知道自己戴的什么帽子。"B说："我也不知道。"C说："我知道了。"请问C戴的是什么帽子？',
                    options: ['红帽', '白帽', '蓝帽', '无法确定', '条件矛盾'], answer: 0 },
                { id: 53, question: '某班有男生和女生共50人。男生中喜欢篮球的占60%，女生中喜欢篮球的占40%。已知全班喜欢篮球的占52%。请问男生有多少人？', options: ['20人', '25人',
                        '30人', '35人', '40人'
                    ], answer: 2 },
                { id: 54, question: '有红、黄、蓝三种颜色的球各若干个，总数是100个。红球比黄球多10个，蓝球比红球少5个。请问黄球有多少个？', options: ['25个', '30个', '35个',
                        '40个', '45个'
                    ], answer: 1 },
                { id: 55, question: '甲乙丙三人同时从A地出发去B地，甲的速度是乙的2倍，乙的速度是丙的3倍。已知甲比乙早到2小时，乙比丙早到3小时。请问甲用了多少小时到达？',
                    options: ['1小时', '1.5小时', '2小时', '2.5小时', '3小时'], answer: 0 },
                { id: 56, question: '有4个连续偶数，它们的和是52。请问其中最大的偶数是多少？', options: ['12', '14', '16', '18', '20'],
                answer: 2 },
                { id: 57, question: '有5个连续奇数，它们的和是75。请问其中最小的奇数是多少？', options: ['9', '11', '13', '15', '17'],
                answer: 1 },
                { id: 58, question: '甲乙两人比赛跑步，甲跑100米用10秒，乙跑100米用12秒。如果甲让乙先跑10米，然后甲开始追，请问甲追上乙时跑了多少米？', options: ['40米', '50米',
                        '60米', '70米', '80米'
                    ], answer: 1 },
                { id: 59, question: '有红、黄、蓝、绿四种颜色的卡片各一张，分别写上1、2、3、4四个数字。已知：红色卡片上的数字是黄色卡片的2倍；蓝色卡片上的数字是绿色卡片的2倍；红色卡片上的数字是蓝色卡片的2倍。请问绿色卡片上的数字是？',
                    options: ['1', '2', '3', '4', '无法确定'], answer: 0 },
                { id: 60, question: '甲乙两人玩石头剪刀布，两人出拳完全随机。请问甲获胜的概率是多少？（不考虑平局）', options: ['1/2', '1/3', '1/4', '1/6', '1/9'],
                    answer: 0 },
                // 61-70
                { id: 61, question: '有A、B、C、D四人，其中一人是骗子（只说假话），三人是骑士（只说真话）。A说："B是骗子。"B说："C是骑士。"C说："D是骗子。"D说："A是骑士。"请问谁是骗子？',
                    options: ['A', 'B', 'C', 'D', '无法确定'], answer: 2 },
                { id: 62, question: '有8个数字：1、2、3、4、5、6、7、8，将它们分成两组，使得两组数字之和相等。请问每组数字之和是多少？', options: ['15', '16', '17', '18',
                        '19'
                    ], answer: 3 },
                { id: 63, question: '甲乙丙三人合作完成一项工作，甲单独做需要10天，乙单独做需要15天，丙单独做需要30天。如果三人合作，需要多少天完成？', options: ['3天', '4天', '5天',
                        '6天', '7天'
                    ], answer: 2 },
                { id: 64, question: '有红、黄、蓝、绿、白五个人，分别住在1-5号房间。已知：红住在黄左边；蓝住在绿右边；白住在红和蓝中间；绿住在1号房间。请问白住在几号房间？',
                    options: ['2号', '3号', '4号', '5号', '无法确定'], answer: 1 },
                { id: 65, question: '甲乙丙丁四人中，一人是作家，一人是画家，一人是音乐家，一人是舞蹈家。已知：甲和乙的职业不同；丙和丁的职业不同；甲不是画家；乙不是音乐家；丙不是舞蹈家；丁不是作家。请问甲的职业是？',
                    options: ['作家', '画家', '音乐家', '舞蹈家', '无法确定'], answer: 2 },
                { id: 66, question: '有6个连续整数，它们的平方和是91。请问这6个数中最大的数是多少？', options: ['3', '4', '5', '6', '7'],
                answer: 3 },
                { id: 67, question: '甲乙两人玩投硬币游戏，甲投5次，乙投6次，比较正面朝上的次数。请问甲正面次数大于乙正面次数的概率是多少？', options: ['1/4', '1/3', '1/2', '2/3',
                        '3/4'
                    ], answer: 2 },
                { id: 68, question: '有红、黄、蓝、绿四种颜色的球各10个，混在一起。从中随机取出4个球，请问取出的球中至少有两种颜色的概率是多少？（用分数表示）', options: ['1/5', '1/4',
                        '1/3', '1/2', '2/3'
                    ], answer: 4 },
                { id: 69, question: '甲乙丙丁四人参加数学竞赛，成绩为90、85、80、75分。已知：甲比乙分数高；丙比丁分数高；甲和丙的分数差是5分；乙和丁的分数差也是5分。请问甲得了多少分？',
                    options: ['90', '85', '80', '75', '无法确定'], answer: 0 },
                { id: 70, question: '有7个连续自然数，它们的平均数是10。请问这7个数中最大的数是多少？', options: ['11', '12', '13', '14', '15'],
                    answer: 2 },
                // 71-80
                { id: 71, question: '有红、黄、蓝、绿、白、黑六种颜色的袜子各2只（共12只），混在一起。黑暗中至少摸出几只才能保证有一双同色的？', options: ['4只', '5只', '6只', '7只',
                        '8只'
                    ], answer: 2 },
                { id: 72, question: '甲乙两人从A、B两地同时出发相向而行，甲的速度是乙的1.5倍。两人在距A地60公里处相遇。请问A、B两地相距多少公里？', options: ['80', '100',
                        '120', '140', '160'
                    ], answer: 1 },
                { id: 73, question: '有4个数字：2、3、4、5，用这四个数字组成一个四位数，使得这个数能被9整除。请问这个数最大是多少？', options: ['2345', '2453', '3254',
                        '4325', '5432'
                    ], answer: 4 },
                { id: 74, question: '有红、黄、蓝、绿、白五个人排成一排，已知：红不在两端；黄在蓝左边；绿在白右边；红和黄相邻；绿和蓝不相邻。请问最中间是谁？', options: ['红', '黄',
                        '蓝', '绿', '白'
                    ], answer: 1 },
                { id: 75, question: '甲乙丙丁四人中，一人是数学老师，一人是语文老师，一人是英语老师，一人是科学老师。已知：甲和乙教的科目不同；丙和丁教的科目不同；甲不教数学；乙不教英语；丙不教科学；丁不教语文。请问乙教的科目是？',
                    options: ['数学', '语文', '英语', '科学', '无法确定'], answer: 2 },
                { id: 76, question: '有5个连续偶数，它们的和是90。请问其中最小的偶数是多少？', options: ['12', '14', '16', '18', '20'],
                answer: 1 },
                { id: 77, question: '甲乙丙三人年龄之和是60岁，甲比乙大3岁，乙比丙大3岁。请问甲多少岁？', options: ['18', '19', '20', '21', '22'],
                answer: 3 },
                { id: 78, question: '有红、黄、蓝、绿四种颜色的球，红球比黄球多，蓝球比绿球多，绿球比红球多。请问哪种颜色的球最多？', options: ['红色', '黄色', '蓝色', '绿色',
                        '无法确定'
                    ], answer: 2 },
                { id: 79, question: '甲乙两人共同完成一项工作，甲单独做需要8小时，乙单独做需要12小时。两人合作2小时后，剩下的由乙单独完成，还需要多少小时？', options: ['4小时', '5小时',
                        '6小时', '7小时', '8小时'
                    ], answer: 2 },
                { id: 80, question: '有6个数字：1、2、3、4、5、6，从中选出3个不同的数字组成一个三位数，使得这个数能被3整除。请问这样的三位数有多少个？', options: ['20', '30',
                        '40', '50', '60'
                    ], answer: 2 },
                // 81-90
                { id: 81, question: '甲乙丙丁戊五人参加象棋比赛，每两人比赛一场，胜者得2分，平局各得1分，负者得0分。已知：甲得8分，乙得6分，丙得4分，丁得2分，戊得0分。请问甲和乙的比赛结果是什么？',
                    options: ['甲胜', '乙胜', '平局', '无法确定', '数据矛盾'], answer: 0 },
                { id: 82, question: '有红、黄、蓝、绿、白五个盒子，每个盒子中有一个不同颜色的球。已知：红球在蓝球左边；黄球在白球右边；绿球在红球和蓝球中间；白球在绿球左边。请问从左到右的顺序是？',
                    options: ['红 绿 蓝 白 黄', '红 绿 蓝 黄 白', '白 绿 红 蓝 黄', '红 白 绿 蓝 黄', '无法确定'], answer: 0 },
                { id: 83, question: '甲乙丙三人中，一人是医生，一人是律师，一人是教师。已知：甲比医生年龄大；乙比教师年龄小；丙比律师年龄大；甲不是律师。请问谁是医生？', options: ['甲',
                        '乙', '丙', '无法确定', '条件矛盾'
                    ], answer: 1 },
                { id: 84, question: '有7个数字：1、2、3、4、5、6、7，从中选出4个不同的数字组成一个四位数，使得这个数能被5整除。请问这样的四位数有多少个？', options: ['120', '180',
                        '240', '360', '480'
                    ], answer: 2 },
                { id: 85, question: '甲乙两人比赛游泳，甲游100米用2分钟，乙游100米用3分钟。如果甲让乙先游50米，然后甲开始追，请问甲追上乙时游了多少米？', options: ['100米', '120米',
                        '150米', '180米', '200米'
                    ], answer: 2 },
                { id: 86, question: '有红、黄、蓝三种颜色的花各若干朵，总数是80朵。红花比黄花多20朵，蓝花比红花少10朵。请问黄花有多少朵？', options: ['15朵', '20朵', '25朵',
                        '30朵', '35朵'
                    ], answer: 2 },
                { id: 87, question: '甲乙丙丁四人中，一人是班长，一人是学习委员，一人是体育委员，一人是文艺委员。已知：甲和乙的职务不同；丙和丁的职务不同；甲不是班长；乙不是学习委员；丙不是体育委员；丁不是文艺委员。请问甲的职务是？',
                    options: ['班长', '学习委员', '体育委员', '文艺委员', '无法确定'], answer: 2 },
                { id: 88, question: '有5个连续整数，它们的乘积是0。请问这5个数中最大的数是多少？', options: ['2', '3', '4', '5', '无法确定'],
                    answer: 4 },
                { id: 89, question: '甲乙丙三人合作完成一项工作，甲的工作效率是乙的2倍，乙的工作效率是丙的3倍。如果三人合作，需要6天完成。请问甲单独做需要多少天？', options: ['8天',
                        '9天', '10天', '11天', '12天'
                    ], answer: 2 },
                { id: 90, question: '有红、黄、蓝、绿、白五个人，分别住在1-5号房间。已知：红住在黄左边；蓝住在绿右边；白住在红和蓝中间；绿住在5号房间。请问白住在几号房间？',
                    options: ['2号', '3号', '4号', '无法确定', '条件矛盾'], answer: 1 },
                // 91-100
                { id: 91, question: '甲乙两人玩数字游戏，甲说："我写的数加上10等于这个数的3倍。"乙说："我写的数减去10等于这个数的一半。"请问甲和乙写的数之和是多少？', options: ['15',
                        '18', '20', '22', '25'
                    ], answer: 2 },
                { id: 92, question: '有4个数字：1、2、3、4，用这四个数字组成一个四位数，使得这个数能被11整除。请问这个数最大是多少？', options: ['1234', '1243', '1342',
                        '2134', '2431'
                    ], answer: 3 },
                { id: 93, question: '甲乙丙丁四人中，一人是工人，一人是农民，一人是军人，一人是商人。已知：甲和乙的职业不同；丙和丁的职业不同；甲不是农民；乙不是军人；丙不是商人；丁不是工人。请问丙的职业是？',
                    options: ['工人', '农民', '军人', '商人', '无法确定'], answer: 2 },
                { id: 94, question: '有6个连续奇数，它们的和是72。请问其中最小的奇数是多少？', options: ['5', '7', '9', '11', '13'],
                answer: 1 },
                { id: 95, question: '甲乙丙三人参加数学竞赛，成绩分别为90、80、70分。已知：甲不是最高分；乙不是最低分；丙的分数是乙和甲的平均分。请问甲得了多少分？', options: ['90',
                        '80', '70', '无法确定', '条件矛盾'
                    ], answer: 1 },
                { id: 96, question: '有红、黄、蓝、绿、白、黑六种颜色的球各若干个，总数是120个。红球比黄球多10个，蓝球比绿球多10个，白球比黑球多10个，红球和蓝球总数是50个。请问白球有多少个？',
                    options: ['15', '20', '25', '30', '35'], answer: 2 },
                { id: 97, question: '甲乙两人从同一地点出发，甲向东走，乙向西走。甲的速度是3米/秒，乙的速度是4米/秒。5分钟后两人相距多少米？', options: ['2100米', '2400米',
                        '2700米', '3000米', '3300米'
                    ], answer: 0 },
                { id: 98, question: '有5个数字：2、3、5、7、11，从中选出3个不同的数字组成一个三位数，使得这个数能被7整除。请问这样的三位数有多少个？', options: ['2', '3', '4',
                        '5', '6'
                    ], answer: 3 },
                { id: 99, question: '甲乙丙丁四人中，一人是教授，一人是副教授，一人是讲师，一人是助教。已知：甲和乙的职称不同；丙和丁的职称不同；甲不是教授；乙不是副教授；丙不是讲师；丁不是助教。请问乙的职称是？',
                    options: ['教授', '副教授', '讲师', '助教', '无法确定'], answer: 2 },
                { id: 100, question: '有8个连续整数，它们的和是100。请问其中最大的数是多少？', options: ['13', '14', '15', '16', '17'],
                    answer: 2 }
            ];

            // ============================================================
            //  存储工具
            // ============================================================
            function getTodayStr() { return new Date().toISOString().split('T')[0]; }

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

            // --- 题库 ---
            function loadQuestionBank() {
                try {
                    const raw = localStorage.getItem(QUESTION_BANK_KEY);
                    if (raw) { const d = JSON.parse(raw); if (Array.isArray(d) && d.length) return d; }
                } catch (_) {}
                localStorage.setItem(QUESTION_BANK_KEY, JSON.stringify(DEFAULT_QUESTIONS));
                return DEFAULT_QUESTIONS.slice();
            }

            function saveQuestionBank(qs) { localStorage.setItem(QUESTION_BANK_KEY, JSON.stringify(qs)); }

            function getNextQId(qs) { if (!qs.length) return 1; return Math.max(...qs.map(i => i.id)) + 1; }

            // --- 每日题目 ---
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
                if (!bank.length) return null;
                const today = getTodayStr();
                // 获取最近30天的题目ID
                const history = getGlobalQuestionHistory();
                const usedIds = history.slice(-30);
                const available = bank.filter(q => !usedIds.includes(q.id));
                if (!available.length) {
                    // 如果所有题都用过了，重置历史（仅保留今天的）
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

            // --- 全局题目历史（30天） ---
            function getGlobalQuestionHistory() {
                try {
                    const raw = localStorage.getItem('metro_global_q_history');
                    if (raw) { const d = JSON.parse(raw); if (Array.isArray(d)) return d; }
                } catch (_) {}
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

            // --- 签到数据（用户维度） ---
            function loadQuizData() {
                try { const raw = localStorage.getItem(QUIZ_STORAGE_KEY); if (raw) return JSON.parse(raw); } catch (_) {}
                return {};
            }

            function saveQuizData(d) { localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(d)); }

            function getUserQuizStatus(username) {
                const data = loadQuizData();
                const today = getTodayStr();
                if (!data[username]) {
                    data[username] = { date: today, signed: false, attempts: MAX_ATTEMPTS, questionId: null };
                    saveQuizData(data);
                }
                const u = data[username];
                if (u.date !== today) {
                    u.date = today;
                    u.signed = false;
                    u.attempts = MAX_ATTEMPTS;
                    u.questionId = null;
                    saveQuizData(data);
                }
                return u;
            }

            function updateUserQuizStatus(username, updates) {
                const data = loadQuizData();
                const today = getTodayStr();
                if (!data[username]) {
                    data[username] = { date: today, signed: false, attempts: MAX_ATTEMPTS, questionId: null };
                }
                if (data[username].date !== today) {
                    data[username] = { date: today, signed: false, attempts: MAX_ATTEMPTS, questionId: null };
                }
                Object.assign(data[username], updates);
                saveQuizData(data);
            }

            // --- 签到历史（永久记录，用于统计） ---
            function getSigninHistory(username) {
                try {
                    const raw = localStorage.getItem(SIGNIN_HISTORY_KEY);
                    if (raw) { const d = JSON.parse(raw); return d[username] || []; }
                } catch (_) {}
                return [];
            }

            function addSigninHistory(username, date) {
                let all = {};
                try { const raw = localStorage.getItem(SIGNIN_HISTORY_KEY); if (raw) all = JSON.parse(raw); } catch (_) {}
                if (!all[username]) all[username] = [];
                all[username].push(date);
                localStorage.setItem(SIGNIN_HISTORY_KEY, JSON.stringify(all));
            }

            // --- 站车风采 ---
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

            // 答题
            const quizModal = document.getElementById('quizModal');
            const quizQuestion = document.getElementById('quizQuestion');
            const quizOptions = document.getElementById('quizOptions');
            const quizDate = document.getElementById('quizDate');
            const quizAttempts = document.getElementById('quizAttempts');
            const quizStatusMsg = document.getElementById('quizStatusMsg');
            const quizResult = document.getElementById('quizResult');
            const closeQuizBtn = document.getElementById('closeQuizBtn');

            // 管理面板
            const adminModal = document.getElementById('adminModal');
            const closeAdminBtn = document.getElementById('closeAdminBtn');
            const userTableBody = document.getElementById('userTableBody');
            const sceneryAdminList = document.getElementById('sceneryAdminList');
            const addSceneryBtn = document.getElementById('addSceneryBtn');
            const questionList = document.getElementById('questionList');
            const shuffleDailyBtn = document.getElementById('shuffleDailyBtn');
            const refreshQuestionsBtn = document.getElementById('refreshQuestionsBtn');
            const addQuestionBtn = document.getElementById('addQuestionBtn');
            const questionCountInfo = document.getElementById('questionCountInfo');
            const tabBtns = document.querySelectorAll('.tab-btn');
            const tabContents = { users: document.getElementById('tabUsers'), scenery: document.getElementById(
                    'tabScenery'), questions: document.getElementById('tabQuestions') };

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
            let clockInterval = null;
            let quizActive = false;

            // ============================================================
            //  工具函数
            // ============================================================
            function formatDate(now) {
                const y = now.getFullYear();
                const m = String(now.getMonth() + 1).padStart(2, '0');
                const d = String(now.getDate()).padStart(2, '0');
                const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
                return y + '年' + m + '月' + d + '日 ' + weekdays[now.getDay()];
            }

            function formatTime(now) {
                return String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + ':' +
                    String(now.getSeconds()).padStart(2, '0');
            }

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
            }

            // ============================================================
            //  时钟
            // ============================================================
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

            function stopClock() { if (clockInterval) { clearInterval(clockInterval);
                    clockInterval = null; } }

            // ============================================================
            //  登录 / 登出
            // ============================================================
            function handleLogin(e) {
                e.preventDefault();
                const username = loginUsername.value.trim();
                const password = loginPassword.value.trim();
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

            function openRegisterModal() { clearRegisterForm();
                registerModal.classList.add('active'); }

            function closeRegisterModal() { registerModal.classList.remove('active');
                clearRegisterForm(); }

            function handleRegister() {
                const username = regUsername.value.trim();
                const password = regPassword.value.trim();
                const confirm = regConfirm.value.trim();
                const verify = regVerify.value.trim();
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

            // ============================================================
            //  忘记密码
            // ============================================================
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
                const username = forgotUsername.value.trim();
                const verify = forgotVerify.value.trim();
                const newPwd = forgotNewPassword.value.trim();
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

            // ============================================================
            //  签到 + 答题
            // ============================================================
            function updateSigninUI() {
                if (!currentUser || currentUser === 'admin') { signinEntry.style.display = 'none'; return; }
                signinEntry.style.display = 'block';
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
                const status = getUserQuizStatus(currentUser);
                if (status.signed) { showToast('今日已签到，明天再来吧！', '✅'); return; }
                if (status.attempts <= 0) { showToast('今日机会已用完，明天再来！', '❌'); return; }

                // 获取今日题目
                const dq = getDailyQuestionForToday();
                if (!dq) { showToast('题库为空，请联系管理员', '⚠️'); return; }

                // 如果用户今天还没有这道题，记录
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

                // 渲染选项
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

                // 禁用所有选项
                document.querySelectorAll('.opt-btn').forEach(b => b.classList.add('disabled'));

                // 标记正确与错误
                const btns = document.querySelectorAll('.opt-btn');
                btns.forEach((b, i) => {
                    if (i === q.answer) b.classList.add('correct');
                    if (i === idx && !correct) b.classList.add('wrong');
                });

                const newAttempts = status.attempts - 1;

                if (correct) {
                    // 签到成功
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
                    // 更新用户余额显示
                    const u2 = getUser(currentUser);
                    if (u2) displayBalance.textContent = formatBalance(u2.balance);
                    return;
                } else {
                    // 回答错误
                    updateUserQuizStatus(currentUser, { attempts: newAttempts });
                    const remaining = newAttempts;
                    quizAttempts.textContent = remaining;
                    if (remaining <= 0) {
                        // 机会用完
                        quizStatusMsg.textContent = '❌ 机会已用完，签到失败';
                        quizResult.className = 'quiz-result-box fail';
                        quizResult.style.display = 'block';
                        quizResult.textContent = '💔 两次机会均未答对，明天再来吧！';
                        quizActive = false;
                        updateSigninUI();
                        // 不显示正确答案
                    } else {
                        quizStatusMsg.textContent = '❌ 回答错误，剩余 ' + remaining + ' 次机会';
                        quizResult.className = 'quiz-result-box info';
                        quizResult.style.display = 'block';
                        quizResult.textContent = '再想想，还有 ' + remaining + ' 次机会！';
                        // 重新启用选项
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

            function closeQuizModal() {
                quizModal.classList.remove('active');
                quizActive = false;
                // 恢复UI
                if (currentUser) updateSigninUI();
            }

            // ============================================================
            //  管理面板 - 用户操作
            // ============================================================
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

            // ============================================================
            //  管理面板 - 站车风采
            // ============================================================
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
                const id = editSceneryId.value.trim();
                const icon = editSceneryIcon.value.trim();
                const name = editSceneryName.value.trim();
                const desc = editSceneryDesc.value.trim();
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

            // ============================================================
            //  管理面板 - 题库管理
            // ============================================================
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
                const id = editQuestionId.value.trim();
                const text = editQuestionText.value.trim();
                const optsRaw = editQuestionOptions.value.trim();
                const ansRaw = editQuestionAnswer.value.trim().toUpperCase();
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
            }

            function deleteQuestion(id) {
                let bank = loadQuestionBank();
                bank = bank.filter(i => i.id !== id);
                saveQuestionBank(bank);
                renderQuestionList();
                showToast('已删除', '🗑️');
            }

            // ============================================================
            //  管理员：一键换题
            // ============================================================
            function shuffleDailyQuestion() {
                if (currentUser !== 'admin') { showToast('权限不足', '⛔'); return; }
                const bank = loadQuestionBank();
                if (!bank.length) { showToast('题库为空', '⚠️'); return; }
                // 获取最近30天
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

            // ============================================================
            //  站车风采浏览（普通用户）
            // ============================================================
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

            // ============================================================
            //  管理面板打开/关闭
            // ============================================================
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

            // ============================================================
            //  检查登录状态
            // ============================================================
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

            // ============================================================
            //  事件绑定
            // ============================================================
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

            // 快捷功能
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

            // 答题
            closeQuizBtn.addEventListener('click', closeQuizModal);
            quizModal.addEventListener('click', function(e) { if (e.target === this) closeQuizModal(); });

            // 管理面板
            closeAdminBtn.addEventListener('click', closeAdminPanel);
            adminModal.addEventListener('click', function(e) { if (e.target === this) closeAdminPanel(); });
            tabBtns.forEach(btn => {
                btn.addEventListener('click', function() { switchTab(this.dataset.tab); });
            });

            // 风采编辑
            addSceneryBtn.addEventListener('click', function() { openEditScenery(null); });
            closeEditSceneryBtn.addEventListener('click', closeEditScenery);
            saveSceneryBtn.addEventListener('click', saveSceneryItem);
            editSceneryModal.addEventListener('click', function(e) { if (e.target === this) closeEditScenery(); });

            // 题库管理
            shuffleDailyBtn.addEventListener('click', shuffleDailyQuestion);
            refreshQuestionsBtn.addEventListener('click', renderQuestionList);
            addQuestionBtn.addEventListener('click', function() { openEditQuestion(null); });
            closeEditQuestionBtn.addEventListener('click', closeEditQuestion);
            saveQuestionBtn.addEventListener('click', saveQuestionItem);
            editQuestionModal.addEventListener('click', function(e) { if (e.target === this) closeEditQuestion(); });

            // 登录页输入框焦点清除错误
            loginUsername.addEventListener('focus', function() { loginError.classList.remove('show'); });
            loginPassword.addEventListener('focus', function() { loginError.classList.remove('show'); });

            // ============================================================
            //  初始化
            // ============================================================
            (function init() {
                // 确保admin存在
                const users = loadUsers();
                if (!users.admin) { users.admin = { password: PRESET_USER.password, balance: PRESET_USER.balance };
                    saveUsers(users); }
                // 确保题库存在
                const bank = loadQuestionBank();
                if (!bank.length) { saveQuestionBank(DEFAULT_QUESTIONS); }
                // 确保每日题目存在
                const dq = getDailyQuestionForToday();
                if (!dq) { pickDailyQuestion(); }
                // 确保站车风采存在
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

                // 如果当前用户是普通用户，更新签到UI
                if (currentUser && currentUser !== 'admin') updateSigninUI();

                // 在后台确保今日题目存在
                if (!getDailyQuestion()) pickDailyQuestion();
            })();

        })();
    </script>
</body>
</html>
