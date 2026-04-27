import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import type { NewNote } from "../../lib/types/note";
import { useParams } from "react-router-dom";
import { getNoteById } from "../../lib/api/note";

export default function MainView({
  note,
  setNote,
  mode,
}: {
  note: NewNote;
  setNote: (note: NewNote) => void;
  mode: "create" | "edit" | "fork";
}) {
  const { id } = useParams();

  const editor = useEditor({
    extensions: [StarterKit],
    content: note.content,
    onUpdate: ({ editor }) => {
      setNote({ ...note, content: JSON.stringify(editor.getJSON()) });
    },
  });

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
        className="text-2xl font-bold text-gray-100 placeholder-gray-600 outline-none"
        placeholder="note title..."
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
      />

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <select className="rounded bg-gray-900 px-3 py-1 text-gray-100 outline-none">
          <option value="">Select subject...</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Biology">Biology</option>
          <option value="Economics">Economics</option>
          <option value="Psychology">Psychology</option>
          <option value="Philosophy">Philosophy</option>
          <option value="Literature">Literature</option>
        </select>

        <input
          className="rounded bg-gray-900 px-3 py-1 text-gray-100 outline-none"
          placeholder="Add tags (comma separated)..."
          value={note.tags.join(", ")}
          onChange={(e) =>
            setNote({
              ...note,
              tags: e.target.value.split(",").map((tag) => tag.trim()),
            })
          }
        />
      </div>

      <Toolbar editor={editor} />

      <EditorContent
        editor={editor}
        className="prose prose-invert max-w-none flex-1 rounded bg-gray-900 p-4 text-gray-100 [&_.ProseMirror]:min-h-100 [&_.ProseMirror]:outline-none"
      />
    </div>
  );
}
