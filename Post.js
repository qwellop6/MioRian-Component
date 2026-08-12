/* ═══════════════════ Post 文章组件 ═══════════════════
 *
 *  双属性：
 *    src  — 保存地址（write 模式写入 / edit 模式可选覆盖写入）
 *    file — 导入地址（edit / read 模式的加载来源）
 *
 *  三模式：
 *    read  — 只读展示（默认），file → fetch → MD→HTML 渲染
 *    edit  — 编辑已有文件，file → fetch → textarea 编辑 → 保存回 file
 *    write — 新建 MD 文件，空 textarea → 保存到 src
 *
 *  CSS 自定义属性：
 *    --post-max-width  / --post-font-size / --post-line-height
 */

class Post extends HTMLElement {
  constructor() {
    super();
    this._s = this.attachShadow({ mode: 'open' });
    this._dirty = false; // 内容是否已修改
  }

  connectedCallback() {
    /* ── 通用属性（排除 flex/悬停）── */
    const bp = BaseProps.read(this);
    const cls = bp.classList
      .replace(/\bflx-d-\S+/g, '').replace(/\bflx-j-\S+/g, '').replace(/\bflx-a-\S+/g, '')
      .replace(/\bflx-(wrap|nowrap)\b/g, '').replace(/\bhv-\S+/g, '')
      .replace(/\s{2,}/g, ' ').trim();

    /* ── Post 专属属性 ── */
    this._mode = this.getAttribute('mode') || 'read';   // read | edit | write
    this._src  = this.getAttribute('src')  || '';
    this._file = this.getAttribute('file') || '';

    /* ── 构建 DOM ── */
    const isRead  = this._mode === 'read';
    const toolbar = isRead ? '' : `
      <div class="toolbar" part="editor-toolbar">
        <span class="mode-badge">${this._mode === 'write' ? '新建' : '编辑'}</span>
        <span class="file-label">${this._mode === 'write' ? (this._src || '未设置保存路径') : (this._file || '未设置文件路径')}</span>
        <div class="tb-spacer"></div>
        <button class="tb-btn" id="btn-preview" title="切换预览">&#128065; 预览</button>
        <button class="tb-btn tb-save" id="btn-save" title="保存">&#128190; 保存</button>
      </div>`;

    this._s.innerHTML = `<style>${POST_CSS}${BaseProps.CSS}</style>
      <div class="post-root ${cls}" part="container">
        ${toolbar}
        <div class="content-area" part="content-area">
          <div class="read-view prose"></div>
          <textarea class="edit-view" placeholder="在此输入 Markdown 内容..."></textarea>
          <div class="preview-view prose" hidden></div>
        </div>
        <div class="loading">加载中...</div>
      </div>`;

    /* ── 引用 ── */
    this._readView    = this._s.querySelector('.read-view');
    this._editView    = this._s.querySelector('.edit-view');
    this._previewView = this._s.querySelector('.preview-view');
    this._loading     = this._s.querySelector('.loading');
    this._btnPreview  = this._s.getElementById('btn-preview');
    this._btnSave     = this._s.getElementById('btn-save');

    /* ── 模式初始化 ── */
    this._initMode();

    /* ── 事件 ── */
    this._editView.addEventListener('input', () => { this._dirty = true; });
    if (this._btnPreview) this._btnPreview.addEventListener('click', () => this._togglePreview());
    if (this._btnSave)    this._btnSave.addEventListener('click', () => this.save());
  }

  /* ═══════════════════ 模式初始化 ═══════════════════ */

  async _initMode() {
    if (this._mode === 'write') {
      /* 新建：空白编辑器 */
      this._loading.remove();
      this._readView.remove();  // write 模式不需要只读视图
      this._showEdit();

    } else {
      /* edit / read：从 file 加载 */
      if (!this._file) {
        this._loading.textContent = '缺少 file 属性';
        return;
      }
      try {
        const raw = await fetchFile(this._file);
        this._loading.remove();
        this._raw = raw;

        if (this._mode === 'read') {
          /* 只读 */
          this._editView.remove();
          this._previewView.remove();
          this._readView.innerHTML = parseMD(raw);
          this._readView.style.display = 'block';
        } else {
          /* 编辑 */
          this._readView.remove();
          this._editView.value = raw;
          this._showEdit();
        }
      } catch (e) {
        this._loading.textContent = '加载失败: ' + e.message;
      }
    }
  }

  /* ═══════════════════ 预览切换 ═══════════════════ */

  _showEdit() {
    this._editView.style.display = 'block';
    this._previewView.hidden = true;
    if (this._btnPreview) this._btnPreview.innerHTML = '&#128065; 预览';
  }

  _togglePreview() {
    const previewing = !this._previewView.hidden;
    if (previewing) {
      this._showEdit();
    } else {
      this._previewView.innerHTML = parseMD(this._editView.value);
      this._editView.style.display = 'none';
      this._previewView.hidden = false;
      this._btnPreview.innerHTML = '&#9998; 编辑';
    }
  }

  /* ═══════════════════ 保存 ═══════════════════ */

  async save() {
    const content = this._editView.value;
    const target = this._mode === 'write' ? this._src : (this._src || this._file);

    if (!target) {
      alert('未设置保存路径（缺少 src 属性，且非导入文件）');
      return;
    }

    /* 远程保存：POST 到目标 URL */
    if (/^https?:\/\//i.test(target)) {
      try {
        const res = await fetch(target, {
          method: 'PUT',
          headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
          body: content
        });
        if (res.ok) {
          this._dirty = false;
          this._flashSave();
        } else {
          alert('保存失败: HTTP ' + res.status);
        }
      } catch (e) {
        this._fallbackDownload(content);
      }
    } else {
      /* 本地路径：回退为下载 */
      this._fallbackDownload(content);
    }
  }

  _fallbackDownload(content) {
    const blob = new Blob([content], { type: 'text/markdown' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = this._mode === 'write'
      ? (this._src.split('/').pop() || 'post.md')
      : (this._file.split('/').pop() || 'post.md');
    a.click();
    this._dirty = false;
    this._flashSave();
  }

  _flashSave() {
    if (!this._btnSave) return;
    this._btnSave.textContent = '\u2705 已保存';
    this._btnSave.classList.add('saved');
    setTimeout(() => {
      this._btnSave.textContent = '\u{1F4BE} 保存';
      this._btnSave.classList.remove('saved');
    }, 1500);
  }

  /* ═══════════════════ 公共 API ═══════════════════ */

  get content() {
    return this._mode === 'read' ? (this._raw || '') : this._editView.value;
  }
  set content(v) {
    if (this._editView) this._editView.value = v;
    this._dirty = true;
  }
  get dirty() { return this._dirty; }
}

/* ═══════════════════ 文件加载（fetch + XHR 降级）══════════════════ */

async function fetchFile(path) {
  /* 1. 尝试标准 fetch（支持 http/https 和相对路径） */
  try {
    const res = await fetch(path);
    if (res.ok) return await res.text();
  } catch (_) { /* fetch 失败，尝试 XHR 降级 */ }

  /* 2. XHR 降级（部分浏览器允许 file:// 读取） */
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', path);
    xhr.onload  = () => { if (xhr.status === 200 || xhr.status === 0) resolve(xhr.responseText); else reject(new Error('XHR ' + xhr.status)); };
    xhr.onerror = () => reject(new Error('无法读取文件，请通过 http 服务器访问此页面'));
    xhr.send();
  });
}

/* ═══════════════════ 轻量 Markdown 解析器 ═══════════════════ */

function parseMD(md) {
  md = md.replace(/\r\n/g, '\n');

  /* 1. 保护代码块 */
  const codes = [];
  md = md.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    codes.push(`<pre><code class="language-${lang}">${esc(code.trim())}</code></pre>`);
    return `\u0000C${codes.length - 1}\u0000`;
  });

  /* 2. 保护行内代码 */
  const ics = [];
  md = md.replace(/`([^`]+)`/g, (_, c) => {
    ics.push(`<code>${esc(c)}</code>`);
    return `\u0000I${ics.length - 1}\u0000`;
  });

  /* 3. 块级解析 */
  const blocks = md.split(/\n\n+/).filter(Boolean);
  let html = blocks.map(block => {
    const lines = block.split('\n');

    /* 标题 */
    const mh = lines[0].match(/^(#{1,6})\s+(.+)/);
    if (mh && lines.length === 1) return `<h${mh[1].length}>${processInline(mh[2])}</h${mh[1].length}>`;

    /* 引用 */
    if (lines.every(l => /^>\s?/.test(l))) {
      const c = lines.map(l => l.replace(/^>\s?/, '')).join('<br>');
      return `<blockquote>${processInline(c)}</blockquote>`;
    }

    /* 无序列表 */
    if (lines.every(l => /^[-*]\s/.test(l))) {
      const items = lines.map(l => `<li>${processInline(l.replace(/^[-*]\s/, ''))}</li>`).join('');
      return `<ul>${items}</ul>`;
    }

    /* 有序列表 */
    if (lines.every(l => /^\d+\.\s/.test(l))) {
      const items = lines.map(l => `<li>${processInline(l.replace(/^\d+\.\s/, ''))}</li>`).join('');
      return `<ol>${items}</ol>`;
    }

    /* 分割线 */
    if (/^[-*_]{3,}$/.test(lines[0]) && lines.length === 1) return '<hr>';

    /* 段落 */
    return `<p>${processInline(lines.join('<br>'))}</p>`;
  }).join('\n');

  /* 4. 还原代码块 */
  html = html.replace(/\u0000C(\d+)\u0000/g, (_, i) => codes[i]);
  html = html.replace(/\u0000I(\d+)\u0000/g, (_, i) => ics[i]);

  return html;
}

function processInline(text) {
  return esc(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.+?)__/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

/* ═══════════════════ Post 专属 CSS ═══════════════════ */

const POST_CSS = `
:host{display:block;font-family:system-ui,-apple-system,'Segoe UI',sans-serif}

.post-root{
  box-sizing:border-box;border-radius:var(--borad,12px);
  background:var(--ov-bg,var(--t-bg));
  border:2px solid var(--ov-bd,var(--t-bd));
  color:var(--t-fg);
  box-shadow:0 calc(2px*var(--sl)) calc(9px*var(--sl)) rgba(0,0,0,calc(.07*var(--sl))),
             0 calc(1px*var(--sl)) calc(3px*var(--sl)) rgba(0,0,0,calc(.04*var(--sl)));
  overflow:hidden;
}

/* ─ 工具栏 ─ */
.toolbar{
  display:flex;align-items:center;gap:8px;
  padding:8px 16px;
  border-bottom:1px solid var(--t-bd);
  background:color-mix(in srgb,var(--t-bg) 96%,var(--t-fg));
}
.mode-badge{
  font-size:.72rem;font-weight:700;color:#fff;
  background:var(--accent);padding:2px 10px;border-radius:10px;
}
.file-label{
  font-size:.78rem;color:var(--t-sub);
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:260px;
}
.tb-spacer{flex:1}
.tb-btn{
  background:none;border:1px solid var(--t-bd);color:var(--t-sub);
  font-size:.78rem;padding:4px 12px;border-radius:6px;cursor:pointer;
  transition:all .15s;
}
.tb-btn:hover{background:var(--t-bd);color:var(--t-fg)}
.tb-save{background:var(--accent);color:#fff;border-color:var(--accent)}
.tb-save:hover{opacity:.85}
.tb-save.saved{background:#22c55e;border-color:#22c55e}

/* ─ 内容区 ─ */
.content-area{position:relative}

/* 编辑器 textarea */
.edit-view{
  display:none;width:100%;min-height:400px;
  padding:24px 28px;border:none;outline:none;resize:vertical;
  font-family:'Fira Code','Cascadia Code','Consolas',monospace;
  font-size:.92rem;line-height:1.8;color:var(--t-fg);
  background:var(--t-bg);box-sizing:border-box;
}

/* 预览 / 只读渲染 */
.read-view,
.preview-view{
  display:none;padding:28px 32px;
}

/* ─ Loading ─ */
.loading{
  text-align:center;color:var(--t-sub);
  padding:60px 0;animation:mPulse 1.5s ease-in-out infinite;
}

/* ═══════════════════ Prose 排版 ═══════════════════ */
.prose{
  max-width:var(--post-max-width,65ch);
  font-size:var(--post-font-size,1rem);
  line-height:var(--post-line-height,1.8);
  word-wrap:break-word;
}
.prose>:first-child{margin-top:0}
.prose>:last-child{margin-bottom:0}

.prose p{margin:0 0 1.5em}
.prose h1,.prose h2,.prose h3,.prose h4,.prose h5,.prose h6{
  margin:2em 0 .6em;font-weight:700;line-height:1.4;color:var(--t-fg);
}
.prose h1{font-size:2em}.prose h2{font-size:1.5em}.prose h3{font-size:1.25em}
.prose h4{font-size:1.1em}.prose h5{font-size:1em}.prose h6{font-size:.9em}

.prose blockquote{
  margin:1.5em 0;padding:12px 20px;
  border-left:4px solid var(--accent);
  background:color-mix(in srgb,var(--accent) 6%,transparent);
  font-style:italic;color:var(--t-sub);
}
.prose blockquote p{margin:0}

.prose pre{
  margin:1.5em 0;padding:16px 20px;
  background:color-mix(in srgb,var(--t-fg) 4%,var(--t-bg));
  border:1px solid var(--t-bd);border-radius:8px;
  overflow-x:auto;font-family:'Fira Code','Consolas',monospace;
  font-size:.88em;line-height:1.6;
}
.prose code{
  font-family:'Fira Code','Consolas',monospace;font-size:.9em;
  background:color-mix(in srgb,var(--t-fg) 6%,var(--t-bg));
  padding:2px 6px;border-radius:4px;
}
.prose pre code{background:none;padding:0;border-radius:0;font-size:inherit}

.prose ul,.prose ol{margin:1em 0;padding-left:1.8em}
.prose li{margin:.3em 0}
.prose li::marker{color:var(--t-sub)}

.prose a{
  color:var(--accent);text-decoration:none;
  border-bottom:1px solid color-mix(in srgb,var(--accent) 30%,transparent);
}
.prose a:hover{border-bottom-color:var(--accent)}

.prose img{max-width:100%;height:auto;border-radius:8px;margin:1.5em auto;display:block}
.prose hr{margin:2em 0;border:none;border-top:2px solid var(--t-bd)}

.prose table{width:100%;margin:1.5em 0;border-collapse:collapse;font-size:.95em}
.prose th,.prose td{padding:10px 14px;border:1px solid var(--t-bd);text-align:left}
.prose th{background:color-mix(in srgb,var(--t-fg) 4%,var(--t-bg));font-weight:700}
.prose tr:nth-child(even){background:color-mix(in srgb,var(--t-fg) 2%,var(--t-bg))}
`;

customElements.define('miorian-post', Post);
