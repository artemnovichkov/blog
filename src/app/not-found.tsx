import { Metadata } from 'next';
import { name } from '@/lib/const';
import markdownToHtml from '@/lib/markdownToHtml';
import { readFileSync } from 'fs';
import { join } from 'path';

export const metadata: Metadata = {
  title: `404 - Page Not Found | ${name}`,
  description: 'Oops! This page seems to have wandered off into the digital void.',
};

export default async function NotFound() {
  const mdxPath = join(process.cwd(), 'content', '404.mdx');
  const mdxContent = readFileSync(mdxPath, 'utf8');
  const highlightedContent = await markdownToHtml(mdxContent);

  return (
    <div className="flex flex-col justify-center items-start mt-8">
      <h1 className="font-bold text-4xl tracking-tight mb-4 text-zinc-800 dark:text-gray-100">
        404 - Page Not Found
      </h1>
      
      <div className="prose dark:prose-dark w-full max-w-none mb-8">
        {highlightedContent}
      </div>
    </div>
  );
}