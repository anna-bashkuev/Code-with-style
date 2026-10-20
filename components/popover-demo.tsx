import { ChevronRight, X } from "lucide-react"
import styles from "./popover-demo.module.css"
import { HintTooltip } from "./popover-hint-tooltip"

export function AutoPopoverDemo() {
  return (
    <>
      <button type="button" className={styles.trigger} popoverTarget="pop-menu">
        Open menu
      </button>

      <div id="pop-menu" popover="auto" className={`${styles.surface} ${styles.menu}`}>
        <ul className={styles.menuList}>
          <li>
            <button type="button" className={styles.menuItem} popoverTarget="pop-menu" popoverTargetAction="hide">
              New file <span className={styles.kbd}>Ctrl+N</span>
            </button>
          </li>
          <li>
            <button type="button" className={styles.menuItem} popoverTarget="pop-menu" popoverTargetAction="hide">
              Duplicate <span className={styles.kbd}>Ctrl+D</span>
            </button>
          </li>
          <li>
            <button type="button" className={styles.menuItem} popoverTarget="pop-submenu">
              Share <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </li>
          <li aria-hidden="true" className={styles.separator} />
          <li>
            <button type="button" className={styles.menuItem} popoverTarget="pop-menu" popoverTargetAction="hide">
              Archive <span className={styles.kbd}>Ctrl+Del</span>
            </button>
          </li>
        </ul>
      </div>

      <div id="pop-submenu" popover="auto" className={`${styles.surface} ${styles.menu} ${styles.submenu}`}>
        <ul className={styles.menuList}>
          {["Copy link", "Email", "Embed"].map((label) => (
            <li key={label}>
              <button type="button" className={styles.menuItem} popoverTarget="pop-menu" popoverTargetAction="hide">
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export function ManualPopoverDemo() {
  return (
    <>
      <div className={styles.row}>
        <button
          type="button"
          className={`${styles.trigger} ${styles.triggerPrimary}`}
          popoverTarget="pop-toast"
          popoverTargetAction="show"
        >
          Show toast
        </button>
        <button type="button" className={styles.trigger} popoverTarget="pop-toast" popoverTargetAction="hide">
          Hide toast
        </button>
      </div>
      <p className={styles.note}>
        Click anywhere or press Escape — a <code className={styles.code}>manual</code> popover stays put until
        something explicitly hides it.
      </p>

      <div id="pop-toast" popover="manual" role="status" className={`${styles.surface} ${styles.toast}`}>
        <span className={styles.toastDot} aria-hidden="true" />
        <div className={styles.toastBody}>
          <span className={styles.toastTitle}>Changes saved</span>
          <span className={styles.toastText}>Your stylesheet was published to production.</span>
        </div>
        <button
          type="button"
          className={styles.iconButton}
          popoverTarget="pop-toast"
          popoverTargetAction="hide"
          aria-label="Dismiss notification"
        >
          <X className="size-4" />
        </button>
      </div>
    </>
  )
}

export function AnimatedPopoverDemo() {
  return (
    <>
      <button type="button" className={`${styles.trigger} ${styles.triggerPrimary}`} popoverTarget="pop-sheet">
        Open animated popover
      </button>

      <div
        id="pop-sheet"
        popover="auto"
        role="dialog"
        aria-labelledby="pop-sheet-title"
        className={`${styles.surface} ${styles.sheet}`}
      >
        <div className={styles.sheetHeader}>
          <h4 id="pop-sheet-title" className={styles.sheetTitle}>
            Animate in and out of the top layer
          </h4>
          <button
            type="button"
            className={styles.iconButton}
            popoverTarget="pop-sheet"
            popoverTargetAction="hide"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>
        <p className={styles.sheetText}>
          <code className={styles.code}>@starting-style</code> defines where the entry transition begins, while{" "}
          <code className={styles.code}>transition-behavior: allow-discrete</code> on{" "}
          <code className={styles.code}>display</code> and <code className={styles.code}>overlay</code> keeps the
          element in the top layer until the exit finishes.
        </p>
        <div className={styles.sheetActions}>
          <button type="button" className={styles.trigger} popoverTarget="pop-sheet" popoverTargetAction="hide">
            Got it
          </button>
        </div>
      </div>
    </>
  )
}

export function HintPopoverDemo() {
  return (
    <>
      <div className={styles.row}>
        <HintTooltip id="tip-bold" label="Bold" hint="Make the selected text bold (Ctrl+B)" />
        <HintTooltip id="tip-italic" label="Italic" hint="Italicise the selection (Ctrl+I)" />
        <HintTooltip id="tip-link" label="Link" hint="Wrap the selection in a hyperlink (Ctrl+K)" />
      </div>
      <p className={styles.note}>
        Hover or focus a button. <code className={styles.code}>hint</code> popovers don&apos;t close open{" "}
        <code className={styles.code}>auto</code> popovers, so tooltips can appear over a menu without dismissing it.
      </p>
    </>
  )
}
