import { type ReactNode } from "react";
import { ErrorBoundary } from "catmint/error";

/**
 * Client component wrapping ErrorBoundary with a predefined fallback.
 * This is needed because ErrorBoundary is a client component, and in RSC
 * you cannot pass functions (like the fallback render prop) from a server
 * component to a client component.
 */
export function ClientErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={({ error, reset }) => (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="text-red-800 font-semibold">Something went wrong</h3>
          <p className="text-red-600 text-sm mt-1 font-mono">{error.message}</p>
          <button
            type="button"
            onClick={reset}
            className="mt-3 px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}

export function ServerErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={({ error, reset }) => (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="text-red-800 font-semibold">Server Error Caught</h3>
          <p className="text-red-600 text-sm mt-1 font-mono">{error.message}</p>
          <button
            type="button"
            onClick={reset}
            className="mt-3 px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
