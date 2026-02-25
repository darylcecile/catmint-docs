import { useState } from "react";

export function ErrorTrigger() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("This error was triggered intentionally by the user!");
  }

  return (
    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded">
      <p className="text-sm text-gray-700 mb-3">
        Click the button below to throw a runtime error. The ErrorBoundary will
        catch it and show the fallback UI with a &ldquo;Try Again&rdquo; button.
      </p>
      <button
        type="button"
        onClick={() => setShouldThrow(true)}
        className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
      >
        Throw Error
      </button>
    </div>
  );
}
