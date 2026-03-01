import { useState } from "react";
import { getServerTime, greetUser } from "./actions.fn";

export function ServerFnClient() {
  const [timeResult, setTimeResult] = useState<{
    time: string;
    pid: number;
    nodeVersion: string;
  } | null>(null);
  const [greetResult, setGreetResult] = useState<{
    message: string;
    timestamp: string;
  } | null>(null);
  const [name, setName] = useState("");
  const [loadingTime, setLoadingTime] = useState(false);
  const [loadingGreet, setLoadingGreet] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGetTime() {
    setLoadingTime(true);
    setError(null);
    try {
      const result = await getServerTime();
      setTimeResult(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to call server function",
      );
    } finally {
      setLoadingTime(false);
    }
  }

  async function handleGreet() {
    if (!name.trim()) return;
    setLoadingGreet(true);
    setError(null);
    try {
      const result = await greetUser({ name: name.trim() });
      setGreetResult(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to call server function",
      );
    } finally {
      setLoadingGreet(false);
    }
  }

  return (
    <div className="mt-4 space-y-6">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* getServerTime */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded">
        <h3 className="font-semibold text-sm mb-2">
          getServerTime() — via RPC
        </h3>
        <button
          type="button"
          onClick={handleGetTime}
          disabled={loadingTime}
          className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-medium transition-colors"
        >
          {loadingTime ? "Calling..." : "Call getServerTime()"}
        </button>
        {timeResult && (
          <div className="mt-3 p-3 bg-white rounded border font-mono text-sm">
            <div>time: {timeResult.time}</div>
            <div>pid: {timeResult.pid}</div>
            <div>node: {timeResult.nodeVersion}</div>
          </div>
        )}
      </div>

      {/* greetUser */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded">
        <h3 className="font-semibold text-sm mb-2">
          greetUser(&#123; name &#125;) — via RPC
        </h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGreet()}
            placeholder="Enter your name"
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-200"
          />
          <button
            type="button"
            onClick={handleGreet}
            disabled={loadingGreet || !name.trim()}
            className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-medium transition-colors"
          >
            {loadingGreet ? "Calling..." : "Call greetUser()"}
          </button>
        </div>
        {greetResult && (
          <div className="mt-3 p-3 bg-white rounded border text-sm">
            <div>{greetResult.message}</div>
            <div className="text-gray-400 text-xs mt-1">
              at {greetResult.timestamp}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
