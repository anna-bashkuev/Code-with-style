"use client";

import { useState, useMemo } from "react";
import { ComponentPreview } from "@/components/component-preview";

const RULE_STYLES = ["solid", "dashed", "dotted"] as const;

// ─── Example A: grid + ::after underline ────────────────────────────────────
export function CssGapHeadingDemo() {
  const [text, setText]           = useState("Code with Style");
  const [ruleColor, setRuleColor] = useState("#6366f1");
  const [ruleStyle, setRuleStyle] = useState<string>("solid");
  const [ruleWidth, setRuleWidth] = useState(3);
  const [insetStart, setInsetStart] = useState(-30); // negative = extend beyond
  const [insetEnd, setInsetEnd]     = useState(60);  // positive = pull in
  const [gap, setGap]               = useState(10);

  const code = useMemo(() => `\
h1 {
  display: grid;
  gap: ${gap}px;

  /* The rule shorthand sets row-rule here */
  rule: ${ruleWidth}px ${ruleStyle} ${ruleColor};

  /*
   * rule-inset: <start> <end>
   * Negative start → rule extends past the left edge
   * Positive end   → rule stops short of the right edge
   */
  rule-inset: ${insetStart}px ${insetEnd}px;
}

/* Empty pseudo-element creates the second grid row */
h1::after {
  content: "";
}`, [ruleColor, ruleStyle, ruleWidth, insetStart, insetEnd, gap]);

  return (
    <ComponentPreview
      title="Heading with gap decoration"
      description="A single element trick: turn a heading into a two-row grid with an empty ::after, then use rule and rule-inset to draw a decorative underline — no extra markup, no pseudo borders."
      className="css-gap-heading-demo"
      code={code}
    >
      {/* Section label */}
      <div className="section-label">
        <h2>Heading with gap decoration</h2>
        <span className="badge badge-orange">Chrome 149+ (flag)</span>
      </div>

      <div className="demo-wrap">
        {/* Controls */}
        <div className="controls">

          <div className="control-group">
            <label>Heading text</label>
            <input
              type="text"
              value={text}
              maxLength={32}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="control-group">
            <label>rule color</label>
            <input
              type="color"
              value={ruleColor}
              onChange={(e) => setRuleColor(e.target.value)}
            />
          </div>

          <div className="control-group">
            <label>rule style</label>
            <select value={ruleStyle} onChange={(e) => setRuleStyle(e.target.value)}>
              {RULE_STYLES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label>rule width — {ruleWidth}px</label>
            <input
              type="range" min={1} max={8} value={ruleWidth}
              onChange={(e) => setRuleWidth(Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>gap — {gap}px</label>
            <input
              type="range" min={4} max={32} value={gap}
              onChange={(e) => setGap(Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>rule-inset start — {insetStart}px</label>
            <p className="control-hint">Negative = rule extends past the left edge</p>
            <input
              type="range" min={-80} max={80} value={insetStart}
              onChange={(e) => setInsetStart(Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>rule-inset end — {insetEnd}px</label>
            <p className="control-hint">Positive = rule stops short of the right edge</p>
            <input
              type="range" min={-80} max={200} value={insetEnd}
              onChange={(e) => setInsetEnd(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Preview */}
        <div className="preview preview--heading">
          <style>{`
            .heading-demo-h1 {
              display: grid;
              gap: ${gap}px;
              rule: ${ruleWidth}px ${ruleStyle} ${ruleColor};
              rule-inset: ${insetStart}px ${insetEnd}px;
            }
            .heading-demo-h1::after {
              content: "";
            }
            .preview--heading {
              width: fit-content;
            }
          `}</style>

          <h1 className="heading-demo-h1">
            {text || "Code with Style"}
          </h1>
        </div>

        {/* Code panel */}
        <div className="code-panel">
          <pre><code>{code}</code></pre>
        </div>
      </div>

      {/* Note */}
      <div className="note">
        <span className="note-icon">💡</span>
        <p>
          The trick: <code>display: grid</code> on the heading creates two rows —
          the text and an empty <code>::after</code>. The <code>rule</code> shorthand
          sets a <code>row-rule</code> in the gap between them. A <strong>negative</strong>{" "}
          <code>rule-inset</code> start value pushes the rule <em>beyond</em> the
          container edge — no extra markup, no borders, no pseudo-element hacks.
          Credit: <a href="https://codepen.io/t_afif" target="_blank" rel="noopener noreferrer">Temani Afif</a>.
        </p>
      </div>
    </ComponentPreview>
  );
}

// ─── Example B: flex + ::before + ::after side lines ────────────────────────
export function CssGapHeadingSideLinesDemo() {
  const [text, setText]           = useState("Code with Style");
  const [ruleColor, setRuleColor] = useState("#6366f1");
  const [ruleStyle, setRuleStyle] = useState<string>("solid");
  const [ruleWidth, setRuleWidth] = useState(100);  // rule length in px
  const [lineThickness, setLineThickness] = useState(2);
  const [gap, setGap]             = useState(120);

  // rule-inset uses calc(.5lh - <half of line thickness>px) to vertically center
  const insetCalc = `calc(0.5lh - ${Math.round(lineThickness / 2)}px)`;

  const code = useMemo(() => `\
h1 {
  display: flex;
  gap: ${gap}px;
  justify-content: center;

  /*
   * rule sets column-rule here.
   * The width value controls the visible LENGTH of the rule,
   * not its thickness — thickness comes from the border-width position.
   */
  rule: ${ruleWidth}px ${ruleStyle} ${ruleColor};

  /*
   * rule-inset: calc(0.5lh - ${Math.round(lineThickness / 2)}px)
   * Trims the rule equally on both sides so it sits
   * vertically centered on the line of text.
   */
  rule-inset: ${insetCalc};
}

/* Both pseudo-elements create the two column gaps */
h1::before,
h1::after {
  content: "";
}`, [ruleColor, ruleStyle, ruleWidth, lineThickness, gap, insetCalc]);

  return (
    <ComponentPreview
      title="Heading with side lines"
      description="A flex heading with ::before and ::after pseudo-elements creates two column gaps — one on each side of the text. column-rule draws a line in each gap, and rule-inset with calc(0.5lh) keeps it vertically centered."
      className="css-gap-heading-sidelines-demo"
      code={code}
    >
      {/* Section label */}
      <div className="section-label">
        <h2>Heading with side lines</h2>
        <span className="badge badge-orange">Chrome 149+ (flag)</span>
      </div>

      <div className="demo-wrap">
        {/* Controls */}
        <div className="controls">

          <div className="control-group">
            <label>Heading text</label>
            <input
              type="text"
              value={text}
              maxLength={32}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="control-group">
            <label>rule color</label>
            <input
              type="color"
              value={ruleColor}
              onChange={(e) => setRuleColor(e.target.value)}
            />
          </div>

          <div className="control-group">
            <label>rule style</label>
            <select value={ruleStyle} onChange={(e) => setRuleStyle(e.target.value)}>
              {RULE_STYLES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label>rule length — {ruleWidth}px</label>
            <p className="control-hint">Controls how long each side line is</p>
            <input
              type="range" min={20} max={200} value={ruleWidth}
              onChange={(e) => setRuleWidth(Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>line thickness — {lineThickness}px</label>
            <p className="control-hint">Used in rule-inset calc() to keep the line centered</p>
            <input
              type="range" min={1} max={8} value={lineThickness}
              onChange={(e) => setLineThickness(Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>gap — {gap}px</label>
            <p className="control-hint">Space between text and each side line</p>
            <input
              type="range" min={20} max={240} value={gap}
              onChange={(e) => setGap(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Preview */}
        <div className="preview preview--heading">
          <style>{`
            .sidelines-demo-h1 {
              display: flex;
              gap: ${gap}px;
              justify-content: center;
              rule: ${ruleWidth}px ${ruleStyle} ${ruleColor};
              rule-inset: ${insetCalc};
            }
            .sidelines-demo-h1::before,
            .sidelines-demo-h1::after {
              content: "";
            }
          `}</style>

          <h1 className="sidelines-demo-h1">
            {text || "Code with Style"}
          </h1>
        </div>

        {/* Code panel */}
        <div className="code-panel">
          <pre><code>{code}</code></pre>
        </div>
      </div>

      {/* Note */}
      <div className="note">
        <span className="note-icon">💡</span>
        <p>
          The key insight: in a <code>flex</code> container, <code>rule</code> draws{" "}
          <code>column-rule</code> — a vertical line in each gap. The <strong>width
          value</strong> in the <code>rule</code> shorthand controls the{" "}
          <em>length</em> of the visible line, not its stroke thickness.{" "}
          <code>rule-inset: calc(0.5lh - Npx)</code> trims both ends so the line
          sits exactly at the text's vertical midpoint — a trick that works at any
          font size. Credit:{" "}
          <a href="https://codepen.io/t_afif" target="_blank" rel="noopener noreferrer">
            Temani Afif
          </a>.
        </p>
      </div>
    </ComponentPreview>
  );
}
