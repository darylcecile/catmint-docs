import { DataViewer } from "./data-viewer.client";

// This data is fetched on the server at render time.
// It will never be exposed as client-side JavaScript.
async function getServerStats() {
  const uptime = process.uptime();
  const mem = process.memoryUsage();
  return {
    serverTime: new Date().toISOString(),
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    uptime: Math.round(uptime),
    memoryMB: Math.round(mem.heapUsed / 1024 / 1024),
    pid: process.pid,
  };
}

export default async function ServerDataPage() {
  const stats = await getServerStats();

  return (
    <div>
      <h1>Server + Client Data</h1>
      <p>
        This page demonstrates the server/client boundary. The server component
        fetches data using Node.js APIs (like <code>process.uptime()</code>) and
        passes it as props to a client component that adds interactivity.
      </p>

      <h2>Server-Rendered Stats</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 max-w-md">
        <Stat label="Server Time" value={stats.serverTime} />
        <Stat label="Node.js" value={stats.nodeVersion} />
        <Stat label="Platform" value={`${stats.platform} (${stats.arch})`} />
        <Stat label="Uptime" value={`${stats.uptime}s`} />
        <Stat label="Memory" value={`${stats.memoryMB} MB`} />
        <Stat label="PID" value={String(stats.pid)} />
      </div>

      <h2 className="mt-8">Client-Side Interaction</h2>
      <p>
        The component below is a client component. It receives the server time
        as an initial prop but can refresh independently.
      </p>
      <DataViewer initialServerTime={stats.serverTime} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-3 py-2 bg-gray-50 rounded border">
      <div className="text-xs text-gray-500 uppercase tracking-wide">
        {label}
      </div>
      <div className="font-mono text-sm mt-1 truncate">{value}</div>
    </div>
  );
}
