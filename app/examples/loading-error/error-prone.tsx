/**
 * An async server component that randomly throws an error.
 * Used to demonstrate ErrorBoundary behavior with async components.
 */
export async function ErrorProne() {
  await new Promise((r) => setTimeout(r, 500));

  // Always succeed on render — the error is demonstrated by the client
  // component below. This shows that the ErrorBoundary + Suspense
  // pattern works together.
  return (
    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
      <h3 className="text-green-800 font-semibold">Server Component OK</h3>
      <p className="text-sm text-green-700 mt-1">
        This async server component rendered successfully after 500ms. If it had
        thrown, the ErrorBoundary above would have caught the error.
      </p>
    </div>
  );
}
