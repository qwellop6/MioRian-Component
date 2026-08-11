class Modal extends HTMLElement {
  constructor() {
    super();
    this._s = this.attachShadow({ mode: 'open' });
    this._onKey = (e) => { if (e.key === 'Escape' && this._closeable) this.close(); };
    this._onBackdrop = (e) => { if (e.target === this._s.querySelector('.backdrop') && this._closeable) this.close(); };
  }

  connectedCallback() {
    const theme    = this.getAttribute('theme')    || 'light';
    const accent   = this.getAttribute('accent')   || '#6c5ce7';
    const title    = this.getAttribute('title')    || '';
    const size     = this.getAttribute('size')     || 'md';
    const backdrop = this.getAttribute('backdrop') || 'dark';
    this._closeable = !this.hasAttribute('noclose');
    const open     = this.hasAttribute('open');

    this.setAttribute('data-theme', theme);
    this.style.setProperty('--accent', accent);

    const closeBtn = this._closeable ? '<button class="cls">&times;</button>' : '';
    const titleHTML = title ? `<div class="ttl">${closeBtn}${title}</div>` : '';

    this._s.innerHTML = `
      <style>${this._css(backdrop)}</style>
      <div class="backdrop bd-${backdrop} ${open?'is-open':''}">
        <div class="modal sz-${size}">
          ${titleHTML}
          <div class="body"><slot></slot></div>
        </div>
      </div>`;

    this._backdrop = this._s.querySelector('.backdrop');
    this._backdrop.addEventListener('click', this._onBackdrop);

    const clsBtn = this._s.querySelector('.cls');
    if (clsBtn) clsBtn.addEventListener('click', () => this.close());
  }

  open() {
    if (this._backdrop) this._backdrop.classList.add('is-open');
    document.addEventListener('keydown', this._onKey);
    this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true }));
  }

  close() {
    if (this._backdrop) this._backdrop.classList.remove('is-open');
    document.removeEventListener('keydown', this._onKey);
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  toggle() {
    this._backdrop && this._backdrop.classList.contains('is-open') ? this.close() : this.open();
  }

  _css(backdrop) {
    const bdMap = {
      light: 'rgba(255,255,255,.7)',
      dark: 'rgba(0,0,0,.55)',
      blur: 'rgba(0,0,0,.2)',
      none: 'transparent',
    };
    const bdColor = bdMap[backdrop] || bdMap.dark;
    const bdBlur = backdrop === 'blur' ? 'backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)' : '';

    return `
:host{--accent:#6c5ce7;font-family:system-ui,-apple-system,sans-serif}
:host([data-theme="light"]){--md-bg:#fff;--md-fg:#1a1a2e;--md-bd:#e8e8e8}
:host([data-theme="dark"]){--md-bg:#1a1a2e;--md-fg:#f0f0f0;--md-bd:#2a2a3e}
:host([data-theme="neon"]){--md-bg:#0d0221;--md-fg:#f0f0ff;--md-bd:var(--accent)}
:host([data-theme="glass"]){--md-bg:rgba(255,255,255,.08);--md-fg:#fff;--md-bd:rgba(255,255,255,.12)}
:host([data-theme="paper"]){--md-bg:#fdfbf7;--md-fg:#3e2c1c;--md-bd:#d4c5a9}
:host([data-theme="gradient"]){--md-bg:linear-gradient(135deg,#667eea,#764ba2);--md-fg:#fff;--md-bd:transparent}

.backdrop{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;
  background:${bdColor};${bdBlur};z-index:1000;
  opacity:0;visibility:hidden;transition:opacity .3s ease,visibility .3s ease}
.backdrop.is-open{opacity:1;visibility:visible}

.modal{position:relative;box-sizing:border-box;max-height:85vh;display:flex;flex-direction:column;
  background:var(--md-bg);color:var(--md-fg);border:2px solid var(--md-bd);
  border-radius:16px;overflow:hidden;
  transform:translateY(20px) scale(.97);
  transition:transform .35s cubic-bezier(.22,1,.36,1)}
.is-open .modal{transform:translateY(0) scale(1)}

.sz-sm .modal{width:360px} .sz-md .modal{width:520px} .sz-lg .modal{width:680px} .sz-full .modal{width:calc(100vw - 48px);max-height:90vh}

.ttl{display:flex;align-items:center;justify-content:space-between;padding:18px 24px 10px;
  font-size:1.05rem;font-weight:700;color:var(--md-fg)}
.cls{background:none;border:none;font-size:1.4rem;cursor:pointer;color:var(--md-fg);opacity:.5;
  padding:0;line-height:1;transition:opacity .2s;order:1}
.cls:hover{opacity:1}

.body{padding:10px 24px 22px;overflow-y:auto;flex:1}
`;
  }
}
customElements.define('miorian-modal', Modal);
