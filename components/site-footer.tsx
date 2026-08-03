import Link from "next/link"
import { siteConfig } from "@/lib/site-config"

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 px-6 py-10 text-muted-foreground sm:flex-row">
        <p className="text-balance text-center sm:text-left">
          {"Built with "}
          <span className="font-semibold text-foreground">{siteConfig.name}</span>
          {" — a component showcase boilerplate."}
        </p>
        <div className="flex items-center gap-4">
          <Link href="/" className="transition-colors hover:text-foreground">
            Overview
          </Link>
          <Link href="/installation" className="transition-colors hover:text-foreground">
            Docs
          </Link>
          <a
            href={siteConfig.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
