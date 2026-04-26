import MainView from "../components/feed/MainView";
import SidebarLeft from "../components/home/SidebarLeft";
import Topbar from "../components/home/Topbar";

export default function Feed() {
  return (
    <div className="flex h-screen flex-col bg-gray-950">
      <Topbar />
      <div className="flex min-h-0 flex-1 items-stretch">
        <SidebarLeft />
        <MainView />
      </div>
    </div>
  );
}
