import type { Metadata } from "next"
import { name as AUTHOR } from "@/lib/const"

const SITE_URL = "https://artemnovichkov.com"
const DEFAULT_IMAGE = `${SITE_URL}/images/banner.png`
const TWITTER_HANDLE = "@iosartem"
const TWITTER_ID = "3081906297"

type BuildMetadataOptions = {
  title: string
  description: string
  /** Path of the page relative to the site root, e.g. "/blog" or "/". */
  path: string
  /** Defaults to `title` (matches prior per-page behavior). */
  siteName?: string
  images?: string[]
  twitterCard?: "summary" | "summary_large_image"
  /**
   * Set on posts. Without it Open Graph types every page as a generic website,
   * so a post carries no publish or revision date off-site.
   */
  article?: {
    publishedTime: string
    modifiedTime: string
  }
}

/**
 * Builds the shared openGraph/twitter metadata block used across pages,
 * keeping the per-page url in sync with its actual path.
 */
export function buildMetadata({
  title,
  description,
  path,
  siteName = title,
  images = [DEFAULT_IMAGE],
  twitterCard = "summary_large_image",
  article,
}: BuildMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`
  const shared = { title, description, url, siteName, images }

  // Built as one object per branch rather than a spread: the `type` field
  // discriminates Next's OpenGraph union, and a conditional spread widens it
  // back to a plain string, which no longer matches either variant.
  const openGraph: Metadata["openGraph"] = article
    ? {
        ...shared,
        type: "article",
        publishedTime: article.publishedTime,
        modifiedTime: article.modifiedTime,
        authors: [AUTHOR],
      }
    : shared

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph,
    twitter: {
      card: twitterCard,
      title,
      description,
      siteId: TWITTER_ID,
      creator: TWITTER_HANDLE,
      creatorId: TWITTER_ID,
      images,
    },
  }
}
