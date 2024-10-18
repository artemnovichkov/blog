import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import remarkHtml from 'remark-html'
import { remark } from 'remark'

export default async function markdownToHtml(markdown: string) {
    const result = await remark()
        .use(remarkHtml)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .process(markdown)

    return result.toString();
}
