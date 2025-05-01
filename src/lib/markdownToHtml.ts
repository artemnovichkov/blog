import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import rehypeShiki from '@shikijs/rehype'
import { transformerNotationHighlight } from 'shikiji-transformers'
import { Tweet } from 'react-tweet'
import Callout from '../app/_components/callout';
import { FileTree } from "../app/_components/filetree";
import AudioPlayer from '../app/_components/audio-player';

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
        components: { Tweet, Callout, FileTree, AudioPlayer },
    });

    return content;
}
