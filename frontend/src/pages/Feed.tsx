import { useEffect, useState } from "react";
import MainView from "../components/feed/MainView";
import Sidebar from "../components/feed/Sidebar";
import Topbar from "../components/Topbar";
import type { Note } from "../lib/types/note";
import { getNotes } from "../lib/api/note";
import { useSearchParams } from "react-router-dom";

export default function Feed() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("q") ?? "";

  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNote = async () => {
      const data = await getNotes(search);
      setNotes(data);
    };

    fetchNote();
  }, [search]);

  return (
    <div className="flex h-screen flex-col bg-gray-950">
      <Topbar />
      <div className="flex min-h-0 flex-1 items-stretch">
        <Sidebar />
        <MainView notes={notes} />
      </div>
    </div>
  );
}
