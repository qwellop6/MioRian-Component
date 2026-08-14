/* ═══════════════════ BtnLink 钮链组件 ═══════════════════
 *
 *  button 模式：悬浮 lift + 自定义边框粗细 + 跳转
 *  link   模式：无边框 + hover 变色 + 跳转
 *
 *  共用：href / target / 全套 font / text-align / color
 */

class BtnLink extends HTMLElement {
  constructor() {
    super();
    this._s = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    /* ── 通用属性 ── */
    const bp = BaseProps.read(this);
    /* 默认收窄为内容宽，但保留用户显式设置的 width/height */
    if (!this.hasAttribute('width'))  this.style.setProperty('--w', 'auto');
    if (!this.hasAttribute('height')) this.style.setProperty('--h', 'auto');
    this.style.display = 'inline-flex';
    const cls = bp.classList
      .replace(/\bpd-\w+\b/g, '').replace(/\bflx-\S+/g, '')
      .replace(/\bhv-\S+/g, '').replace(/\s{2,}/g, ' ').trim();

    /* ── 共用 ── */
    const mode     = this.getAttribute('mode')      || 'button';
    const href     = this.getAttribute('href')      || '#';
    const target   = this.getAttribute('target')    || '_blank';

    /* ── button 专属 ── */
    const isButton = mode === 'button';
    const hasLift  = this.getAttribute('hover') === 'lift';
    const borderW  = this.getAttribute('border-width') || '2px';

    /* ── link 专属 ── */
    const hovColor  = this.getAttribute('hover-color') || '';   // 设了就开启变色
    const hasULine  = this.hasAttribute('underline');           // 悬停下划线动效
    const ulColor   = this.getAttribute('underline-color') || 'var(--accent)';
    const ulDir     = this.getAttribute('underline-dir') || 'left'; // left / right / center

    /* ── 注入 CSS 变量 ── */
    if (hovColor) this.style.setProperty('--bl-hov', hovColor);
    if (hasULine) this.style.setProperty('--bl-ul', ulColor);

    /* ── 标签与样式 ── */
    const tag    = href && href !== '#' ? 'a' : 'span';
    const hrefAttr = tag === 'a' ? `href="${href}" target="${target}" rel="noopener"` : '';
    const modeClass = isButton ? 'btn' : 'link';
    const ulClass = (!isButton && hasULine) ? `uline uline-${ulDir}` : '';

    this._s.innerHTML = `<style>${BaseProps.CSS}${BTLINK_CSS(isButton, borderW, hovColor, hasULine, ulDir)}</style>
      <${tag} class="bl ${modeClass} ${hasLift ? 'hover-lift' : ''} ${ulClass} ${cls}" ${hrefAttr}>
        <slot></slot>
      </${tag}>`;
  }
}

/* ═══════════════════ BtnLink 专属 CSS ═══════════════════ */
function BTLINK_CSS(isButton, borderW, hovColor, hasULine, ulDir) {
  return `
:host{display:inline-flex;width:var(--w,auto);height:var(--h,auto)}

.bl{
  display:inline-flex;align-items:center;justify-content:center;
  text-decoration:none;cursor:pointer;
  box-sizing:border-box;
  border-radius:var(--borad,10px);
  font-family:var(--bp-font,inherit);
  font-size:var(--bp-size,.9rem);
  font-weight:var(--bp-weight,600);
  font-style:var(--bp-style,inherit);
  letter-spacing:var(--bp-lsp,inherit);
  text-align:var(--bp-align,center);
  line-height:1.4;
  transition:transform .3s cubic-bezier(.22,1,.36,1),
              box-shadow .3s ease,color .25s,border-color .25s,background .25s;
  -webkit-tap-highlight-color:transparent;
  user-select:none;
}

/* ─ button 模式 ─ */
${isButton ? `
.btn{
  color:var(--bp-color,#fff);
  background:var(--accent);
  border:${borderW} solid var(--accent);
  padding:10px 26px;
  box-shadow:0 calc(2px*var(--sl)) calc(9px*var(--sl)) rgba(0,0,0,calc(.1*var(--sl)));
}
.btn:hover{
  background:color-mix(in srgb,var(--accent) 85%,#000);
  border-color:color-mix(in srgb,var(--accent) 85%,#000);
}
.hover-lift.btn:hover{
  transform:translateY(-3px) scale(1.03);
  box-shadow:0 calc(6px*var(--sl)) calc(20px*var(--sl)) rgba(0,0,0,.15);
}
` : ''}

/* ─ link 模式 ─ */
${!isButton ? `
.link{
  position:relative;
  color:var(--bp-color,var(--accent));
  background:transparent;border:none;
  padding:4px 0;
  text-decoration:none;
}
.link:hover{
  ${hovColor ? `color:var(--bl-hov);` : 'opacity:.8;'}
}
` : ''}

/* ─ link 悬停下划线动效 ─ */
${(!isButton && hasULine) ? `
.uline::after{
  content:'';position:absolute;bottom:-2px;
  height:2px;background:var(--bl-ul,var(--accent));
  transition:all .3s cubic-bezier(.22,1,.36,1);
  border-radius:1px;
}
/* 左→右（默认） */
.uline-left::after{left:0;right:auto;width:0}
.uline-left:hover::after{width:100%}
/* 右→左 */
.uline-right::after{left:auto;right:0;width:0}
.uline-right:hover::after{width:100%}
/* 中→两边 */
.uline-center::after{left:50%;right:50%;width:auto}
.uline-center:hover::after{left:0;right:0}
` : ''}
`;
}

customElements.define('miorian-btnlink', BtnLink);
