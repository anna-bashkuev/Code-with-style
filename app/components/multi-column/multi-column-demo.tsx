"use client"

import { useMemo, useState } from "react"
import { ComponentPreview } from "@/components/component-preview"

export function MultiColumnCardsDemo() {
  const [ex1Wrap, setEx1Wrap] = useState("wrap")
  const [ex1Height, setEx1Height] = useState(180)
  const [ex1Cols, setEx1Cols] = useState(3)
  const [ex2Wrap, setEx2Wrap] = useState("wrap")
  const [ex2Height, setEx2Height] = useState(180)

  const ex1ContentStyle = useMemo(
    () => ({
      columnCount: ex1Cols,
      columnGap: "1.25rem",
      columnRule: "1px solid #252525",
      columnWrap: ex1Wrap as "wrap" | "nowrap",
      columnHeight: `${ex1Height}px`,
    }),
    [ex1Cols, ex1Height, ex1Wrap]
  )

  const ex1PreviewStyle = useMemo<React.CSSProperties>(
    () => ({
      overflowX: ex1Wrap === "wrap" ? "hidden" : "auto",
      overflowY: ex1Wrap === "wrap" ? "auto" : "hidden",
    }),
    [ex1Wrap]
  )

  const ex2ContentStyle = useMemo(
    () => ({
      columnCount: 3,
      columnGap: "1rem",
      columnWrap: ex2Wrap as "wrap" | "nowrap",
      columnHeight: `${ex2Height}px`,
    }),
    [ex2Height, ex2Wrap]
  )

  const ex2PreviewStyle = useMemo<React.CSSProperties>(
    () => ({
      overflowX: ex2Wrap === "wrap" ? "hidden" : "auto",
      overflowY: ex2Wrap === "wrap" ? "auto" : "hidden",
    }),
    [ex2Wrap]
  )

  return (
    <div className="mt-10 flex flex-col gap-12">
      <ComponentPreview
        title="Column-wrapped cards"
        description="New multi-column layout with wrap behavior."
        className="justify-center"
        code={`<div className="multi-column">`}
      >
        <div className="section-label">
          <h2>01 — Article Layout (Long-form Text)</h2>
          <span className="badge badge-blue">Chrome 145+</span>
        </div>

        <div className="demo-wrap">
          <div className="controls">
            <label htmlFor="ex1-wrap">column-wrap:</label>
            <select
              id="ex1-wrap"
              value={ex1Wrap}
              onChange={(event) => setEx1Wrap(event.target.value)}
            >
              <option value="nowrap">nowrap — horizontal overflow (old)</option>
              <option value="wrap">wrap — vertical rows (new ✨)</option>
            </select>
            <label htmlFor="ex1-height">column-height:</label>
            <input
              id="ex1-height"
              type="range"
              min="120"
              max="300"
              value={ex1Height}
              onChange={(event) => setEx1Height(Number(event.target.value))}
            />
            <span className="val">{ex1Height}px</span>
            <label htmlFor="ex1-cols">columns:</label>
            <select
              id="ex1-cols"
              value={ex1Cols}
              onChange={(event) => setEx1Cols(Number(event.target.value))}
            >
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>

          <div className="preview" style={ex1PreviewStyle}>
            <div style={ex1ContentStyle}>
              <p>
                CSS Multi-column layout has been part of the spec for years, but
                it was rarely used in production because of one critical flaw:
                when content overflowed a fixed-height container, it spilled
                horizontally instead of wrapping down.
              </p>
              <p>
                This created a jarring horizontal scrollbar — the exact opposite
                of what users expect on the modern web, where vertical scroll is
                the default. Developers worked around it with JavaScript height
                calculations, CSS grid hacks, or simply avoided multi-column
                entirely.
              </p>
              <p>
                Chrome 145 changes this with two new properties from the
                Multi-Column Layout Level 2 spec: <strong>column-wrap</strong>{" "}
                and <strong>column-height</strong>. Together, they transform
                multi-column into a true 2D flow system.
              </p>
              <p>
                The column-height property sets an explicit height for each row
                of columns. When content exceeds that height, column-wrap: wrap
                instructs the browser to begin a new row of columns below —
                exactly like how flex-wrap works for flex items, but for
                continuous text streams.
              </p>
              <p>
                This makes multi-column genuinely useful for newspaper-style
                reading layouts, long-form editorial content, and any design
                where you want to preserve the natural flow of text across a 2D
                grid without reaching for JavaScript.
              </p>
            </div>
          </div>

          <div className="code-panel">
            <pre>
              <code>
                {`.article {
 column-count: ${ex1Cols};
 column-gap: 1.25rem;
 column-rule: 1px solid #252525;
 column-height: ${ex1Height}px;  /* ← new in Chrome 145 */
 column-wrap: ${ex1Wrap};     /* ← new in Chrome 145 */
}`}
              </code>
            </pre>
          </div>
        </div>

        <div className="note">
          <span className="icon">⚠️</span>
          <span>
            Works best with <strong>predictable content heights</strong>.
            Dynamic or user-generated content may produce unbalanced columns — a
            known limitation.
          </span>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Column-wrapped cards"
        description="Column breaks to cards."
        className="justify-center"
        code={`<div className="multi-column">`}
      >
        <section>
          <div className="section-label">
            <h2>02 — Card Grid Layout</h2>
            <span className="badge badge-blue">Chrome 145+</span>
          </div>

          <div className="demo-wrap">
            <div className="controls">
              <label htmlFor="ex2-wrap">column-wrap:</label>
              <select
                id="ex2-wrap"
                value={ex2Wrap}
                onChange={(event) => setEx2Wrap(event.target.value)}
              >
                <option value="nowrap">nowrap — horizontal overflow</option>
                <option value="wrap">wrap — vertical rows ✨</option>
              </select>
              <label htmlFor="ex2-height">column-height:</label>
              <input
                id="ex2-height"
                type="range"
                min="200"
                max="500"
                value={ex2Height}
                onChange={(event) => setEx2Height(Number(event.target.value))}
              />
              <span className="val" id="ex2-height-val">
                {ex2Height}px
              </span>
            </div>

            <div className="preview" id="ex2-preview" style={ex2PreviewStyle}>
              <div id="ex2-content" style={ex2ContentStyle}>
                <div className="card">
                  <h3>Subgrid</h3>
                  <p>
                    Children of grid items align to the parent grid's tracks.
                    Solves card alignment without JavaScript.
                  </p>
                  <span className="tag">Baseline 2023</span>
                </div>
                <div className="card">
                  <h3>Container Queries</h3>
                  <p>
                    Style elements based on their container size, not the
                    viewport. Component-level responsiveness.
                  </p>
                  <span className="tag">Baseline</span>
                </div>
                <div className="card">
                  <h3>CSS Gap Rules</h3>
                  <p>
                    Draw styled, animatable lines inside grid and flex gaps.
                    Replaces border hacks.
                  </p>
                  <span className="tag">Arriving 2026</span>
                </div>
                <div className="card">
                  <h3>Anchor Positioning</h3>
                  <p>
                    Position elements relative to each other in pure CSS.
                    Replaces Popper.js and Floating UI.
                  </p>
                  <span className="tag">Chrome / Edge</span>
                </div>
                <div className="card">
                  <h3>calc-size()</h3>
                  <p>
                    Animate height from 0 to auto natively. No JavaScript height
                    measurement needed.
                  </p>
                  <span className="tag">Chrome 129+</span>
                </div>
                <div className="card">
                  <h3>Masonry Layout</h3>
                  <p>
                    Native Pinterest-style grid inside CSS Grid. Two proposals
                    being debated by browser vendors.
                  </p>
                </div>
                <div className="card">
                  <h3>@starting-style</h3>
                  <p>
                    Define entry animation initial state. Animate elements on
                    first render without JavaScript.
                  </p>
                  <span className="tag">Baseline</span>
                </div>
                <div className="card">
                  <h3>View Transitions</h3>
                  <p>
                    Smooth animated transitions between pages or component
                    states. Works with MPA and SPA.
                  </p>
                  <span className="tag">Chrome / Edge</span>
                </div>
                <div className="card">
                  <h3>CSS Nesting</h3>
                  <p>
                    Write nested selectors natively without Sass or Less. Full
                    browser support since 2024.
                  </p>
                  <span className="tag">Baseline</span>
                </div>
              </div>
            </div>

            <div className="code-panel">
              <pre id="ex2-code">{`.card-grid {
  column-count: 3;
  column-gap: 1rem;
  column-height: ${ex2Height}px;
  column-wrap: ${ex2Wrap};
}

.card {
  break-inside: avoid; /* keep cards in one column */
  margin-bottom: 1rem;
}`}</pre>
            </div>
          </div>
        </section>
      </ComponentPreview>
    </div>
  );
}
