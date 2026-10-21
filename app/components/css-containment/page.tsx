import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { PageNav } from "@/components/page-nav"
import { PageShell } from "@/components/page-shell"
import { ComponentPreview } from "@/components/component-preview"
import {
  AnimationDemo,
  DataTableDemo,
  DialogDemo,
  FilterDemo,
  FixedInPaintDemo,
  FlyoutDemo,
  NestedLayoutDemo,
  PopupDemo,
  SidebarDemo,
  StickyDemo,
  StrictBoxDemo,
  TabsDemo,
  VirtualListDemo,
  WidgetsDemo,
} from "@/components/css-containment-demo"

export const metadata: Metadata = {
  title: "CSS Containment Examples",
  description:
    "Interactive examples of the CSS contain property, content-visibility, and isolation: isolate — and how they make rendering faster and layouts more predictable.",
}

const REFERENCE = [
  { value: "layout", text: "Changes inside the element don't move things outside it, and the other way round." },
  { value: "paint", text: "Children are never drawn outside the element's box. Off-screen elements can skip painting." },
  { value: "style", text: "Counters and quotes inside the element don't affect the rest of the page." },
  { value: "size", text: "The element's size ignores its children. You must give it a size yourself." },
  { value: "content", text: "Shorthand for layout paint style. A safe default for most components." },
  { value: "strict", text: "Shorthand for size layout paint style. Fastest, but needs explicit width and height." },
]

const SIDEBAR_HTML = `<div class="layout">
  <nav class="sidebar" data-collapsed="false">
    <button aria-expanded="true">Collapse</button>
    <a>Home</a> <a>Documents</a> <a>Projects</a>
  </nav>
  <main class="content">
    <!-- updates every second -->
  </main>
</div>`

const SIDEBAR_CSS = `.layout {
  display: flex;
}

.sidebar {
  /* keep sidebar work separate from the busy content */
  contain: layout paint style;
  flex: 0 0 12rem;
  transition: flex-basis 0.25s;
}

.sidebar[data-collapsed="true"] {
  flex-basis: 3.5rem;
}`

const POPUP_HTML = `<div class="anchor">
  <button aria-expanded="false" aria-controls="popup">Open popup</button>
  <div id="popup" class="popup" hidden>…</div>
</div>`

const POPUP_CSS = `.anchor {
  position: relative;
}

.popup {
  contain: layout paint;
  isolation: isolate; /* new stacking context for inner z-index */
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  z-index: 10;
}`

const FLYOUT_HTML = `<div class="flyout-wrap">
  <ul class="list">
    <li><button aria-expanded="true">Layout</button></li>
    <li><button aria-expanded="false">Colors</button></li>
  </ul>

  <div class="flyout">
    <p>Flow</p>
    <ul><li>Block</li><li>Inline</li><li>Flex</li></ul>
    <p>Grid</p>
    <ul><li>Template</li><li>Subgrid</li></ul>
  </div>
</div>`

const FLYOUT_CSS = `.flyout-wrap {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.flyout {
  /* opening the flyout never reflows the list next to it */
  contain: layout paint;
  width: 13rem;
}`

const VIRTUAL_HTML = `<div class="viewport">
  <div style="height: 400000px"> <!-- 10,000 x 40px -->
    <div style="transform: translateY(…)">
      <!-- only the visible rows are in the DOM -->
      <div class="row">Row 1</div>
      <div class="row">Row 2</div>
    </div>
  </div>
</div>`

const VIRTUAL_CSS = `.viewport {
  contain: strict; /* size + layout + paint + style */
  height: 20rem;   /* required: strict ignores content size */
  overflow-y: auto;
}

.row {
  content-visibility: auto;          /* skip off-screen rows */
  contain-intrinsic-size: auto 40px; /* placeholder size */
  height: 40px;
}`

const VIRTUAL_JS = `const ROW = 40, TOTAL = 10_000, OVERSCAN = 6;

viewport.addEventListener("scroll", () => {
  const start = Math.max(0, Math.floor(viewport.scrollTop / ROW) - OVERSCAN);
  const end = Math.min(
    TOTAL,
    Math.ceil((viewport.scrollTop + viewport.clientHeight) / ROW) + OVERSCAN
  );
  renderRows(start, end); // only build rows start..end
});`

const WIDGETS_HTML = `<div class="grid">
  <article class="widget" data-live>…updates every second…</article>
  <article class="widget">Uptime</article>
  <article class="widget">Users</article>
  <article class="widget">Errors</article>
</div>`

const WIDGETS_CSS = `.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
  gap: 0.75rem;
}

.widget {
  /* each card is its own little island */
  contain: layout style paint;
}`

const NESTED_HTML = `<div class="outer">          <!-- flex -->
  <aside>Flex item</aside>
  <div class="main">
    <div class="inner-grid">  <!-- grid -->
      <div>Tile 1</div> …
    </div>
  </div>
</div>`

const NESTED_CSS = `.outer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.main {
  flex: 1;
  min-width: 14rem;
}

.inner-grid {
  /* grid reflow stays inside; the flex parent isn't re-laid out */
  contain: layout;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(6.5rem, 1fr));
}`

const STICKY_HTML = `<!-- Demo A -->
<div class="scroll sticky-parent">
  <div class="sticky-header">Sticky header</div>
  …
</div>

<!-- Demo B -->
<div class="scroll paint-parent">
  <span class="badge">position: fixed</span>
  …
</div>`

const STICKY_CSS = `.scroll {
  height: 14rem;
  overflow-y: auto;
}

/* Demo A: sticky still works */
.sticky-parent {
  contain: layout;
}
.sticky-header {
  position: sticky;
  top: 0;
}

/* Demo B: watch out! */
.paint-parent {
  contain: paint; /* becomes the containing block for fixed children */
}
.badge {
  position: fixed; /* pinned to .paint-parent, NOT the viewport */
  top: 0.75rem;
  right: 0.75rem;
}`

const ANIM_HTML = `<button>Hide card</button>
<article class="card" data-state="shown">…</article>`

const ANIM_CSS = `.card {
  contain: layout paint;
  transition: transform 0.4s, opacity 0.4s;
}

.card[data-state="hidden"] {
  transform: translateX(3rem) scale(0.85);
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
}`

const FILTER_HTML = `<label for="q" class="sr-only">Filter items</label>
<input id="q" type="search" placeholder="Filter 200 items">
<p aria-live="polite">Showing 200 of 200</p>

<ul class="results">
  <li>Amber Anchor</li>
  …
</ul>`

const FILTER_CSS = `.results {
  /* adding/removing items repaints only this box */
  contain: paint;
  max-height: 16rem;
  overflow-y: auto;
}

/* Note: filter: blur() etc. ALSO creates a containing
   block, so position: fixed children stick to it. */`

const TABLE_HTML = `<div class="table-wrap">
  <table>
    <thead>
      <tr>
        <th aria-sort="ascending"><button>ID</button></th>
        <th aria-sort="none"><button>Name</button></th>
        …
      </tr>
    </thead>
    <tbody class="rows"> <!-- 500 rows --> </tbody>
  </table>
</div>`

const TABLE_CSS = `.table-wrap {
  contain: layout style;
  height: 20rem;
  overflow: auto;
}

th {
  position: sticky;
  top: 0;
}

.rows {
  contain: content;
}`

const STRICT_HTML = `<div class="chart-box">
  <ul class="chart">
    <li>Mon <span class="bar" style="width: 62%"></span> 62</li>
    …
  </ul>
</div>`

const STRICT_CSS = `.chart-box {
  contain: strict;
  /* strict includes size containment:
     without these, the box collapses to 0 x 0 */
  width: 300px;
  height: 200px;
  overflow: hidden;
}`

const TABS_HTML = `<div role="tablist">
  <button role="tab" aria-selected="true">Overview</button>
  <button role="tab" aria-selected="false">Activity</button>
  <button role="tab" aria-selected="false">Settings</button>
</div>

<!-- all panels stay mounted, so their state is kept -->
<div role="tabpanel" class="panel">…</div>
<div role="tabpanel" class="panel" hidden>…</div>
<div role="tabpanel" class="panel" hidden>…</div>`

const TABS_CSS = `.panel {
  contain: content; /* layout + paint + style */
}

.panel[hidden] {
  display: none;
}`

const DIALOG_HTML = `<button id="open">Open dialog</button>

<dialog class="dialog" aria-labelledby="dialog-title">
  <h3 id="dialog-title">A contained native dialog</h3>
  <button id="close">Close</button>
</dialog>`

const DIALOG_CSS = `.dialog {
  contain: layout paint;
  isolation: isolate;
}

.dialog::backdrop {
  background: rgb(0 0 0 / 0.35);
}`

const DIALOG_JS = `const dialog = document.querySelector(".dialog");
const open = document.getElementById("open");

open.addEventListener("click", () => dialog.showModal());
document.getElementById("close")
  .addEventListener("click", () => dialog.close());

// Escape closes a modal <dialog> natively.
// Return focus to the trigger when it closes:
dialog.addEventListener("close", () => open.focus());`

export default function CssContainmentPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="CwS 3.0"
        title="CSS Containment Examples"
        description="The contain property tells the browser that a part of the page is independent from the rest. The browser can then skip work when that part changes, which makes rendering faster and layouts more predictable. isolation: isolate keeps z-index stacking inside a component."
      />

      <section aria-labelledby="reference-title" className="mt-10 flex flex-col gap-4">
        <h2 id="reference-title" className="text-lg font-semibold text-balance">
          Quick reference
        </h2>
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {REFERENCE.map((item) => (
            <div key={item.value} className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4">
              <dt className="font-mono text-sm font-semibold text-foreground">contain: {item.value}</dt>
              <dd className="text-sm leading-relaxed text-muted-foreground">{item.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-12 flex flex-col gap-12">
        <ComponentPreview
          title="Sidebars"
          description="Put contain: layout paint style on the sidebar. The content next to it updates every second, but the browser doesn't need to recheck the sidebar each time. Collapse it to see that it still behaves normally."
          html={SIDEBAR_HTML}
          css={SIDEBAR_CSS}
        >
          <SidebarDemo />
        </ComponentPreview>

        <ComponentPreview
          title="Popups"
          description="Use contain: layout paint with isolation: isolate. Opening the popup doesn't reflow the page, and z-index values inside it stay inside it."
          html={POPUP_HTML}
          css={POPUP_CSS}
          className="min-h-56 items-start"
        >
          <PopupDemo />
        </ComponentPreview>

        <ComponentPreview
          title="Flyouts"
          description="A flyout menu with nested groups gets contain: layout paint. It opens to the side of the list without causing the list to be laid out again."
          html={FLYOUT_HTML}
          css={FLYOUT_CSS}
        >
          <FlyoutDemo />
        </ComponentPreview>

        <ComponentPreview
          title="Virtualized scroll lists"
          description="The scroll container uses contain: strict with a fixed height. Each row uses content-visibility: auto with contain-intrinsic-size. Only the visible rows of 10,000 are rendered. Scroll to watch the counters."
          html={VIRTUAL_HTML}
          css={VIRTUAL_CSS}
          js={VIRTUAL_JS}
        >
          <VirtualListDemo />
        </ComponentPreview>

        <ComponentPreview
          title="Widgets"
          description="Each dashboard card has contain: layout style paint. The highlighted widget updates every second without affecting the other three."
          html={WIDGETS_HTML}
          css={WIDGETS_CSS}
        >
          <WidgetsDemo />
        </ComponentPreview>

        <ComponentPreview
          title="Nested grid and flex containers"
          description="An inner grid with contain: layout sits inside a flex container. When the window changes size, the grid reflows on its own and the flex parent doesn't need to redo its layout because of it."
          html={NESTED_HTML}
          css={NESTED_CSS}
        >
          <NestedLayoutDemo />
        </ComponentPreview>

        <ComponentPreview
          title="Sticky and fixed elements"
          description="Demo A: a sticky header keeps working when its parent has contain: layout. Demo B: a position: fixed badge inside a container with contain: paint is pinned to that container instead of the viewport."
          html={STICKY_HTML}
          css={STICKY_CSS}
        >
          <div className="grid w-full gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">Demo A: sticky header</p>
              <StickyDemo />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">Demo B: fixed badge</p>
              <FixedInPaintDemo />
            </div>
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Animations and transitions"
          description="Give the animated element contain: layout paint and animate only transform and opacity. The animation is turned off when the user prefers reduced motion."
          html={ANIM_HTML}
          css={ANIM_CSS}
        >
          <AnimationDemo />
        </ComponentPreview>

        <ComponentPreview
          title="Filters"
          description="A list with contain: paint filters 200 items as you type, and only the list is repainted. Note: the CSS filter property also creates a containing block, so position: fixed children inside it stick to it."
          html={FILTER_HTML}
          css={FILTER_CSS}
        >
          <FilterDemo />
        </ComponentPreview>

        <ComponentPreview
          title="Data tables"
          description="The wrapper has contain: layout style and the rows container has contain: content. Click a column header to sort 500 rows; the header stays sticky. Browsers ignore layout and paint containment on internal table parts like tbody, so there it mainly limits style scope."
          html={TABLE_HTML}
          css={TABLE_CSS}
        >
          <DataTableDemo />
        </ComponentPreview>

        <ComponentPreview
          title="Fixed-size containers"
          description="contain: strict with an explicit width and height makes a box fully independent. Tick the checkbox to remove the size: strict ignores the content, so the content area collapses to zero and only the padding and border remain."
          html={STRICT_HTML}
          css={STRICT_CSS}
        >
          <StrictBoxDemo />
        </ComponentPreview>

        <ComponentPreview
          title="Tabs"
          description="Each tab panel has contain: content. All panels stay in the page and inactive ones are hidden, so each counter keeps its value when you switch tabs. Use the arrow keys to move between tabs."
          html={TABS_HTML}
          css={TABS_CSS}
        >
          <TabsDemo />
        </ComponentPreview>

        <ComponentPreview
          title="Modal dialogs"
          description="A native dialog element with contain: layout paint and isolation: isolate. Escape closes it, and focus goes back to the button that opened it."
          html={DIALOG_HTML}
          css={DIALOG_CSS}
          js={DIALOG_JS}
        >
          <DialogDemo />
        </ComponentPreview>
      </div>

      <PageNav />
    </PageShell>
  )
}
