/* ═══════════════════ Avatar 头像组件 ═══════════════════
 *
 *  属性：
 *    src    — 头像图片 URL
 *    alt    — 无障碍替代文本
 *    size   — sm / md / lg / xl（默认 md）
 *    border — none / ring（圆环） / wave（波浪环）
 *    rotate — 布尔，鼠标悬停时头像旋转 360°
 */

class Avatar extends HTMLElement {
  constructor() {
    super();
    this._s = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    /* ── 通用属性 ── */
    const bp = BaseProps.read(this);

    /* Avatar 特殊性：尺寸由 size 属性控制，不使用 BaseProps 的 width/padding 默认值 ── */
    this.style.setProperty('--w', 'auto');
    this.style.setProperty('--h', 'auto');
    const cls = bp.classList.replace(/\bpd-\w+\b/g, '').trim();

    /* ── Avatar 专属属性 ── */
    const src    = this.getAttribute('src')    || '';
    const alt    = this.getAttribute('alt')    || 'avatar';
    const size   = this.getAttribute('size')   || 'md';
    const border = this.getAttribute('border') || 'none';
    const rotate = this.hasAttribute('rotate');

    /* 尺寸：预设关键字或任意 CSS 值（如 28px、3rem、50%） */
    const sizeMap = { sm:'38px', md:'62px', lg:'94px', xl:'136px' };
    const sizeVal = sizeMap[size] || size;
    this.style.setProperty('--iv-sz', sizeVal);

    this._s.innerHTML = `<style>${AVATAR_CSS}${BaseProps.CSS}</style>
      <div class="avatar-wrap
        bd-${border}
        ${rotate ? 'rotatable' : ''}
        ${cls}
      ">
        <img src="${src}" alt="${alt}">
      </div>`;
  }
}

/* ═══════════════════ Avatar 专属 CSS ═══════════════════ */
const AVATAR_CSS = `
:host{
  display:inline-flex;width:auto;height:auto;
}

.avatar-wrap{
  position:relative;box-sizing:border-box;
  border-radius:50%;overflow:hidden;
  flex-shrink:0;
  width:var(--iv-sz,62px);height:var(--iv-sz,62px);
  display:flex;align-items:center;justify-content:center;
}

/* ─ 尺寸（旧类名兼容，实际由 --iv-sz 控制）─ */

.avatar-wrap img{
  width:100%;height:100%;
  object-fit:cover;display:block;
  border-radius:50%;
}

/* ─ Border: 圆环（实心）─ */
.bd-ring{
  border:4px solid var(--accent);
}

/* ─ Border: 波浪环（虚线圆环，自动旋转）─ */
.bd-wave::before{
  content:'';position:absolute;
  inset:-5px;
  border-radius:50%;
  border:4px dashed var(--accent);
  animation:waveSpin 6s linear infinite;
  pointer-events:none;
}
@keyframes waveSpin{to{transform:rotate(360deg)}}

/* ─ 悬停旋转 ─ */
.rotatable img{
  transition:transform .6s cubic-bezier(.22,1,.36,1);
}
.rotatable:hover img{
  transform:rotate(360deg);
}
`;

customElements.define('miorian-avatar', Avatar);
