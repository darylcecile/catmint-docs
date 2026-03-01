import { useState } from "react";

export function InteractivePanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(true);
  const [highlight, setHighlight] = useState(false);

  return (
    <div
      className={`ml-4 mt-4 border-2 rounded-lg transition-colors ${
        highlight
          ? "border-amber-400 bg-amber-50"
          : "border-amber-300 bg-amber-50"
      }`}
    >
      <div className="p-4 pb-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-800">
            CLIENT
          </span>
          <span className="text-sm font-semibold">{title}</span>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          This is a client component. It uses <code>useState</code> to manage
          expand/collapse and highlight state. Its <code>children</code> are
          server-rendered and passed in as props.
        </p>
        <div className="flex gap-2 mb-3">
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="px-3 py-1 rounded text-sm font-medium bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors"
          >
            {expanded ? "Collapse Children" : "Expand Children"}
          </button>
          <button
            type="button"
            onClick={() => setHighlight((h) => !h)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              highlight
                ? "bg-amber-400 text-amber-900"
                : "bg-amber-100 hover:bg-amber-200 text-amber-800"
            }`}
          >
            {highlight ? "Remove Highlight" : "Highlight Border"}
          </button>
        </div>
      </div>
      {expanded && (
        <div className="px-4 pb-4 border-t border-amber-200 pt-3">
          <div className="text-xs text-amber-600 font-medium mb-2 uppercase tracking-wide">
            Children (server-rendered, passed via props)
          </div>
          {children}
        </div>
      )}
      {!expanded && (
        <div className="px-4 pb-4 text-sm text-amber-600 italic">
          Children are hidden. Click &ldquo;Expand Children&rdquo; to show them.
          Note: they are still in the DOM &mdash; the server already rendered
          them.
        </div>
      )}
    </div>
  );
}
