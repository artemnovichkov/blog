import { compileMDX } from "next-mdx-remote/rsc"
import type { Options } from "rehype-pretty-code"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { createHighlighter } from "shiki"
import AdBlock from "../app/_components/ad-block"
import Callout from "../app/_components/callout"
import CodeBlock from "../app/_components/code-block"
import { FileTree } from "../app/_components/filetree"
import { H2, H3 } from "../app/_components/heading-anchor"
import OpenInXcode from "../app/_components/open-in-xcode"
import PostImage from "../app/_components/post-image"
import { SafeTweet } from "../app/_components/safe-tweet"
import { swiftGrammar } from "./swift-grammar"

// Loaded once per process; rehype-pretty-code caches the highlighter itself.
const swiftLang = swiftGrammar()

const options: Options = {
  theme: {
    dark: "github-dark",
    light: "github-light",
  },
  keepBackground: false,
  defaultLang: "swift",
  // Registers the patched Swift grammar before rehype-pretty-code lazily
  // loads languages, so its own "swift" request is a no-op.
  getHighlighter: async (highlighterOptions) =>
    createHighlighter({
      ...highlighterOptions,
      langs: [await swiftLang, ...(highlighterOptions.langs ?? [])],
    }),
}

export default async function markdownToHtml(markdown: string) {
  const { content } = await compileMDX({
    source: markdown,
    options: {
      mdxOptions: {
        rehypePlugins: [[rehypePrettyCode, options], rehypeSlug],
        remarkPlugins: [remarkGfm],
      },
    },
    components: {
      Tweet: SafeTweet,
      Callout,
      FileTree,
      OpenInXcode,
      pre: CodeBlock,
      h2: H2,
      h3: H3,
      img: PostImage,
      // Authored inside a post body, so it defaults to the "inline" slot; the
      // fixed placement under the post header passes its own.
      AdBlock,
    },
  })

  return content
}
