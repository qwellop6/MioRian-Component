/* ═══════════════════ Input 组件 ═══════════════════
 *
 *  三种模式：
 *    display  — 展示框（可选打字机特效）
 *    input    — 标准输入框
 *    password — 密码加密框（可选明文切换）
 */

class Input extends HTMLElement {
  constructor() {
    super();
    this._s = this.attachShadow({ mode: 'open' });
    this._twTimer = null;
  }

  /* ── 属性变更响应 ── */
  static get observedAttributes() {
    return ['value', 'api', 'mode', 'typewriter', 'typewriter-speed'];
  }
  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    if ((name === 'value' || name === 'api') && this._mode === 'display' && this._displayEl) {
      if (name === 'api' && newVal) {
        this._fetchApi();
      } else {
        this._displayEl.textContent = this.getAttribute('value') || '';
        if (this.hasAttribute('typewriter') && this.isConnected) {
          this._startTypewriter();
        }
      }
    }
    if (name === 'typewriter' && this._mode === 'display' && this.isConnected) {
      if (this.hasAttribute('typewriter')) this._startTypewriter();
      else {
        clearInterval(this._twTimer);
        this._displayEl && (this._displayEl.textContent = this.getAttribute('value') || '');
      }
    }
  }

  connectedCallback() {
    /* ── 通用属性 ── */
    const bp = BaseProps.read(this);

    /* Input 内部必须竖向排版，剥离 BaseProps 的 flex 方向/对齐/换行类 */
    const cls = bp.classList
      .replace(/\bflx-d-\S+/g, '')
      .replace(/\bflx-j-\S+/g, '')
      .replace(/\bflx-a-\S+/g, '')
      .replace(/\bflx-(wrap|nowrap)\b/g, '')
      .replace(/\s{2,}/g, ' ').trim();

    /* ── Input 专属属性 ── */
    this._mode      = this.getAttribute('mode')      || 'input';
    const typeAttr  = this.getAttribute('type')      || 'text';
    const placeholder = this.getAttribute('placeholder') || '';
    const value     = this.getAttribute('value')     || '';
    const label     = this.getAttribute('label')     || '';
    const icon      = this.getAttribute('icon')      || '';
    const size      = this.getAttribute('size')      || 'md';
    const disabled  = this.hasAttribute('disabled');
    const invalid   = this.hasAttribute('invalid');
    const message   = this.getAttribute('message')   || '';
    const showPwd   = this.hasAttribute('show-password');
    const twSpeed   = parseInt(this.getAttribute('typewriter-speed')) || 80;
    const api       = this.getAttribute('api')       || '';
    const textAlign = this.getAttribute('text-align')|| 'left';

    /* ── 子元素 ── */
    const labelHTML   = label   ? `<label class="lbl">${label}</label>` : '';
    const msgHTML     = message ? `<span class="msg ${invalid ? 'is-invalid' : ''}">${message}</span>` : '';
    const iconHTML    = icon    ? `<span class="ico">${icon}</span>` : '';

    let bodyHTML = '';
    if (this._mode === 'display') {
      bodyHTML = `<div class="display-area ta-${textAlign}">
        <span class="display-text" id="tw"></span>
        <span class="cursor">|</span>
      </div>`;
    } else if (this._mode === 'password') {
      const pwdType = showPwd ? 'text' : 'password';
      const eyeBtn  = showPwd ? '<button class="pwd-eye" type="button">&#128065;</button>' : '';
      bodyHTML = `<div class="ipt-wrap">
        ${iconHTML}
        <input class="ipt ${invalid?'is-invalid':''}"
          type="${pwdType}" placeholder="${placeholder}"
          value="${value}" ${disabled?'disabled':''}>
        ${eyeBtn}
      </div>`;
    } else {
      /* input 模式（默认） */
      bodyHTML = `<div class="ipt-wrap">
        ${iconHTML}
        <input class="ipt ${invalid?'is-invalid':''}"
          type="${typeAttr}" placeholder="${placeholder}"
          value="${value}" ${disabled?'disabled':''}>
      </div>`;
    }

    this._s.innerHTML = `<style>${INPUT_CSS.size(size)}${BaseProps.CSS}</style>
      <div class="wrap sz-${size} ${cls} ${disabled?'is-disabled':''}">
        ${labelHTML}
        ${bodyHTML}
        ${msgHTML}
      </div>`;

    /* ── 绑定元素引用 ── */
    this._input     = this._s.querySelector('.ipt');
    this._displayEl = this._s.getElementById('tw');
    this._eyeBtn    = this._s.querySelector('.pwd-eye');

    /* ── 事件 ── */
    if (this._input) {
      this._input.addEventListener('input', (e) => {
        this.dispatchEvent(new CustomEvent('change', {
          detail: e.target.value, bubbles: true, composed: true
        }));
      });
    }
    if (this._eyeBtn) {
      this._eyeBtn.addEventListener('click', () => this._togglePassword());
    }

    /* ── display 模式：初始文字 / API 请求 ── */
    if (this._mode === 'display') {
      if (api) {
        this._displayEl.textContent = '加载中...';
        this._fetchApi();
      } else {
        this._displayEl.textContent = value;
        if (this.hasAttribute('typewriter')) this._startTypewriter();
      }
    }
  }

  disconnectedCallback() {
    clearInterval(this._twTimer);
  }

  /* ── 打字机 ── */
  _startTypewriter() {
    clearInterval(this._twTimer);
    if (!this._displayEl) return;
    const text = this.getAttribute('value') || this._displayEl.textContent || '';
    const speed = parseInt(this.getAttribute('typewriter-speed')) || 80;
    this._displayEl.textContent = '';
    let i = 0;
    this._twTimer = setInterval(() => {
      if (i < text.length) {
        this._displayEl.textContent += text[i];
        i++;
      } else {
        clearInterval(this._twTimer);
      }
    }, speed);
  }

  /* ── 密码切换 ── */
  _togglePassword() {
    if (!this._input) return;
    const cur = this._input.type;
    this._input.type = cur === 'password' ? 'text' : 'password';
    if (this._eyeBtn) {
      this._eyeBtn.textContent = cur === 'password' ? '\u{1F441}\u{200D}\u{1F5E8}' : '\u{1F465}';
    }
  }

  /* ── API 请求 ── */
  async _fetchApi() {
    if (!this._displayEl) return;
    const url = this.getAttribute('api');
    if (!url) return;
    this._displayEl.classList.add('display-loading');
    this._displayEl.textContent = '加载中...';
    try {
      const res = await fetch(url);
      const text = await res.text();
      this._displayEl.classList.remove('display-loading');
      this._displayEl.textContent = text;
      if (this.hasAttribute('typewriter')) {
        this._startTypewriter();
      }
    } catch (e) {
      this._displayEl.classList.remove('display-loading');
      this._displayEl.textContent = '请求失败: ' + e.message;
    }
  }
  get native() { return this._input; }
  get value()  {
    return this._input ? this._input.value : (this.getAttribute('value') || '');
  }
  set value(v) {
    this.setAttribute('value', v);
    if (this._input) this._input.value = v;
  }
}

/* ═══════════════════ Input 专属 CSS ═══════════════════ */
const INPUT_CSS = {
  size: (sz) => `
/* ─ 容器 ─ */
.wrap{
  box-sizing:border-box;width:100%;height:100%;
  border-radius:var(--borad,12px);
  background:var(--ov-bg,var(--t-bg));
  border:2px solid var(--ov-bd,var(--t-bd));
  color:var(--t-fg);
  display:flex;flex-direction:column;
  gap:6px;
  transition:border-color .3s ease,box-shadow .3s ease;
  box-shadow:
    0 calc(2px*var(--sl)) calc(9px*var(--sl)) rgba(0,0,0,calc(.07*var(--sl))),
    0 calc(1px*var(--sl)) calc(3px*var(--sl)) rgba(0,0,0,calc(.04*var(--sl)));
}

/* ─ Label ─ */
.lbl{font-size:.82rem;font-weight:600;color:var(--t-fg)}
.lbl:empty{display:none}

/* ─ 输入框包装 ─ */
.ipt-wrap{
  position:relative;display:flex;align-items:center;
}

/* ─ Icon ─ */
.ico{
  position:absolute;left:12px;font-size:1rem;
  color:var(--t-sub);pointer-events:none;line-height:1;z-index:1;
}

/* ─ 输入框 ─ */
.ipt{
  flex:1;width:100%;font-family:inherit;font-size:.9rem;line-height:1.5;
  background:transparent;color:var(--t-fg);
  border:none;outline:none;padding:10px 14px;
  box-sizing:border-box;
  transition:opacity .25s ease;
}
.ico+.ipt{padding-left:38px}
.ipt::placeholder{color:var(--t-sub)}

/* ─ 尺寸 ─ */
.sz-sm .ipt{padding:6px 12px;font-size:.82rem}
.sz-sm .ico+.ipt{padding-left:34px}
.sz-lg .ipt{padding:12px 18px;font-size:1rem}
.sz-lg .ico+.ipt{padding-left:42px}

/* ─ 禁用 / 错误 ─ */
.is-disabled{opacity:.5;pointer-events:none}
.ipt.is-invalid{color:#e24b4a}

/* ─ 消息 ─ */
.msg{font-size:.74rem;color:var(--t-sub);line-height:1.4}
.msg.is-invalid{color:#e24b4a}
.msg:empty{display:none}

/* ─ Display 展示框 ─ */
.display-area{
  min-height:1.5em;line-height:1.5;width:100%;
  padding:10px 0;font-size:.9rem;color:var(--t-fg);
}
.display-text{white-space:pre-wrap;word-break:break-word}
.cursor{
  display:inline-block;color:var(--accent);font-weight:400;
  animation:cursorBlink .8s step-end infinite;
  margin-left:2px;vertical-align:middle;
}
@keyframes cursorBlink{0%,100%{opacity:1}50%{opacity:0}}

/* 文字对齐（作用在 display-area 自身） */
.display-area.ta-left  {text-align:left}
.display-area.ta-center{text-align:center}
.display-area.ta-right {text-align:right}

/* ─ Loading ─ */
.display-loading{color:var(--t-sub);animation:mPulse 1.5s ease-in-out infinite}

/* ─ 密码眼睛按钮 ─ */
.pwd-eye{
  position:absolute;right:10px;
  background:none;border:none;cursor:pointer;
  font-size:1.1rem;color:var(--t-sub);padding:4px;line-height:1;
  transition:color .2s;
}
.pwd-eye:hover{color:var(--t-fg)}
`
};

customElements.define('miorian-input', Input);
