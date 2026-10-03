# Repository Guidelines

## Project Structure & Module Organization

This repository contains a personal blog built with Next.js, TypeScript, MDX,
and Tailwind CSS. Application code lives in `src/`, with App Router pages and
routes under `src/app/`. Reusable UI components are in
`src/app/_components/`, shared types are in `src/interfaces/`, and content
loading or MDX utilities are in `src/lib/`.

Blog posts are stored as MDX files in `content/posts/`. Standalone MDX pages,
such as `content/404.mdx` and `content/sponsorship.mdx`, live in `content/`.
Static assets are in `public/`, including images, audio, videos, icons, and
`robots.txt`. Utility scripts are in `scripts/`.

## Build, Test, and Development Commands

- `npm run dev`: starts the local Next.js development server.
- `npm run build -- --webpack`: creates a production build and validates route
  generation. Use this webpack variant for agent-run validation because the
  default Next.js 16.3.0 Turbopack build hangs at the compilation step in the
  Codex environment.
- `npm start`: serves the production build after `npm run build`.
- `npm run lint`: runs Biome checks across the configured files.
- `npm run lint:fix`: applies safe Biome lint fixes.
- `npm run format`: formats files with Biome.
- `npm run optimize-images`: runs `scripts/optimize-images.sh` for image assets.

There is no dedicated test command currently. Use `npm run lint` and
`npm run build -- --webpack` before submitting changes. Do not run a production
build alongside `npm run dev`. When Codex starts a Next.js process, stop it and
confirm that no child `next dev` or `next-build` process remains before starting
another build.

## Coding Style & Naming Conventions

Use TypeScript and React patterns already present in `src/app`. Biome enforces
2-space indentation, LF line endings, 80-character line width, double quotes,
trailing commas where valid in ES5, and semicolons only when needed. Prefer
descriptive kebab-case filenames for components and routes, such as
`post-preview.tsx` or `view-counter.tsx`. Keep MDX post slugs lowercase and
kebab-cased, matching the filename in `content/posts/`.

## Content Guidelines

Each blog post needs frontmatter consumed by `src/lib/api.ts`:

```yaml
---
title: Post Title
description: One-line summary
cover: /images/<slug>/cover.png
date: '2026-06-21'
categories:
  - swiftui
  - wwdc25
---
```

`updated` is optional. Add it when a post is meaningfully revised, and it
becomes the post's `dateModified` in JSON-LD, Open Graph, and the sitemap;
without it those fall back to `date`. Skip it for typo fixes.

```yaml
updated: '2026-08-18'
```

`categories` is a YAML list (not a comma-separated string). The cover image
and any inline images live in `public/images/<slug>/`, matching the post's
slug/filename. Code examples commonly target Swift/iOS development; preserve
accurate language tags for syntax highlighting.

MDX components available in post bodies (registered in
`src/lib/markdownToHtml.ts`): `<Callout type="info|warning|error" emoji="...">`,
`<FileTree>` / `<FileTree.File>` / `<FileTree.Folder>`, `<AudioPlayer src="...">`,
`<Tweet id="...">`, and `<OpenInXcode repo="owner/name">`. `<AdBlock>` is
injected automatically on post pages from `src/lib/sponsorship-config.ts` and
doesn't need to be authored inline.

`<OpenInXcode>` renders a "Clone in Xcode" card (`xcode://clone?repo=...`) on
macOS only. Place it right after the paragraph that links the post's example
repository, usually near the end of the post.

## Commit & Pull Request Guidelines

Recent commits use short imperative or descriptive messages, for example
`Update callout`, `Remove firebase-admin dependency and credentials`, or
`Bump next to 16.2.4`. Keep commits focused and mention user-visible behavior
or dependency changes directly.

Pull requests should include a concise summary, validation steps
(`npm run lint`, `npm run build -- --webpack`), linked issues when relevant, and
screenshots for visual changes to pages, components, or MDX rendering.

## Security & Configuration Tips

Do not commit secrets, credentials, or local environment files. View counting
uses external services; keep related tokens in deployment or local environment
configuration rather than source files.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
