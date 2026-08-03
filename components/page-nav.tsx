"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { flatNav } from "@/lib/site-config"

export function PageNav() {
  const pathname = usePathname()
  const index = flatNav.findIndex((item) => item.href === pathname)
  if (index === -1) return null

  const prev = index > 0 ? flatNav[index - 1] : null
  const next = index < flatNav.length - 1 ? flatNav[index + 1] : null

  return (
    <div className="mt-14 grid grid-cols-1 gap-5 border-t border-border pt-10 sm:grid-cols-2">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col gap-1.5 rounded-lg border border-border p-5 transition-colors hover:border-primary/40 hover:bg-muted"
        >
          <span className="note-text flex items-center gap-1.5 text-muted-foreground">
            <ArrowLeft className="size-4" />
            Previous
          </span>
          <span className="nav-title text-foreground group-hover:text-primary">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col items-end gap-1.5 rounded-lg border border-border p-5 text-right transition-colors hover:border-primary/40 hover:bg-muted sm:col-start-2"
        >
          <span className="note-text flex items-center gap-1.5 text-muted-foreground">
            Next
            <ArrowRight className="size-4" />
          </span>
          <span className="nav-title text-foreground group-hover:text-primary">{next.title}</span>
        </Link>
      ) : null}
    </div>
  )
}
