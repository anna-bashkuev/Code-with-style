"use client";
import styles from "./css-gap-rule-visibility-demo.module.css";

import { useState, useEffect, useMemo } from "react";
import { ComponentPreview } from "@/components/component-preview";
import { buttonVariants } from "../ui/button";

const GRID_SIZES: Record<string, { cols: number; rows: number }> = {
  "3×2": { cols: 3, rows: 2 },
  "3×3": { cols: 3, rows: 3 },
  "4×3": { cols: 4, rows: 3 },
};

const VISIBILITY_VALUES = ["normal", "all", "around", "between"] as const;
type VisibilityValue = (typeof VISIBILITY_VALUES)[number];

const VISIBILITY_DESCRIPTIONS: Record<VisibilityValue, string> = {
  normal: "Browser default behavior",
  all: "Every gap — even if both sides are empty",
  around: "At least one adjacent item is present",
  between: "Both adjacent items must be present",
};

const RULE_STYLES = ["solid", "dashed", "dotted"] as const;

export function CssGapRuleVisibilityDemo() {
  const [visibility, setVisibility] = useState<VisibilityValue>("between");
  const [layout, setLayout] = useState<"grid" | "flex">("grid");
  const [gridSize, setGridSize] = useState("3×3");
  const [ruleStyle, setRuleStyle] = useState("dashed");
  const [columnColor, setColumnColor] = useState("#6366f1");
  const [rowColor, setRowColor] = useState("#ec4899");

  const { cols, rows } = GRID_SIZES[gridSize];
  const totalCells = cols * rows;

  const [visibleCells, setVisibleCells] = useState<boolean[]>(() =>
    Array(layout === "flex" ? 6 : totalCells).fill(true),
  );

  // Reset cells when grid size or layout changes
  useEffect(() => {
    const count = layout === "flex" ? 6 : totalCells;
    setVisibleCells(Array(count).fill(true));
  }, [layout, gridSize]);

  // Fix the toggle — spread from visibleCells directly
  const toggleCell = (i: number) => {
    setVisibleCells((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };
  // Reset visible cells when grid size or layout changes
  const cellCount = layout === "flex" ? 6 : totalCells;



  const gridStyle: React.CSSProperties = layout === "grid"
    ? {
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: "16px",
        columnRule: `2px ${ruleStyle} ${columnColor}`,
        // @ts-expect-error — experimental property
        rowRule: `2px ${ruleStyle} ${rowColor}`,
      }
    : {
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        columnRule: `2px ${ruleStyle} ${columnColor}`,
        rowRule: `2px ${ruleStyle} ${rowColor}`,
      };

  const code = useMemo(() => {
    const displayRule =
      layout === "grid"
        ? `  grid-template-columns: repeat(${cols}, 1fr);\n`
        : `  flex-wrap: wrap;\n`;

    return `.container {
  display: ${layout};
${displayRule}  gap: 16px;
  column-rule: 2px ${ruleStyle} ${columnColor};
  row-rule: 2px ${ruleStyle} ${rowColor};
  rule-visibility-items: ${visibility};
}`;
  }, [layout, cols, ruleStyle, columnColor, rowColor, visibility]);

  return (
    <ComponentPreview
      title="05 — rule-visibility-items"
      description="Controls whether a gap rule appears based on which items are adjacent to it."
      className="css-gap-rule-visibility-demo"
      code={code}
    >
      {/* Section label */}
      <div className="section-label">
        <h2>
          05 — <code>rule-visibility-items</code>
        </h2>
        <span className="badge badge-red">Experimental — flag only</span>
      </div>

      <div className="demo-wrap">
        {/* Controls */}
        <div className="controls">
          {/* rule-visibility-items */}
          <div className="control-group">
            <label>rule-visibility-items</label>
            <div className="button-group">
              {VISIBILITY_VALUES.map((v) => (
                <button
                  key={v}
                  className={`${buttonVariants({
                    variant: "outline",
                    size: "lg",
                  })} inline-flex me-1 ${visibility === v ? "active" : ""}`}
                  onClick={() => setVisibility(v)}
                >
                  {v}
                </button>
              ))}
            </div>
            <p className="control-hint">
              {VISIBILITY_DESCRIPTIONS[visibility]}
            </p>
          </div>

          {/* Layout toggle */}
          <div className="control-group">
            <label>Layout</label>
            <div className="button-group">
              <button
                className={layout === "grid" ? "active" : ""}
                onClick={() => setLayout("grid")}
              >
                grid
              </button>
              <button
                className={layout === "flex" ? "active" : ""}
                onClick={() => setLayout("flex")}
              >
                flex
              </button>
            </div>
          </div>

          {/* Grid size (grid only) */}
          {layout === "grid" && (
            <div className="control-group">
              <label>Grid size</label>
              <select
                value={gridSize}
                onChange={(e) => setGridSize(e.target.value)}
              >
                {Object.keys(GRID_SIZES).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Rule style */}
          <div className="control-group">
            <label>Rule style</label>
            <select
              value={ruleStyle}
              onChange={(e) => setRuleStyle(e.target.value)}
            >
              {RULE_STYLES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Colors */}
          <div className="control-group control-group--inline">
            <label>
              Column rule
              <input
                type="color"
                value={columnColor}
                onChange={(e) => setColumnColor(e.target.value)}
              />
            </label>
            <label>
              Row rule
              <input
                type="color"
                value={rowColor}
                onChange={(e) => setRowColor(e.target.value)}
              />
            </label>
          </div>

          {/* Cell toggles */}
          <div className="control-group">
            <label>Visible cells</label>
            <div className="{styles.cell-toggles}">
              {visibleCells.map((visible, i) => (
                <label key={i} className="{styles.cell-toggle}">
                  <input
                    type="checkbox"
                    checked={visible}
                    onChange={() => toggleCell(i)}
                  />
                  <span>{i + 1}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="preview">
          <style>{`
            .rule-visibility-preview {
              rule-visibility-items: ${visibility};
            }
          `}</style>
          <div className="rule-visibility-preview" style={gridStyle}>
            {visibleCells.map((visible, i) => {
              const col = (i % cols) + 1;
              const row = Math.floor(i / cols) + 1;
              return visible ? (
                <div
                  key={i}
                  className="demo-cell"
                  style={{ gridColumn: col, gridRow: row }}
                >
                  {i + 1}
                </div>
              ) : null;
            })}
          </div>
        </div>

        {/* Code panel */}
        <div className="code-panel">
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      </div>

      {/* Value legend */}
      <div className="{styles.legend}">
        <table>
          <thead>
            <tr>
              <th>Value</th>
              <th>Rule appears when…</th>
            </tr>
          </thead>
          <tbody>
            {VISIBILITY_VALUES.map((v) => (
              <tr
                key={v}
                className={v === visibility ? styles.legendRowActive : ""}
              >
                <td>
                  <code>{v}</code>
                </td>
                <td>{VISIBILITY_DESCRIPTIONS[v]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Note */}
      <div className="note">
        <span className="note-icon">⚠️</span>
        <p>
          <strong>rule-visibility-items</strong> is highly experimental. Enable{" "}
          <code>chrome://flags → Experimental Web Platform Features</code> in
          Chrome or Edge 149+. Differences between <code>normal</code>,{" "}
          <code>around</code>, and <code>all</code> may not yet be visually
          distinct in all builds — toggle cells on and off to observe{" "}
          <code>between</code> vs <code>around</code> most clearly.
        </p>
      </div>
    </ComponentPreview>
  );
}
