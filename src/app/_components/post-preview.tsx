import Image from "next/image"
import Link from "next/link"
import readingTime from "reading-time"
import type { Post } from "@/interfaces/post"
import PostDate from "./post-date"

export default function PostPreview({
  post,
  showTags = true,
}: {
  post: Post
  showTags?: boolean
}) {
  const href = `/blog/${encodeURIComponent(post.slug)}`
  return (
    <article
      className="post-preview"
      style={{
        viewTransitionName: `post-${post.slug.replace(/[^a-z0-9-]/gi, "_")}`,
      }}
    >
      <Link href={href} className="post-preview-cover">
        <Image
          src={post.cover}
          alt=""
          width={800}
          height={500}
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 400px"
        />
      </Link>
      <div className="post-preview-meta">
        <PostDate dateString={post.date} />
        <span className="dot">·</span>
        <span>{readingTime(post.content).text}</span>
      </div>
      <h3 className="post-preview-title">
        <Link href={href}>{post.title}</Link>
      </h3>
      <p className="post-preview-desc">{post.description}</p>
      {showTags && post.categories && (
        <div className="post-preview-tags">
          {post.categories.map((t) => (
            <Link
              key={t}
              href={`/blog/category/${encodeURIComponent(t)}`}
              className="tag"
            >
              {t}
            </Link>
          ))}
        </div>
      )}
    </article>
  )
}
