import MainView from "../components/note_view/MainView";
import Sidebar from "../components/note_view/Sidebar";
import Topbar from "../components/Topbar";

export default function NotePage() {
  return (
    <div className="flex h-screen flex-col bg-gray-950">
      <Topbar />
      <div className="flex min-h-0 flex-1 items-stretch">
        <MainView />
        <Sidebar />
      </div>
    </div>
  );
}
