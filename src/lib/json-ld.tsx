import type { Post } from "@/interfaces/post"
import { getPostModifiedDate } from "@/lib/api"
import { type App, type AppVideo, appStoreUrl } from "@/lib/apps"
import { about, name } from "@/lib/const"

const SITE_URL = "https://artemnovichkov.com"

const author = {
  "@type": "Person",
  name,
  url: SITE_URL,
  sameAs: [
    "https://github.com/artemnovichkov",
    "https://x.com/iosartem",
    "https://www.youtube.com/playlist?list=PLRSU1SC70qRudLaYKSjM14tJmA-J-dRvU",
  ],
}

export function buildBlogPostingJsonLd(post: Post) {
  const url = `${SITE_URL}/blog/${post.slug}`
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${SITE_URL}${post.cover}`,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(getPostModifiedDate(post)).toISOString(),
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: post.categories?.join(", "),
    author,
    inLanguage: "en",
  }
}

export function buildHomeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...author,
        "@id": `${SITE_URL}/#person`,
        description: about,
        image: `${SITE_URL}/images/avatar.jpg`,
        jobTitle: "iOS Developer",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name,
        url: SITE_URL,
        author: { "@id": `${SITE_URL}/#person` },
        inLanguage: "en",
      },
    ],
  }
}

export function buildVideoJsonLd(video: AppVideo) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: `${SITE_URL}${video.poster}`,
    uploadDate: video.uploadDate,
    duration: video.duration,
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.youtubeId}`,
    url: `https://www.youtube.com/watch?v=${video.youtubeId}`,
    author,
  }
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD built from trusted post frontmatter
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function buildAppJsonLd(app: App) {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: app.name,
    alternateName: `${app.name}: ${app.tagline}`,
    description: app.description,
    url: `${SITE_URL}/apps/${app.slug}`,
    image: `${SITE_URL}${app.icon}`,
    operatingSystem: "iOS",
    applicationCategory: app.applicationCategory,
    offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
    ...(app.isLive && { installUrl: appStoreUrl(app) }),
    author,
  }
}
