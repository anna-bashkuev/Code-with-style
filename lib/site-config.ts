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
  /** Full section title, e.g. "CwS 2.0 Popover API". */
  title: string
  /** Short version label used as an eyebrow, e.g. "CwS 2.0". */
  version: string
  /** URL slug for the section overview page, e.g. "cws-2". */
  slug: string
  /** One-line summary shown on the sidebar heading and overview page. */
  description: string
  items: NavItem[]
}

/**
 * The single source of truth for navigation.
 *
 * To add a new component page:
 *   1. Create `app/components/<slug>/page.tsx`
 *   2. Add an entry to the relevant section below.
 * The sidebar, mobile menu, prev/next navigation, and the section
 * overview pages at `/cws/<slug>` update automatically.
 */
export const navSections: NavSection[] = [
  {
    title: "CwS 1.0",
    version: "CwS 1.0",
    slug: "cws-1",
    description:
      "The starting point — foundational interactive elements styled entirely with modern CSS.",
    items: [
      { title: "Buttons", href: "/components/buttons" },
      { title: "Switch", href: "/components/switch" },
    ],
  },
  {
    title: "CwS 2.0 Popover API",
    version: "CwS 2.0",
    slug: "cws-2",
    description:
      "The native Popover API brings top-layer overlays, badges, and hints without a line of JavaScript.",
    items: [
      { title: "Example", href: "/components/badges" },
    ],
  },
  {
    title: "CwS 3.0 Performance",
    version: "CwS 3.0",
    slug: "cws-3",
    description:
      "Performance-minded CSS — from calc-size() transitions to content-visibility — that keeps interfaces fast.",
    items: [
      { title: "Example", href: "/components/calc-size" },
    ],
  },
  {
    title: "CwS 4.0 CSS Logic",
    version: "CwS 4.0",
    slug: "cws-4",
    description:
      "Logic in the stylesheet: style queries, conditional rules, and container-driven cards.",
    items: [
      { title: "Example", href: "/components/cards" },
    ],
  },
  {
    title: "CwS 5.0 Text",
    version: "CwS 5.0",
    slug: "cws-5",
    description:
      "Typography and text layout, including subgrid-aligned content and fine-grained flow control.",
    items: [
      { title: "Example", href: "/components/subgrid" },
    ],
  },
  {
    title: "CwS 6.0 CSS Layout",
    version: "CwS 6.0",
    slug: "cws-6",
    description:
      "The layout toolkit — multi-column flow, break control, and the new CSS gap decorations.",
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

/** Look up a section by its overview-page slug. */
export function getSectionBySlug(slug: string): NavSection | undefined {
  return navSections.find((section) => section.slug === slug)
}
