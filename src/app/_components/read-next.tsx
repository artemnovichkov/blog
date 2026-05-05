import Image from "next/image"
import Link from "next/link"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import type { Post } from "@/interfaces/post"
import PostDate from "./post-date"

type ReadNextPost = {
  relation: "previous" | "next"
  post: Post
}

export default function ReadNext({ posts }: { posts: ReadNextPost[] }) {
  return (
    <div className="mt-8 border-gray-200 border-t pt-8 dark:border-gray-800">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {posts.map(({ relation, post }) => {
          const isNext = relation === "next"
          const Icon = isNext ? FiArrowRight : FiArrowLeft

          return (
            <Link
              key={post.slug}
              href={`/blog/${encodeURIComponent(post.slug)}`}
              className="flex flex-col gap-3 no-underline"
            >
              <div
                className={
                  isNext
                    ? "flex justify-end text-gray-500 dark:text-gray-500"
                    : "flex justify-start text-gray-500 dark:text-gray-500"
                }
              >
                <Icon className="h-5 w-5" />
              </div>
              <Image
                className="h-auto w-full rounded object-cover"
                src={post.cover}
                alt={`Cover image for ${post.title}`}
                width={800}
                height={400}
                sizes="(max-width: 640px) 100vw, 320px"
                style={{ width: "100%", height: "auto" }}
              />
              <div className="min-w-0">
                <h4 className="mb-2 font-medium text-base text-gray-900 dark:text-gray-100">
                  {post.title}
                </h4>
                <p className="mb-2 text-gray-600 text-sm dark:text-gray-400">
                  {post.description}
                </p>
                <div className="text-gray-500 text-xs dark:text-gray-500">
                  <PostDate dateString={post.date} />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
