import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { BreakInside } from "@/components/BreakInside";
import { PageNav } from "@/components/page-nav";

export const metadata: Metadata = {
  title: "Break Properties",
};

export default function BreakPropertiesPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10 lg:py-14">
      <PageHeader
        eyebrow="Components"
        title="Break Properties"
        description="CSS Break Properties for Multi-Column Layout"
      />
      <BreakInside />
       <PageNav />
    </div>
  );
}
