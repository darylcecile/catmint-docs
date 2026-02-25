import { createServerFn } from "catmint/server";

/**
 * A server function that returns the current server time.
 * When called from the client, this is automatically transformed
 * into a fetch() call to a server endpoint.
 */
export const getServerTime = createServerFn(async () => {
  return {
    time: new Date().toISOString(),
    pid: process.pid,
    nodeVersion: process.version,
  };
});

/**
 * A server function that greets a user by name.
 * Demonstrates passing input to a server function.
 */
export const greetUser = createServerFn(
  async (input: { name: string }) => {
    // Simulate a slow server operation
    await new Promise((r) => setTimeout(r, 500));
    return {
      message: `Hello, ${input.name}! This greeting was generated on the server (PID ${process.pid}).`,
      timestamp: new Date().toISOString(),
    };
  },
  { method: "POST" },
);
