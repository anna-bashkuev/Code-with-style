import Link from "next/link"
import { ArrowRight, Layers, Palette, Boxes, Compass } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { PageNav } from "@/components/page-nav"
import { cn } from "@/lib/utils"
import { siteConfig, navSections } from "@/lib/site-config"

const features = [
  {
    icon: Layers,
    title: "Shared layout",
    description:
      "Every page inherits the same header, sidebar, and footer. Write content — the shell is handled for you.",
  },
  {
    icon: Palette,
    title: "One visual identity",
    description:
      "Colors, fonts, and radii are driven by design tokens in globals.css. Change them once, update everywhere.",
  },
  {
    icon: Compass,
    title: "Effortless navigation",
    description:
      "The sidebar and prev/next links are generated from a single config file. No manual wiring.",
  },
  {
    icon: Boxes,
    title: "Preview + code",
    description:
      "Showcase each component in a clean canvas with a copy-ready code tab so consumers can grab the CSS.",
  },
]

export default function OverviewPage() {
  const componentCount = navSections.find((s) => s.title === "Components")?.items.length ?? 0

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 lg:py-20">
      <section className="flex flex-col gap-6">
        <span className="eyebrow inline-flex w-fit items-center gap-2 rounded-full border border-border bg-muted/50 px-3.5 py-1.5 text-muted-foreground">
          <span className="size-1.5 rounded-full bg-primary" />
          {siteConfig.version} · Boilerplate
        </span>
        <h1 className="page-title text-balance">
          Code with style. A Next.js V0 boilerplate for building some amazing things I want to share.
        </h1>
        <p className="hero-copy max-w-2xl text-muted-foreground text-pretty">
          {siteConfig.description}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/components/buttons"
            className={cn(buttonVariants({ size: "lg" }), "inline-flex")}
          >
            Browse components
            <ArrowRight />
          </Link>
          <Link
            href="/installation"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "inline-flex")}
          >
            How it works
          </Link>
        </div>
      </section>

      <section className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6"
          >
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <feature.icon className="size-5" />
            </span>
            <h2 className="card-title">{feature.title}</h2>
            <p className="card-copy text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="mt-14 rounded-xl border border-border bg-muted/30 p-6 sm:p-8">
        <h2 className="section-title">Add a component page in two steps</h2>
        <ol className="mt-4 flex flex-col gap-4">
          <li className="flex gap-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              1
            </span>
            <p className="section-copy text-muted-foreground">
              Create
              {" "}
              <code className="rounded bg-background px-1.5 py-0.5 text-foreground">
                app/components/your-component/page.tsx
              </code>
              {" "}
              and use the{" "}
              <span className="font-semibold text-foreground">PageHeader</span>
              {" "}
              and
              {" "}
              <span className="font-semibold text-foreground">ComponentPreview</span>
              {" "}
              helpers.
            </p>
          </li>
          <li className="flex gap-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              2
            </span>
            <p className="section-copy text-muted-foreground">
              Add an entry to
              {" "}
              <code className="rounded bg-background px-1.5 py-0.5 text-foreground">
                lib/site-config.ts
              </code>
              . The sidebar and prev/next navigation update automatically.
            </p>
          </li>
        </ol>
        <p className="page-copy mt-6 text-muted-foreground">
          There {componentCount === 1 ? "is" : "are"} currently{" "}
          <span className="font-semibold text-foreground">{componentCount}</span> example component{" "}
          {componentCount === 1 ? "page" : "pages"} to learn from.
        </p>
      </section>

      <PageNav />
    </div>
  )
}
