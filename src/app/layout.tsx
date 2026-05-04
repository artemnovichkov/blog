import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Fraunces } from "next/font/google"
import { about, name, title } from "@/lib/const"
import "@/app/globals.css"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Footer from "./_components/footer"
import Header from "./_components/header"

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
})

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

const themeInitScript = `(()=>{try{const s=localStorage.getItem('theme');const m=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=s||(m?'dark':'light');}catch(e){document.documentElement.dataset.theme='light';}})();`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: theme init must run before paint */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="grain">
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
