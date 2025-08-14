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
  return res.json()
}

export default function ViewCounter({ slug }: ViewCounterProps): string {
  const { data } = useSWR<ViewData>(`/api/views/${slug}`, fetcher)
  const views = Number(data?.total)

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: 'POST'
      })

    registerView()
  }, [slug])

  return `${views > 0 ? views.toLocaleString() : '–––'} views`
}