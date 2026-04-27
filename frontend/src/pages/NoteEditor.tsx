import MainView from "../components/note_editor/MainView";
import Sidebar from "../components/note_editor/Sidebar";
import Topbar from "../components/note_editor/TopBar";

export default function NoteEditor({
  mode,
}: {
  mode: "create" | "edit" | "fork";
}) {
  return (
    <div className="flex h-screen flex-col bg-gray-950">
      <Topbar />
      <div className="flex min-h-0 flex-1 items-stretch">
        <MainView mode={mode} />
        <Sidebar />
      </div>
    </div>
  );
}
