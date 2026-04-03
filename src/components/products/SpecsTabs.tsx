"use client";

import { useState } from "react";

interface Spec {
  id: string;
  group: string;
  label: string;
  value: string;
  order: number;
}

export default function SpecsTabs({ specs }: { specs: Spec[] }) {
  const groups = [...new Set(specs.map((s) => s.group))];
  const [active, setActive] = useState(groups[0]);

  if (!specs.length) return null;

  const visible = specs.filter((s) => s.group === active).sort((a, b) => a.order - b.order);

  return (
    <div>
      <div className="flex gap-0 border-b border-gray-200 overflow-x-auto">
        {groups.map((g) => (
          <button
            key={g}
            onClick={() => setActive(g)}
            className={`px-5 py-3 text-xs font-semibold tracking-widest uppercase whitespace-nowrap transition-colors ${
              active === g
                ? "border-b-2 border-black text-black"
                : "text-gray-400 hover:text-black"
            }`}
          >
            {g}
          </button>
        ))}
      </div>
      <div className="mt-4 divide-y divide-gray-100">
        {visible.map((s) => (
          <div key={s.id} className="flex justify-between py-3">
            <span className="text-sm text-gray-500">{s.label}</span>
            <span className="text-sm font-medium text-black">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
