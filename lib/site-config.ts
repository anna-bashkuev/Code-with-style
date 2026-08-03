export const siteConfig = {
  name: "Componentry",
  description:
    "A professional boilerplate for showcasing UI components. Add a page, register it in the nav, and it appears here with a shared header, sidebar, and footer.",
  version: "v1.0.0",
  repoUrl: "https://github.com",
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
  // {
  //   title: "Getting Started",
  //   items: [
  //     { title: "Overview", href: "/" },
  //     { title: "Installation", href: "/installation" },
  //   ],
  // },
  {
    title: "Components",
    items: [
      { title: "Multi-column cards", href: "/components/multi-column" },
      { title: "Break Properties", href: "/components/multi-column/break" },
      { title: "CSS Gap Rules", href: "/components/css-gap-rules/rule" },
      { title: "CSS Gap Repeat", href: "/components/css-gap-rules/repeat" },
      { title: "CSS Gap Break", href: "/components/css-gap-rules/rule-break" },
      { title: "CSS Gap Inset", href: "/components/css-gap-rules/inset" },
      { title: "CSS Gap Visibility", href: "/components/css-gap-rules/rule-visibility" },
     // { title: "CSS Gap Postcard", href: "/components/css-gap-rules/postcard" },
      { title: "CSS Gap Line Decoration", href: "/components/css-gap-rules/line-decoration" },
      // { title: "Subgrid", href: "/components/subgrid" },
      // { title: "Anchor Positioning", href: "/components/anchor-positioning" },
      // { title: "Masonry Layout", href: "/components/masonry" },
    ],
  },
];

/** Flat, ordered list of all pages — used for prev/next links. */
export const flatNav: NavItem[] = navSections.flatMap((section) => section.items)
