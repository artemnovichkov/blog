"use client"

import type React from "react"
import { useEffect } from "react"
import useSWR from "swr"

interface ViewData {
  total: number
}

interface ViewCounterProps {
  slug: string
}

const fetcher = async (url: string): Promise<ViewData> => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to fetch views: ${res.status}`)
  }
  return res.json()
}

export default function ViewCounter({
  slug,
}: ViewCounterProps): React.ReactElement {
  const { data } = useSWR<ViewData>(`/api/views/${slug}`, fetcher)
  const views = Number(data?.total)
  const formattedViews = views > 0 ? views.toLocaleString() : "0"

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: "POST",
      })

    registerView()
  }, [slug])

  return (
    <span className="view-counter" aria-live="polite">
      {data ? (
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
