import rehypeShiki from '@shikijs/rehype'
import rehypeStringify from 'rehype-stringify'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import remarkHtml from 'remark-html'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
export default async function markdownToHtml(markdown: string) {
    const result = await remark()
        .use(remarkHtml)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeShiki, {
            themes: {
                light: 'github-dark',
                dark: 'github-dark',
            },
            inline: 'tailing-curly-colon',
            defaultLanguage: 'swift',
        })
        .use(rehypeStringify)
        .process(markdown)

    return result.toString();
}
