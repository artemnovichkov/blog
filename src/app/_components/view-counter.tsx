'use client'

import { useEffect } from 'react'
import useSWR from 'swr'

interface ViewData {
  total: number;
}

interface ViewCounterProps {
  slug: string;
}

const fetcher = async (url: string): Promise<ViewData> => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to fetch views: ${res.status}`)
  }
  return res.json()
}

export default function ViewCounter({ slug }: ViewCounterProps): JSX.Element {
  const { data } = useSWR<ViewData>(`/api/views/${slug}`, fetcher)
  const views = Number(data?.total)

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: 'POST'
      })

    registerView()
  }, [slug])

  return <span>{views > 0 ? views.toLocaleString() : '–––'} views</span>
}