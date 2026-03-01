import { TodoApp } from "./todo-app.client";

export default function TodoPage() {
  return (
    <div>
      <h1>Todo List</h1>
      <p>
        A todo list using <code>useState</code> for state management.
        Demonstrates adding, completing, and removing items, plus filtering by
        status. All state lives in the client component.
      </p>
      <TodoApp />
    </div>
  );
}
