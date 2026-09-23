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
  /** HTML markup shown under the "Code" tab's HTML sub-tab. */
  html?: string
  /** CSS shown under the "Code" tab's CSS sub-tab. */
  css?: string
  /** Extra classes for the preview canvas (e.g. layout of examples). */
  className?: string
}

export function ComponentPreview({
  title,
  description,
  children,
  code,
  html,
  css,
  className,
}: ComponentPreviewProps) {
  const languages = [
    html !== undefined ? ({ key: "html", label: "HTML", source: html } as const) : null,
    css !== undefined ? ({ key: "css", label: "CSS", source: css } as const) : null,
    css === undefined && html === undefined && code !== undefined
      ? ({ key: "code", label: "Code", source: code } as const)
      : null,
  ].filter((entry): entry is { key: string; label: string; source: string } => entry !== null)

  const hasCode = languages.length > 0

  const [tab, setTab] = useState<"preview" | "code">("preview")
  const [lang, setLang] = useState(languages[0]?.key ?? "")
  const [copied, setCopied] = useState(false)

  const activeSource =
    languages.find((entry) => entry.key === lang)?.source ?? languages[0]?.source ?? ""

  async function copy() {
    if (!activeSource) return
    try {
      await navigator.clipboard.writeText(activeSource)
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
        {hasCode ? (
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

        {tab === "preview" || !hasCode ? (
          <div
            className={cn(
              "flex min-h-48 flex-col flex-wrap items-center gap-4 bg-card p-10",
              className,
            )}
          >
            {children}
          </div>
        ) : (
          <div className="flex flex-col bg-card">
            {languages.length > 1 ? (
              <div className="flex items-center gap-1.5 border-b border-border px-2.5 py-2">
                {languages.map((entry) => (
                  <TabButton
                    key={entry.key}
                    active={lang === entry.key}
                    onClick={() => setLang(entry.key)}
                  >
                    {entry.label}
                  </TabButton>
                ))}
              </div>
            ) : null}
            <pre className="overflow-x-auto p-5">
              <code className="font-mono text-foreground">{activeSource}</code>
            </pre>
          </div>
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
