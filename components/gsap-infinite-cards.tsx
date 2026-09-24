"use client"

import { useEffect, useRef } from "react"
import styles from "@/components/gsap-infinite-cards.module.css"

/**
 * Infinite scrolling cards with a continuous, seamless snap — a faithful port
 * of https://codepen.io/GreenSock/pen/LYRwgPo built on GSAP + ScrollTrigger.
 *
 * The original pins the gallery and drives the loop from the window scroll.
 * To live politely inside a docs page, this version scopes ScrollTrigger to
 * its own scroll container, so scrolling the frame scrubs the loop without
 * hijacking the rest of the page. The Prev/Next buttons drive it too.
 */
const FACES = [
  { n: "01", label: "power3" },
  { n: "02", label: "yoyo" },
  { n: "03", label: "stagger" },
  { n: "04", label: "scrub" },
  { n: "05", label: "wrap" },
]

// Duplicated once so the loop always has cards entering from both sides.
const CARDS = [...FACES, ...FACES]

export function GsapInfiniteCards() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLUListElement>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const scroller = scrollerRef.current
    const gallery = galleryRef.current
    const cardsRoot = cardsRef.current
    const prevBtn = prevRef.current
    const nextBtn = nextRef.current
    if (!scroller || !gallery || !cardsRoot || !prevBtn || !nextBtn) return

    let cleanup = () => {}
    let cancelled = false

    // Load GSAP + ScrollTrigger on the client only.
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return
        gsap.registerPlugin(ScrollTrigger)

        // The original pen tags the trigger with an ad-hoc `wrapping` flag.
        type WrapTrigger = ScrollTrigger & { wrapping?: boolean }

        const ctx = gsap.context(() => {
          const cards = gsap.utils.toArray<HTMLElement>(cardsRoot.querySelectorAll("li"))

          let iteration = 0
          const spacing = 0.1
          const snap = gsap.utils.snap(spacing)

          const seamlessLoop = buildSeamlessLoop(cards, spacing)
          const scrub = gsap.to(seamlessLoop, {
            totalTime: 0,
            duration: 0.5,
            ease: "power3",
            paused: true,
          })

          const trigger = ScrollTrigger.create({
            scroller,
            start: 0,
            end: "+=3000",
            pin: gallery,
            onUpdate(self: WrapTrigger) {
              if (self.progress === 1 && self.direction > 0 && !self.wrapping) {
                wrapForward(self)
              } else if (self.progress < 1e-5 && self.direction < 0 && !self.wrapping) {
                wrapBackward(self)
              } else {
                scrub.vars.totalTime = snap(
                  (iteration + self.progress) * seamlessLoop.duration(),
                )
                scrub.invalidate().restart()
                self.wrapping = false
              }
            },
          })

          function wrapForward(self: WrapTrigger) {
            iteration++
            self.wrapping = true
            self.scroll(self.start + 1)
          }

          function wrapBackward(self: WrapTrigger) {
            iteration--
            if (iteration < 0) {
              iteration = 9
              seamlessLoop.totalTime(seamlessLoop.totalTime() + seamlessLoop.duration() * 10)
              scrub.pause()
            }
            self.wrapping = true
            self.scroll(self.end - 1)
          }

          function scrubTo(totalTime: number) {
            const progress =
              (totalTime - seamlessLoop.duration() * iteration) / seamlessLoop.duration()
            if (progress > 1) {
              wrapForward(trigger)
            } else if (progress < 0) {
              wrapBackward(trigger)
            } else {
              trigger.scroll(trigger.start + progress * (trigger.end - trigger.start))
            }
          }

          const onNext = () => scrubTo(scrub.vars.totalTime + spacing)
          const onPrev = () => scrubTo(scrub.vars.totalTime - spacing)
          nextBtn.addEventListener("click", onNext)
          prevBtn.addEventListener("click", onPrev)

          cleanup = () => {
            nextBtn.removeEventListener("click", onNext)
            prevBtn.removeEventListener("click", onPrev)
          }

          function buildSeamlessLoop(items: HTMLElement[], spacing: number) {
            const overlap = Math.ceil(1 / spacing)
            const startTime = items.length * spacing + 0.5
            const loopTime = (items.length + overlap) * spacing + 1
            const rawSequence = gsap.timeline({ paused: true })
            const loop = gsap.timeline({
              paused: true,
              repeat: -1,
              onRepeat(this: gsap.core.Timeline) {
                // Work around a rare edge-case bug (fixed in GSAP 3.6.1).
                const t = this as unknown as { _time: number; _dur: number; _tTime: number }
                if (t._time === t._dur) t._tTime += t._dur - 0.01
              },
            })
            const l = items.length + overlap * 2

            gsap.set(items, { xPercent: 400, opacity: 0, scale: 0 })

            for (let i = 0; i < l; i++) {
              const index = i % items.length
              const item = items[index]
              const time = i * spacing
              rawSequence
                .fromTo(
                  item,
                  { scale: 0, opacity: 0 },
                  {
                    scale: 1,
                    opacity: 1,
                    zIndex: 100,
                    duration: 0.5,
                    yoyo: true,
                    repeat: 1,
                    ease: "power1.in",
                    immediateRender: false,
                  },
                  time,
                )
                .fromTo(
                  item,
                  { xPercent: 400 },
                  { xPercent: -400, duration: 1, ease: "none", immediateRender: false },
                  time,
                )
              if (i <= items.length) loop.add("label" + i, time)
            }

            rawSequence.time(startTime)
            loop
              .to(rawSequence, { time: loopTime, duration: loopTime - startTime, ease: "none" })
              .fromTo(
                rawSequence,
                { time: overlap * spacing + 1 },
                {
                  time: startTime,
                  duration: startTime - (overlap * spacing + 1),
                  immediateRender: false,
                  ease: "none",
                },
              )
            return loop
          }
        }, scroller)

        cleanup = (() => {
          const inner = cleanup
          return () => {
            inner()
            ctx.revert()
          }
        })()
      },
    )

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  return (
    <div className={styles.wrap}>
      <div ref={scrollerRef} className={styles.scroller}>
        <div ref={galleryRef} className={styles.gallery}>
          <p className={styles.hint}>Scroll inside the frame</p>
          <ul ref={cardsRef} className={styles.cards}>
            {CARDS.map((face, i) => (
              <li key={i}>
                <span className={styles.cardNumber}>{face.n}</span>
                <span className={styles.cardLabel}>{face.label}</span>
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <button ref={prevRef} type="button" className={styles.button}>
              Prev
            </button>
            <button ref={nextRef} type="button" className={styles.button}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
