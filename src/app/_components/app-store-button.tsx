"use client"

import type { MouseEvent } from "react"
import { FaApple } from "react-icons/fa"

interface AppStoreButtonProps {
  href: string
  /** App slug, so clicks can be read per app. */
  app: string
  /** Where the button was shown, for the ones outside the app's own page. */
  placement?: string
}

/**
 * iPhone and iPad, where the App Store app is always there and every app has
 * a page in it. A Mac opens the Mac App Store, which has no page for an
 * iPhone-only app, so it keeps the website. iPadOS reports itself as a Mac,
 * and only a touch screen tells the two apart.
 */
const hasPhoneAppStore = (): boolean => {
  const agent = navigator.userAgent
  if (/iPhone|iPad|iPod/.test(agent)) return true
  return /Macintosh/.test(agent) && navigator.maxTouchPoints > 1
}

/**
 * Apple's badge, as a button: the same one wherever an app is linked. The
 * href stays an https link, so it can be copied, opened in a new tab and
 * followed on any other platform.
 */
export default function AppStoreButton({
  href,
  app,
  placement,
}: AppStoreButtonProps) {
  /**
   * Hands the link to the App Store app, which opens straight on the app's
   * page instead of loading apps.apple.com first.
   */
  const openInAppStore = (event: MouseEvent<HTMLAnchorElement>) => {
    // A modified click is the reader asking for a tab or a window, and both
    // want the web page.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (!hasPhoneAppStore()) return
    event.preventDefault()
    window.location.href = href.replace(/^https:\/\//, "itms-apps://")
  }

  return (
    <a
      href={href}
      onClick={openInAppStore}
      className="inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full bg-black px-5 py-3 font-medium text-sm text-white transition-[opacity,transform] duration-100 ease-out hover:opacity-80 active:scale-[0.97] sm:text-base dark:bg-white dark:text-black"
      data-analytics-event="app_store_clicked"
      data-analytics-prop-app={app}
      data-analytics-prop-placement={placement}
    >
      <FaApple aria-hidden="true" className="size-5" />
      Download on the App Store
    </a>
  )
}
