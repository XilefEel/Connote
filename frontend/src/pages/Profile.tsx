import MainView from "../components/profile/MainView";
import Sidebar from "../components/profile/Sidebar";
import Topbar from "../components/home/Topbar";

export default function Home() {
  return (
    <div className="flex h-screen flex-col bg-gray-950">
      <Topbar />
      <div className="flex min-h-0 flex-1 items-stretch">
        <Sidebar />
        <MainView />
      </div>
    </div>
  );
}
