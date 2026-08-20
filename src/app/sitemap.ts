import type { MetadataRoute } from "next"
import {
  getAllPosts,
  getIndexableCategories,
  getPostModifiedDate,
} from "@/lib/api"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://artemnovichkov.com"
  const posts = getAllPosts()
  // Thin categories are deliberately absent: they are noindex, and asking
  // Google to crawl them anyway spends the site's crawl budget on listings
  // that will never be indexed.
  const categories = getIndexableCategories()

  const staticEntries = [
    {
      url: `${baseUrl}/`,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/category`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sponsorship`,
      priority: 0.8,
    },
  ]

  const postEntries = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: getPostModifiedDate(post),
    priority: 0.7,
  }))

  const categoryEntries = categories.map((category) => ({
    url: `${baseUrl}/blog/category/${category}`,
    priority: 0.6,
  }))

  return [...staticEntries, ...postEntries, ...categoryEntries]
}
