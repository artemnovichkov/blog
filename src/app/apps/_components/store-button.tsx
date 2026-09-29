import { FaApple } from "react-icons/fa"
import { type App, appStoreUrl } from "@/lib/apps"

/**
 * Until the store page exists the link would 404, so the button says the app
 * is on its way instead of pointing anywhere.
 */
export default function StoreButton({ app }: { app: App }) {
  const className =
    "inline-flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-3 font-medium text-sm sm:text-base"

  if (!app.isLive) {
    return (
      <span
        className={`${className} bg-zinc-200 text-zinc-700 dark:bg-gray-800 dark:text-gray-300`}
      >
        <FaApple aria-hidden="true" className="size-5" />
        Coming soon to the App Store
      </span>
    )
  }

  return (
    <a
      href={appStoreUrl(app)}
      className={`${className} bg-black text-white transition-opacity hover:opacity-80 dark:bg-white dark:text-black`}
      data-analytics-event="app_store_clicked"
      data-analytics-prop-app={app.slug}
    >
      <FaApple aria-hidden="true" className="size-5" />
      Download on the App Store
    </a>
  )
}
