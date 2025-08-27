import type { Metadata } from "next"
import { about, name, title } from "@/lib/const"
import "@/app/globals.css"
import { Analytics } from "@vercel/analytics/react"
import Footer from "./_components/footer"
import Header from "./_components/header"

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
    <html lang="en">
      <body className="bg-zinc-100 dark:bg-gray-900">
        <Header />
        <main className="flex flex-col justify-center max-w-2xl mx-auto px-4 sm:px-0">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
