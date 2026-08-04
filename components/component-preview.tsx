"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ComponentPreviewProps = {
  title: string
  description?: string
  /** The rendered example. */
  children: React.ReactNode
  /** The source shown under the "Code" tab. */
  code?: string
  /** Extra classes for the preview canvas (e.g. layout of examples). */
  className?: string
}

export function ComponentPreview({
  title,
  description,
  children,
  code,
  className,
}: ComponentPreviewProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview")
  const [copied, setCopied] = useState(false)

  async function copy() {
    if (!code) return
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <h3 className="card-title">{title}</h3>
        {description ? <p className="component-description text-muted-foreground">{description}</p> : null}
      </div>

      <div className="overflow-hidden rounded-xl border border-border">
        {code ? (
          <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-2.5 py-2">
            <TabButton active={tab === "preview"} onClick={() => setTab("preview")}>
              Preview
            </TabButton>
            <TabButton active={tab === "code"} onClick={() => setTab("code")}>
              Code
            </TabButton>
            {tab === "code" ? (
              <Button
                variant="ghost"
                size="icon-sm"
                className="ml-auto"
                onClick={copy}
                aria-label="Copy code"
              >
                {copied ? <Check /> : <Copy />}
              </Button>
            ) : null}
          </div>
        ) : null}

        {tab === "preview" || !code ? (
          <div
            className={cn(
              "flex min-h-48 flex-col flex-wrap items-center gap-4 bg-card p-10",
              className,
            )}
          >
            {children}
          </div>
        ) : (
          <pre className="overflow-x-auto bg-card p-5">
            <code className="font-mono text-foreground">{code}</code>
          </pre>
        )}
      </div>
    </section>
  )
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md px-3.5 py-1.5 text-[0.95rem] font-medium transition-colors",
        active ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  )
}
