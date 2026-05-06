import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import type { Post } from "@/interfaces/post"
import PostPreview from "./post-preview"

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
            <div key={post.slug} className="flex flex-col gap-3">
              <div
                className={
                  isNext
                    ? "flex justify-end text-gray-500 dark:text-gray-500"
                    : "flex justify-start text-gray-500 dark:text-gray-500"
                }
              >
                <Icon className="h-5 w-5" />
              </div>
              <PostPreview
                post={post}
                variant="compact"
                showCategories={false}
                showReadingTime={false}
                priority={false}
                imageSizes="(max-width: 640px) 100vw, 320px"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
