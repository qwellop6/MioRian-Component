/* ═══════════════════ ArticleCard 文章卡片组件 ═══════════════════
 *
 *  封面：cover（URL，可选），cover-align（left/right，默认 left），cover-width / cover-height
 *  标题：title（文本），title-*（继承 Heading 的 font 全套）
 *  简介：desc（文本），desc-*（同上）
 *  通用：BaseProps 选择性继承
 */

class ArticleCard extends HTMLElement {
  constructor() {
    super();
    this._s = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    /* ── 通用属性 ── */
    const bp = BaseProps.read(this);
    /* 不自适应100%宽 */
    this.style.setProperty('--w', 'auto');
    this.style.setProperty('--h', 'auto');
    const cls = bp.classList
      .replace(/\bflx-d-\S+/g, '').replace(/\bflx-j-\S+/g, '').replace(/\bflx-a-\S+/g, '')
      .replace(/\bflx-(wrap|nowrap)\b/g, '').replace(/\bhv-\S+/g, '').replace(/\bpd-\w+\b/g, '')
      .replace(/\s{2,}/g, ' ').trim();

    /* ── 封面 ── */
    const cover      = this.getAttribute('cover')       || '';
    const coverAlign = this.getAttribute('cover-align') || 'left';
    const coverW     = this.getAttribute('cover-width')  || '35%';
    const coverH     = this.getAttribute('cover-height') || 'auto';

    /* ── 标题 ── */
    const title     = this.getAttribute('title')      || '';
    const tColor    = this.getAttribute('title-color')      || '';
    const tFam      = this.getAttribute('title-font-family')  || '';
    const tSize     = this.getAttribute('title-font-size')    || '';
    const tWeight   = this.getAttribute('title-font-weight')  || '';
    const tStyle    = this.getAttribute('title-font-style')   || '';
    const tLsp      = this.getAttribute('title-letter-spacing')|| '';
    const tAlign    = this.getAttribute('title-align')   || '';

    /* ── 简介 ── */
    const desc      = this.getAttribute('desc')        || '';
    const dColor    = this.getAttribute('desc-color')        || '';
    const dFam      = this.getAttribute('desc-font-family')    || '';
    const dSize     = this.getAttribute('desc-font-size')      || '';
    const dWeight   = this.getAttribute('desc-font-weight')    || '';
    const dStyle    = this.getAttribute('desc-font-style')     || '';
    const dLsp      = this.getAttribute('desc-letter-spacing')  || '';
    const dAlign    = this.getAttribute('desc-align')     || '';
    const coverRad  = this.getAttribute('cover-radius')    || '';
    const cgap      = this.getAttribute('gap')             || '0';
    const href      = this.getAttribute('href')            || '';
    const hover     = this.getAttribute('hover')           || '';

    /* ── 注入 CSS 变量 ── */
    const st = this.style;
    if (tColor)  st.setProperty('--t-color',  tColor);
    if (tFam)    st.setProperty('--t-font',   tFam);
    if (tSize)   st.setProperty('--t-size',   tSize);
    if (tWeight) st.setProperty('--t-weight', tWeight);
    if (tStyle)  st.setProperty('--t-style',  tStyle);
    if (tLsp)    st.setProperty('--t-lsp',    tLsp);
    if (tAlign)  st.setProperty('--t-align',  tAlign);
    if (dColor)  st.setProperty('--d-color',  dColor);
    if (dFam)    st.setProperty('--d-font',   dFam);
    if (dSize)   st.setProperty('--d-size',   dSize);
    if (dWeight) st.setProperty('--d-weight', dWeight);
    if (dStyle)  st.setProperty('--d-style',  dStyle);
    if (dLsp)    st.setProperty('--d-lsp',    dLsp);
    if (dAlign)  st.setProperty('--d-align',  dAlign);
    st.setProperty('--cover-w', coverW);
    st.setProperty('--cover-h', coverH);
    if (coverRad) st.setProperty('--cover-rad', coverRad);
    st.setProperty('--card-gap', cgap);

    /* ── 封面图 ── */
    const coverHTML = cover ? `<img class="cover-img" src="${cover}" alt="cover">` : '';

    /* 左右布局：cover 在左则 order:0，在右则 order:1 */
    const coverOrder = coverAlign === 'right' ? '1' : '0';
    const textOrder  = coverAlign === 'right' ? '0' : '1';

    const hasCover = !!cover;

    this._s.innerHTML = `<style>${CARD_CSS}${BaseProps.CSS}</style>
      <div class="card ${hasCover ? 'has-cover' : ''} ${hover === 'lift' ? 'hover-lift' : ''} ${cls}">
        ${href ? `<a class="card-link" href="${href}" target="_blank" rel="noopener"></a>` : ''}
        ${cover ? `<img class="cover-img" src="${cover}" alt="cover" style="order:${coverOrder}">` : ''}
        <div class="text-col" style="order:${textOrder}">
          ${title ? `<h2 class="card-title">${title}</h2>` : ''}
          ${desc  ? `<p class="card-desc">${desc}</p>`   : ''}
        </div>
      </div>`;
  }
}

/* ═══════════════════ ArticleCard 专属 CSS ═══════════════════ */
const CARD_CSS = `
:host{display:block;width:auto}

.card{
  position:relative;
  box-sizing:border-box;display:flex;align-items:stretch;
  gap:var(--card-gap,0);
  border-radius:var(--borad,12px);
  background:var(--ov-bg,var(--t-bg));
  border:2px solid var(--ov-bd,var(--t-bd));
  color:var(--t-fg);
  overflow:hidden;
  transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s ease;
  box-shadow:0 calc(2px*var(--sl)) calc(9px*var(--sl)) rgba(0,0,0,calc(.07*var(--sl))),
             0 calc(1px*var(--sl)) calc(3px*var(--sl)) rgba(0,0,0,calc(.04*var(--sl)));
}

/* ─ 全卡片链接覆盖层 ─ */
.card-link{
  position:absolute;inset:0;z-index:2;
  text-decoration:none;color:inherit;
}

/* ─ 悬停悬浮 ─ */
.hover-lift{cursor:pointer}
.hover-lift:hover{
  transform:translateY(-4px) scale(1.02);
  box-shadow:0 calc(6px*var(--sl)) calc(24px*var(--sl)) rgba(0,0,0,.14),
             0 calc(2px*var(--sl)) calc(6px*var(--sl)) rgba(0,0,0,.08);
}

/* ─ 封面图 ─ */
.cover-img{
  width:var(--cover-w,35%);height:var(--cover-h,auto);
  object-fit:cover;flex-shrink:0;
  border-radius:var(--cover-rad,0);
}

/* ─ 文字区 ─ */
.text-col{
  flex:1;display:flex;flex-direction:column;justify-content:center;
  padding:18px 24px;gap:10px;min-width:0;
}

.card-title{
  margin:0;
  color:var(--t-color,var(--t-fg));
  font-family:var(--t-font,inherit);
  font-size:var(--t-size,1.25em);
  font-weight:var(--t-weight,700);
  font-style:var(--t-style,inherit);
  letter-spacing:var(--t-lsp,inherit);
  text-align:var(--t-align,inherit);
  line-height:1.4;
}

.card-desc{
  margin:0;
  color:var(--d-color,var(--t-sub));
  font-family:var(--d-font,inherit);
  font-size:var(--d-size,.92em);
  font-weight:var(--d-weight,400);
  font-style:var(--d-style,inherit);
  letter-spacing:var(--d-lsp,inherit);
  text-align:var(--d-align,inherit);
  line-height:1.6;
}
`;

customElements.define('miorian-article-card', ArticleCard);
