class Button extends HTMLElement {
  constructor() {
    super();
    this._s = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const theme   = this.getAttribute('theme')   || 'light';
    const accent  = this.getAttribute('accent')  || '#6c5ce7';
    const variant = this.getAttribute('variant') || 'solid';
    const size    = this.getAttribute('size')    || 'md';
    const rounded = this.getAttribute('rounded') || 'md';
    const icon    = this.getAttribute('icon')    || '';
    const loading = this.hasAttribute('loading');
    const disabled= this.hasAttribute('disabled');
    const glow    = this.hasAttribute('glow');
    const block   = this.hasAttribute('block');

    this.setAttribute('data-theme', theme);
    const s = this.style;
    s.setProperty('--accent', accent);

    const spinnerHTML = loading ? '<span class="spinner"></span>' : '';
    const iconHTML    = icon && !loading ? `<span class="ico">${icon}</span>` : '';

    this._s.innerHTML = `
      <style>${this._css(glow)}</style>
      <button class="
        btn ${variant} sz-${size} rd-${rounded}
        ${glow ? 'has-glow' : ''}
        ${disabled ? 'is-disabled' : ''}
        ${loading ? 'is-loading' : ''}
        ${block ? 'is-block' : ''}
      " ${disabled || loading ? 'disabled' : ''}>
        ${spinnerHTML}${iconHTML}<span class="lbl"><slot></slot></span>
      </button>`;
  }

  _css(glow) {
    return `
:host{--accent:#6c5ce7;display:inline-block;font-family:system-ui,-apple-system,sans-serif}
:host([data-theme="light"]){--bt-sf:0%} :host([data-theme="dark"]){--bt-sf:20%}
:host([data-theme="neon"]){--bt-sf:10%}
:host([data-theme="glass"]){--bt-sf:0%} :host([data-theme="paper"]){--bt-sf:-5%}
:host([data-theme="gradient"]){--bt-sf:15%}

.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;
  border:none;cursor:pointer;font-weight:600;outline:none;
  transition:all .25s cubic-bezier(.22,1,.36,1);
  -webkit-tap-highlight-color:transparent;user-select:none;position:relative}
.btn:active:not(.is-disabled):not(.is-loading){transform:scale(.97)}
.btn.is-disabled,.btn.is-loading{opacity:.5;cursor:not-allowed;pointer-events:none}

.solid{background:var(--accent);color:#fff;border:2px solid var(--accent)}
.solid:hover:not(.is-disabled):not(.is-loading){
  background:color-mix(in srgb,var(--accent) 85%,#000)}
.solid.is-loading{background:var(--accent)}

.outline{background:transparent;color:var(--accent);border:2px solid var(--accent)}
.outline:hover:not(.is-disabled):not(.is-loading){
  background:color-mix(in srgb,var(--accent) 12%,transparent)}

.ghost{background:transparent;color:var(--accent);border:2px solid transparent}
.ghost:hover:not(.is-disabled):not(.is-loading){
  background:color-mix(in srgb,var(--accent) 10%,transparent)}

.sz-sm{padding:5px 14px;font-size:.78rem;height:32px;gap:6px}
.sz-md{padding:8px 20px;font-size:.88rem;height:40px}
.sz-lg{padding:11px 28px;font-size:1rem;height:48px}
.rd-none{border-radius:4px} .rd-md{border-radius:8px} .rd-full{border-radius:999px}
.is-block{width:100%}
${glow?'.has-glow:not(.is-disabled):not(.is-loading){box-shadow:0 0 18px -2px var(--accent)}.has-glow:hover:not(.is-disabled):not(.is-loading){box-shadow:0 0 32px 0 var(--accent)}':''}
.ico{font-size:1.2em;line-height:1;display:inline-flex;align-items:center}
.lbl{line-height:1.15}
@keyframes btSpin{to{transform:rotate(360deg)}}
.spinner{width:16px;height:16px;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:btSpin .6s linear infinite;flex-shrink:0}
.sz-sm .spinner{width:12px;height:12px;border-width:2px}
.sz-lg .spinner{width:20px;height:20px;border-width:2.5px}
`;
  }
}
customElements.define('miorian-button', Button);
