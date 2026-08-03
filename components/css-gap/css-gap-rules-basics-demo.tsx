"use client";

import { useMemo, useState } from "react";
import { ComponentPreview } from "@/components/component-preview";

const STYLES = ["solid", "dashed", "dotted", "double"];

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#a855f7",
  "#e2e8f0",
];

export function CssGapRulesBasicsDemo() {
  const [layout, setLayout] = useState<"grid" | "flex">("grid");
  const [cols, setCols] = useState(3);
  const [ruleStyle, setRuleStyle] = useState("solid");
  const [ruleWidth, setRuleWidth] = useState(1);
  const [ruleColor, setRuleColor] = useState("#3b82f6");
  const [showRowRule, setShowRowRule] = useState(true);
  const [showColRule, setShowColRule] = useState(true);

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

  const code = useMemo(() => {
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
    <ComponentPreview
      title="CSS Gap Decorations"
      description="column-rule and row-rule now work in grid and flex — no border hacks needed."
      className="justify-center"
      code={code}
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
            {STYLES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
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
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setRuleColor(c)}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: c,
                  border: ruleColor === c ? "2px solid white" : "2px solid transparent",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
                aria-label={c}
              />
            ))}
          </div>

          <label>show:</label>
          <label style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer", fontWeight: "normal" }}>
            <input
              type="checkbox"
              checked={showColRule}
              onChange={(e) => setShowColRule(e.target.checked)}
            />
            column-rule
          </label>
          {layout === "grid" && (
            <label style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer", fontWeight: "normal" }}>
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
            {["Subgrid", "Container Queries", "Gap Decorations", "Anchor Positioning", "calc-size()", "Masonry Layout"].map((name) => (
              <div key={name} className="card" style={{ minWidth: 120 }}>
                <h3>{name}</h3>
                <p>Modern CSS layout feature.</p>
                <span className="tag">CSS 2025+</span>
              </div>
            ))}
          </div>
        </div>

        <div className="code-panel">
          <pre><code>{code}</code></pre>
        </div>
      </div>

      <div className="note">
        <span className="icon">⚠️</span>
        <span>
          Requires <strong>Chrome 149+ / Edge 149+</strong>. The decorations are
          purely visual — they don't affect layout or spacing. Use{" "}
          <strong>@supports (row-rule-style: solid)</strong> to feature-detect.
        </span>
      </div>
    </ComponentPreview>
  );
}
