"use client"

import { useEffect, useRef } from "react"

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let requestRunning: number | null = null

    const handleScroll = () => {
      if (requestRunning === null) {
        requestRunning = requestAnimationFrame(() => {
          const windowHeight = window.innerHeight
          const documentHeight = document.documentElement.scrollHeight
          const scrollY = window.scrollY

          const scrollPercent = (scrollY / (documentHeight - windowHeight)) * 100
          const progress = Math.min(100, Math.max(0, scrollPercent))

          if (barRef.current) {
            barRef.current.style.setProperty("--scroll-p", `${progress}%`)
            barRef.current.setAttribute("aria-valuenow", progress.toFixed(0))
          }

          requestRunning = null
        })
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (requestRunning !== null) {
        cancelAnimationFrame(requestRunning)
      }
    }
  }, [])

  return (
    <div className="scroll-progress-container">
      <div
        ref={barRef}
        className="scroll-progress-bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
}
