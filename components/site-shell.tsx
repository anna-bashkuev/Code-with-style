"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteSidebar } from "@/components/site-sidebar"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader onMenuClick={() => setMobileOpen(true)} />

      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-border bg-sidebar lg:block">
          <SiteSidebar />
        </aside>

        {/* Mobile sidebar */}
        <div
          className={cn(
            "fixed inset-0 z-50 lg:hidden",
            mobileOpen ? "pointer-events-auto" : "pointer-events-none",
          )}
          aria-hidden={!mobileOpen}
        >
          <div
            className={cn(
              "absolute inset-0 bg-foreground/40 transition-opacity",
              mobileOpen ? "opacity-100" : "opacity-0",
            )}
            onClick={() => setMobileOpen(false)}
          />
          <div
            className={cn(
              "absolute left-0 top-0 h-full w-72 max-w-[80%] overflow-y-auto bg-sidebar shadow-xl transition-transform",
              mobileOpen ? "translate-x-0" : "-translate-x-full",
            )}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="nav-section-title">Navigation</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
              >
                <X />
              </Button>
            </div>
            <SiteSidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>

        {/* Main content */}
        <div className="flex min-w-0 flex-1 flex-col p-5">
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
