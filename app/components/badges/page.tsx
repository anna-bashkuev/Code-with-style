import type { Metadata } from "next"
import { Check } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { PageNav } from "@/components/page-nav"
import { ComponentPreview } from "@/components/component-preview"

export const metadata: Metadata = {
  title: "Badges",
}

export default function BadgesPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10 lg:py-14">
      <PageHeader
        eyebrow="Components"
        title="Badges"
        description="Compact labels for statuses, categories, and counts. Each style is composed from theme tokens so contrast is preserved across themes."
      />

      <div className="mt-10 flex flex-col gap-12">
        <ComponentPreview
          title="Variants"
          description="Solid, soft, and outline treatments."
          code={`<span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 note-text font-medium text-primary-foreground">
  Solid
</span>
<span className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
  Soft
</span>
<span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-foreground">
  Outline
</span>
<span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
  Secondary
</span>`}
        >
          <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 note-text font-medium text-primary-foreground">
            Solid
          </span>
          <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 note-text font-medium text-accent-foreground">
            Soft
          </span>
          <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 note-text font-medium text-foreground">
            Outline
          </span>
          <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 note-text font-medium text-secondary-foreground">
            Secondary
          </span>
        </ComponentPreview>

        <ComponentPreview
          title="Status"
          description="Use a leading dot to convey state at a glance."
          code={`<span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-0.5 note-text font-medium">
  <span className="size-1.5 rounded-full bg-primary" /> Active
</span>
<span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
  <span className="size-1.5 rounded-full bg-muted-foreground" /> Idle
</span>
<span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-destructive">
  <span className="size-1.5 rounded-full bg-destructive" /> Error
</span>`}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-0.5 note-text font-medium">
            <span className="size-1.5 rounded-full bg-primary" /> Active
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-0.5 note-text font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-muted-foreground" /> Idle
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-0.5 note-text font-medium text-destructive">
            <span className="size-1.5 rounded-full bg-destructive" /> Error
          </span>
        </ComponentPreview>

        <ComponentPreview
          title="With icon"
          description="Reinforce meaning with a small leading icon."
          code={`<span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 note-text font-medium text-accent-foreground">
  <Check className="size-3" /> Verified
</span>`}
        >
          <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 note-text font-medium text-accent-foreground">
            <Check className="size-3" /> Verified
          </span>
        </ComponentPreview>
      </div>

      <PageNav />
    </div>
  )
}
