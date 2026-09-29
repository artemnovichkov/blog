import AppearanceAnimation from "./appearance-animation"
import Footer from "./footer"
import Header from "./header"

/**
 * The blog's chrome: header, a narrow reading column and footer. App pages
 * under /apps bring their own, so it lives here rather than in the root
 * layout; the root not-found page reuses it for unknown URLs.
 */
export default function SiteShell({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-2xl flex-col justify-center px-4 sm:px-0">
        <AppearanceAnimation>{children}</AppearanceAnimation>
      </main>
      <Footer />
    </>
  )
}
