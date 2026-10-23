import { FaApple } from "react-icons/fa"
import AppStoreButton from "@/app/_components/app-store-button"
import { type App, appStoreUrl } from "@/lib/apps"

/**
 * Until the store page exists the link would 404, so the button says the app
 * is on its way instead of pointing anywhere.
 */
export default function StoreButton({ app }: { app: App }) {
  if (!app.isLive) {
    return (
      <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-zinc-200 px-5 py-3 font-medium text-sm text-zinc-700 sm:text-base dark:bg-gray-800 dark:text-gray-300">
        <FaApple aria-hidden="true" className="size-5" />
        Coming soon to the App Store
      </span>
    )
  }

  return <AppStoreButton href={appStoreUrl(app)} app={app.slug} />
}
