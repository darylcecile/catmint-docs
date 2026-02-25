// This is a SERVER component — no "use client", no .client.tsx suffix.
// It uses Node.js APIs that are only available on the server.

export function ServerInfo() {
  const data = {
    nodeVersion: process.version,
    platform: process.platform,
    pid: process.pid,
    uptime: `${Math.round(process.uptime())}s`,
    renderedAt: new Date().toISOString(),
  };

  return (
    <div className="grid grid-cols-2 gap-2 text-sm">
      {Object.entries(data).map(([key, value]) => (
        <div
          key={key}
          className="flex justify-between bg-blue-100 rounded px-2 py-1"
        >
          <span className="text-blue-600 font-mono">{key}:</span>
          <span className="text-blue-900 font-mono">{value}</span>
        </div>
      ))}
      <div className="col-span-2 text-xs text-blue-500 mt-1">
        This data comes from <code>process.*</code> &mdash; proof this component
        ran on the server, not in the browser.
      </div>
    </div>
  );
}
