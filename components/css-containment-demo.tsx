"use client"

import { useEffect, useId, useMemo, useRef, useState } from "react"
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  ChevronRight,
  FileText,
  Folder,
  Home,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  X,
} from "lucide-react"
import styles from "./css-containment-demo.module.css"

function useTicker(intervalMs = 1000) {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return tick
}

function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      const box = entry.borderBoxSize?.[0]
      setSize({
        width: Math.round(box ? box.inlineSize : entry.contentRect.width),
        height: Math.round(box ? box.blockSize : entry.contentRect.height),
      })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return [ref, size] as const
}

/* ---------- 1. Sidebar ---------- */

const SIDEBAR_ITEMS = [
  { label: "Home", icon: Home },
  { label: "Documents", icon: FileText },
  { label: "Projects", icon: Folder },
  { label: "Settings", icon: Settings },
]

const EVENTS = ["Build passed", "New comment", "Deploy started", "File uploaded", "Review requested"]

export function SidebarDemo() {
  const [collapsed, setCollapsed] = useState(false)
  const tick = useTicker()
  const feed = Array.from({ length: 4 }, (_, i) => {
    const n = tick - i
    return n < 0 ? null : { id: n, text: `${EVENTS[n % EVENTS.length]} #${n + 1}` }
  }).filter((item): item is { id: number; text: string } => item !== null)

  return (
    <div className={`${styles.surface} ${styles.sidebarLayout}`}>
      <nav aria-label="Demo sidebar" className={styles.sidebar} data-collapsed={collapsed}>
        <button
          type="button"
          className={styles.iconButton}
          onClick={() => setCollapsed((c) => !c)}
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="size-4" aria-hidden="true" />
          ) : (
            <PanelLeftClose className="size-4" aria-hidden="true" />
          )}
        </button>
        {SIDEBAR_ITEMS.map(({ label, icon: Icon }) => (
          <div key={label} className={styles.sidebarItem} title={collapsed ? label : undefined}>
            <Icon className="size-4 shrink-0" aria-hidden="true" />
            <span className={styles.sidebarLabel}>{label}</span>
          </div>
        ))}
      </nav>

      <div className={styles.sidebarContent}>
        <p className={styles.meta}>
          Live updates: <span className={styles.stat}>{tick}</span>
        </p>
        <ul className={styles.feed}>
          {feed.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
        <p className={styles.meta}>
          This area changes every second. Because the sidebar is contained, the browser does not
          need to recheck the sidebar&apos;s layout or paint when this content changes.
        </p>
      </div>
    </div>
  )
}

/* ---------- 2. Popup ---------- */

export function PopupDemo() {
  const [open, setOpen] = useState(false)
  const popupId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)

  return (
    <div
      className={styles.popupAnchor}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false)
          triggerRef.current?.focus()
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.trigger} ${styles.triggerPrimary}`}
        aria-expanded={open}
        aria-controls={popupId}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "Close popup" : "Open popup"}
      </button>

      {open && (
        <div id={popupId} role="region" aria-label="Popup" className={`${styles.surface} ${styles.floating} ${styles.popup}`}>
          <div className="flex items-start justify-between gap-2">
            <p className={styles.title}>Contained popup</p>
            <button
              type="button"
              className={styles.iconButton}
              aria-label="Close popup"
              onClick={() => {
                setOpen(false)
                triggerRef.current?.focus()
              }}
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
          <p className={styles.meta}>
            Opening this popup does not trigger a layout pass for the rest of the page. Its own
            z-index stack is isolated, so inner layers can&apos;t leak out.
          </p>
        </div>
      )}
    </div>
  )
}

/* ---------- 3. Flyout ---------- */

const FLYOUT_DATA: Record<string, { group: string; items: string[] }[]> = {
  Layout: [
    { group: "Flow", items: ["Block", "Inline", "Flex"] },
    { group: "Grid", items: ["Template", "Subgrid"] },
  ],
  Colors: [
    { group: "Spaces", items: ["oklch()", "color-mix()"] },
    { group: "Themes", items: ["Light", "Dark"] },
  ],
  Typography: [
    { group: "Fonts", items: ["Variable", "Fallbacks"] },
    { group: "Wrapping", items: ["balance", "pretty"] },
  ],
}

export function FlyoutDemo() {
  const [active, setActive] = useState<string | null>(null)
  const flyoutId = useId()

  return (
    <div
      className={styles.flyoutWrap}
      onKeyDown={(e) => {
        if (e.key === "Escape") setActive(null)
      }}
    >
      <ul className={`${styles.surface} ${styles.flyoutList}`}>
        {Object.keys(FLYOUT_DATA).map((key) => (
          <li key={key}>
            <button
              type="button"
              className={styles.listButton}
              aria-expanded={active === key}
              aria-controls={flyoutId}
              onClick={() => setActive((cur) => (cur === key ? null : key))}
            >
              {key}
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div id={flyoutId} className={`${styles.surface} ${styles.floating} ${styles.flyout}`}>
          {FLYOUT_DATA[active].map((section) => (
            <div key={section.group}>
              <p className={styles.flyoutGroup}>{section.group}</p>
              <ul className={styles.flyoutNested}>
                {section.items.map((item) => (
                  <li key={item}>
                    <button type="button" className={styles.listButton} onClick={() => setActive(null)}>
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ---------- 4. Virtualized list ---------- */

const TOTAL_ROWS = 10_000
const ROW_HEIGHT = 40
const OVERSCAN = 6

export function VirtualListDemo() {
  const [state, setState] = useState({ scrollTop: 0, viewport: 320, renders: 1 })
  const viewportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    setState((s) => ({ ...s, viewport: el.clientHeight, renders: s.renders + 1 }))
  }, [])

  const start = Math.max(0, Math.floor(state.scrollTop / ROW_HEIGHT) - OVERSCAN)
  const end = Math.min(TOTAL_ROWS, Math.ceil((state.scrollTop + state.viewport) / ROW_HEIGHT) + OVERSCAN)
  const rows = []
  for (let i = start; i < end; i++) rows.push(i)

  return (
    <div className={styles.stage}>
      <div className={styles.row}>
        <span className={styles.tag}>Total rows: {TOTAL_ROWS.toLocaleString("en-US")}</span>
        <span className={styles.tag}>Rows in the DOM: {rows.length}</span>
        <span className={styles.tag}>Renders: {state.renders}</span>
      </div>
      <div
        ref={viewportRef}
        className={`${styles.surface} ${styles.virtualViewport}`}
        tabIndex={0}
        role="region"
        aria-label="Virtualized list of 10,000 rows"
        onScroll={(e) => {
          const scrollTop = e.currentTarget.scrollTop
          setState((s) => ({ ...s, scrollTop, renders: s.renders + 1 }))
        }}
      >
        <div style={{ height: TOTAL_ROWS * ROW_HEIGHT, position: "relative" }}>
          <div style={{ transform: `translateY(${start * ROW_HEIGHT}px)` }}>
            {rows.map((i) => (
              <div key={i} className={styles.virtualRow}>
                <span>Row {(i + 1).toLocaleString("en-US")}</span>
                <span className={styles.meta}>#{String(i + 1).padStart(5, "0")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- 5. Widgets ---------- */

function LiveWidget() {
  const tick = useTicker()
  const bars = Array.from({ length: 12 }, (_, i) => 20 + ((tick * 7 + i * 13) % 80))
  return (
    <article className={`${styles.surface} ${styles.widget}`} data-live="true">
      <p className={styles.meta}>Live requests</p>
      <p className={styles.widgetValue}>{(1200 + ((tick * 37) % 400)).toLocaleString("en-US")}</p>
      <div className={styles.bars} aria-hidden="true">
        {bars.map((h, i) => (
          <span key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
      <p className={styles.meta}>Updates every second</p>
    </article>
  )
}

function StaticWidget({ label, value }: { label: string; value: string }) {
  return (
    <article className={`${styles.surface} ${styles.widget}`}>
      <p className={styles.meta}>{label}</p>
      <p className={styles.widgetValue}>{value}</p>
      <p className={styles.meta}>Static, untouched by the live widget</p>
    </article>
  )
}

export function WidgetsDemo() {
  return (
    <div className={styles.widgetGrid}>
      <LiveWidget />
      <StaticWidget label="Uptime" value="99.98%" />
      <StaticWidget label="Users" value="4,812" />
      <StaticWidget label="Errors" value="3" />
    </div>
  )
}

/* ---------- 6. Nested grid in flex ---------- */

export function NestedLayoutDemo() {
  const [gridRef, size] = useElementSize<HTMLDivElement>()
  const columns = Math.max(1, Math.floor((size.width + 8) / (104 + 8)))

  return (
    <div className={styles.nestedFlex}>
      <aside className={`${styles.surface} ${styles.nestedAside}`}>
        <p className={styles.title}>Flex item</p>
        <p className={styles.meta}>Fixed width</p>
      </aside>
      <div className={`${styles.surface} ${styles.nestedMain}`}>
        <p className={styles.meta}>
          Inner grid width: <span className={styles.stat}>{size.width}px</span> · about{" "}
          <span className={styles.stat}>{columns}</span> columns. Resize the window to see it reflow.
        </p>
        <div ref={gridRef} className={styles.innerGrid}>
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className={styles.tile}>
              Tile {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- 7. Sticky + fixed ---------- */

const LOREM = [
  "Scroll this box. The header sticks to the top of its own scroll area.",
  "contain: layout on the parent keeps its layout work separate from the rest of the page.",
  "Sticky positioning keeps working, because the scroll container is still the reference.",
  "Keep scrolling to see more lines of filler content.",
  "Containment is a hint to the browser, not a change in how things look.",
  "Almost at the end of this demo content.",
  "That is the end of the list.",
]

export function StickyDemo() {
  return (
    <div className={`${styles.surface} ${styles.scrollBox} ${styles.stickyParent}`} tabIndex={0} role="region" aria-label="Sticky header demo">
      <div className={styles.stickyHeader}>Sticky header</div>
      <div className={styles.scrollBody}>
        {LOREM.concat(LOREM).map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </div>
  )
}

export function FixedInPaintDemo() {
  return (
    <div className={styles.stage}>
      <p className={styles.warning}>
        <AlertTriangle className="size-4" aria-hidden="true" />
        Watch out: the fixed element now sticks to this container, not the viewport.
      </p>
      <div className={`${styles.surface} ${styles.scrollBox} ${styles.paintParent}`} tabIndex={0} role="region" aria-label="Fixed badge demo">
        <span className={styles.fixedBadge}>position: fixed</span>
        <div className={styles.scrollBody}>
          <p>The badge uses position: fixed, but it sits in this box instead of the browser window.</p>
          <p>contain: paint makes this box the containing block for fixed children.</p>
          <p>When you scroll, the badge moves with the content of this box.</p>
          {LOREM.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- 8. Animation ---------- */

export function AnimationDemo() {
  const [shown, setShown] = useState(true)
  return (
    <div className={styles.stage}>
      <div className={styles.row}>
        <button type="button" className={`${styles.trigger} ${styles.triggerPrimary}`} onClick={() => setShown((s) => !s)}>
          {shown ? "Hide card" : "Show card"}
        </button>
        <span className={styles.meta}>Animation turns off when your system has reduced motion enabled.</span>
      </div>
      <div className={styles.animStage}>
        <article className={`${styles.surface} ${styles.animCard}`} data-state={shown ? "shown" : "hidden"} aria-hidden={!shown}>
          <p className={styles.title}>Slide, fade, and scale</p>
          <p className={styles.meta}>
            Only transform and opacity change, and the card is contained, so the animation stays cheap.
          </p>
        </article>
      </div>
    </div>
  )
}

/* ---------- 9. Filter ---------- */

const ADJECTIVES = ["Amber", "Brisk", "Calm", "Daring", "Eager", "Fuzzy", "Gentle", "Hidden", "Ivory", "Jolly"]
const NOUNS = [
  "Anchor", "Button", "Canvas", "Dialog", "Editor", "Footer", "Gallery", "Header", "Icon", "Journal",
  "Kanban", "Label", "Menu", "Navbar", "Overlay", "Panel", "Quote", "Ribbon", "Slider", "Toggle",
]
const FILTER_ITEMS = ADJECTIVES.flatMap((a) => NOUNS.map((n) => `${a} ${n}`))

export function FilterDemo() {
  const [query, setQuery] = useState("")
  const inputId = useId()
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? FILTER_ITEMS.filter((item) => item.toLowerCase().includes(q)) : FILTER_ITEMS
  }, [query])

  return (
    <div className={styles.stage}>
      <label htmlFor={inputId} className="sr-only">
        Filter items
      </label>
      <input
        id={inputId}
        type="search"
        className={styles.search}
        placeholder="Filter 200 items, e.g. menu"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p className={styles.meta} aria-live="polite">
        Showing <span className={styles.stat}>{filtered.length}</span> of {FILTER_ITEMS.length}
      </p>
      <ul className={`${styles.surface} ${styles.filterList}`}>
        {filtered.map((item) => (
          <li key={item}>{item}</li>
        ))}
        {filtered.length === 0 && <li>No matches</li>}
      </ul>
    </div>
  )
}

/* ---------- 10. Data table ---------- */

const TEAMS = ["Design", "Platform", "Growth", "Support", "Research"]
const TABLE_ROWS = Array.from({ length: 500 }, (_, i) => ({
  id: i + 1,
  name: `${ADJECTIVES[i % ADJECTIVES.length]} ${NOUNS[(i * 7) % NOUNS.length]}`,
  team: TEAMS[(i * 3) % TEAMS.length],
  score: (i * 37 + 11) % 100,
}))

type SortKey = "id" | "name" | "team" | "score"

export function DataTableDemo() {
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({ key: "id", dir: "asc" })
  const sorted = useMemo(() => {
    const factor = sort.dir === "asc" ? 1 : -1
    return [...TABLE_ROWS].sort((a, b) => {
      const av = a[sort.key]
      const bv = b[sort.key]
      return (typeof av === "number" ? av - (bv as number) : String(av).localeCompare(String(bv))) * factor
    })
  }, [sort])

  const columns: { key: SortKey; label: string }[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "team", label: "Team" },
    { key: "score", label: "Score" },
  ]

  return (
    <div className={`${styles.surface} ${styles.tableWrap}`} tabIndex={0} role="region" aria-label="Sortable table with 500 rows">
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => {
              const isActive = sort.key === col.key
              return (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={isActive ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}
                >
                  <button
                    type="button"
                    className={styles.sortButton}
                    onClick={() =>
                      setSort((s) => ({
                        key: col.key,
                        dir: s.key === col.key && s.dir === "asc" ? "desc" : "asc",
                      }))
                    }
                  >
                    {col.label}
                    {isActive &&
                      (sort.dir === "asc" ? (
                        <ArrowUp className="size-3.5" aria-hidden="true" />
                      ) : (
                        <ArrowDown className="size-3.5" aria-hidden="true" />
                      ))}
                  </button>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {sorted.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.team}</td>
              <td>{row.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ---------- 11. Fixed-size strict ---------- */

const CHART = [
  { label: "Mon", value: 62 },
  { label: "Tue", value: 84 },
  { label: "Wed", value: 45 },
  { label: "Thu", value: 91 },
  { label: "Fri", value: 70 },
  { label: "Sat", value: 33 },
]

export function StrictBoxDemo() {
  const [sized, setSized] = useState(true)
  const [boxRef, size] = useElementSize<HTMLDivElement>()
  const checkboxId = useId()

  return (
    <div className={styles.stage}>
      <div className={styles.row}>
        <input id={checkboxId} type="checkbox" checked={!sized} onChange={(e) => setSized(!e.target.checked)} />
        <label htmlFor={checkboxId} className="text-sm">
          Remove the explicit width and height
        </label>
        <span className={styles.tag}>
          Measured: {size.width} x {size.height}
        </span>
      </div>
      <div className={styles.strictRow}>
        <div ref={boxRef} className={`${styles.surface} ${styles.strictBox}`} data-sized={sized}>
          <ul className={styles.chart} aria-label="Weekly activity">
            {CHART.map((d) => (
              <li key={d.label}>
                <span>{d.label}</span>
                <span className={styles.chartBar} style={{ width: `${d.value}%` }} />
                <span className={styles.stat}>{d.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ---------- 12. Tabs ---------- */

const TAB_NAMES = ["Overview", "Activity", "Settings"]

function TabCounter({ name }: { name: string }) {
  const [count, setCount] = useState(0)
  return (
    <>
      <p className={styles.title}>{name} panel</p>
      <p className={styles.meta}>
        Count: <span className={styles.stat}>{count}</span>. Switch tabs and come back: the value stays.
      </p>
      <div>
        <button type="button" className={styles.trigger} onClick={() => setCount((c) => c + 1)}>
          Add one
        </button>
      </div>
    </>
  )
}

export function TabsDemo() {
  const [active, setActive] = useState(0)
  const baseId = useId()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const focusTab = (index: number) => {
    const next = (index + TAB_NAMES.length) % TAB_NAMES.length
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <div className={styles.stage}>
      <div role="tablist" aria-label="Demo tabs" className={styles.tabList}>
        {TAB_NAMES.map((name, i) => (
          <button
            key={name}
            ref={(el) => {
              tabRefs.current[i] = el
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${baseId}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") focusTab(i + 1)
              if (e.key === "ArrowLeft") focusTab(i - 1)
              if (e.key === "Home") focusTab(0)
              if (e.key === "End") focusTab(TAB_NAMES.length - 1)
            }}
          >
            {name}
          </button>
        ))}
      </div>
      {TAB_NAMES.map((name, i) => (
        <div
          key={name}
          role="tabpanel"
          id={`${baseId}-panel-${i}`}
          aria-labelledby={`${baseId}-tab-${i}`}
          hidden={active !== i}
          tabIndex={0}
          className={`${styles.surface} ${styles.tabPanel}`}
        >
          <TabCounter name={name} />
        </div>
      ))}
    </div>
  )
}

/* ---------- 13. Dialog ---------- */

export function DialogDemo() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.trigger} ${styles.triggerPrimary}`}
        onClick={() => dialogRef.current?.showModal()}
      >
        Open dialog
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className={styles.dialog}
        onClose={() => triggerRef.current?.focus()}
      >
        <div className={styles.dialogBody}>
          <h3 id={titleId} className={styles.title}>
            A contained native dialog
          </h3>
          <p className={styles.meta}>
            Press Escape or use the button to close. Focus goes back to the button that opened
            this dialog.
          </p>
          <div>
            <button type="button" className={styles.trigger} onClick={() => dialogRef.current?.close()}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}
