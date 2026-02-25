import { defineConfig } from "catmint/config";
import tailwindcss from "@tailwindcss/vite";
import remarkGfm from "remark-gfm";
import rehypeShiki from "@shikijs/rehype";

export default defineConfig({
  mode: "fullstack",
  server: {
    port: 6468,
  },
  build: {
    outDir: "dist",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypeShiki,
        {
          theme: "github-dark",
        },
      ],
    ],
  },
});
