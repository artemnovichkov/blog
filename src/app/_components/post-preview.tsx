import Image from "next/image"
import Link from "next/link"
import readingTime from "reading-time"
import type { Post } from "@/interfaces/post"

const fmtDate = (iso: string) =>
  new Date(iso)
    .toLocaleDateString("en-GB", { month: "short", day: "2-digit" })
    .toUpperCase()

export default function PostPreview({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${encodeURIComponent(post.slug)}`} className="idx-row">
      <div className="cover">
        <Image
          src={post.cover}
          alt=""
          width={400}
          height={300}
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 140px, 200px"
        />
      </div>
      <div className="date">{fmtDate(post.date)}</div>
      <div className="body">
        <div className="idx-title">{post.title}</div>
        <div className="dek">{post.description}</div>
        {post.categories && (
          <div className="tags">
            {post.categories.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        )}
      </div>
      <div className="read">{readingTime(post.content).text}</div>
      <div className="arrow">→</div>
    </Link>
  )
}
