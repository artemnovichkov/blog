import type { PostHog } from "posthog-js"

/**
 * The single entry point for analytics. Components never import posthog-js
 * directly, so swapping the backend or disabling tracking stays a one-file
 * change.
 */

export const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
/**
 * Events go straight to PostHog rather than through a first-party /ingest
 * rewrite: proxying made every event a billable Vercel edge request, and the
 * blog sits on the Hobby plan. The cost is that content blockers now drop some
 * events.
 */
export const posthogHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com"

/**
 * Local development shares the single production PostHog project, so dev
 * traffic would land next to real reader data. Set NEXT_PUBLIC_POSTHOG_DEBUG=1
 * in .env.local to opt a local session back in when verifying instrumentation.
 */
const isProductionBuild = process.env.NODE_ENV === "production"
const isAnalyticsDebug = process.env.NEXT_PUBLIC_POSTHOG_DEBUG === "1"

export type AnalyticsProps = Record<
  string,
  string | number | boolean | string[] | undefined
>

let client: PostHog | null = null

/**
 * posthog-js is imported dynamically, so events fired before it resolves would
 * be dropped — on a cold cache that silently loses post_view, which fires on
 * mount. They are buffered with their original timestamp instead. The cap keeps
 * a blocked or failed script from growing the queue without bound.
 */
type QueuedEvent = { event: string; props?: AnalyticsProps; timestamp: Date }
const queueLimit = 50
let queue: QueuedEvent[] = []

export function setAnalyticsClient(instance: PostHog | null): void {
  client = instance
  if (!instance) return

  const pending = queue
  queue = []

  for (const { event, props, timestamp } of pending) {
    instance.capture(event, props, { timestamp })
  }
}

/**
 * Honours Do Not Track and Global Privacy Control. posthog-js has its own
 * respect_dnt option, but checking here also keeps the library from loading.
 */
export function isTrackingAllowed(): boolean {
  if (typeof window === "undefined") return false
  if (!posthogKey) return false
  if (!isProductionBuild && !isAnalyticsDebug) return false

  const nav = window.navigator as Navigator & { globalPrivacyControl?: boolean }
  return nav.doNotTrack !== "1" && nav.globalPrivacyControl !== true
}

/** Buffered until the client loads, so callers never need to guard. */
export function track(event: string, props?: AnalyticsProps): void {
  if (client) {
    client.capture(event, props)
    return
  }

  if (!isTrackingAllowed() || queue.length >= queueLimit) return
  queue.push({ event, props, timestamp: new Date() })
}

/** Empty for anything that is not a /blog/[slug] path. */
export function postSlugFromPath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean)
  return segments.length === 2 && segments[0] === "blog" ? segments[1] : ""
}

/**
 * Slug of the post being read, for components rendered inside MDX that have no
 * way to receive it as a prop. Safe in event handlers and effects only — during
 * render use usePathname() with postSlugFromPath to avoid a hydration mismatch.
 */
export function currentPostSlug(): string {
  if (typeof window === "undefined") return ""

  return postSlugFromPath(window.location.pathname)
}
