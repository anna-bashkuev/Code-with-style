"use client";

import { useMemo, useState } from "react";
import { ComponentPreview } from "@/components/component-preview";
import { CssGapRuleVisibilityDemo } from "@/components/css-gap/css-gap-rule-visibility-demo";
import { CssGapDecorationsShelfDemo } from "@/components/css-gap/css-gap-decorations-shelf-demo";
import {
  CssGapHeadingDemo,
  CssGapHeadingSideLinesDemo,
} from "@/components/css-gap/css-gap-heading-demo";
import { PageNav } from "@/components/page-nav";

export function CssGapRulesDemo() {
  // Example 01 controls
  const [layout, setLayout] = useState<"grid" | "flex">("grid");
  const [cols, setCols] = useState(3);
  const [ruleStyle, setRuleStyle] = useState("solid");
  const [ruleWidth, setRuleWidth] = useState(1);
  const [ruleColor, setRuleColor] = useState("#3b82f6");
  const [showRowRule, setShowRowRule] = useState(true);
  const [showColRule, setShowColRule] = useState(true);
  

   const PALETTE = [
     "#3b82f6",
     "#10b981",
     "#f59e0b",
     "#ef4444",
     "#a855f7",
     "#e2e8f0",
   ];
   const STYLES = ["solid", "dashed", "dotted", "double"];

  // Example 03 controls — rule-break + rule-outset
  const [ruleBreak, setRuleBreak] = useState<"none" | "intersection">(
    "intersection",
  );
  const [colOutset, setColOutset] = useState(-12);
  const [rowOutset, setRowOutset] = useState(0);
  const [ex3ColColor, setEx3ColColor] = useState("#f59e0b");
  const [ex3RowColor, setEx3RowColor] = useState("#f59e0b");

  const colors = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#a855f7",
    "#e2e8f0",
  ];

  const ex1Style = useMemo(() => {
    const base: Record<string, string> = {
      display: layout,
      gap: "1rem",
    };
    if (layout === "grid") {
      base.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    } else {
      base.flexWrap = "wrap";
    }
    if (showColRule) {
      base.columnRuleStyle = ruleStyle;
      base.columnRuleWidth = `${ruleWidth}px`;
      base.columnRuleColor = ruleColor;
    }
    if (showRowRule && layout === "grid") {
      base.rowRuleStyle = ruleStyle;
      base.rowRuleWidth = `${ruleWidth}px`;
      base.rowRuleColor = ruleColor;
    }
    return base;
  }, [layout, cols, ruleStyle, ruleWidth, ruleColor, showRowRule, showColRule]);

  const ex1Code = useMemo(() => {
    const lines = [
      `.container {`,
      `  display: ${layout};`,
      layout === "grid"
        ? `  grid-template-columns: repeat(${cols}, 1fr);`
        : `  flex-wrap: wrap;`,
      `  gap: 1rem;`,
    ];
    if (showColRule) {
      lines.push(`  column-rule: ${ruleWidth}px ${ruleStyle} ${ruleColor};`);
    }
    if (showRowRule && layout === "grid") {
      lines.push(`  row-rule: ${ruleWidth}px ${ruleStyle} ${ruleColor};`);
    }
    lines.push(`}`);
    return lines.join("\n");
  }, [layout, cols, ruleStyle, ruleWidth, ruleColor, showRowRule, showColRule]);

  return (
    <div className="mt-10 flex flex-col gap-12">
      {/* ── Example 01: column-rule + row-rule basics ── */}
      <ComponentPreview
        title="CSS Gap Decorations"
        description="column-rule and row-rule now work in grid and flex — no border hacks needed."
        className="justify-center"
        code={ex1Code}
      >
        <div className="section-label">
          <h2>01 — column-rule &amp; row-rule in Grid and Flex</h2>
          <span className="badge badge-yellow">Chrome / Edge 149+</span>
        </div>

        <div className="demo-wrap">
          <div className="controls">
            <label htmlFor="gd-layout">layout:</label>
            <select
              id="gd-layout"
              value={layout}
              onChange={(e) => setLayout(e.target.value as "grid" | "flex")}
            >
              <option value="grid">display: grid</option>
              <option value="flex">display: flex</option>
            </select>

            {layout === "grid" && (
              <>
                <label htmlFor="gd-cols">columns:</label>
                <select
                  id="gd-cols"
                  value={cols}
                  onChange={(e) => setCols(Number(e.target.value))}
                >
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </>
            )}

            <label htmlFor="gd-style">rule-style:</label>
            <select
              id="gd-style"
              value={ruleStyle}
              onChange={(e) => setRuleStyle(e.target.value)}
            >
              <option value="solid">solid</option>
              <option value="dashed">dashed</option>
              <option value="dotted">dotted</option>
              <option value="double">double</option>
            </select>

            <label htmlFor="gd-width">rule-width:</label>
            <input
              id="gd-width"
              type="range"
              min="1"
              max="6"
              value={ruleWidth}
              onChange={(e) => setRuleWidth(Number(e.target.value))}
            />
            <span className="val">{ruleWidth}px</span>

            <label>rule-color:</label>
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setRuleColor(c)}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: c,
                    border:
                      ruleColor === c
                        ? "2px solid white"
                        : "2px solid transparent",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                  aria-label={c}
                />
              ))}
            </div>

            <label>show:</label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                cursor: "pointer",
                fontWeight: "normal",
              }}
            >
              <input
                type="checkbox"
                checked={showColRule}
                onChange={(e) => setShowColRule(e.target.checked)}
              />
              column-rule
            </label>
            {layout === "grid" && (
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  cursor: "pointer",
                  fontWeight: "normal",
                }}
              >
                <input
                  type="checkbox"
                  checked={showRowRule}
                  onChange={(e) => setShowRowRule(e.target.checked)}
                />
                row-rule
              </label>
            )}
          </div>

          <div className="preview" style={{ overflowX: "auto" }}>
            {/* @ts-ignore — row-rule / column-rule not yet in React CSSProperties */}
            <div style={ex1Style as React.CSSProperties}>
              {[
                "Subgrid",
                "Container Queries",
                "Gap Decorations",
                "Anchor Positioning",
                "calc-size()",
                "Masonry Layout",
              ].map((name) => (
                <div key={name} className="card" style={{ minWidth: 120 }}>
                  <h3>{name}</h3>
                  <p>Modern CSS layout feature.</p>
                  <span className="tag">CSS 2025+</span>
                </div>
              ))}
            </div>
          </div>

          <div className="code-panel">
            <pre>
              <code>{ex1Code}</code>
            </pre>
          </div>
        </div>

        <div className="note">
          <span className="icon">⚠️</span>
          <span>
            Requires <strong>chrome 149+ / edge 149+</strong>. The decorations
            are purely visual — they don't affect layout or spacing. Use{" "}
            <strong>@supports (row-rule-style: solid)</strong> to
            feature-detect.
          </span>
        </div>
      </ComponentPreview>
      {/* ── Example 02: repeat() — cycling rule pattern ── */}
      {(() => {
        // Each "step" in the repeat pattern is a full rule: width style color
        const [steps, setSteps] = useState([
          { width: 1, style: "dashed", color: "#a855f7" },
          { width: 5, style: "dashed", color: "#a855f7" },
        ]);
        const [repeatCount, setRepeatCount] = useState<"auto" | number>("auto");
        const [axis, setAxis] = useState<"column" | "row" | "both">("column");
        const [numCols, setNumCols] = useState(5);
        const [numRows, setNumRows] = useState(3);

        const stepsStr = steps
          .map((s) => `${s.width}px ${s.style} ${s.color}`)
          .join(", ");
        const repeatVal = `repeat(${repeatCount}, ${stepsStr})`;

        const ex2Code = `.grid {
  display: grid;
  grid-template-columns: repeat(${numCols}, 1fr);
  grid-template-rows: repeat(${numRows}, 1fr);
  gap: 1rem;
${axis === "column" || axis === "both" ? `  column-rule: ${repeatVal};\n` : ""}${axis === "row" || axis === "both" ? `  row-rule: ${repeatVal};\n` : ""}}`;

        const updateStep = (i: number, key: string, value: string | number) =>
          setSteps((prev) =>
            prev.map((s, idx) => (idx === i ? { ...s, [key]: value } : s)),
          );

        const addStep = () =>
          setSteps((prev) => [
            ...prev,
            {
              width: 1,
              style: "solid",
              color: PALETTE[prev.length % PALETTE.length],
            },
          ]);

        const removeStep = (i: number) =>
          setSteps((prev) =>
            prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev,
          );

        return (
          <ComponentPreview
            title="Gap Decorations — repeat() cycling pattern"
            description="repeat(auto, ...) cycles a pattern of rules across all gaps automatically."
            className="justify-center"
            code={ex2Code}
          >
            <div className="section-label">
              <h2>02 — repeat() with Multiple Styles &amp; Colors</h2>
              <span className="badge badge-yellow">
                Chrome / Edge 139+ (flag)
              </span>
            </div>

            <div className="demo-wrap">
              {/* Pattern builder */}
              <div style={{ marginBottom: "1rem" }}>
                <p
                  style={{
                    margin: "0 0 0.5rem",
                    fontSize: "0.75rem",
                    color: "#666",
                  }}
                >
                  Pattern steps — each step is one rule definition, cycled
                  across all gaps:
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {steps.map((step, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        flexWrap: "wrap",
                        padding: "0.5rem 0.75rem",
                        background: "#0a0a0a",
                        border: "1px solid #1e1e1e",
                        borderLeft: `3px solid ${step.color}`,
                        borderRadius: 6,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "#555",
                          minWidth: 44,
                        }}
                      >
                        step {i + 1}
                      </span>

                      <label
                        style={{
                          fontSize: "0.75rem",
                          color: "#888",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                        }}
                      >
                        width
                        <input
                          type="range"
                          min="1"
                          max="8"
                          value={step.width}
                          onChange={(e) =>
                            updateStep(i, "width", Number(e.target.value))
                          }
                          style={{ width: 64 }}
                        />
                        <span
                          style={{
                            fontSize: "0.7rem",
                            color: "#555",
                            minWidth: 24,
                          }}
                        >
                          {step.width}px
                        </span>
                      </label>

                      <label
                        style={{
                          fontSize: "0.75rem",
                          color: "#888",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                        }}
                      >
                        style
                        <select
                          value={step.style}
                          onChange={(e) =>
                            updateStep(i, "style", e.target.value)
                          }
                          style={{
                            fontSize: "0.75rem",
                            background: "#111",
                            color: "#ccc",
                            border: "1px solid #252525",
                            borderRadius: 4,
                            padding: "2px 4px",
                          }}
                        >
                          {STYLES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label
                        style={{
                          fontSize: "0.75rem",
                          color: "#888",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                        }}
                      >
                        color
                        <div style={{ display: "flex", gap: 4 }}>
                          {PALETTE.map((c) => (
                            <button
                              key={c}
                              onClick={() => updateStep(i, "color", c)}
                              style={{
                                width: 16,
                                height: 16,
                                borderRadius: "50%",
                                background: c,
                                border:
                                  step.color === c
                                    ? "2px solid white"
                                    : "2px solid transparent",
                                cursor: "pointer",
                                flexShrink: 0,
                              }}
                              aria-label={c}
                            />
                          ))}
                        </div>
                      </label>

                      <button
                        onClick={() => removeStep(i)}
                        style={{
                          marginLeft: "auto",
                          background: "none",
                          border: "none",
                          color: "#444",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                        }}
                        aria-label="Remove step"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={addStep}
                    style={{
                      alignSelf: "flex-start",
                      background: "none",
                      border: "1px dashed #333",
                      color: "#555",
                      borderRadius: 6,
                      padding: "0.35rem 0.75rem",
                      cursor: "pointer",
                      fontSize: "0.75rem",
                    }}
                  >
                    + add step
                  </button>
                </div>
              </div>

              {/* repeat() controls */}
              <div className="controls">
                <label htmlFor="rp-axis">apply to:</label>
                <select
                  id="rp-axis"
                  value={axis}
                  onChange={(e) => setAxis(e.target.value as typeof axis)}
                >
                  <option value="column">column-rule only</option>
                  <option value="row">row-rule only</option>
                  <option value="both">column-rule + row-rule</option>
                </select>

                <label htmlFor="rp-cols">columns:</label>
                <select
                  id="rp-cols"
                  value={numCols}
                  onChange={(e) => setNumCols(Number(e.target.value))}
                >
                  {[3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>

                <label htmlFor="rp-rows">rows:</label>
                <select
                  id="rp-rows"
                  value={numRows}
                  onChange={(e) => setNumRows(Number(e.target.value))}
                >
                  {[2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              {/* Resolved pattern preview strip */}
              <div
                style={{
                  margin: "0.75rem 0",
                  padding: "0.6rem 0.75rem",
                  background: "#0a0a0a",
                  border: "1px solid #1e1e1e",
                  borderRadius: 6,
                }}
              >
                <p
                  style={{
                    margin: "0 0 0.35rem",
                    fontSize: "0.7rem",
                    color: "#555",
                  }}
                >
                  resolved CSS:
                </p>
                <code
                  style={{
                    fontSize: "0.75rem",
                    color: "#a855f7",
                    wordBreak: "break-all",
                  }}
                >
                  column-rule: {repeatVal}
                </code>
              </div>

              <div className="preview" style={{ overflowX: "auto" }}>
                <div
                  style={
                    {
                      display: "grid",
                      gridTemplateColumns: `repeat(${numCols}, 1fr)`,
                      gridTemplateRows: `repeat(${numRows}, auto)`,
                      gap: "1.25rem",
                      // @ts-ignore
                      ...(axis === "column" || axis === "both"
                        ? { columnRule: repeatVal }
                        : {}),
                      ...(axis === "row" || axis === "both"
                        ? { rowRule: repeatVal }
                        : {}),
                    } as React.CSSProperties
                  }
                >
                  {Array.from({ length: numCols * numRows }, (_, i) => (
                    <div
                      key={i}
                      className="card"
                      style={{
                        margin: 0,
                        minHeight: 56,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ fontSize: "0.75rem", color: "#555" }}>
                        {i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="code-panel">
                <pre>
                  <code>{ex2Code}</code>
                </pre>
              </div>
            </div>

            <div className="note">
              <span className="icon">💡</span>
              <span>
                <code>
                  repeat(auto, 1px dashed magenta, 5px dashed magenta)
                </code>{" "}
                cycles the two-step pattern across every gap automatically — no
                need to list each gap individually. Use a fixed count like{" "}
                <code>repeat(2, ...)</code> to apply the pattern only a set
                number of times, leaving remaining gaps unstyled.
              </span>
            </div>
          </ComponentPreview>
        );
      })()}

      {/* ── Example 03: rule-break + rule-outset ── */}
      {(() => {
        const ex3Code = `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  column-rule: 1px solid ${ex3ColColor};
  row-rule: 1px solid ${ex3RowColor};
  column-rule-break: ${ruleBreak};
  column-rule-outset: ${colOutset}px;
  row-rule-outset: ${rowOutset}px;
}`;

        return (
          <ComponentPreview
            title="Gap Decorations — rule-break at Intersections"
            description="Control how rules behave at intersections and how far they extend into the gap."
            className="justify-center"
            code={ex3Code}
          >
            <div className="section-label">
              <h2>03 — rule-break at Intersections</h2>
              <span className="badge badge-yellow">
                Chrome / Edge 139+ (flag)
              </span>
            </div>

            <div className="demo-wrap">
              <div className="controls">
                <label htmlFor="ex3-break">rule-break:</label>
                <select
                  id="ex3-break"
                  value={ruleBreak}
                  onChange={(e) =>
                    setRuleBreak(e.target.value as typeof ruleBreak)
                  }
                >
                  <option value="none">
                    none — lines cross through each other
                  </option>
                  <option value="intersection">
                    intersection — lines break at each crossing
                  </option>
                </select>
              </div>

              {/* Live preview: grid with crossing column + row rules */}
              <div className="preview" style={{ overflowX: "auto" }}>
                <div
                  style={
                    {
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gridTemplateRows: "repeat(3, 64px)",
                      gap: "2rem",
                      maxWidth: 440,
                      margin: "0 auto",
                      // @ts-ignore — gap decoration props not yet in React CSSProperties
                      columnRule: "3px solid #f59e0b",
                      rowRule: "3px solid #a855f7",
                      ruleBreak: ruleBreak,
                    } as React.CSSProperties
                  }
                >
                  {Array.from({ length: 9 }, (_, i) => (
                    <div key={i} className="card" style={{ margin: 0 }} />
                  ))}
                </div>

                {/* Plain-language explainer */}
                <div
                  style={{
                    marginTop: "1.25rem",
                    padding: "0.75rem 1rem",
                    background: "#0a0a0a",
                    border: "1px solid #1e1e1e",
                    borderRadius: 6,
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.8rem",
                      color: "#aaa",
                      lineHeight: 1.6,
                    }}
                  >
                    <strong style={{ color: "#e2e8f0" }}>{ruleBreak}</strong>
                    {" — "}
                    {ruleBreak === "none" &&
                      "The orange column rules and purple row rules are painted straight through, overlapping where they cross."}
                    {ruleBreak === "intersection" &&
                      "Each rule stops short at every crossing point, leaving a small break at each intersection — a clean grid-of-crosses look."}
                  </p>
                </div>
              </div>

              {/* Side-by-side reference of both values */}
              <div style={{ marginTop: "1.5rem" }}>
                <p
                  style={{
                    margin: "0 0 0.75rem",
                    fontSize: "0.75rem",
                    color: "#666",
                  }}
                >
                  Both values compared:
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "1.5rem",
                  }}
                >
                  {(["none", "intersection"] as const).map((val) => (
                    <div key={val}>
                      <p
                        style={{
                          margin: "0 0 0.5rem",
                          fontSize: "0.7rem",
                          textAlign: "center",
                        }}
                      >
                        <code
                          style={{
                            color: ruleBreak === val ? "#f59e0b" : "#666",
                          }}
                        >
                          {val}
                        </code>
                      </p>
                      <div
                        style={
                          {
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gridTemplateRows: "repeat(2, 44px)",
                            gap: "1.25rem",
                            // @ts-ignore
                            columnRule: "3px solid #64748b",
                            rowRule: "3px solid #64748b",
                            ruleBreak: val,
                          } as React.CSSProperties
                        }
                      >
                        {Array.from({ length: 4 }, (_, i) => (
                          <div key={i} className="card" style={{ margin: 0 }} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="code-panel">
                <pre>
                  <code>{`.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 64px);
  gap: 2rem;

  column-rule: 3px solid #f59e0b;
  row-rule: 3px solid #a855f7;

  /* how rules behave where they cross */
  rule-break: ${ruleBreak};
  /* values: none | intersection */
}`}</code>
                </pre>
              </div>
            </div>

            <div className="note">
              <span className="icon">💡</span>
              <span>
                <strong>rule-break</strong> controls what happens where column
                and row rules cross.
                <code>none</code> paints them straight through;{" "}
                <code>intersection</code> breaks each line at every crossing.
                You need both <code>column-rule</code> and <code>row-rule</code>
                set for the effect to be visible.
              </span>
            </div>
          </ComponentPreview>
        );
      })()}

      {(() => {
        const [insetCap, setInsetCap] = useState(0);
        const [insetJunction, setInsetJunction] = useState(12);
        const [overlapJoin, setOverlapJoin] = useState(false);

        const ex4Code = `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 72px);
  gap: 2rem;

  column-rule: 2px solid #10b981;
  row-rule: 2px solid #10b981;

  /* trim each segment inward */
  rule-inset-cap: ${insetCap}px;       /* at container edges */
  rule-inset-junction: ${insetJunction}px;  /* at crossings */${overlapJoin ? "\n  rule-inset: overlap-join;      /* connect corners */" : ""}

  /* insets are animatable ✨ */
  transition: rule-inset-junction 0.3s ease;
}

/* collapse the junction on hover */
.grid:hover {
  rule-inset-junction: 0px;
}`;

        return (
          <ComponentPreview
            title="Gap Decorations — rule-inset"
            description="Trim rule segments inward at edges and crossings — and animate it."
            className="justify-center"
            code={ex4Code}
          >
            <div className="section-label">
              <h2>04 — rule-inset, inset-cap &amp; inset-junction</h2>
              <span className="badge badge-yellow">
                Chrome / Edge 139+ (flag)
              </span>
            </div>

            <div className="demo-wrap">
              <div className="controls">
                <label htmlFor="ex4-cap">rule-inset-cap (edges):</label>
                <input
                  id="ex4-cap"
                  type="range"
                  min="0"
                  max="24"
                  value={insetCap}
                  onChange={(e) => setInsetCap(Number(e.target.value))}
                />
                <span className="val">{insetCap}px</span>

                <label htmlFor="ex4-junction">
                  rule-inset-junction (crossings):
                </label>
                <input
                  id="ex4-junction"
                  type="range"
                  min="0"
                  max="24"
                  value={insetJunction}
                  onChange={(e) => setInsetJunction(Number(e.target.value))}
                />
                <span className="val">{insetJunction}px</span>

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    cursor: "pointer",
                    fontWeight: "normal",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={overlapJoin}
                    onChange={(e) => setOverlapJoin(e.target.checked)}
                  />
                  overlap-join
                </label>
              </div>

              <div className="preview" style={{ overflowX: "auto" }}>
                <div
                  style={
                    {
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gridTemplateRows: "repeat(3, 72px)",
                      gap: "2rem",
                      maxWidth: 440,
                      margin: "0 auto",
                      // @ts-ignore — gap decoration props not yet in React CSSProperties
                      columnRule: "2px solid #10b981",
                      rowRule: "2px solid #10b981",
                      ruleInsetCap: `${insetCap}px`,
                      ruleInsetJunction: `${insetJunction}px`,
                      ...(overlapJoin ? { ruleInset: "overlap-join" } : {}),
                      transition:
                        "rule-inset-junction 0.3s ease, rule-inset-cap 0.3s ease",
                    } as React.CSSProperties
                  }
                >
                  {Array.from({ length: 9 }, (_, i) => (
                    <div key={i} className="card" style={{ margin: 0 }} />
                  ))}
                </div>

                <p
                  style={{
                    textAlign: "center",
                    fontSize: "0.75rem",
                    color: "#555",
                    marginTop: "1rem",
                  }}
                >
                  Try <strong>cap: 0px</strong> +{" "}
                  <strong>junction: 12px</strong> — flush at the edges,
                  breathing room at every crossing.
                </p>
              </div>

              <div className="code-panel">
                <pre>
                  <code>{ex4Code}</code>
                </pre>
              </div>
            </div>

            <div className="note">
              <span className="icon">💡</span>
              <span>
                <strong>rule-inset</strong> is the shorthand for trimming all
                segments inward. <strong>rule-inset-cap</strong> controls the
                inset at container edges (no crossing there), and{" "}
                <strong>rule-inset-junction</strong> controls it at crossing
                points. Setting
                <code>cap: 0px</code> with <code>junction: 12px</code> keeps
                lines flush at the edges but opens space around each crossing.
                Since these are animatable, collapsing the junction to zero on
                hover makes a satisfying micro-interaction.
              </span>
            </div>
          </ComponentPreview>
        );
      })()}

      <CssGapRuleVisibilityDemo />
      <CssGapDecorationsShelfDemo />

      <CssGapHeadingDemo />
      <CssGapHeadingSideLinesDemo />

      <PageNav />
    </div>
  );
}
