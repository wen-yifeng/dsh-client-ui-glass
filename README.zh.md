# Glass for DSH Web

[![Release](https://img.shields.io/github/v/release/wen-yifeng/dsh-client-ui-glass)](https://github.com/wen-yifeng/dsh-client-ui-glass/releases/latest)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20Linux%20%7C%20macOS-blue)](#安装)

[English](README.md) | 中文

[DeepSeek Harness（DSH）](https://github.com/deepseek-ai/deepseek-harness) Web 客户端的可开关暗色玻璃拟态皮肤：壁纸舞台上一整面磨砂玻璃面板，以 DSH 本地插件方式安装。随时开关；卸载后界面完全复原，不留任何残余。

![主界面](docs/screenshots/main.jpg)

## 特性

- **全局磨砂暗色玻璃** —— 通过宿主主题系统覆盖约 60 个设计 token，所有面板、对话框、控件统一呈现玻璃质感。
- **Aura 壁纸舞台** —— 内置 9 张壁纸衬在应用背后（磨砂面板透过 `backdrop-filter` 采样它），支持上传自定义图片、可选模糊。
- **一个总开关** —— 位于 **设置 → 通用设置 → 玻璃模式**，默认开启。关掉（或卸载插件）即恢复原生 UI，不残留任何 DOM、样式或全局状态。
- **设置快捷键** —— 任意界面按单键（默认 <kbd>Z</kbd>，可改绑）直接打开设置对话框。
- **状态跨刷新保留** —— 开关与壁纸存在浏览器存储（IndexedDB）中，重载自动恢复。

| | | |
|---|---|---|
| ![](docs/screenshots/stage-black.jpg) | ![](docs/screenshots/wallpaper-gray.jpg) | ![](docs/screenshots/wallpaper-mars.jpg) |
| 纯黑背板 | 灰调壁纸 | 火星 |
| ![](docs/screenshots/wallpaper-mars-bright.jpg) | ![](docs/screenshots/wallpaper-earth.jpg) | ![](docs/screenshots/wallpaper-earth-close.jpg) |
| 火星 · 亮 | 地球 | 地球 · 近景 |
| ![](docs/screenshots/wallpaper-dune.jpg) | ![](docs/screenshots/wallpaper-mountain.jpg) | ![](docs/screenshots/wallpaper-lake.jpg) |
| 沙丘 | 群山 | 湖畔倒影 |

![设置](docs/screenshots/settings.jpg)

## 环境要求

- 本地安装的 [DSH](https://github.com/deepseek-ai/deepseek-harness) 及其 Web 客户端（针对 0.1.5 一代测试；`<dsh-root>/.dsh/profiles` 目录需已存在，首次启动后即有）。
- Windows 自带 PowerShell（无需管理员——链接使用 junction），Linux/macOS 任意 POSIX shell。

## 安装

仓库内自带构建产物（`lib/` 已预构建，无需编译）。

**第 1 步 —— 拿到插件。** 克隆本仓库，或只下载安装脚本：

```powershell
git clone https://github.com/wen-yifeng/dsh-client-ui-glass.git
cd dsh-client-ui-glass
```

**第 2 步 —— 运行安装器**（指向你的 dsh 根目录；不在克隆里运行时脚本也会自行下载 release zip）：

```powershell
.\install.ps1 -DshRoot C:\path\to\dsh        # Windows
```
```bash
./install.sh /path/to/dsh                    # Linux / macOS
```

**第 3 步 —— 重启 DSH Web。** 皮肤立即生效；壁纸、模糊、快捷键都在 **设置 → 通用设置 → 玻璃模式**。

想手动装？[手动安装](#手动安装) 列出了脚本做的三件事。

## 手动安装

安装器只在 `<dsh-root>/.dsh` 里做三件事：

1. **放置插件** 到 `plugins/@deepseek-ai/dsh-client-ui-glass/`（克隆或解压到该处）。
2. **链接进 profile**，让插件加载器能解析包名 —— 从 `profiles/node_modules/@deepseek-ai/dsh-client-ui-glass` 建 junction/符号链接指向插件目录：

   ```powershell
   New-Item -ItemType Junction -Path '<dsh-root>\.dsh\profiles\node_modules\@deepseek-ai\dsh-client-ui-glass' -Target '<dsh-root>\.dsh\plugins\@deepseek-ai\dsh-client-ui-glass'
   ```

3. **注册插件** 到 web profile 的补丁层 `<dsh-root>/.dsh/profiles/web/cordis.patch.yml`（文件不存在就创建）：

   ```yaml
   - insert:
       - id: ui-glass
         name: '@deepseek-ai/dsh-client-ui-glass'
   ```

## 卸载

1. 删除 `profiles/node_modules/@deepseek-ai/dsh-client-ui-glass` 这个 junction/符号链接。
2. 删除 `plugins/@deepseek-ai/dsh-client-ui-glass/` 目录。
3. 从 `profiles/web/cordis.patch.yml` 里移除 `ui-glass` 那一行。

重启 DSH Web 即恢复原生 UI；浏览器侧的壁纸/开关存储可在玻璃模式卡片里清除。

## 工作原理

插件是双面 cordis 插件：node 半侧注册 `ui-av-glass` 设置命名空间；浏览器半侧负责视觉 —— 宿主主题栈里的别名 token 覆盖层、以 `html[data-dsh-av-glass]` 为开关的全局玻璃样式表、以及盖在原生 DOM 上的 seam 属性（幂等、绘制前、由单个共享 MutationObserver 驱动），从而不改动任何宿主包即可定位面板。壁纸舞台是应用背后的固定层，面板磨砂透过 `backdrop-filter` 采样它。启用期间皮肤强制 `color-scheme: dark` —— 关闭皮肤前，外观偏好不会有可见效果。

## 从源码构建

`src/` 是插件包在 dsh monorepo（[deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) 的 `packages/client/ui-glass`）中的原样副本，在 monorepo 内用其工具链构建。仓库内的 `tsdown.config.mjs` 记录了浏览器 bundle 的独立构建契约（module-table 工厂产物 + lightningcss 内联样式表），但在 monorepo 之外重建需要 dsh 的构建依赖。

## 许可

[MIT](LICENSE)
