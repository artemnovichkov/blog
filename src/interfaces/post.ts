export type Post = {
  slug: string
  title: string
  description: string
  date: string
  /** Set when a post is meaningfully revised; feeds dateModified. */
  updated?: string
  cover: string
  content: string
  categories?: string[]
}
