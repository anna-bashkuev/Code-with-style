export const siteConfig = {
  name: "Code with style",
  description:
    "Explore what modern CSS and HTML can do through interactive examples that let you change, test, and experience every feature for yourself.",
  version: "v1.0.1",
  repoUrl: "https://github.com/anna-bashkuev/Code-with-style",
}

export type NavItem = {
  title: string
  href: string
  /** Optional short label shown as a badge, e.g. "New". */
  label?: string
}

export type NavSection = {
  title: string
  items: NavItem[]
}

/**
 * The single source of truth for navigation.
 *
 * To add a new component page:
 *   1. Create `app/components/<slug>/page.tsx`
 *   2. Add an entry to the relevant section below.
 * The sidebar, mobile menu, and prev/next navigation update automatically.
 */
export const navSections: NavSection[] = [
  {
    title: "CwS 1.0",
    items: [
      { title: "Example", href: "/components/buttons" },
    ],
  },
  {
    title: "CwS 2.0 Popover API",
    items: [
      { title: "Example", href: "/components/badges" },
    ],
  },
  {
    title: "CwS 3.0 Performance",
    items: [
      { title: "Example", href: "/components/calc-size" },
    ],
  },
  {
    title: "CwS 4.0 CSS Logic",
    items: [
      { title: "Example", href: "/components/cards" },
    ],
  },
  {
    title: "CwS 5.0 Text",
    items: [
      { title: "Example", href: "/components/subgrid" },
    ],
  },
  {
    title: "CwS 6.0 CSS Layout",
    items: [
      { title: "Multi-column cards", href: "/components/multi-column" },
      { title: "Break Properties", href: "/components/multi-column/break" },
      { title: "CSS Gap Rules", href: "/components/css-gap-rules/rule" },
      { title: "CSS Gap Repeat", href: "/components/css-gap-rules/repeat" },
      { title: "CSS Gap Break", href: "/components/css-gap-rules/rule-break" },
      { title: "CSS Gap Inset", href: "/components/css-gap-rules/inset" },
      { title: "CSS Gap Visibility", href: "/components/css-gap-rules/rule-visibility" },
      { title: "CSS Gap Line Decoration", href: "/components/css-gap-rules/line-decoration" },
    ],
  },
]

/** Flat, ordered list of all pages — used for prev/next links. */
export const flatNav: NavItem[] = navSections.flatMap((section) => section.items)
