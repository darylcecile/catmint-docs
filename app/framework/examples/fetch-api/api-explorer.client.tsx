import { useState } from "react";

interface ApiResponse {
  message: string;
  timestamp: string;
  method?: string;
  received?: Record<string, unknown>;
}

export function ApiExplorer() {
  const [method, setMethod] = useState<"GET" | "POST">("GET");
  const [name, setName] = useState("");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<
    { method: string; name: string; result: string; time: string }[]
  >([]);

  async function callApi() {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      let res: Response;
      const nameParam = name.trim() || "World";

      if (method === "GET") {
        const url = `/api/hello?name=${encodeURIComponent(nameParam)}`;
        res = await fetch(url);
      } else {
        res = await fetch("/api/hello", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: nameParam }),
        });
      }

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data: ApiResponse = await res.json();
      setResponse(data);
      setHistory((h) => [
        {
          method,
          name: nameParam,
          result: data.message,
          time: new Date().toLocaleTimeString(),
        },
        ...h.slice(0, 9),
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 space-y-6 max-w-lg">
      {/* Controls */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMethod("GET")}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              method === "GET"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            GET
          </button>
          <button
            type="button"
            onClick={() => setMethod("POST")}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              method === "POST"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            POST
          </button>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && callApi()}
            placeholder="Enter a name (default: World)"
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button
            type="button"
            onClick={callApi}
            disabled={loading}
            className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-medium transition-colors"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
        <p className="text-xs text-gray-400 font-mono">
          {method} /api/hello
          {method === "GET" && name.trim()
            ? `?name=${encodeURIComponent(name.trim())}`
            : ""}
        </p>
      </div>

      {/* Response */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          Error: {error}
        </div>
      )}
      {response && (
        <div className="p-4 bg-gray-900 text-gray-100 rounded font-mono text-sm overflow-auto">
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Request History
          </h3>
          <div className="space-y-1">
            {history.map((entry, i) => (
              <div
                key={`${entry.time}-${i}`}
                className="flex items-center gap-2 text-xs text-gray-500 py-1"
              >
                <span
                  className={`px-1.5 py-0.5 rounded font-medium ${
                    entry.method === "GET"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {entry.method}
                </span>
                <span className="flex-1 truncate">{entry.result}</span>
                <span className="text-gray-400">{entry.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
