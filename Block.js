/* ═══════════════════ 特效生成器 ═══════════════════ */

/* 伪随机发生器 */
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

/* ═══════════════════ Block 组件 ═══════════════════ */

class Block extends HTMLElement {
  constructor() {
    super();
    this._s = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    /* ── 通用属性（BaseProps）── */
    const bp = BaseProps.read(this);

    /* ── Block 专属属性 ── */

    /* Glass */
    const glass     = this.hasAttribute('glass');
    const glassBlur = this.getAttribute('glass-blur') || '8px';

    /* 背景图片 */
    const bgImage    = this.getAttribute('bg-image')    || '';
    const bgSize     = this.getAttribute('bg-size')     || 'cover';
    const bgPosition = this.getAttribute('bg-position') || 'center';
    const bgRepeat   = this.hasAttribute('bg-repeat');

    /* 装饰特效 */
    const bgEffect  = this.getAttribute('bg-effect') || 'none';
    const fxDensity = this.getAttribute('fx-density')|| 'normal';
    const fxSize    = this.getAttribute('fx-size')   || 'md';
    const fxAngle   = parseFloat(this.getAttribute('fx-angle')) || 45;

    /* ── 注入 Block 专属 CSS 变量 ── */
    const s = this.style;
    if (bgImage) s.setProperty('--bg-img', `url('${bgImage}')`);
    s.setProperty('--bg-sz',  bgSize);
    s.setProperty('--bg-pos', bgPosition);
    s.setProperty('--bg-rp',  bgRepeat ? 'repeat' : 'no-repeat');
    if (glass) s.setProperty('--glass-blur', glassBlur);

    /* 特效背景生成 */
    if (bgEffect === 'sakura') s.setProperty('--fx-sakura-bg', buildSakuraBg(fxDensity, fxSize));
    if (bgEffect === 'snow')   s.setProperty('--fx-snow-bg',   buildSnowBg(fxDensity, fxSize));

    /* 飘落角度 */
    if (bgEffect === 'sakura' || bgEffect === 'snow') {
      const rad = fxAngle * Math.PI / 180;
      const dx  = Math.round(Math.tan(rad) * -50);
      s.setProperty('--fx-dx', dx + '%');
    }

    /* ── 构建 DOM ── */
    const glassClass = glass ? 'has-glass' : '';
    const glassLayer = glass ? '<div class="glass-overlay"></div>' : '';
    const slotOpen   = glass ? '<div class="slot-wrap"><slot></slot></div>' : '<slot></slot>';

    this._s.innerHTML = `<style>${BLOCK_CSS}${BaseProps.CSS}</style>
      <div class="frame
        eff-${bgEffect}
        ${bp.classList} ${glassClass}
      ">
        ${glassLayer}
        ${slotOpen}
      </div>`;
  }
}

/* ═══════════════════ Block 专属 CSS ═══════════════════ */
const BLOCK_CSS = `
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

/* ─ Glass 毛玻璃覆盖层（在背景图上方、内容下方）─ */
.glass-overlay{
  position:absolute;inset:0;
  backdrop-filter:blur(var(--glass-blur,8px));
  -webkit-backdrop-filter:blur(var(--glass-blur,8px));
  border-radius:inherit;
  z-index:1;pointer-events:none;
}
.slot-wrap{
  position:relative;z-index:2;width:100%;
  display:flex;
  flex-direction:inherit;justify-content:inherit;align-items:inherit;
  gap:inherit;flex-wrap:inherit;
}

/* ─ 插槽 ─ */
::slotted(*){max-width:100%}

/* ═══════════════════ 装饰特效 ═══════════════════ */
.frame.eff-sakura,
.frame.eff-snow{overflow:hidden}

.eff-sakura::before{
  content:'';position:absolute;top:0;left:0;width:100%;height:200%;
  background-image:var(--fx-sakura-bg,none);
  animation:sakuraFall 10s linear infinite;
  pointer-events:none;z-index:3;
}
@keyframes sakuraFall{0%{transform:translate(var(--fx-dx,-50%),-50%)}100%{transform:translate(0,0)}}

.eff-snow::before{
  content:'';position:absolute;top:0;left:0;width:100%;height:200%;
  background-image:var(--fx-snow-bg,none);
  animation:snowFall 14s linear infinite;
  pointer-events:none;z-index:3;
}
@keyframes snowFall{0%{transform:translate(var(--fx-dx,-50%),-50%)}100%{transform:translate(0,0)}}
`;

customElements.define('miorian-block', Block);
