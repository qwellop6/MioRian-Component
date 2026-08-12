# MioRian Component

一款基于 **Web Components（Shadow DOM）** 的高度自定义 **（Web-UI）- 组件库** ；高效、简洁、无依赖。

---

## 目录

- [快速开始](#快速开始)
- [通用属性系统](#通用属性系统)
- [主题系统](#主题系统)
- [组件列表](#组件列表)
  - [miorian-block](#miorian-block) · 布局容器
  - [miorian-input](#miorian-input) · 输入/展示组件
  - [miorian-avatar](#miorian-avatar) · 头像
  - [miorian-social](#miorian-social) · 社交链接
  - [miorian-heading](#miorian-heading) · 标题
  - [miorian-article-card](#miorian-article-card) · 文章卡片
  - [miorian-post](#miorian-post) · 文章/MD编辑器

---

## 快速开始

```html
<script src="BaseProps.js"></script>  <!-- 必须在所有组件之前 -->
<script src="Block.js"></script>
<script src="Input.js"></script>
<script src="Avatar.js"></script>
<script src="Social.js"></script>
<script src="Heading.js"></script>
<script src="ArticleCard.js"></script>
<script src="Post.js"></script>
```

---

## 通用属性系统

所有组件共享 `BaseProps.read(element)`，一次性读取并注入以下属性。

### 尺寸 / 圆角 / 内边距

| 属性 | 默认值 | 可选值 |
|------|--------|--------|
| `width` | `100%` | CSS 值（部分组件自动覆写为 `auto`） |
| `height` | `auto` | CSS 值 |
| `Borad` | `12` | 数字（px） |
| `padding` | `md` | `none` / `sm` / `md` / `lg` / `xl` |

### Flex 布局（Block 等容器组件）

| 属性 | 默认值 | 说明 |
|------|--------|------|
| `direction` | `row` | `row` / `col` / `row-reverse` / `col-reverse` |
| `justify` | `start` | `start` / `center` / `end` / `between` / `around` / `evenly` |
| `align` | `stretch` | `start` / `center` / `end` / `stretch` / `baseline` |
| `gap` | `0` | CSS 值，必须带单位（如 `12px`） |
| `wrap` | 布尔 | 存在即换行 |

### 视觉 / 显隐

| 属性 | 类型 | 说明 |
|------|------|------|
| `shadowlevel` | 数字 | 阴影等级，`0` 无阴影 |
| `glow` | 布尔 | accent 色外发光 |
| `bordercolor` | 颜色 | 自定义边框色 |
| `backcolor` | 颜色 | 自定义背景色 |
| `no-background` | 布尔 | 隐藏背景 |
| `no-border` | 布尔 | 隐藏边框 |

### 动效

| 属性 | 默认值 | 可选值 |
|------|--------|--------|
| `anim` | `none` | `fade-in` / `slide-up/down/left/right` / `pop` / `bounce` / `shake` / `pulse` / `spin` |
| `hover` | `none` | `lift` / `glow-pulse` |

### 自动刷新

| 属性 | 默认值 | 说明 |
|------|--------|------|
| `refresh` | — | 自动刷新间隔（秒），如 `refresh="10"`。接入组件会周期性更新数据，配合 Input 打字机可实现平滑退场→拉取→进场过渡 |

---

## 主题系统

6 套内置主题，`theme` 属性切换，默认 `light`。

| 值 | 背景 | 文字 | 适用 |
|----|------|------|------|
| `light` | `#fff` | `#1a1a2e` | 亮色页面 |
| `dark` | `#1a1a2e` | `#f0f0f0` | 深色面板 |
| `neon` | `#0d0221` | `#f0f0ff` | 科技/炫酷 |
| `glass` | 半透明磨砂 | `#fff` | 背景图上叠加 |
| `paper` | `#fdfbf7` | `#3e2c1c` | 阅读/笔记 |
| `gradient` | 紫蓝渐变 | `#fff` | 活力氛围 |

强调色 `accent` 统一控制（默认 `#6c5ce7`）。

---

## 组件列表

### miorian-block

布局容器。Flex + 毛玻璃 + 背景图 + 樱花/雪花特效。

**专属属性：**

| 属性 | 默认值 | 说明 |
|------|--------|------|
| `glass` | — | 毛玻璃蒙层 |
| `glass-blur` | `8px` | 模糊程度 |
| `bg-image` | — | 背景图 URL |
| `bg-size` | `cover` | 尺寸模式 |
| `bg-position` | `center` | 定位 |
| `bg-repeat` | — | 平铺 |
| `bg-effect` | `none` | `sakura` / `snow` |
| `fx-density` | `normal` | `sparse` / `normal` / `dense` |
| `fx-size` | `md` | `sm` / `md` / `lg` |
| `fx-angle` | `45` | 飘落角度 0~360 |

```html
<miorian-block width="100%" height="100vh"
  bg-image="bg.jpg" glass glass-blur="6.5px"
  bg-effect="snow" fx-density="dense"
  direction="col" justify="center" align="center">
  <miorian-avatar src="avatar.jpg" size="lg"></miorian-avatar>
</miorian-block>
```

---

### miorian-input

三合一：展示框 / 输入框 / 密码框。

| 属性 | 默认值 | 说明 |
|------|--------|------|
| `mode` | `input` | `input` / `display` / `password` |
| `type` | `text` | HTML input type |
| `value` | — | 初始值/展示文字 |
| `placeholder` | — | 占位提示 |
| `label` | — | 标签 |
| `icon` | — | Unicode/Emoji 图标 |
| `size` | `md` | `sm` / `md` / `lg` |
| `disabled` | — | 禁用 |
| `invalid` | — | 错误态 |
| `message` | — | 辅助/错误信息 |
| `text-align` | `left` | `left` / `center` / `right`（display 模式） |
| `api` | — | API URL，自动 fetch 展示 |
| `typewriter` | — | 打字机特效 |
| `typewriter-speed` | `80` | ms/字 |
| `show-password` | — | 密码明文切换 |

> **平滑刷新：** 设 `refresh="10"` 后，每 10 秒自动拉取最新数据，旧文字先逐字退格消退（30ms/字），再逐字打出新内容，无「加载中」闪烁。

```html
<miorian-input mode="display"
  api="https://v1.hitokoto.cn/?encode=text"
  typewriter typewriter-speed="80" text-align="center">
</miorian-input>

<miorian-input mode="password" label="密码" show-password></miorian-input>
```

**JS API：** `element.value`、`element.native`、`change` 事件。

---

### miorian-avatar

圆形头像。悬停旋转 + 圆环/波浪环边框。

| 属性 | 默认值 | 说明 |
|------|--------|------|
| `src` | — | 图片 URL |
| `alt` | `avatar` | 替代文本 |
| `size` | `md` | `sm`(38) / `md`(62) / `lg`(94) / `xl`(136) / 自定义如 `28px` |
| `border` | `none` | `ring`（实心）/ `wave`（虚线波浪自动旋转） |
| `rotate` | — | 悬停旋转 360° |

```html
<miorian-avatar src="avatar.jpg" size="lg"
  border="wave" rotate accent="#6366f1"></miorian-avatar>
```

---

### miorian-social

社交链接图标。内嵌 `<a>`，点击跳转。

| 属性 | 默认值 | 说明 |
|------|--------|------|
| `src` | — | 图标 URL |
| `href` | `#` | 跳转链接 |
| `target` | `_blank` | 打开方式 |
| `size` | `md` | 同 Avatar |
| `border` | `none` | `ring` / `wave` |

```html
<miorian-social
  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
  href="https://github.com/you" size="24px"></miorian-social>
```

**常用图标 CDN：**

| 平台 | URL |
|------|-----|
| GitHub | `devicons/devicon@latest/icons/github/github-original.svg` |
| QQ | `simple-icons@latest/icons/tencentqq.svg` |
| Bilibili | `simple-icons@latest/icons/bilibili.svg` |
| 网易云 | `simple-icons@latest/icons/neteasecloudmusic.svg` |
| 邮箱 | `simple-icons@latest/icons/maildotru.svg` |

---

### miorian-heading

自定义标题。全套字体 + 下划线/删除线 + 文本对齐 + 圆润装饰线。

**文字属性：**

| 属性 | 说明 |
|------|------|
| `level` | `h1`~`h6`，默认 `h2` |
| `color` | 文字颜色 |
| `font-family` / `font-size` / `font-weight` / `font-style` | 字体全套 |
| `letter-spacing` | 字间距 |
| `text-align` | `left` / `center` / `right` |

**下划线：**

| 属性 | 默认值 | 说明 |
|------|--------|------|
| `underline` | — | 开关 |
| `underline-color` | accent | 颜色 |
| `underline-style` | `solid` | `solid` / `dashed` / `dotted` / `wavy` |
| `underline-thickness` | `2px` | 粗细 |
| `underline-radius` | — | 圆润度（px），启用后背景渲染 |

**删除线：**

| 属性 | 默认值 | 说明 |
|------|--------|------|
| `line-through` | — | 开关 |
| `line-color` | accent | 颜色 |
| `line-thickness` | `2px` | 粗细 |
| `line-radius` | — | 圆润度（px） |

```html
<miorian-heading level="h1" font-size="2rem" font-weight="900"
  underline underline-color="#6366f1" underline-style="wavy"
  text-align="center">
  居中波浪线标题
</miorian-heading>
```

---

### miorian-article-card

文章卡片。封面图 + 标题 + 简介 + 点击跳转。

| 分类 | 属性 | 说明 |
|------|------|------|
| 封面 | `cover` | 图片 URL（可选） |
| | `cover-align` | `left`（默认）/ `right` |
| | `cover-width` | 封面宽度，默认 `35%` |
| | `cover-height` | 封面高度，默认 `auto` |
| | `cover-radius` | 封面圆角，如 `10px` |
| 标题 | `title` | 标题文本 |
| | `title-color` / `title-font-family` / `title-font-size` / `title-font-weight` / `title-font-style` / `title-letter-spacing` / `title-align` | 继承 Heading 字体全套 |
| 简介 | `desc` | 简介文本 |
| | `desc-color` / `desc-font-family` / `desc-font-size` / `desc-font-weight` / `desc-font-style` / `desc-letter-spacing` / `desc-align` | 同上 |
| 链接 | `href` | 文章链接，设后整卡可点击 |
| | `hover` | `lift`（悬停悬浮+放大+阴影） |
| 间距 | `gap` | 封面与文字区间距 |

```html
<miorian-article-card theme="dark"
  cover="cover.jpg" cover-radius="12px" cover-width="30%"
  title="文章标题" title-font-weight="700"
  desc="一段简介文字"
  href="https://example.com/post/1"
  hover="lift" gap="20px">
</miorian-article-card>
```

---

### miorian-post

文章/MD 编辑器。三模式：只读 / 编辑 / 新建。

| 属性 | 说明 |
|------|------|
| `mode` | `read`（默认）/ `edit` / `write` |
| `file` | 导入地址（edit/read 模式的加载来源） |
| `src` | 保存地址（write 模式的目标 / edit 可选覆盖） |

| 模式 | 需要 | 界面 | 保存 | 刷新 |
|------|------|------|------|------|
| `read` | `file` | Prose 渲染 | — | 支持 `refresh` 自动重拉 |
| `edit` | `file` | textarea + 预览/保存 | 回写 `file` | — |
| `write` | `src` | 空白 textarea + 预览/保存 | 存到 `src` | — |

内置轻量 MD 解析器（标题/粗体/斜体/链接/图片/代码块/列表/引用/分割线/表格）。

```html
<miorian-post mode="read" theme="light"
  file="https://raw.githubusercontent.com/qwellop6/MioRian-Component/main/README.md">
</miorian-post>
```

**CSS 自定义属性：** `--post-max-width`（默认 65ch）、`--post-font-size`、`--post-line-height`。

---

## 完整页面示例

```html
<!DOCTYPE html>
<html lang="zh">
<head><meta charset="UTF-8"></head>
<body>

<script src="MioRian-Component/BaseProps.js"></script>
<script src="MioRian-Component/Block.js"></script>
<script src="MioRian-Component/Input.js"></script>
<script src="MioRian-Component/Avatar.js"></script>
<script src="MioRian-Component/Social.js"></script>
<script src="MioRian-Component/Heading.js"></script>
<script src="MioRian-Component/ArticleCard.js"></script>
<script src="MioRian-Component/Post.js"></script>

<!-- 第一屏：头像 + 社交 + 一言 -->
<miorian-block width="100%" height="100vh"
  bg-image="bg.jpg" glass glass-blur="6.5px"
  bg-effect="snow" fx-density="dense"
  direction="row" justify="center" align="center">

  <miorian-block width="40vw" no-background no-border
    direction="col" align="center" gap="20px">
    <miorian-avatar src="avatar.jpg" size="lg" border="ring" rotate></miorian-avatar>

    <miorian-block direction="row" gap="16px" no-background no-border>
      <miorian-social href="https://github.com/you"
        src="...github.svg" size="24px"></miorian-social>
      <miorian-social href="mailto:you@qq.com"
        src="...mail.svg" size="24px"></miorian-social>
    </miorian-block>

    <miorian-input mode="display"
      api="https://v1.hitokoto.cn/?encode=text"
      typewriter typewriter-speed="80" text-align="center"
      width="35vw" no-background no-border></miorian-input>
  </miorian-block>
</miorian-block>

</body>
</html>
```

---

> **MioRian Component** · 纯原生 Web Components · 零依赖 · 7 组件 · 2026-08-12
