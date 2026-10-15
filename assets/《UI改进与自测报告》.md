# 《垃圾分类小达人》UI 改进与自测报告

> 依据 Web Interface Guidelines 对现有工程做 UI/可用性评审，修复发现的问题，并对改后工程做自动化自测。
> 本次改动均为**追加式/结构性**修改，不重写既有 R12~R68 视觉规则；所有改动可通过下方清单逐条回退。

---

## 一、发现的核心错误（导致页面整体不可用）

| # | 问题 | 证据 | 影响 |
|---|---|---|---|
| 1 | **资源路径全部 404**：`index.html` 与各脚本引用 `assets/marks/…`、`assets/avatar/…`、`assets/items/…`、`assets/lib/three.min.js`、`assets/mm-bg.jpg`、`assets/loading_bg_new.jpg` 等 100+ 处，但资源目录（`marks/ avatar/ items/ runner/ lib/ brand/`）与 `index.html` 平级、缺少 `assets/` 这一层 | 静态引用审计：54 条本地引用解析失败；HTTP 实测全部返回 404 | 首屏启动页背景图、分类标识、物品图、角色形象全部裂图；`three.min.js` 加载失败 → 跑酷玩法不可用 |

**修复**：在工程根下新建 `assets/` 目录，将资源目录与资源图移入其中，恢复代码所期望的 `根/index.html + 根/styles.css + 根/assets/{…}` 结构。修复后静态审计 0 条真实缺失，HTTP 实测资源全部 200。

> 说明：修复前的布局（资源与 html 平级）与代码引用、与工程内《项目拆解文档》记载的结构均不一致，属打包错位。若你的真实工程根另有上一级目录，请将本文件夹整体放到该根下（保持 `index.html` 与 `assets/` 的相对关系）即可。

---

## 二、依据 Web Interface Guidelines 的 UI / 可用性改进

| 类别 | 文件 | 改动 |
|---|---|---|
| 主题/元信息 | index.html | 新增 `<meta name="description">`、`theme-color`、`color-scheme=light`、`format-detection=telephone=no` |
| 色彩方案 | styles.css | `html { color-scheme: light; }`（修正系统滚动条/原生控件配色） |
| 图片加载 | index.html | 16 处 `<img>` 增补 `decoding="async"` |
| 触控 | styles.css | 对按钮/链接/卡牌/棋盘格等加 `touch-action: manipulation` + `-webkit-tap-highlight-color: transparent` |
| 滚动隔离 | styles.css | 面板/遮罩/对话框加 `overscroll-behavior: contain` |
| 排版 | styles.css | 标题加 `text-wrap: balance`（避免孤字）；`.age-hint span` 由 10px 提升到 11px |
| 图片交互 | styles.css | `img { -webkit-user-drag: none; }` 防止误拖拽 |
| 动效偏好 | styles.css | `prefers-reduced-motion` 下加 `scroll-behavior: smooth` 与 `:target` 的 `scroll-margin-top` |

复审结论（改后自动化扫描）：**无过小文字、无过小点击热区、无未标注表单控件、无 `transition: all`、focus-visible 已定义、标题层级为单一 H1、无页面级横向滚动（360/390/768/1024/1280 均通过）**。

---

## 三、自测方法与结果

测试环境：离线 Chromium（Puppeteer）驱动真实页面，本地 HTTP 服务加载工程。

覆盖：启动流程、7 个视图、5 个侧边面板、音效开关、小课堂与答题、拖拽/键盘、响应式多断点。

| 检查项 | 结果 |
|---|---|
| 运行时 JS 报错 | **0** |
| 请求失败 / 资源 404 | **0**（仅 favicon 404，无影响） |
| 裂图 | **0**（全部图片 `naturalWidth > 0`） |
| 视图切换 7/7 | 正常 |
| 面板开合 | 正常 |
| 启动预加载动画 | ~5.4s 后正常消失 |
| 横向溢出（5 档视口） | 无 |

> 注：卡片内部元素级 `scrollWidth` 略大于 `clientWidth` 属正常（其父级已 `overflow:hidden` 裁剪），不影响页面与观感。

---

## 四、改动文件清单（可回退）

- `index.html`：+4 个 meta；16 处 `decoding="async"`
- `styles.css`：文件末尾追加“R69 UI 打磨 & 可访问性补丁”区块（约 25 行，集中隔离，便于整体删除回退）
- 目录结构：新增 `assets/`，资源目录与资源图归位
- 其他文件（`app.js` / `data.js` / `learn.js` / `learn.css`）**未改动**，`node --check` 语法校验通过
