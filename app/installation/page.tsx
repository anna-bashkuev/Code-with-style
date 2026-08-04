import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { PageNav } from "@/components/page-nav"

export const metadata: Metadata = {
  title: "Installation",
}

export default function InstallationPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10 lg:py-14">
      <PageHeader
        eyebrow="Getting Started"
        title="Installation"
        description="Understand the project structure so you can extend it with your own component pages."
      />

      <div className="mt-10 flex flex-col gap-10">
        <Section title="Project structure">
          <pre className="overflow-x-auto rounded-lg border border-border bg-card p-4">
            <code className="font-mono text-foreground">{`app/
├─ layout.tsx            # Wraps every page in the shared shell
├─ page.tsx              # Overview
├─ installation/         # This page
└─ components/
   ├─ buttons/page.tsx
   ├─ cards/page.tsx
   └─ badges/page.tsx
components/
├─ site-shell.tsx        # Header + sidebar + footer
├─ site-header.tsx
├─ site-sidebar.tsx
├─ site-footer.tsx
├─ page-header.tsx       # Title block for a page
├─ page-nav.tsx          # Prev / next links
└─ component-preview.tsx # Preview + code panel
lib/
└─ site-config.ts        # Navigation + site metadata`}</code>
          </pre>
        </Section>

        <Section title="Adding a page">
          <p className="section-copy text-muted-foreground">
            Create a new route folder under{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
              app/components/
            </code>{" "}
            and compose it from the shared helpers:
          </p>
          <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-card p-4">
            <code className="font-mono text-foreground">{`import { PageHeader } from "@/components/page-header"
import { ComponentPreview } from "@/components/component-preview"
import { PageNav } from "@/components/page-nav"

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10 lg:py-14">
      <PageHeader title="Tooltip" description="..." />
      <ComponentPreview title="Default" code={"<Tooltip />"}>
        {/* your example */}
      </ComponentPreview>
      <PageNav />
    </div>
  )
}`}</code>
          </pre>
        </Section>

        <Section title="Registering navigation">
          <p className="section-copy text-muted-foreground">
            Add the page to{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
              navSections
            </code>{" "}
in{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
            </code>
            . That single edit updates the sidebar, mobile menu, and prev/next links.
          </p>
        </Section>

        <Section title="Theming">
          <p className="section-copy text-muted-foreground">
            All colors, fonts, and radii live as design tokens in{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
              app/globals.css
            </code>
            . Adjust the tokens under{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
              :root
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
              .dark
            </code>{" "}
            to rebrand the entire site at once.
          </p>
        </Section>
      </div>

      <PageNav />
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  )
}
