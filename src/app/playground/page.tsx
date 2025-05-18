// Playground page for development/testing only
import markdownToHtml from '@/lib/markdownToHtml';
import Experience from '../_components/experience';
import CodeBlock from '../_components/code-block';
import Callout from '../_components/callout';
import PostPreview from '../_components/post-preview';
import PostActions from '../_components/post-actions';
import PostHeader from '../_components/post-header';
import AudioPlayer from '../_components/audio-player';
import { FileTree } from '../_components/filetree';
import { promises as fs } from 'fs';
import path from 'path';

const mockPost = {
  slug: 'mock-post',
  title: 'Mock Post Title',
  description: 'A short description for the mock post.',
  date: '2024-06-01',
  cover: '/images/avatar.jpg',
  content: 'This is the content of the mock post. It is used for testing components.'
};

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