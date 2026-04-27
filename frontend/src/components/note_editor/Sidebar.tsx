import { useState } from "react";
import { cn } from "../../lib/utils";
import { CircleDot, Dot } from "lucide-react";
import type { NewNote } from "../../lib/types/note";
import { createNote } from "../../lib/api/note";
import { useNavigate } from "react-router-dom";

const beforePublishing = [
  "title filled in",
  "content added",
  "at least 1 tag",
  "subject selected",
];

export default function Sidebar({
  mode,
  note,
}: {
  mode: "create" | "edit";
  note: NewNote;
}) {
  const [visibility, setVisibility] = useState("public");
  const navigate = useNavigate();

  const handlePublish = () => {
    createNote(note);
    navigate("/profile");
  };

  return (
    <div className="flex h-full w-64 flex-col gap-4 border-l border-l-gray-700 p-3 px-5">
      <div>
        <h3 className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
          Visibility
        </h3>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => setVisibility("public")}
            className={cn(
              "flex cursor-pointer flex-row items-center gap-2 rounded-lg px-3 py-2 text-xs transition-colors",
              visibility === "public"
                ? "border border-blue-600 bg-blue-950/50"
                : "border border-gray-700 text-gray-300 hover:border-gray-500",
            )}
          >
            <CircleDot
              className={cn(
                "size-4",
                visibility === "public" ? "text-blue-500" : "text-gray-500",
              )}
            />

            <div className="flex flex-col items-start">
              <span className="text-gray-100">public</span>
              <span className="text-gray-500">anyone can find and fork</span>
            </div>
          </button>

          <button
            onClick={() => setVisibility("private")}
            className={cn(
              "flex cursor-pointer flex-row items-center gap-2 rounded-lg px-3 py-1.5 text-xs transition-colors",
              visibility === "private"
                ? "border border-blue-600 bg-blue-950/50"
                : "border border-gray-700 text-gray-300 hover:border-gray-500",
            )}
          >
            <CircleDot
              className={cn(
                "size-4",
                visibility === "private" ? "text-blue-500" : "text-gray-500",
              )}
            />
            <div className="flex flex-col items-start">
              <span className="text-gray-100">private</span>
              <span className="text-gray-500">only visible to you</span>
            </div>
          </button>
        </div>
      </div>

      <div className="border-t border-t-gray-800 pt-4">
        <h3 className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
          Before publishing
        </h3>

        <div className="flex flex-col gap-2">
          {beforePublishing.map((item) => (
            <div key={item} className="flex items-center gap-2 text-xs">
              <Dot className="size-3 text-gray-500" />
              <span className="tracking-wide text-gray-400">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handlePublish}
        className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
      >
        {mode === "create" ? "Publish" : "Commit"}
      </button>
    </div>
  );
}
