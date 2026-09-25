"use client"

import { useEffect, useRef } from "react"
import styles from "@/components/infinite-cards.module.css"

/**
 * Infinite scrolling cards — no animation library. A CSS scroll-snap track
 * does the snapping, momentum, and easing; a little vanilla JS makes the loop
 * seamless (jump by one set when you reach a clone) and scales the card nearest
 * the center. Prev/Next just call scrollBy on the same container.
 *
 * Spiritual port of https://codepen.io/GreenSock/pen/LYRwgPo, rebuilt with
 * platform primitives instead of GSAP + ScrollTrigger.
 */
const FACES = [
  { n: "01", label: "snap" },
  { n: "02", label: "loop" },
  { n: "03", label: "center" },
  { n: "04", label: "scrub" },
  { n: "05", label: "wrap" },
]

// Three copies so there's always a full set of clones on either side of the
// "real" middle set — that's what lets the wrap read as continuous.
const SETS = 3
const CARDS = Array.from({ length: SETS }, () => FACES).flat()

export function InfiniteCards() {
  const trackRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const items = Array.from(track.querySelectorAll<HTMLElement>("li"))
    if (items.length === 0) return

    // One "set" is the width of the original, un-cloned cards.
    const setWidth = () => track.scrollWidth / SETS

    // Start in the middle set so there's room to wrap both directions.
    const recenter = () => {
      track.scrollLeft = setWidth()
    }
    recenter()

    let frame = 0
    const update = () => {
      frame = 0
      const set = setWidth()

      // Seamless wrap: when we drift into an outer set, jump back by exactly
      // one set. Distances are identical, so the snapped card never moves.
      if (track.scrollLeft < set * 0.5) {
        track.scrollLeft += set
      } else if (track.scrollLeft > set * 1.5) {
        track.scrollLeft -= set
      }

      // Scale + light up whichever card is closest to the horizontal center.
      const center = track.scrollLeft + track.clientWidth / 2
      for (const item of items) {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2
        const dist = Math.abs(center - itemCenter)
        const proximity = Math.max(0, 1 - dist / (item.offsetWidth * 1.6))
        const scale = 0.7 + proximity * 0.3
        item.style.setProperty("--scale", scale.toFixed(3))
        item.style.setProperty("--active", proximity.toFixed(3))
        item.style.zIndex = String(Math.round(proximity * 100))
      }
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const step = () => items[0].offsetWidth + 16 // card width + gap
    const onResize = () => {
      recenter()
      update()
    }

    track.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    update()

    const prev = track.parentElement?.querySelector<HTMLButtonElement>(`[data-dir="prev"]`)
    const next = track.parentElement?.querySelector<HTMLButtonElement>(`[data-dir="next"]`)
    const goPrev = () => track.scrollBy({ left: -step(), behavior: "smooth" })
    const goNext = () => track.scrollBy({ left: step(), behavior: "smooth" })
    prev?.addEventListener("click", goPrev)
    next?.addEventListener("click", goNext)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      track.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      prev?.removeEventListener("click", goPrev)
      next?.removeEventListener("click", goNext)
    }
  }, [])

  return (
    <div className={styles.wrap}>
      <p className={styles.hint}>Scroll sideways or use the arrows</p>
      <ul ref={trackRef} className={styles.track}>
        {CARDS.map((face, i) => (
          <li key={i} className={styles.card} style={{ ["--scale" as string]: "0.7" }}>
            <span className={styles.cardNumber}>{face.n}</span>
            <span className={styles.cardLabel}>{face.label}</span>
          </li>
        ))}
      </ul>
      <div className={styles.actions}>
        <button type="button" className={styles.button} data-dir="prev" aria-label="Previous card">
          Prev
        </button>
        <button type="button" className={styles.button} data-dir="next" aria-label="Next card">
          Next
        </button>
      </div>
    </div>
  )
}
