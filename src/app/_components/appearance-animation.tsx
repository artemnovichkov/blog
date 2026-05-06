"use client"

import { usePathname } from "next/navigation"

export default function AppearanceAnimation({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  return (
    <div className="page-appearance" key={pathname}>
      {children}
    </div>
  )
}
