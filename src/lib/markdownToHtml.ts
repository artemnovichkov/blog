
import remarkHtml from 'remark-html'
import { remark } from 'remark'

export default async function markdownToHtml(markdown: string) {
    const result = await remark()
        .use(remarkHtml)
        .process(markdown)

    return result.toString();
}
