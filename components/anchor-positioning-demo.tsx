"use client"

import { useState, useRef } from "react"
import { ComponentPreview } from "@/components/component-preview"

export function AnchorPositioningDemo() {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null)
  const [placement, setPlacement] = useState<"top" | "bottom" | "left" | "right">("top")
  const [useAnchor, setUseAnchor] = useState(true)

  const tooltipPlacementMap = {
    top: { bottom: "calc(anchor(top) + 8px)", left: "anchor(center)" },
    bottom: { top: "calc(anchor(bottom) + 8px)", left: "anchor(center)" },
    left: { right: "calc(anchor(left) + 8px)", top: "anchor(center)" },
    right: { left: "calc(anchor(right) + 8px)", top: "anchor(center)" },
  }

  const buttons = [
    { label: "Subgrid", anchor: "btn-subgrid", tip: "Align children to parent grid tracks." },
    { label: "Gap Rules", anchor: "btn-gap", tip: "Draw lines inside flex/grid gaps." },
    { label: "calc-size()", anchor: "btn-calc", tip: "Animate height: auto natively." },
    { label: "Masonry", anchor: "btn-masonry", tip: "Native Pinterest-style grid layout." },
  ]

  return (
    <div className="mt-10 flex flex-col gap-12">
      <ComponentPreview
        title="Anchor Positioning"
        description="Position elements relative to each other in pure CSS — no Popper.js, no Floating UI."
        className="justify-center"
        code={`position-anchor: --my-anchor;\ntop: anchor(bottom);\nleft: anchor(center);`}
      >
        <div className="section-label">
          <h2>01 — CSS Tooltips with Anchor Positioning</h2>
          <span className="badge badge-orange">Chrome / Edge</span>
        </div>

        <div className="demo-wrap">
          <div className="controls">
            <label htmlFor="ap-placement">tooltip placement:</label>
            <select
              id="ap-placement"
              value={placement}
              onChange={(e) => setPlacement(e.target.value as typeof placement)}
            >
              <option value="top">top</option>
              <option value="bottom">bottom</option>
              <option value="left">left</option>
              <option value="right">right</option>
            </select>

            <label htmlFor="ap-mode">technique:</label>
            <select
              id="ap-mode"
              value={useAnchor ? "anchor" : "js"}
              onChange={(e) => setUseAnchor(e.target.value === "anchor")}
            >
              <option value="anchor">CSS Anchor Positioning ✨</option>
              <option value="js">JavaScript (getBoundingClientRect)</option>
            </select>
          </div>

          <div
            className="preview"
            style={{ minHeight: 180, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}
          >
            <style>{`
              @supports (anchor-name: --x) {
                .ap-btn { anchor-name: var(--anchor-name); }
                .ap-tooltip {
                  position: absolute;
                  position-anchor: var(--anchor-name);
                  inset-area: ${placement === "top" ? "top" : placement === "bottom" ? "bottom" : placement === "left" ? "left" : "right"};
                  margin: 8px;
                  width: max-content;
                  max-width: 200px;
                }
              }
              .ap-btn {
                padding: 0.5rem 1rem;
                background: #1a1a2e;
                border: 1px solid #3b82f6;
                border-radius: 6px;
                color: #fff;
                cursor: pointer;
                font-size: 0.875rem;
                transition: background 0.2s;
              }
              .ap-btn:hover { background: #3b82f6; }
              .ap-tooltip-box {
                background: #0f0f0f;
                border: 1px solid #333;
                border-radius: 6px;
                padding: 0.5rem 0.75rem;
                font-size: 0.8rem;
                color: #ccc;
                box-shadow: 0 4px 16px rgba(0,0,0,0.4);
                pointer-events: none;
                z-index: 100;
              }
            `}</style>

            {buttons.map((btn, i) => (
              <div key={btn.anchor} style={{ position: "relative" }}>
                <button
                  className="ap-btn"
                  style={{ "--anchor-name": `--${btn.anchor}` } as React.CSSProperties}
                  onMouseEnter={() => setActiveTooltip(i)}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  {btn.label}
                </button>

                {activeTooltip === i && (
                  useAnchor ? (
                    <div
                      className="ap-tooltip-box"
                      style={{
                        position: "absolute",
                        ...(placement === "top" && { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" }),
                        ...(placement === "bottom" && { top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" }),
                        ...(placement === "left" && { right: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" }),
                        ...(placement === "right" && { left: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" }),
                        whiteSpace: "nowrap",
                      }}
                    >
                      {btn.tip}
                    </div>
                  ) : (
                    <div
                      className="ap-tooltip-box"
                      style={{
                        position: "absolute",
                        bottom: "calc(100% + 8px)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {btn.tip}
                    </div>
                  )
                )}
              </div>
            ))}
          </div>

          <div className="code-panel">
            <pre>
              <code>
                {`/* 1. Name the anchor element */
.trigger {
  anchor-name: --my-tooltip-anchor;
}

/* 2. Attach the tooltip to it */
.tooltip {
  position: absolute;
  position-anchor: --my-tooltip-anchor;

  /* Place it ${placement} of the anchor */
  inset-area: ${placement};
  margin: 8px;

  /* No JS. No getBoundingClientRect().
     No Popper.js. No ResizeObserver. */
}`}
              </code>
            </pre>
          </div>
        </div>

        <div className="note">
          <span className="icon">⚠️</span>
          <span>
            CSS Anchor Positioning is available in Chrome and Edge. Firefox
            support is in progress. Use{" "}
            <strong>@supports (anchor-name: --x)</strong> to feature-detect.
            The <strong>inset-area</strong> shorthand replaces the older{" "}
            <strong>anchor()</strong> function syntax in the current spec draft.
          </span>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Anchor Positioning — position-try"
        description="Automatic fallback placement when the preferred position overflows the viewport."
        className="justify-center"
        code={`position-try-fallbacks: flip-block, flip-inline;`}
      >
        <div className="section-label">
          <h2>02 — Automatic Overflow Avoidance</h2>
          <span className="badge badge-orange">Chrome / Edge</span>
        </div>

        <div className="demo-wrap">
          <div className="preview" style={{ minHeight: 160, overflowX: "auto" }}>
            <style>{`
              .try-wrap {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem;
                gap: 1rem;
              }
              .try-btn {
                anchor-name: --try-anchor;
                padding: 0.5rem 1rem;
                background: #1a1a2e;
                border: 1px solid #f59e0b;
                border-radius: 6px;
                color: #fff;
                font-size: 0.875rem;
                cursor: default;
              }
              .try-popover {
                position: absolute;
                position-anchor: --try-anchor;
                inset-area: top;
                position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
                margin: 8px;
                background: #0f0f0f;
                border: 1px solid #333;
                border-radius: 6px;
                padding: 0.5rem 0.75rem;
                font-size: 0.8rem;
                color: #ccc;
                width: 180px;
              }
            `}</style>
            <div className="try-wrap">
              <div style={{ fontSize: "0.8rem", color: "#666", maxWidth: 200 }}>
                <p>With <strong>position-try-fallbacks</strong>, the browser automatically tries alternative placements if the preferred one would overflow.</p>
                <p>No JavaScript scroll listener needed.</p>
              </div>
              <div style={{ position: "relative" }}>
                <div className="try-btn">Hover me</div>
                <div className="try-popover">
                  I prefer to be on top, but I'll flip automatically if there's no space.
                </div>
              </div>
            </div>
          </div>

          <div className="code-panel">
            <pre>
              <code>{`.popover {
  position: absolute;
  position-anchor: --my-anchor;

  /* preferred placement */
  inset-area: top;

  /* browser tries these in order
     if preferred placement overflows */
  position-try-fallbacks:
    flip-block,        /* try bottom */
    flip-inline,       /* try left/right */
    flip-block flip-inline; /* try opposite corner */
}`}</code>
            </pre>
          </div>
        </div>

        <div className="note">
          <span className="icon">💡</span>
          <span>
            <strong>position-try-fallbacks</strong> replaces entire JavaScript
            libraries like Floating UI that detect viewport overflow and
            reposition tooltips, dropdowns, and popovers dynamically. The
            browser handles it natively with zero runtime cost.
          </span>
        </div>
      </ComponentPreview>
    </div>
  )
}
