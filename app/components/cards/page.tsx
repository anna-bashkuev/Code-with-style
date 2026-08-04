import type { Metadata } from "next"
import { TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { PageNav } from "@/components/page-nav"
import { ComponentPreview } from "@/components/component-preview"

export const metadata: Metadata = {
  title: "Cards",
}

export default function CardsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10 lg:py-14">
      <PageHeader
        eyebrow="Components"
        title="Cards"
        description="Flexible containers for grouping related content, built with border, background, and radius tokens for a consistent surface."
      />

      <div className="mt-10 flex flex-col gap-12">
        <ComponentPreview
          title="Basic card"
          description="A titled surface with body content."
          className="justify-center"
          code={`<div className="w-full max-w-sm rounded-xl border border-border bg-card p-6">
  <h4 className="card-title">Project overview</h4>
  <p className="mt-1 card-copy text-muted-foreground">
    A quick summary of your current sprint.
  </p>
</div>`}
        >
          <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6">
            <h4 className="card-title">Project overview</h4>
            <p className="mt-1 card-copy text-muted-foreground">
              A quick summary of your current sprint and its progress.
            </p>
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Stat card"
          description="Highlight a single metric with supporting context."
          className="justify-center"
          code={`<div className="w-full max-w-xs rounded-xl border border-border bg-card p-6">
  <div className="flex items-center justify-between">
    <span className="note-text text-muted-foreground">Revenue</span>
    <TrendingUp className="size-4 text-primary" />
  </div>
  <p className="mt-2 text-[2rem] font-semibold">$48.2k</p>
  <p className="mt-1 note-text text-primary">+12.5% this month</p>
</div>`}
        >
          <div className="w-full max-w-xs rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <span className="note-text text-muted-foreground">Revenue</span>
              <TrendingUp className="size-4 text-primary" />
            </div>
            <p className="mt-2 text-[2rem] font-semibold">$48.2k</p>
            <p className="mt-1 note-text text-primary">+12.5% this month</p>
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Card with actions"
          description="A header, description, and a footer action area."
          className="justify-center"
          code={`<div className="w-full max-w-sm rounded-xl border border-border bg-card">
  <div className="p-6">
    <h4 className="card-title">Upgrade to Pro</h4>
    <p className="mt-1 card-copy text-muted-foreground">
      Unlock unlimited projects and priority support.
    </p>
  </div>
  <div className="flex gap-2 border-t border-border p-4">
    <Button size="sm">Upgrade</Button>
    <Button size="sm" variant="ghost">Maybe later</Button>
  </div>
</div>`}
        >
          <div className="w-full max-w-sm rounded-xl border border-border bg-card">
            <div className="p-6">
              <h4 className="card-title">Upgrade to Pro</h4>
              <p className="mt-1 card-copy text-muted-foreground">
                Unlock unlimited projects and priority support.
              </p>
            </div>
            <div className="flex gap-2 border-t border-border p-4">
              <Button size="sm">Upgrade</Button>
              <Button size="sm" variant="ghost">
                Maybe later
              </Button>
            </div>
          </div>
        </ComponentPreview>
      </div>

      <PageNav />
    </div>
  )
}
