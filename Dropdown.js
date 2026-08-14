/* ═══════════════════ Dropdown 多级下拉盒子组件 ═══════════════════
 *
 *  悬停触发器时，在其「下方 / 左方 / 右方」显示内容盒子；可无限嵌套。
 *
 *  用法：
 *    <miorian-dropdown>
 *      <miorian-avatar slot="trigger" ...></miorian-avatar>
 *      <菜单内容...>   ← 默认插槽，悬停时显示
 *    </miorian-dropdown>
 *
 *  继承 Block 全部属性（theme / accent / 边框 / 阴影 / 圆角 / flex / gap / padding...）
 *
 *  新增属性：
 *    side         — 菜单出现方位：down（默认）/ left / right
 *    push         — 布尔，抽屉式推移（left/right 时生效）：
 *                   菜单在左 → 展开时把触发器向右推；菜单在右 → 把触发器向左推
 *    open         — 布尔，开启展开动画（side=down 从上向下，left 从左到右，right 从右到左）
 *    open-time    — 动画时长（秒，默认 0.3）
 *    menu-align   — 菜单对齐（仅 side=down）：left / center / right
 *    arrow        — 布尔，显示三角箭头（仅 side=down）
 *    arrow-align  — 箭头位置：left / center / right
 *    arrow-offset — 箭头微调偏移（px/%/vw，默认 20px）
 */

class Dropdown extends HTMLElement {
  constructor() {
    super();
    this._s = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    /* ── 通用属性 ── */
    const bp = BaseProps.read(this);
    this.style.display = 'inline-block';
    this.style.width = 'auto';
    this.style.height = 'auto';
    const isAutoish = v => !v || v === 'auto' || /%$/.test(v.trim());
    const wAttr = this.getAttribute('width');
    const hAttr = this.getAttribute('height');
    this.style.setProperty('--w', isAutoish(wAttr) ? 'max-content' : wAttr);
    this.style.setProperty('--h', isAutoish(hAttr) ? 'auto' : hAttr);

    /* 面板类：继承 flex/padding/视觉，排除 hover/入场动效 */
    let cls = bp.classList;
    if (!this.hasAttribute('direction')) cls = cls.replace('flx-d-row', 'flx-d-col');
    cls = cls
      .replace(/\bhv-\S+/g, '')
      .replace(/\banim\b/g, '').replace(/\banim-\S+/g, '')
      .replace(/\s{2,}/g, ' ').trim();

    /* ── 专属属性 ── */
    const side        = this.getAttribute('side')       || 'down';
    const push        = this.hasAttribute('push');
    const open        = this.hasAttribute('open');
    const time        = open ? (parseFloat(this.getAttribute('open-time')) || 0.3) : 0;
    const menuAlign   = this.getAttribute('menu-align')  || 'left';
    const arrow       = this.hasAttribute('arrow');
    const arrowAlign  = this.getAttribute('arrow-align') || 'left';
    const arrowOffset = this.getAttribute('arrow-offset') || '20px';

    this.style.setProperty('--dd-time', time + 's');
    this.style.setProperty('--dd-arrow', arrowOffset);

    const sideClass   = `side-${side}`;
    const pushClass   = push && side !== 'down' ? 'push' : '';
    const animClass   = open && !push ? 'anim' : '';
    const menuClass   = side === 'down' ? `ma-${menuAlign}` : '';
    const arrowClass  = arrow && side === 'down' ? `has-arrow aa-${arrowAlign}` : '';

    this._s.innerHTML = `<style>${DD_CSS}${BaseProps.CSS}</style>
      <div class="dd ${sideClass} ${pushClass}">
        <div class="trigger" part="trigger"><slot name="trigger"></slot></div>
        <div class="panel ${animClass} ${menuClass} ${arrowClass} ${cls}" part="panel">
          <slot></slot>
        </div>
      </div>`;

    /* push 模式：测量菜单宽度，供触发器位移 */
    if (push && side !== 'down') {
      const panel = this._s.querySelector('.panel');
      this._ro = new ResizeObserver(() => {
        this.style.setProperty('--menu-w', panel.offsetWidth + 'px');
      });
      this._ro.observe(panel);
    }
  }

  disconnectedCallback() {
    if (this._ro) this._ro.disconnect();
  }
}

/* ═══════════════════ Dropdown 专属 CSS ═══════════════════ */
const DD_CSS = `
:host{position:relative}
.dd{position:relative;display:inline-block}
.trigger{display:inline-block;cursor:pointer}

.panel{
  position:absolute;z-index:999;
  display:flex;box-sizing:border-box;
  width:var(--w,max-content);height:var(--h,auto);
  min-width:0;min-height:0;
  background:var(--t-bg);
  border:2px solid var(--t-bd);
  border-radius:var(--borad,12px);
  box-shadow:0 calc(6px*var(--sl)) calc(20px*var(--sl)) rgba(0,0,0,.14);
  visibility:hidden;opacity:0;
  transition:opacity var(--dd-time,0s) ease,
             clip-path var(--dd-time,0s) ease,
             transform var(--dd-time,0s) ease,
             visibility 0s linear var(--dd-time,0s);
}
.dd:hover .panel{
  visibility:visible;opacity:1;
  transition:opacity var(--dd-time,0s) ease,
             clip-path var(--dd-time,0s) ease,
             transform var(--dd-time,0s) ease;
}

/* ─ 方位定位（down 只定 top，left/right 交给 ma-* 对齐类，避免覆盖）─ */
.side-down .panel{top:100%}
.side-left .panel{top:0;right:100%}
.side-right .panel{top:0;left:100%}

/* ─ 菜单水平对齐（仅 down）─ */
.ma-left  {left:0;right:auto;transform:none}
.ma-center{left:50%;right:auto;transform:translateX(-50%)}
.ma-right {left:auto;right:0;transform:none}

/* ─ 展开动画（方位对应的揭示方向）─ */
.panel.anim{clip-path:inset(0 0 100% 0)}
.side-left .panel.anim{clip-path:inset(0 0 0 100%)}
.side-right .panel.anim{clip-path:inset(0 100% 0 0)}
.dd:hover .panel.anim{clip-path:inset(0 0 0 0)}

/* ─ 抽屉式推移（push，transform 换位，不动布局）─ */
.dd.push .trigger{transition:transform var(--dd-time,0s) ease}
.dd.push .panel{top:0;left:0;right:auto}
.dd.push.side-left .panel{transform:translateX(-100%)}
.dd.push.side-right .panel{transform:translateX(100%)}
.dd.push:hover .panel{transform:translateX(0)}
.dd.push.side-left:hover .trigger{transform:translateX(var(--menu-w,0px))}
.dd.push.side-right:hover .trigger{transform:translateX(calc(-1 * var(--menu-w,0px)))}

/* ─ 三角箭头（旋转方块，仅 down）─ */
.has-arrow::before{
  content:'';position:absolute;top:-7px;
  width:12px;height:12px;
  background:var(--t-bg);
  border-left:2px solid var(--t-bd);
  border-top:2px solid var(--t-bd);
  transform:rotate(45deg);
  z-index:1;
}
.aa-left::before  {left:var(--dd-arrow,20px)}
.aa-center::before{left:50%;margin-left:-6px}
.aa-right::before {left:auto;right:var(--dd-arrow,20px)}
`;

customElements.define('miorian-dropdown', Dropdown);
