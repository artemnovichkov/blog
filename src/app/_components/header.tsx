import Link from "next/link"
import { FiRss } from "react-icons/fi"
import {
  iconButtonClassName,
  iconButtonIconClassName,
} from "./icon-button-styles"
import ScrollProgress from "./scroll-progress"
import ThemeToggle from "./theme-toggle"

export default function Header() {
  return (
    <header className="sticky-nav w-full">
      <nav className="flex items-center justify-between gap-2 px-2 py-2 sm:px-4">
        <div className="flex min-w-0 flex-1 items-center overflow-x-auto">
          <Link
            href="/"
            className="shrink-0 px-3 py-2 text-gray-900 hover:text-gray-600 dark:text-gray-100"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="shrink-0 px-3 py-2 text-gray-900 hover:text-gray-600 dark:text-gray-100"
          >
            Blog
          </Link>
          <Link
            href="/sponsorship"
            className="shrink-0 px-3 py-2 text-gray-900 hover:text-gray-600 dark:text-gray-100"
          >
            Sponsorship
          </Link>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/feed.xml"
            aria-label="RSS feed"
            title="RSS feed"
            className={iconButtonClassName}
          >
            <FiRss className={iconButtonIconClassName} aria-hidden="true" />
          </Link>
          <ThemeToggle />
        </div>
      </nav>
      <ScrollProgress />
    </header>
  )
}
