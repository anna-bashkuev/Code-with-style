"use client";

import { useState } from "react";
import { ComponentPreview } from "@/components/component-preview";

export function CssGapRulesInsetDemo() {
  const [insetCap, setInsetCap] = useState(0);
  const [insetJunction, setInsetJunction] = useState(12);
  const [overlapJoin, setOverlapJoin] = useState(false);

  const code = `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 72px);
  gap: 2rem;

  column-rule: 2px solid #10b981;
  row-rule: 2px solid #10b981;

  /* trim each segment inward */
  rule-inset-cap: ${insetCap}px;          /* at container edges */
  rule-inset-junction: ${insetJunction}px; /* at crossings */${overlapJoin ? "\n  rule-inset: overlap-join;           /* connect corners */" : ""}

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
      code={code}
    >
      <div className="section-label">
        <h2>04 — rule-inset, inset-cap &amp; inset-junction</h2>
        <span className="badge badge-yellow">Chrome / Edge 139+ (flag)</span>
      </div>

      <div className="demo-wrap">
        <div className="controls">
          <label htmlFor="ex4-cap">rule-inset-cap (edges):</label>
          <input
            id="ex4-cap"
            type="range" min="0" max="24" value={insetCap}
            onChange={(e) => setInsetCap(Number(e.target.value))}
          />
          <span className="val">{insetCap}px</span>

          <label htmlFor="ex4-junction">rule-inset-junction (crossings):</label>
          <input
            id="ex4-junction"
            type="range" min="0" max="24" value={insetJunction}
            onChange={(e) => setInsetJunction(Number(e.target.value))}
          />
          <span className="val">{insetJunction}px</span>

          <label style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer", fontWeight: "normal" }}>
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
            style={{
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
              transition: "rule-inset-junction 0.3s ease, rule-inset-cap 0.3s ease",
            } as React.CSSProperties}
          >
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} className="card" style={{ margin: 0 }} />
            ))}
          </div>

          <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#555", marginTop: "1rem" }}>
            Try <strong>cap: 0px</strong> + <strong>junction: 12px</strong> — flush at the
            edges, breathing room at every crossing.
          </p>
        </div>

        <div className="code-panel">
          <pre><code>{code}</code></pre>
        </div>
      </div>

      <div className="note">
        <span className="icon">💡</span>
        <span>
          <strong>rule-inset</strong> is the shorthand for trimming all segments inward.{" "}
          <strong>rule-inset-cap</strong> controls the inset at container edges, and{" "}
          <strong>rule-inset-junction</strong> controls it at crossing points. Setting{" "}
          <code>cap: 0px</code> with <code>junction: 12px</code> keeps lines flush at the
          edges but opens space around each crossing. Since these are animatable, collapsing
          the junction to zero on hover makes a satisfying micro-interaction.
        </span>
      </div>
    </ComponentPreview>
  );
}
