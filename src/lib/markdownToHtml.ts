import rehypeShiki from '@shikijs/rehype'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import { unified } from 'unified'

export default async function markdownToHtml(markdown: string) {
    const result = await unified()
        .use(remarkParse)
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
