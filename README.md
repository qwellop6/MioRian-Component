# MioRian Component

一款基于 **Web Components（Shadow DOM）** 纯生态的 UI 组件库。零依赖、无构建工具、不引入任何第三方框架。直接以自定义 HTML 标签形式使用，简单、高效、强大、快捷，兼容所有现代浏览器。

---

## 目录

- [项目架构](#项目架构)
- [快速开始](#快速开始)
- [通用属性系统](#通用属性系统)
- [主题系统](#主题系统)
- [组件](#组件)
  - [miorian-block · 布局容器](#miorian-block)
  - [miorian-input · 输入展示组件](#miorian-input)
  - [miorian-avatar · 头像组件](#miorian-avatar)
  - [miorian-social · 社交链接组件](#miorian-social)
- [层级关系](#层级关系)
- [完整页面示例](#完整页面示例)

---

## 项目架构

```
MioRian-Component/
├── BaseProps.js      ← 通用属性系统（所有组件的共享核心）
├── Block.js          ← 布局容器组件
├── Input.js          ← 输入 / 展示组件
├── Avatar.js         ← 头像组件
├── Social.js         ← 社交链接组件
├── demo-all.html     ← 全组件演示页面
└── README.md
```

每个组件文件完全自包含（Shadow DOM），通过 `customElements.define()` 注册为自定义 HTML 标签。

所有组件共享 **BaseProps 通用属性系统**：引入 `BaseProps.js`，在 `connectedCallback` 中调用 `BaseProps.read(this)` 即可获得完整的主题、布局、动效等属性支持。

---

## 快速开始

```html
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body>

<!-- 引入：BaseProps 必须在所有组件之前 -->
<script src="BaseProps.js"></script>
<script src="Block.js"></script>
<script src="Input.js"></script>
<script src="Avatar.js"></script>
<script src="Social.js"></script>

<!-- 直接使用 -->
<miorian-block theme="light" padding="md">
  <miorian-avatar src="avatar.jpg" size="lg" border="ring"></miorian-avatar>
</miorian-block>

</body>
</html>
```

> **注意**：`BaseProps.js` 必须最先加载，否则其他组件会报 `BaseProps is not defined` 错误。

---

## 通用属性系统

`BaseProps.read(element)` 一次性读取并注入以下全部通用属性，返回 `{ classList }` 拼入内部容器元素的 `class` 即可。

### 尺寸 / 圆角

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `width` | CSS 值 | `100%` | 容器宽度，如 `400px`、`50vw` |
| `height` | CSS 值 | `auto` | 容器高度，如 `100vh`、`300px` |
| `Borad` | 数字 | `12` | 圆角半径（px），如 `0`、`16` |
| `padding` | 字符串 | `md` | `none` / `sm` / `md` / `lg` / `xl` |

**内边距等级表：**

| 值 | CSS |
|----|-----|
| `none` | `padding: 0` |
| `sm` | `padding: 10px 14px` |
| `md` | `padding: 18px 22px` |
| `lg` | `padding: 28px 32px` |
| `xl` | `padding: 40px 48px` |

### Flex 布局

| 属性 | 类型 | 默认值 | 可选值 |
|------|------|--------|--------|
| `direction` | 字符串 | `row` | `row` / `col` / `row-reverse` / `col-reverse` |
| `justify` | 字符串 | `start` | `start` / `center` / `end` / `between` / `around` / `evenly` |
| `align` | 字符串 | `stretch` | `start` / `center` / `end` / `stretch` / `baseline` |
| `gap` | CSS 值 | `0` | 如 `12px`、`1rem`，必须带单位 |
| `wrap` | 布尔 | — | 存在即允许换行 |

> **注意**：`gap` 值必须带单位（如 `8px`），纯数字无效。`direction="col"` 时主轴变为垂直方向，`justify` 和 `align` 的作用也会互换。

### 偏移 / 视觉 / 显隐

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `offset-x` | CSS 值 | — | X 轴微调偏移，仅在显式设置时生效 |
| `offset-y` | CSS 值 | — | Y 轴微调偏移，仅在显式设置时生效 |
| `shadowlevel` | 数字 | `1` | 阴影等级（乘数），`0` 无阴影 |
| `glow` | 布尔 | — | accent 色外发光 |
| `bordercolor` | 颜色 | 主题默认 | 自定义边框颜色 |
| `backcolor` | 颜色 | 主题默认 | 自定义背景颜色 |
| `no-background` | 布尔 | — | 背景变为透明，背景图一并隐藏 |
| `no-border` | 布尔 | — | 边框设为 none |

### 动效

| 属性 | 类型 | 默认值 | 可选值 |
|------|------|--------|--------|
| `anim` | 字符串 | `none` | `fade-in` / `slide-up` / `slide-down` / `slide-left` / `slide-right` / `pop` / `bounce` / `shake` / `pulse` / `spin` |
| `hover` | 字符串 | `none` | `lift`（悬停浮起 4px）/ `glow-pulse`（发光脉冲） |

> **注意**：`pulse` 和 `spin` 为无限循环动效。

---

## 主题系统

全部组件支持 **6 套内置主题**，通过 `theme` 属性切换，默认 `light`。

| 值 | 背景色 | 文字色 | 适用场景 |
|----|--------|--------|----------|
| `light` | `#fff` | `#1a1a2e` | 亮色页面 |
| `dark` | `#1a1a2e` | `#f0f0f0` | 深色面板 |
| `neon` | `#0d0221` | `#f0f0ff` | 科技/炫酷 |
| `glass` | 半透明磨砂 | `#fff` | 叠加在背景图上 |
| `paper` | `#fdfbf7` | `#3e2c1c` | 阅读/笔记 |
| `gradient` | 紫蓝渐变 | `#fff` | 活力氛围 |

强调色通过 `accent` 属性统一控制（默认 `#6c5ce7`），作用于发光、边框、光标等。

---

## 组件

### miorian-block

最核心的布局容器。自带 Flex 布局 + 毛玻璃 + 背景图 + 樱花/雪花粒子特效。

**标签**：`<miorian-block>...</miorian-block>`

#### 专属属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `glass` | 布尔 | — | 启用毛玻璃蒙层 |
| `glass-blur` | CSS 值 | `8px` | 毛玻璃模糊程度，如 `12px` |
| `bg-image` | URL | — | 背景图片地址 |
| `bg-size` | CSS 值 | `cover` | 背景图尺寸模式 |
| `bg-position` | CSS 值 | `center` | 背景图定位 |
| `bg-repeat` | 布尔 | — | 背景图是否平铺 |
| `bg-effect` | 字符串 | `none` | `sakura` / `snow` |
| `fx-density` | 字符串 | `normal` | 粒子密度：`sparse` / `normal` / `dense` |
| `fx-size` | 字符串 | `md` | 粒子大小：`sm` / `md` / `lg` |
| `fx-angle` | 数字 | `45` | 飘落角度（0~360），左上→右下为正 |

**粒子密度参考：**

| 值 | 樱花（每半屏） | 雪花（每半屏） |
|----|-------------|-------------|
| `sparse` | 14 | 12 |
| `normal` | 28 | 24 |
| `dense` | 48 | 42 |

**示例：**

```html
<!-- 全屏背景 + 毛玻璃 + 雪花 + 内容居中 -->
<miorian-block width="100%" height="100vh"
  bg-image="https://example.com/bg.jpg"
  glass glass-blur="6.5px"
  bg-effect="snow" fx-density="dense" fx-size="lg" fx-angle="45"
  glow shadowlevel="2"
  theme="light" direction="row" justify="center" align="center">

  <div>居中内容</div>

</miorian-block>

<!-- Flex 布局嵌套 -->
<miorian-block direction="row" gap="12px" justify="between">
  <miorian-block width="200px">左侧</miorian-block>
  <miorian-block width="200px">右侧</miorian-block>
</miorian-block>
```

#### 玻璃层注意事项

启用 `glass` 后，Block 内部会增加一个 `.slot-wrap` 中间层来承载子元素。`.slot-wrap` 会通过 CSS `inherit` 自动继承父级 `.frame` 的 `flex-direction`、`justify-content`、`align-items`、`gap`、`flex-wrap`，因此布局属性能正常穿透毛玻璃层生效。

---

### miorian-input

输入 / 展示 / 密码三合一组件。

**标签**：`<miorian-input></miorian-input>`（自闭合，内容由属性控制）

#### 专属属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `mode` | 字符串 | `input` | `input` / `display` / `password` |
| `type` | 字符串 | `text` | HTML input type，仅 input 模式 |
| `value` | 字符串 | — | 初始值 / 展示文字 |
| `placeholder` | 字符串 | — | 占位提示 |
| `label` | 字符串 | — | 标签文字 |
| `icon` | HTML 字符 | — | 输入框左侧图标（Unicode / Emoji） |
| `size` | 字符串 | `md` | `sm` / `md` / `lg` |
| `disabled` | 布尔 | — | 禁用状态 |
| `invalid` | 布尔 | — | 错误状态（红色文字） |
| `message` | 字符串 | — | 底部辅助 / 错误信息 |
| `text-align` | 字符串 | `left` | 文字对齐（仅 display 模式）：`left` / `center` / `right` |

#### 展示模式专属

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `api` | URL | — | API 地址，组件自动 fetch 返回文本 |
| `typewriter` | 布尔 | — | 启用打字机逐字播放 |
| `typewriter-speed` | 数字 | `80` | 打字机速度（ms/字） |

#### 密码模式专属

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `show-password` | 布尔 | — | 显示明文切换按钮（眼睛图标） |

#### JavaScript API

```javascript
const input = document.querySelector('miorian-input');
// 读写 value
input.value = 'new text';
console.log(input.value);
// 获取原生 input 元素（input/password 模式）
input.native.focus();
// 监听输入变化
input.addEventListener('change', e => console.log(e.detail));
```

#### 示例

```html
<!-- 展示框（打字机 + API + 居中） -->
<miorian-input mode="display"
  api="https://v1.hitokoto.cn/?encode=text"
  typewriter typewriter-speed="80"
  text-align="center"
  width="35vw" no-background no-border></miorian-input>

<!-- 标准输入框 -->
<miorian-input mode="input" label="用户名"
  placeholder="请输入" icon="&#128100;" size="md"></miorian-input>

<!-- 密码框 -->
<miorian-input mode="password" label="密码"
  placeholder="请输入密码" show-password></miorian-input>

<!-- 错误态 -->
<miorian-input mode="input" label="邮箱" invalid
  message="邮箱格式不正确"></miorian-input>
```

> **注意**：Input 内部布局固定为竖向（label → 输入区 → message），不受 BaseProps 的 `direction` 等 flex 属性影响。

---

### miorian-avatar

圆形头像组件，支持圆环/波浪环边框和悬停旋转动效。

**标签**：`<miorian-avatar></miorian-avatar>`

#### 专属属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `src` | URL | — | 头像图片地址 |
| `alt` | 字符串 | `avatar` | 无障碍替代文本 |
| `size` | CSS 值 | `md` | 预设 `sm`(38px) / `md`(62px) / `lg`(94px) / `xl`(136px)，也支持任意 CSS 值如 `28px`、`3rem` |
| `border` | 字符串 | `none` | `ring`（实心圆环）/ `wave`（虚线波浪环） |
| `rotate` | 布尔 | — | 鼠标悬停时头像旋转 360° |

#### 示例

```html
<!-- 大号头像 + 波浪环 + 旋转 -->
<miorian-avatar src="avatar.jpg" size="lg"
  border="wave" rotate accent="#6366f1"></miorian-avatar>

<!-- 小号自定义尺寸（24px） -->
<miorian-avatar src="avatar.jpg" size="24px"
  border="ring" accent="#00e5ff"></miorian-avatar>

<!-- 无边框，仅头像 -->
<miorian-avatar src="avatar.jpg" size="md"></miorian-avatar>
```

> **注意**：Avatar 的尺寸由 `size` 属性独立控制，不受 BaseProps 的 `width` 和 `padding` 默认值影响。`border="wave"` 的虚线环通过 `::before` 伪元素实现，独立旋转，不干扰内部图片。

---

### miorian-social

社交链接组件。外观类似 Avatar，但内嵌 `<a>` 标签，点击跳转到目标 URL。鼠标悬停有轻微放大效果。

**标签**：`<miorian-social></miorian-social>`

#### 专属属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `src` | URL | — | 图标图片地址 |
| `href` | URL | `#` | 点击跳转的目标链接 |
| `target` | 字符串 | `_blank` | 链接打开方式（`_self` / `_blank` 等） |
| `alt` | 字符串 | `social link` | 无障碍替代文本 |
| `size` | CSS 值 | `md` | 与 Avatar 相同，支持预设关键字和自定义 CSS 值 |
| `border` | 字符串 | `none` | `ring` / `wave`（与 Avatar 相同） |

#### 示例

```html
<!-- GitHub 链接 -->
<miorian-social
  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
  href="https://github.com/username"
  size="24px" border="ring" accent="#6366f1"></miorian-social>

<!-- 邮箱链接（mailto） -->
<miorian-social
  src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/maildotru.svg"
  href="mailto:you@example.com"
  size="24px"></miorian-social>
```

#### 常用图标 URL

| 平台 | 图标地址 |
|------|---------|
| GitHub | `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg` |
| QQ | `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tencentqq.svg` |
| Bilibili | `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/bilibili.svg` |
| 网易云音乐 | `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/neteasecloudmusic.svg` |
| Gmail | `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/gmail.svg` |
| 通用邮箱 | `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/maildotru.svg` |
| Twitter/X | `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/twitter.svg` |

> 更多图标可浏览 [Simple Icons](https://simpleicons.org/) 或 [Devicon](https://devicon.dev/)。

---

## 层级关系

Block 组件内部各视觉层的 z-index（从底到顶）：

```
z-index: 1  →  毛玻璃蒙层 .glass-overlay    （模糊背景，不遮挡内容）
z-index: 2  →  内容插槽 .slot-wrap           （子元素正常渲染）
z-index: 3  →  樱花/雪花粒子 ::before        （覆盖一切之上）
```

意味着：毛玻璃在背景图上方、内容下方；内容在毛玻璃上方清晰可见；雪花/樱花在所有元素之上飘落。

---

## 完整页面示例

以下是一个完整的个人主页第一屏实现：

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>个人主页</title>
</head>
<script src="MioRian-Component/BaseProps.js"></script>
<script src="MioRian-Component/Block.js"></script>
<script src="MioRian-Component/Input.js"></script>
<script src="MioRian-Component/Avatar.js"></script>
<script src="MioRian-Component/Social.js"></script>
<body>

<miorian-block width="100%" height="100vh"
  bg-image="https://uapis.cn/api/v1/random/image?category=acg&type=pc"
  bg-effect="snow" fx-size="lg" fx-density="dense" fx-angle="45"
  glass glass-blur="6.5px" glow
  theme="light" direction="row" justify="center" align="center"
  anim="bounce">

  <miorian-block width="40vw" height="auto" no-background no-border
    direction="col" align="center" gap="20px" shadowlevel="0">

    <!-- 头像 -->
    <miorian-avatar src="avatar.jpg"
      size="lg" border="ring" rotate></miorian-avatar>

    <!-- 社交图标 -->
    <miorian-block width="auto" height="auto" no-background no-border
      direction="row" gap="16px" shadowlevel="0">
      <miorian-social href="https://github.com/you"
        src="...github-original.svg" size="24px"></miorian-social>
      <miorian-social href="https://space.bilibili.com/xxx"
        src="...bilibili.svg" size="24px"></miorian-social>
      <miorian-social href="mailto:you@example.com"
        src="...maildotru.svg" size="24px"></miorian-social>
    </miorian-block>

    <!-- 一言打字机 -->
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

> **MioRian Component** v2.0 · 纯原生 Web Components · 零依赖 · 2026-08-12
