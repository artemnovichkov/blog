import type { Root } from "mdast"
import { toString } from "mdast-util-to-string"
import { compileMDX } from "next-mdx-remote/rsc"
import { Tweet } from "react-tweet"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { visit } from "unist-util-visit"
import AdBlock from "../app/_components/ad-block"
import AudioPlayer from "../app/_components/audio-player"
import Callout from "../app/_components/callout"
import CodeBlock from "../app/_components/code-block"
import { FileTree } from "../app/_components/filetree"

const options = {
  theme: {
    dark: "github-dark",
    light: "github-light",
  },
  keepBackground: false,
  defaultLang: "swift",
}

export interface TocItem {
  title: string
  url: string
  depth: number
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export default async function markdownToHtml(markdown: string) {
  const toc: TocItem[] = []

  const { content } = await compileMDX({
    source: markdown,
    options: {
      mdxOptions: {
        rehypePlugins: [[rehypePrettyCode, options], rehypeSlug],
        remarkPlugins: [
          remarkGfm,
          () => (tree: Root) => {
            visit(tree, "heading", (node) => {
              const text = toString(node)
              toc.push({
                title: text,
                url: `#${slugify(text)}`,
                depth: node.depth,
              })
            })
          },
        ],
      },
    },
    components: {
      Tweet,
      Callout,
      FileTree,
      AudioPlayer,
      pre: CodeBlock,
      AdBlock,
    },
  })

  return { content, toc }
}
