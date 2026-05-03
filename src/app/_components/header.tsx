"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import ThemeToggle from "./theme-toggle"

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/sponsorship", label: "Sponsorship" },
]

export default function Header() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header className="topbar">
      <div className="shell topbar-inner">
        <Link href="/" className="brand">
          Artem Novichkov
        </Link>
        <nav className="nav">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={isActive(l.href) ? "active" : ""}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="topbar-right">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
