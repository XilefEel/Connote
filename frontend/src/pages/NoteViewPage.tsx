import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainView from "../components/note_view/MainView";
import Sidebar from "../components/note_view/Sidebar";
import Topbar from "../components/Topbar";
import { getNoteById } from "../lib/api/note";

const dummyNote = {
  id: 1,
  title: "",
  description: "",
  author: "John Doe",
  version: "v1.0",
  visibility: "public" as "public" | "private",
  likes: 0,
  comments: 0,
  forks: 0,
  contributors: 0,
  tags: [],
  content: "",
  createdAt: "",
  updatedAt: "",
};

export default function NotePage() {
  const [note, setNote] = useState(dummyNote);
  const { id } = useParams();

  const editor = useEditor({
    extensions: [StarterKit],
    content: note.content,
    editable: false,
  });

  useEffect(() => {
    const fetchNote = async () => {
      const data = await getNoteById(id!);
      setNote(data);
      editor.commands.setContent(JSON.parse(data.content));
    };

    fetchNote();
  }, [id, editor]);

  return (
    <div className="flex h-screen flex-col bg-gray-950">
      <Topbar />
      <div className="flex min-h-0 flex-1 items-stretch">
        <MainView note={note} editor={editor} />
        <Sidebar note={note} />
      </div>
    </div>
  );
}
