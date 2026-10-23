import type { Metadata } from "next"
import { notFound } from "next/navigation"
import readingTime from "reading-time"
import AdBlock from "@/app/_components/ad-block"
import AppAdBlock from "@/app/_components/app-ad-block"
import IosDailyCta from "@/app/_components/ios-daily-cta"
import PostActions from "@/app/_components/post-actions"
import PostAnalytics from "@/app/_components/post-analytics"
import PostHeader from "@/app/_components/post-header"
import PostImageZoom from "@/app/_components/post-image-zoom"
import PostTableOfContents from "@/app/_components/post-table-of-contents"
import ReadNext from "@/app/_components/read-next"
import {
  getAllPosts,
  getPostBySlug,
  getPostModifiedDate,
  getRelatedPosts,
} from "@/lib/api"
import { appStoreUrl, promotedApp } from "@/lib/apps"
import { name } from "@/lib/const"
import { buildBlogPostingJsonLd, JsonLd } from "@/lib/json-ld"
import markdownToHtml from "@/lib/markdownToHtml"
import { buildMetadata } from "@/lib/metadata"
import { houseAdConfig, sponsorshipConfig } from "@/lib/sponsorship-config"

export default async function BlogPost(props: Params) {
  const params = await props.params
  const post = getPostBySlug(params.slug)
  if (!post) notFound()
  const content = await markdownToHtml(post.content || "")
  const readNextPosts = getRelatedPosts(params.slug, 3)

  // Completion rate is only comparable across posts once it is normalised by
  // length, so the size of the post travels with every read-depth event.
  const stats = readingTime(post.content || "")
  // A booked sponsor owns the slot. With none, it goes to one of the author's
  // apps, and only when there is no app left to show does the house ad run.
  const app = promotedApp(post.slug)
  const ad = sponsorshipConfig.isVisible ? sponsorshipConfig : houseAdConfig
  const isAppSlot = !sponsorshipConfig.isVisible && app !== undefined

  return (
    <div>
      <JsonLd data={buildBlogPostingJsonLd(post)} />
      <article>
        <div className="mx-auto w-full max-w-2xl">
          <div className="mt-4 mb-6">
            <PostHeader post={post} />
          </div>
          {isAppSlot && app ? (
            <AppAdBlock
              app={{
                slug: app.slug,
                name: app.name,
                tagline: app.tagline,
                description: app.description,
                icon: app.icon,
                storeUrl: appStoreUrl(app),
              }}
              slug={post.slug}
              placement="post_header"
            />
          ) : (
            <AdBlock
              title={ad.title}
              description={ad.description}
              url={ad.url}
              isVisible={ad.isVisible}
              slot="post_header"
              isHouse={ad === houseAdConfig}
            />
          )}
        </div>
        <div className="relative left-1/2 w-screen -translate-x-1/2 px-4 sm:px-0">
          <PostTableOfContents className="absolute top-0 bottom-0 left-[max(1rem,calc(50%-36.5rem))] w-52" />
          <div
            className="prose dark:prose-dark mx-auto w-full max-w-2xl"
            data-post-content
          >
            {content}
          </div>
          {/* Keyed by slug so navigating between posts remounts and re-marks images. */}
          <PostImageZoom key={post.slug} />
          <PostAnalytics
            key={`analytics-${post.slug}`}
            slug={post.slug}
            categories={post.categories ?? []}
            readingTimeMinutes={Math.round(stats.minutes * 10) / 10}
            wordCount={stats.words}
            publishedAt={post.date}
          />
        </div>
      </article>
      <div className="mx-auto w-full max-w-2xl">
        <IosDailyCta slug={post.slug} />
        <PostActions post={post} />
        {readNextPosts.length > 0 && <ReadNext posts={readNextPosts} />}
      </div>
    </div>
  )
}

type Params = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    siteName: name,
    images: [post.cover],
    article: {
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(getPostModifiedDate(post)).toISOString(),
    },
    // Slack and X show these next to the link preview.
    labels: [
      { label: "Written by", value: name },
      { label: "Reading time", value: readingTime(post.content || "").text },
    ],
  })
}

export async function generateStaticParams() {
  const posts = getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
