"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

const isBlogPostPath = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean)
  return segments.length === 2 && segments[0] === "blog"
}

export default function ScrollProgress() {
  const pathname = usePathname()
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const progressElement = progressRef.current

    if (!progressElement) {
      return
    }

    if (!isBlogPostPath(pathname)) {
      progressElement.style.width = "0%"
      return
    }

    let frame = 0

    const updateProgress = () => {
      frame = 0
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight

      if (scrollableHeight <= 0) {
        progressElement.style.width = "100%"
        return
      }

      const progress = Math.min(
        Math.max(window.scrollY / scrollableHeight, 0),
        1
      )
      progressElement.style.width = `${progress * 100}%`
    }

    const requestUpdate = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(updateProgress)
      }
    }

    updateProgress()
    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)

    return () => {
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)

      if (frame !== 0) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [pathname])

  if (!isBlogPostPath(pathname)) {
    return null
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden bg-transparent"
    >
      <div ref={progressRef} className="h-full w-0 bg-accent" />
    </div>
  )
}
