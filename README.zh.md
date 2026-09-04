# @deepseek-ai/dsh-client-ui-glass

DSH Web 客户端的自包含可开关玻璃皮肤，移植自无限智能画布「单一母材质」体系（光晕舞台、四层材质、Tier A 顶级交互）。插件是唯一决策者：在原版 DSH 与已消费其 token 契约的构建上表现一致。

## 截图

![会话视图（背板光晕开启）](docs/screenshots/main.png)
![会话视图（纯黑背板）](docs/screenshots/main-plain.png)
![设置（背板光晕开启）](docs/screenshots/settings.png)
![设置（背板光晕关闭）](docs/screenshots/settings-plain.png)

## 主题如何由插件决定

- 挂载时在 `<html>` 设置 `data-dsh-av-glass`；全局样式表每条规则都以该属性为前缀，关闭开关（或卸载插件）即精确恢复原生界面。
- 样式表改写全应用约 80 个 `--dsw-alias-*` 别名 token，并覆盖全局 chrome 规则（按钮、输入、弹层、卡片、页签、滚动条、选区、焦点）；所有卡片类选择器使用 token 精确匹配，避免撞名误伤。
- Tier A 顶级控件由运行时打标（`data-av-interaction="top"`），悬停出现扫光与指针跟随光斑；无空闲动画，尊重 `prefers-reduced-motion`。
- 单暗色调色板：两种外观都解析为画布暗色玻璃。

## 本地安装（DSH 本地插件）

```powershell
git clone <本仓库> "<dsh-root>\.dsh\plugins\@deepseek-ai\dsh-client-ui-glass"
New-Item -ItemType Junction -Path '<dsh-root>\.dsh\profiles\node_modules\@deepseek-ai\dsh-client-ui-glass' -Target '<dsh-root>\.dsh\plugins\@deepseek-ai\dsh-client-ui-glass'
# 在 <dsh-root>\.dsh\profiles\web\cordis.patch.yml 追加：
# - insert:
#     - id: ui-glass
#       name: '@deepseek-ai/dsh-client-ui-glass'
```

重启 DSH Web。开关在 设置 → 通用设置 → 玻璃模式。

## 构建

```sh
node <dsh-root>/node_modules/tsdown/dist/run.mjs   # 在本目录执行
```
