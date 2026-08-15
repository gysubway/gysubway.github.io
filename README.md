<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>固原地铁 · 售票系统</title>
    <!-- 行楷字体 -->
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

        /* ============================================================
               模态框通用
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
            max-width: 680px;
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
        .modal-card input[type="number"] {
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

        /* ============================================================
               签到选择题样式
               ============================================================ */
        .quiz-options {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin: 16px 0;
        }

        .quiz-options .option {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 18px;
            background: #f8fafc;
            border: 2px solid #eef2f7;
            border-radius: 10px;
            cursor: pointer;
            transition: background 0.2s, border-color 0.2s;
        }

        .quiz-options .option:hover {
            background: #eef4fa;
            border-color: #c8d8e8;
        }

        .quiz-options .option.selected {
            border-color: #1a6e9e;
            background: #d4e6f1;
        }

        .quiz-options .option .letter {
            font-weight: 700;
            color: #1a6e9e;
            min-width: 24px;
        }

        .quiz-options .option .text {
            color: #1a2a3a;
            font-size: 15px;
        }

        .quiz-options .option.correct {
            border-color: #2ecc71;
            background: #d5f5e3;
        }

        .quiz-options .option.wrong {
            border-color: #d94a4a;
            background: #fadbd8;
        }

        .quiz-result {
            margin-top: 16px;
            padding: 12px 16px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            display: none;
        }

        .quiz-result.success {
            display: block;
            background: #d5f5e3;
            color: #1a7a4a;
        }

        .quiz-result.fail {
            display: block;
            background: #fadbd8;
            color: #922b21;
        }

        .quiz-result.info {
            display: block;
            background: #d4e6f1;
            color: #1a4a6e;
        }

        /* ============================================================
               首页样式
               ============================================================ */
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

        /* 快捷功能 */
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

        /* ============================================================
               管理面板
               ============================================================ */
        .admin-modal .modal-card {
            max-width: 820px;
        }

        .admin-modal .tab-bar {
            display: flex;
            gap: 4px;
            border-bottom: 2px solid #e0e6ee;
            margin-bottom: 24px;
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

        .admin-modal .scenery-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-top: 8px;
        }

        .admin-modal .scenery-item-admin {
            background: #f8fafc;
            border-radius: 12px;
            padding: 14px 18px;
            border: 1px solid #eef2f7;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 8px;
        }

        .admin-modal .scenery-item-admin .info {
            display: flex;
            align-items: center;
            gap: 12px;
            flex: 1;
            min-width: 150px;
        }

        .admin-modal .scenery-item-admin .info .icon {
            font-size: 28px;
        }

        .admin-modal .scenery-item-admin .info .name {
            font-weight: 700;
            color: #0b2a4a;
        }

        .admin-modal .scenery-item-admin .info .desc {
            color: #5a6a7a;
            font-size: 13px;
        }

        .admin-modal .scenery-item-admin .actions {
            display: flex;
            gap: 6px;
        }

        .admin-modal .scenery-item-admin .actions button {
            padding: 4px 14px;
            font-size: 12px;
            border: none;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
        }

        .admin-modal .scenery-item-admin .actions .btn-edit {
            background: #d4e6f1;
            color: #1a4a6e;
        }
        .admin-modal .scenery-item-admin .actions .btn-edit:hover {
            background: #b0d0e6;
        }
        .admin-modal .scenery-item-admin .actions .btn-delete {
            background: #fadbd8;
            color: #922b21;
        }
        .admin-modal .scenery-item-admin .actions .btn-delete:hover {
            background: #f5b7b1;
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
            .admin-modal .modal-card {
                max-width: 95%;
                padding: 24px 16px;
            }
            .modal-card {
                max-width: 95%;
                padding: 24px 16px;
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
                padding: 20px 12px;
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
            .admin-modal .scenery-item-admin {
                flex-direction: column;
                align-items: stretch;
            }
            .admin-modal .scenery-item-admin .info {
                flex-wrap: wrap;
            }
            .quiz-options .option {
                padding: 10px 14px;
                font-size: 14px;
            }
        }

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
                <div class="verify-question">
                    ❓ 固局更高速度实验列车的车号是？
                </div>
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

    <!-- ============================================================
    签 到 选 择 题 模 态 框
    ============================================================ -->
    <div class="modal-overlay" id="signinModal">
        <div class="modal-card">
            <div class="modal-title">📝 每日签到 · 逻辑挑战</div>

            <div class="form-group">
                <div style="display:flex;justify-content:space-between;font-size:14px;color:#5a6a7a;margin-bottom:12px;">
                    <span>🧠 今日题目</span>
                    <span>剩余机会: <strong id="signinAttempts">2</strong></span>
                </div>
                <div id="questionText" style="font-size:17px;font-weight:500;color:#0b2a4a;padding:6px 0 12px 0;">
                    <!-- 题目由JS填充 -->
                </div>
                <div class="quiz-options" id="quizOptions">
                    <!-- 选项由JS动态生成 -->
                </div>
                <div class="quiz-result" id="quizResult"></div>
            </div>

            <div class="form-actions">
                <button class="btn-cancel" id="closeSigninBtn">关闭</button>
                <button class="btn-primary" id="submitQuizBtn">提交答案</button>
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
            </div>

            <div class="tab-content active" id="tabUsers">
                <div class="user-table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>用户名</th>
                                <th>余额</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody id="userTableBody">
                        </tbody>
                    </table>
                </div>
                <p class="text-muted mt-8">* 管理员可修改密码、余额，注销账号（不能注销自己）</p>
            </div>

            <div class="tab-content" id="tabScenery">
                <div class="scenery-list" id="sceneryAdminList">
                </div>
                <button class="add-btn" id="addSceneryBtn">➕ 新增风采</button>
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
            //  数据常量
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

            const PRESET_USER = {
                username: 'admin',
                password: 'gysubway2026',
                balance: 1000000
            };

            const VERIFY_QUESTION = '固局更高速度实验列车的车号是？';
            const VERIFY_ANSWER = 'CRH380CM-0304';

            const SIGNIN_AMOUNT = 20;
            const MAX_ATTEMPTS = 2; // 每天两次机会

            // 大学生难度逻辑推理题库（6-10个选项）
            const QUIZ_QUESTIONS = [{
                id: 1,
                question: '在某个岛上，有两种居民：骑士（只说真话）和无赖（只说假话）。你遇到三个人A、B、C，他们分别说：\nA说：“我们三个人中至少有一个无赖。”\nB说：“A说的是真话。”\nC说：“B说的是假话。”\n请问以下哪个选项正确？',
                options: [
                    'A是骑士，B是无赖，C是骑士',
                    'A是无赖，B是骑士，C是无赖',
                    'A是骑士，B是骑士，C是无赖',
                    'A是无赖，B是无赖，C是骑士',
                    'A是骑士，B是无赖，C是无赖',
                    'A是无赖，B是骑士，C是骑士'
                ],
                correct: 2 // 索引从0开始，对应第三个选项（A骑士，B骑士，C无赖）
            }, {
                id: 2,
                question: '一个教授给三个学生各戴了一顶帽子，帽子颜色只有红或蓝。每个学生能看到其他两人的帽子颜色，但看不到自己的。教授说：“至少有一顶红帽子。”然后问A：“你知道自己的帽子颜色吗？”A说：“不知道。”又问B，B说：“不知道。”再问C，C说：“现在我知道了。”请问以下哪种情况是可能的？',
                options: [
                    '三顶都是红帽子',
                    '两顶红帽子一顶蓝帽子',
                    '一顶红帽子两顶蓝帽子',
                    '三顶都是蓝帽子',
                    'A和B是红，C是蓝',
                    'A和C是红，B是蓝',
                    'B和C是红，A是蓝'
                ],
                correct: 1 // 两红一蓝
            }, {
                id: 3,
                question: '有5个人排成一排，每人戴一顶帽子，帽子颜色为红、黄、蓝、绿、紫，每种颜色各一顶。已知：\n1. 红帽子在黄帽子的左边（不一定相邻）\n2. 蓝帽子在绿帽子的右边（不一定相邻）\n3. 紫帽子不在最右边\n4. 黄帽子不在最左边\n请问：以下哪个排列符合所有条件？',
                options: [
                    '红、紫、黄、蓝、绿',
                    '紫、红、绿、蓝、黄',
                    '绿、蓝、红、黄、紫',
                    '黄、红、紫、绿、蓝',
                    '红、蓝、紫、绿、黄',
                    '蓝、紫、红、黄、绿',
                    '绿、黄、红、紫、蓝',
                    '紫、蓝、绿、红、黄'
                ],
                correct: 0 // 第一个
            }, {
                id: 4,
                question: '某公司有四位员工甲、乙、丙、丁，他们分别来自北京、上海、广州、深圳（顺序不一定）。已知：\n1. 甲不是北京人\n2. 乙不是上海人\n3. 丙来自广州或深圳\n4. 丁来自上海或北京\n5. 如果甲来自上海，那么丙来自广州\n请问：以下哪个选项一定正确？',
                options: [
                    '甲来自上海，乙来自深圳',
                    '甲来自广州，乙来自北京',
                    '甲来自深圳，乙来自广州',
                    '甲来自广州，乙来自深圳',
                    '甲来自上海，乙来自广州',
                    '甲来自深圳，乙来自上海'
                ],
                correct: 3 // 甲广州，乙深圳
            }, {
                id: 5,
                question: '有一个逻辑谜题：三个盒子分别标有“苹果”、“橘子”和“苹果和橘子”。每个标签都贴错了。你只能从一个盒子里拿一个水果出来，然后就能正确判断每个盒子里装的是什么。你应该从哪个盒子拿？',
                options: [
                    '标有“苹果”的盒子',
                    '标有“橘子”的盒子',
                    '标有“苹果和橘子”的盒子',
                    '任意一个盒子都可以',
                    '必须同时从两个盒子拿'
                ],
                correct: 2 // 从“苹果和橘子”盒拿
            }, {
                id: 6,
                question: '一个村子里有100对夫妻，其中有些丈夫有外遇。妻子们都知道谁有外遇，但不会告诉对方。一天，村长说：“至少有一个丈夫有外遇。”如果每个妻子都推理能力极强，并且会当天杀掉有外遇的丈夫，那么第几天会有丈夫被杀？假设有n个丈夫有外遇。',
                options: [
                    '第1天',
                    '第n天',
                    '第100天',
                    '永远不会',
                    '第n+1天',
                    '第2n天'
                ],
                correct: 1 // 第n天
            }, {
                id: 7,
                question: '在一个教室里，有10个学生，每个学生都戴一顶帽子，帽子颜色为红或蓝。每个学生能看到其他9人的帽子颜色，但看不到自己的。老师问：“有人知道自己帽子的颜色吗？”连续问了9次，每次大家都说“不知道”，问第10次时，有人说“知道了”。请问：一共有多少顶红帽子？',
                options: [
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10'
                ],
                correct: 0 // 1顶红帽子
            }, {
                id: 8,
                question: '有两个数x和y，x+y=10，x和y都是正整数。甲知道x的值，乙知道y的值。他们进行如下对话：\n甲说：“我不知道x和y分别是什么。”\n乙说：“我知道你不知道。”\n甲说：“现在我知道了。”\n乙说：“现在我也知道了。”\n请问x和y分别是多少？',
                options: [
                    '1和9',
                    '2和8',
                    '3和7',
                    '4和6',
                    '5和5',
                    '6和4',
                    '7和3',
                    '8和2',
                    '9和1'
                ],
                correct: 3 // 4和6（根据推理，唯一满足条件）
            }, {
                id: 9,
                question: 'A、B、C、D四人在一场比赛中分别获得前四名。他们的教练说：“A不是第一，B不是第二，C不是第三，D不是第四。”实际上教练说的四个判断中只有一个是真的。请问以下哪个选项是正确的？',
                options: [
                    'A第一，B第二，C第三，D第四',
                    'A第二，B第一，C第四，D第三',
                    'A第三，B第四，C第一，D第二',
                    'A第四，B第三，C第二，D第一',
                    'A第一，B第三，C第二，D第四',
                    'A第二，B第四，C第一，D第三'
                ],
                correct: 2 // A第三，B第四，C第一，D第二
            }, {
                id: 10,
                question: '一个密码锁由三个数字组成，每个数字0-9。已知：\n1. 第一个数字是偶数\n2. 第二个数字是奇数\n3. 第三个数字是质数\n4. 三个数字互不相同\n5. 三个数字之和是12\n请问以下哪个组合符合所有条件？',
                options: [
                    '0,3,9',
                    '2,1,9',
                    '4,3,5',
                    '6,1,5',
                    '8,3,1',
                    '0,5,7',
                    '2,7,3',
                    '4,5,3'
                ],
                correct: 3 // 6,1,5 （6偶数，1奇数，5质数，互不相同，和12）
            }];

            // ============================================================
            //  存储工具
            // ============================================================

            const USER_STORAGE_KEY = 'metro_users_data';
            const SCENERY_STORAGE_KEY = 'metro_scenery_data';
            const SIGNIN_STORAGE_KEY = 'metro_signin_data';

            function loadUsers() {
                try {
                    const raw = localStorage.getItem(USER_STORAGE_KEY);
                    if (raw) {
                        const data = JSON.parse(raw);
                        if (!data.admin) {
                            data.admin = { password: PRESET_USER.password, balance: PRESET_USER.balance };
                        }
                        return data;
                    }
                } catch (_) {}
                const defaultData = { admin: { password: PRESET_USER.password, balance: PRESET_USER.balance } };
                localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(defaultData));
                return defaultData;
            }

            function saveUsers(users) {
                localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
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
                const DEFAULT_SCENERY = [
                    { id: 1, icon: '🏛️', name: '固原站', desc: '固原地铁1号线起点站，集交通、商业、文化于一体的综合枢纽，日均客流量超10万人次。' },
                    { id: 2, icon: '🏙️', name: '人民广场站', desc: '位于城市核心区，2号线与3号线换乘站，毗邻市政府与商业中心，是城市最繁忙的站点之一。' },
                    { id: 3, icon: '🌳', name: '古雁岭站', desc: '4号线站点，毗邻古雁岭生态公园，车站设计融入自然元素，被誉为"最美地铁站"。' },
                    { id: 4, icon: '🚄', name: 'CRH380 系列', desc: '高速动车组，最高运营时速380km/h，中国高铁的标杆车型，安全、舒适、快捷。' },
                    { id: 5, icon: '🚇', name: '固原地铁 A 型车', desc: '6节编组，最高时速80km/h，采用永磁同步电机与节能空调，绿色环保，噪音更低。' },
                    { id: 6, icon: '🛤️', name: '智慧运维系统', desc: '基于大数据与AI的列车智能运维平台，实时监测车辆状态，保障运营安全可靠。' }
                ];
                localStorage.setItem(SCENERY_STORAGE_KEY, JSON.stringify(DEFAULT_SCENERY));
                return DEFAULT_SCENERY.slice();
            }

            function saveScenery(items) {
                localStorage.setItem(SCENERY_STORAGE_KEY, JSON.stringify(items));
            }

            function getNextId(items) {
                if (!items.length) return 1;
                return Math.max(...items.map(i => i.id)) + 1;
            }

            // --- 签到数据 ---
            function getTodayStr() {
                return new Date().toISOString().split('T')[0];
            }

            function loadSigninData() {
                try {
                    const raw = localStorage.getItem(SIGNIN_STORAGE_KEY);
                    if (raw) {
                        return JSON.parse(raw);
                    }
                } catch (_) {}
                return {};
            }

            function saveSigninData(data) {
                localStorage.setItem(SIGNIN_STORAGE_KEY, JSON.stringify(data));
            }

            function getSigninStatus(username) {
                const data = loadSigninData();
                const today = getTodayStr();
                const userData = data[username] || {};
                if (userData.date !== today) {
                    return { date: today, attempts: MAX_ATTEMPTS, signed: false };
                }
                return { date: today, attempts: userData.attempts || MAX_ATTEMPTS, signed: userData.signed || false };
            }

            function updateSigninStatus(username, updates) {
                const data = loadSigninData();
                const today = getTodayStr();
                if (!data[username]) {
                    data[username] = { date: today, attempts: MAX_ATTEMPTS, signed: false };
                }
                if (data[username].date !== today) {
                    data[username] = { date: today, attempts: MAX_ATTEMPTS, signed: false };
                }
                Object.assign(data[username], updates);
                saveSigninData(data);
            }

            // --- 题库工具 ---
            function getTodayQuestion() {
                const today = new Date();
                const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
                const idx = dayOfYear % QUIZ_QUESTIONS.length;
                return QUIZ_QUESTIONS[idx];
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

            // 签到选择题
            const signinModal = document.getElementById('signinModal');
            const closeSigninBtn = document.getElementById('closeSigninBtn');
            const submitQuizBtn = document.getElementById('submitQuizBtn');
            const questionText = document.getElementById('questionText');
            const quizOptions = document.getElementById('quizOptions');
            const quizResult = document.getElementById('quizResult');
            const signinAttempts = document.getElementById('signinAttempts');

            // 管理面板
            const adminModal = document.getElementById('adminModal');
            const closeAdminBtn = document.getElementById('closeAdminBtn');
            const userTableBody = document.getElementById('userTableBody');
            const sceneryAdminList = document.getElementById('sceneryAdminList');
            const addSceneryBtn = document.getElementById('addSceneryBtn');
            const tabBtns = document.querySelectorAll('.tab-btn');
            const tabContents = {
                users: document.getElementById('tabUsers'),
                scenery: document.getElementById('tabScenery')
            };

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

            // Toast
            const toastContainer = document.getElementById('toastContainer');

            // 当前登录用户
            let currentUser = null;

            // 签到相关状态
            let selectedOptionIndex = -1;

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

            function showToast(message, icon) {
                icon = icon || 'ℹ️';
                const toast = document.createElement('div');
                toast.className = 'toast';
                toast.innerHTML = `<span class="toast-icon">${icon}</span> ${message}`;
                toastContainer.appendChild(toast);
                requestAnimationFrame(() => {
                    toast.classList.add('show');
                });
                setTimeout(() => {
                    toast.classList.remove('show');
                    setTimeout(() => {
                        if (toast.parentNode) toast.parentNode.removeChild(toast);
                    }, 400);
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
                            <div class="line-stations">${stationsHtml}</div>
                        `;
                    lineGrid.appendChild(card);
                });
            }

            function renderUserTable() {
                const users = loadUsers();
                const usernames = Object.keys(users);
                userTableBody.innerHTML = '';
                usernames.forEach(uname => {
                    const user = users[uname];
                    const tr = document.createElement('tr');
                    const balanceStr = formatBalance(user.balance);
                    let actions = '';
                    actions +=
                        `<button class="btn-edit" data-username="${uname}" data-action="changePwd">改密码</button>`;
                    actions +=
                        `<button class="btn-balance" data-username="${uname}" data-action="changeBalance">改余额</button>`;
                    if (uname !== 'admin') {
                        actions +=
                            `<button class="btn-delete" data-username="${uname}" data-action="delete">注销</button>`;
                    } else {
                        actions += `<span style="color:#aaa;font-size:12px;">(管理员)</span>`;
                    }
                    tr.innerHTML = `
                            <td><strong>${uname}</strong></td>
                            <td>${balanceStr}</td>
                            <td><div class="table-actions">${actions}</div></td>
                        `;
                    userTableBody.appendChild(tr);
                });
                userTableBody.querySelectorAll('[data-action]').forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        const action = this.dataset.action;
                        const username = this.dataset.username;
                        handleUserAction(action, username);
                    });
                });
            }

            function renderSceneryAdmin() {
                const items = loadScenery();
                sceneryAdminList.innerHTML = '';
                items.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'scenery-item-admin';
                    div.innerHTML = `
                            <div class="info">
                                <span class="icon">${item.icon}</span>
                                <span class="name">${item.name}</span>
                                <span class="desc">${item.desc}</span>
                            </div>
                            <div class="actions">
                                <button class="btn-edit" data-id="${item.id}">编辑</button>
                                <button class="btn-delete" data-id="${item.id}">删除</button>
                            </div>
                        `;
                    sceneryAdminList.appendChild(div);
                });
                sceneryAdminList.querySelectorAll('.btn-edit').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const id = parseInt(this.dataset.id);
                        openEditScenery(id);
                    });
                });
                sceneryAdminList.querySelectorAll('.btn-delete').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const id = parseInt(this.dataset.id);
                        if (confirm('确定要删除这条风采吗？')) {
                            deleteSceneryItem(id);
                        }
                    });
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
                    loginSuccess(username);
                } else {
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
                if (user) {
                    displayBalance.textContent = formatBalance(user.balance);
                }

                if (username === 'admin') {
                    adminEntry.style.display = 'block';
                } else {
                    adminEntry.style.display = 'none';
                }

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
                signinModal.classList.remove('active');
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

                regError.classList.remove('show');
                regSuccess.classList.remove('show');

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
                if (verify.trim().toUpperCase() !== VERIFY_ANSWER.toUpperCase()) {
                    regErrorMessage.textContent = '验证答案错误，请重新输入';
                    regError.classList.add('show');
                    regVerify.value = '';
                    regVerify.focus();
                    return;
                }

                const success = createUser(username, password);
                if (success) {
                    regSuccessMessage.textContent = '🎉 注册成功！即将自动登录...';
                    regSuccess.classList.add('show');
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
            //  忘记密码逻辑
            // ============================================================

            function openForgotModal() {
                forgotUsername.value = '';
                forgotVerify.value = '';
                forgotNewPassword.value = '';
                forgotError.classList.remove('show');
                forgotSuccess.classList.remove('show');
                forgotModal.classList.add('active');
            }

            function closeForgotModal() {
                forgotModal.classList.remove('active');
                forgotError.classList.remove('show');
                forgotSuccess.classList.remove('show');
            }

            function handleForgot() {
                const username = forgotUsername.value.trim();
                const verify = forgotVerify.value.trim();
                const newPwd = forgotNewPassword.value.trim();

                forgotError.classList.remove('show');
                forgotSuccess.classList.remove('show');

                if (!username) {
                    forgotErrorMessage.textContent = '请输入账号';
                    forgotError.classList.add('show');
                    return;
                }
                if (!userExists(username)) {
                    forgotErrorMessage.textContent = '该账号不存在';
                    forgotError.classList.add('show');
                    return;
                }
                if (username === 'admin') {
                    forgotErrorMessage.textContent = '管理员账号请通过其他方式重置';
                    forgotError.classList.add('show');
                    return;
                }
                if (!verify) {
                    forgotErrorMessage.textContent = '请回答验证问题';
                    forgotError.classList.add('show');
                    return;
                }
                if (verify.trim().toUpperCase() !== VERIFY_ANSWER.toUpperCase()) {
                    forgotErrorMessage.textContent = '验证答案错误，请重新输入';
                    forgotError.classList.add('show');
                    forgotVerify.value = '';
                    forgotVerify.focus();
                    return;
                }
                if (!newPwd || newPwd.length < 6) {
                    forgotErrorMessage.textContent = '新密码至少需要6个字符';
                    forgotError.classList.add('show');
                    return;
                }

                const ok = updateUser(username, { password: newPwd });
                if (ok) {
                    forgotSuccessMessage.textContent = '✅ 密码已重置，请使用新密码登录';
                    forgotSuccess.classList.add('show');
                    setTimeout(() => {
                        closeForgotModal();
                        showToast('密码已重置，请重新登录', '🔑');
                    }, 1500);
                } else {
                    forgotErrorMessage.textContent = '重置失败，请稍后重试';
                    forgotError.classList.add('show');
                }
            }

            // ============================================================
            //  签到选择题逻辑
            // ============================================================

            function updateSigninUI() {
                if (!currentUser || currentUser === 'admin') {
                    signinEntry.style.display = 'none';
                    return;
                }
                signinEntry.style.display = 'block';
                const status = getSigninStatus(currentUser);
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

            function openSigninModal() {
                if (!currentUser || currentUser === 'admin') {
                    showToast('普通用户专享', 'ℹ️');
                    return;
                }
                const status = getSigninStatus(currentUser);
                if (status.signed) {
                    showToast('今日已签到，明天再来吧！', '✅');
                    return;
                }
                if (status.attempts <= 0) {
                    showToast('今日挑战机会已用完，明天再来！', '❌');
                    return;
                }

                // 加载题目
                const question = getTodayQuestion();
                questionText.textContent = question.question;

                // 生成选项
                const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                quizOptions.innerHTML = '';
                question.options.forEach((opt, idx) => {
                    const div = document.createElement('div');
                    div.className = 'option';
                    div.dataset.index = idx;
                    div.innerHTML = `
                            <span class="letter">${letters[idx]}</span>
                            <span class="text">${opt}</span>
                        `;
                    div.addEventListener('click', function() {
                        // 移除其他选中
                        quizOptions.querySelectorAll('.option').forEach(el => el.classList.remove('selected'));
                        this.classList.add('selected');
                        selectedOptionIndex = parseInt(this.dataset.index);
                        // 隐藏旧结果
                        quizResult.className = 'quiz-result';
                        quizResult.style.display = 'none';
                    });
                    quizOptions.appendChild(div);
                });

                // 重置状态
                selectedOptionIndex = -1;
                quizResult.className = 'quiz-result';
                quizResult.style.display = 'none';
                signinAttempts.textContent = status.attempts;

                signinModal.classList.add('active');
            }

            function closeSigninModal() {
                signinModal.classList.remove('active');
                // 如果已签到，更新UI
                if (currentUser) {
                    const status = getSigninStatus(currentUser);
                    if (status.signed) {
                        updateSigninUI();
                        // 刷新余额
                        const user = getUser(currentUser);
                        if (user) {
                            displayBalance.textContent = formatBalance(user.balance);
                        }
                    }
                }
            }

            function handleSubmitQuiz() {
                if (selectedOptionIndex === -1) {
                    showToast('请先选择一个选项', '⚠️');
                    return;
                }

                const question = getTodayQuestion();
                const isCorrect = (selectedOptionIndex === question.correct);

                // 显示结果
                quizResult.style.display = 'block';
                if (isCorrect) {
                    quizResult.className = 'quiz-result success';
                    quizResult.textContent = '🎉 回答正确！签到成功！获得 ¥' + SIGNIN_AMOUNT;
                    // 标记已签到，增加余额
                    const user = getUser(currentUser);
                    if (user) {
                        const newBalance = (user.balance || 0) + SIGNIN_AMOUNT;
                        updateUser(currentUser, { balance: newBalance });
                        displayBalance.textContent = formatBalance(newBalance);
                    }
                    updateSigninStatus(currentUser, { signed: true });
                    // 禁用提交
                    submitQuizBtn.disabled = true;
                    submitQuizBtn.style.opacity = '0.6';
                    // 高亮正确选项
                    quizOptions.querySelectorAll('.option').forEach(el => {
                        const idx = parseInt(el.dataset.index);
                        if (idx === question.correct) {
                            el.classList.add('correct');
                        } else if (idx === selectedOptionIndex) {
                            el.classList.add('wrong');
                        }
                    });
                    updateSigninUI();
                    showToast('签到成功！+¥' + SIGNIN_AMOUNT, '💰');
                    // 自动关闭（稍后）
                    setTimeout(() => {
                        closeSigninModal();
                    }, 2500);
                } else {
                    // 错误
                    const remaining = getSigninStatus(currentUser).attempts - 1;
                    updateSigninStatus(currentUser, { attempts: remaining });
                    signinAttempts.textContent = remaining;
                    quizResult.className = 'quiz-result fail';
                    quizResult.textContent = '❌ 回答错误！剩余 ' + remaining + ' 次机会';
                    // 高亮错误选项
                    quizOptions.querySelectorAll('.option').forEach(el => {
                        const idx = parseInt(el.dataset.index);
                        if (idx === selectedOptionIndex) {
                            el.classList.add('wrong');
                        }
                        if (idx === question.correct) {
                            el.classList.add('correct');
                        }
                    });
                    // 禁用提交（防止再次点击）
                    submitQuizBtn.disabled = true;
                    submitQuizBtn.style.opacity = '0.6';
                    updateSigninUI();

                    if (remaining <= 0) {
                        showToast('今日机会已用完，明天再来吧', '❌');
                        setTimeout(() => {
                            closeSigninModal();
                        }, 2500);
                    } else {
                        // 允许用户重新尝试，但需要重置界面（可重新加载题目）
                        // 这里简单处理：延迟后重置界面让用户再试
                        setTimeout(() => {
                            // 重置选项高亮
                            quizOptions.querySelectorAll('.option').forEach(el => {
                                el.classList.remove('correct', 'wrong', 'selected');
                            });
                            quizResult.className = 'quiz-result';
                            quizResult.style.display = 'none';
                            submitQuizBtn.disabled = false;
                            submitQuizBtn.style.opacity = '1';
                            selectedOptionIndex = -1;
                            // 刷新剩余次数
                            signinAttempts.textContent = getSigninStatus(currentUser).attempts;
                        }, 1800);
                    }
                }
            }

            // ============================================================
            //  管理面板 - 用户操作
            // ============================================================

            function handleUserAction(action, username) {
                if (action === 'changePwd') {
                    const newPwd = prompt('请输入新密码（至少6个字符）：');
                    if (newPwd === null) return;
                    if (newPwd.length < 6) {
                        showToast('密码至少6个字符', '⚠️');
                        return;
                    }
                    const ok = updateUser(username, { password: newPwd });
                    if (ok) {
                        showToast(`用户 ${username} 密码已修改`, '✅');
                        renderUserTable();
                    } else {
                        showToast('修改失败', '❌');
                    }
                } else if (action === 'changeBalance') {
                    const input = prompt('请输入新的余额（数字）：');
                    if (input === null) return;
                    const val = parseFloat(input);
                    if (isNaN(val) || val < 0) {
                        showToast('请输入有效数字', '⚠️');
                        return;
                    }
                    const ok = updateUser(username, { balance: val });
                    if (ok) {
                        showToast(`用户 ${username} 余额已更新`, '✅');
                        renderUserTable();
                        if (username === currentUser) {
                            const user = getUser(username);
                            displayBalance.textContent = formatBalance(user.balance);
                        }
                    } else {
                        showToast('修改失败', '❌');
                    }
                } else if (action === 'delete') {
                    if (username === 'admin') {
                        showToast('不能注销管理员账号', '⚠️');
                        return;
                    }
                    if (confirm(`确定要注销用户 ${username} 吗？此操作不可恢复！`)) {
                        const ok = deleteUser(username);
                        if (ok) {
                            showToast(`用户 ${username} 已注销`, '🗑️');
                            renderUserTable();
                            if (username === currentUser) {
                                handleLogout();
                            }
                        } else {
                            showToast('注销失败', '❌');
                        }
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
                    editSceneryId.value = '';
                    editSceneryIcon.value = '';
                    editSceneryName.value = '';
                    editSceneryDesc.value = '';
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

            function closeEditScenery() {
                editSceneryModal.classList.remove('active');
                editSceneryError.classList.remove('show');
            }

            function saveSceneryItem() {
                const id = editSceneryId.value.trim();
                const icon = editSceneryIcon.value.trim();
                const name = editSceneryName.value.trim();
                const desc = editSceneryDesc.value.trim();

                editSceneryError.classList.remove('show');

                if (!name) {
                    editSceneryErrorMessage.textContent = '名称不能为空';
                    editSceneryError.classList.add('show');
                    return;
                }

                let items = loadScenery();
                if (id) {
                    const idx = items.findIndex(i => i.id === parseInt(id));
                    if (idx !== -1) {
                        items[idx] = { ...items[idx], icon, name, desc };
                        saveScenery(items);
                        showToast('风采已更新', '✅');
                    } else {
                        showToast('未找到该条目', '❌');
                        return;
                    }
                } else {
                    const newId = getNextId(items);
                    items.push({ id: newId, icon, name, desc });
                    saveScenery(items);
                    showToast('新增风采成功', '✅');
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
            //  站车风采展示（普通用户）
            // ============================================================

            function openSceneryViewer() {
                const modal = document.createElement('div');
                modal.className = 'modal-overlay active';
                modal.style.zIndex = '1000';
                const items = loadScenery();
                let html = `
                        <div class="modal-card" style="max-width:600px;">
                            <div class="modal-title">🚉 站车风采</div>
                            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:16px 0;">
                    `;
                items.forEach(item => {
                    html += `
                            <div style="background:#f8fafc;border-radius:14px;padding:16px 14px;border:1px solid #eef2f7;">
                                <span style="font-size:28px;display:block;margin-bottom:4px;">${item.icon}</span>
                                <div style="font-weight:700;font-size:16px;color:#0b2a4a;">${item.name}</div>
                                <div style="font-size:13px;color:#5a6a7a;margin-top:2px;line-height:1.4;">${item.desc}</div>
                            </div>
                        `;
                });
                html += `
                            </div>
                            <div class="form-actions">
                                <button class="btn-cancel" id="closeSceneryViewerBtn" style="flex:1;">关闭</button>
                            </div>
                        </div>
                    `;
                modal.innerHTML = html;
                document.body.appendChild(modal);
                modal.querySelector('#closeSceneryViewerBtn').addEventListener('click', function() {
                    modal.remove();
                });
                modal.addEventListener('click', function(e) {
                    if (e.target === this) modal.remove();
                });
            }

            // ============================================================
            //  管理面板打开/关闭
            // ============================================================

            function openAdminPanel() {
                if (currentUser !== 'admin') {
                    showToast('权限不足', '⛔');
                    return;
                }
                renderUserTable();
                renderSceneryAdmin();
                adminModal.classList.add('active');
                switchTab('users');
            }

            function closeAdminPanel() {
                adminModal.classList.remove('active');
            }

            function switchTab(tabName) {
                tabBtns.forEach(btn => {
                    const t = btn.dataset.tab;
                    btn.classList.toggle('active', t === tabName);
                });
                Object.keys(tabContents).forEach(key => {
                    tabContents[key].classList.toggle('active', key === tabName);
                });
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
                    if (user) {
                        displayBalance.textContent = formatBalance(user.balance);
                    }
                    if (username === 'admin') {
                        adminEntry.style.display = 'block';
                    } else {
                        adminEntry.style.display = 'none';
                    }
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

            // 登录
            loginForm.addEventListener('submit', handleLogin);
            loginPassword.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    loginForm.dispatchEvent(new Event('submit'));
                }
            });

            // 登出
            logoutBtn.addEventListener('click', handleLogout);

            // 注册
            openRegisterBtn.addEventListener('click', openRegisterModal);
            closeRegisterBtn.addEventListener('click', closeRegisterModal);
            registerBtn.addEventListener('click', handleRegister);
            registerModal.addEventListener('click', function(e) {
                if (e.target === this) closeRegisterModal();
            });
            regVerify.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') registerBtn.click();
            });

            // 忘记密码
            openForgotBtn.addEventListener('click', openForgotModal);
            closeForgotBtn.addEventListener('click', closeForgotModal);
            forgotBtn.addEventListener('click', handleForgot);
            forgotModal.addEventListener('click', function(e) {
                if (e.target === this) closeForgotModal();
            });
            forgotNewPassword.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') forgotBtn.click();
            });

            // 签到
            signinEntry.addEventListener('click', openSigninModal);
            closeSigninBtn.addEventListener('click', closeSigninModal);
            signinModal.addEventListener('click', function(e) {
                if (e.target === this) closeSigninModal();
            });
            submitQuizBtn.addEventListener('click', handleSubmitQuiz);

            // 快捷功能（非签到）
            document.querySelectorAll('.quick-action[data-action]').forEach(el => {
                el.addEventListener('click', function() {
                    const action = this.dataset.action;
                    if (action === 'ticket') {
                        showToast('购票功能开发中，敬请期待！', '🎟️');
                    } else if (action === 'line') {
                        showToast('线路查询功能开发中，敬请期待！', '🗺️');
                    } else if (action === 'scenery') {
                        openSceneryViewer();
                    } else if (action === 'admin') {
                        openAdminPanel();
                    }
                    // signin 已单独绑定
                });
            });

            // 管理面板
            closeAdminBtn.addEventListener('click', closeAdminPanel);
            adminModal.addEventListener('click', function(e) {
                if (e.target === this) closeAdminPanel();
            });
            tabBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const tab = this.dataset.tab;
                    switchTab(tab);
                });
            });

            // 编辑风采
            addSceneryBtn.addEventListener('click', function() {
                openEditScenery(null);
            });
            closeEditSceneryBtn.addEventListener('click', closeEditScenery);
            saveSceneryBtn.addEventListener('click', saveSceneryItem);
            editSceneryModal.addEventListener('click', function(e) {
                if (e.target === this) closeEditScenery();
            });

            // 登录页输入框焦点清除错误
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
                // 确保 admin 存在
                const users = loadUsers();
                if (!users.admin) {
                    users.admin = { password: PRESET_USER.password, balance: PRESET_USER.balance };
                    saveUsers(users);
                }

                // 确保站车风采存在
                const scenery = loadScenery();
                if (!scenery.length) {
                    // 默认数据已在 loadScenery 中写入
                }

                // 每日重置签到（在加载时自动清理过期数据）
                const signinData = loadSigninData();
                const today = getTodayStr();
                let changed = false;
                Object.keys(signinData).forEach(key => {
                    if (signinData[key].date !== today) {
                        signinData[key] = { date: today, attempts: MAX_ATTEMPTS, signed: false };
                        changed = true;
                    }
                });
                if (changed) {
                    saveSigninData(signinData);
                }

                const hasSession = checkSession();
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
