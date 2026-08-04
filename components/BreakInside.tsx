"use client";

import { useState } from "react";
import styles from "./BreakInside.module.css";

// ─── Data ────────────────────────────────────────────────────────────────────

type BreakInsideValue = "auto" | "avoid";
type BreakBeforeAfterValue = "auto" | "column";

interface Card {
  title: string;
  tag: string;
  desc: string;
  /** Highlight this card to make the break effect obvious */
  highlight?: boolean;
}

const cards: Card[] = [
  {
    title: "Subgrid",
    tag: "Baseline",
    desc: "Children of grid items align to the parent grid's tracks. Solves card alignment without JavaScript.",
  },
  {
    title: "Container Queries",
    tag: "Baseline",
    desc: "Style elements based on their container size, not the viewport. Component-level responsiveness at last.",
  },
  {
    title: "CSS Gap Rules",
    tag: "Arriving 2026",
    desc: "Draw styled, animatable lines inside grid and flex gaps. No more border hacks or pseudo-elements.",
    highlight: true, // this card will be split or forced to show the break effect
  },
  {
    title: "Anchor Positioning",
    tag: "Chrome / Edge",
    desc: "Position elements relative to each other in pure CSS. Replaces Popper.js and Floating UI entirely.",
  },
  {
    title: "calc-size()",
    tag: "Chrome 129+",
    desc: "Animate height from 0 to auto natively. No JavaScript height measurement or resize observers needed.",
  },
];

// ─── Controls config ─────────────────────────────────────────────────────────

const BREAK_INSIDE_VALUES: BreakInsideValue[] = ["auto", "avoid"];
const BREAK_BEFORE_VALUES: BreakBeforeAfterValue[] = ["auto", "column"];
const BREAK_AFTER_VALUES: BreakBeforeAfterValue[] = ["auto", "column"];

// ─── Component ───────────────────────────────────────────────────────────────

export function BreakInside() {
  const [breakInside, setBreakInside] = useState<BreakInsideValue>("auto");
  const [breakBefore, setBreakBefore] = useState<BreakBeforeAfterValue>("auto");
  const [breakAfter, setBreakAfter] = useState<BreakBeforeAfterValue>("auto");
  const [columnCount, setColumnCount] = useState(3);

  const activeProperty =
    breakBefore !== "auto"
      ? "break-before"
      : breakAfter !== "auto"
        ? "break-after"
        : "break-inside";

  const code = `\
.columns {
  column-count: ${columnCount};
  column-gap: 2rem;
}

/* Applied to the highlighted card */
.card--highlight {
  break-inside: ${breakInside};
  break-before: ${breakBefore};
  break-after: ${breakAfter};
}`;

  return (
    <div className={styles.wrapper}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h2 className={styles.heading}>Column Break Rules</h2>
          <span className={styles.badge}>CSS Multi-column</span>
        </div>
        <p className={styles.description}>
          Control how content flows across columns. Toggle each property on the{" "}
          <mark className={styles.mark}>highlighted card</mark> to see the
          effect in real time.
        </p>
      </div>

      {/* ── Controls ── */}
      <div className={styles.controls}>
        {/* column-count */}
        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>column-count</span>
          <div className={styles.buttonRow}>
            {[2, 3, 4].map((n) => (
              <button
                key={n}
                className={`${styles.btn} ${columnCount === n ? styles.btnActive : ""}`}
                onClick={() => setColumnCount(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* break-inside */}
        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>
            <code>break-inside</code>
          </span>
          <div className={styles.buttonRow}>
            {BREAK_INSIDE_VALUES.map((v) => (
              <button
                key={v}
                className={`${styles.btn} ${breakInside === v ? styles.btnActive : ""}`}
                onClick={() => setBreakInside(v)}
              >
                {v}
              </button>
            ))}
          </div>
          <span className={styles.controlHint}>
            {breakInside === "avoid"
              ? "Card is kept whole — never split across columns"
              : "Card can be split freely across a column boundary"}
          </span>
        </div>

        {/* break-before */}
        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>
            <code>break-before</code>
          </span>
          <div className={styles.buttonRow}>
            {BREAK_BEFORE_VALUES.map((v) => (
              <button
                key={v}
                className={`${styles.btn} ${breakBefore === v ? styles.btnActive : ""}`}
                onClick={() => setBreakBefore(v)}
              >
                {v}
              </button>
            ))}
          </div>
          <span className={styles.controlHint}>
            {breakBefore === "column"
              ? "Card always starts at the top of a new column"
              : "Card flows naturally after the previous one"}
          </span>
        </div>

        {/* break-after */}
        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>
            <code>break-after</code>
          </span>
          <div className={styles.buttonRow}>
            {BREAK_AFTER_VALUES.map((v) => (
              <button
                key={v}
                className={`${styles.btn} ${breakAfter === v ? styles.btnActive : ""}`}
                onClick={() => setBreakAfter(v)}
              >
                {v}
              </button>
            ))}
          </div>
          <span className={styles.controlHint}>
            {breakAfter === "column"
              ? "A column break is forced after this card"
              : "Next card flows naturally"}
          </span>
        </div>
      </div>

      {/* ── Preview ── */}
      <div className={styles.preview}>
        {/* Column guides — visual rulers showing column boundaries */}
        <div
          className={styles.columnGuides}
          style={{ "--col-count": columnCount } as React.CSSProperties}
        >
          {Array.from({ length: columnCount }).map((_, i) => (
            <div key={i} className={styles.columnGuide}>
              <span className={styles.columnLabel}>col {i + 1}</span>
            </div>
          ))}
        </div>

        {/* The actual multi-column content */}
        <div
          className={styles.columns}
          style={{ columnCount } as React.CSSProperties}
        >
          {cards.map((card) => (
            <div
              key={card.title}
              className={`${styles.card} ${card.highlight ? styles.cardHighlight : ""}`}
              style={
                card.highlight
                  ? {
                      breakInside,
                      breakBefore,
                      breakAfter,
                    }
                  : undefined
              }
            >
              {card.highlight && (
                <span className={styles.targetBadge}>← applying rules here</span>
              )}
              <span className={styles.tag}>{card.tag}</span>
              <h3 className={styles.title}>{card.title}</h3>
              <p className={styles.desc}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Active rule explanation ── */}
      <div className={styles.explainer}>
        <div className={styles.explainerIcon}>
          {breakInside === "avoid" || breakBefore === "column" || breakAfter === "column"
            ? "💡"
            : "⚠️"}
        </div>
        <div>
          <strong>What you're seeing:</strong>{" "}
          {breakInside === "avoid" &&
            "break-inside: avoid keeps the highlighted card intact — the browser moves it entirely to the next column rather than splitting it."}
          {breakBefore === "column" &&
            "break-before: column forces a column break before the highlighted card, pushing it to the top of the next column regardless of available space."}
          {breakAfter === "column" &&
            "break-after: column forces a column break after the highlighted card, pushing the next card to a new column."}
          {breakInside === "auto" && breakBefore === "auto" && breakAfter === "auto" &&
            "All values are set to auto — the browser decides where to break. The highlighted card may be split across columns depending on available space."}
        </div>
      </div>

      {/* ── Code panel ── */}
      <div className={styles.codePanel}>
        <div className={styles.codePanelHeader}>
          <span className={styles.codePanelLabel}>CSS</span>
          <span className={styles.codePanelActive}>{activeProperty}</span>
        </div>
        <pre className={styles.pre}>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
