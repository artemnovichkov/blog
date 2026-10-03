"use client"

import Image from "next/image"
import { useSyncExternalStore } from "react"
import { primaryButtonClassName } from "./button-styles"

interface OpenInXcodeProps {
  /** GitHub repository in `owner/name` form. */
  repo: string
}

// Xcode only runs on a Mac. iPadOS also reports a Mac platform, but has touch.
const isMac = (): boolean => {
  const nav = navigator as Navigator & {
    userAgentData?: { platform?: string }
  }
  const platform = nav.userAgentData?.platform ?? nav.platform
  return /mac/i.test(platform) && nav.maxTouchPoints < 2
}

const subscribe = () => () => {}

// Xcode's handler takes the repository URL as is: a percent-encoded `repo`
// doesn't open the clone window.
const cloneUrl = (repo: string): string =>
  `xcode://clone?repo=https://github.com/${repo}`

const OpenInXcode = ({ repo }: OpenInXcodeProps) => {
  // The server renders nothing, so the card appears only after hydration.
  const isVisible = useSyncExternalStore(subscribe, isMac, () => false)

  if (!isVisible) {
    return null
  }

  return (
    <div className="not-prose my-6 flex flex-wrap items-center gap-4 rounded-md border border-gray-200 bg-gray-50 p-4 dark:border-gray-700/60 dark:bg-gray-800/40">
      <Image
        src="/images/xcode-icon.png"
        alt=""
        width={56}
        height={56}
        className="shrink-0"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="font-semibold text-gray-900 dark:text-white">
          Run the example in Xcode
        </p>
        <p className="truncate font-mono text-gray-500 text-sm dark:text-gray-400">
          {repo}
        </p>
      </div>
      <a
        href={cloneUrl(repo)}
        data-analytics-event="xcode_clone_click"
        data-analytics-prop-repo={repo}
        className={`shrink-0 ${primaryButtonClassName}`}
      >
        Clone
      </a>
    </div>
  )
}

export default OpenInXcode
