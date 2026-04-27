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
          ? "bg-blue-500 text-green-100"
          : "text-gray-400 hover:bg-gray-800 hover:text-gray-100",
      )}
    >
      <Icon size={16} />
    </button>
  );
}
