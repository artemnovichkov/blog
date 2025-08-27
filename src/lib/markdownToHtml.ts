import { compileMDX } from "next-mdx-remote/rsc"
import { Tweet } from "react-tweet"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
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
      Tweet,
      Callout,
      FileTree,
      AudioPlayer,
      pre: CodeBlock,
      AdBlock,
    },
  })

  return content
}
