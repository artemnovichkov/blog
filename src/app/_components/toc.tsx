"use client"

import { useEffect, useRef, useState } from "react"
import type { TocItem } from "@/lib/markdownToHtml"

export default function TableOfContents({ toc }: { toc: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("")

  // Filter for H2s only to match the screenshot's clean look
  const items = toc.filter((item) => item.depth === 2)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-80px 0% -80% 0%" }
    )

    items.forEach((item) => {
      const id = item.url.replace("#", "")
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [items])

  if (!toc || toc.length === 0 || items.length === 0) return null

  return (
    <nav className="toc reveal">
      <div className="toc-label">On this page</div>
      <ul className="toc-list">
        {items.map((item, index) => {
          const id = item.url.replace("#", "")
          const isActive = activeId === id
          return (
            <li
              key={item.url}
              className={`toc-item ${isActive ? "active" : ""}`}
            >
              <a href={item.url}>
                <span className="toc-num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="toc-title">{item.title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
