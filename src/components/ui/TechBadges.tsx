"use client";

import { Technology } from "@/types/project";
import { cn } from "@/lib/utils";

interface TechBadgesProps {
  items: (string | Technology)[];
  limit?: number;
  className?: string;
  size?: "sm" | "md";
}

const nameToCategory = (name: string): Technology["category"] | undefined => {
  const n = name.toLowerCase();
  if (/(react|next|tiptap|tailwind|shadcn|inertia)/.test(n)) return "frontend";
  if (/(laravel|nest|node|express)/.test(n)) return "backend";
  if (/(mysql|postgres|postgresql|mongodb|redis|prisma)/.test(n)) return "database";
  if (/(aws|gcp|azure|vercel|netlify)/.test(n)) return "cloud";
  if (/(docker|git|zod|zustand|expo|sanctum|spatie|resend|bun)/.test(n)) return "tool";
  return undefined;
};

export function TechBadges({ items, limit, className, size = "sm" }: TechBadgesProps) {
  const list = limit ? items.slice(0, limit) : items;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {list.map((item, idx) => {
        const isObj = typeof item === "object";
        const name = isObj ? item.name : String(item);
        const category = isObj && item.category ? item.category : nameToCategory(name);
        const base = size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm";

        return (
          <span
            key={`${name}-${idx}`}
            className={cn(
              base,
              "rounded-full font-medium border",
              category === "frontend" && "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
              category === "backend" && "bg-blue-500/10 text-blue-300 border-blue-500/30",
              category === "database" && "bg-purple-500/10 text-purple-300 border-purple-500/30",
              category === "cloud" && "bg-orange-500/10 text-orange-300 border-orange-500/30",
              category === "tool" && "bg-yellow-500/10 text-yellow-300 border-yellow-500/30",
              !category && "bg-gray-500/10 text-gray-300 border-gray-500/30"
            )}
          >
            {name}
          </span>
        );
      })}

      {limit && items.length > limit && (
        <span className={cn(
          size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm",
          "rounded-full font-medium border bg-gray-500/10 text-gray-300 border-gray-500/30"
        )}>
          +{items.length - limit} more
        </span>
      )}
    </div>
  );
}

export default TechBadges;
