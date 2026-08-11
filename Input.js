class Input extends HTMLElement {
  constructor() {
    super();
    this._s = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const theme       = this.getAttribute('theme')       || 'light';
    const accent      = this.getAttribute('accent')      || '#6c5ce7';
    const type        = this.getAttribute('type')        || 'text';
    const placeholder = this.getAttribute('placeholder') || '';
    const label       = this.getAttribute('label')       || '';
    const value       = this.getAttribute('value')       || '';
    const icon        = this.getAttribute('icon')        || '';
    const size        = this.getAttribute('size')        || 'md';
    const disabled    = this.hasAttribute('disabled');
    const invalid     = this.hasAttribute('invalid');
    const message     = this.getAttribute('message')     || '';
    const isTextarea  = type === 'textarea';

    this.setAttribute('data-theme', theme);
    this.style.setProperty('--accent', accent);

    const inputAttrs = [
      `placeholder="${placeholder}"`,
      disabled ? 'disabled' : '',
      isTextarea ? '' : `type="${type}"`,
    ].filter(Boolean).join(' ');

    const inputEl = isTextarea
      ? `<textarea class="ipt ${invalid?'is-invalid':''}" ${inputAttrs} rows="4">${value}</textarea>`
      : `<input  class="ipt ${invalid?'is-invalid':''}" ${inputAttrs} value="${value}">`;

    const iconHTML = icon ? `<span class="ico">${icon}</span>` : '';
    const labelHTML = label ? `<label class="lbl">${label}</label>` : '';
    const msgHTML = message ? `<span class="msg ${invalid?'is-invalid':''}">${message}</span>` : '';

    this._s.innerHTML = `
      <style>${this._css()}</style>
      <div class="wrap sz-${size} ${disabled?'is-disabled':''}">
        ${labelHTML}
        <div class="ipt-wrap">
          ${iconHTML}${inputEl}
        </div>
        ${msgHTML}
      </div>`;

    this._input = this._s.querySelector('.ipt');
    if (this._input) {
      this._input.addEventListener('input', (e) => {
        this.dispatchEvent(new CustomEvent('change', { detail: e.target.value, bubbles: true, composed: true }));
      });
    }
  }

  get native() { return this._input; }

  _css() {
    return `
:host{--accent:#6c5ce7;display:inline-block;font-family:system-ui,-apple-system,sans-serif;width:100%}
:host([data-theme="light"]){--in-bg:#fff;--in-fg:#1a1a2e;--in-bd:#e0e0e0;--in-ph:#aaa;--in-bg-f:#fff}
:host([data-theme="dark"]){--in-bg:#1a1a2e;--in-fg:#f0f0f0;--in-bd:#2a2a3e;--in-ph:#666;--in-bg-f:#1e1e35}
:host([data-theme="neon"]){--in-bg:#0d0221;--in-fg:#f0f0ff;--in-bd:var(--accent);--in-ph:#5a5080;--in-bg-f:#0f0328}
:host([data-theme="glass"]){--in-bg:rgba(255,255,255,.06);--in-fg:#fff;--in-bd:rgba(255,255,255,.12);--in-ph:rgba(255,255,255,.35);--in-bg-f:rgba(255,255,255,.08)}
:host([data-theme="paper"]){--in-bg:#fdfbf7;--in-fg:#3e2c1c;--in-bd:#d4c5a9;--in-ph:#b0a28a;--in-bg-f:#faf6ed}
:host([data-theme="gradient"]){--in-bg:rgba(255,255,255,.1);--in-fg:#fff;--in-bd:rgba(255,255,255,.18);--in-ph:rgba(255,255,255,.45);--in-bg-f:rgba(255,255,255,.15)}

.wrap{display:flex;flex-direction:column;gap:6px;width:100%}
.lbl{font-size:.82rem;font-weight:600;color:var(--in-fg)}
.ipt-wrap{position:relative;display:flex;align-items:center}
.ico{position:absolute;left:12px;font-size:1rem;color:var(--in-ph);pointer-events:none;line-height:1;z-index:1}
.ipt{flex:1;width:100%;font-family:inherit;font-size:.9rem;line-height:1.5;
  background:var(--in-bg);color:var(--in-fg);
  border:2px solid var(--in-bd);border-radius:10px;
  padding:10px 14px;outline:none;
  transition:border-color .25s ease,box-shadow .25s ease,background .25s ease;
  box-sizing:border-box;resize:vertical}
.ico+.ipt{padding-left:38px}

.sz-sm .ipt{padding:6px 12px;font-size:.82rem;border-radius:8px}
.sz-sm .ico+.ipt{padding-left:34px}
.sz-lg .ipt{padding:12px 18px;font-size:1rem;border-radius:12px}
.sz-lg .ico+.ipt{padding-left:42px}

.ipt:focus{border-color:var(--accent);box-shadow:0 0 0 3px color-mix(in srgb,var(--accent) 20%,transparent);background:var(--in-bg-f)}
.ipt::placeholder{color:var(--in-ph)}
.ipt:disabled{opacity:.5;cursor:not-allowed}
.ipt.is-invalid{border-color:#e24b4a}
.ipt.is-invalid:focus{box-shadow:0 0 0 3px rgba(226,75,74,.2)}

.msg{font-size:.74rem;color:var(--in-ph);line-height:1.4}
.msg.is-invalid{color:#e24b4a}
`;
  }
}
customElements.define('miorian-input', Input);
