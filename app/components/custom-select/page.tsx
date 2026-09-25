import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { PageNav } from "@/components/page-nav"
import { PageShell } from "@/components/page-shell"
import { ComponentPreview } from "@/components/component-preview"
import { CustomSelect } from "@/components/custom-select"

export const metadata: Metadata = {
  title: "Customizable Select",
}

const HTML = `<div class="phrase">
  <span>you</span>

  <span class="select" data-open="false">
    <button type="button" class="select__button"
            aria-haspopup="listbox" aria-expanded="false"
            aria-controls="cs-list">
      <span class="select__value">build</span>
      <svg class="select__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path class="c-top"          d="M7 9L12 4"   stroke-width="2" stroke-linecap="round" />
        <path class="c-top-left"     d="M17 9L12 4"  stroke-width="2" stroke-linecap="round" />
        <path class="c-bottom"       d="M7 15L12 20" stroke-width="2" stroke-linecap="round" />
        <path class="c-bottom-right" d="M17 15L12 20" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>

    <div class="select__picker">
      <ul id="cs-list" class="select__scroller" role="listbox" tabindex="-1">
        <li class="select__option" role="option">design</li>
        <li class="select__option" role="option">prototype</li>
        <li class="select__option" role="option" aria-selected="true">build</li>
        <li class="select__option" role="option">develop</li>
        <li class="select__option" role="option">ship</li>
        <!-- ...more options... -->
      </ul>
    </div>
  </span>

  <span>things</span>
</p>`

const CSS = `.select { position: relative; display: inline-block; }

/* --- trigger button --- */
.select__button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 11ch;
  padding: 0.25rem 0.75rem;
  border: 0;
  border-radius: 0.5rem;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
  transition: background 0.26s ease-out;
}
.select__button:hover,
.select[data-open="true"] .select__button {
  background: color-mix(in oklch, currentColor 8%, transparent);
}
.select__value { flex: 1; text-align: left; color: var(--accent); }

/* --- animated chevron: down -> arrows-out --- */
.select__chevron { width: 24px; height: 24px; opacity: 0.5; transition: opacity 0.2s; }
.select:hover .select__chevron,
.select[data-open="true"] .select__chevron { opacity: 1; }
.select__chevron path {
  transition: translate 0.2s, rotate 0.2s, d 0.2s;
  transform-box: fill-box;
  transform-origin: center;
}
.c-top-left { transform-origin: 0 0; }
.c-bottom-right { transform-origin: 0 100%; }
.select[data-open="true"] .c-top { d: path("M4 12L12 4"); }
.select[data-open="true"] .c-top-left {
  d: path("M21.8984 13.8984L11.9989 3.99894"); rotate: -45deg; translate: -8px 8px;
}
.select[data-open="true"] .c-bottom { d: path("M4 12L12 20"); }
.select[data-open="true"] .c-bottom-right {
  d: path("M21.8984 10L11.9989 19.8995"); rotate: 45deg; translate: -8px -8px;
}

/* --- picker overlay, centred over the button --- */
.select__picker {
  --row: 2.5rem;
  --rows: 7;
  position: absolute;
  left: 0;
  top: 50%;
  translate: 0 -50%;
  width: max-content;
  min-width: 100%;
  height: calc(var(--rows) * var(--row));
  z-index: 30;
  /* fade the top & bottom edges */
  mask: linear-gradient(#0000, #fff 2rem calc(100% - 2rem), #0000);
  transition: opacity 0.3s, scale 0.3s;
}
.select[data-open="false"] .select__picker { opacity: 0; scale: 0.96; pointer-events: none; }
.select[data-open="true"]  .select__picker { opacity: 1; scale: 1; }

/* --- scroll-snapping list --- */
.select__scroller {
  height: 100%;
  margin: 0;
  list-style: none;
  overflow-y: auto;
  overscroll-behavior: contain;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;
  /* padding lets the first & last items reach the centre */
  padding-block: calc(((var(--rows) - 1) / 2) * var(--row));
}
.select__scroller::-webkit-scrollbar { display: none; }

.select__option {
  display: flex;
  align-items: center;
  height: var(--row);
  padding-inline: 0.75rem;
  scroll-snap-align: center;
  cursor: pointer;
  white-space: nowrap;
  /* --d = distance from centre in rows, set from JS */
  --d: 3;
  opacity: calc(1 - min(var(--d), 3) * 0.27);
  filter: blur(calc(min(var(--d), 3) * 1.4px));
  transition: color 0.2s;
}
.select__option[aria-selected="true"] { color: var(--accent); }`

const JS = `const select   = document.querySelector(".select");
const button   = select.querySelector(".select__button");
const value    = select.querySelector(".select__value");
const scroller = select.querySelector(".select__scroller");
const options  = [...select.querySelectorAll(".select__option")];

let selected = options.findIndex((o) => o.getAttribute("aria-selected") === "true");
if (selected < 0) selected = 0;

const setOpen = (open) => {
  select.dataset.open = String(open);
  button.setAttribute("aria-expanded", String(open));
  if (open) requestAnimationFrame(() => { centerOption(selected, false); paint(); });
};

const isOpen = () => select.dataset.open === "true";

// distance of every option from the centre -> drives blur + fade via CSS
const paint = () => {
  const rect = scroller.getBoundingClientRect();
  const center = rect.top + rect.height / 2;
  const rowH = options[0].getBoundingClientRect().height || 1;
  for (const el of options) {
    const c = el.getBoundingClientRect();
    const d = Math.abs(c.top + c.height / 2 - center) / rowH;
    el.style.setProperty("--d", d.toFixed(3));
  }
};

const centerOption = (index, smooth) => {
  const el = options[index];
  const top = el.offsetTop + el.offsetHeight / 2 - scroller.clientHeight / 2;
  scroller.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
};

const setSelected = (index) => {
  selected = index;
  options.forEach((el, i) => el.setAttribute("aria-selected", String(i === index)));
  value.textContent = options[index].textContent;
};

// repaint while scrolling, then snap-select the centred item once it settles
let raf, settle;
scroller.addEventListener("scroll", () => {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(paint);
  clearTimeout(settle);
  settle = setTimeout(() => {
    const rect = scroller.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    let best = 0, bestD = Infinity;
    options.forEach((el, i) => {
      const c = el.getBoundingClientRect();
      const d = Math.abs(c.top + c.height / 2 - center);
      if (d < bestD) { bestD = d; best = i; }
    });
    setSelected(best);
  }, 120);
});

button.addEventListener("click", () => setOpen(!isOpen()));

button.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") { e.preventDefault(); isOpen() ? move(1) : setOpen(true); }
  else if (e.key === "ArrowUp") { e.preventDefault(); isOpen() ? move(-1) : setOpen(true); }
  else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(!isOpen()); }
});

const move = (delta) => {
  const next = Math.min(options.length - 1, Math.max(0, selected + delta));
  setSelected(next);
  if (isOpen()) centerOption(next, true);
};

options.forEach((el, i) =>
  el.addEventListener("click", () => {
    setSelected(i);
    centerOption(i, true);
    setOpen(false);
    button.focus();
  }),
);

// close on outside click / Escape
window.addEventListener("pointerdown", (e) => {
  if (isOpen() && !select.contains(e.target)) setOpen(false);
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isOpen()) { setOpen(false); button.focus(); }
});`

export default function CustomSelectPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Components"
        title="Customizable Select"
        description="A styleable select built the plugin-free way — CSS scroll-snap for the centred picker and a little vanilla JS for the proximity fade-and-blur, morphing chevron, and keyboard control. Inspired by Jhey Tompkins' CodePen, rebuilt without GSAP or the experimental ::picker() API."
      />

      <div className="mt-10 flex flex-col gap-12">
        <ComponentPreview
          title="You build things"
          description="Click the value to open the picker, then scroll or use the arrow keys. The centred option snaps into focus while its neighbours fade and blur by distance."
          html={HTML}
          css={CSS}
          js={JS}
        >
          <CustomSelect />
        </ComponentPreview>
      </div>

      <PageNav />
    </PageShell>
  )
}
