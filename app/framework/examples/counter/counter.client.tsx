import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setCount((c) => c - 1)}
          className="px-4 py-2 rounded bg-red-100 hover:bg-red-200 text-red-800 font-medium transition-colors"
        >
          - Decrement
        </button>
        <span className="text-3xl font-bold tabular-nums min-w-[80px] text-center">
          {count}
        </span>
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          className="px-4 py-2 rounded bg-green-100 hover:bg-green-200 text-green-800 font-medium transition-colors"
        >
          + Increment
        </button>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setCount(0)}
          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm transition-colors"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={() => setCount((c) => c * 2)}
          className="px-3 py-1 rounded bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm transition-colors"
        >
          Double
        </button>
      </div>
      <p className="text-sm text-gray-500">
        Count is {count === 0 ? "zero" : count > 0 ? "positive" : "negative"}.
      </p>
    </div>
  );
}
