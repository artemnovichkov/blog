import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import matter from "gray-matter"

export type App = {
  slug: string
  name: string
  tagline: string
  description: string
  /** App Store Connect app ID; the store link is built from it. */
  appStoreId: string
  /**
   * The store page only exists once the app is out. Until then the link
   * would 404, so pages show "Coming soon" instead of the badge.
   */
  isLive: boolean
}

export type AppPage = {
  slug: string
  title: string
  description: string
  content: string
}

export const apps: App[] = [
  {
    slug: "nardy",
    name: "Nardy",
    tagline: "Backgammon & Long Narde",
    description:
      "Long Narde and classic backgammon for iPhone. Play a friend or a chatty AI, and on iPhone Duo the fold becomes the bar.",
    appStoreId: "6815637296",
    isLive: false,
  },
]

const appsDirectory = join(process.cwd(), "content", "apps")

export function getApp(slug: string): App | undefined {
  return apps.find((app) => app.slug === slug)
}

export function appStoreUrl(app: App): string {
  return `https://apps.apple.com/app/id${app.appStoreId}`
}

/** Support, privacy and similar pages, one MDX file each per app. */
export function getAppPageSlugs(app: string): string[] {
  const directory = join(appsDirectory, app)
  if (!existsSync(directory)) return []
  return readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
}

export function getAppPage(app: string, page: string): AppPage | undefined {
  const path = join(appsDirectory, app, `${page}.mdx`)
  if (!existsSync(path)) return undefined
  const { data, content } = matter(readFileSync(path, "utf8"))
  return {
    slug: page,
    title: data.title,
    description: data.description,
    content,
  }
}

export function getAllAppPages(): { app: string; page: string }[] {
  return apps.flatMap((app) =>
    getAppPageSlugs(app.slug).map((page) => ({ app: app.slug, page }))
  )
}
