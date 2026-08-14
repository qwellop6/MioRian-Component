/* ═══════════════════ 通用属性系统 ═══════════════════
 *
 *  所有 miorian-* 组件共享的属性读取与 CSS 样式。
 *  在组件 connectedCallback 中调用 BaseProps.read(this)，
 *  并将返回的 classList 注入内部容器元素的 class 即可。
 */

const BaseProps = (() => {

  function read(el) {
    /* ── 主题 ── */
    const theme  = el.getAttribute('theme')  || 'light';
    const accent = el.getAttribute('accent') || '#6c5ce7';

    /* ── 尺寸 / 圆角 ── */
    const width  = el.getAttribute('width')  || '100%';
    const height = el.getAttribute('height') || 'auto';
    const Borad  = el.getAttribute('Borad')  || '12';

    /* ── 内边距 ── */
    const padding = el.getAttribute('padding') || 'md';

    /* ── Flex 布局 ── */
    const direction = el.getAttribute('direction') || 'row';
    const wrap      = el.hasAttribute('wrap');
    const gap       = el.getAttribute('gap')       || '0';
    const justify   = el.getAttribute('justify')   || 'start';
    const align     = el.getAttribute('align')     || 'stretch';

    /* ── 微调偏移（仅显式设置时才生效，避免无用 translate 产生层叠上下文）── */
    const offsetX = el.getAttribute('offset-x');
    const offsetY = el.getAttribute('offset-y');

    /* ── 视觉 ── */
    const shadowL     = el.getAttribute('shadowlevel') || '1';
    const glow        = el.hasAttribute('glow');
    const noBg        = el.hasAttribute('no-background');
    const noBd        = el.hasAttribute('no-border');
    const bordercolor = el.getAttribute('bordercolor');
    const backcolor   = el.getAttribute('backcolor');

    /* ── 字体全家桶 ── */
    const color      = el.getAttribute('color')      || '';
    const fontFam    = el.getAttribute('font-family')    || '';
    const fontSize   = el.getAttribute('font-size')      || '';
    const fontWeight = el.getAttribute('font-weight')    || '';
    const fontStyle  = el.getAttribute('font-style')     || '';
    const letterSp   = el.getAttribute('letter-spacing') || '';
    const textAlign  = el.getAttribute('text-align')     || '';

    /* ── 动效 ── */
    const anim  = el.getAttribute('anim')  || 'none';
    const hover = el.getAttribute('hover') || 'none';

    /* ── 自动刷新（秒）── */
    const refresh = parseInt(el.getAttribute('refresh')) || 0;

    /* ── 注入 data-theme + CSS 变量 ── */
    el.setAttribute('data-theme', theme);
    const s = el.style;
    s.setProperty('--accent', accent);
    s.setProperty('--w',      width);
    s.setProperty('--h',      height);
    s.setProperty('--borad',  Borad + 'px');
    s.setProperty('--gap',    gap);
    s.setProperty('--sl',     shadowL);
    if (offsetX || offsetY) {
      s.setProperty('--ox', offsetX || '0');
      s.setProperty('--oy', offsetY || '0');
      s.setProperty('transform', `translate(${offsetX || '0'},${offsetY || '0'})`);
    }
    if (bordercolor) s.setProperty('--ov-bd', bordercolor);
    if (backcolor)   s.setProperty('--ov-bg', backcolor);

    /* 字体变量（组件通过 var(--bp-font,inherit) 等方式引用） */
    if (color)      s.setProperty('--bp-color', color);
    if (fontFam)    s.setProperty('--bp-font',   fontFam);
    if (fontSize)   s.setProperty('--bp-size',   fontSize);
    if (fontWeight) s.setProperty('--bp-weight', fontWeight);
    if (fontStyle)  s.setProperty('--bp-style',  fontStyle);
    if (letterSp)   s.setProperty('--bp-lsp',    letterSp);
    if (textAlign)  s.setProperty('--bp-align',  textAlign);

    /* ── 组装 CSS 类名列表 ── */
    const classList = [
      `flx-d-${direction}`,
      `flx-j-${justify}`,
      `flx-a-${align}`,
      `flx-${wrap ? 'wrap' : 'nowrap'}`,
      `pd-${padding}`,
      `hv-${hover}`,
      glow ? 'has-glow' : '',
      noBg ? 'no-bg' : '',
      noBd ? 'no-bd' : '',
      anim !== 'none' ? `anim anim-${anim}` : '',
    ].filter(Boolean).join(' ');

    return { classList, theme, accent, refresh };
  }

  /* ═══════════════════ 通用 CSS ═══════════════════ */
  const CSS = `
:host{
  --accent:#6c5ce7;--sl:1;
  display:block;
  width:var(--w,100%);
  height:var(--h,auto);
  font-family:system-ui,-apple-system,'Segoe UI',sans-serif;
}

/* ─ 6 套主题 ─ */
:host([data-theme="light"]){--t-bg:#fff;--t-fg:#1a1a2e;--t-sub:#6c7086;--t-bd:#e8e8e8}
:host([data-theme="dark"]){--t-bg:#1a1a2e;--t-fg:#f0f0f0;--t-sub:#9a9ab0;--t-bd:#2a2a3e}
:host([data-theme="neon"]){--t-bg:#0d0221;--t-fg:#f0f0ff;--t-sub:#b080ff;--t-bd:var(--accent)}
:host([data-theme="glass"]){--t-bg:rgba(255,255,255,.07);--t-fg:#fff;--t-sub:rgba(255,255,255,.72);--t-bd:rgba(255,255,255,.14)}
:host([data-theme="paper"]){--t-bg:#fdfbf7;--t-fg:#3e2c1c;--t-sub:#8a7960;--t-bd:#d4c5a9}
:host([data-theme="gradient"]){--t-bg:linear-gradient(135deg,#667eea,#764ba2);--t-fg:#fff;--t-sub:rgba(255,255,255,.82);--t-bd:transparent}

/* ─ Flex 布局 ─ */
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

/* ─ Glow ─ */
.has-glow{
  box-shadow:0 0 26px -4px var(--accent),
             0 calc(2px*var(--sl)) calc(12px*var(--sl)) rgba(0,0,0,.16);
}

/* ─ 隐藏背景 / 隐藏边框 ─ */
.no-bg{background:transparent!important;background-image:none!important}
.no-bd{border:none!important}

/* ─ 悬停 ─ */
.hv-lift:hover{transform:translateY(-4px)}
.hv-glow-pulse:hover{
  box-shadow:0 0 42px 0 var(--accent),
             0 calc(4px*var(--sl)) calc(20px*var(--sl)) rgba(0,0,0,.22);
}

/* ─ 入场动效 ─ */
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
`;

  return { read, CSS };
})();
