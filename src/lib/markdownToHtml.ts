import { useMDXComponents } from "../mdx-components";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import rehypeShiki from '@shikijs/rehype'
import { transformerNotationHighlight } from 'shikiji-transformers'

export default async function markdownToHtml(markdown: string) {
    const components = useMDXComponents({});

    const { content, frontmatter } = await compileMDX({
        source: markdown,
        options: {
            mdxOptions: {
                rehypePlugins: [
                    [rehypeShiki, {
                        theme: 'github-dark',
                        transformers: [transformerNotationHighlight()],
                        inline: 'tailing-curly-colon',
                        defaultLanguage: 'swift',
                    }],
                    rehypeSlug],
                remarkPlugins: [remarkGfm],
            },
        },
        components,
    });

    return content;
}
