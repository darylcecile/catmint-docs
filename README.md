# Catmint Docs

The source code for the [Catmint](https://github.com/catmint-framework/catmint) documentation website, built with Catmint itself.

## What is Catmint?

Catmint is a full-stack React framework built on Vite. It uses React Server Components by default, file-based routing, and a deployment adapter pattern for Node.js, Vercel, and Cloudflare Workers. Catmint is currently in **pre-alpha**.

## Project Structure

```
app/
  layout.tsx              # Root layout (sidebar + content area)
  page.mdx                # Homepage
  globals.css             # Global styles
  getting-started/        # Installation, quick start, project structure
  guides/                 # In-depth guides (routing, RSC, caching, etc.)
  api/                    # API reference pages + live endpoint
  examples/               # Interactive demos (counter, todo, forms, etc.)
  adr/                    # Architecture Decision Records
catmint.config.ts         # Framework configuration
```

Documentation is written in MDX with syntax highlighting via Shiki and GitHub Flavored Markdown support.

## Running Locally

**Prerequisites:** [Node.js](https://nodejs.org/) 20+ OR [Bun](https://bun.sh/)

```bash
# Install dependencies
bun install

# Start the dev server (port 6468)
bun run dev

# Production build
bun run build

# Start the production server
bun run start
```

## Contributing

Contributions are welcome -- whether it's fixing a typo, improving a guide, or adding a new example.

### Content

- **Docs pages** live under `app/` as `page.mdx` files organized by section (`getting-started/`, `guides/`, `api/`).
- **Examples** are interactive pages under `app/examples/` using `.tsx` and `.client.tsx` files.
- **ADRs** are in `app/adr/` and document framework design decisions.

### Development Workflow

1. Fork and clone the repository
2. Install dependencies: `bun install`
3. Start the dev server: `bun run dev`
4. Make your changes -- the dev server supports HMR
5. Verify the build passes: `bun run build`
6. Open a pull request

### File Conventions

Catmint uses file-name conventions to enforce server/client boundaries:

| File | Purpose |
|------|---------|
| `page.tsx` / `page.mdx` | Route page component |
| `layout.tsx` | Layout wrapper |
| `loading.tsx` | Loading state |
| `error.tsx` | Error boundary |
| `endpoint.ts` | API endpoint |
| `*.client.tsx` | Client-side component |
| `*.server.ts` | Server-only module |
| `*.fn.ts` | Server function |

## License

[MIT](LICENSE)
