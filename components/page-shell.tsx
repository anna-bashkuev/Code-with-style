import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * The single wrapper every route uses so pages share one max width,
 * horizontal padding, and vertical rhythm. Width is governed by the
 * `.page-shell` rule (`--page-max`) in globals.css.
 */
export function PageShell({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return <div className={cn("page-shell", className)}>{children}</div>
}
