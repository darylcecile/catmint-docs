/**
 * An async server component that intentionally takes a while to render.
 * Used to demonstrate Suspense loading states.
 */
export async function SlowComponent({ delay }: { delay: number }) {
  await new Promise((r) => setTimeout(r, delay));

  const data = {
    fetchedAt: new Date().toISOString(),
    randomId: Math.random().toString(36).slice(2, 10),
    delay: `${delay}ms`,
  };

  return (
    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
      <h3 className="text-green-800 font-semibold">Data Loaded!</h3>
      <div className="mt-2 font-mono text-sm text-green-700 space-y-1">
        <div>fetchedAt: {data.fetchedAt}</div>
        <div>randomId: {data.randomId}</div>
        <div>delay: {data.delay}</div>
      </div>
      <p className="text-xs text-green-600 mt-2">
        This component waited {delay}ms before rendering, simulating a slow data
        fetch.
      </p>
    </div>
  );
}
