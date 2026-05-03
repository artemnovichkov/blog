import type { Metadata } from "next"
import { notFound } from "next/navigation"
import AdBlock from "@/app/_components/ad-block"
import PostActions from "@/app/_components/post-actions"
import PostHeader from "@/app/_components/post-header"
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
    <div className="shell">
      <article>
        <PostHeader post={post} />
        <div className="article-wrap">
          <div className="article">
            <AdBlock
              title={sponsorshipConfig.title}
              description={sponsorshipConfig.description}
              url={sponsorshipConfig.url}
              isVisible={sponsorshipConfig.isVisible}
            />
            {content}
          </div>
        </div>
      </article>
      <div className="post-end">
        <PostActions post={post} />
        {previousPost && <ReadNext post={previousPost} />}
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
