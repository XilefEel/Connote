import { useParams } from "react-router-dom";
import MainView from "../components/profile/MainView";
import Sidebar from "../components/profile/Sidebar";
import Topbar from "../components/Topbar";
import { getUserDataByUsername } from "../lib/api/user";
import { useEffect, useState } from "react";
import { type Note, type PullRequest } from "../lib/types/note";

export default function Home() {
  const { username } = useParams();

  const [user, setUser] = useState({ username: "" });
  const [notes, setNotes] = useState<Note[]>([]);
  const [prs, setPRs] = useState<PullRequest[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { user, notes, openPRs } = await getUserDataByUsername(username);

      setUser(user);
      setNotes(notes);
      setPRs(openPRs);
    }

    fetchData();
  }, [username]);

  return (
    <div className="flex h-screen flex-col bg-zinc-950">
      <Topbar />
      <div className="flex min-h-0 flex-1 items-stretch">
        <Sidebar
          user={user}
          notesCount={notes.filter((n) => !n.forkedFrom).length}
        />
        <MainView notes={notes} openPrs={prs} />
      </div>
    </div>
  );
}
