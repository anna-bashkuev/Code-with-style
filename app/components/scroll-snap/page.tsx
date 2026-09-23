import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { PageNav } from "@/components/page-nav"
import { PageShell } from "@/components/page-shell"
import { ComponentPreview } from "@/components/component-preview"
import styles from "@/components/scroll-snap-demo.module.css"

export const metadata: Metadata = {
  title: "Scroll Snap",
}

const galleryCss = `/* The scroll container sets the snap axis + strictness */
.gallery {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding: 0.25rem;
}

/* Each child declares where it comes to rest */
.slide {
  scroll-snap-align: center;
  scroll-snap-stop: always;
  flex: 0 0 min(20rem, 80%);
  height: 14rem;
}`

const galleryHtml = `<div class="gallery">
  <div class="slide"><span>01</span><h3>Snap start</h3></div>
  <div class="slide"><span>02</span><h3>Snap center</h3></div>
  <div class="slide"><span>03</span><h3>Snap always</h3></div>
  <div class="slide"><span>04</span><h3>No JS</h3></div>
</div>`

const sectionCss = `/* A scrollable viewport that snaps to full panels */
.viewport {
  height: 22rem;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
}

/* Each panel fills the viewport and snaps to the top */
.panel {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  height: 22rem;
}`

const sectionHtml = `<div class="viewport">
  <section class="panel"><h3>First</h3></section>
  <section class="panel"><h3>Second</h3></section>
  <section class="panel"><h3>Third</h3></section>
</div>`

const slides = [
  {
    index: "01",
    title: "scroll-snap-type",
    text: "The container sets the axis and strictness: x mandatory forces a rest on every slide.",
  },
  {
    index: "02",
    title: "scroll-snap-align",
    text: "Each child decides where it lands — start, center, or end of the scrollport.",
  },
  {
    index: "03",
    title: "scroll-snap-stop",
    text: "always prevents fast flicks from skipping past a slide, one card at a time.",
  },
  {
    index: "04",
    title: "No JavaScript",
    text: "The browser handles the momentum, easing, and resting position for free.",
  },
]

const panels = [
  {
    kicker: "Panel 01",
    title: "Full-height snapping",
    text: "A vertical container with scroll-snap-type: y mandatory brings each section to rest at the top of the viewport.",
  },
  {
    kicker: "Panel 02",
    title: "One at a time",
    text: "scroll-snap-stop: always makes sure each panel gets its moment — a single scroll gesture advances exactly one panel.",
  },
  {
    kicker: "Panel 03",
    title: "Native and smooth",
    text: "Pair it with scroll-behavior: smooth and the browser does the rest. No libraries, no scroll listeners.",
  },
]

export default function ScrollSnapPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="CwS 1.0"
        title="Scroll Snap"
        description="CSS scroll snapping lets a scroll container lock onto its children as you scroll. The container declares scroll-snap-type, each child declares scroll-snap-align — and the browser handles the rest, with no JavaScript."
      />

      <div className="mt-10 flex flex-col gap-12">
        <ComponentPreview
          title="Horizontal gallery"
          description="Scroll or swipe sideways — the container snaps each card to center. Try a fast flick: scroll-snap-stop: always stops one card at a time."
          html={galleryHtml}
          css={galleryCss}
        >
          <div className={styles.gallery}>
            {slides.map((slide) => (
              <article key={slide.index} className={styles.slide}>
                <span className={styles.slideIndex}>{slide.index}</span>
                <h3 className={styles.slideTitle}>{slide.title}</h3>
                <p className={styles.slideText}>{slide.text}</p>
              </article>
            ))}
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Vertical section snap"
          description="Scroll inside the frame — each full-height panel snaps to the top of the viewport, the pattern behind full-page scrolling sites."
          html={sectionHtml}
          css={sectionCss}
        >
          <div className={styles.viewport}>
            {panels.map((panel) => (
              <section key={panel.kicker} className={styles.panel}>
                <span className={styles.panelKicker}>{panel.kicker}</span>
                <h3 className={styles.panelTitle}>{panel.title}</h3>
                <p className={styles.panelText}>{panel.text}</p>
              </section>
            ))}
            <p className={styles.hint} aria-hidden="true">
              Keep scrolling ↑↓
            </p>
          </div>
        </ComponentPreview>
      </div>

      <PageNav />
    </PageShell>
  )
}
