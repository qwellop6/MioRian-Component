class Block extends HTMLElement {
  constructor() {
    super();
    this._s = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    /* ── 基础视觉 — 保留原始属性设计 ── */
    const bordercolor = this.getAttribute('bordercolor');
    const backcolor   = this.getAttribute('backcolor');
    const Wvh   = this.getAttribute('Wvh')   || '4';
    const Hvw   = this.getAttribute('Hvw')   || '8';
    const Borad = this.getAttribute('Borad') || '15';

    /* ── 主题 & 强调色 ── */
    const theme  = this.getAttribute('theme')  || 'light';
    const accent = this.getAttribute('accent') || '#6c5ce7';

    /* ── 布局 — row | col | overlay ── */
    const layout = this.getAttribute('layout') || 'row';

    /* ── 内容字段 ── */
    const avatar  = this.getAttribute('avatar')      || '';
    const avShape = this.getAttribute('avatarshape') || 'circle';
    const title    = this.getAttribute('title')       || '';
    const subtitle = this.getAttribute('subtitle')    || '';
    const desc     = this.getAttribute('desc')        || '';
    const tags     = (this.getAttribute('tags') || '')
      .split(/[,，]/).map(t => t.trim()).filter(Boolean);
    const links    = (this.getAttribute('links') || '')
      .split('|').map(l => {
        const parts = l.split(',').map(s => (s || '').trim());
        return { icon: parts[0] || '', label: parts[1] || '', href: parts[2] || '#' };
      }).filter(l => l.label || l.icon);

    /* ── 视觉效果 ── */
    const glow    = this.hasAttribute('glow');
    const glass   = this.hasAttribute('glass');
    const anim    = this.getAttribute('anim')       || 'none';
    const shadowL = this.getAttribute('shadowlevel') || '1';

    /* ── 注入 CSS 变量 ── */
    const s = this.style;
    s.setProperty('--Wvh', Wvh);
    s.setProperty('--Hvw', Hvw);
    s.setProperty('--Borad', Borad + 'px');
    s.setProperty('--accent', accent);
    s.setProperty('--sl', shadowL);
    if (bordercolor) s.setProperty('--ov-bd', bordercolor);
    if (backcolor)   s.setProperty('--ov-bg', backcolor);
    this.setAttribute('data-theme', theme);

    /* ── 构建 HTML ── */
    const avHTML = avatar
      ? `<div class="avatar av-${avShape}" style="background-image:url('${avatar}')"></div>`
      : '';

    const content = [
      title    && `<div class="title">${title}</div>`,
      subtitle && `<div class="subtitle">${subtitle}</div>`,
      desc     && `<div class="desc">${desc}</div>`,
      tags.length  && `<div class="tags">${tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>`,
      links.length && `<div class="links">${links.map(l =>
        `<a class="link" href="${l.href}" target="_blank" rel="noopener">${l.icon ? `<span class="ico">${l.icon}</span>` : ''}<span>${l.label}</span></a>`
      ).join('')}</div>`,
    ].filter(Boolean).join('');

    const animClass = anim !== 'none' ? `anim anim-${anim}` : '';

    this._s.innerHTML = `<style>${C}</style>
      <div class="frame ${layout} ${animClass}">
        ${avHTML}
        ${content ? `<div class="content">${content}</div>` : ''}
        <slot></slot>
      </div>`;
  }
}

/* ═══════════════════════════════════════════
   CSS 模板 — 主题 / 布局 / 动效
   ═══════════════════════════════════════════ */
const C = `
:host{--accent:#6c5ce7;--sl:1;display:inline-block;font-family:system-ui,-apple-system,'Segoe UI',sans-serif}

/* ─ 6 套主题色板 ─ */
:host([data-theme="light"]){--t-bg:#fff;--t-fg:#1a1a2e;--t-sub:#6c7086;--t-bd:#e8e8e8;--t-tag-bg:color-mix(in srgb,var(--accent) 12%,transparent);--t-tag-fg:var(--accent)}
:host([data-theme="dark"]){--t-bg:#1a1a2e;--t-fg:#f0f0f0;--t-sub:#9a9ab0;--t-bd:#2a2a3e;--t-tag-bg:color-mix(in srgb,var(--accent) 22%,transparent);--t-tag-fg:#c0b0ff}
:host([data-theme="neon"]){--t-bg:#0d0221;--t-fg:#f0f0ff;--t-sub:#b080ff;--t-bd:var(--accent);--t-tag-bg:color-mix(in srgb,var(--accent) 18%,transparent);--t-tag-fg:#d0c0ff}
:host([data-theme="glass"]){--t-bg:rgba(255,255,255,.07);--t-fg:#fff;--t-sub:rgba(255,255,255,.72);--t-bd:rgba(255,255,255,.14);--t-tag-bg:rgba(255,255,255,.12);--t-tag-fg:#fff}
:host([data-theme="paper"]){--t-bg:#fdfbf7;--t-fg:#3e2c1c;--t-sub:#8a7960;--t-bd:#d4c5a9;--t-tag-bg:rgba(62,44,28,.09);--t-tag-fg:#3e2c1c}
:host([data-theme="gradient"]){--t-bg:linear-gradient(135deg,#667eea,#764ba2);--t-fg:#fff;--t-sub:rgba(255,255,255,.82);--t-bd:transparent;--t-tag-bg:rgba(255,255,255,.16);--t-tag-fg:#fff}

/* ─ 框架 ─ */
.frame{position:relative;box-sizing:border-box;width:calc(120vh/var(--Wvh,4));height:calc(120vw/var(--Hvw,8));border-radius:var(--Borad,15px);background:var(--ov-bg,var(--t-bg));border:2px solid var(--ov-bd,var(--t-bd));color:var(--t-fg);overflow:hidden;transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s ease;box-shadow:0 calc(2px*var(--sl)) calc(9px*var(--sl)) rgba(0,0,0,calc(.07*var(--sl))),0 calc(1px*var(--sl)) calc(3px*var(--sl)) rgba(0,0,0,calc(.04*var(--sl)))}
:host([glass]) .frame{backdrop-filter:blur(16px) saturate(1.5);-webkit-backdrop-filter:blur(16px) saturate(1.5)}
:host([glow]) .frame{box-shadow:0 0 26px -4px var(--accent),0 calc(2px*var(--sl)) calc(12px*var(--sl)) rgba(0,0,0,.16)}
:host([glow]) .frame:hover{box-shadow:0 0 42px 0 var(--accent),0 calc(4px*var(--sl)) calc(20px*var(--sl)) rgba(0,0,0,.22)}
.frame:hover{transform:translateY(-4px)}
.frame:not(:hover){box-shadow:0 calc(2px*var(--sl)) calc(9px*var(--sl)) rgba(0,0,0,calc(.07*var(--sl))),0 calc(1px*var(--sl)) calc(3px*var(--sl)) rgba(0,0,0,calc(.04*var(--sl)))}
:host([glow]) .frame:not(:hover){box-shadow:0 0 26px -4px var(--accent),0 calc(2px*var(--sl)) calc(12px*var(--sl)) rgba(0,0,0,.16)}

/* ─ 布局 ─ */
.frame.row{display:flex;align-items:center;gap:18px;padding:20px 24px}
.frame.row .avatar{flex-shrink:0}
.frame.row .content{flex:1;min-width:0}
.frame.col{display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px;padding:26px 20px}
.frame.overlay{display:flex;flex-direction:column;align-items:center;text-align:center;padding:48px 24px 20px}
.frame.overlay .avatar{position:absolute;top:-34px;border:4px solid var(--t-bg)}

/* ─ 头像 ─ */
.avatar{width:62px;height:62px;background-size:cover;background-position:center;flex-shrink:0;box-shadow:0 0 0 3px var(--accent)}
.av-circle{border-radius:50%}
.av-squircle{border-radius:30%}
.av-square{border-radius:8px}
.frame.col .avatar,.frame.overlay .avatar{width:78px;height:78px}

/* ─ 文字层级 ─ */
.title{font-size:1.12rem;font-weight:700;line-height:1.3;color:var(--t-fg)}
.subtitle{font-size:.8rem;font-weight:500;color:var(--t-sub);margin-top:2px}
.desc{font-size:.84rem;line-height:1.55;color:var(--t-sub);margin-top:8px}

/* ─ 标签 ─ */
.tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.frame.col .tags,.frame.overlay .tags{justify-content:center}
.tag{font-size:.7rem;font-weight:600;padding:3px 10px;border-radius:100px;background:var(--t-tag-bg);color:var(--t-tag-fg)}

/* ─ 链接 ─ */
.links{display:flex;flex-wrap:wrap;gap:14px;margin-top:12px}
.frame.col .links,.frame.overlay .links{justify-content:center}
.link{font-size:.78rem;color:var(--t-sub);text-decoration:none;display:inline-flex;align-items:center;gap:4px;transition:color .2s}
.link:hover{color:var(--accent)}

/* ─ 入场动画 ─ */
@keyframes mFade{from{opacity:0}to{opacity:1}}
@keyframes mSlide{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes mPop{0%{opacity:0;transform:scale(.92)}60%{transform:scale(1.02)}100%{opacity:1;transform:scale(1)}}
.anim-fade{animation:mFade .5s ease both}
.anim-slide{animation:mSlide .5s cubic-bezier(.22,1,.36,1) both}
.anim-pop{animation:mPop .45s cubic-bezier(.22,1,.36,1) both}

::slotted(*){margin-top:10px}`;
customElements.define('miorian-block', Block);
