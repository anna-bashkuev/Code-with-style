"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import styles from "./custom-select.module.css"

const OPTIONS = [
  "design",
  "prototype",
  "build",
  "develop",
  "debug",
  "ship",
  "create",
  "test",
  "optimize",
  "visualize",
  "transform",
  "scale",
  "learn",
  "teach",
  "inspire",
  "innovate",
  "collaborate",
  "prompt",
]

function Chevron() {
  return (
    <svg
      className={styles.chevron}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path className={styles.cTop} d="M7 9L12 4" strokeWidth="2" strokeLinecap="round" />
      <path className={styles.cTopLeft} d="M17 9L12 4" strokeWidth="2" strokeLinecap="round" />
      <path className={styles.cBottom} d="M7 15L12 20" strokeWidth="2" strokeLinecap="round" />
      <path className={styles.cBottomRight} d="M17 15L12 20" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function CustomSelect() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(2) // "build"

  const rootRef = useRef<HTMLSpanElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const scrollerRef = useRef<HTMLUListElement>(null)
  const optionRefs = useRef<Array<HTMLLIElement | null>>([])
  const rafRef = useRef<number | null>(null)
  const settleRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const listboxId = useId()

  /** Paint per-option distance from centre → drives opacity + blur via CSS. */
  const paint = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const rect = scroller.getBoundingClientRect()
    const center = rect.top + rect.height / 2
    let rowH = 1
    optionRefs.current.forEach((el, i) => {
      if (!el) return
      const r = el.getBoundingClientRect()
      if (i === 0) rowH = r.height || 1
      const c = r.top + r.height / 2
      const d = Math.abs(c - center) / rowH
      el.style.setProperty("--d", d.toFixed(3))
    })
  }, [])

  /** Scroll a given option to the vertical centre of the picker. */
  const centerOption = useCallback((index: number, smooth: boolean) => {
    const scroller = scrollerRef.current
    const el = optionRefs.current[index]
    if (!scroller || !el) return
    const target = el.offsetTop + el.offsetHeight / 2 - scroller.clientHeight / 2
    scroller.scrollTo({ top: target, behavior: smooth ? "smooth" : "auto" })
  }, [])

  /** When the picker opens, centre the current value and paint immediately. */
  useEffect(() => {
    if (!open) return
    const id = requestAnimationFrame(() => {
      centerOption(selected, false)
      paint()
    })
    return () => cancelAnimationFrame(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  /** Throttled scroll handler: repaint each frame, then pick the centred item. */
  const onScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(paint)

    if (settleRef.current) clearTimeout(settleRef.current)
    settleRef.current = setTimeout(() => {
      const scroller = scrollerRef.current
      if (!scroller) return
      const rect = scroller.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      let best = 0
      let bestD = Infinity
      optionRefs.current.forEach((el, i) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        const d = Math.abs(r.top + r.height / 2 - center)
        if (d < bestD) {
          bestD = d
          best = i
        }
      })
      setSelected(best)
    }, 120)
  }, [paint])

  /** Close on outside pointer / Escape. */
  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    window.addEventListener("pointerdown", onDown)
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  const move = useCallback(
    (delta: number) => {
      setSelected((s) => {
        const next = Math.min(OPTIONS.length - 1, Math.max(0, s + delta))
        if (open && next !== s) centerOption(next, true)
        return next
      })
    },
    [open, centerOption],
  )

  const onButtonKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        if (open) move(1)
        else setOpen(true)
        break
      case "ArrowUp":
        e.preventDefault()
        if (open) move(-1)
        else setOpen(true)
        break
      case "Enter":
      case " ":
        e.preventDefault()
        setOpen((o) => !o)
        break
    }
  }

  const chooseOption = (index: number) => {
    setSelected(index)
    centerOption(index, true)
    setOpen(false)
    buttonRef.current?.focus()
  }

  return (
    <div className={styles.stage}>
      <div className={styles.phrase}>
        <span className={styles.lead}>you</span>

        <span ref={rootRef} className={styles.select} data-open={open}>
          <button
            ref={buttonRef}
            type="button"
            className={styles.button}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={listboxId}
            onClick={() => setOpen((o) => !o)}
            onKeyDown={onButtonKeyDown}
          >
            <span className={styles.value}>{OPTIONS[selected]}</span>
            <Chevron />
          </button>

          <div className={styles.picker}>
            <ul
              ref={scrollerRef}
              id={listboxId}
              role="listbox"
              tabIndex={-1}
              aria-label="Choose an action"
              className={styles.scroller}
              onScroll={onScroll}
            >
              {OPTIONS.map((opt, i) => (
                <li
                  key={opt}
                  ref={(el) => {
                    optionRefs.current[i] = el
                  }}
                  role="option"
                  aria-selected={i === selected}
                  className={styles.option}
                  onClick={() => chooseOption(i)}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        </span>

        <span className={styles.trail}>things</span>
      </div>
    </div>
  )
}
