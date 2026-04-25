import MainView from "../components/home/MainView";
import SidebarLeft from "../components/home/SidebarLeft";
import SidebarRight from "../components/home/SidebarRight";
import Topbar from "../components/home/Topbar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-950">
      <Topbar />
      <div className="flex flex-1 items-center justify-center">
        <SidebarLeft />
        <div className="flex h-full w-full items-center justify-center">
          <MainView />
        </div>
        <SidebarRight />
      </div>
    </div>
  );
}
