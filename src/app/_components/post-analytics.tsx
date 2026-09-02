"use client"

import { useEffect, useRef } from "react"
import { track } from "@/lib/analytics"

const contentSelector = "[data-post-content]"
const milestones = [25, 50, 75, 90] as const

type PostAnalyticsProps = {
  slug: string
  categories: string[]
  readingTimeMinutes: number
  wordCount: number
  publishedAt: string
}

const dayInMs = 86_400_000

/** Derived on the client: pages are statically generated, so a build-time age
 * would be frozen at deploy. */
const ageInDays = (publishedAt: string): number => {
  const published = new Date(publishedAt).getTime()
  if (Number.isNaN(published)) return -1

  return Math.max(0, Math.floor((Date.now() - published) / dayInMs))
}

/** Groups the read_end reports that belong to the same read. */
const readIdentifier = (): string => {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID()
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
}

/**
 * Read-depth and in-content link tracking for a single post. Mounted once per
 * post page and keyed by slug, so navigating between posts restarts the timers.
 */
export default function PostAnalytics({
  slug,
  categories,
  readingTimeMinutes,
  wordCount,
  publishedAt,
}: PostAnalyticsProps) {
  // A primitive keeps the effect from re-running on every render: the parent
  // hands over a fresh array each time.
  const categoriesKey = categories.join(",")

  // Strict Mode runs the effect twice in development, which would report two
  // views and a read that ended before the first scroll. The component is
  // keyed by slug, so both refs describe exactly one post's read.
  const viewTracked = useRef(false)
  const pendingEnd = useRef(0)

  useEffect(() => {
    // A remount cancels the read-end its own cleanup just queued, so the read
    // carries on instead of being cut short one tick after it started.
    if (pendingEnd.current !== 0) {
      window.clearTimeout(pendingEnd.current)
      pendingEnd.current = 0
    }

    const content = document.querySelector<HTMLElement>(contentSelector)
    if (!content) return

    const base = {
      slug,
      categories: categoriesKey ? categoriesKey.split(",") : [],
      reading_time_min: readingTimeMinutes,
      word_count: wordCount,
      published_at: publishedAt,
      post_age_days: ageInDays(publishedAt),
    }

    if (!viewTracked.current) {
      viewTracked.current = true
      track("post_view", base)
    }

    const startedAt = Date.now()
    // One read can be reported more than once: the reader tabs away, the read
    // is reported, then they come back and finish it. Every report carries the
    // same read_id so analytics can collapse them into a single read.
    const readId = readIdentifier()
    const reached = new Set<number>()
    let maxScrollPct = 0
    // Only time with the tab actually visible counts, otherwise a forgotten
    // background tab looks like a deeply engaged reader.
    let activeMs = 0
    let activeSince = document.visibilityState === "visible" ? Date.now() : 0
    let ended = false
    let reportIndex = 0
    let lastReport = ""
    let frame = 0

    const activeSeconds = () => {
      const pending = activeSince === 0 ? 0 : Date.now() - activeSince
      return Math.round((activeMs + pending) / 1000)
    }

    // Progress is measured against the article body, not the document: the
    // footer and the read-next cards would otherwise cap everyone below 100%.
    const readProgress = () => {
      const rect = content.getBoundingClientRect()
      const scrolled = -rect.top + window.innerHeight
      const total = rect.height

      if (total <= 0) return 100
      return Math.min(Math.max((scrolled / total) * 100, 0), 100)
    }

    const measure = () => {
      frame = 0
      const progress = readProgress()
      maxScrollPct = Math.max(maxScrollPct, progress)

      for (const milestone of milestones) {
        if (progress < milestone || reached.has(milestone)) continue

        reached.add(milestone)
        track("post_scroll", {
          ...base,
          milestone,
          seconds_since_view: Math.round((Date.now() - startedAt) / 1000),
          active_seconds: activeSeconds(),
        })
      }
    }

    const requestMeasure = () => {
      if (frame === 0) frame = window.requestAnimationFrame(measure)
    }

    const end = () => {
      if (ended) return
      ended = true

      const report = {
        max_scroll_pct: Math.round(maxScrollPct),
        active_seconds: activeSeconds(),
        reached_end: reached.has(90),
      }

      // A tab flicked away and straight back adds nothing to the read, so it
      // should not add a row either.
      const signature = `${report.max_scroll_pct}:${report.active_seconds}:${report.reached_end}`
      if (signature === lastReport) return
      lastReport = signature

      track("post_read_end", {
        ...base,
        ...report,
        read_id: readId,
        report_index: reportIndex,
      })
      reportIndex += 1
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        activeSince = Date.now()
        // The reader came back, so the read is not over. Re-arming lets the
        // deeper scroll that follows be reported instead of being frozen at
        // whatever had been read when they first switched away.
        ended = false
        return
      }

      if (activeSince !== 0) {
        activeMs += Date.now() - activeSince
        activeSince = 0
      }

      // visibilitychange is the last event guaranteed to fire on mobile, so
      // the read is reported here rather than on pagehide alone.
      end()
    }

    const onClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return

      const link = target.closest("a")
      if (!link || !content.contains(link)) return

      const href = link.getAttribute("href")
      if (!href || href.startsWith("#")) return

      let url: URL
      try {
        url = new URL(href, window.location.href)
      } catch {
        return
      }

      const shared = {
        slug,
        link_text: link.textContent?.trim().slice(0, 100) || "",
        scroll_pct: Math.round(readProgress()),
      }

      if (url.origin === window.location.origin) {
        track("internal_link_click", {
          ...shared,
          from_slug: slug,
          to_path: url.pathname,
        })
        return
      }

      track("outbound_click", { ...shared, href: url.href, host: url.host })
    }

    measure()
    window.addEventListener("scroll", requestMeasure, { passive: true })
    window.addEventListener("resize", requestMeasure)
    document.addEventListener("visibilitychange", onVisibilityChange)
    window.addEventListener("pagehide", end)
    content.addEventListener("click", onClick)

    return () => {
      window.removeEventListener("scroll", requestMeasure)
      window.removeEventListener("resize", requestMeasure)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      window.removeEventListener("pagehide", end)
      content.removeEventListener("click", onClick)

      if (frame !== 0) window.cancelAnimationFrame(frame)

      // Deferred a tick so a Strict Mode remount can cancel it above. A real
      // unmount has nothing left to cancel it, so the read still reports.
      pendingEnd.current = window.setTimeout(end, 0)
    }
  }, [slug, categoriesKey, readingTimeMinutes, wordCount, publishedAt])

  return null
}
