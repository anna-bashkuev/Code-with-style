import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { PageNav } from "@/components/page-nav"
import { PageShell } from "@/components/page-shell"
import { ComponentPreview } from "@/components/component-preview"
import styles from "@/components/switch-demo.module.css"

export const metadata: Metadata = {
  title: "Switch",
}

const cssSource = `/* The label wraps the checkbox and its text */
.switch {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

/* Strip the native look so we can draw our own track */
.switch input[type="checkbox"] {
  position: relative;
  appearance: none;
  width: 3rem;
  height: 1.6rem;
  border-radius: 999px;
  background: var(--muted);
  border: 1px solid var(--border);
  cursor: pointer;
}

/* The knob */
.switch input[type="checkbox"]::before {
  content: "";
  position: absolute;
  inset-block: 0.18rem;
  left: 0.18rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--foreground);
  transition: transform 0.25s ease;
}

/* Checked track */
.switch input[type="checkbox"]:checked {
  background: var(--neon);
  border-color: var(--neon);
}

/* Slide the knob across when checked */
.switch input[type="checkbox"]:checked::before {
  transform: translateX(1.4rem);
}

/* Keyboard focus outline */
.switch input[type="checkbox"]:focus-visible {
  outline: 2px solid var(--neon);
  outline-offset: 2px;
}

/* Non-interactive state */
.switch input[type="checkbox"]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}`

const statesHtml = `<label class="switch">
  <input type="checkbox" />
  <span>Off by default</span>
</label>
<label class="switch">
  <input type="checkbox" checked />
  <span>On by default</span>
</label>`

const settingsHtml = `<label class="switch">
  <input type="checkbox" checked />
  <span>Wi-Fi</span>
</label>
<label class="switch">
  <input type="checkbox" />
  <span>Bluetooth</span>
</label>
<label class="switch">
  <input type="checkbox" checked />
  <span>Airplane mode</span>
</label>`

const disabledHtml = `<label class="switch">
  <input type="checkbox" disabled />
  <span>Disabled off</span>
</label>
<label class="switch">
  <input type="checkbox" checked disabled />
  <span>Disabled on</span>
</label>`

export default function SwitchPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="CwS 1.0"
        title="Switch"
        description="A toggle switch built from a single native checkbox, styled entirely with modern CSS — appearance: none, a ::before knob, and the :checked and :focus-visible states. No JavaScript required."
      />

      <aside className="mt-8 flex gap-3 rounded-md border border-yellow-500/40 bg-yellow-500/10 p-4">
        <span aria-hidden="true" className="mt-0.5 text-yellow-500">
          {"//"}
        </span>
        <p className="text-sm leading-relaxed text-yellow-100/90">
          Heads up: there is now a native{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[color:var(--neon)]">
            switch
          </code>{" "}
          attribute for checkboxes —{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">
            {'<input type="checkbox" switch />'}
          </code>{" "}
          renders a real toggle with no custom CSS. It is not yet{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#switch"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-[color:var(--neon)]"
          >
            Baseline
          </a>
          , so check current browser support before using it in production. The examples below use the CSS approach, which works everywhere today.
        </p>
      </aside>

      <div className="mt-10 flex flex-col gap-12">
        <ComponentPreview
          title="States"
          description="The switch reflects its checked state with a neon track and a sliding knob."
          html={statesHtml}
          css={cssSource}
        >
          <div className={styles.group}>
            <label className={styles.switch}>
              <input type="checkbox" className={styles.input} />
              <span className={styles.label}>Off by default</span>
            </label>
            <label className={styles.switch}>
              <input type="checkbox" className={styles.input} defaultChecked />
              <span className={styles.label}>On by default</span>
            </label>
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Settings list"
          description="Switches line up naturally beside their labels for a settings-style layout."
          html={settingsHtml}
          css={cssSource}
        >
          <div className={styles.group}>
            <label className={styles.switch}>
              <input type="checkbox" className={styles.input} defaultChecked />
              <span className={styles.label}>Wi-Fi</span>
            </label>
            <label className={styles.switch}>
              <input type="checkbox" className={styles.input} />
              <span className={styles.label}>Bluetooth</span>
            </label>
            <label className={styles.switch}>
              <input type="checkbox" className={styles.input} defaultChecked />
              <span className={styles.label}>Airplane mode</span>
            </label>
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Disabled"
          description="Non-interactive states use reduced opacity while keeping the on/off distinction."
          html={disabledHtml}
          css={cssSource}
        >
          <div className={styles.group}>
            <label className={styles.switch}>
              <input type="checkbox" className={styles.input} disabled />
              <span className={styles.label}>Disabled off</span>
            </label>
            <label className={styles.switch}>
              <input type="checkbox" className={styles.input} defaultChecked disabled />
              <span className={styles.label}>Disabled on</span>
            </label>
          </div>
        </ComponentPreview>
      </div>

      <PageNav />
    </PageShell>
  )
}
