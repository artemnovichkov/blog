import type { Metadata } from "next"
import { notFound } from "next/navigation"
import AdBlock from "@/app/_components/ad-block"
import PostActions from "@/app/_components/post-actions"
import PostHeader from "@/app/_components/post-header"
import PostTableOfContents from "@/app/_components/post-table-of-contents"
import ReadNext from "@/app/_components/read-next"
import { getAllPosts, getPostBySlug, getPreviousPost } from "@/lib/api"
import { name } from "@/lib/const"
import markdownToHtml from "@/lib/markdownToHtml"
import { sponsorshipConfig } from "@/lib/sponsorship-config"

export default async function BlogPost(props: Params) {
  const params = await props.params
  const post = getPostBySlug(params.slug)
  if (!post) notFound()
  const content = await markdownToHtml(post.content || "")
  const previousPost = getPreviousPost(params.slug)

  return (
    <main>
      <article>
        <div className="mx-auto w-full max-w-2xl">
          <div className="mt-4">
            <PostHeader post={post} />
          </div>
          <AdBlock
            title={sponsorshipConfig.title}
            description={sponsorshipConfig.description}
            url={sponsorshipConfig.url}
            isVisible={sponsorshipConfig.isVisible}
          />
        </div>
        <div className="-translate-x-1/2 relative left-1/2 w-screen px-4 sm:px-0">
          <PostTableOfContents className="absolute top-0 bottom-0 left-[max(1rem,calc(50%-36.5rem))] w-52" />
          <div
            className="prose dark:prose-dark mx-auto w-full max-w-2xl"
            data-post-content
          >
            {content}
          </div>
        </div>
      </article>
      <div className="mx-auto w-full max-w-2xl">
        <PostActions post={post} />
        {previousPost && <ReadNext post={previousPost} />}
      </div>
    </main>
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
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://artemnovichkov.com/blog/${post.slug}`,
      siteName: name,
      images: [post.cover],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      siteId: "3081906297",
      creator: "@iosartem",
      creatorId: "3081906297",
      images: [post.cover],
    },
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
