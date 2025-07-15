// Playground page for development/testing only
import markdownToHtml from '@/lib/markdownToHtml';
import { promises as fs } from 'fs';
import path from 'path';

export default async function Playground() {
  if (process.env.NODE_ENV === 'production') return null;

  const markdownPath = path.join(process.cwd(), 'src/app/playground/markdown.mdx');
  const markdown = await fs.readFile(markdownPath, 'utf-8');
  const content = await markdownToHtml(markdown);

  return (
    <div>
      <article>
        <h1 className="my-4 font-bold text-3xl tracking-tight text-zinc-800 dark:text-gray-100">
          Playground
        </h1>
        <div className="prose dark:prose-dark">
          {content}
        </div>
      </article>
    </div>
  );
} 