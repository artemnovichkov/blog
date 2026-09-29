import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllAppPages, getApp, getAppPage } from "@/lib/apps"
import markdownToHtml from "@/lib/markdownToHtml"
import { buildMetadata } from "@/lib/metadata"

type Params = {
  params: Promise<{ app: string; page: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return getAllAppPages()
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { app: appSlug, page: pageSlug } = await params
  const app = getApp(appSlug)
  const page = getAppPage(appSlug, pageSlug)
  if (!app || !page) return {}

  return buildMetadata({
    title: `${app.name} | ${page.title}`,
    description: page.description,
    path: `/apps/${app.slug}/${page.slug}`,
    images: [`/apps/${app.slug}/og.png`],
  })
}

export default async function AppPage({ params }: Params) {
  const { app: appSlug, page: pageSlug } = await params
  const app = getApp(appSlug)
  const page = getAppPage(appSlug, pageSlug)
  if (!app || !page) notFound()

  const content = await markdownToHtml(page.content)

  return (
    <article className="mx-auto mt-4 w-full max-w-2xl">
      <Link
        href={`/apps/${app.slug}`}
        className="-ml-2 inline-block px-2 py-2 text-gray-500 text-sm transition-colors hover:text-accent dark:text-gray-400"
      >
        ← {app.name}
      </Link>
      <div className="prose dark:prose-dark w-full max-w-none">{content}</div>
    </article>
  )
}
