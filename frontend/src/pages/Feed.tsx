import { useEffect, useState } from "react";
import MainView from "../components/feed/MainView";
import Sidebar from "../components/feed/Sidebar";
import Topbar from "../components/Topbar";
import type { Note } from "../lib/types/note";
import { getNotes } from "../lib/api/note";
import { useSearchParams } from "react-router-dom";

export default function Feed() {
  const [searchParams] = useSearchParams();

  const q = searchParams.get("q") ?? "";

  const [sort, setSort] = useState("likes");
  const [minForks, setMinForks] = useState<number | null>(null);
  const [minContributors, setMinContributors] = useState<number | null>(null);

  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNote = async () => {
      const data = await getNotes({
        q,
        sort,
        minForks,
        minContributors,
      });

      setNotes(data);
    };

    fetchNote();
  }, [q, sort, minForks, minContributors]);

  return (
    <div className="flex h-screen flex-col bg-gray-950">
      <Topbar />
      <div className="flex min-h-0 flex-1 items-stretch">
        <Sidebar
          sort={sort}
          setSort={setSort}
          minForks={minForks}
          setMinForks={setMinForks}
          minContributors={minContributors}
          setMinContributors={setMinContributors}
        />
        <MainView notes={notes} />
      </div>
    </div>
  );
}
