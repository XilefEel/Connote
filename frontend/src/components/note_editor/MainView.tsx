import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import type { NewNote } from "../../lib/types/note";
import { useParams } from "react-router-dom";
import { getNoteById } from "../../lib/api/note";
import { XIcon } from "lucide-react";

export default function MainView({
  note,
  setNote,
  mode,
}: {
  note: NewNote;
  setNote: (note: NewNote) => void;
  mode: "create" | "edit";
}) {
  const { id } = useParams();

  const editor = useEditor({
    extensions: [StarterKit],
    content: note.content,
    onUpdate: ({ editor }) => {
      setNote({ ...note, content: JSON.stringify(editor.getJSON()) });
    },
  });

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = e.currentTarget.value.trim();

      if (value && !note.tags.includes(value)) {
        setNote({ ...note, tags: [...note.tags, value] });
      }

      e.currentTarget.value = "";
      e.preventDefault();
    }
  };

  const removeTag = (tag: string) => {
    setNote({ ...note, tags: note.tags.filter((t) => t !== tag) });
  };

  useEffect(() => {
    if (mode !== "create" && id) {
      const fetchNote = async () => {
        const data = await getNoteById(id);
        setNote(data);
        editor?.commands.setContent(JSON.parse(data.content));
      };

      fetchNote();
    }
  }, [mode, editor, id, setNote]);

  return (
    <div className="flex h-full flex-1 flex-col gap-3 overflow-y-auto px-5 py-3">
      <input
        className="text-2xl font-bold text-zinc-100 placeholder-zinc-600 outline-none"
        placeholder="note title..."
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
      />

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 rounded-full bg-teal-500 px-3 py-0.5 text-xs text-teal-50"
            >
              {tag}
              <XIcon
                size={12}
                onClick={() => removeTag(tag)}
                className="cursor-pointer text-teal-200 transition-colors hover:text-teal-50"
              />
            </span>
          ))}

          <input
            className="rounded border border-zinc-800 px-3 py-1 text-xs text-zinc-100 outline-none"
            placeholder="Add tag..."
            onKeyDown={handleAddTag}
          />
        </div>
      </div>

      <Toolbar editor={editor} />

      <EditorContent
        editor={editor}
        className="prose prose-invert max-w-none flex-1 rounded bg-zinc-900 p-4 text-zinc-100 [&_.ProseMirror]:min-h-100 [&_.ProseMirror]:outline-none"
      />
    </div>
  );
}
