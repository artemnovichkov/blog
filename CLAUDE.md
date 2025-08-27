# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog built with Next.js 15, TypeScript, and Tailwind CSS. The blog features MDX posts with Swift/iOS development content, custom MDX components, and a modern responsive design with dark mode support.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint the codebase
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code
npm run format
```

## Architecture

### Content Management
- Blog posts are stored as MDX files in `content/posts/`
- Posts are processed using gray-matter for frontmatter extraction
- Post metadata includes: title, description, date, cover image, and categories
- Categories can be defined as comma-separated strings and are automatically split into arrays

### MDX Processing
- MDX content is compiled using next-mdx-remote with server-side rendering
- Syntax highlighting via rehype-pretty-code with GitHub themes (light/dark)
- Default language is Swift for code blocks
- Custom MDX components: Tweet, Callout, FileTree, AudioPlayer, CodeBlock

### File Structure
```
src/
├── app/                    # Next.js App Router
│   ├── _components/        # Reusable React components
│   ├── api/views/         # API routes for view counting
│   ├── blog/              # Blog pages and category pages
│   └── layout.tsx         # Root layout with metadata
├── interfaces/            # TypeScript type definitions
└── lib/                   # Utility functions
    ├── api.ts            # Post fetching and processing
    ├── markdownToHtml.ts # MDX compilation
    └── firebase.ts       # Firebase integration for analytics
```

### Styling
- Tailwind CSS with custom typography plugin
- Dark mode support using media query strategy
- Custom color scheme for light/dark themes
- Typography variants for proper dark mode text rendering

### Key Components
- `post-preview.tsx`: Displays post cards with cover images, metadata, and reading time
- `markdownToHtml.ts`: Handles MDX compilation with custom components and plugins
- `api.ts`: Core post management functions (getPostBySlug, getAllPosts, getAllCategories)

### External Integrations
- Vercel Analytics for page views
- Firebase Admin SDK for custom analytics
- Twitter embeds via react-tweet