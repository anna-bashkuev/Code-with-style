import type { Metadata } from "next"
import { ArrowRight, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { PageNav } from "@/components/page-nav"
import { ComponentPreview } from "@/components/component-preview"

export const metadata: Metadata = {
  title: "Buttons",
}

export default function ButtonsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10 lg:py-14">
      <PageHeader
        eyebrow="Components"
        title="Buttons"
        description="Clickable actions with multiple variants and sizes, driven entirely by design tokens so they adapt to light and dark themes."
      />

      <div className="mt-10 flex flex-col gap-12">
        <ComponentPreview
          title="Variants"
          description="Communicate the importance of an action with the right variant."
          code={`<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`}
        >
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </ComponentPreview>

        <ComponentPreview
          title="Sizes"
          description="Four sizes to fit any layout density."
          code={`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>`}
        >
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </ComponentPreview>

        <ComponentPreview
          title="With icons"
          description="Pair a label with an icon, or use an icon-only button."
          code={`<Button>
  <Plus /> Create
</Button>
<Button variant="outline">
  Continue <ArrowRight />
</Button>
<Button variant="ghost" size="icon" aria-label="Delete">
  <Trash2 />
</Button>`}
        >
          <Button>
            <Plus /> Create
          </Button>
          <Button variant="outline">
            Continue <ArrowRight />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Delete">
            <Trash2 />
          </Button>
        </ComponentPreview>

        <ComponentPreview
          title="Disabled"
          description="Non-interactive state with reduced opacity."
          code={`<Button disabled>Default</Button>
<Button variant="outline" disabled>Outline</Button>`}
        >
          <Button disabled>Default</Button>
          <Button variant="outline" disabled>
            Outline
          </Button>
        </ComponentPreview>
      </div>

      <PageNav />
    </div>
  )
}
