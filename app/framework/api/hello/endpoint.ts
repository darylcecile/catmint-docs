// Test API endpoint — GET /api/hello
//
// Returns a JSON greeting. Useful for verifying that API endpoints work
// in both dev and production modes.

export function GET(request: Request) {
  const url = new URL(request.url);
  const name = url.searchParams.get("name") ?? "World";

  return Response.json({
    message: `Hello, ${name}!`,
    timestamp: new Date().toISOString(),
  });
}

export function POST(request: Request) {
  return request.json().then((body: Record<string, unknown>) => {
    const name = typeof body.name === "string" ? body.name : "World";

    return Response.json({
      message: `Hello, ${name}!`,
      method: "POST",
      received: body,
      timestamp: new Date().toISOString(),
    });
  });
}
