# 工作管理台（桌面版）

这是把你现有的单文件网页（index.html）封装成 **Windows 可安装桌面应用** 的 Electron 工程。

## 你将得到什么
- 一个真正的“本地软件”（可安装、独立窗口、开始菜单/桌面快捷方式）。
- 数据本地保存（Chromium 存储区），不会再受 `file://` 双击导致的 localStorage 不稳定影响。

## 一键构建 Windows 安装包（推荐）
> 只需要一次性安装 Node.js（LTS 版）。

1. 安装 Node.js（LTS）。
2. 解压本项目到任意文件夹。
3. 在该文件夹空白处 **Shift + 右键** → “在此处打开 PowerShell”。
4. 执行：

```bash
npm install
npm run dist
```

5. 等构建完成后，安装包在：
- `dist/` 目录下（`.exe` 安装程序，NSIS）。

## 开发运行（无需打包）

```bash
npm install
npm start
```

## 数据存放位置（Windows）
Electron 会把本地数据放在用户目录下（类似）：
- `%APPDATA%\\工作管理台`（具体以 Electron 版本为准）

## 说明
- 已移除 Google Fonts 外链，离线也能使用。
- 主进程使用 `app://` 自定义协议，避免 `file://` 下存储不一致问题。
