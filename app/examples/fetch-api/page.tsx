import { ApiExplorer } from "./api-explorer.client";

export default function FetchApiPage() {
  return (
    <div>
      <h1>API Fetching</h1>
      <p>
        A client component that calls the <code>/api/hello</code> endpoint.
        Demonstrates <code>fetch()</code> from a client component to a Catmint API
        endpoint, with loading states and error handling.
      </p>
      <p>
        The endpoint is defined in <code>app/api/hello/endpoint.ts</code> and
        supports both GET and POST methods.
      </p>
      <ApiExplorer />
    </div>
  );
}
