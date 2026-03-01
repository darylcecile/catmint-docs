import { useState, useEffect } from "react";

interface Props {
  initialServerTime: string;
}

export function DataViewer({ initialServerTime }: Props) {
  const [serverTime] = useState(initialServerTime);
  const [clientTime, setClientTime] = useState<string>("");
  const [elapsed, setElapsed] = useState(0);
  const [ticking, setTicking] = useState(true);

  // Set initial client time after hydration
  useEffect(() => {
    setClientTime(new Date().toISOString());
  }, []);

  // Tick every second when enabled
  useEffect(() => {
    if (!ticking) return;
    const interval = setInterval(() => {
      setElapsed((e) => e + 1);
      setClientTime(new Date().toISOString());
    }, 1000);
    return () => clearInterval(interval);
  }, [ticking]);

  return (
    <div className="mt-4 space-y-4 max-w-md">
      <div className="space-y-2">
        <Row label="Server time (frozen)" value={serverTime} />
        <Row label="Client time (live)" value={clientTime || "hydrating..."} />
        <Row label="Seconds since hydration" value={String(elapsed)} />
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setTicking((t) => !t)}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            ticking
              ? "bg-amber-100 hover:bg-amber-200 text-amber-800"
              : "bg-green-100 hover:bg-green-200 text-green-800"
          }`}
        >
          {ticking ? "Pause" : "Resume"}
        </button>
        <button
          type="button"
          onClick={() => setElapsed(0)}
          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm transition-colors"
        >
          Reset Timer
        </button>
      </div>
      <p className="text-sm text-gray-500">
        Notice the server time never changes &mdash; it was rendered once on the
        server. The client time updates every second in the browser.
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center px-3 py-2 bg-gray-50 rounded border">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="font-mono text-sm">{value}</span>
    </div>
  );
}
