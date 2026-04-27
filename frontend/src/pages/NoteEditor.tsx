import { useState } from "react";
import MainView from "../components/note_editor/MainView";
import Sidebar from "../components/note_editor/Sidebar";
import Topbar from "../components/note_editor/TopBar";
import type { NewNote } from "../lib/types/note";

const newNote: NewNote = {
  title: "New Note",
  description: "",
  content: "",
  author: "",
  tags: [],
};

export default function NoteEditor({
  mode,
}: {
  mode: "create" | "edit" | "fork";
}) {
  const [note, setNote] = useState<NewNote>(newNote);

  return (
    <div className="flex h-screen flex-col bg-gray-950">
      <Topbar />
      <div className="flex min-h-0 flex-1 items-stretch">
        <MainView mode={mode} note={note} setNote={setNote} />
        <Sidebar note={note} />
      </div>
    </div>
  );
}
