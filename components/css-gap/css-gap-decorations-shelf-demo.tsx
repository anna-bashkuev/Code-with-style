"use client";

import { useState, useMemo } from "react";
import { ComponentPreview } from "@/components/component-preview";
import styles from "./css-gap-decorations-shelf-demo.module.css";

const CITIES = [
  { serial: "N° I",   name: "Kyoto",      country: "Japan",    lat: "35.0116° N", lon: "135.7681° E" },
  { serial: "N° II",  name: "Lisbon",     country: "Portugal", lat: "38.7223° N", lon: "9.1393° W"   },
  { serial: "N° III", name: "Reykjavík",  country: "Iceland",  lat: "64.1466° N", lon: "21.9426° W"  },
  { serial: "N° IV",  name: "Marrakesh",  country: "Morocco",  lat: "31.6295° N", lon: "7.9811° W"   },
  { serial: "N° V",   name: "Hanoi",      country: "Vietnam",  lat: "21.0285° N", lon: "105.8542° E" },
  { serial: "N° VI",  name: "Valparaíso", country: "Chile",    lat: "33.0472° S", lon: "71.6127° W"  },
];

export function CssGapDecorationsShelfDemo() {
  const [ruleColor, setRuleColor]       = useState("#6b7fd4");
  const [ruleStyle, setRuleStyle]       = useState("solid");
  const [ruleWidth, setRuleWidth]       = useState(1);
  const [insetCap, setInsetCap]         = useState(10);
  const [inset, setInset]               = useState(130);

  const code = useMemo(() => `\
.shelf {
  display: flex;
  gap: 48px;

  column-rule: ${ruleWidth}px ${ruleStyle} ${ruleColor};
  rule-inset-cap: ${insetCap}px;
  rule-inset: ${inset}px;
}`, [ruleColor, ruleStyle, ruleWidth, insetCap, inset]);

  return (
    <ComponentPreview
      title="Postcard Shelf — gap decorations in practice"
      description="A real-world pattern: a horizontal scrolling flex shelf where column-rule, rule-inset-cap, and rule-inset work together to draw elegant dividers between cards."
      className="css-gap-shelf-demo"
      code={code}
    >
      {/* Section label */}
      <div className="section-label">
        <h2>Postcard Shelf</h2>
        <span className="badge badge-orange">Chrome 149+</span>
      </div>

      <div className="demo-wrap">
        {/* Controls */}
        <div className="controls">
          <div className="control-group">
            <label>column-rule color</label>
            <input
              type="color"
              value={ruleColor}
              onChange={(e) => setRuleColor(e.target.value)}
            />
          </div>

          <div className="control-group">
            <label>column-rule style</label>
            <select
              value={ruleStyle}
              onChange={(e) => setRuleStyle(e.target.value)}
            >
              {["solid", "dashed", "dotted"].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label>column-rule width — {ruleWidth}px</label>
            <input
              type="range"
              min={1}
              max={4}
              value={ruleWidth}
              onChange={(e) => setRuleWidth(Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>rule-inset-cap — {insetCap}px</label>
            <input
              type="range"
              min={0}
              max={40}
              value={insetCap}
              onChange={(e) => setInsetCap(Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>rule-inset — {inset}px</label>
            <input
              type="range"
              min={0}
              max={200}
              value={inset}
              onChange={(e) => setInset(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Preview */}
        <div className={`preview ${styles["preview--shelf"]}`}>
          {/* Inject the dynamic gap-decoration styles */}
          <style>{`
            .shelf-inner {
              column-rule: ${ruleWidth}px ${ruleStyle} ${ruleColor};
              rule-inset-cap: ${insetCap}px;
              rule-inset: ${inset}px;
            }
          `}</style>

          <ul className={styles["shelf-inner"]}>
            {CITIES.map((city) => (
              <li key={city.name} className={styles["shelf-card"]}>
                <p className={styles["shelf-serial"]}>{city.serial}</p>
                <div className={styles["shelf-place"]}>
                  <h3>{city.name}</h3>
                  <p className={styles["shelf-country"]}>{city.country}</p>
                </div>
                <p className={styles["shelf-coords"]}>
                  <span>Lat {city.lat}</span>
                  <span>Lon {city.lon}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Code panel */}
        <div className="code-panel">
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      </div>

      {/* Note */}
      <div className="note">
        <span className="note-icon">💡</span>
        <p>
          <strong>rule-inset</strong> trims the rule symmetrically from both
          ends — great for keeping the divider away from card content.{" "}
          <strong>rule-inset-cap</strong> adds a separate inset only at the
          container edges. Drag the sliders to see how they interact. Requires{" "}
        </p>
      </div>
    </ComponentPreview>
  );
}
