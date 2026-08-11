class Card extends HTMLElement {
  constructor() {
    super();
    this._s = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const theme      = this.getAttribute('theme')      || 'light';
    const accent     = this.getAttribute('accent')     || '#6c5ce7';
    const padding    = this.getAttribute('padding')    || 'md';
    const hover      = this.getAttribute('hover')      || 'none';
    const shadowL    = this.getAttribute('shadowlevel')|| '1';
    const glow       = this.hasAttribute('glow');
    const glass      = this.hasAttribute('glass');
    const header     = this.getAttribute('header')     || '';
    const footer     = this.getAttribute('footer')     || '';

    this.setAttribute('data-theme', theme);
    const s = this.style;
    s.setProperty('--accent', accent);
    s.setProperty('--sl', shadowL);

    const headerHTML = header
      ? `<div class="hdr"><slot name="header">${header}</slot></div>`
      : '<slot name="header"></slot>';
    const footerHTML = footer
      ? `<div class="ftr"><slot name="footer">${footer}</slot></div>`
      : '<slot name="footer"></slot>';

    this._s.innerHTML = `
      <style>${this._css(glass, glow, hover)}</style>
      <div class="card pd-${padding} hv-${hover} ${glow?'has-glow':''} ${glass?'has-glass':''}">
        ${headerHTML}
        <div class="body"><slot></slot></div>
        ${footerHTML}
      </div>`;
  }

  _css(glass, glow, hover) {
    const glassCSS = glass ? `
.card.has-glass{background:var(--t-bg);backdrop-filter:blur(16px) saturate(1.5);
  -webkit-backdrop-filter:blur(16px) saturate(1.5);border-color:var(--t-bd)}` : '';
    const glowCSS = glow ? `
.card.has-glow{box-shadow:0 0 24px -4px var(--accent),0 calc(2px*var(--sl)) calc(12px*var(--sl)) rgba(0,0,0,.16)}
.card.has-glow.hv-lift:hover{box-shadow:0 0 38px 0 var(--accent),0 calc(5px*var(--sl)) calc(22px*var(--sl)) rgba(0,0,0,.2)}` : '';
    const hoverCSS = hover === 'lift' ? `
.hv-lift{transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s ease}
.hv-lift:hover{transform:translateY(-4px);box-shadow:0 calc(5px*var(--sl)) calc(22px*var(--sl)) rgba(0,0,0,calc(.11*var(--sl)))}` :
      hover === 'border' ? `
.hv-border{transition:border-color .3s ease}
.hv-border:hover{border-color:var(--accent)}` : '';

    return `
:host{--accent:#6c5ce7;--sl:1;display:block;font-family:system-ui,-apple-system,sans-serif}
:host([data-theme="light"]){--t-bg:#fff;--t-fg:#1a1a2e;--t-sub:#6c7086;--t-bd:#e8e8e8}
:host([data-theme="dark"]){--t-bg:#1a1a2e;--t-fg:#f0f0f0;--t-sub:#9a9ab0;--t-bd:#2a2a3e}
:host([data-theme="neon"]){--t-bg:#0d0221;--t-fg:#f0f0ff;--t-sub:#b080ff;--t-bd:var(--accent)}
:host([data-theme="glass"]){--t-bg:rgba(255,255,255,.06);--t-fg:#fff;--t-sub:rgba(255,255,255,.7);--t-bd:rgba(255,255,255,.12)}
:host([data-theme="paper"]){--t-bg:#fdfbf7;--t-fg:#3e2c1c;--t-sub:#8a7960;--t-bd:#d4c5a9}
:host([data-theme="gradient"]){--t-bg:linear-gradient(135deg,#667eea,#764ba2);--t-fg:#fff;--t-sub:rgba(255,255,255,.8);--t-bd:transparent}

.card{box-sizing:border-box;border-radius:14px;background:var(--t-bg);border:2px solid var(--t-bd);color:var(--t-fg);
  box-shadow:0 calc(2px*var(--sl)) calc(9px*var(--sl)) rgba(0,0,0,calc(.07*var(--sl))),
             0 calc(1px*var(--sl)) calc(3px*var(--sl)) rgba(0,0,0,calc(.04*var(--sl)));overflow:hidden}
${glassCSS}${glowCSS}${hoverCSS}

.pd-none .body{padding:0}
.pd-sm .body{padding:12px 16px} .pd-md .body{padding:18px 22px} .pd-lg .body{padding:28px 32px}

.hdr{font-weight:600;font-size:.95rem;padding:14px 22px 0}
.hdr:empty{display:none}
.hdr ::slotted(*),.hdr>*{margin:0;font-weight:600;font-size:.95rem;color:var(--t-fg)}

.ftr{padding:0 22px 14px;margin-top:4px;font-size:.82rem;color:var(--t-sub)}
.ftr:empty{display:none}

::slotted(*){max-width:100%}
`;
  }
}
customElements.define('miorian-card', Card);
