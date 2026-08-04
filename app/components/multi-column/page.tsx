import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { MultiColumnCardsDemo } from "./multi-column-demo"
import { PageNav } from "@/components/page-nav"
import "./style.css"

export const metadata: Metadata = {
  title: "Multi-column cards",
}

export default function MultiColumnCardsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10 lg:py-14">
      <PageHeader
        eyebrow="Components"
        title="Multi-column cards"
        description="CSS Multi-Column Layout
Wrapping Features"
      />
      <MultiColumnCardsDemo />
       <PageNav />
    </div>
  );
}
