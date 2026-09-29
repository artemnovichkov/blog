import SiteShell from "@/app/_components/site-shell"

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <SiteShell>{children}</SiteShell>
}
