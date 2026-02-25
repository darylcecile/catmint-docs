import { InteractivePanel } from "./interactive-panel.client";
import { ToggleDetails } from "./toggle-details.client";
import { ServerInfo } from "./server-info";

export default function BoundariesPage() {
  const renderTime = new Date().toISOString();

  return (
    <div>
      <h1>Server &amp; Client Boundaries</h1>
      <p>
        This example demonstrates how server and client components nest together
        in React Server Components. Each colored box shows its environment and
        whether it can use hooks or access server-only APIs.
      </p>

      {/* Level 0: This page is a Server Component */}
      <ComponentBox env="server" name="Page (Server Component)" depth={0}>
        <p className="text-sm text-gray-600 mb-3">
          Rendered on the server at <code>{renderTime}</code>. This component
          can access Node.js APIs, read from databases, and use{" "}
          <code>async/await</code> directly.
        </p>

        {/* Level 1: Client component with children slot (donut pattern) */}
        <InteractivePanel title="Interactive Panel">
          {/* Level 2: Server component passed as children into client */}
          <ComponentBox
            env="server"
            name="ServerInfo (Server Component)"
            depth={2}
          >
            <p className="text-sm text-gray-600 mb-2">
              This server component is passed as <code>children</code> into the
              client panel above. It renders on the server even though its
              parent is a client component &mdash; this is the &ldquo;donut
              pattern&rdquo;.
            </p>
            <ServerInfo />
          </ComponentBox>

          {/* Level 2: Another client component inside the server children */}
          <ComponentBox
            env="client"
            name="ToggleDetails (Client Component)"
            depth={2}
          >
            <ToggleDetails
              summary="Why does this work?"
              details="Server components can be passed as children (or any prop) to client components. The server renders them into a serializable tree before the client component ever sees them. The client component just renders {children} — it doesn't need to know they came from the server."
            />
          </ComponentBox>
        </InteractivePanel>

        {/* Level 1: Another server component at the same level */}
        <ComponentBox env="server" name="Static Server Content" depth={1}>
          <p className="text-sm text-gray-600">
            This server component sits alongside the client panel. It has no
            interactivity — just static content rendered once on the server.
          </p>
        </ComponentBox>
      </ComponentBox>

      <div className="mt-8 p-4 bg-gray-50 rounded border">
        <h3 className="font-semibold text-sm mb-2">Key Takeaways</h3>
        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
          <li>
            Server components are the default &mdash; no special suffix needed
          </li>
          <li>
            Client components use the <code>.client.tsx</code> naming convention
          </li>
          <li>
            The &ldquo;donut pattern&rdquo;: pass server content as{" "}
            <code>children</code> into a client component
          </li>
          <li>
            Client boundaries don&apos;t &ldquo;infect&rdquo; their children
            &mdash; server components can appear inside client components via
            props
          </li>
          <li>
            You <em>cannot</em> import a server component directly from a client
            component &mdash; only pass it as a prop
          </li>
        </ul>
      </div>
    </div>
  );
}

function ComponentBox({
  env,
  name,
  depth,
  children,
}: {
  env: "server" | "client";
  name: string;
  depth: number;
  children: React.ReactNode;
}) {
  const colors =
    env === "server"
      ? "border-blue-300 bg-blue-50"
      : "border-amber-300 bg-amber-50";
  const badge =
    env === "server"
      ? "bg-blue-200 text-blue-800"
      : "bg-amber-200 text-amber-800";
  const indent = depth > 0 ? "ml-4" : "";

  return (
    <div className={`${indent} mt-4 p-4 border-2 rounded-lg ${colors}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-xs font-bold px-2 py-0.5 rounded ${badge}`}>
          {env === "server" ? "SERVER" : "CLIENT"}
        </span>
        <span className="text-sm font-semibold">{name}</span>
      </div>
      {children}
    </div>
  );
}
