import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

type Filter = "all" | "active" | "completed";

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [nextId, setNextId] = useState(1);

  function addTodo() {
    const text = input.trim();
    if (!text) return;
    setTodos((prev) => [...prev, { id: nextId, text, done: false }]);
    setNextId((id) => id + 1);
    setInput("");
  }

  function toggleTodo(id: number) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }

  function removeTodo(id: number) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.done));
  }

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "completed") return t.done;
    return true;
  });

  const activeCount = todos.filter((t) => !t.done).length;

  return (
    <div className="mt-6 max-w-lg">
      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="What needs to be done?"
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          type="button"
          onClick={addTodo}
          className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
        >
          Add
        </button>
      </div>

      {/* List */}
      <ul className="mt-4 space-y-1">
        {filtered.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50 group"
          >
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
              className="w-4 h-4 accent-blue-500"
            />
            <span
              className={`flex-1 ${todo.done ? "line-through text-gray-400" : ""}`}
            >
              {todo.text}
            </span>
            <button
              type="button"
              onClick={() => removeTodo(todo.id)}
              className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 text-sm transition-opacity"
            >
              remove
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="mt-4 text-gray-400 text-center py-8">
          No todos yet. Add one above.
        </p>
      )}

      {/* Footer */}
      {todos.length > 0 && (
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500 border-t pt-3">
          <span>
            {activeCount} item{activeCount !== 1 ? "s" : ""} left
          </span>
          <div className="flex gap-1">
            {(["all", "active", "completed"] as Filter[]).map((f) => (
              <button
                type="button"
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2 py-1 rounded text-xs ${
                  filter === f
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={clearCompleted}
            className="hover:underline text-xs"
          >
            Clear completed
          </button>
        </div>
      )}
    </div>
  );
}
