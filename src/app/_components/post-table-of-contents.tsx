"use client"

import { useEffect, useState } from "react"

type TableOfContentsItem = {
  id: string
  title: string
}

const contentSelector = "[data-post-content]"
const activeOffset = 112

type PostTableOfContentsProps = {
  className?: string
}

export default function PostTableOfContents({
  className = "",
}: PostTableOfContentsProps) {
  const [items, setItems] = useState<TableOfContentsItem[]>([])
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLHeadingElement>(`${contentSelector} h2[id]`)
    )

    const nextItems = headings.map((heading) => ({
      id: heading.id,
      title: heading.textContent?.trim() || heading.id,
    }))

    setItems(nextItems)

    if (headings.length === 0) {
      setActiveId("")
      return
    }

    let frame = 0
    const updateActiveFromScroll = () => {
      frame = 0

      const isAtBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2

      if (isAtBottom) {
        setActiveId(headings[headings.length - 1].id)
        return
      }

      let currentId = headings[0].id

      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= activeOffset) {
          currentId = heading.id
        } else {
          break
        }
      }

      setActiveId(currentId)
    }

    const requestUpdate = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(updateActiveFromScroll)
      }
    }

    updateActiveFromScroll()
    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)

    return () => {
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)

      if (frame !== 0) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [])

  if (items.length === 0) {
    return (
      <aside aria-hidden="true" className={`hidden lg:block ${className}`} />
    )
  }

  return (
    <aside className={`hidden lg:block ${className}`}>
      <nav
        aria-label="Table of contents"
        className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2"
      >
        <p className="mb-3 font-semibold text-xs text-zinc-500 uppercase dark:text-gray-400">
          On this page
        </p>
        <ol className="space-y-2 border-zinc-300 border-l dark:border-gray-700">
          {items.map((item) => {
            const isActive = item.id === activeId

            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(event) => {
                    event.preventDefault()
                    document.getElementById(item.id)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                    setActiveId(item.id)
                  }}
                  className={`block border-l-2 py-1 pl-3 text-sm transition-colors duration-150 ease-out ${
                    isActive
                      ? "-ml-px border-accent font-medium text-accent"
                      : "-ml-px border-transparent text-zinc-500 hover:text-accent dark:text-gray-400 dark:hover:text-accent"
                  }`}
                >
                  {item.title}
                </a>
              </li>
            )
          })}
        </ol>
      </nav>
    </aside>
  )
}
