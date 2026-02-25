import { getServerTime } from "./actions.fn";
import { ServerFnClient } from "./server-fn-client.client";

export default async function ServerFnPage() {
  // Call the server function directly — no RPC overhead on the server.
  const timeData = await getServerTime();

  return (
    <div>
      <h1>Server Functions</h1>
      <p>
        <code>createServerFn</code> creates functions that run on the server but
        can be called from both server and client components. On the server they
        execute directly. On the client, Catmint transforms the call into an RPC{" "}
        <code>fetch()</code> request.
      </p>

      <h2>Called from a Server Component</h2>
      <p>
        The server function was called directly during SSR — no HTTP request,
        just a function call:
      </p>
      <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded font-mono text-sm">
        <div>time: {timeData.time}</div>
        <div>pid: {timeData.pid}</div>
        <div>node: {timeData.nodeVersion}</div>
      </div>

      <h2 className="mt-8">Called from a Client Component</h2>
      <p>
        The same server functions can be called from a client component. The
        Vite plugin rewrites the <code>.fn.ts</code> import into a{" "}
        <code>fetch()</code> stub pointing to <code>/__catmint/fn/...</code>.
      </p>
      <ServerFnClient />

      <div className="mt-8 p-4 bg-gray-50 rounded border">
        <h3 className="font-semibold text-sm mb-2">How It Works</h3>
        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
          <li>
            Define server functions in <code>*.fn.ts</code> files using{" "}
            <code>createServerFn()</code>
          </li>
          <li>Server components call them directly — zero overhead</li>
          <li>
            Client components import the same function — Vite rewrites it to an
            RPC fetch stub
          </li>
          <li>
            Input validation is supported via Standard Schema (Zod, Valibot,
            etc.) or plain functions
          </li>
          <li>Methods: GET, POST, PUT, DELETE (default: POST)</li>
        </ul>
      </div>
    </div>
  );
}
