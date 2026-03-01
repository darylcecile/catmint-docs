import { useState } from "react";

export function ToggleDetails({
  summary,
  details,
}: {
  summary: string;
  details: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="text-sm">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="font-medium text-amber-800 hover:text-amber-900 underline underline-offset-2"
      >
        {open ? "Hide" : "Show"}: {summary}
      </button>
      {open && <p className="mt-2 text-gray-700 leading-relaxed">{details}</p>}
    </div>
  );
}
