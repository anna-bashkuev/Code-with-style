"use client"

import { useMemo, useState } from "react"
import { ComponentPreview } from "@/components/component-preview"

export function SubgridDemo() {
  const [useSubgrid, setUseSubgrid] = useState(true)
  const [cols, setCols] = useState(3)

  const gridStyle = useMemo<React.CSSProperties>(
    () => ({
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: "1.25rem",
    }),
    [cols]
  )

  const cardStyle = useMemo<React.CSSProperties>(
    () =>
      useSubgrid
        ? {
            display: "grid",
            gridRow: "span 3",
            gridTemplateRows: "subgrid",
          }
        : {
            display: "flex",
            flexDirection: "column",
          },
    [useSubgrid]
  )

  return (
    <div className="mt-10 flex flex-col gap-12">
      <ComponentPreview
        title="Subgrid"
        description="Align card internals to the parent grid tracks — no JavaScript, no fixed heights."
        className="justify-center"
        code={`<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>`}
      >
        <div className="section-label">
          <h2>01 — Card Alignment with Subgrid</h2>
          <span className="badge badge-green">Baseline 2023</span>
        </div>

        <div className="demo-wrap">
          <div className="controls">
            <label htmlFor="sg-mode">grid-template-rows on card:</label>
            <select
              id="sg-mode"
              value={useSubgrid ? "subgrid" : "flex"}
              onChange={(e) => setUseSubgrid(e.target.value === "subgrid")}
            >
              <option value="flex">flex-direction: column (old)</option>
              <option value="subgrid">subgrid ✨ (new)</option>
            </select>

            <label htmlFor="sg-cols">columns:</label>
            <select
              id="sg-cols"
              value={cols}
              onChange={(e) => setCols(Number(e.target.value))}
            >
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>

          <div className="preview" style={{ overflowX: "auto" }}>
            <div style={gridStyle}>
              {[
                {
                  title: "Subgrid",
                  body: "Children of grid items align to the parent grid's tracks. Solves card alignment without JavaScript or fixed heights.",
                  tag: "Baseline 2023",
                },
                {
                  title: "Container Queries",
                  body: "Style elements based on their container size, not the viewport. True component-level responsiveness.",
                  tag: "Baseline",
                },
                {
                  title: "CSS Gap Rules",
                  body: "Draw styled, animatable lines inside grid and flex gaps. Replaces border hacks and pseudo-element tricks.",
                  tag: "Arriving 2026",
                },
                {
                  title: "Anchor Positioning",
                  body: "Position elements relative to each other in pure CSS. No more Popper.js.",
                  tag: "Chrome / Edge",
                },
                {
                  title: "calc-size()",
                  body: "Animate height from 0 to auto natively.",
                  tag: "Chrome 129+",
                },
                {
                  title: "Masonry Layout",
                  body: "Native Pinterest-style grid inside CSS Grid. Two proposals are being debated by browser vendors right now.",
                  tag: "Behind Flag",
                },
              ].map((card) => (
                <div key={card.title} className="card" style={cardStyle}>
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
                {`.card-grid {
  display: grid;
  grid-template-columns: repeat(${cols}, 1fr);
  gap: 1.25rem;
}

.card {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid; ${useSubgrid ? " /* ← rows inherit from parent */" : " /* ← not used */"}
}
/* Result: title, body, tag align
   across ALL cards automatically */`}
              </code>
            </pre>
          </div>
        </div>

        <div className="note">
          <span className="icon">⚠️</span>
          <span>
            Subgrid requires the card to use{" "}
            <strong>grid-row: span N</strong> matching the number of internal
            rows. Works in all modern browsers since mid-2023 — safe for
            production.
          </span>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Subgrid — nested alignment"
        description="Two-dimensional subgrid: inheriting both row and column tracks."
        className="justify-center"
        code={`grid-template-rows: subgrid;\ngrid-template-columns: subgrid;`}
      >
        <div className="section-label">
          <h2>02 — 2D Subgrid (rows + columns)</h2>
          <span className="badge badge-green">Baseline 2023</span>
        </div>

        <div className="demo-wrap">
          <div className="preview" style={{ overflowX: "auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gridTemplateRows: "auto auto",
                gap: "1rem",
              }}
            >
              {["Header A", "Header B", "Header C", "Header D"].map((h) => (
                <div key={h} className="card" style={{ background: "#1a1a2e" }}>
                  <strong>{h}</strong>
                </div>
              ))}
              {["Body with more text here", "Short", "Medium length body text", "Another longer body"].map(
                (b, i) => (
                  <div key={i} className="card">
                    <p style={{ margin: 0 }}>{b}</p>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="code-panel">
            <pre>
              <code>
                {`.outer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto auto;
  gap: 1rem;
}

.inner-item {
  display: grid;
  grid-column: span 2;
  grid-row: span 2;
  /* inherit BOTH axes */
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
}`}
              </code>
            </pre>
          </div>
        </div>

        <div className="note">
          <span className="icon">💡</span>
          <span>
            Combining <strong>grid-template-rows: subgrid</strong> and{" "}
            <strong>grid-template-columns: subgrid</strong> lets deeply nested
            items participate in the outer grid's full 2D track system.
          </span>
        </div>
      </ComponentPreview>
    </div>
  )
}
