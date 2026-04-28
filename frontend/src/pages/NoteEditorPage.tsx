import { useState } from "react";
import MainView from "../components/note_editor/MainView";
import Sidebar from "../components/note_editor/Sidebar";
import Topbar from "../components/note_editor/TopBar";
import type { NewNote } from "../lib/types/note";
import { getCurrentUser } from "../lib/api/auth";

export default function NoteEditor({ mode }: { mode: "create" | "edit" }) {
  const user = getCurrentUser();

  const [note, setNote] = useState<NewNote>({
    title: "New Note",
    description: "",
    content: "",
    author: user ? user.username : "John Doe",
    tags: [],
    visibility: "public",
  });

  return (
    <div className="flex h-screen flex-col bg-gray-950">
      <Topbar />
      <div className="flex min-h-0 flex-1 items-stretch">
        <MainView mode={mode} note={note} setNote={setNote} />
        <Sidebar mode={mode} note={note} setNote={setNote} />
      </div>
    </div>
  );
}
