"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { track } from "@/lib/analytics"
import AppStoreButton from "./app-store-button"

export interface AppAd {
  slug: string
  name: string
  tagline: string
  description: string
  icon: string
  /** The app's App Store page, where the button goes. */
  storeUrl: string
}

interface AppAdBlockProps {
  app: AppAd
  /** Which post the block was shown in, so clicks can be read per post. */
  slug: string
  /** Distinguishes placements, the way the sponsor block does. */
  placement?: string
}

/** Half the block on screen for a full second. Rendering is not a view. */
const visibleRatio = 0.5
const dwellMs = 1000

const AppAdBlock = ({
  app,
  slug,
  placement = "post_header",
}: AppAdBlockProps) => {
  const blockRef = useRef<HTMLDivElement>(null)

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
          track("app_ad_impression", { app: app.slug, placement, slug })
          // One impression per page view, matching the sponsor block.
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
  }, [app.slug, placement, slug])

  return (
    <div
      ref={blockRef}
      className="app-ad-block not-prose my-6 rounded-md border border-accent/25 bg-accent/10 p-4 dark:border-accent/35 dark:bg-accent/15"
    >
      <div className="flex items-start gap-3">
        <Image
          src={app.icon}
          alt=""
          width={56}
          height={56}
          className="shrink-0 rounded-[22%]"
        />
        <div className="flex flex-col gap-2">
          <p className="text-gray-600 text-sm dark:text-gray-400">
            App by the author
          </p>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {app.name} — {app.tagline}
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{app.description}</p>
          <div className="mt-2">
            <AppStoreButton
              href={app.storeUrl}
              app={app.slug}
              placement={placement}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppAdBlock
