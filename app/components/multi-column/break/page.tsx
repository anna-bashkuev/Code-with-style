import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { BreakInside } from "@/components/BreakInside";
import { PageNav } from "@/components/page-nav";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Break Properties",
};

export default function BreakPropertiesPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Components"
        title="Break Properties"
        description="CSS Break Properties for Multi-Column Layout"
      />
      <BreakInside />
       <PageNav />
    </PageShell>
  );
}
