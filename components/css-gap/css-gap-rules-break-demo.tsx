"use client";

import { useState } from "react";
import { ComponentPreview } from "@/components/component-preview";

export function CssGapRulesBreakDemo() {
  const [ruleBreak, setRuleBreak] = useState<"none" | "intersection">("intersection");

  const code = `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 64px);
  gap: 2rem;

  column-rule: 3px solid #f59e0b;
  row-rule: 3px solid #a855f7;

  /* how rules behave where they cross */
  rule-break: ${ruleBreak};
  /* values: none | intersection */
}`;

  return (
    <ComponentPreview
      title="Gap Decorations — rule-break at Intersections"
      description="Control how rules behave at intersections and how far they extend into the gap."
      className="justify-center"
      code={code}
    >
      <div className="section-label">
        <h2>03 — rule-break at Intersections</h2>
        <span className="badge badge-yellow">Chrome / Edge 139+ (flag)</span>
      </div>

      <div className="demo-wrap">
        <div className="controls">
          <label htmlFor="ex3-break">rule-break:</label>
          <select
            id="ex3-break"
            value={ruleBreak}
            onChange={(e) => setRuleBreak(e.target.value as typeof ruleBreak)}
          >
            <option value="none">none — lines cross through each other</option>
            <option value="intersection">intersection — lines break at each crossing</option>
          </select>
        </div>

        <div className="preview" style={{ overflowX: "auto" }}>
          <div
            style={{
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
            } as React.CSSProperties}
          >
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} className="card" style={{ margin: 0 }} />
            ))}
          </div>

          <div style={{ marginTop: "1.25rem", padding: "0.75rem 1rem", background: "#0a0a0a", border: "1px solid #1e1e1e", borderRadius: 6 }}>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "#aaa", lineHeight: 1.6 }}>
              <strong style={{ color: "#e2e8f0" }}>{ruleBreak}</strong>
              {" — "}
              {ruleBreak === "none" &&
                "The orange column rules and purple row rules are painted straight through, overlapping where they cross."}
              {ruleBreak === "intersection" &&
                "Each rule stops short at every crossing point, leaving a small break at each intersection — a clean grid-of-crosses look."}
            </p>
          </div>
        </div>

        {/* Side-by-side comparison */}
        <div style={{ marginTop: "1.5rem" }}>
          <p style={{ margin: "0 0 0.75rem", fontSize: "0.75rem", color: "#666" }}>Both values compared:</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
            {(["none", "intersection"] as const).map((val) => (
              <div key={val}>
                <p style={{ margin: "0 0 0.5rem", fontSize: "0.7rem", textAlign: "center" }}>
                  <code style={{ color: ruleBreak === val ? "#f59e0b" : "#666" }}>{val}</code>
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gridTemplateRows: "repeat(2, 44px)",
                    gap: "1.25rem",
                    // @ts-ignore
                    columnRule: "3px solid #64748b",
                    rowRule: "3px solid #64748b",
                    ruleBreak: val,
                  } as React.CSSProperties}
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
          <pre><code>{code}</code></pre>
        </div>
      </div>

      <div className="note">
        <span className="icon">💡</span>
        <span>
          <strong>rule-break</strong> controls what happens where column and row rules cross.{" "}
          <code>none</code> paints them straight through; <code>intersection</code> breaks each
          line at every crossing. You need both <code>column-rule</code> and{" "}
          <code>row-rule</code> set for the effect to be visible.
        </span>
      </div>
    </ComponentPreview>
  );
}
