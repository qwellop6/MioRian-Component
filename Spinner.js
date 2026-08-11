class Spinner extends HTMLElement {
  constructor() {
    super();
    this._s = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const variant = this.getAttribute('variant') || 'ring';
    const size    = this.getAttribute('size')    || 'md';
    const accent  = this.getAttribute('accent')  || '#6c5ce7';
    const speed   = this.getAttribute('speed')   || 'normal';
    const label   = this.getAttribute('label')   || '';

    this.style.setProperty('--accent', accent);

    this._s.innerHTML = `
      <style>${this._css(variant, size, speed)}</style>
      <div class="spinner sp-${variant} sz-${size} sd-${speed}" role="status">
        <span class="sr">${label || 'Loading'}</span>
      </div>`;
  }

  _css(variant, size, speed) {
    const sizeMap = { sm: '20', md: '32', lg: '48', xl: '64' };
    const dim = sizeMap[size] || '32';
    const durMap = { slow: '1.2', normal: '.7', fast: '.4' };
    const dur = durMap[speed] || '.7';

    const ringCSS = variant === 'ring' ? `
.sp-ring{border:3px solid color-mix(in srgb,var(--accent) 15%,transparent);border-top-color:var(--accent);border-radius:50%;animation:ringSpin ${dur}s linear infinite}` : '';
    const dotsCSS = variant === 'dots' ? `
.sp-dots{display:flex;gap:6px;align-items:center}
.sp-dots::before,.sp-dots::after,.sp-dots>*{content:'';display:block;width:calc(${dim}px/4.5);height:calc(${dim}px/4.5);border-radius:50%;background:var(--accent);animation:dotBounce ${dur}s ease-in-out infinite}
.sp-dots::before{animation-delay:-.3s}.sp-dots::after{animation-delay:-.15s}
.sp-dots>*{animation-delay:0s}` : '';
    const pulseCSS = variant === 'pulse' ? `
.sp-pulse{border-radius:50%;background:var(--accent);animation:pulseBeat ${dur}s ease-in-out infinite}` : '';
    const barsCSS = variant === 'bars' ? `
.sp-bars{display:flex;gap:3px;align-items:flex-end;height:${dim}px}
.sp-bars i{display:block;flex:1;background:var(--accent);border-radius:2px;animation:barWave ${dur}s ease-in-out infinite}
.sp-bars i:nth-child(1){animation-delay:-.45s}.sp-bars i:nth-child(2){animation-delay:-.3s}.sp-bars i:nth-child(3){animation-delay:-.15s}.sp-bars i:nth-child(4){animation-delay:0s}` : '';

    return `
:host{--accent:#6c5ce7;display:inline-flex;align-items:center;justify-content:center;font-family:system-ui,sans-serif}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}
.spinner{display:flex;align-items:center;justify-content:center}

/* Ring */
${variant==='ring'?`.sp-ring{width:${dim}px;height:${dim}px}`:''}
@keyframes ringSpin{to{transform:rotate(360deg)}}

/* Dots */
${variant==='dots'?`.sz-${size}{width:${dim}px;height:${dim}px}`:''}
@keyframes dotBounce{0%,80%,100%{transform:scale(.6);opacity:.4}40%{transform:scale(1);opacity:1}}

/* Pulse */
${variant==='pulse'?`.sp-pulse{width:${dim}px;height:${dim}px}`:''}
@keyframes pulseBeat{0%,100%{transform:scale(.8);opacity:.5}50%{transform:scale(1);opacity:1}}

/* Bars */
${variant==='bars'?`
.sp-bars{width:${dim}px;height:${dim}px}`:''}
@keyframes barWave{0%,40%,100%{transform:scaleY(.3);opacity:.3}20%{transform:scaleY(1);opacity:1}}
`;
  }
}
customElements.define('miorian-spinner', Spinner);
