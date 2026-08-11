# MioRian 组件库

## 介绍

MioRian 是一套**纯原生 Web Components 组件库**，包含 6 个精心设计的 UI 组件：布局、按钮、输入框、卡片、弹窗和加载指示器。所有组件零依赖、无框架锁，直接以 HTML 自定义元素的形式运行，引入即用。

设计上追求两点：**高度可定制**，和**主题一致性**。每个组件都通过属性驱动外观，无需写一行 CSS 即可切换风格；同时 6 个组件共享同一套主题系统（6 套色板 + 强调色），放在同一页面里不会打架。

### 适用场景

- 个人主页、博客、作品集的身份卡片
- 后台管理系统的表单、按钮、弹窗
- 原型快速搭建、创意 Demo
- 嵌入任意 HTML 页面的独立 UI 模块

### 组件清单

| 组件 | 标签 | 用途 |
|------|------|------|
| Block | `<miorian-block>` | 万能布局容器，Flex 弹性布局 + 装饰特效 + 图片背景 + 动效 |
| Button | `<miorian-button>` | 按钮，实色 / 描边 / 幽灵三种变体 |
| Input | `<miorian-input>` | 输入框，支持文本、密码、邮箱、多行 |
| Card | `<miorian-card>` | 通用卡片容器，带头尾插槽 |
| Modal | `<miorian-modal>` | 弹窗，JS 控制开关，ESC / 遮罩关闭 |
| Spinner | `<miorian-spinner>` | 加载指示器，4 种动画样式 |

---

## 使用说明

### 1. 引入

将对应的 `.js` 文件通过 `<script>` 标签引入即可注册自定义元素：

```html
<script src="./Button.js"></script>
<script src="./Input.js"></script>
```

多个组件可一次性引入：

```html
<script src="./Block.js"></script>
<script src="./Button.js"></script>
<script src="./Input.js"></script>
<script src="./Card.js"></script>
<script src="./Modal.js"></script>
<script src="./Spinner.js"></script>
```

无需初始化，无需 `<script>` 中的额外代码——标签注册后直接可用。

### 2. 使用

以 HTML 属性的方式配置组件：

```html
<!-- 一个 Flex 行容器，樱花特效 + 弹出动画 -->
<miorian-block
  theme="light" direction="row" justify="center" gap="16px" padding="md"
  bg-effect="sakura" anim="pop" glow shadowlevel="2"
>
  <div>左侧内容</div>
  <div>右侧内容</div>
</miorian-block>

<!-- 一个渐变主题的按钮 -->
<miorian-button theme="gradient" variant="solid" rounded="full">
  立即体验
</miorian-button>

<!-- 一个带校验错误的输入框 -->
<miorian-input
  type="email" label="邮箱" placeholder="请输入邮箱"
  invalid message="邮箱格式不正确"
></miorian-input>
```

### 3. 通用设计规则

- **属性驱动** — 所有外观通过 HTML 属性控制，无需 CSS
- **布尔属性** — `glow`、`disabled`、`loading` 等按 HTML 惯例：属性存在即启用，不存在即禁用
- **主题优先** — 设置 `theme` 即获得完整色板；再通过 `accent` 微调强调色
- **属性覆盖** — 部分组件支持用独立属性（如 `bordercolor`）覆盖主题默认值
- **Shadow DOM** — 样式完全封装，不会污染外部页面，也不会被外部样式影响
- **无框架依赖** — 纯 Web Components，可搭配 React / Vue / Svelte 或裸 HTML 使用

---

## 共享属性

以下属性在所有组件中行为一致：

| 属性 | 类型 | 默认值 | 可选值 |
|------|------|--------|--------|
| `theme` | string | `light` | `light` / `dark` / `neon` / `glass` / `paper` / `gradient` |
| `accent` | string | `#6c5ce7` | 任意 CSS 颜色值（hex / rgb / hsl） |
| `glow` | boolean | 无 | 存在即启用发光效果 |
| `glass` | boolean | 无 | 存在即启用毛玻璃效果 |

---

## 1. Block — 布局容器

**标签** `<miorian-block>` | **类名** `Block` | **文件** `Block.js`

类似 `<div>` 的万能布局组件。自带 6 套主题、Flex 弹性布局、装饰特效、图片背景和 9 种动效。所有内容通过插槽自由放置。

### 尺寸

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `width` | string | `100%` | 宽度，任意 CSS 值（`300px`、`50vw`、`auto` …） |
| `height` | string | `auto` | 高度，任意 CSS 值 |
| `Borad` | string | `12` | 圆角半径，单位 px |

### 内边距

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
|------|------|--------|--------|------|
| `padding` | string | `md` | `none` / `sm` / `md` / `lg` / `xl` | 预设内边距，对应 0 / 10×14 / 18×22 / 28×32 / 40×48（px） |

### Flex 弹性布局

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
|------|------|--------|--------|------|
| `direction` | string | `row` | `row` / `col` / `row-reverse` / `col-reverse` | 主轴方向 |
| `wrap` | boolean | — | 存在即启用 | 允许子元素换行 |
| `gap` | string | `0` | 任意 CSS 值（`12px`、`1.5rem`、`2vw` …） | 子元素间距 |
| `justify` | string | `start` | `start` / `center` / `end` / `between` / `around` / `evenly` | 主轴对齐方式 |
| `align` | string | `stretch` | `start` / `center` / `end` / `stretch` / `baseline` | 交叉轴对齐方式 |

### 微调偏移

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `offset-x` | string | `0` | 水平偏移，支持 px/vh/vw/rem 等（translateX） |
| `offset-y` | string | `0` | 垂直偏移（translateY） |

### 背景图片

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
|------|------|--------|--------|------|
| `bg-image` | string | — | 图片 URL | 背景图 |
| `bg-size` | string | `cover` | `cover` / `contain` / `auto` 或 CSS 值 | 背景尺寸 |
| `bg-position` | string | `center` | `center` / `top` / `bottom` / `left` / `right` 或 CSS 值 | 背景位置 |
| `bg-repeat` | boolean | — | 存在即启用 | 是否平铺（默认不平铺） |

### 主题覆盖

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `bordercolor` | string | — | 直接覆盖边框颜色 |
| `backcolor` | string | — | 直接覆盖背景颜色 |

### 装饰特效 `bg-effect`

| 值 | 效果 |
|----|------|
| `none` | 无特效（默认） |
| `sakura` | 樱花飘落——粉色花瓣从顶部飘落旋转 |
| `wave` | 波浪——底部 SVG 波浪左右流动 |
| `snow` | 雪花——白色雪点缓缓飘落 |
| `stars` | 星空——散布的星点闪烁呼吸 |
| `gradient-flow` | 流光渐变——accent → 紫色 → 粉色 渐变流动 |

### 入场动效 `anim`

| 值 | 效果 |
|----|------|
| `none` | 无动画 |
| `fade-in` | 淡入 |
| `slide-up` | 从下方滑入 |
| `slide-down` | 从上方滑入 |
| `slide-left` | 从右侧滑入 |
| `slide-right` | 从左侧滑入 |
| `pop` | 弹性弹出 |
| `bounce` | 弹跳 |
| `shake` | 左右抖动 |
| `pulse` | 呼吸脉冲（循环） |
| `spin` | 旋转（循环） |

### 悬停效果 `hover`

| 值 | 说明 |
|----|------|
| `none` | 无效果 |
| `lift` | 上浮 4px |
| `glow-pulse` | 发光脉冲增强 |

### 示例

```html
<!-- 基础：Flex 行容器，居中，带间距 -->
<miorian-block theme="light" direction="row" justify="center" align="center" gap="16px" padding="md">
  <div>子元素 1</div>
  <div>子元素 2</div>
</miorian-block>

<!-- 樱花背景 + 弹性弹出动画 -->
<miorian-block
  theme="light" direction="col" padding="lg"
  bg-effect="sakura" anim="pop" glow
>
  <h2>🌸 樱花下的内容</h2>
</miorian-block>

<!-- 图片背景 + 偏移微调 -->
<miorian-block
  width="400px" height="260px"
  bg-image="https://picsum.photos/800/520"
  bg-size="cover" bg-position="center"
  offset-x="20px" offset-y="10px"
  Borad="16" glow shadowlevel="2"
></miorian-block>

<!-- 波浪底栏 + 暗色主题 -->
<miorian-block
  theme="dark" direction="col" padding="xl"
  bg-effect="wave" hover="lift"
>
  <p>深色卡片，悬停上浮</p>
</miorian-block>
```

---

## 2. Button — 按钮

**标签** `<miorian-button>` | **类名** `Button` | **文件** `Button.js`

### 属性

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
|------|------|--------|--------|------|
| `variant` | string | `solid` | `solid` / `outline` / `ghost` | 实色填充 / 描边 / 透明幽灵按钮 |
| `size` | string | `md` | `sm` / `md` / `lg` | 小 / 中 / 大 |
| `rounded` | string | `md` | `none` / `md` / `full` | 无圆角 / 圆角 / 胶囊形 |
| `icon` | string | — | 任意文字或 emoji，显示在文字左侧 |
| `loading` | boolean | — | 存在即显示旋转加载动画并禁用点击 |
| `disabled` | boolean | — | 存在即变灰并禁用点击 |
| `glow` | boolean | — | 发光外阴影，hover 时增强 |
| `block` | boolean | — | 撑满父容器宽度 |

### 插槽

默认插槽：按钮文字内容。

### 示例

```html
<!-- 实色按钮 -->
<miorian-button theme="light" variant="solid" accent="#6366f1" size="md">
  确认提交
</miorian-button>

<!-- 描边按钮，带图标 -->
<miorian-button variant="outline" icon="🚀" rounded="full">
  立即开始
</miorian-button>

<!-- 加载中 -->
<miorian-button variant="solid" loading>保存中</miorian-button>

<!-- 撑满宽度 -->
<miorian-button variant="solid" block glow>整行按钮</miorian-button>
```

---

## 3. Input — 输入框

**标签** `<miorian-input>` | **类名** `Input` | **文件** `Input.js`

### 属性

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
|------|------|--------|--------|------|
| `type` | string | `text` | `text` / `password` / `email` / `textarea` | 输入类型，`textarea` 渲染多行文本框 |
| `label` | string | — | 输入框上方的标签文字 |
| `placeholder` | string | — | 占位提示文字 |
| `value` | string | — | 初始值 |
| `icon` | string | — | 左侧内嵌图标（文字或 emoji） |
| `size` | string | `md` | `sm` / `md` / `lg` | 尺寸 |
| `disabled` | boolean | — | 禁用状态 |
| `invalid` | boolean | — | 错误状态，边框变红 |
| `message` | string | — | 底部提示文字，`invalid` 状态下变红 |

### 只读属性（JavaScript）

| 属性 | 类型 | 说明 |
|------|------|------|
| `.native` | HTMLElement | 返回原生 `<input>` 或 `<textarea>` 元素 |

### 事件

| 事件 | 说明 |
|------|------|
| `change` | 输入内容变化时触发，`event.detail` 为当前值（字符串） |

### 示例

```html
<miorian-input
  type="text" label="用户名"
  placeholder="请输入用户名"
  icon="👤"
  size="md"
></miorian-input>

<miorian-input
  type="email" label="邮箱" placeholder="hello@example.com"
  invalid message="邮箱格式不正确"
></miorian-input>

<miorian-input
  type="textarea" label="备注"
  placeholder="请输入备注信息…"
></miorian-input>

<miorian-input
  type="password" label="密码"
  placeholder="至少 8 位"
  disabled
></miorian-input>
```

---

## 4. Card — 卡片

**标签** `<miorian-card>` | **类名** `Card` | **文件** `Card.js`

### 属性

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
|------|------|--------|--------|------|
| `padding` | string | `md` | `none` / `sm` / `md` / `lg` | 内容区内边距 |
| `hover` | string | `none` | `none` / `lift` / `border` | 悬停效果：无 / 上浮 / 边框高亮 |
| `shadowlevel` | string | `1` | `0` / `1` / `2` / `3` | 阴影层级 |
| `glow` | boolean | — | 发光效果 |
| `glass` | boolean | — | 毛玻璃效果 |
| `header` | string | — | 头部标题文字 |
| `footer` | string | — | 底部文字 |

### 插槽

| 插槽 | 说明 |
|------|------|
| 默认 | 卡片主体内容 |
| `header` | 头部区域（优先级高于 `header` 属性） |
| `footer` | 底部区域（优先级高于 `footer` 属性） |

### 示例

```html
<!-- 基础卡片 -->
<miorian-card theme="light" padding="md" hover="lift" shadowlevel="2">
  <p>这是卡片主体内容。</p>
</miorian-card>

<!-- 带头尾的卡片 -->
<miorian-card
  theme="light" header="📌 公告"
  footer="发布于 2026-08-11"
  hover="border" accent="#6366f1"
>
  <p>系统将于今晚 02:00-04:00 进行维护升级。</p>
</miorian-card>

<!-- 使用插槽 -->
<miorian-card theme="dark" glow glass>
  <div slot="header">⚡ 自定义头部</div>
  <p>毛玻璃 + 发光效果</p>
  <div slot="footer">底部内容</div>
</miorian-card>
```

---

## 5. Modal — 弹窗

**标签** `<miorian-modal>` | **类名** `Modal` | **文件** `Modal.js`

### 属性

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
|------|------|--------|--------|------|
| `title` | string | — | 弹窗标题文字 |
| `size` | string | `md` | `sm`(360px) / `md`(520px) / `lg`(680px) / `full`(近乎全屏) | 宽度 |
| `backdrop` | string | `dark` | `light` / `dark` / `blur` / `none` | 遮罩层样式 |
| `noclose` | boolean | — | 存在时禁止点击遮罩关闭、禁止 ESC 关闭、不显示 × 按钮 |
| `open` | boolean | — | 初始即打开（否则需调用 `.open()`） |

### JavaScript 方法

| 方法 | 参数 | 说明 |
|------|------|------|
| `.open()` | — | 打开弹窗 |
| `.close()` | — | 关闭弹窗 |
| `.toggle()` | — | 切换开/关状态 |

### 事件

| 事件 | 说明 |
|------|------|
| `open` | 打开时触发 |
| `close` | 关闭时触发 |

### 交互

- 点击遮罩层外围区域 → 关闭（`noclose` 时禁用）
- 按下 `Escape` → 关闭（`noclose` 时禁用）
- 点击右上角 × → 关闭（`noclose` 时隐藏）

### 示例

```html
<miorian-modal id="demo-modal" title="确认操作" size="sm" backdrop="blur">
  <p>确定要删除该项吗？此操作不可撤销。</p>
  <miorian-button variant="solid" accent="#e24b4a" size="sm">
    确认删除
  </miorian-button>
  <miorian-button variant="outline" size="sm" style="margin-left:8px">
    取消
  </miorian-button>
</miorian-modal>

<!-- 通过 JS 控制 -->
<script>
  const modal = document.getElementById('demo-modal');
  modal.open();   // 打开
  modal.close();  // 关闭
  modal.toggle(); // 切换
</script>
```

---

## 6. Spinner — 加载指示器

**标签** `<miorian-spinner>` | **类名** `Spinner` | **文件** `Spinner.js`

### 属性

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
|------|------|--------|--------|------|
| `variant` | string | `ring` | `ring` / `dots` / `pulse` / `bars` | 动画样式：旋转圆环 / 弹跳圆点 / 脉冲缩放 / 波动长条 |
| `size` | string | `md` | `sm`(20px) / `md`(32px) / `lg`(48px) / `xl`(64px) | 尺寸 |
| `speed` | string | `normal` | `slow` / `normal` / `fast` | 动画速度 |
| `accent` | string | `#6c5ce7` | 任意 CSS 颜色 | 主题色 |
| `label` | string | `Loading` | 无障碍标签文字（屏幕阅读器可见，视觉隐藏） |

### 示例

```html
<!-- 默认圆环 -->
<miorian-spinner></miorian-spinner>

<!-- 弹跳圆点，大号，快 -->
<miorian-spinner variant="dots" size="lg" speed="fast" accent="#f59e0b"></miorian-spinner>

<!-- 脉冲心跳，超大号 -->
<miorian-spinner variant="pulse" size="xl" accent="#e24b4a"></miorian-spinner>

<!-- 波动条 -->
<miorian-spinner variant="bars" size="md" accent="#10b981"></miorian-spinner>
```

---

## 统一主题预览

| 主题 | 背景 | 文字 | 特点 |
|------|------|------|------|
| `light` | 纯白 | 深色 | 默认明亮风格 |
| `dark` | 深蓝黑 | 浅灰 | 暗色模式 |
| `neon` | 深紫黑 | 浅紫 | 霓虹科技感 |
| `glass` | 半透白 | 纯白 | 毛玻璃，适合叠在图片上 |
| `paper` | 暖米白 | 深棕 | 纸质复古 |
| `gradient` | 紫蓝渐变 | 纯白 | 渐变风格 |

---

## 通用约定

- 所有组件使用 Shadow DOM，样式完全封装，不会与外部 CSS 冲突。
- 字体统一使用 `system-ui, -apple-system, 'Segoe UI', sans-serif`。
- 过渡动画曲线统一 `cubic-bezier(.22, 1, .36, 1)`。
- 布尔属性按 HTML 惯例：属性存在即为 `true`，不存在即为 `false`（不关心属性值内容）。
