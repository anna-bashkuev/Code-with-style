"use client";

import { useState } from "react";
import { ComponentPreview } from "@/components/component-preview";

const PALETTE = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#a855f7", "#e2e8f0"];
const STYLES = ["solid", "dashed", "dotted", "double"];

export function CssGapRulesRepeatDemo() {
  const [steps, setSteps] = useState([
    { width: 1, style: "dashed", color: "#a855f7" },
    { width: 5, style: "dashed", color: "#a855f7" },
  ]);
  const [repeatCount] = useState<"auto">("auto");
  const [axis, setAxis] = useState<"column" | "row" | "both">("column");
  const [numCols, setNumCols] = useState(5);
  const [numRows, setNumRows] = useState(3);

  const stepsStr = steps.map((s) => `${s.width}px ${s.style} ${s.color}`).join(", ");
  const repeatVal = `repeat(${repeatCount}, ${stepsStr})`;

  const code = `.grid {
  display: grid;
  grid-template-columns: repeat(${numCols}, 1fr);
  grid-template-rows: repeat(${numRows}, 1fr);
  gap: 1rem;
${axis === "column" || axis === "both" ? `  column-rule: ${repeatVal};\n` : ""}${axis === "row" || axis === "both" ? `  row-rule: ${repeatVal};\n` : ""}}`;

  const updateStep = (i: number, key: string, value: string | number) =>
    setSteps((prev) => prev.map((s, idx) => (idx === i ? { ...s, [key]: value } : s)));

  const addStep = () =>
    setSteps((prev) => [
      ...prev,
      { width: 1, style: "solid", color: PALETTE[prev.length % PALETTE.length] },
    ]);

  const removeStep = (i: number) =>
    setSteps((prev) => (prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev));

  return (
    <ComponentPreview
      title="Gap Decorations — repeat() cycling pattern"
      description="repeat(auto, ...) cycles a pattern of rules across all gaps automatically."
      className="justify-center"
      code={code}
    >
      <div className="section-label">
        <h2>02 — repeat() with Multiple Styles &amp; Colors</h2>
        <span className="badge badge-yellow">Chrome / Edge 139+ (flag)</span>
      </div>

      <div className="demo-wrap">
        {/* Pattern builder */}
        <div style={{ marginBottom: "1rem" }}>
          <p style={{ margin: "0 0 0.5rem", fontSize: "0.75rem", color: "#666" }}>
            Pattern steps — each step is one rule definition, cycled across all gaps:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
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
                <span style={{ fontSize: "0.7rem", color: "#555", minWidth: 44 }}>
                  step {i + 1}
                </span>

                <label style={{ fontSize: "0.75rem", color: "#888", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  width
                  <input
                    type="range" min="1" max="8" value={step.width}
                    onChange={(e) => updateStep(i, "width", Number(e.target.value))}
                    style={{ width: 64 }}
                  />
                  <span style={{ fontSize: "0.7rem", color: "#555", minWidth: 24 }}>{step.width}px</span>
                </label>

                <label style={{ fontSize: "0.75rem", color: "#888", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  style
                  <select
                    value={step.style}
                    onChange={(e) => updateStep(i, "style", e.target.value)}
                    style={{ fontSize: "0.75rem", background: "#111", color: "#ccc", border: "1px solid #252525", borderRadius: 4, padding: "2px 4px" }}
                  >
                    {STYLES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </label>

                <label style={{ fontSize: "0.75rem", color: "#888", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  color
                  <div style={{ display: "flex", gap: 4 }}>
                    {PALETTE.map((c) => (
                      <button
                        key={c}
                        onClick={() => updateStep(i, "color", c)}
                        style={{
                          width: 16, height: 16, borderRadius: "50%", background: c,
                          border: step.color === c ? "2px solid white" : "2px solid transparent",
                          cursor: "pointer", flexShrink: 0,
                        }}
                        aria-label={c}
                      />
                    ))}
                  </div>
                </label>

                <button
                  onClick={() => removeStep(i)}
                  style={{ marginLeft: "auto", background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: "0.8rem" }}
                  aria-label="Remove step"
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              onClick={addStep}
              style={{ alignSelf: "flex-start", background: "none", border: "1px dashed #333", color: "#555", borderRadius: 6, padding: "0.35rem 0.75rem", cursor: "pointer", fontSize: "0.75rem" }}
            >
              + add step
            </button>
          </div>
        </div>

        <div className="controls">
          <label htmlFor="rp-axis">apply to:</label>
          <select id="rp-axis" value={axis} onChange={(e) => setAxis(e.target.value as typeof axis)}>
            <option value="column">column-rule only</option>
            <option value="row">row-rule only</option>
            <option value="both">column-rule + row-rule</option>
          </select>

          <label htmlFor="rp-cols">columns:</label>
          <select id="rp-cols" value={numCols} onChange={(e) => setNumCols(Number(e.target.value))}>
            {[3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>

          <label htmlFor="rp-rows">rows:</label>
          <select id="rp-rows" value={numRows} onChange={(e) => setNumRows(Number(e.target.value))}>
            {[2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        <div style={{ margin: "0.75rem 0", padding: "0.6rem 0.75rem", background: "#0a0a0a", border: "1px solid #1e1e1e", borderRadius: 6 }}>
          <p style={{ margin: "0 0 0.35rem", fontSize: "0.7rem", color: "#555" }}>resolved CSS:</p>
          <code style={{ fontSize: "0.75rem", color: "#a855f7", wordBreak: "break-all" }}>
            column-rule: {repeatVal}
          </code>
        </div>

        <div className="preview" style={{ overflowX: "auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${numCols}, 1fr)`,
              gridTemplateRows: `repeat(${numRows}, auto)`,
              gap: "1.25rem",
              // @ts-ignore
              ...(axis === "column" || axis === "both" ? { columnRule: repeatVal } : {}),
              ...(axis === "row" || axis === "both" ? { rowRule: repeatVal } : {}),
            } as React.CSSProperties}
          >
            {Array.from({ length: numCols * numRows }, (_, i) => (
              <div key={i} className="card" style={{ margin: 0, minHeight: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "0.75rem", color: "#555" }}>{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="code-panel">
          <pre><code>{code}</code></pre>
        </div>
      </div>

      <div className="note">
        <span className="icon">💡</span>
        <span>
          <code>repeat(auto, 1px dashed magenta, 5px dashed magenta)</code> cycles the
          two-step pattern across every gap automatically — no need to list each gap
          individually. Use a fixed count like <code>repeat(2, ...)</code> to apply the
          pattern only a set number of times, leaving remaining gaps unstyled.
        </span>
      </div>
    </ComponentPreview>
  );
}
