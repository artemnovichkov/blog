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
  /** Square icon; pages round the corners. */
  icon: string
  hero: AppImage
  /** Short facts under the hero, e.g. price model or platform. */
  facts: string[]
  sections: AppSection[]
}

export type AppImage = {
  src: string
  alt: string
  width: number
  height: number
}

/** One block of the promo page: a pitch next to its screenshots. */
export type AppSection = {
  title: string
  body: string
  /** Shown as is, and as the fallback when the section plays a scene. */
  images: AppImage[]
  /**
   * A foldable that unfolds as the page scrolls: the inner screen split at
   * the hinge, and the outer screen on the back of the left half.
   */
  unfold?: {
    left: string
    right: string
    back: string
    /**
     * Path prefixes of the folding screens' pictures without the frame
     * (`-screen`, `-blur1`, `-blur2` WebP), for the look iPhone Duo gives a
     * half while it folds.
     */
    leftLayers: string
    backLayers: string
    /**
     * Where each folding screen sits in its half, as fractions of the half:
     * left, top, right, bottom, then corner radii from top left clockwise,
     * as fractions of the half's width.
     */
    leftScreen: number[]
    backScreen: number[]
    width: number
    height: number
    alt: string
  }
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
    icon: "/apps/nardy/icon.png",
    hero: {
      src: "/apps/nardy/duo-open.webp",
      alt: "Nardy on an unfolded iPhone Duo: a walnut backgammon board with the fold as the bar",
      width: 1600,
      height: 1162,
    },
    facts: ["iPhone", "Made for iPhone Duo", "Free, one-time Pro"],
    sections: [
      {
        title: "Your foldable is a backgammon board",
        body: "Hold iPhone Duo half open, like a board on the table: the fold becomes the bar, and a snap of the hinge throws the dice. Close it, and the case closes too, with the inlaid lid on the outside.",
        images: [
          {
            src: "/apps/nardy/duo-closed.webp",
            alt: "Closed iPhone Duo showing the board's inlaid lid with Mount Ararat",
            width: 1200,
            height: 861,
          },
        ],
        unfold: {
          left: "/apps/nardy/duo-fold-left.webp",
          right: "/apps/nardy/duo-fold-right.webp",
          back: "/apps/nardy/duo-fold-back.webp",
          leftLayers: "/apps/nardy/duo-fold-left",
          backLayers: "/apps/nardy/duo-fold-back",
          leftScreen: [0.0762, 0.0525, 1, 0.9475, 0.1125, 0, 0, 0.1125],
          backScreen: [
            0.0262, 0.0473, 0.9325, 0.9544, 0.011, 0.111, 0.11, 0.01,
          ],
          width: 800,
          height: 1163,
          alt: "iPhone Duo unfolding from the inlaid lid with Mount Ararat into a walnut backgammon board, the fold as the bar",
        },
      },
      {
        title: "Two games, one board",
        body: "Long Narde, the classic of the Caucasus and Central Asia: no hitting, one checker holds a point, a race of blocks and patience. And Short Narde, the backgammon the world knows, with hitting, the bar and gammons. Rules are built in, and the board only lets you make legal moves.",
        images: [
          {
            src: "/apps/nardy/pro-classic.webp",
            alt: "Long Narde in progress on iPhone 17 Pro, walnut board with ivory and ebony checkers",
            width: 1200,
            height: 587,
          },
        ],
      },
      {
        title: "A rival with character",
        body: "Play a friend across one phone, or the computer at Easy, Medium or Hard. With Apple Intelligence, your opponent picks its move in character and has something to say about it, all on device. Stuck? Ask for a hint and see the best play.",
        images: [],
      },
      {
        title: "Tables for every mood",
        body: "Walnut, bone and ebony with inlaid rosettes, or Yerevan's apricot and pomegranate, or neon after midnight. Boards, checkers and dice mix freely, and the app icon can match.",
        images: [
          {
            src: "/apps/nardy/pro-yerevan.webp",
            alt: "Yerevan theme: apricot and pomegranate board with red dice",
            width: 1200,
            height: 587,
          },
          {
            src: "/apps/nardy/pro-neon.webp",
            alt: "Neon theme: magenta and cyan points on a dark grid",
            width: 1200,
            height: 587,
          },
        ],
      },
      {
        title: "Grow as a player",
        body: "Earn XP every game and climb from Novice to Grandmaster, keep a daily streak, and unlock 28 achievements, also in Game Center. Stats for each game track your win rate, gammons, fastest win and biggest comeback.",
        images: [
          {
            src: "/apps/nardy/pro-stats.webp",
            alt: "Stats screen: level, games played, won and win rate",
            width: 1200,
            height: 587,
          },
          {
            src: "/apps/nardy/pro-awards.webp",
            alt: "Awards screen with unlocked achievements",
            width: 1200,
            height: 587,
          },
        ],
      },
      {
        title: "Nardy Pro",
        body: "One purchase, no subscription: the Hard opponent, unlimited hints, Pro table themes and app icons.",
        images: [],
      },
    ],
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
