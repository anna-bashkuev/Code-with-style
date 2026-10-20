import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { PageNav } from "@/components/page-nav"
import { PageShell } from "@/components/page-shell"
import { ComponentPreview } from "@/components/component-preview"
import {
  AnimatedPopoverDemo,
  AutoPopoverDemo,
  HintPopoverDemo,
  ManualPopoverDemo,
} from "@/components/popover-demo"

export const metadata: Metadata = {
  title: "Popover API",
  description:
    "Interactive examples of the native HTML Popover API — auto, manual, and hint popovers, nesting, anchoring, and animated top-layer transitions.",
}

const AUTO_HTML = `<button popovertarget="menu">Open menu</button>

<div id="menu" popover="auto" class="menu">
  <button popovertarget="menu" popovertargetaction="hide">New file</button>
  <button popovertarget="menu" popovertargetaction="hide">Duplicate</button>
  <!-- invoker inside the menu => submenu nests instead of closing it -->
  <button popovertarget="submenu">Share</button>
  <button popovertarget="menu" popovertargetaction="hide">Archive</button>
</div>

<div id="submenu" popover="auto" class="menu submenu">
  <button popovertarget="menu" popovertargetaction="hide">Copy link</button>
  <button popovertarget="menu" popovertargetaction="hide">Email</button>
</div>`

const AUTO_CSS = `.menu {
  margin: auto; /* fallback: centred in the viewport */
  border: 1px solid #ddd;
  border-radius: 0.75rem;
  padding: 0.5rem;
}

/* The invoker becomes the popover's implicit anchor */
@supports (position-area: bottom) {
  .menu {
    inset: auto;
    margin: 0.4rem 0;
    position-area: bottom span-right;
    position-try-fallbacks: flip-block, flip-inline;
  }
  .submenu {
    margin: 0 0.4rem;
    position-area: right span-bottom;
  }
}`

const MANUAL_HTML = `<button popovertarget="toast" popovertargetaction="show">Show toast</button>
<button popovertarget="toast" popovertargetaction="hide">Hide toast</button>

<div id="toast" popover="manual" role="status" class="toast">
  <strong>Changes saved</strong>
  <p>Your stylesheet was published to production.</p>
  <button popovertarget="toast" popovertargetaction="hide"
          aria-label="Dismiss notification">&times;</button>
</div>`

const MANUAL_CSS = `.toast {
  /* override the UA's centred inset */
  inset: auto 1.25rem 1.25rem auto;
  width: min(22rem, calc(100vw - 2.5rem));
  display: none;
}
.toast:popover-open {
  display: flex;
}`

const ANIMATED_HTML = `<button popovertarget="sheet">Open animated popover</button>

<div id="sheet" popover role="dialog" aria-labelledby="sheet-title" class="sheet">
  <h4 id="sheet-title">Animate in and out of the top layer</h4>
  <p>...</p>
  <button popovertarget="sheet" popovertargetaction="hide">Got it</button>
</div>`

const ANIMATED_CSS = `.sheet {
  /* closed (exit) state */
  opacity: 0;
  translate: 0 1rem;
  scale: 0.96;
  transition:
    opacity 0.3s, translate 0.3s, scale 0.3s,
    overlay 0.3s allow-discrete,
    display 0.3s allow-discrete;
}
.sheet:popover-open {
  opacity: 1;
  translate: 0 0;
  scale: 1;
}

/* where the entry transition starts from */
@starting-style {
  .sheet:popover-open {
    opacity: 0;
    translate: 0 1rem;
    scale: 0.96;
  }
}

.sheet::backdrop {
  background: rgb(0 0 0 / 0);
  backdrop-filter: blur(0);
  transition: all 0.3s allow-discrete;
}
.sheet:popover-open::backdrop {
  background: rgb(0 0 0 / 0.35);
  backdrop-filter: blur(3px);
}
@starting-style {
  .sheet:popover-open::backdrop {
    background: rgb(0 0 0 / 0);
    backdrop-filter: blur(0);
  }
}`

const HINT_HTML = `<button aria-describedby="tip-bold">Bold</button>
<div id="tip-bold" popover="hint" role="tooltip" class="tip">
  Make the selected text bold (Ctrl+B)
</div>`

const HINT_CSS = `.tip {
  margin: auto;
  padding: 0.45rem 0.7rem;
  border: 0;
  border-radius: 0.45rem;
  background: #111;
  color: #fff;
}

@supports (position-area: top) {
  .tip {
    inset: auto;
    margin: 0 0 0.5rem;
    position-area: top;
    position-try-fallbacks: flip-block;
  }
}`

const HINT_JS = `const button = document.querySelector("[aria-describedby='tip-bold']");
const tip = document.getElementById("tip-bold");

// \`source\` makes the button the tooltip's implicit anchor
const show = () => {
  if (!tip.matches(":popover-open")) tip.showPopover({ source: button });
};
const hide = () => {
  if (tip.matches(":popover-open")) tip.hidePopover();
};

button.addEventListener("pointerenter", show);
button.addEventListener("pointerleave", hide);
button.addEventListener("focus", show);
button.addEventListener("blur", hide);`

export default function PopoverPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="CwS 2.0"
        title="Popover API"
        description="The native popover attribute promotes any element to the top layer with light-dismiss, Escape handling, focus management, and accessible invoker wiring built in — no z-index battles and, for most patterns, no JavaScript."
      />

      <div className="mt-10 flex flex-col gap-12">
        <ComponentPreview
          title="Auto popover with nested submenu"
          description="popover=&quot;auto&quot; closes on outside click or Escape, and only one auto popover stack is open at a time. Opening a popover from inside another nests it, so the parent menu stays open. The invoker doubles as an implicit anchor for CSS anchor positioning."
          html={AUTO_HTML}
          css={AUTO_CSS}
        >
          <AutoPopoverDemo />
        </ComponentPreview>

        <ComponentPreview
          title="Manual popover toast"
          description="popover=&quot;manual&quot; opts out of light-dismiss. Use it for toasts and persistent panels that must be hidden explicitly, with popovertargetaction choosing show, hide, or toggle."
          html={MANUAL_HTML}
          css={MANUAL_CSS}
        >
          <ManualPopoverDemo />
        </ComponentPreview>

        <ComponentPreview
          title="Animated entry, exit, and backdrop"
          description="Transition popovers in and out of the top layer with @starting-style and allow-discrete transitions on display and overlay. Auto popovers also get a ::backdrop you can style and animate."
          html={ANIMATED_HTML}
          css={ANIMATED_CSS}
        >
          <AnimatedPopoverDemo />
        </ComponentPreview>

        <ComponentPreview
          title="Hint popover tooltips"
          description="popover=&quot;hint&quot; is made for transient UI like tooltips. Showing a hint won't close open auto popovers. In browsers without hint support it falls back to manual behaviour."
          html={HINT_HTML}
          css={HINT_CSS}
          js={HINT_JS}
        >
          <HintPopoverDemo />
        </ComponentPreview>
      </div>

      <PageNav />
    </PageShell>
  )
}
