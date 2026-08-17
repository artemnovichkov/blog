"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"
import { postSlugFromPath, track } from "@/lib/analytics"

interface AdBlockProps {
  title: string
  description: string
  url: string
  isVisible?: boolean
  /** Distinguishes the slot under the header from inline placements in MDX. */
  slot?: string
}

/** Half the block on screen for a full second. Rendering is not a view. */
const visibleRatio = 0.5
const dwellMs = 1000

/** Lets a sponsor reconcile the traffic we report against their own numbers. */
const withUtm = (url: string, slug: string): string => {
  try {
    const target = new URL(url)
    target.searchParams.set("utm_source", "artemnovichkov")
    target.searchParams.set("utm_medium", "blog")
    if (slug) target.searchParams.set("utm_campaign", slug)
    return target.toString()
  } catch {
    return url
  }
}

const AdBlock = ({
  title,
  description,
  url,
  isVisible = true,
  slot = "inline",
}: AdBlockProps) => {
  const blockRef = useRef<HTMLDivElement>(null)
  // usePathname rather than window.location: this runs during render, and the
  // slug ends up in an href that has to match between server and client.
  const slug = postSlugFromPath(usePathname())

  useEffect(() => {
    const element = blockRef.current
    if (!element) return

    let timer: ReturnType<typeof setTimeout> | undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          clearTimeout(timer)
          timer = undefined
          return
        }

        timer = setTimeout(() => {
          track("ad_impression", { sponsor: title, slot, slug })
          // One impression per page view: viewability is a rate over views,
          // not a count of scroll passes.
          observer.disconnect()
        }, dwellMs)
      },
      { threshold: visibleRatio }
    )

    observer.observe(element)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [title, slot, slug])

  if (!isVisible) {
    return null
  }

  return (
    <div
      ref={blockRef}
      className="ad-block not-prose my-6 rounded-md border border-accent/25 bg-accent/10 p-4 dark:border-accent/35 dark:bg-accent/15"
    >
      <div className="flex items-start gap-3">
        <span className="text-xl">📢</span>
        <div className="flex flex-col gap-2">
          <p className="text-gray-600 text-sm dark:text-gray-400">Sponsored</p>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{description}</p>
          <a
            href={withUtm(url, slug)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            data-analytics-event="ad_click"
            data-analytics-prop-sponsor={title}
            data-analytics-prop-slot={slot}
            data-analytics-prop-slug={slug}
            className="mt-2 inline-block w-fit rounded-md bg-accent px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-accent/85"
          >
            Learn More →
          </a>
        </div>
      </div>
    </div>
  )
}

export default AdBlock
