"use client"

import { useRef } from "react"
import styles from "./popover-demo.module.css"

type ShowPopoverWithSource = (options?: { source?: HTMLElement }) => void

export function HintTooltip({ id, label, hint }: { id: string; label: string; hint: string }) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const tipRef = useRef<HTMLDivElement>(null)

  function show() {
    const tip = tipRef.current
    const trigger = triggerRef.current
    if (!tip || !trigger || tip.matches(":popover-open")) return
    try {
      // `source` makes the trigger the implicit anchor for anchor positioning.
      ;(tip.showPopover as ShowPopoverWithSource)({ source: trigger })
    } catch {
      tip.showPopover()
    }
  }

  function hide() {
    const tip = tipRef.current
    if (tip?.matches(":popover-open")) tip.hidePopover()
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-describedby={id}
        onPointerEnter={show}
        onPointerLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {label}
      </button>
      <div ref={tipRef} id={id} popover="hint" role="tooltip" className={styles.tip}>
        {hint}
      </div>
    </>
  )
}
