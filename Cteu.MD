# MioRian Block 组件文档

基于 Web Components（Shadow DOM）的轻量级布局容器组件，零依赖、纯原生。集成了 Flex 布局、毛玻璃效果、背景图片、樱花/雪花装饰特效以及多种入场动效。

---

## 目录

- [快速开始](#快速开始)
- [主题系统](#主题系统)
- [属性总览](#属性总览)
- [尺寸与圆角](#尺寸与圆角)
- [Flex 布局](#flex-布局)
- [视觉特效](#视觉特效)
  - [毛玻璃](#毛玻璃-glass)
  - [外发光](#外发光-glow)
  - [隐藏背景 / 隐藏边框](#隐藏背景--隐藏边框)
  - [自定义背景色与边框色](#自定义背景色与边框色)
  - [背景图片](#背景图片)
- [装饰特效（樱花 / 雪花）](#装饰特效樱花--雪花)
- [入场动效](#入场动效)
- [悬停效果](#悬停效果)
- [层级关系](#层级关系)
- [完整示例](#完整示例)

---

## 快速开始

```html
<!-- 引入组件 -->
<script src="Block.js"></script>

<!-- 直接以 HTML 标签使用 -->
<miorian-block theme="light" padding="md">
  <p>Hello World</p>
</miorian-block>
```

标签名：`<miorian-block>`，通过 `customElements.define('miorian-block', Block)` 注册。

---

## 主题系统

Block 支持 **6 套内置主题**，通过 `theme` 属性切换。

| 主题值 | 背景色 | 文字色 | 边框色 | 适用场景 |
|--------|--------|--------|--------|----------|
| `light` | `#fff` | `#1a1a2e` | `#e8e8e8` | 常规亮色页面 |
| `dark` | `#1a1a2e` | `#f0f0f0` | `#2a2a3e` | 深色模式面板 |
| `neon` | `#0d0221` | `#f0f0ff` | `var(--accent)` | 科技感 / 炫酷展示 |
| `glass` | `rgba(255,255,255,.07)` | `#fff` | `rgba(255,255,255,.14)` | 叠加在背景图上方 |
| `paper` | `#fdfbf7` | `#3e2c1c` | `#d4c5a9` | 阅读 / 笔记风格 |
| `gradient` | 紫蓝渐变 | `#fff` | `transparent` | 活力氛围 |

默认值为 `light`，省略 `theme` 属性即为亮色主题。

---

## 属性总览

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
|------|------|--------|--------|------|
| `width` | CSS 值 | `100%` | 任意 CSS 尺寸 | 容器宽度 |
| `height` | CSS 值 | `auto` | 任意 CSS 尺寸 | 容器高度 |
| `Borad` | 数字 | `12` | 任意数字 | 圆角半径（px） |
| `padding` | 字符串 | `md` | `none` / `sm` / `md` / `lg` / `xl` | 内边距等级 |
| `direction` | 字符串 | `row` | `row` / `col` / `row-reverse` / `col-reverse` | Flex 主轴方向 |
| `wrap` | 布尔 | 不换行 | 存在即启用 | 是否允许 Flex 子项换行 |
| `gap` | CSS 值 | `0` | 任意 CSS 尺寸 | Flex 子项间距 |
| `justify` | 字符串 | `start` | `start` / `center` / `end` / `between` / `around` / `evenly` | 主轴对齐方式 |
| `align` | 字符串 | `stretch` | `start` / `center` / `end` / `stretch` / `baseline` | 交叉轴对齐方式 |
| `offset-x` | CSS 值 | `0` | 任意 CSS translate 值 | X 轴微调偏移量 |
| `offset-y` | CSS 值 | `0` | 任意 CSS translate 值 | Y 轴微调偏移量 |
| `theme` | 字符串 | `light` | `light` / `dark` / `neon` / `glass` / `paper` / `gradient` | 主题 |
| `accent` | 颜色 | `#6c5ce7` | 任意 CSS 颜色 | 主题强调色 |
| `glow` | 布尔 | 无 | 存在即启用 | 外发光效果 |
| `glass` | 布尔 | 无 | 存在即启用 | 毛玻璃蒙层 |
| `glass-blur` | CSS 值 | `8px` | 任意 blur 值 | 毛玻璃模糊程度 |
| `shadowlevel` | 数字 | `1` | `0` / `1` / `2` / `3`... | 阴影等级（乘数），`0` 为无阴影 |
| `bordercolor` | 颜色 | 主题默认 | 任意 CSS 颜色 | 自定义边框颜色 |
| `backcolor` | 颜色 | 主题默认 | 任意 CSS 颜色 | 自定义背景颜色 |
| **`no-background`** | 布尔 | 无 | 存在即启用 | **隐藏背景（背景变透明）** |
| **`no-border`** | 布尔 | 无 | 存在即启用 | **隐藏边框（边框 = none）** |
| `bg-image` | URL | 无 | 图片 URL 字符串 | 背景图片地址 |
| `bg-size` | CSS 值 | `cover` | `cover` / `contain` / 具体值 | 背景图片尺寸模式 |
| `bg-position` | CSS 值 | `center` | `center` / `top` / `left`... | 背景图片定位 |
| `bg-repeat` | 布尔 | 不重复 | 存在即启用 | 背景图片是否平铺 |
| `bg-effect` | 字符串 | `none` | `none` / `sakura` / `snow` | 装饰特效类型 |
| `fx-density` | 字符串 | `normal` | `sparse` / `normal` / `dense` | 特效粒子密度 |
| `fx-size` | 字符串 | `md` | `sm` / `md` / `lg` | 特效粒子大小 |
| `fx-angle` | 数字 | `45` | 0~360 | 飘落角度（度），左上→右下为正 |
| `anim` | 字符串 | `none` | 见入场动效表 | 入场动效 |
| `hover` | 字符串 | `none` | `none` / `lift` / `glow-pulse` | 悬停效果 |

---

## 尺寸与圆角

### 宽度 / 高度

`width` 和 `height` 接受任意 CSS 尺寸值：

```html
<miorian-block width="400px" height="200px">固定尺寸</miorian-block>
<miorian-block width="50vw" height="100vh">全屏一半宽</miorian-block>
<miorian-block>默认 100% × auto</miorian-block>
```

### 圆角 `Borad`

接受纯数字（单位 px），作用于 `border-radius`：

```html
<miorian-block Borad="0">直角</miorian-block>
<miorian-block Borad="8">小圆角</miorian-block>
<miorian-block Borad="12">默认圆角</miorian-block>
<miorian-block Borad="24">大圆角</miorian-block>
```

### 内边距 `padding`

| 值 | CSS 实际值 |
|----|-----------|
| `none` | `padding: 0` |
| `sm` | `padding: 10px 14px` |
| `md` | `padding: 18px 22px` |
| `lg` | `padding: 28px 32px` |
| `xl` | `padding: 40px 48px` |

---

## Flex 布局

Block 本质上是一个 Flex 容器，支持以下布局属性：

### direction

| 值 | CSS 对应 |
|----|---------|
| `row` | `flex-direction: row` |
| `col` | `flex-direction: column` |
| `row-reverse` | `flex-direction: row-reverse` |
| `col-reverse` | `flex-direction: column-reverse` |

### justify（主轴对齐）

| 值 | CSS 对应 |
|----|---------|
| `start` | `flex-start` |
| `center` | `center` |
| `end` | `flex-end` |
| `between` | `space-between` |
| `around` | `space-around` |
| `evenly` | `space-evenly` |

### align（交叉轴对齐）

| 值 | CSS 对应 |
|----|---------|
| `start` | `flex-start` |
| `center` | `center` |
| `end` | `flex-end` |
| `stretch` | `stretch` |
| `baseline` | `baseline` |

### wrap / gap

```html
<!-- 换行 + 间距 -->
<miorian-block direction="row" wrap gap="12px" justify="center">
  <miorian-block width="100px" height="60px">A</miorian-block>
  <miorian-block width="100px" height="60px">B</miorian-block>
  <miorian-block width="100px" height="60px">C</miorian-block>
</miorian-block>
```

### offset-x / offset-y

微调偏移，通过 CSS `transform: translate()` 实现：

```html
<miorian-block offset-x="10" offset-y="-5">向右 10px，向上 5px</miorian-block>
```

---

## 视觉特效

### 毛玻璃 `glass`

启用 `glass` 后，Block 内部会生成一层 `backdrop-filter: blur()` 遮罩，覆盖在背景图之上、内容之下。模糊程度由 `glass-blur` 控制：

```html
<miorian-block
  glass glass-blur="12px"
  bg-image="https://example.com/bg.jpg"
  theme="light" height="300px"
>
  <p>内容在毛玻璃之上清晰可见</p>
</miorian-block>
```

### 外发光 `glow`

```html
<miorian-block glow accent="#00e5ff" theme="dark">
  <p>带青色外发光的 Block</p>
</miorian-block>
```

### 隐藏背景 / 隐藏边框

两个新增的布尔属性，用于灵活控制视觉效果：

| 属性 | 效果 |
|------|------|
| `no-background` | 背景变为 `transparent`，背景图也一并隐藏 |
| `no-border` | 边框设为 `none` |

**使用示例：**

```html
<!-- 隐藏背景，只保留边框 -->
<miorian-block theme="light" no-background>
  透明背景，边框可见
</miorian-block>

<!-- 隐藏边框，只保留背景 -->
<miorian-block theme="light" no-border>
  正常背景，无边框
</miorian-block>

<!-- 完全透明容器（无背景无边框） -->
<miorian-block theme="light" no-background no-border>
  纯透明容器
</miorian-block>

<!-- 配合自定义边框色使用 -->
<miorian-block theme="dark" no-background bordercolor="#00e5ff">
  透明背景 + 青色边框
</miorian-block>
```

### 自定义背景色与边框色

`backcolor` 和 `bordercolor` 可覆盖主题默认值：

```html
<!-- 自定义背景色和边框色 -->
<miorian-block backcolor="#fff8e1" bordercolor="#f59e0b">
  暖黄背景 + 琥珀色边框
</miorian-block>

<!-- 只改边框色 -->
<miorian-block bordercolor="#6366f1">
  默认背景 + 靛蓝边框
</miorian-block>
```

### 背景图片

| 属性 | 说明 | 默认值 |
|------|------|--------|
| `bg-image` | 图片 URL | 无 |
| `bg-size` | 尺寸模式 | `cover` |
| `bg-position` | 定位 | `center` |
| `bg-repeat` | 是否平铺 | 不平铺 |

```html
<!-- 覆盖模式（默认） -->
<miorian-block bg-image="https://example.com/img.jpg" height="300px">...</miorian-block>

<!-- 平铺小图 -->
<miorian-block bg-image="https://example.com/pattern.png" bg-repeat bg-size="40px" height="200px">...</miorian-block>
```

### 阴影等级 `shadowlevel`

| 值 | 效果 |
|----|------|
| `0` | 无阴影 |
| `1` | 默认阴影（轻微浮起） |
| `2` | 中等阴影 |
| `3` | 明显阴影 |

```html
<miorian-block shadowlevel="0">无阴影</miorian-block>
<miorian-block shadowlevel="3">深度阴影</miorian-block>
```

---

## 装饰特效（樱花 / 雪花）

通过 `bg-effect` 启用粒子特效，配合 `fx-density`、`fx-size`、`fx-angle` 微调。

### bg-effect

| 值 | 效果 |
|----|------|
| `none` | 无特效 |
| `sakura` | 粉红色椭圆花瓣飘落 |
| `snow` | 白色半透明圆点飘落 |

### fx-density（粒子密度）

| 值 | 樱花（每半屏） | 雪花（每半屏） |
|----|-------------|-------------|
| `sparse` | 14 个 | 12 个 |
| `normal` | 28 个 | 24 个 |
| `dense` | 48 个 | 42 个 |

### fx-size（粒子大小）

| 值 | 樱花椭圆范围 | 雪花半径范围 |
|----|------------|------------|
| `sm` | 3~6 × 3~6 px | 1.5~2.5 px |
| `md` | 4~9 × 4~9 px | 3~5 px |
| `lg` | 8~15 × 8~15 px | 5~7 px |

### fx-angle（飘落角度）

- `0` → 垂直向下
- `45` → 左上→右下（默认）
- `90` → 水平向右
- `135` → 左下→右上

```html
<!-- 密集大雪花，30° 斜飘 -->
<miorian-block
  bg-effect="snow"
  fx-density="dense"
  fx-size="lg"
  fx-angle="30"
  theme="dark"
  height="400px"
>
  <p>雪花飘落</p>
</miorian-block>

<!-- 稀疏小樱花，垂直下落 -->
<miorian-block
  bg-effect="sakura"
  fx-density="sparse"
  fx-size="sm"
  fx-angle="0"
  theme="light"
  height="400px"
>
  <p>樱花飘落</p>
</miorian-block>
```

---

## 入场动效

通过 `anim` 属性设置 Block 出现时的动画效果。

| 值 | 效果 | 时长 | 说明 |
|----|------|------|------|
| `none` | 无动效 | — | 默认 |
| `fade-in` | 淡入 | 0.5s | 透明度 0→1 |
| `slide-up` | 上滑淡入 | 0.5s | 从下方 24px 滑入 |
| `slide-down` | 下滑淡入 | 0.5s | 从上方 24px 滑入 |
| `slide-left` | 左滑淡入 | 0.5s | 从右侧 24px 滑入 |
| `slide-right` | 右滑淡入 | 0.5s | 从左侧 24px 滑入 |
| `pop` | 弹出 | 0.45s | 缩放 0.92→1.03→1 |
| `bounce` | 弹跳 | 1.2s | 上下弹跳 |
| `shake` | 抖动 | 0.6s | 左右抖动 |
| `pulse` | 脉冲 | 2s 循环 | 无限缩放呼吸 |
| `spin` | 旋转 | 3s 循环 | 无限 360° 旋转 |

```html
<miorian-block anim="pop" theme="light" padding="md">
  <p>弹出动画</p>
</miorian-block>
```

---

## 悬停效果

通过 `hover` 属性设置鼠标悬停时的交互反馈。

| 值 | 说明 |
|----|------|
| `none` | 无悬停效果 |
| `lift` | 悬停时向上浮起 4px |
| `glow-pulse` | 悬停时外发光增强闪烁（建议配合 `glow` 使用） |

```html
<miorian-block hover="lift" shadowlevel="2">
  <p>悬停浮起</p>
</miorian-block>

<miorian-block hover="glow-pulse" glow accent="#a78bfa" theme="dark">
  <p>发光脉冲</p>
</miorian-block>
```

---

## 层级关系

在 Block 内部，各视觉层的 z-index（从底到顶）：

```
z-index: 1  →  毛玻璃蒙层 .glass-overlay
z-index: 2  →  内容插槽 .slot-wrap（子元素所在层）
z-index: 3  →  樱花/雪花粒子特效 ::before
```

总结：

- 毛玻璃蒙层处于最底层，模糊下方背景但不遮挡内容。
- 子元素在毛玻璃上方，清晰可见。
- 樱花/雪花粒子特效在一切之上。

---

## 完整示例

### 基础使用

```html
<miorian-block theme="light" padding="md" shadowlevel="2"
  direction="column" justify="center" align="center"
  height="200px">
  <h2>标题</h2>
  <p>内容文字</p>
</miorian-block>
```

### 背景图 + 毛玻璃 + 雪花特效

```html
<miorian-block
  theme="light"
  bg-image="https://uapis.cn/api/v1/random/image?category=acg&type=pc"
  glass glass-blur="8px"
  bg-effect="snow"
  fx-density="dense" fx-size="lg" fx-angle="45"
  glow shadowlevel="2"
  direction="column" justify="center" align="center"
  padding="xl" height="400px"
  Borad="16"
>
  <h2 style="color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.3)">欢迎</h2>
  <p style="color:rgba(255,255,255,.8)">雪花在毛玻璃之上飘落</p>
</miorian-block>
```

### 透明容器 + 自定义边框

```html
<miorian-block
  theme="dark"
  no-background
  bordercolor="#00e5ff"
  direction="row" gap="12px" justify="center"
  padding="md"
>
  <span style="color:#fff">透明背景的容器</span>
</miorian-block>
```

### Flex 嵌套布局

```html
<miorian-block theme="dark" direction="row" gap="12px" padding="md" height="200px">
  <miorian-block theme="neon" accent="#00e5ff" width="100px" justify="center" align="center">A</miorian-block>
  <miorian-block theme="neon" accent="#a78bfa" width="100px" justify="center" align="center">B</miorian-block>
  <miorian-block theme="neon" accent="#f59e0b" width="100px" justify="center" align="center">C</miorian-block>
</miorian-block>
```

---

> 文档版本：v2.0 | 最后更新：2026-08-12
