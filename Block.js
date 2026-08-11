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
    this.setAttribute('data-theme', theme);

    /* ── 构建 ── */
    const hasEffect  = bgEffect !== 'none';
    const animClass  = anim  !== 'none' ? `anim anim-${anim}` : '';
    const glassClass = glass ? 'has-glass' : '';
    const glowClass  = glow  ? 'has-glow'  : '';

    this._s.innerHTML = `<style>${C}</style>
      <div class="frame
        flx-d-${direction}
        flx-j-${justify}
        flx-a-${align}
        flx-${wrap ? 'wrap' : 'nowrap'}
        pd-${padding}
        hv-${hover}
        eff-${bgEffect}
        ${hasEffect ? 'has-effect' : ''}
        ${glassClass} ${glowClass} ${animClass}
      ">
        <slot></slot>
      </div>`;

    /* bg-effect 需要独立 layer，给 has-effect 的 frame 内部注入特效伪元素 */
    if (hasEffect && this._s) {
      const frame = this._s.querySelector('.frame');
      if (frame) {
        // 确保 overflow:hidden 在 frame 上（clip 特效不溢出）
        frame.style.overflow = 'hidden';
      }
    }
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

/* ─ Glass / Glow ─ */
.has-glass{
  backdrop-filter:blur(16px) saturate(1.5);
  -webkit-backdrop-filter:blur(16px) saturate(1.5);
}
.has-glow{
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

/* ── 樱花 ── */
.eff-sakura::before{
  content:'';position:absolute;top:-30px;left:5%;
  width:10px;height:10px;
  border-radius:50% 0 50% 50%;
  background:#ffb7c5;
  box-shadow:
    30px 10px 0 #ffcfd8,   80px -5px 0 #ff9eaf,
    130px 20px 0 #ffb7c5,  190px 5px 0 #ffcfd8,
    250px 15px 0 #ff9eaf,  320px 0 0 #ffb7c5,
    50px 60px 0 #ffcfd8,   140px 50px 0 #ff9eaf,
    210px 70px 0 #ffb7c5,  280px 55px 0 #ffcfd8,
    360px 45px 0 #ff9eaf,  70px 120px 0 #ffb7c5,
    160px 110px 0 #ffcfd8, 240px 130px 0 #ff9eaf;
  animation:sakuraFall 14s linear infinite;
  pointer-events:none;z-index:1;opacity:.8;
}
@keyframes sakuraFall{
  0%  {transform:translateY(-60px) rotate(0deg);opacity:0}
  3%  {opacity:.8}
  95% {opacity:.8}
  100%{transform:translateY(calc(100% + 100px)) rotate(420deg);opacity:0}
}

/* ── 波浪 ── */
.eff-wave::after{
  content:'';position:absolute;bottom:-2px;left:0;right:0;height:48px;
  background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath d='M0,60 C150,120 450,0 600,60 C750,120 1050,0 1200,60 L1200,120 L0,120 Z' fill='%23ffffff33'/%3E%3C/svg%3E") repeat-x;
  background-size:600px 48px;
  animation:waveDrift 6s linear infinite;
  pointer-events:none;z-index:1;opacity:.7;
}
@keyframes waveDrift{0%{background-position-x:0}100%{background-position-x:600px}}

/* ── 雪花 ── */
.eff-snow::before{
  content:'';position:absolute;top:-30px;left:10%;
  width:6px;height:6px;border-radius:50%;background:#fff;
  box-shadow:
    40px 15px 0 #fff,   90px 0 0 rgba(255,255,255,.8),
    150px 25px 0 #fff,  210px 10px 0 rgba(255,255,255,.6),
    280px 5px 0 #fff,   340px 30px 0 rgba(255,255,255,.7),
    25px 55px 0 #fff,   110px 60px 0 rgba(255,255,255,.8),
    180px 45px 0 #fff,  260px 75px 0 rgba(255,255,255,.6),
    330px 55px 0 #fff,  60px 110px 0 rgba(255,255,255,.7),
    150px 100px 0 #fff, 230px 120px 0 rgba(255,255,255,.8);
  animation:snowFall 18s linear infinite;
  pointer-events:none;z-index:1;opacity:.9;
}
@keyframes snowFall{
  0%  {transform:translateY(-50px) translateX(0);opacity:0}
  3%  {opacity:.9}
  95% {opacity:.9}
  100%{transform:translateY(calc(100% + 100px)) translateX(30px);opacity:0}
}

/* ── 星空 ── */
.eff-stars::before{
  content:'';position:absolute;inset:0;
  background-image:
    radial-gradient(1.5px 1.5px at 10% 20%, #fff 50%, transparent),
    radial-gradient(1px 1px at 25% 45%, #ffe 50%, transparent),
    radial-gradient(2px 2px at 40% 15%, #fff 50%, transparent),
    radial-gradient(1px 1px at 55% 60%, #ffe 50%, transparent),
    radial-gradient(1.5px 1.5px at 65% 35%, #fff 50%, transparent),
    radial-gradient(1px 1px at 78% 70%, #ffe 50%, transparent),
    radial-gradient(2px 2px at 88% 25%, #fff 50%, transparent),
    radial-gradient(1px 1px at 15% 75%, #ffe 50%, transparent),
    radial-gradient(1.5px 1.5px at 50% 80%, #fff 50%, transparent),
    radial-gradient(1px 1px at 72% 10%, #ffe 50%, transparent),
    radial-gradient(2px 2px at 92% 55%, #fff 50%, transparent),
    radial-gradient(1px 1px at 35% 30%, #ffe 50%, transparent);
  animation:starTwinkle 3s ease-in-out infinite alternate;
  pointer-events:none;z-index:1;opacity:.8;
}
@keyframes starTwinkle{
  0%{opacity:.4}100%{opacity:1}
}

/* ── 流光渐变 ── */
.eff-gradient-flow{
  background:linear-gradient(270deg,var(--accent),#8b5cf6,#ec4899,var(--accent));
  background-size:300% 100%;
  animation:gradientShift 8s ease infinite;
}
@keyframes gradientShift{
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
}

/* ═══════════════════ 插槽 ═══════════════════ */
::slotted(*){max-width:100%}
`;

customElements.define('miorian-block', Block);
