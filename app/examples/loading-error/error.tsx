export default function LoadingErrorError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-8">
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg max-w-lg">
        <h2 className="text-red-800 font-bold text-lg">Route Error</h2>
        <p className="text-red-600 mt-2 font-mono text-sm">{error.message}</p>
        <p className="text-gray-500 text-sm mt-3">
          This is the route-level error.tsx boundary. It catches any unhandled
          error in this route segment.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-4 px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
