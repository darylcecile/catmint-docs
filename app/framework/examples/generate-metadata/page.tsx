import type { HeadConfig } from "catmint/head";

/**
 * generateMetadata is called by the framework during server rendering.
 * It receives route params and search params, and returns head tags.
 */
export async function generateMetadata({
  params,
  search,
}: {
  params: Record<string, string | string[]>;
  search: Record<string, string>;
}): Promise<HeadConfig> {
  const name = typeof search.name === "string" ? search.name : "Catmint";

  return {
    title: `${name} — generateMetadata Example`,
    meta: [
      {
        name: "description",
        content: `A demo page showing dynamic metadata for ${name}.`,
      },
      { property: "og:title", content: `${name} — generateMetadata Example` },
      {
        property: "og:description",
        content: "Dynamic Open Graph metadata set at render time.",
      },
      { name: "robots", content: "noindex" },
    ],
    link: [
      {
        rel: "canonical",
        href: "https://catmint.dev/examples/generate-metadata",
      },
    ],
  };
}

export default function GenerateMetadataPage() {
  return (
    <div>
      <h1>generateMetadata</h1>
      <p>
        Export <code>generateMetadata</code> from any <code>page.tsx</code> or{" "}
        <code>layout.tsx</code> to set <code>&lt;head&gt;</code> tags at render
        time. The function runs on the server and receives route params and
        search params, so metadata can depend on fetched data.
      </p>

      <h2>Try It</h2>
      <p>
        Add <code>?name=YourName</code> to the URL and inspect the page title
        and <code>&lt;meta&gt;</code> tags in DevTools. The title and
        description will reflect the query parameter.
      </p>

      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
        <div className="text-sm text-gray-600 mb-2">Current URL examples:</div>
        <ul className="text-sm font-mono space-y-1 list-disc list-inside">
          <li>/examples/generate-metadata</li>
          <li>/examples/generate-metadata?name=Alice</li>
          <li>/examples/generate-metadata?name=Bob</li>
        </ul>
      </div>

      <h2 className="mt-8">How It Works</h2>
      <div className="mt-3 p-4 bg-gray-50 rounded border">
        <h3 className="font-semibold text-sm mb-2">Usage</h3>
        <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded overflow-auto">
          {`import type { HeadConfig } from "catmint/head"

export async function generateMetadata({
  params,
  search,
}: {
  params: Record<string, string | string[]>
  search: Record<string, string>
}): Promise<HeadConfig> {
  // Fetch data, read params, etc.
  const post = await db.posts.findBySlug(params.slug)

  return {
    title: post.title,
    meta: [
      { name: "description", content: post.excerpt },
      { property: "og:title", content: post.title },
      { property: "og:image", content: post.coverUrl },
    ],
  }
}

export default function BlogPost() {
  return <article>...</article>
}`}
        </pre>
        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside mt-3">
          <li>
            Runs on the <strong>server only</strong> — safe to call databases,
            internal APIs, or read secrets
          </li>
          <li>
            Returns a <code>HeadConfig</code> with <code>title</code>,{" "}
            <code>meta[]</code>, and <code>link[]</code>
          </li>
          <li>
            Works in both <code>page.tsx</code> and <code>layout.tsx</code> —
            layout metadata merges with page metadata (page wins on conflicts)
          </li>
          <li>
            Takes precedence over <code>&lt;Head&gt;</code> components for
            conflicting tags
          </li>
          <li>
            For client-side dynamic updates, use <code>useHead()</code> instead
          </li>
        </ul>
      </div>
    </div>
  );
}
