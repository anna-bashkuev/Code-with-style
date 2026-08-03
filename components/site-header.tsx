"use client"

import Link from "next/link"
import { GitBranch, Menu, Component } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

export function SiteHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <Menu />
        </Button>

        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Component className="size-4" />
          </span>
          <span className="site-title">{siteConfig.name}</span>
          <small className="hidden rounded-full border border-border px-2.5 py-1 text-muted-foreground sm:inline">
            {siteConfig.version}
          </small>
        </Link>

        <div className="ml-auto flex items-center gap-1">
          <a
            href={siteConfig.repoUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Source repository"
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "inline-flex")}
          >
            <GitBranch />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
