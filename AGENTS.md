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
- `npm run build`: creates a production build and validates route generation.
- `npm start`: serves the production build after `npm run build`.
- `npm run lint`: runs Biome checks across the configured files.
- `npm run lint:fix`: applies safe Biome lint fixes.
- `npm run format`: formats files with Biome.
- `npm run optimize-images`: runs `scripts/optimize-images.sh` for image assets.

There is no dedicated test command currently. Use `npm run lint` and
`npm run build` before submitting changes.

## Coding Style & Naming Conventions

Use TypeScript and React patterns already present in `src/app`. Biome enforces
2-space indentation, LF line endings, 80-character line width, double quotes,
trailing commas where valid in ES5, and semicolons only when needed. Prefer
descriptive kebab-case filenames for components and routes, such as
`post-preview.tsx` or `view-counter.tsx`. Keep MDX post slugs lowercase and
kebab-cased, matching the filename in `content/posts/`.

## Content Guidelines

Each blog post should include frontmatter consumed by `src/lib/api.ts`, such as
`title`, `description`, `date`, cover image, and categories. Code examples in
posts commonly target Swift/iOS development; preserve accurate language tags
for syntax highlighting.

## Commit & Pull Request Guidelines

Recent commits use short imperative or descriptive messages, for example
`Update callout`, `Remove firebase-admin dependency and credentials`, or
`Bump next to 16.2.4`. Keep commits focused and mention user-visible behavior
or dependency changes directly.

Pull requests should include a concise summary, validation steps
(`npm run lint`, `npm run build`), linked issues when relevant, and screenshots
for visual changes to pages, components, or MDX rendering.

## Security & Configuration Tips

Do not commit secrets, credentials, or local environment files. View counting
uses external services; keep related tokens in deployment or local environment
configuration rather than source files.
