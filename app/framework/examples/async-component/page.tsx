import { Suspense } from "react";

export default function AsyncComponentPage() {
  return (
    <div>
      <h1>Async Components</h1>
      <p>
        In Catmint, server components can be <code>async</code> functions. They
        can use <code>await</code> directly to fetch data, read files, or query
        databases. React streams the HTML as each component resolves.
      </p>

      <h2>Parallel Data Fetching</h2>
      <p>
        Multiple async components wrapped in <code>&lt;Suspense&gt;</code> load
        in parallel. Each one streams to the client as soon as it resolves,
        independent of the others.
      </p>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Suspense fallback={<Skeleton label="User Profile" />}>
          <UserProfile />
        </Suspense>
        <Suspense fallback={<Skeleton label="Recent Activity" />}>
          <RecentActivity />
        </Suspense>
        <Suspense fallback={<Skeleton label="System Stats" />}>
          <SystemStats />
        </Suspense>
      </div>

      <h2 className="mt-8">Sequential Fetching</h2>
      <p>
        Without Suspense boundaries between them, async components render
        sequentially — the parent awaits before rendering children. This
        component takes 1 second, then its child takes another second.
      </p>
      <Suspense fallback={<Skeleton label="Sequential data" />}>
        <SequentialParent />
      </Suspense>

      <h2 className="mt-8">Nested Suspense</h2>
      <p>
        Suspense boundaries can nest. The outer shell loads first (500ms), then
        the inner detail loads (1500ms). Each level shows its own fallback.
      </p>
      <Suspense fallback={<Skeleton label="Outer shell" />}>
        <OuterShell />
      </Suspense>

      <div className="mt-8 p-4 bg-gray-50 rounded border">
        <h3 className="font-semibold text-sm mb-2">Key Points</h3>
        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
          <li>
            Server components can be <code>async</code> — use <code>await</code>{" "}
            directly
          </li>
          <li>
            Wrap async components in <code>&lt;Suspense&gt;</code> for streaming
          </li>
          <li>
            Parallel <code>&lt;Suspense&gt;</code> boundaries = parallel data
            loading
          </li>
          <li>
            Without Suspense, async components block their children (waterfall)
          </li>
          <li>
            Nested Suspense boundaries enable progressive loading patterns
          </li>
          <li>
            All <code>await</code> data stays on the server — never sent to the
            client bundle
          </li>
        </ul>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Async server components
// ---------------------------------------------------------------------------

async function UserProfile() {
  await delay(800);
  return (
    <DataCard
      title="User Profile"
      color="blue"
      delay="800ms"
      data={{
        name: "Alice Johnson",
        email: "alice@example.com",
        role: "Admin",
        joined: "2024-01-15",
      }}
    />
  );
}

async function RecentActivity() {
  await delay(1200);
  const activities = [
    { action: "Deployed v2.1.0", time: "2 hours ago" },
    { action: "Merged PR #142", time: "5 hours ago" },
    { action: "Created issue #87", time: "1 day ago" },
  ];
  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded">
      <div className="text-xs text-green-600 uppercase tracking-wide font-medium">
        Recent Activity (1200ms)
      </div>
      <ul className="mt-2 space-y-2">
        {activities.map((a) => (
          <li key={a.action} className="text-sm">
            <span className="text-gray-800">{a.action}</span>
            <span className="text-gray-400 text-xs ml-2">{a.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

async function SystemStats() {
  await delay(500);
  return (
    <DataCard
      title="System Stats"
      color="purple"
      delay="500ms"
      data={{
        node: process.version,
        platform: process.platform,
        pid: String(process.pid),
        memory: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
      }}
    />
  );
}

async function SequentialParent() {
  await delay(1000);
  const parentTime = new Date().toISOString();

  return (
    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
      <div className="text-xs text-blue-600 uppercase tracking-wide font-medium">
        Parent (1000ms)
      </div>
      <div className="font-mono text-sm mt-1">Resolved at: {parentTime}</div>
      <SequentialChild />
    </div>
  );
}

async function SequentialChild() {
  await delay(1000);
  const childTime = new Date().toISOString();

  return (
    <div className="mt-3 ml-4 p-3 bg-amber-50 border border-amber-200 rounded">
      <div className="text-xs text-amber-600 uppercase tracking-wide font-medium">
        Child (1000ms after parent)
      </div>
      <div className="font-mono text-sm mt-1">Resolved at: {childTime}</div>
      <div className="text-xs text-gray-500 mt-1">
        Total wait: ~2000ms (sequential, no Suspense between them)
      </div>
    </div>
  );
}

async function OuterShell() {
  await delay(500);

  return (
    <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded">
      <div className="text-xs text-indigo-600 uppercase tracking-wide font-medium">
        Outer Shell (500ms)
      </div>
      <div className="font-mono text-sm mt-1">
        Loaded at: {new Date().toISOString()}
      </div>
      <Suspense
        fallback={
          <div className="mt-3 ml-4 p-3 bg-gray-100 rounded animate-pulse text-gray-400 text-sm">
            Loading inner detail...
          </div>
        }
      >
        <InnerDetail />
      </Suspense>
    </div>
  );
}

async function InnerDetail() {
  await delay(1500);

  return (
    <div className="mt-3 ml-4 p-3 bg-violet-50 border border-violet-200 rounded">
      <div className="text-xs text-violet-600 uppercase tracking-wide font-medium">
        Inner Detail (1500ms)
      </div>
      <div className="font-mono text-sm mt-1">
        Loaded at: {new Date().toISOString()}
      </div>
      <div className="text-xs text-gray-500 mt-1">
        This appeared after the outer shell was already visible.
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared helpers (server-only)
// ---------------------------------------------------------------------------

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function DataCard({
  title,
  color,
  delay: delayLabel,
  data,
}: {
  title: string;
  color: "blue" | "purple";
  delay: string;
  data: Record<string, string>;
}) {
  const colors =
    color === "blue"
      ? "bg-blue-50 border-blue-200 text-blue-600"
      : "bg-purple-50 border-purple-200 text-purple-600";

  return (
    <div className={`p-4 border rounded ${colors}`}>
      <div className="text-xs uppercase tracking-wide font-medium">
        {title} ({delayLabel})
      </div>
      <div className="mt-2 space-y-1">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="text-sm">
            <span className="text-gray-500">{key}:</span>{" "}
            <span className="font-mono text-gray-800">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Skeleton({ label }: { label: string }) {
  return (
    <div className="p-4 bg-gray-100 border border-gray-200 rounded animate-pulse">
      <div className="text-xs text-gray-400 uppercase tracking-wide font-medium">
        {label}
      </div>
      <div className="mt-3 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
      </div>
    </div>
  );
}
