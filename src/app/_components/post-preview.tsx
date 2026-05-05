import Image from "next/image"
import Link from "next/link"
import readingTime from "reading-time"
import type { Post } from "@/interfaces/post"
import CategoryList from "./category-list"
import PostDate from "./post-date"

type PostPreviewProps = {
  post: Post
  variant?: "default" | "compact"
  showCategories?: boolean
  showReadingTime?: boolean
  priority?: boolean
  imageSizes?: string
}

export default function PostPreview({
  post,
  variant = "default",
  showCategories = true,
  showReadingTime = true,
  priority = true,
  imageSizes = "(max-width: 768px) 100vw, 50vw",
}: PostPreviewProps) {
  const isCompact = variant === "compact"

  return (
    <div className="flex flex-col">
      <Link
        className="group mb-2 flex w-full flex-col gap-2 no-underline"
        href={`/blog/${encodeURIComponent(post.slug)}`}
      >
        <div className="w-full overflow-hidden rounded">
          <Image
            className="h-auto w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            priority={priority}
            src={post.cover}
            alt={`Cover image for ${post.title}`}
            width={800}
            height={400}
            sizes={imageSizes}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <h4
          className={`mt-0 font-medium text-zinc-800 transition-colors group-hover:text-accent dark:text-gray-100 dark:group-hover:text-accent ${
            isCompact ? "text-base" : "text-xl"
          }`}
        >
          {post.title}
        </h4>
        <p
          className={`font-normal text-zinc-500 dark:text-gray-400 ${
            isCompact ? "text-sm" : "text-base"
          }`}
        >
          {post.description}
        </p>
      </Link>
      {showCategories && post.categories && (
        <CategoryList categories={post.categories} />
      )}
      <div
        className={`mt-2 font-normal text-zinc-500 dark:text-gray-400 ${
          isCompact ? "text-xs" : "text-sm"
        }`}
      >
        <PostDate dateString={post.date} />
        {showReadingTime && ` • ${readingTime(post.content).text}`}
      </div>
    </div>
  )
}
