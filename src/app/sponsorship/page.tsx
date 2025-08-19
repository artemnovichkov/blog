import type { Metadata } from 'next'
import { name } from '@/lib/const'
import markdownToHtml from '@/lib/markdownToHtml'
import { readFileSync } from 'fs';
import { join } from 'path';

export const metadata: Metadata = {
    title: `${name} | Sponsorship`
}

export default async function SponsorshipPage() {
    const mdxPath = join(process.cwd(), 'content', 'sponsorship.mdx');
  const mdxContent = readFileSync(mdxPath, 'utf8');
  const content = await markdownToHtml(mdxContent);
    
  return (
    <main>
        <article>
            <div className="max-w-2xl mx-auto w-full mt-4">
                <div className="prose dark:prose-dark w-full max-w-none">
                    {content}
                </div>
            </div>
        </article>
    </main>
);
}