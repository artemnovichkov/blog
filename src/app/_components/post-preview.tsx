import Image from "next/image"
import Link from "next/link"
import readingTime from "reading-time"
import type { Post } from "@/interfaces/post"

const fmtDate = (iso: string) =>
  new Date(iso)
    .toLocaleDateString("en-GB", { month: "short", day: "2-digit" })
    .toUpperCase()

export default function PostPreview({ post }: { post: Post }) {
  const href = `/blog/${encodeURIComponent(post.slug)}`
  return (
    <article className="idx-row">
      <Link href={href} className="cover">
        <Image
          src={post.cover}
          alt=""
          width={400}
          height={300}
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 140px, 200px"
        />
      </Link>
      <div className="date">{fmtDate(post.date)}</div>
      <div className="body">
        <Link href={href} className="idx-title">
          {post.title}
        </Link>
        <div className="dek">{post.description}</div>
        {post.categories && (
          <div className="tags">
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
      </div>
      <div className="read">{readingTime(post.content).text}</div>
      <Link href={href} className="arrow" aria-label={post.title}>
        →
      </Link>
    </article>
  )
}
