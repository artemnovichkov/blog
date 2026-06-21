import type { Metadata } from "next"

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
}: BuildMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName,
      images,
    },
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
