import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import rehypeShiki from '@shikijs/rehype'
import { transformerNotationHighlight } from 'shikiji-transformers'
import { Tweet } from 'react-tweet'

export default async function markdownToHtml(markdown: string) {
    const { content } = await compileMDX({
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
        components: { Tweet },
    });

    return content;
}
