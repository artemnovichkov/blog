import type { Metadata } from "next"
import { about, name, title } from "@/lib/const"
import "@/app/globals.css"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from "next/script"
import { buildMetadata } from "@/lib/metadata"
import AnalyticsProvider from "./_components/analytics-provider"
import AppearanceAnimation from "./_components/appearance-animation"
import Footer from "./_components/footer"
import Header from "./_components/header"
import WebMcpTools from "./_components/webmcp-tools"

export const metadata: Metadata = {
  ...buildMetadata({
    title: name,
    description: about,
    path: "/",
    siteName: title,
  }),
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://artemnovichkov.com/"),
  other: {
    "yandex-verification": "0dbe1f786dcb070d",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Duplicates the `Link` response header from next.config.mjs. Agents
          fetch pages through tools that never surface response headers, so the
          header alone left every discovery surface unreachable.
        */}
        <link href="/llms.txt" rel="alternate" type="text/plain" />
        {/*
          ARD is discoverable under two names: `ard` per the specification and
          `ai-catalog` per Google's announcement, which the scanners follow.
        */}
        <link href="/.well-known/ard.json" rel="ard" type="application/json" />
        <link
          href="/.well-known/ai-catalog.json"
          rel="ai-catalog"
          type="application/json"
        />
        <link
          href="/.well-known/api-catalog"
          rel="api-catalog"
          type="application/linkset+json"
        />
        <link
          href="/.well-known/openapi.json"
          rel="service-desc"
          type="application/openapi+json"
        />
        <link
          href="/feed.xml"
          rel="alternate"
          title="Artem Novichkov Blog"
          type="application/rss+xml"
        />
        {/* biome-ignore lint/correctness/useUniqueElementIds: next/script requires a stable id for inline scripts. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`
          try {
            const storedTheme = localStorage.getItem("theme");
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const theme = storedTheme || (prefersDark ? "dark" : "light");

            document.documentElement.classList.toggle("dark", theme === "dark");
          } catch {}
        `}
        </Script>
      </head>
      <body className="bg-zinc-100 dark:bg-gray-900">
        <Header />
        <main className="mx-auto flex max-w-2xl flex-col justify-center px-4 sm:px-0">
          <AppearanceAnimation>{children}</AppearanceAnimation>
        </main>
        <Footer />
        <WebMcpTools />
        <AnalyticsProvider />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
