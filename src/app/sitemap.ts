import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/api';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://artemnovichkov.com';
  const posts = getAllPosts();

  const staticEntries = [
    {
      url: `${baseUrl}/`,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/category`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sponsorship`,
      priority: 0.8,
    },
  ];

  const postEntries = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    priority: 0.7,
  }));

  return [...staticEntries, ...postEntries];
} 