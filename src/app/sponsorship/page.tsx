import type { Metadata } from 'next'
import { name } from '@/lib/const'
import markdownToHtml from '@/lib/markdownToHtml'
import { readFileSync } from 'fs';
import { join } from 'path';

export const metadata: Metadata = {
    title: 'Sponsorship - Artem Novichkov',
    description: 'Sponsor Artem Novichkov&apos;s iOS development blog and reach thousands of iOS developers and Swift enthusiasts.',
    openGraph: {
        title: 'Sponsorship - Artem Novichkov',
        description: 'Sponsor Artem Novichkov&apos;s iOS development blog and reach thousands of iOS developers and Swift enthusiasts.',
        url: 'https://artemnovichkov.com/sponsorship',
        siteName: name,
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sponsorship - Artem Novichkov',
        description: 'Sponsor Artem Novichkov&apos;s iOS development blog and reach thousands of iOS developers and Swift enthusiasts.',
        creator: '@iosartem',
    }
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