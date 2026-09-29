import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import StoreButton from "@/app/apps/_components/store-button"
import { type AppSection, apps, getApp, getAppPageSlugs } from "@/lib/apps"
import { buildAppJsonLd, JsonLd } from "@/lib/json-ld"
import { buildMetadata } from "@/lib/metadata"

type Params = {
  params: Promise<{ app: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return apps.map((app) => ({ app: app.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const app = getApp((await params).app)
  if (!app) return {}

  const metadata = buildMetadata({
    title: `${app.name}: ${app.tagline}`,
    description: app.description,
    path: `/apps/${app.slug}`,
    images: [`/apps/${app.slug}/og.png`],
  })
  // The Smart App Banner only makes sense once there is a store page.
  if (!app.isLive) return metadata
  return {
    ...metadata,
    other: { "apple-itunes-app": `app-id=${app.appStoreId}` },
  }
}

const pageTitles: Record<string, string> = {
  support: "Support",
  privacy: "Privacy Policy",
}

/**
 * Sections without screenshots read better side by side as cards than as
 * lone paragraphs, so runs of them are grouped.
 */
function groupSections(sections: AppSection[]): AppSection[][] {
  const groups: AppSection[][] = []
  for (const section of sections) {
    const last = groups.at(-1)
    if (section.images.length === 0 && last?.[0].images.length === 0) {
      last.push(section)
    } else {
      groups.push([section])
    }
  }
  return groups
}

function Showcase({
  section,
  reversed,
}: {
  section: AppSection
  reversed: boolean
}) {
  return (
    <section className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
      <div className={`promo-reveal ${reversed ? "md:order-2" : ""}`.trim()}>
        <h2 className="font-bold font-serif text-2xl text-zinc-900 tracking-tight sm:text-3xl dark:text-gray-100">
          {section.title}
        </h2>
        <p className="mt-4 text-zinc-600 leading-relaxed sm:text-lg dark:text-gray-300">
          {section.body}
        </p>
      </div>
      <div className="flex flex-col gap-6">
        {section.images.map((image) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 768px) 480px, 100vw"
            className={`promo-reveal ${reversed ? "promo-reveal-start" : "promo-reveal-end"} h-auto w-full drop-shadow-xl`}
          />
        ))}
      </div>
    </section>
  )
}

function Cards({ sections }: { sections: AppSection[] }) {
  return (
    <section
      className={
        sections.length === 1
          ? "mx-auto w-full max-w-2xl text-center"
          : "grid gap-6 md:grid-cols-2"
      }
    >
      {sections.map((section, index) => (
        <div
          key={section.title}
          className={`promo-reveal ${index % 2 === 1 ? "promo-reveal-late" : ""} rounded-3xl bg-white p-6 shadow-sm sm:p-8 dark:bg-gray-800`}
        >
          <h2 className="font-bold font-serif text-2xl text-zinc-900 tracking-tight dark:text-gray-100">
            {section.title}
          </h2>
          <p className="mt-3 text-zinc-600 leading-relaxed dark:text-gray-300">
            {section.body}
          </p>
        </div>
      ))}
    </section>
  )
}

export default async function AppPromoPage({ params }: Params) {
  const app = getApp((await params).app)
  if (!app) notFound()

  let showcaseIndex = 0

  return (
    <div className="promo flex flex-col gap-20 py-10 md:gap-28 md:py-16">
      <JsonLd data={buildAppJsonLd(app)} />

      <section className="grid items-center gap-10 md:grid-cols-[2fr_3fr]">
        <div>
          <Image
            src={app.icon}
            alt=""
            width={96}
            height={96}
            priority
            className="promo-enter rounded-[22%] shadow-lg"
          />
          <h1
            className="promo-enter mt-6 font-bold font-serif text-5xl text-zinc-900 tracking-tight md:text-6xl dark:text-gray-100"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            {app.name}
          </h1>
          <p
            className="promo-enter mt-2 font-serif text-xl text-zinc-600 sm:text-2xl dark:text-gray-300"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {app.tagline}
          </p>
          <p
            className="promo-enter mt-6 text-zinc-600 leading-relaxed sm:text-lg dark:text-gray-300"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            {app.description}
          </p>
          <div
            className="promo-enter mt-8"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            <StoreButton app={app} />
          </div>
          <ul
            className="promo-enter mt-6 flex flex-wrap gap-2"
            style={{ "--i": 5 } as React.CSSProperties}
          >
            {app.facts.map((fact) => (
              <li
                key={fact}
                className="rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-600 dark:border-gray-700 dark:text-gray-400"
              >
                {fact}
              </li>
            ))}
          </ul>
        </div>
        <div className="promo-parallax">
          <Image
            src={app.hero.src}
            alt={app.hero.alt}
            width={app.hero.width}
            height={app.hero.height}
            sizes="(min-width: 768px) 600px, 100vw"
            priority
            className="promo-device h-auto w-full drop-shadow-2xl"
          />
        </div>
      </section>

      {groupSections(app.sections).map((group) =>
        group[0].images.length === 0 ? (
          <Cards key={group[0].title} sections={group} />
        ) : (
          <Showcase
            key={group[0].title}
            section={group[0]}
            reversed={showcaseIndex++ % 2 === 1}
          />
        )
      )}

      <nav className="flex justify-center gap-2 text-zinc-600 dark:text-gray-400">
        {getAppPageSlugs(app.slug).map((page) => (
          <Link
            key={page}
            href={`/apps/${app.slug}/${page}`}
            className="px-3 py-2 transition-colors hover:text-accent"
          >
            {pageTitles[page] ?? page}
          </Link>
        ))}
      </nav>
    </div>
  )
}
