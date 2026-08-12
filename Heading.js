/* ═══════════════════ Heading 标题组件 ═══════════════════
 *
 *  文字：
 *    level              — h1~h6（默认 h2）
 *    color / font-family / font-size / font-weight / font-style / letter-spacing
 *    text-align         — left / center / right
 *
 *  下划线：
 *    underline          — 布尔开关
 *    underline-color    — 颜色
 *    underline-style    — solid / dashed / dotted / wavy
 *    underline-thickness— 粗细（CSS 值）
 *    underline-radius   — 圆润度（px），启用后切换为 border-bottom 渲染
 *
 *  删除线：
 *    line-through       — 布尔开关
 *    line-color         — 颜色
 *    line-thickness     — 粗细（CSS 值）
 *    line-radius        — 圆润度（px），启用后切换为渐变背景渲染
 */

class Heading extends HTMLElement {
  constructor() {
    super();
    this._s = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    /* ── 通用属性 ── */
    const bp = BaseProps.read(this);
    /* Heading 宽度自适应文字，不继承 BaseProps 的 100% 和 padding */
    this.style.setProperty('--w', 'auto');
    this.style.setProperty('--h', 'auto');
    const cls = bp.classList
      .replace(/\bpd-\w+\b/g, '')
      .replace(/\bflx-d-\S+/g, '').replace(/\bflx-j-\S+/g, '').replace(/\bflx-a-\S+/g, '')
      .replace(/\bflx-(wrap|nowrap)\b/g, '').replace(/\bhv-\S+/g, '')
      .replace(/\s{2,}/g, ' ').trim();

    /* ── 文字 ── */
    const level     = this.getAttribute('level')      || 'h2';
    const color     = this.getAttribute('color')      || '';
    const fontFam   = this.getAttribute('font-family')    || '';
    const fontSize  = this.getAttribute('font-size')      || '';
    const fontWeight= this.getAttribute('font-weight')    || '';
    const fontStyle = this.getAttribute('font-style')     || '';
    const letterSp  = this.getAttribute('letter-spacing') || '';
    const textAlign = this.getAttribute('text-align')     || '';

    /* ── 下划线 ── */
    const ul       = this.hasAttribute('underline');
    const ulColor  = this.getAttribute('underline-color')     || 'var(--accent)';
    const ulStyle  = this.getAttribute('underline-style')     || 'solid';
    const ulThick  = this.getAttribute('underline-thickness') || '2px';
    const ulRadius = this.getAttribute('underline-radius')    || '';  // 有值则用自定义渲染

    /* ── 删除线 ── */
    const lt       = this.hasAttribute('line-through');
    const ltColor  = this.getAttribute('line-color')     || 'var(--accent)';
    const ltThick  = this.getAttribute('line-thickness') || '2px';
    const ltRadius = this.getAttribute('line-radius')    || '';

    /* ── 注入 CSS 变量 ── */
    const st = this.style;
    if (color)       st.setProperty('--h-color',  color);
    if (fontFam)     st.setProperty('--h-font',   fontFam);
    if (fontSize)    st.setProperty('--h-size',   fontSize);
    if (fontWeight)  st.setProperty('--h-weight', fontWeight);
    if (fontStyle)   st.setProperty('--h-style',  fontStyle);
    if (letterSp)    st.setProperty('--h-lsp',    letterSp);
    if (textAlign)   st.setProperty('--h-align',  textAlign);
    st.setProperty('--h-ul-color', ulColor);
    st.setProperty('--h-ul-thick', ulThick);
    st.setProperty('--h-ul-style', ulStyle);
    st.setProperty('--h-lt-color', ltColor);
    st.setProperty('--h-lt-thick', ltThick);

    const tag  = level.match(/^h[1-6]$/) ? level : 'h2';

    /* ── 构建装饰样式 ── */
    let outerDeco = '';  // 外层 .hd 的 style
    let outerCls  = '';  // 外层 .hd 的 class
    let innerDeco = '';  // 内层 span 的 style
    const both    = ul && lt;

    /* 下划线渲染模式 */
    if (ul && ulRadius) {
      /* 圆润模式：background 画线 + 只切下角 → 胶囊形 */
      const pb = (parseInt(ulThick) || 2) + 2;
      const deco = `background:linear-gradient(${ulColor},${ulColor}) no-repeat bottom/100% ${ulThick};border-radius:0 0 ${ulRadius} ${ulRadius};padding-bottom:${pb}px;`;
      if (both) { innerDeco = deco; } else { outerDeco = deco; }
      outerCls += ' hd-rounded';
    } else if (ul) {
      const deco = `text-decoration-line:underline;text-decoration-color:${ulColor};text-decoration-style:${ulStyle};text-decoration-thickness:${ulThick};`;
      if (both) { innerDeco = deco; } else { outerDeco = deco; }
    }

    /* 删除线渲染模式 */
    if (lt && ltRadius) {
      /* 圆润模式：渐变背景模拟 */
      const deco = `background:linear-gradient(transparent 47%,${ltColor} 47%,${ltColor} calc(47% + ${ltThick}),transparent calc(47% + ${ltThick}));border-radius:${ltRadius};`;
      if (both) { outerDeco = deco; } else { outerDeco = (outerDeco||'') + deco; }
      outerCls += ' hd-lt-bg';
    } else if (lt) {
      const deco = `text-decoration-line:line-through;text-decoration-color:${ltColor};text-decoration-thickness:${ltThick};`;
      if (both) { outerDeco = deco; } else { outerDeco = (outerDeco||'') + deco; }
    }

    /* 内层 span（双线分离时） */
    const inner = both
      ? `<span class="hd-inner${outerCls.replace('hd-',' hd-inner-')}" style="${innerDeco}"><slot></slot></span>`
      : '<slot></slot>';

    this._s.innerHTML = `<style>${HEADING_CSS}${BaseProps.CSS}</style>
      <${tag} class="hd${outerCls}" style="${outerDeco}">${inner}</${tag}>`;
  }
}

/* ═══════════════════ Heading 专属 CSS ═══════════════════ */
const HEADING_CSS = `
:host{display:inline-block;width:auto;height:auto}
.hd{
  margin:0;padding:0;
  color:var(--h-color,var(--t-fg));
  font-family:var(--h-font,inherit);
  font-size:var(--h-size,inherit);
  font-weight:var(--h-weight,inherit);
  font-style:var(--h-style,inherit);
  letter-spacing:var(--h-lsp,inherit);
  text-align:var(--h-align,inherit);
  text-decoration-color:var(--h-ul-color,var(--accent));
  text-decoration-style:var(--h-ul-style,solid);
  text-decoration-thickness:var(--h-ul-thick,2px);
  transition:color .3s,border-color .3s,text-decoration-color .3s;
  line-height:1.3;
}

/* 圆润下划线（background 画线 + border-radius，多行每条线独立胶囊形） */
.hd-rounded{
  -webkit-box-decoration-break:clone;
  box-decoration-break:clone;
}
.hd-inner-rounded{
  -webkit-box-decoration-break:clone;
  box-decoration-break:clone;
}

/* 圆润删除线（渐变背景，需内联 block 化） */
.hd-lt-bg{
  display:inline;
  -webkit-box-decoration-break:clone;
  box-decoration-break:clone;
}

.hd-inner{transition:color .3s}
`;
customElements.define('miorian-heading', Heading);
