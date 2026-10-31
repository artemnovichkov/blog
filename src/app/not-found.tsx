import type { Metadata } from "next"
import { about, name } from "@/lib/const"
import { buildMetadata } from "@/lib/metadata"
import NotFoundContent from "./_components/not-found-content"
import SiteShell from "./_components/site-shell"

const title = `${name} | Page Not Found`

export const metadata: Metadata = {
  ...buildMetadata({
    title,
    description: about,
    // No real canonical path for a 404 page; root is the closest sensible url.
    path: "/",
  }),
  description:
    "Oops! This page seems to have wandered off into the digital void.",
}

export default function NotFound() {
  return (
    <SiteShell>
      <NotFoundContent />
    </SiteShell>
  )
}
