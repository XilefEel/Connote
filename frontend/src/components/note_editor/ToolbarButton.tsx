import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

export default function ToolbarButton({
  Icon,
  onClick,
  active,
}: {
  Icon: LucideIcon;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={cn(
        "rounded p-1 transition-colors",
        active
          ? "bg-teal-500 text-green-100"
          : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100",
      )}
    >
      <Icon size={16} />
    </button>
  );
}
