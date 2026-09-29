import Link from "next/link"
import ThemeToggle from "@/app/_components/theme-toggle"
import { name } from "@/lib/const"

const linkClassName =
  "px-2 py-2 text-gray-900 transition-colors hover:text-accent sm:px-3 dark:text-gray-100 dark:hover:text-accent"

/**
 * App pages get a wider canvas than the blog's reading column, so promo
 * pages can lay out screenshots; each page sets its own width inside.
 */
export default function AppsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <header className="sticky-nav w-full">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-1 py-2 sm:px-4">
          <div className="flex min-w-0 items-center">
            <Link href="/" className={linkClassName}>
              {name}
            </Link>
            <Link href="/apps" className={linkClassName}>
              Apps
            </Link>
          </div>
          <ThemeToggle />
        </nav>
      </header>
      <main className="mx-auto w-full max-w-5xl px-4">{children}</main>
      <footer className="py-8 text-center text-gray-500 text-sm dark:text-gray-400">
        © {new Date().getFullYear()} {name}
      </footer>
    </>
  )
}
