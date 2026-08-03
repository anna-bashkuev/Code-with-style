export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col gap-3.5 border-b border-border pb-8">
      {eyebrow ? (
        <span className="eyebrow text-primary">{eyebrow}</span>
      ) : null}
      <h1 className="page-title text-balance">{title}</h1>
      <p className="page-copy max-w-2xl text-muted-foreground text-pretty">
        {description}
      </p>
    </div>
  )
}
