import { Suspense } from "react";
import { SlowComponent } from "./slow-component";
import { ErrorProne } from "./error-prone";
import { ErrorTrigger } from "./error-trigger.client";
import {
  ClientErrorBoundary,
  ServerErrorBoundary,
} from "./error-boundary-demo.client";

export default function LoadingErrorPage() {
  return (
    <div>
      <h1>Loading &amp; Error States</h1>
      <p>
        Catmint uses file-based conventions for loading and error UI. Place a{" "}
        <code>loading.tsx</code> in a route directory for Suspense fallbacks,
        and an <code>error.tsx</code> for error boundaries.
      </p>

      <h2>Suspense with Async Components</h2>
      <p>
        The component below is an async server component that takes 2 seconds to
        resolve. While it loads, React shows the Suspense fallback. In a real
        app, <code>loading.tsx</code> in the route directory would provide this
        automatically.
      </p>
      <Suspense
        fallback={
          <div className="mt-4 p-6 bg-blue-50 border border-blue-200 rounded animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-blue-600 font-medium">
                Loading slow data...
              </span>
            </div>
          </div>
        }
      >
        <SlowComponent delay={2000} />
      </Suspense>

      <h2 className="mt-8">Error Boundary</h2>
      <p>
        The component below throws an error on demand. The{" "}
        <code>ErrorBoundary</code> catches it and shows a fallback with a reset
        button. In a real app, <code>error.tsx</code> in the route directory
        provides this automatically.
      </p>
      <ClientErrorBoundary>
        <ErrorTrigger />
      </ClientErrorBoundary>

      <h2 className="mt-8">Server Error (Async)</h2>
      <p>
        Async server components can also throw. The error boundary catches
        rendering errors from any child, whether sync or async.
      </p>
      <ServerErrorBoundary>
        <Suspense
          fallback={
            <div className="mt-4 p-4 bg-gray-100 rounded animate-pulse text-gray-500">
              Loading error-prone component...
            </div>
          }
        >
          <ErrorProne />
        </Suspense>
      </ServerErrorBoundary>

      <div className="mt-8 p-4 bg-gray-50 rounded border">
        <h3 className="font-semibold text-sm mb-2">File Convention</h3>
        <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded overflow-auto">
          {`app/
  dashboard/
    page.tsx        # Your page
    loading.tsx     # Suspense fallback (auto-wrapped)
    error.tsx       # Error boundary (auto "use client")

// loading.tsx
export default function Loading() {
  return <div>Loading dashboard...</div>
}

// error.tsx — receives { error, reset } props
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <p>Error: {error.message}</p>
      <button onClick={reset}>Retry</button>
    </div>
  )
}`}
        </pre>
        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside mt-3">
          <li>
            <code>loading.tsx</code> is used as the Suspense fallback for the
            route segment
          </li>
          <li>
            <code>error.tsx</code> is automatically treated as a client
            component (the Vite plugin injects{" "}
            <code>&quot;use client&quot;</code>)
          </li>
          <li>
            Error boundaries don&apos;t catch errors from{" "}
            <code>layout.tsx</code> in the same directory
          </li>
          <li>
            Both files walk up the directory tree — parent loading/error files
            apply to child routes
          </li>
        </ul>
      </div>
    </div>
  );
}
