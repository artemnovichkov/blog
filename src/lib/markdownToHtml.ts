import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { Tweet } from 'react-tweet'
import Callout from '../app/_components/callout';
import { FileTree } from "../app/_components/filetree";
import AudioPlayer from '../app/_components/audio-player';


const options = {
    theme: 'github-dark',
    keepBackground: false,
}

export default async function markdownToHtml(markdown: string) {
    const { content } = await compileMDX({
        source: markdown,
        options: {
            mdxOptions: {
                rehypePlugins: [
                    [rehypePrettyCode, options],
                    rehypeSlug],
                remarkPlugins: [remarkGfm],
            },
        },
        components: { Tweet, Callout, FileTree, AudioPlayer },
    });

    return content;
}
