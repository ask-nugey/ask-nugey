# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 blog/content site built with App Router, deployed on Cloudflare Workers using OpenNext.js. The site uses MDX for content with custom components and supports both Vercel and Cloudflare deployments.

## Common Development Commands

### Development
```bash
npm run dev          # Start development server (cleans .next first)
npm run dev:all      # Run dev server + watch posts in parallel
```

### Build & Deploy
```bash
npm run build                # Standard Next.js build
npm run deploy:worker        # Full Cloudflare deployment (generates posts, builds, deploys)
npm run deploy-dry:worker    # Dry run Cloudflare deployment
npm run preview:worker       # Build and preview locally for Cloudflare
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run format       # Run Prettier
npm run fix          # Run both Prettier and ESLint fix
```

### Utilities
```bash
npm run generate:posts    # Generate post slugs JSON
npm run watch:posts       # Watch for post changes
```

## Architecture & Key Patterns

### Content Management
- Blog posts are stored in `/src/post/[post-name]/` with:
  - `content.mdx` - MDX content with `%toc%` placeholder for table of contents
  - `meta.ts` - Metadata exports (title, description, createdAt, tags, thumbnail)
- Posts are wrapped in `<div className="article-content">` in the MDX files
- Custom MDX components defined in `/src/ui/components/MDX/MdxComponents.tsx`

### Styling System
- **Panda CSS** for utility-first styling with custom theme tokens
- **Ant Design v5** for UI components with custom theme configuration
- Custom styled MDX components (headings, tables, code blocks)

### Deployment Architecture
- **Cloudflare Workers**: Primary deployment target using OpenNext.js
  - KV namespace for Next.js caching (binding: `NEXT_CACHE_WORKERS_KV`)
  - Custom domain: ask-nugey.com
- **Vercel**: Alternative deployment option
- Server Actions enabled with 20MB body size limit

### Key Features
- MDX with plugins: rehype-katex (math), rehype-highlight (code), mdx-mermaid (diagrams)
- Table of Contents with scroll highlighting
- LinkCard component for URL previews
- AI OCR functionality in `/src/app/_actions/ai-ocr/`
- Incremental Static Regeneration with edge caching

### TypeScript Configuration
- Path aliases configured:
  - `@/*` → `./src/*`
  - `@@/*` → `./*`
- Typed routes experimental feature enabled

## Important Notes
- No testing framework is currently set up
- When adding new posts, run `npm run generate:posts` to update the post slugs
- The project uses Bun's lockfile (`bun.lockb`) but npm commands for consistency
- MDX content requires the article wrapper div for proper styling
- External links automatically open in new tabs via MDX component configuration