import Footer from "@/app/_components/footer"
import Header from "@/app/_components/header"
import "./promo.css"

/**
 * The blog's header and footer around a wider canvas than its reading
 * column, so promo pages can lay out screenshots; each page sets its own
 * width inside. The footer sits at the bottom even on short pages, and
 * screenshots drifting in from the side never widen the page.
 */
export default function AppsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4">{children}</main>
      <Footer />
    </div>
  )
}
