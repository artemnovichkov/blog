import type { Metadata } from "next"
import { about, name, title } from "@/lib/const"
import "@/app/globals.css"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from "next/script"
import AppearanceAnimation from "./_components/appearance-animation"
import Footer from "./_components/footer"
import Header from "./_components/header"
import WebMcpTools from "./_components/webmcp-tools"

export const metadata: Metadata = {
  title: name,
  description: about,
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://artemnovichkov.com/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: name,
    description: about,
    url: "https://artemnovichkov.com/",
    siteName: title,
    images: ["https://artemnovichkov.com/images/banner.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: name,
    description: about,
    siteId: "3081906297",
    creator: "@iosartem",
    creatorId: "3081906297",
    images: ["https://artemnovichkov.com/images/banner.png"],
  },
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
