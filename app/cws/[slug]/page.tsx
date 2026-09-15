import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { navSections, getSectionBySlug } from "@/lib/site-config"

export function generateStaticParams() {
  return navSections.map((section) => ({ slug: section.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const section = getSectionBySlug(slug)
  if (!section) return {}
  return {
    title: section.title,
    description: section.description,
  }
}

export default async function CwsOverviewPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const section = getSectionBySlug(slug)
  if (!section) notFound()

  const currentIndex = navSections.findIndex((s) => s.slug === section.slug)
  const prevSection = currentIndex > 0 ? navSections[currentIndex - 1] : null
  const nextSection =
    currentIndex < navSections.length - 1 ? navSections[currentIndex + 1] : null

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 lg:py-14">
      <PageHeader
        eyebrow={section.version}
        title={section.title}
        description={section.description}
      />

      <section className="mt-10 flex flex-col gap-4">
        <h2 className="section-title">
          {section.items.length === 1 ? "Example" : "Examples"} in this release
        </h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {section.items.map((item, index) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="neon-link group flex h-full flex-col gap-2 rounded-xl border border-border bg-card p-6 transition-colors hover:bg-muted"
              >
                <span className="note-text text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="card-title flex items-center justify-between gap-2 text-foreground group-hover:text-primary">
                  {item.title}
                  <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <nav
        aria-label="Release navigation"
        className="mt-14 grid grid-cols-1 gap-5 border-t border-border pt-10 sm:grid-cols-2"
      >
        {prevSection ? (
          <Link
            href={`/cws/${prevSection.slug}`}
            className="neon-link group flex flex-col gap-1.5 rounded-lg border border-border p-5 transition-colors hover:bg-muted"
          >
            <span className="note-text flex items-center gap-1.5 text-muted-foreground">
              <ArrowLeft className="size-4" />
              Previous release
            </span>
            <span className="nav-title text-foreground group-hover:text-primary">
              {prevSection.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {nextSection ? (
          <Link
            href={`/cws/${nextSection.slug}`}
            className="neon-link group flex flex-col items-end gap-1.5 rounded-lg border border-border p-5 text-right transition-colors hover:bg-muted sm:col-start-2"
          >
            <span className="note-text flex items-center gap-1.5 text-muted-foreground">
              Next release
              <ArrowRight className="size-4" />
            </span>
            <span className="nav-title text-foreground group-hover:text-primary">
              {nextSection.title}
            </span>
          </Link>
        ) : null}
      </nav>
    </div>
  )
}
