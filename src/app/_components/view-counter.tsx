"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface ViewCounterProps {
  slug: string
}

export default function ViewCounter({
  slug,
}: ViewCounterProps): React.ReactElement {
  const [total, setTotal] = useState<number | null>(null)
  // One registration per slug: React's development double-invoke of effects
  // would otherwise count the same visit twice, and a ref survives it.
  const registered = useRef<string | null>(null)

  useEffect(() => {
    if (registered.current === slug) return
    registered.current = slug

    let cancelled = false

    // The increment response carries the new total, so the counter needs a
    // single round trip instead of a separate read.
    fetch(`/api/views/${slug}`, { method: "POST" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { total?: number } | null) => {
        if (cancelled || typeof data?.total !== "number") return
        setTotal(data.total)
      })
      .catch(() => {
        // A failed count must never break the article: the skeleton stays.
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  const formattedViews = total && total > 0 ? total.toLocaleString() : "0"

  return (
    <span className="view-counter" aria-live="polite">
      {total !== null ? (
        <span className="view-counter-value" key={formattedViews}>
          {formattedViews}
        </span>
      ) : (
        <>
          <span className="view-counter-skeleton" aria-hidden="true" />
          <span className="sr-only">Loading</span>
        </>
      )}{" "}
      views
    </span>
  )
}
