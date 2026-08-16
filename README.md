# MioRian Component

一款基于 **Web Components（Shadow DOM）** 的自定义 **Web UI** 组件库 ；高效、简洁、无依赖。

---

## 组件一览

| 标签 | 说明 |
|------|------|
| `<miorian-block>` | 布局容器（Flex + 毛玻璃 + 背景图 + 樱花/雪花特效） |
| `<miorian-input>` | 输入 / 展示 / 密码 三合一组件（含打字机、API 接入） |
| `<miorian-avatar>` | 圆形头像（圆环/波浪环 + 悬停旋转） |
| `<miorian-social>` | 社交链接图标（点击跳转） |
| `<miorian-heading>` | 自定义标题（全套字体 + 下划线/删除线） |
| `<miorian-article-card>` | 文章卡片（封面 + 标题 + 简介 + 跳转） |
| `<miorian-btnlink>` | 钮链（按钮 / 链接双模式 + 图标） |
| `<miorian-post>` | 文章 / Markdown 编辑器（读/编辑/新建三模式） |
| `<miorian-dropdown>` | 多级下拉盒子（悬停触发 / 无限嵌套 / 抽屉推移） |

---

## 快速开始

### 方式一：CDN 直接引用（推荐）

```html
<!-- BaseProps 必须最先加载 -->
<script src="https://cdn.jsdelivr.net/gh/qwellop6/MioRian-Component@main/BaseProps.js"?v=n></script>
<script src="https://cdn.jsdelivr.net/gh/qwellop6/MioRian-Component@main/Block.js"?v=n></script>
<script src="https://cdn.jsdelivr.net/gh/qwellop6/MioRian-Component@main/Input.js"?v=n></script>
<script src="https://cdn.jsdelivr.net/gh/qwellop6/MioRian-Component@main/Avatar.js"?v=n></script>
<script src="https://cdn.jsdelivr.net/gh/qwellop6/MioRian-Component@main/Social.js"?v=n></script>
<script src="https://cdn.jsdelivr.net/gh/qwellop6/MioRian-Component@main/Post.js"?v=n></script>
<script src="https://cdn.jsdelivr.net/gh/qwellop6/MioRian-Component@main/Heading.js"?v=n></script>
<script src="https://cdn.jsdelivr.net/gh/qwellop6/MioRian-Component@main/ArticleCard.js"?v=n></script>
<script src="https://cdn.jsdelivr.net/gh/qwellop6/MioRian-Component@main/BtnLink.js"?v=n></script>
<script src="https://cdn.jsdelivr.net/gh/qwellop6/MioRian-Component@main/Dropdown.js"?v=n></script>

<!-- 使用 iconify 图标（icon="fa:home" 等）时才需要引入 -->
<script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
```

> `@main` 可换成 `@v1.0.0`（tag）或 `@提交哈希` 锁定版本。jsDelivr 有强缓存，发布新版本建议换版本号，或在 URL 后加 `?v=n` 强制刷新。

### 方式二：本地 / 下载文件

```html
<!-- BaseProps 必须最先加载 -->
<script src="[文件所在路径]/BaseProps.js"></script>
<script src="[文件所在路径]/Block.js"></script>
<script src="[文件所在路径]/Input.js"></script>
<script src="[文件所在路径]/Avatar.js"></script>
<script src="[文件所在路径]/Social.js"></script>
<script src="[文件所在路径]/Heading.js"></script>
<script src="[文件所在路径]/ArticleCard.js"></script>
<script src="[文件所在路径]/BtnLink.js"></script>
<script src="[文件所在路径]/Post.js"></script>
<script src="[文件所在路径]/Dropdown.js"></script>
```

```html
<miorian-block theme="light" padding="md">
  <miorian-avatar src="avatar.jpg" size="lg" border="ring"></miorian-avatar>
</miorian-block>
```

> **注意**：`BaseProps.js` 必须在所有组件之前引入，否则其他组件会报 `BaseProps is not defined`。

---

## 通用属性系统

所有组件共享 `BaseProps.read(element)`，一次性读取并注入以下属性。

### 尺寸 / 圆角 / 内边距

| 属性 | 默认值 | 说明 |
|------|--------|------|
| `width` | `100%`* | CSS 值，如 `400px`、`50vw` |
| `height` | `auto` | CSS 值，如 `100vh` |
| `Borad` | `12` | 圆角半径（px） |
| `padding` | `md` | `none` / `sm` / `md` / `lg` / `xl` |

> *内联型组件（Avatar / Social / Heading / BtnLink / ArticleCard）默认收窄为内容宽；设置 `width` 属性即可覆盖。

### Flex 布局（Block 等容器组件）

| 属性 | 默认值 | 可选值 |
|------|--------|--------|
| `direction` | `row` | `row` / `col` / `row-reverse` / `col-reverse` |
| `justify` | `start` | `start` / `center` / `end` / `between` / `around` / `evenly` |
| `align` | `stretch` | `start` / `center` / `end` / `stretch` / `baseline` |
| `gap` | `0` | CSS 值（必须带单位，如 `12px`） |
| `wrap` | — | 布尔，存在即换行 |

> `direction="col"` 时主轴变为垂直，`justify` 与 `align` 的作用互换。

### 字体全家桶

| 属性 | CSS 变量 | 说明 |
|------|----------|------|
| `color` | `--bp-color` | 文字颜色 |
| `font-family` | `--bp-font` | 字体族，如 `楷体`、`Georgia, serif` |
| `font-size` | `--bp-size` | 字号 |
| `font-weight` | `--bp-weight` | 字重 |
| `font-style` | `--bp-style` | `italic` 等 |
| `letter-spacing` | `--bp-lsp` | 字间距 |
| `text-align` | `--bp-align` | `left` / `center` / `right` |

### 视觉 / 显隐 / 偏移

| 属性 | 说明 |
|------|------|
| `shadowlevel` | 阴影等级（乘数），`0` 无阴影 |
| `glow` | accent 色外发光 |
| `bordercolor` / `backcolor` | 自定义边框色 / 背景色 |
| `no-background` / `no-border` | 隐藏背景 / 边框 |
| `offset-x` / `offset-y` | 微调偏移（仅显式设置时生效） |

### 定位与自对齐

| 属性 | 值 | 说明 |
|------|-----|------|
| `position` | `relative` / `absolute` / `fixed` | 显式定位模式（absolute/fixed 脱离文档流） |
| `self-x` | `start` / `center` / `end` | 水平对齐（普通元素 margin auto；定位元素用 left/right） |
| `self-y` | `start` / `center` / `end` | 垂直对齐（普通元素 margin auto；定位元素用 top/bottom） |
| `layer` | 数字 | 图层层级（z-index），仅对已定位元素（position 非 static）生效，数字越大越靠上 |

```html
<!-- 文档流内水平居中 -->
<miorian-block width="35%" self-x="center">...</miorian-block>

<!-- 悬浮视口居中（显式 fixed + 双方向 center + 确定尺寸） -->
<miorian-block position="fixed" self-x="center" self-y="center" width="320px" height="200px">...</miorian-block>

<!-- 相对父级绝对定位居中 -->
<miorian-block position="relative">
  <miorian-block position="absolute" self-x="center" self-y="center">...</miorian-block>
</miorian-block>
```

> `self-y` 在普通块级父级（如 `<body>`）中垂直 auto margin 会塌陷为 0，需 flex/grid 父级。要脱离文档流相对视口 / 定位祖先居中，用 `position="fixed"` / `position="absolute"` + `self-x="center" self-y="center"`，并**显式给 `width` / `height`**（auto 会被 inset 拉伸满屏）。

> `layer` 用于定位元素（`position` 非 static）之间的堆叠层级：同一父容器下的多个定位图层，`layer` 数字越大越靠上。普通（static）元素设 `layer` 不会生效——`z-index` 仅作用于定位元素。

### 动效 / 自动刷新

| 属性 | 默认值 | 说明 |
|------|--------|------|
| `anim` | `none` | `fade-in` / `slide-up/down/left/right` / `pop` / `bounce` / `shake` / `pulse` / `spin` |
| `hover` | `none` | `lift` / `glow-pulse` |
| `refresh` | — | 自动刷新间隔（秒），如 `refresh="10"` |

---

## 主题系统

6 套内置主题，`theme` 属性切换，默认 `light`。强调色 `accent` 统一控制（默认 `#6c5ce7`）。

| 值 | 背景 | 文字 | 适用 |
|----|------|------|------|
| `light` | `#fff` | `#1a1a2e` | 亮色页面 |
| `dark` | `#1a1a2e` | `#f0f0f0` | 深色面板 |
| `neon` | `#0d0221` | `#f0f0ff` | 科技 / 炫酷 |
| `glass` | 半透明磨砂 | `#fff` | 背景图上叠加 |
| `paper` | `#fdfbf7` | `#3e2c1c` | 阅读 / 笔记 |
| `gradient` | 紫蓝渐变 | `#fff` | 活力氛围 |

---

## miorian-block · 布局容器

**专属属性：**

| 属性 | 默认值 | 说明 |
|------|--------|------|
| `glass` | — | 毛玻璃蒙层 |
| `glass-blur` | `8px` | 模糊程度 |
| `bg-image` | — | 背景图 URL |
| `bg-size` / `bg-position` | `cover` / `center` | 尺寸 / 定位 |
| `bg-repeat` | — | 平铺 |
| `bg-effect` | `none` | `sakura` / `snow` |
| `fx-density` | `normal` | `sparse` / `normal` / `dense` |
| `fx-size` | `md` | `sm` / `md` / `lg` |
| `fx-angle` | `45` | 飘落角度 0~360（0 为垂直下落） |

```html
<miorian-block width="100%" height="100vh"
  bg-image="bg.jpg" glass glass-blur="6.5px"
  bg-effect="snow" fx-density="dense" fx-angle="45"
  direction="col" justify="center" align="center">
  内容
</miorian-block>
```

---

## miorian-input · 输入/展示组件

| 属性 | 默认值 | 说明 |
|------|--------|------|
| `mode` | `input` | `input` / `display` / `password` |
| `type` | `text` | HTML input type |
| `value` / `placeholder` | — | 初始值 / 占位提示 |
| `label` / `size` | — / `md` | 标签 / 尺寸 |
| `icon` | — | 图标：iconify `集合:图标名`（如 `fa:home`，需引入 iconify-icon）或 emoji |
| `placeholder-*` | — | 占位符样式：`placeholder-color` / `placeholder-font-family` / `placeholder-font-size` / `placeholder-font-weight` / `placeholder-font-style` / `placeholder-letter-spacing` / `placeholder-text-align` |
| `disabled` / `invalid` / `message` | — | 状态 |
| `text-align` | `left` | 展示框文字对齐 |
| `api` | — | API URL，自动 fetch 展示 |
| `typewriter` / `typewriter-speed` | — / `80` | 打字机 / 速度（ms/字） |
| `show-password` | — | 密码明文切换 |
| `refresh` | — | 自动刷新（秒），配合打字机做平滑退格→拉取→进场 |

```html
<miorian-input mode="display"
  api="https://v1.hitokoto.cn/?encode=text"
  typewriter typewriter-speed="80" text-align="center"
  refresh="10" width="35vw" no-background no-border>
</miorian-input>
```

**JS API**：`element.value`、`element.native`、`change` 事件。

---

## miorian-avatar · 头像

| 属性 | 默认值 | 说明 |
|------|--------|------|
| `src` / `alt` | — / `avatar` | 图片 / 替代文本；**`src` 为空时自动显示默认游客剪影**（人形 SVG，无网络请求） |
| `size` | `md` | `sm`(38) / `md`(62) / `lg`(94) / `xl`(136) / 自定义 `28px` |
| `border` | `none` | `ring`（实心圆环）/ `wave`（虚线波浪，自动旋转）；环色可用 `bordercolor` 自定义（默认 accent） |
| `rotate` | — | 悬停旋转 360° |

---

## miorian-social · 社交链接

| 属性 | 默认值 | 说明 |
|------|--------|------|
| `src` / `alt` | — | 图标 / 替代文本 |
| `href` / `target` | `#` / `_blank` | 跳转链接 / 打开方式 |
| `size` | `md` | 同 Avatar |
| `border` | `none` | `ring` / `wave`；环色可用 `bordercolor` 自定义（默认 accent） |

**常用图标 CDN**（Simple Icons）：`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/<name>.svg`

| 平台 | name |
|------|------|
| GitHub | `github`（或 Devicon `devicon@latest/icons/github/github-original.svg`） |
| QQ | `tencentqq` |
| Bilibili | `bilibili` |
| 网易云音乐 | `neteasecloudmusic` |
| 邮箱 | `maildotru` |

---

## miorian-heading · 标题

**文字**：`level`（`h1`~`h6`，默认 `h2`）+ 字体全家桶。

**下划线：**

| 属性 | 默认值 | 说明 |
|------|--------|------|
| `underline` | — | 开关 |
| `underline-color` | accent | 颜色 |
| `underline-style` | `solid` | `solid` / `dashed` / `dotted` / `wavy` |
| `underline-thickness` | `2px` | 粗细 |
| `underline-radius` | — | 圆润度（px），背景渲染胶囊形 |

**删除线**：`line-through` / `line-color` / `line-thickness` / `line-radius`（同上下划线）。

```html
<miorian-heading level="h1" font-size="2rem" font-weight="900"
  underline underline-color="#6366f1" underline-style="wavy" text-align="center">
  居中波浪线标题
</miorian-heading>
```

---

## miorian-article-card · 文章卡片

| 分类 | 属性 | 说明 |
|------|------|------|
| 封面 | `cover` / `cover-align` / `cover-width` / `cover-height` / `cover-radius` | 图片 / `left`(默认)·`right` / 宽度 / 高度 / 圆角 |
| 标题 | `title` + `title-*` 字体属性 | 标题文本 + 独立字体 |
| 简介 | `desc` + `desc-*` 字体属性 | 简介文本 + 独立字体 |
| 链接 | `href` | 文章链接，设后整卡可点击 |
| 悬停 | `hover` | `lift`（悬浮放大 + 阴影） |
| 间距 | `gap` | 封面与文字区间距 |

```html
<miorian-article-card theme="dark"
  cover="cover.jpg" cover-radius="12px" cover-width="30%"
  title="文章标题" title-font-weight="700"
  desc="简介文字" href="post.html" hover="lift" gap="20px">
</miorian-article-card>
```

---

## miorian-btnlink · 钮链

| 模式 | `mode` | 外观 | 悬停 |
|------|--------|------|------|
| 按钮 | `button`（默认） | 实心 accent + 边框 | `hover="lift"` 上浮放大 |
| 链接 | `link` | 无边框透明 | `hover-color` 启用变色 |

**共用**：`href` / `target` + 字体全家桶 + `text-align` + `icon` / `icon-side`（图标，`left` / `right`，支持 iconify `集合:图标名` / 图片 URL / emoji）。

**按钮专属**：`hover="lift"`、`border-width`（默认 `2px`）。

**链接专属**：`hover-color`、`underline`（悬停下划线动效）、`underline-color`、`underline-dir`（`left` / `right` / `center`）。

```html
<miorian-btnlink mode="button" href="#" hover="lift" border-width="3px">按钮</miorian-btnlink>
<miorian-btnlink mode="link" href="#" icon="fa:home" icon-side="left">首页</miorian-btnlink>
```

---

## miorian-post · 文章/MD 编辑器

| 属性 | 说明 |
|------|------|
| `mode` | `read`（默认）/ `edit` / `write` |
| `file` | 导入地址（edit/read 的加载来源） |
| `src` | 保存地址（write 目标 / edit 可选覆盖） |
| `refresh` | 自动刷新（秒），仅 read 模式 |

| 模式 | 需要 | 界面 | 保存 |
|------|------|------|------|
| `read` | `file` | Prose 渲染 | — |
| `edit` | `file` | textarea + 预览/保存 | 回写 `file` |
| `write` | `src` | 空白 textarea + 预览/保存 | 存到 `src` |

内置轻量 MD 解析器（标题/粗体/斜体/链接/图片/代码块/列表/引用/分割线）。CSS 自定义属性：`--post-max-width`（默认 65ch）、`--post-font-size`、`--post-line-height`。

---

## miorian-dropdown · 多级下拉盒子

悬停触发器时，在其下方/左方/右方显示内容盒子，可无限嵌套。继承 Block 全部属性（theme / accent / 边框 / 阴影 / 圆角 / flex / gap / padding）。

```html
<miorian-dropdown theme="light" open arrow menu-align="center" arrow-align="center">
  <!-- 触发器：悬停它显示菜单 -->
  <miorian-avatar slot="trigger" size="lg" border="ring"></miorian-avatar>
  <!-- 默认插槽：菜单内容 -->
  <div style="display:flex;flex-direction:column;gap:2px;padding:6px;width:180px">
    <span>个人主页</span>
    <span>退出登录</span>
  </div>
</miorian-dropdown>
```

### 专属属性

| 属性 | 默认值 | 说明 |
|------|--------|------|
| `side` | `down` | 菜单出现方位：`down` / `left` / `right` |
| `open` | — | 布尔，开启展开动画（down 上→下，left 右→左，right 左→右） |
| `open-time` | `0.3` | 动画时长（秒） |
| `push` | — | 布尔，抽屉式推移（仅 left/right）：菜单展开时把触发器挤到对面 |
| `menu-align` | `left` | 菜单水平对齐（仅 down）：`left` / `center` / `right` |
| `arrow` | — | 布尔，显示三角箭头（仅 down） |
| `arrow-align` | `left` | 箭头位置：`left` / `center` / `right` |
| `arrow-offset` | `20px` | 箭头微调偏移（px / % / vw） |

### 关键设计

- **触发器 vs 菜单**：`slot="trigger"` 是常驻显示的「门把手」，默认插槽是「悬停弹出的菜单」。
- **无限嵌套**：菜单里再放 `<miorian-dropdown>` 即形成二级/三级子菜单，纯 CSS `:hover` 驱动，无需 JS。
- **width / height 作用于面板**：不写或 `auto`/`%` 时按内容自适应（`max-content`，不换行），固定值（px/vh/rem）精确生效。
- **push 抽屉推移**：用 transform 换位 + `ResizeObserver` 实时测宽，收起时触发器原地不动，展开时被精准挤到对面。

```html
<!-- 菜单在左，展开时把触发器推向右侧（抽屉效果） -->
<miorian-dropdown side="left" push open>
  <miorian-btnlink slot="trigger" mode="button">推移 ▸</miorian-btnlink>
  <div>菜单项...</div>
</miorian-dropdown>
```

---

> **MioRian Component** · 2026-08-15
