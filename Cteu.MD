# MioRian UI Kit 组件文档

基于 Web Components（Shadow DOM）的轻量级 UI 组件库，零依赖、纯原生，通过自定义 HTML 标签使用。

---

## 目录

- [快速开始](#快速开始)
- [主题系统](#主题系统)
- [Block 布局容器](#1-block-布局容器-miorian-block)
- [Button 按钮](#2-button-按钮-miorian-button)
- [Card 卡片](#3-card-卡片-miorian-card)
- [Input 输入框](#4-input-输入框-miorian-input)
- [Modal 模态框](#5-modal-模态框-miorian-modal)
- [Spinner 加载动画](#6-spinner-加载动画-miorian-spinner)
- [层级关系说明](#层级关系说明)

---

## 快速开始

```html
<!-- 引入组件 -->
<script src="Block.js"></script>
<script src="Button.js"></script>
<script src="Input.js"></script>
<script src="Card.js"></script>
<script src="Modal.js"></script>
<script src="Spinner.js"></script>

<!-- 直接以 HTML 标签使用 -->
<miorian-button accent="#6366f1">点击我</miorian-button>
```

所有组件均通过 `customElements.define()` 注册为自定义元素，标签名统一使用 `miorian-` 前缀。无需任何构建工具即可在浏览器中运行。

---

## 主题系统

六个组件全部支持 **6 套内置主题**，通过 `theme` 属性切换。

| 主题值 | 说明 | 适用场景 |
|--------|------|----------|
| `light` | 白底深色文字，默认主题 | 常规亮色页面 |
| `dark` | 深色底浅色文字 | 深色模式面板 |
| `neon` | 霓虹暗紫底 + 荧光文字 | 科技感 / 炫酷展示 |
| `glass` | 半透明磨砂底 + 白色文字 | 叠加在背景图上方 |
| `paper` | 暖色纸质纹理底 + 棕色文字 | 阅读 / 笔记风格 |
| `gradient` | 紫蓝渐变底 + 白色文字 | 活力氛围 |

**使用方式：**

```html
<miorian-block theme="dark">...</miorian-block>
<miorian-button theme="neon">Neon Button</miorian-button>
```

默认值为 `light`，省略 `theme` 属性即为亮色主题。

---

## 1. Block 布局容器 `miorian-block`

Block 是最核心的布局容器组件，集成了 Flex 布局、毛玻璃效果、背景图片、樱花/雪花装饰特效以及多种入场动效。

### 1.1 标签名

```
<miorian-block>...</miorian-block>
```

### 1.2 属性总览

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
|------|------|--------|--------|------|
| `width` | CSS 值 | `100%` | 任意 CSS 尺寸 | 容器宽度，如 `100%`、`400px`、`50vw` |
| `height` | CSS 值 | `auto` | 任意 CSS 尺寸 | 容器高度，如 `auto`、`100vh`、`300px` |
| `Borad` | 数字 | `12` | 任意数字 | 圆角半径（px），如 `8`、`16`、`0` |
| `padding` | 字符串 | `md` | `none` / `sm` / `md` / `lg` / `xl` | 内边距等级 |
| `direction` | 字符串 | `row` | `row` / `col` / `row-reverse` / `col-reverse` | Flex 主轴方向 |
| `wrap` | 布尔 | 不换行 | 存在即启用 | 是否允许 Flex 子项换行 |
| `gap` | CSS 值 | `0` | 任意 CSS 尺寸 | Flex 子项间距，如 `12px`、`1rem` |
| `justify` | 字符串 | `start` | `start` / `center` / `end` / `between` / `around` / `evenly` | 主轴对齐方式 |
| `align` | 字符串 | `stretch` | `start` / `center` / `end` / `stretch` / `baseline` | 交叉轴对齐方式 |
| `offset-x` | CSS 值 | `0` | 任意 CSS translate 值 | X 轴微调偏移量 |
| `offset-y` | CSS 值 | `0` | 任意 CSS translate 值 | Y 轴微调偏移量 |
| `theme` | 字符串 | `light` | `light` / `dark` / `neon` / `glass` / `paper` / `gradient` | 主题 |
| `accent` | 颜色 | `#6c5ce7` | 任意 CSS 颜色 | 主题强调色 |
| `glow` | 布尔 | 无 | 存在即启用 | 外发光效果 |
| `glass` | 布尔 | 无 | 存在即启用 | 毛玻璃蒙层 |
| `glass-blur` | CSS 值 | `8px` | 任意 blur 值 | 毛玻璃模糊程度，如 `12px`、`4px` |
| `shadowlevel` | 数字 | `1` | `0` / `1` / `2` / `3`... | 阴影等级（乘数），`0` 为无阴影 |
| `bordercolor` | 颜色 | 主题默认 | 任意 CSS 颜色 | 自定义边框颜色 |
| `backcolor` | 颜色 | 主题默认 | 任意 CSS 颜色 | 自定义背景颜色 |
| `bg-image` | URL | 无 | 图片 URL 字符串 | 背景图片地址 |
| `bg-size` | CSS 值 | `cover` | `cover` / `contain` / 具体值 | 背景图片尺寸模式 |
| `bg-position` | CSS 值 | `center` | `center` / `top` / `left`... | 背景图片定位 |
| `bg-repeat` | 布尔 | 不重复 | 存在即启用 | 背景图片是否平铺 |
| `bg-effect` | 字符串 | `none` | `none` / `sakura` / `snow` | 装饰特效类型 |
| `fx-density` | 字符串 | `normal` | `sparse` / `normal` / `dense` | 特效粒子密度 |
| `fx-size` | 字符串 | `md` | `sm` / `md` / `lg` | 特效粒子大小 |
| `fx-angle` | 数字 | `45` | 0~360 | 樱花/雪花飘落角度（度），左上→右下为正 |
| `anim` | 字符串 | `none` | 见下表 | 入场动效 |
| `hover` | 字符串 | `none` | `none` / `lift` / `glow-pulse` | 悬停效果 |

### 1.3 内边距等级详情

| 值 | CSS 实际值 |
|----|-----------|
| `none` | `padding: 0` |
| `sm` | `padding: 10px 14px` |
| `md` | `padding: 18px 22px` |
| `lg` | `padding: 28px 32px` |
| `xl` | `padding: 40px 48px` |

### 1.4 入场动效 `anim`

| 值 | 效果 | 时长 | 说明 |
|----|------|------|------|
| `none` | 无动效 | — | 默认，直接显示 |
| `fade-in` | 淡入 | 0.5s | 透明度 0→1 |
| `slide-up` | 上滑淡入 | 0.5s | 从下方 24px 滑入 |
| `slide-down` | 下滑淡入 | 0.5s | 从上方 24px 滑入 |
| `slide-left` | 左滑淡入 | 0.5s | 从右侧 24px 滑入 |
| `slide-right` | 右滑淡入 | 0.5s | 从左侧 24px 滑入 |
| `pop` | 弹出 | 0.45s | 缩放 0.92→1.03→1 |
| `bounce` | 弹跳 | 1.2s | 上下弹跳效果 |
| `shake` | 抖动 | 0.6s | 左右抖动 |
| `pulse` | 脉冲 | 2s 循环 | 无限缩放呼吸 |
| `spin` | 旋转 | 3s 循环 | 无限 360° 旋转 |

### 1.5 悬停效果 `hover`

| 值 | 说明 |
|----|------|
| `none` | 无悬停效果 |
| `lift` | 悬停时向上浮起 4px |
| `glow-pulse` | 悬停时外发光增强闪烁 |

### 1.6 装饰特效详情

**`bg-effect`** 参数控制粒子特效类型：

- **`sakura`**（樱花）：粉红色椭圆花瓣，随机大小和透明度，向下飘落。
- **`snow`**（雪花）：白色圆点，半透明随机大小，向下飘落。

**`fx-density`** 控制粒子数量：

| 值 | 樱花数量 | 雪花数量 |
|----|---------|---------|
| `sparse` | 14 个/半屏（共 28） | 12 个/半屏（共 24） |
| `normal` | 28 个/半屏（共 56） | 24 个/半屏（共 48） |
| `dense` | 48 个/半屏（共 96） | 42 个/半屏（共 84） |

**`fx-size`** 控制粒子尺寸范围：

| 值 | 樱花椭圆 (sx×sy px) | 雪花半径 (px) |
|----|---------------------|--------------|
| `sm` | 3~6 × 3~6 | 1.5 ~ 2.5 |
| `md` | 4~9 × 4~9 | 3 ~ 5 |
| `lg` | 8~15 × 8~15 | 5 ~ 7 |

**`fx-angle`** 控制飘落方向：
- `0` → 垂直向下
- `45` → 左上→右下（默认）
- `90` → 水平向右
- `135` → 左下→右上

### 1.7 自定义样式覆盖

Block 支持通过 `backcolor` 和 `bordercolor` 属性直接覆盖主题的默认背景色和边框色，无需自定义 CSS。

```html
<miorian-block backcolor="#ffebcc" bordercolor="#e0a800">
  自定义颜色的 Block
</miorian-block>
```

### 1.8 子元素插槽

Block 的内容通过默认 `<slot>` 插入，所有直接子元素会按 Block 的 Flex 布局排列。

```html
<miorian-block direction="row" gap="16px" justify="center">
  <miorian-card>卡片 A</miorian-card>
  <miorian-card>卡片 B</miorian-card>
</miorian-block>
```

### 1.9 完整示例

```html
<!-- 基础用法 -->
<miorian-block theme="light" padding="md" shadowlevel="2">
  <p>这是一个基础的 Block 容器</p>
</miorian-block>

<!-- 暗色 + 毛玻璃 + 雪花特效 + 弹跳入场 -->
<miorian-block
  theme="dark"
  glass
  glass-blur="10px"
  bg-image="https://example.com/bg.jpg"
  bg-effect="snow"
  fx-density="dense"
  fx-size="lg"
  fx-angle="30"
  anim="bounce"
  glow
  shadowlevel="2"
  direction="column"
  justify="center"
  align="center"
  padding="xl"
  height="400px"
>
  <h2>欢迎</h2>
  <p>雪花飘落在毛玻璃上方</p>
</miorian-block>
```

---

## 2. Button 按钮 `miorian-button`

### 2.1 标签名

```
<miorian-button>按钮文字</miorian-button>
```

按钮文字写在标签内部。

### 2.2 属性总览

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
|------|------|--------|--------|------|
| `theme` | 字符串 | `light` | `light` / `dark` / `neon` / `glass` / `paper` / `gradient` | 主题 |
| `accent` | 颜色 | `#6c5ce7` | 任意 CSS 颜色 | 按钮主色 |
| `variant` | 字符串 | `solid` | `solid` / `outline` / `ghost` | 按钮样式变体 |
| `size` | 字符串 | `md` | `sm` / `md` / `lg` | 按钮尺寸 |
| `rounded` | 字符串 | `md` | `none` / `md` / `full` | 圆角模式 |
| `icon` | HTML 字符 | 无 | 任意 Unicode / Emoji | 按钮前方图标 |
| `loading` | 布尔 | 无 | 存在即启用 | 加载中状态（显示旋转动画） |
| `disabled` | 布尔 | 无 | 存在即启用 | 禁用状态（半透明、不可点击） |
| `glow` | 布尔 | 无 | 存在即启用 | 外发光效果 |
| `block` | 布尔 | 无 | 存在即启用 | 块级宽度（100%） |

### 2.3 变体 `variant` 详情

| 值 | 说明 | 效果 |
|----|------|------|
| `solid` | 实心填充 | 背景=accent 色，白色文字；hover 加深 15% |
| `outline` | 描边轮廓 | 透明背景，accent 色文字和边框；hover 填入 12% 透明着色 |
| `ghost` | 幽灵按钮 | 透明背景、无边框，accent 色文字；hover 填入 10% 透明着色 |

### 2.4 尺寸 `size` 详情

| 值 | 高度 | 内边距 | 字号 | spinner 大小 |
|----|------|--------|------|-------------|
| `sm` | 32px | 5px 14px | 0.78rem | 12px |
| `md` | 40px | 8px 20px | 0.88rem | 16px |
| `lg` | 48px | 11px 28px | 1rem | 20px |

### 2.5 圆角 `rounded` 详情

| 值 | border-radius |
|----|--------------|
| `none` | 4px |
| `md` | 8px |
| `full` | 999px（胶囊形） |

### 2.6 状态说明

- **loading**：显示旋转 spinner 并隐藏 icon，按钮处于不可点击状态（opacity: 0.5），按钮文字保留。
- **disabled**：按钮不可点击，整体半透明（opacity: 0.5）。
- **glow**：启用 accent 色外发光阴影，hover 时发光增强。

### 2.7 完整示例

```html
<!-- 基础实心按钮 -->
<miorian-button theme="light" accent="#6366f1">确认</miorian-button>

<!-- 描边按钮 -->
<miorian-button theme="light" accent="#6366f1" variant="outline">取消</miorian-button>

<!-- 幽灵按钮 -->
<miorian-button theme="dark" accent="#a78bfa" variant="ghost">了解更多</miorian-button>

<!-- 带图标的胶囊按钮 -->
<miorian-button theme="light" accent="#6366f1" icon="&#9998;" rounded="full">编辑</miorian-button>

<!-- 加载中的按钮 -->
<miorian-button theme="light" accent="#e24b4a" loading>提交中...</miorian-button>

<!-- 禁用按钮 -->
<miorian-button theme="light" accent="#999" disabled>不可用</miorian-button>

<!-- 发光大按钮 -->
<miorian-button theme="dark" accent="#00e5ff" glow size="lg">开始</miorian-button>

<!-- 块级宽度按钮（占据父容器 100% 宽度） -->
<miorian-button theme="light" accent="#6366f1" block>全宽按钮</miorian-button>
```

---

## 3. Card 卡片 `miorian-card`

### 3.1 标签名

```
<miorian-card>卡片内容</miorian-card>
```

### 3.2 属性总览

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
|------|------|--------|--------|------|
| `theme` | 字符串 | `light` | `light` / `dark` / `neon` / `glass` / `paper` / `gradient` | 主题 |
| `accent` | 颜色 | `#6c5ce7` | 任意 CSS 颜色 | 主题强调色 |
| `padding` | 字符串 | `md` | `none` / `sm` / `md` / `lg` | 内容区内边距 |
| `hover` | 字符串 | `none` | `none` / `lift` / `border` | 悬停效果 |
| `shadowlevel` | 数字 | `1` | `0` / `1` / `2` / `3`... | 阴影等级，`0` 无阴影 |
| `glow` | 布尔 | 无 | 存在即启用 | 外发光效果 |
| `glass` | 布尔 | 无 | 存在即启用 | 毛玻璃效果（backdrop-blur 16px） |
| `header` | 字符串 | 无 | 任意文本 | 卡片头部文字 |
| `footer` | 字符串 | 无 | 任意文本 | 卡片底部文字 |

### 3.3 内边距 `padding` 详情

| 值 | 内容区 padding |
|----|---------------|
| `none` | `padding: 0` |
| `sm` | `padding: 12px 16px` |
| `md` | `padding: 18px 22px` |
| `lg` | `padding: 28px 32px` |

### 3.4 悬停效果 `hover` 详情

| 值 | 说明 |
|----|------|
| `none` | 无悬停效果 |
| `lift` | 悬停时向上浮起 4px，阴影加深 |
| `border` | 悬停时边框变为 accent 色 |

### 3.5 具名插槽

Card 提供两个具名插槽：

| 插槽名 | 用途 | 备选方式 |
|--------|------|----------|
| `header`（具名） | 自定义头部内容 | 也可用 `header` 属性直接传文本 |
| 默认插槽 | 卡片主体内容 | — |
| `footer`（具名） | 自定义底部内容 | 也可用 `footer` 属性直接传文本 |

```html
<!-- 属性方式（纯文本） -->
<miorian-card header="标题文字" footer="底部备注">
  <p>主体内容</p>
</miorian-card>

<!-- 插槽方式（支持富文本 / 组件） -->
<miorian-card>
  <div slot="header">
    <h2>自定义标题</h2>
    <miorian-button size="sm">操作</miorian-button>
  </div>
  <p>主体内容</p>
  <div slot="footer">自定义底部</div>
</miorian-card>
```

### 3.6 完整示例

```html
<!-- 基础卡片 -->
<miorian-card theme="light" padding="md" hover="lift" shadowlevel="2">
  <p style="font-weight:600">Project Alpha</p>
  <p style="font-size:13px;color:#666">描述文字</p>
</miorian-card>

<!-- 带头部和边框悬停 -->
<miorian-card theme="light" padding="md" hover="border" header="通知">
  <p>新消息提醒</p>
</miorian-card>

<!-- 霓虹发光卡片 -->
<miorian-card theme="neon" padding="md" glow shadowlevel="2" header="Neon Card">
  <p>带发光的暗色卡片</p>
</miorian-card>

<!-- 毛玻璃卡片 -->
<miorian-card theme="glass" padding="md" glass hover="lift" header="Glass">
  <p>半透明毛玻璃效果</p>
</miorian-card>

<!-- 渐变背景卡片 -->
<miorian-card theme="gradient" padding="md" hover="lift" header="Gradient">
  <p>紫蓝渐变背景</p>
</miorian-card>

<!-- 无阴影扁平卡片 -->
<miorian-card theme="light" padding="md" shadowlevel="0">
  <p>无阴影的扁平卡片</p>
</miorian-card>
```

---

## 4. Input 输入框 `miorian-input`

### 4.1 标签名

```
<miorian-input></miorian-input>
```

Input 是自闭合组件，无需在标签内写内容。

### 4.2 属性总览

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
|------|------|--------|--------|------|
| `theme` | 字符串 | `light` | `light` / `dark` / `neon` / `glass` / `paper` / `gradient` | 主题 |
| `accent` | 颜色 | `#6c5ce7` | 任意 CSS 颜色 | 聚焦时的强调色 |
| `type` | 字符串 | `text` | `text` / `email` / `password` / `textarea` / 任意 input type | 输入框类型 |
| `placeholder` | 字符串 | 无 | 任意文本 | 占位提示文字 |
| `label` | 字符串 | 无 | 任意文本 | 输入框上方的标签文字 |
| `value` | 字符串 | 无 | 任意文本 | 初始值 |
| `icon` | HTML 字符 | 无 | 任意 Unicode / Emoji | 输入框左侧图标 |
| `size` | 字符串 | `md` | `sm` / `md` / `lg` | 输入框尺寸 |
| `disabled` | 布尔 | 无 | 存在即启用 | 禁用状态 |
| `invalid` | 布尔 | 无 | 存在即启用 | 错误状态（红色边框） |
| `message` | 字符串 | 无 | 任意文本 | 输入框下方的提示/错误信息 |

### 4.3 尺寸 `size` 详情

| 值 | padding | 字号 | 圆角 | icon 左边距 |
|----|---------|------|------|------------|
| `sm` | 6px 12px | 0.82rem | 8px | 34px |
| `md` | 10px 14px | 0.9rem | 10px | 38px |
| `lg` | 12px 18px | 1rem | 12px | 42px |

### 4.4 类型 `type` 详情

- **`text` / `email` / `password`**：标准 `<input>` 元素，支持所有 HTML input type 值。
- **`textarea`**：渲染为 `<textarea rows="4">` 多行文本域，支持 resize。

### 4.5 状态说明

- **`disabled`**：输入框不可编辑，半透明（opacity: 0.5）。
- **`invalid`**：边框变为红色（#e24b4a），聚焦时红色外光晕。
- **`message`**：显示在输入框下方的辅助文本，配合 `invalid` 时可显示红色错误提示。

### 4.6 事件

组件通过 Shadow DOM 内部的 input 事件向外派发自定义 `change` 事件：

```javascript
document.querySelector('miorian-input').addEventListener('change', (e) => {
  console.log(e.detail); // 当前输入值
});
```

也可以通过 `native` 属性获取原生 input 元素：

```javascript
const inputEl = document.querySelector('miorian-input').native;
inputEl.focus();
```

### 4.7 完整示例

```html
<!-- 基础输入框 -->
<miorian-input theme="light" label="用户名" placeholder="请输入用户名"
  icon="&#128100;"></miorian-input>

<!-- 邮箱输入 -->
<miorian-input theme="light" type="email" label="邮箱"
  placeholder="you@example.com"></miorian-input>

<!-- 密码输入 + 错误状态 -->
<miorian-input theme="light" type="password" label="密码"
  placeholder="********" invalid message="密码长度不足 8 位"></miorian-input>

<!-- 多行文本域 -->
<miorian-input theme="light" label="简介" type="textarea"
  placeholder="介绍一下你自己..."></miorian-input>

<!-- 暗色主题 -->
<miorian-input theme="dark" label="API Key" type="password"
  placeholder="sk-..."></miorian-input>

<!-- 霓虹主题带图标 -->
<miorian-input theme="neon" label="用户名" placeholder="@handle"
  icon="&#64;"></miorian-input>

<!-- 毛玻璃主题 -->
<miorian-input theme="glass" label="搜索" placeholder="搜索内容..."
  icon="&#128269;"></miorian-input>

<!-- 纸质主题 -->
<miorian-input theme="paper" label="笔记" type="textarea"
  placeholder="记录一些想法..."></miorian-input>

<!-- 禁用状态 -->
<miorian-input theme="light" label="只读" value="不可修改" disabled></miorian-input>

<!-- 小尺寸 -->
<miorian-input theme="light" size="sm" placeholder="小号输入框"></miorian-input>

<!-- 大尺寸 -->
<miorian-input theme="light" size="lg" placeholder="大号输入框"></miorian-input>
```

---

## 5. Modal 模态框 `miorian-modal`

### 5.1 标签名

```
<miorian-modal>模态框内容</miorian-modal>
```

### 5.2 属性总览

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
|------|------|--------|--------|------|
| `theme` | 字符串 | `light` | `light` / `dark` / `neon` / `glass` / `paper` / `gradient` | 主题 |
| `accent` | 颜色 | `#6c5ce7` | 任意 CSS 颜色 | 主题强调色 |
| `title` | 字符串 | 无 | 任意文本 | 模态框标题 |
| `size` | 字符串 | `md` | `sm` / `md` / `lg` / `full` | 模态框宽度 |
| `backdrop` | 字符串 | `dark` | `light` / `dark` / `blur` / `none` | 遮罩层样式 |
| `noclose` | 布尔 | 无 | 存在即启用 | 禁止关闭（隐藏×按钮，禁 ESC 和点击遮罩关闭） |
| `open` | 布尔 | 无 | 存在即启用 | 初始即打开状态 |

### 5.3 尺寸 `size` 详情

| 值 | 宽度 |
|----|------|
| `sm` | 360px |
| `md` | 520px |
| `lg` | 680px |
| `full` | calc(100vw - 48px)，最大高度 90vh |

### 5.4 遮罩 `backdrop` 详情

| 值 | 背景色 | 特效 |
|----|--------|------|
| `light` | rgba(255,255,255,0.7) | 无 |
| `dark` | rgba(0,0,0,0.55) | 无 |
| `blur` | rgba(0,0,0,0.2) | backdrop-blur(6px) 毛玻璃遮罩 |
| `none` | transparent | 完全透明遮罩 |

### 5.5 JavaScript API

Modal 组件在 DOM 元素上暴露三个方法：

```javascript
const modal = document.getElementById('my-modal');

// 打开模态框
modal.open();

// 关闭模态框
modal.close();

// 切换（开→关、关→开）
modal.toggle();
```

### 5.6 事件

| 事件名 | 触发时机 | detail |
|--------|---------|--------|
| `open` | 模态框打开时 | 无 |
| `close` | 模态框关闭时 | 无 |

```javascript
modal.addEventListener('open', () => console.log('模态框已打开'));
modal.addEventListener('close', () => console.log('模态框已关闭'));
```

### 5.7 关闭行为

默认情况下，以下三种方式均可关闭模态框：

1. 点击右上角 × 按钮
2. 按键盘 Escape 键
3. 点击遮罩层（模态框外部区域）

添加 `noclose` 属性后，以上三种方式均被禁用，只能通过 JavaScript 调用 `.close()` 关闭。

### 5.8 完整示例

```html
<!-- 模态框定义 -->
<miorian-modal id="my-modal" theme="light" title="提示" size="sm">
  <p style="line-height:1.6">确认执行此操作吗？此操作不可撤销。</p>
  <div style="display:flex;gap:10px;margin-top:16px;justify-content:flex-end">
    <miorian-button variant="ghost" accent="#666"
      onclick="document.getElementById('my-modal').close()">取消</miorian-button>
    <miorian-button accent="#6366f1"
      onclick="document.getElementById('my-modal').close()">确认</miorian-button>
  </div>
</miorian-modal>

<!-- 打开按钮 -->
<miorian-button accent="#6366f1"
  onclick="document.getElementById('my-modal').open()">打开模态框</miorian-button>

<!-- 初始即打开的模态框 -->
<miorian-modal id="modal-open" theme="dark" title="欢迎" open>
  <p>这个模态框页面加载后即刻显示</p>
</miorian-modal>

<!-- 大尺寸模态框 + 毛玻璃遮罩 -->
<miorian-modal id="lg-modal" theme="light" title="设置" size="lg" backdrop="blur">
  <miorian-input theme="light" label="名称" placeholder="输入名称"></miorian-input>
  <miorian-input theme="light" label="邮箱" type="email" placeholder="email@ex.com"></miorian-input>
</miorian-modal>

<!-- 不可关闭的模态框（只能通过代码控制） -->
<miorian-modal id="locked-modal" theme="neon" title="重要通知" noclose>
  <p>此模态框无法通过 ESC、× 按钮或点击遮罩关闭</p>
</miorian-modal>
```

---

## 6. Spinner 加载动画 `miorian-spinner`

### 6.1 标签名

```
<miorian-spinner></miorian-spinner>
```

自闭合标签，无需内容。

### 6.2 属性总览

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
|------|------|--------|--------|------|
| `variant` | 字符串 | `ring` | `ring` / `dots` / `pulse` / `bars` | 动画样式 |
| `size` | 字符串 | `md` | `sm` / `md` / `lg` / `xl` | 尺寸 |
| `accent` | 颜色 | `#6c5ce7` | 任意 CSS 颜色 | 动画颜色 |
| `speed` | 字符串 | `normal` | `slow` / `normal` / `fast` | 动画速度 |
| `label` | 字符串 | `Loading` | 任意文本 | 无障碍标签（屏幕阅读器可见） |

### 6.3 变体 `variant` 详情

| 值 | 效果说明 |
|----|---------|
| `ring` | 圆环旋转（border + 透明弧线） |
| `dots` | 三点弹跳（依次弹跳） |
| `pulse` | 圆形脉冲（缩放 + 透明度呼吸） |
| `bars` | 四条竖条波动（依次伸缩） |

### 6.4 尺寸 `size` 详情

| 值 | CSS 尺寸 | dots 点直径 | ring 描边 |
|----|---------|-----------|----------|
| `sm` | 20px | ~4.4px | 3px |
| `md` | 32px | ~7.1px | 3px |
| `lg` | 48px | ~10.7px | 3px |
| `xl` | 64px | ~14.2px | 3px |

### 6.5 速度 `speed` 详情

| 值 | 动画周期 |
|----|---------|
| `slow` | 1.2s |
| `normal` | 0.7s |
| `fast` | 0.4s |

### 6.6 完整示例

```html
<!-- 四种变体 -->
<miorian-spinner variant="ring" accent="#6366f1"></miorian-spinner>
<miorian-spinner variant="dots" accent="#6366f1"></miorian-spinner>
<miorian-spinner variant="pulse" accent="#6366f1"></miorian-spinner>
<miorian-spinner variant="bars" accent="#6366f1"></miorian-spinner>

<!-- 不同尺寸 -->
<miorian-spinner variant="ring" size="sm" accent="#6366f1"></miorian-spinner>
<miorian-spinner variant="ring" size="md" accent="#6366f1"></miorian-spinner>
<miorian-spinner variant="ring" size="lg" accent="#6366f1"></miorian-spinner>
<miorian-spinner variant="ring" size="xl" accent="#6366f1"></miorian-spinner>

<!-- 不同颜色 -->
<miorian-spinner variant="dots" size="lg" accent="#00e5ff"></miorian-spinner>
<miorian-spinner variant="ring" size="lg" accent="#a78bfa"></miorian-spinner>
<miorian-spinner variant="pulse" size="lg" accent="#f59e0b"></miorian-spinner>
<miorian-spinner variant="bars" size="lg" accent="#e24b4a"></miorian-spinner>

<!-- 不同速度 -->
<miorian-spinner variant="ring" speed="slow" accent="#6366f1"></miorian-spinner>
<miorian-spinner variant="ring" speed="normal" accent="#6366f1"></miorian-spinner>
<miorian-spinner variant="ring" speed="fast" accent="#6366f1"></miorian-spinner>

<!-- 无障碍标签 -->
<miorian-spinner variant="ring" label="数据加载中，请稍候"></miorian-spinner>
```

---

## 层级关系说明

在 Block 组件内部，各视觉层的 z-index 关系（从底到顶）：

```
z-index: 1  →  毛玻璃蒙层 .glass-overlay
z-index: 2  →  内容插槽 .slot-wrap（卡片等子元素所在层）
z-index: 3  →  樱花/雪花粒子特效 ::before
```

这意味着：

- 毛玻璃蒙层处于最底层，会模糊其下方的背景图，但不会遮挡卡片内容。
- 卡片等子组件在毛玻璃上方，清晰可见。
- 樱花/雪花动效在一切之上，始终浮在最前面。

Modal 组件使用 `z-index: 1000`（backdrop 层），独立于 Block 内部的层级系统，始终覆盖在所有内容之上。

---

> 文档版本：v1.0 | 最后更新：2026-08-12
