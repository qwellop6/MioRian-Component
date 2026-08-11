/* ═══════════════════ 特效生成器 ═══════════════════ */

/* 伪随机发生器，保证同参数生成稳定 */
function fxRandom(seed) {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
}

/* 樱花背景 */
function buildSakuraBg(density, size) {
  const counts = { sparse: 14, normal: 28, dense: 48 };
  const sizes  = {
    sm: [[4,5],[5,6],[3,4]],
    md: [[6,8],[4,6],[7,9]],
    lg: [[10,13],[8,10],[12,15]]
  };
  const colors = ['#ffb7c5','#ff9eaf','#ffcfd8','#ffaabb','#fec7d7'];
  const n = counts[density] || 28;
  const sz = sizes[size] || sizes.md;
  const rng = fxRandom(n * 137 + (size === 'sm' ? 1 : size === 'lg' ? 3 : 2));
  const parts = [];

  for (let half = 0; half < 2; half++) {
    for (let i = 0; i < n; i++) {
      const x = (rng() * 94 + 3).toFixed(1);
      const yOff = half * 50 + (rng() * 46 + 2);
      const pair = sz[Math.floor(rng() * sz.length)];
      const sx = (pair[0] + rng() * 2).toFixed(1);
      const sy = (pair[1] + rng() * 2).toFixed(1);
      const c = colors[Math.floor(rng() * colors.length)];
      parts.push(`radial-gradient(ellipse ${sx}px ${sy}px at ${x}% ${yOff.toFixed(1)}%, ${c} 50%,transparent 50%)`);
    }
  }
  return parts.join(',');
}

/* 雪花背景 */
function buildSnowBg(density, size) {
  const counts = { sparse: 12, normal: 24, dense: 42 };
  const sizes  = {
    sm: [2,2.5,1.5],
    md: [4,5,3],
    lg: [6,7,5]
  };
  const n = counts[density] || 24;
  const sz = sizes[size] || sizes.md;
  const rng = fxRandom(n * 251 + (size === 'sm' ? 7 : size === 'lg' ? 13 : 11));
  const parts = [];

  for (let half = 0; half < 2; half++) {
    for (let i = 0; i < n; i++) {
      const x = (rng() * 94 + 3).toFixed(1);
      const yOff = half * 50 + (rng() * 46 + 2);
      const r = (sz[0] + (sz[1] - sz[0]) * rng()).toFixed(1);
      const a = (0.6 + rng() * 0.4).toFixed(1);
      parts.push(`radial-gradient(${r}px ${r}px at ${x}% ${yOff.toFixed(1)}%, rgba(255,255,255,${a}) 50%,transparent 50%)`);
    }
  }
  return parts.join(',');
}

/* ═══════════════════ 组件 ═══════════════════ */

class Block extends HTMLElement {
  constructor() {
    super();
    this._s = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    /* ── 尺寸 ── */
    const width  = this.getAttribute('width')  || '100%';
    const height = this.getAttribute('height') || 'auto';
    const Borad  = this.getAttribute('Borad')  || '12';

    /* ── 内边距 ── */
    const padding = this.getAttribute('padding') || 'md';

    /* ── Flex 布局 ── */
    const direction = this.getAttribute('direction') || 'row';
    const wrap      = this.hasAttribute('wrap');
    const gap       = this.getAttribute('gap')       || '0';
    const justify   = this.getAttribute('justify')   || 'start';
    const align     = this.getAttribute('align')     || 'stretch';

    /* ── 微调偏移 ── */
    const offsetX = this.getAttribute('offset-x') || '0';
    const offsetY = this.getAttribute('offset-y') || '0';

    /* ── 主题 ── */
    const theme  = this.getAttribute('theme')  || 'light';
    const accent = this.getAttribute('accent') || '#6c5ce7';

    /* ── 视觉 ── */
    const glow        = this.hasAttribute('glow');
    const glass       = this.hasAttribute('glass');
    const glassBlur   = this.getAttribute('glass-blur')   || '8px'; // 毛玻璃模糊程度
    const shadowL     = this.getAttribute('shadowlevel') || '1';
    const bordercolor = this.getAttribute('bordercolor');
    const backcolor   = this.getAttribute('backcolor');

    /* ── 背景图片 ── */
    const bgImage    = this.getAttribute('bg-image')    || '';
    const bgSize     = this.getAttribute('bg-size')     || 'cover';
    const bgPosition = this.getAttribute('bg-position') || 'center';
    const bgRepeat   = this.hasAttribute('bg-repeat');

    /* ── 装饰特效 ── */
    const bgEffect = this.getAttribute('bg-effect') || 'none';

    /* ── 特效参数 ── */
    const fxDensity = this.getAttribute('fx-density') || 'normal'; // sparse | normal | dense
    const fxSize    = this.getAttribute('fx-size')    || 'md';     // sm | md | lg
    const fxAngle   = parseFloat(this.getAttribute('fx-angle')) || 45; // 飘落角度（度），左上→右下为正

    /* ── 动效 ── */
    const anim  = this.getAttribute('anim')  || 'none';
    const hover = this.getAttribute('hover') || 'none';

    /* ── 注入 CSS 变量 ── */
    const s = this.style;
    s.setProperty('--w',       width);
    s.setProperty('--h',       height);
    s.setProperty('--borad',   Borad + 'px');
    s.setProperty('--gap',     gap);
    s.setProperty('--accent',  accent);
    s.setProperty('--sl',      shadowL);
    s.setProperty('--ox',      offsetX);
    s.setProperty('--oy',      offsetY);
    if (bordercolor) s.setProperty('--ov-bd', bordercolor);
    if (backcolor)   s.setProperty('--ov-bg', backcolor);
    if (bgImage)     s.setProperty('--bg-img', `url('${bgImage}')`);
    s.setProperty('--bg-sz',  bgSize);
    s.setProperty('--bg-pos', bgPosition);
    s.setProperty('--bg-rp',  bgRepeat ? 'repeat' : 'no-repeat');
    if (glass) s.setProperty('--glass-blur', glassBlur);
    this.setAttribute('data-theme', theme);

    /* ── 特效背景图片生成 ── */
    if (bgEffect === 'sakura') {
      s.setProperty('--fx-sakura-bg', buildSakuraBg(fxDensity, fxSize));
    }
    if (bgEffect === 'snow') {
      s.setProperty('--fx-snow-bg', buildSnowBg(fxDensity, fxSize));
    }

    /* ── 飘落角度：左上→右下为正角，dx = -tan(θ) × 50% ── */
    if (bgEffect === 'sakura' || bgEffect === 'snow') {
      const rad = fxAngle * Math.PI / 180;
      const dx  = Math.round(Math.tan(rad) * -50);
      s.setProperty('--fx-dx', dx + '%');
    }

    /* ── 构建 ── */
    const animClass   = anim  !== 'none' ? `anim anim-${anim}` : '';
    const glassClass  = glass ? 'has-glass' : '';
    const glowClass   = glow  ? 'has-glow'  : '';
    const glassLayer  = glass ? '<div class="glass-overlay"></div>' : '';
    const slotOpen    = glass ? '<div class="slot-wrap"><slot></slot></div>' : '<slot></slot>';

    this._s.innerHTML = `<style>${C}</style>
      <div class="frame
        flx-d-${direction}
        flx-j-${justify}
        flx-a-${align}
        flx-${wrap ? 'wrap' : 'nowrap'}
        pd-${padding}
        hv-${hover}
        eff-${bgEffect}
        ${glassClass} ${glowClass} ${animClass}
      ">
        ${glassLayer}
        ${slotOpen}
      </div>`;
  }
}

/* ═══════════════════════════════════════════
   CSS
   ═══════════════════════════════════════════ */
const C = `
:host{
  --accent:#6c5ce7;--sl:1;
  display:block;
  width:var(--w,100%);
  height:var(--h,auto);
  transform:translate(var(--ox,0),var(--oy,0));
  font-family:system-ui,-apple-system,'Segoe UI',sans-serif;
}

/* ─ 6 套主题 ─ */
:host([data-theme="light"]){--t-bg:#fff;--t-fg:#1a1a2e;--t-sub:#6c7086;--t-bd:#e8e8e8}
:host([data-theme="dark"]){--t-bg:#1a1a2e;--t-fg:#f0f0f0;--t-sub:#9a9ab0;--t-bd:#2a2a3e}
:host([data-theme="neon"]){--t-bg:#0d0221;--t-fg:#f0f0ff;--t-sub:#b080ff;--t-bd:var(--accent)}
:host([data-theme="glass"]){--t-bg:rgba(255,255,255,.07);--t-fg:#fff;--t-sub:rgba(255,255,255,.72);--t-bd:rgba(255,255,255,.14)}
:host([data-theme="paper"]){--t-bg:#fdfbf7;--t-fg:#3e2c1c;--t-sub:#8a7960;--t-bd:#d4c5a9}
:host([data-theme="gradient"]){--t-bg:linear-gradient(135deg,#667eea,#764ba2);--t-fg:#fff;--t-sub:rgba(255,255,255,.82);--t-bd:transparent}

/* ─ 核心框架 ─ */
.frame{
  position:relative;box-sizing:border-box;
  width:100%;height:100%;
  border-radius:var(--borad,12px);
  background:var(--ov-bg,var(--t-bg));
  background-image:var(--bg-img,none);
  background-size:var(--bg-sz,cover);
  background-position:var(--bg-pos,center);
  background-repeat:var(--bg-rp,no-repeat);
  border:2px solid var(--ov-bd,var(--t-bd));
  color:var(--t-fg);
  display:flex;
  gap:var(--gap,0);
  transition:transform .35s cubic-bezier(.22,1,.36,1),
              box-shadow .35s ease,
              border-color .3s ease;
  box-shadow:
    0 calc(2px*var(--sl)) calc(9px*var(--sl)) rgba(0,0,0,calc(.07*var(--sl))),
    0 calc(1px*var(--sl)) calc(3px*var(--sl)) rgba(0,0,0,calc(.04*var(--sl)));
}

/* ─ Glass 毛玻璃覆盖层（在图上方、内容下方）─ */
.glass-overlay{
  position:absolute;inset:0;
  backdrop-filter:blur(var(--glass-blur,8px));
  -webkit-backdrop-filter:blur(var(--glass-blur,8px));
  border-radius:inherit;
  z-index:1;pointer-events:none;
}
.slot-wrap{
  position:relative;z-index:2;width:100%;
  display:flex;flex-direction:inherit;
  gap:inherit;
}

/* ─ Glow ─ */
  box-shadow:0 0 26px -4px var(--accent),
             0 calc(2px*var(--sl)) calc(12px*var(--sl)) rgba(0,0,0,.16);
}

/* ─ Flex ─ */
.flx-d-row           {flex-direction:row}
.flx-d-col           {flex-direction:column}
.flx-d-row-reverse   {flex-direction:row-reverse}
.flx-d-col-reverse   {flex-direction:column-reverse}

.flx-j-start   {justify-content:flex-start}
.flx-j-center  {justify-content:center}
.flx-j-end     {justify-content:flex-end}
.flx-j-between {justify-content:space-between}
.flx-j-around  {justify-content:space-around}
.flx-j-evenly  {justify-content:space-evenly}

.flx-a-start    {align-items:flex-start}
.flx-a-center   {align-items:center}
.flx-a-end      {align-items:flex-end}
.flx-a-stretch  {align-items:stretch}
.flx-a-baseline {align-items:baseline}

.flx-wrap   {flex-wrap:wrap}
.flx-nowrap {flex-wrap:nowrap}

/* ─ 内边距 ─ */
.pd-none{padding:0}
.pd-sm  {padding:10px 14px}
.pd-md  {padding:18px 22px}
.pd-lg  {padding:28px 32px}
.pd-xl  {padding:40px 48px}

/* ─ 悬停 ─ */
.hv-lift:hover{transform:translateY(-4px)}
.hv-glow-pulse:hover{
  box-shadow:0 0 42px 0 var(--accent),
             0 calc(4px*var(--sl)) calc(20px*var(--sl)) rgba(0,0,0,.22);
}

/* ═══════════════════ 入场动效 ═══════════════════ */
@keyframes mFadeIn    {from{opacity:0}to{opacity:1}}
@keyframes mSlideUp   {from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes mSlideDown {from{opacity:0;transform:translateY(-24px)}to{opacity:1;transform:translateY(0)}}
@keyframes mSlideLeft {from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:translateX(0)}}
@keyframes mSlideRight{from{opacity:0;transform:translateX(-24px)}to{opacity:1;transform:translateX(0)}}
@keyframes mPop  {0%{opacity:0;transform:scale(.92)}60%{transform:scale(1.03)}100%{opacity:1;transform:scale(1)}}
@keyframes mBounce{0%,20%,50%,80%,100%{transform:translateY(0)}40%{transform:translateY(-12px)}60%{transform:translateY(-5px)}}
@keyframes mShake{0%,100%{transform:translateX(0)}10%,30%,50%,70%,90%{transform:translateX(-4px)}20%,40%,60%,80%{transform:translateX(4px)}}
@keyframes mPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}
@keyframes mSpin {from{transform:rotate(0deg)}to{transform:rotate(360deg)}}

.anim-fade-in    {animation:mFadeIn    .5s ease both}
.anim-slide-up   {animation:mSlideUp   .5s cubic-bezier(.22,1,.36,1) both}
.anim-slide-down {animation:mSlideDown .5s cubic-bezier(.22,1,.36,1) both}
.anim-slide-left {animation:mSlideLeft .5s cubic-bezier(.22,1,.36,1) both}
.anim-slide-right{animation:mSlideRight.5s cubic-bezier(.22,1,.36,1) both}
.anim-pop        {animation:mPop       .45s cubic-bezier(.22,1,.36,1) both}
.anim-bounce     {animation:mBounce    1.2s ease both}
.anim-shake      {animation:mShake     .6s ease both}
.anim-pulse      {animation:mPulse     2s ease-in-out infinite}
.anim-spin       {animation:mSpin      3s linear infinite}

/* ═══════════════════ 装饰特效 ═══════════════════ */
/* sakura 和 snow 需 overflow:hidden 裁剪圆角边缘 */
.frame.eff-sakura,
.frame.eff-snow{overflow:hidden}

/* ── 樱花：飘落 ── */
.eff-sakura::before{
  content:'';position:absolute;top:0;left:0;width:100%;height:200%;
  background-image:var(--fx-sakura-bg,none);
  animation:sakuraFall 10s linear infinite;
  pointer-events:none;z-index:1;
}
@keyframes sakuraFall{0%{transform:translate(var(--fx-dx,-50%),-50%)}100%{transform:translate(0,0)}}

/* ── 飘雪：飘落 ── */
.eff-snow::before{
  content:'';position:absolute;top:0;left:0;width:100%;height:200%;
  background-image:var(--fx-snow-bg,none);
  animation:snowFall 14s linear infinite;
  pointer-events:none;z-index:1;
}
@keyframes snowFall{0%{transform:translate(var(--fx-dx,-50%),-50%)}100%{transform:translate(0,0)}}

/* ═══════════════════ 插槽 ═══════════════════ */
::slotted(*){max-width:100%}
`;

customElements.define('miorian-block', Block);
