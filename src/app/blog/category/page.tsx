import { getAllCategories, getAllPosts } from "@/lib/api"
import BlogIndex from "../../_components/blog-index"

export default function Categories() {
  const posts = getAllPosts()
  const categories = getAllCategories()

  return (
    <BlogIndex
      posts={posts}
      tags={categories}
      title={
        <>
          All <em>Categories</em>
        </>
      }
      subtitle={`${categories.length} topics across ${posts.length} posts`}
      showFilter={false}
      showPostTags={false}
    />
  )
}
