import MainView from "../components/home/MainView";
import SidebarLeft from "../components/home/SidebarLeft";
import SidebarRight from "../components/home/SidebarRight";
import Topbar from "../components/Topbar";

export default function Home() {
  return (
    <div className="flex h-screen flex-col bg-zinc-950">
      <Topbar />
      <div className="flex min-h-0 flex-1 items-stretch">
        <SidebarLeft />
        <MainView />
        <SidebarRight />
      </div>
    </div>
  );
}
