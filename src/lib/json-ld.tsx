import type { Post } from "@/interfaces/post"
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

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD built from trusted post frontmatter
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
