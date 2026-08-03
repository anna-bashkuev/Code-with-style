"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navSections } from "@/lib/site-config"

export function SiteSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav aria-label="Component navigation" className="flex flex-col gap-6 p-4 lg:p-6">
      {navSections.map((section) => (
        <div key={section.title} className="flex flex-col gap-1.5">
          <h2 className="nav-section-title px-3 pb-1 text-muted-foreground">
            {section.title}
          </h2>
          <ul className="flex flex-col gap-0.5">
            {section.items.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "nav-link flex items-center justify-between rounded-md px-3.5 py-2.5 transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <span>{item.title}</span>
                    {item.label ? (
                      <small className="note-text rounded-full bg-primary/10 px-2.5 py-1 font-semibold uppercase tracking-wide text-primary">
                        {item.label}
                      </small>
                    ) : null}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
