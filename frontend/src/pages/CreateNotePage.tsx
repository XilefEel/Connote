import MainView from "../components/create_note/MainView";
import Sidebar from "../components/create_note/Sidebar";
import Topbar from "../components/Topbar";

export default function CreateNotePage() {
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
