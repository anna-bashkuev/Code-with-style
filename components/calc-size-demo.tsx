"use client"

import { useState } from "react"
import { ComponentPreview } from "@/components/component-preview"

export function CalcSizeDemo() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [method, setMethod] = useState<"calc-size" | "max-height" | "js">("calc-size")

  const faqs = [
    {
      q: "What is calc-size()?",
      a: "calc-size() is a new CSS function that lets you perform arithmetic on intrinsic size keywords like auto, min-content, max-content, and fit-content. This unlocks smooth CSS transitions to and from height: auto — something that was impossible in CSS before.",
    },
    {
      q: "Why couldn't we animate height: auto before?",
      a: "CSS transitions require the browser to interpolate between two concrete values. 'auto' is not a concrete value — it's computed at layout time. The browser had no way to tween between 0 and 'whatever auto resolves to'. calc-size() wraps auto in a form the transition engine can work with.",
    },
    {
      q: "How is this different from max-height hacks?",
      a: "The classic hack sets max-height to a large arbitrary value (e.g. 1000px) and transitions that. The problem: the transition duration is proportional to the max-height, not the real content height. A short accordion item with max-height: 1000px feels sluggish. calc-size() animates the real height — no guessing.",
    },
    {
      q: "What browsers support it?",
      a: "Chrome 129+ and Edge 129+ ship calc-size() today. Firefox and Safari are working on it. Use @supports (height: calc-size(auto, auto)) to feature-detect and provide a fallback.",
    },
    {
      q: "Can I use it for width too?",
      a: "Yes. calc-size() works on any property that accepts intrinsic sizes: height, width, min-height, max-height, and more. You can also do math: calc-size(auto, size + 2rem) to add extra space on top of the intrinsic size.",
    },
  ]

  return (
    <div className="mt-10 flex flex-col gap-12">
      <ComponentPreview
        title="calc-size()"
        description="Animate height: auto natively — no JavaScript, no max-height hacks."
        className="justify-center"
        code={`height: calc-size(auto, size);\ntransition: height 0.3s ease;`}
      >
        <div className="section-label">
          <h2>01 — Accordion with calc-size()</h2>
          <span className="badge badge-blue">Chrome 129+</span>
        </div>

        <div className="demo-wrap">
          <div className="controls">
            <label htmlFor="cs-method">technique used:</label>
            <select
              id="cs-method"
              value={method}
              onChange={(e) => setMethod(e.target.value as typeof method)}
            >
              <option value="calc-size">calc-size() ✨ (new)</option>
              <option value="max-height">max-height hack (old)</option>
              <option value="js">JavaScript height (old)</option>
            </select>
          </div>

          <div className="preview" style={{ overflowY: "auto" }}>
            <style>{`
              .cs-item { border-bottom: 1px solid #252525; }
              .cs-trigger {
                width: 100%;
                background: none;
                border: none;
                color: inherit;
                text-align: left;
                padding: 1rem 0;
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 0.95rem;
                font-weight: 500;
              }
              .cs-trigger:hover { color: #3b82f6; }
              .cs-chevron { transition: transform 0.3s ease; display: inline-block; }
              .cs-chevron.open { transform: rotate(180deg); }

              /* calc-size approach */
              .cs-body-calc {
                overflow: hidden;
                height: 0;
                transition: height 0.35s ease;
              }
              .cs-body-calc.open {
                height: calc-size(auto, size);
              }

              /* max-height hack approach */
              .cs-body-maxh {
                overflow: hidden;
                max-height: 0;
                transition: max-height 0.35s ease;
              }
              .cs-body-maxh.open {
                max-height: 400px;
              }

              .cs-body-inner { padding: 0 0 1rem; color: #aaa; font-size: 0.875rem; line-height: 1.65; }
            `}</style>

            <div style={{ maxWidth: 560 }}>
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i
                const bodyClass =
                  method === "max-height"
                    ? `cs-body-maxh${isOpen ? " open" : ""}`
                    : `cs-body-calc${isOpen ? " open" : ""}`

                return (
                  <div key={i} className="cs-item">
                    <button
                      className="cs-trigger"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                    >
                      {faq.q}
                      <span className={`cs-chevron${isOpen ? " open" : ""}`}>▾</span>
                    </button>
                    <div className={bodyClass}>
                      <div className="cs-body-inner">{faq.a}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="code-panel">
            <pre>
              <code>
                {method === "calc-size"
                  ? `.accordion-body {
  overflow: hidden;
  height: 0;
  transition: height 0.35s ease;
}
.accordion-body.open {
  /* ✨ animates to real content height */
  height: calc-size(auto, size);
}`
                  : method === "max-height"
                  ? `.accordion-body {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.35s ease;
}
.accordion-body.open {
  /* ⚠️ arbitrary guess — animation
     speed depends on this value,
     not the actual content height */
  max-height: 400px;
}`
                  : `// JavaScript approach
const body = document.querySelector('.accordion-body')
const height = body.scrollHeight

body.style.height = isOpen
  ? height + 'px'
  : '0'

// ⚠️ requires JS, ResizeObserver
// for dynamic content, layout shift risk`}
              </code>
            </pre>
          </div>
        </div>

        <div className="note">
          <span className="icon">⚠️</span>
          <span>
            Use{" "}
            <strong>@supports (height: calc-size(auto, auto))</strong> to
            detect support and fall back to the max-height technique for
            Firefox and Safari. The calc-size() function also works with{" "}
            <strong>interpolate-size: allow-keywords</strong> as an alternative
            opt-in mechanism.
          </span>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="calc-size() — math on intrinsic sizes"
        description="Add extra space on top of the intrinsic size with arithmetic."
        className="justify-center"
        code={`height: calc-size(auto, size + 2rem);`}
      >
        <div className="section-label">
          <h2>02 — Arithmetic on auto</h2>
          <span className="badge badge-blue">Chrome 129+</span>
        </div>

        <div className="demo-wrap">
          <div className="preview">
            <style>{`
              .cs2-box {
                background: #111;
                border: 1px solid #252525;
                border-radius: 8px;
                padding: 1rem;
                overflow: hidden;
                height: 48px;
                transition: height 0.4s ease;
                cursor: pointer;
                margin-bottom: 1rem;
              }
              .cs2-box:hover {
                /* auto + 2rem of breathing room */
                height: calc-size(auto, size + 2rem);
              }
              .cs2-box h3 { margin: 0 0 0.75rem; font-size: 0.95rem; }
              .cs2-box p { margin: 0; color: #aaa; font-size: 0.875rem; line-height: 1.6; }
              .cs2-hint { font-size: 0.75rem; color: #555; margin-bottom: 1rem; }
            `}</style>
            <p className="cs2-hint">Hover each card to expand ↓</p>
            {[
              { title: "calc-size(auto, size)", desc: "Resolves to the element's natural height — equivalent to height: auto but transition-friendly." },
              { title: "calc-size(auto, size + 2rem)", desc: "Natural height plus 2rem of extra padding. Useful when you want breathing room around content without hardcoding values." },
              { title: "calc-size(min-content, size * 1.5)", desc: "1.5× the minimum content size. Great for responsive expanding elements that adapt to content." },
            ].map((item) => (
              <div key={item.title} className="cs2-box">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="code-panel">
            <pre>
              <code>{`.card {
  height: 48px;        /* collapsed */
  overflow: hidden;
  transition: height 0.4s ease;
}
.card:hover {
  /* size = resolved auto height */
  height: calc-size(auto, size + 2rem);
}

/* Other valid expressions: */
height: calc-size(min-content, size * 1.5);
height: calc-size(max-content, size - 1rem);
height: calc-size(fit-content, size);`}</code>
            </pre>
          </div>
        </div>

        <div className="note">
          <span className="icon">💡</span>
          <span>
            The <strong>size</strong> keyword inside calc-size() refers to the
            resolved value of the first argument. Think of it as a variable that
            holds the computed intrinsic size — you can then do any math on top
            of it.
          </span>
        </div>
      </ComponentPreview>
    </div>
  )
}
