"use client"

import { useEffect } from "react"
import {
  type AnalyticsProps,
  isTrackingAllowed,
  posthogHost,
  posthogKey,
  setAnalyticsClient,
  track,
} from "@/lib/analytics"

/**
 * Declarative click tracking: any server-rendered element can opt in with
 * data-analytics-event plus data-analytics-prop-* attributes, so post lists,
 * category pills and read-next cards stay server components.
 */
const eventAttribute = "data-analytics-event"
const propPrefix = "analyticsProp"

const toSnakeCase = (key: string): string =>
  key
    .replace(/^./, (character) => character.toLowerCase())
    .replace(/[A-Z]/g, (character) => `_${character.toLowerCase()}`)

/**
 * data-* attributes are always strings, but a position that arrives as "0"
 * cannot be averaged or sorted in PostHog. Kept to an explicit list so a
 * numeric-looking slug never changes the type of an existing property.
 */
const numericProps = new Set(["position"])

const readProps = (element: HTMLElement): AnalyticsProps => {
  const props: AnalyticsProps = {}

  for (const [key, value] of Object.entries(element.dataset)) {
    if (value === undefined || !key.startsWith(propPrefix)) continue
    if (key === propPrefix) continue

    const name = toSnakeCase(key.slice(propPrefix.length))
    props[name] = numericProps.has(name) ? Number(value) : value
  }

  return props
}

export default function AnalyticsProvider() {
  useEffect(() => {
    if (!isTrackingAllowed()) return

    let cancelled = false

    // Dynamic import keeps posthog-js out of the initial bundle: it loads
    // after hydration, so LCP and INP are unaffected.
    import("posthog-js")
      .then(({ default: posthog }) => {
        if (cancelled) return

        posthog.init(posthogKey as string, {
          api_host: posthogHost,
          // Without this the SDK asks the PostHog API where to send data,
          // which defeats the /ingest rewrite.
          ui_host: "https://us.posthog.com",
          defaults: "2025-05-24",
          // Autocapture plus heatmaps answer "where do people click" without
          // any bespoke instrumentation; named events only add properties.
          autocapture: true,
          capture_pageview: "history_change",
          capture_pageleave: true,
          enable_heatmaps: true,
          // Anonymous readers never get a person profile: cheaper against the
          // free-tier quota and less data retained.
          person_profiles: "identified_only",
          session_recording: {
            maskAllInputs: true,
          },
          // Recording rate is deliberately not set here: client-side sampling
          // would decide per page load and split one visit across several
          // partial recordings. Set it once in PostHog under Session replay ->
          // Sampling (15% is the intended rate) so whole sessions are sampled
          // and the /ingest rewrite stays within the Hobby plan budget.
        })

        setAnalyticsClient(posthog)
      })
      .catch(() => {
        // Analytics must never break the page: a blocked or failed script
        // simply leaves track() as a no-op.
      })

    return () => {
      cancelled = true
      setAnalyticsClient(null)
    }
  }, [])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return

      const element = target.closest<HTMLElement>(`[${eventAttribute}]`)
      const name = element?.dataset.analyticsEvent
      if (!element || !name) return

      track(name, readProps(element))
    }

    document.addEventListener("click", onClick, { capture: true })
    return () => document.removeEventListener("click", onClick, true)
  }, [])

  return null
}
