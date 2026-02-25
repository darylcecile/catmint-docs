import { useState } from "react";
import { invalidateCachedDemo } from "./cache-actions.fn";

export function CacheDemo() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleInvalidate() {
    setLoading(true);
    try {
      const res = await invalidateCachedDemo();
      setResult(
        `Cache invalidated at ${res.invalidatedAt}. Refresh the page to see new data.`,
      );
    } catch (err) {
      setResult(
        `Error: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded">
      <button
        type="button"
        onClick={handleInvalidate}
        disabled={loading}
        className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-medium transition-colors"
      >
        {loading
          ? "Invalidating..."
          : 'invalidateCache({ tag: "cached-demo" })'}
      </button>
      {result && <p className="mt-3 text-sm text-gray-700">{result}</p>}
    </div>
  );
}
