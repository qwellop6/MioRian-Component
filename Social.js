/* ═══════════════════ Social 社交链接组件 ═══════════════════
 *
 *  类似 Avatar 但内嵌 <a> 标签，点击跳转。
 *
 *  属性：
 *    src    — 图标图片 URL
 *    href   — 点击跳转的目标链接
 *    alt    — 无障碍替代文本（默认 "social link"）
 *    size   — sm / md / lg / xl（默认 md）
 *    border — none / ring（圆环） / wave（波浪环）
 *    target — 链接打开方式（默认 _blank）
 */

class Social extends HTMLElement {
  constructor() {
    super();
    this._s = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    /* ── 通用属性 ── */
    const bp = BaseProps.read(this);

    /* Social 同 Avatar：尺寸由 size 控制，不受 BaseProps 默认值干扰 ── */
    this.style.setProperty('--w', 'auto');
    this.style.setProperty('--h', 'auto');
    const cls = bp.classList
      .replace(/\bpd-\w+\b/g, '')
      .replace(/\bflx-\S+/g, '')
      .replace(/\bhv-\S+/g, '')
      .replace(/\s{2,}/g, ' ').trim();

    /* ── Social 专属属性 ── */
    const src    = this.getAttribute('src')    || '';
    const href   = this.getAttribute('href')   || '#';
    const alt    = this.getAttribute('alt')    || 'social link';
    const size   = this.getAttribute('size')   || 'md';
    const border = this.getAttribute('border') || 'none';
    const target = this.getAttribute('target') || '_blank';

    /* 尺寸：预设关键字或任意 CSS 值（如 28px、3rem、50%） */
    const sizeMap = { sm:'38px', md:'62px', lg:'94px', xl:'136px' };
    const sizeVal = sizeMap[size] || size;
    this.style.setProperty('--iv-sz', sizeVal);

    this._s.innerHTML = `<style>${SOCIAL_CSS}${BaseProps.CSS}</style>
      <div class="social-wrap bd-${border} ${cls}">
        <a href="${href}" target="${target}" rel="noopener">
          <img src="${src}" alt="${alt}">
        </a>
      </div>`;
  }
}

/* ═══════════════════ Social 专属 CSS ═══════════════════ */
const SOCIAL_CSS = `
:host{
  display:inline-flex;width:auto;height:auto;
}

.social-wrap{
  position:relative;box-sizing:border-box;
  border-radius:50%;
  flex-shrink:0;
  width:var(--iv-sz,62px);height:var(--iv-sz,62px);
  display:flex;align-items:center;justify-content:center;
}

/* ─ 尺寸（旧类名兼容，实际由 --iv-sz 控制）─ */

.social-wrap a{
  display:flex;align-items:center;justify-content:center;
  width:100%;height:100%;
  transition:transform .25s ease,opacity .25s ease;
}
.social-wrap a:hover{
  transform:scale(1.08);
  opacity:.85;
}

.social-wrap img{
  width:100%;height:100%;
  object-fit:cover;display:block;
  border-radius:50%;
}

/* ─ Border: 圆环 ─ */
.bd-ring{
  border:4px solid var(--accent);
}

/* ─ Border: 波浪环（虚线自动旋转）─ */
.bd-wave::before{
  content:'';position:absolute;
  inset:-5px;
  border-radius:50%;
  border:4px dashed var(--accent);
  animation:socialWave 6s linear infinite;
  pointer-events:none;
}
@keyframes socialWave{to{transform:rotate(360deg)}}
`;

customElements.define('miorian-social', Social);
