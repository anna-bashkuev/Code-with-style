"use client"

import { useMemo, useState } from "react"
import { ComponentPreview } from "@/components/component-preview"

const CARDS = [
  { title: "Subgrid", tag: "Baseline 2023", body: "Align children to parent grid tracks." },
  { title: "Container Queries", tag: "Baseline", body: "Component-level responsiveness." },
  { title: "Gap Rules", tag: "Arriving 2026", body: "Styled lines inside flex/grid gaps." },
  { title: "Anchor Positioning", tag: "Chrome / Edge", body: "Position elements relative to each other." },
  { title: "calc-size()", tag: "Chrome 129+", body: "Animate height: auto natively." },
  { title: "Masonry Layout", tag: "Behind Flag", body: "Native Pinterest-style grid." },
  { title: "@starting-style", tag: "Baseline", body: "Entry animations without JavaScript." },
  { title: "View Transitions", tag: "Chrome / Edge", body: "Animated page and state transitions." },
  { title: "CSS Nesting", tag: "Baseline", body: "Native nested selectors, no preprocessor." },
  { title: "color-mix()", tag: "Baseline", body: "Mix two colors in any color space." },
  { title: "Scroll-driven Animations", tag: "Chrome 115+", body: "Animate based on scroll position." },
  { title: "CSS Layers", tag: "Baseline", body: "Manage cascade priority explicitly." },
]

export function MasonryLayoutDemo() {
  const [approach, setApproach] = useState<"masonry" | "grid" | "columns">("masonry")
  const [cols, setCols] = useState(3)
  const [gap, setGap] = useState(16)

  const containerStyle = useMemo<React.CSSProperties>(() => {
    if (approach === "masonry") {
      return {
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: `${gap}px`,
        // @ts-ignore — masonry is behind a flag / spec proposal
        gridTemplateRows: "masonry",
        alignTracks: "start",
      }
    }
    if (approach === "grid") {
      return {
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: `${gap}px`,
        alignItems: "start",
      }
    }
    // columns fallback
    return {
      columnCount: cols,
      columnGap: `${gap}px`,
    }
  }, [approach, cols, gap])

  const cardStyle = useMemo<React.CSSProperties>(
    () =>
      approach === "columns"
        ? { breakInside: "avoid", marginBottom: `${gap}px`, display: "block" }
        : {},
    [approach, gap]
  )

  // vary card heights to show masonry effect
  const heights = [null, "5rem", null, "4rem", "6rem", null, "3.5rem", null, "5.5rem", null, "4.5rem", null]

  return (
    <div className="mt-10 flex flex-col gap-12">
      <ComponentPreview
        title="Masonry Layout"
        description="Native Pinterest-style grid in CSS — no JavaScript height calculations."
        className="justify-center"
        code={`display: grid;\ngrid-template-rows: masonry;`}
      >
        <div className="section-label">
          <h2>01 — Native Masonry vs Alternatives</h2>
          <span className="badge badge-red">Behind Flag</span>
        </div>

        <div className="demo-wrap">
          <div className="controls">
            <label htmlFor="ms-approach">approach:</label>
            <select
              id="ms-approach"
              value={approach}
              onChange={(e) => setApproach(e.target.value as typeof approach)}
            >
              <option value="masonry">CSS Masonry (grid-template-rows: masonry) ✨</option>
              <option value="grid">CSS Grid (regular — leaves gaps)</option>
              <option value="columns">CSS Columns (old workaround)</option>
            </select>

            <label htmlFor="ms-cols">columns:</label>
            <select
              id="ms-cols"
              value={cols}
              onChange={(e) => setCols(Number(e.target.value))}
            >
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>

            <label htmlFor="ms-gap">gap:</label>
            <input
              id="ms-gap"
              type="range"
              min="8"
              max="32"
              value={gap}
              onChange={(e) => setGap(Number(e.target.value))}
            />
            <span className="val">{gap}px</span>
          </div>

          <div className="preview" style={{ overflowY: "auto", maxHeight: 480 }}>
            <div style={containerStyle}>
              {CARDS.map((card, i) => (
                <div
                  key={card.title}
                  className="card"
                  style={{
                    ...cardStyle,
                    ...(heights[i] ? { paddingBottom: heights[i] } : {}),
                  }}
                >
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                  <span className="tag">{card.tag}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="code-panel">
            <pre>
              <code>
                {approach === "masonry"
                  ? `.grid {
  display: grid;
  grid-template-columns: repeat(${cols}, 1fr);
  gap: ${gap}px;

  /* ✨ Native masonry — behind flag */
  /* Enable: chrome://flags → Experimental Web Platform Features */
  grid-template-rows: masonry;
  align-tracks: start;
}`
                  : approach === "grid"
                  ? `.grid {
  display: grid;
  grid-template-columns: repeat(${cols}, 1fr);
  gap: ${gap}px;
  align-items: start;

  /* ⚠️ Items stay in their grid row.
     Gaps appear where short items leave space.
     No true masonry without JS. */
}`
                  : `.grid {
  column-count: ${cols};
  column-gap: ${gap}px;
}
.card {
  break-inside: avoid;
  margin-bottom: ${gap}px;
  /* ⚠️ Reading order is top-to-bottom per column,
     not left-to-right per row — bad for accessibility */
}`}
              </code>
            </pre>
          </div>
        </div>

        <div className="note">
          <span className="icon">⚠️</span>
          <span>
            Native CSS Masonry is still behind a flag in Chrome. There are{" "}
            <strong>two competing proposals</strong>: Google's{" "}
            <code>grid-template-rows: masonry</code> (inside CSS Grid) and
            Apple's <code>display: masonry</code> (separate layout mode). The
            CSS Working Group is still deciding. Enable in Chrome via{" "}
            <strong>chrome://flags → Experimental Web Platform Features</strong>.
          </span>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Masonry — the two proposals"
        description="Understanding the debate: grid-template-rows vs display: masonry."
        className="justify-center"
        code={`/* Proposal A (Google) */\ngrid-template-rows: masonry;\n\n/* Proposal B (Apple) */\ndisplay: masonry;`}
      >
        <div className="section-label">
          <h2>02 — The Two Proposals Compared</h2>
          <span className="badge badge-red">Behind Flag</span>
        </div>

        <div className="demo-wrap">
          <div className="preview" style={{ overflowX: "auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              <div className="card" style={{ borderColor: "#3b82f6" }}>
                <h3 style={{ color: "#3b82f6" }}>Proposal A — Google</h3>
                <p>
                  Masonry as an extension of CSS Grid. Uses{" "}
                  <code>grid-template-rows: masonry</code> inside an existing
                  grid container. Inherits all grid features: named areas,
                  subgrid, alignment properties.
                </p>
                <span className="tag">grid-template-rows: masonry</span>
              </div>
              <div className="card" style={{ borderColor: "#f59e0b" }}>
                <h3 style={{ color: "#f59e0b" }}>Proposal B — Apple</h3>
                <p>
                  Masonry as its own layout mode. Uses{" "}
                  <code>display: masonry</code> — a clean, separate model not
                  tied to grid. Simpler mental model, but loses grid integration.
                </p>
                <span className="tag">display: masonry</span>
              </div>
              <div className="card">
                <h3>What they agree on</h3>
                <p>
                  Both proposals pack items into the axis with the most
                  available space, eliminating the gaps that appear in regular
                  grid layouts with variable-height items. Both are pure CSS —
                  no JavaScript required.
                </p>
              </div>
              <div className="card">
                <h3>Current status</h3>
                <p>
                  The CSS Working Group voted in 2024 to explore both proposals
                  further. Chrome ships Proposal A behind a flag. Safari
                  Technology Preview has experimented with Proposal B. No
                  timeline for stable release yet.
                </p>
              </div>
            </div>
          </div>

          <div className="code-panel">
            <pre>
              <code>{`/* Proposal A — Google (in Chrome flag) */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: masonry; /* ← masonry axis */
  gap: 1rem;
}

/* Proposal B — Apple (experimental) */
.grid {
  display: masonry;
  masonry-template-tracks: repeat(3, 1fr);
  gap: 1rem;
}

/* Today's best fallback (no JS) */
.grid {
  columns: 3;
  column-gap: 1rem;
}
.card { break-inside: avoid; }`}</code>
            </pre>
          </div>
        </div>

        <div className="note">
          <span className="icon">💡</span>
          <span>
            For production today, the <strong>CSS columns</strong> approach is
            the most compatible fallback — but it has a reading-order problem
            (top-to-bottom per column). JavaScript libraries like Masonry.js or
            CSS Grid with JS height measurement remain the most robust solution
            until the spec settles.
          </span>
        </div>
      </ComponentPreview>
    </div>
  )
}
