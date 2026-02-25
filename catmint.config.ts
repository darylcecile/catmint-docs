import { defineConfig } from "catmint/config";
import tailwindcss from "@tailwindcss/vite";
import remarkGfm from "remark-gfm";
import rehypeShiki from "@shikijs/rehype";
import vercel from "@catmint/adapter-vercel";

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
    ssr: {
      noExternal: ["@radix-ui/**", "cmdk"],
    },
  },
  adapter: vercel(),
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
