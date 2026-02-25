import { Counter } from "./counter.client";

export default function CounterPage() {
  return (
    <div>
      <h1>Counter</h1>
      <p>
        A simple counter demonstrating <code>useState</code> in a client
        component. The server component renders the page shell, and the
        interactive counter lives in <code>counter.client.tsx</code>.
      </p>
      <Counter />
    </div>
  );
}
