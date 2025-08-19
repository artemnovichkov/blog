import type { Metadata } from 'next'
import { about, name } from '@/lib/const'
import markdownToHtml from '@/lib/markdownToHtml'
import { readFileSync } from 'fs';
import { join } from 'path';

const title = `${name} | Sponsorship`;

export const metadata: Metadata = {
    title,
    openGraph: {
        title: name,
        description: about,
        url: 'https://www.artemnovichkov.com/',
        siteName: title,
        images: ['https://www.artemnovichkov.com/images/banner.png'],
      },
      twitter: {
        card: 'summary_large_image',
        title: name,
        description: about,
        siteId: '3081906297',
        creator: '@iosartem',
        creatorId: '3081906297',
        images: ['https://www.artemnovichkov.com/images/banner.png'],
      },
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