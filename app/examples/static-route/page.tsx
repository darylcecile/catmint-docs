import { staticRoute } from "catmint/cache";

/**
 * This page is pre-rendered at build time using staticRoute().
 * The content is frozen at build time — it won't change on subsequent requests.
 */
export default staticRoute(function StaticRoutePage() {
  const buildTime = new Date().toISOString();

  return (
    <div>
      <h1>Static Route</h1>
      <p>
        <code>staticRoute()</code> marks a page for pre-rendering at build time.
        The HTML is generated once during <code>catmint build</code> and served as
        static content. This is ideal for pages that don&apos;t need per-request
        data.
      </p>

      <h2>Build-Time Data</h2>
      <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded">
        <div className="text-sm text-gray-600 mb-2">
          This timestamp was captured when the page was rendered:
        </div>
        <div className="font-mono text-lg">{buildTime}</div>
        <div className="text-xs text-gray-400 mt-2">
          Refresh the page — in production, this timestamp stays the same
          because the page was pre-rendered at build time.
        </div>
      </div>

      <h2 className="mt-8">Environment Info</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 max-w-md">
        <InfoBox label="Node.js" value={process.version} />
        <InfoBox label="Platform" value={process.platform} />
        <InfoBox label="PID" value={String(process.pid)} />
        <InfoBox label="Uptime" value={`${Math.round(process.uptime())}s`} />
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded border">
        <h3 className="font-semibold text-sm mb-2">Usage</h3>
        <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded overflow-auto">
          {`import { staticRoute } from "catmint/cache"

export default staticRoute(function MyPage() {
  // This runs at build time, not per-request
  return <div>Pre-rendered content</div>
})

// For dynamic routes, provide paths:
export default staticRoute(
  function BlogPost() { ... },
  {
    paths: async () => [
      { slug: "hello-world" },
      { slug: "getting-started" },
    ]
  }
)`}
        </pre>
        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside mt-3">
          <li>
            Wraps your page component — the framework detects{" "}
            <code>__catmintStatic</code> metadata
          </li>
          <li>
            Cannot access runtime request data (headers, cookies, query params)
          </li>
          <li>
            For dynamic routes (e.g., <code>/blog/[slug]</code>), provide a{" "}
            <code>paths</code> function that returns all parameter combinations
          </li>
          <li>
            In dev mode, the page still renders per-request for convenience
          </li>
        </ul>
      </div>
    </div>
  );
});

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-3 py-2 bg-gray-50 rounded border">
      <div className="text-xs text-gray-500 uppercase tracking-wide">
        {label}
      </div>
      <div className="font-mono text-sm mt-1">{value}</div>
    </div>
  );
}
