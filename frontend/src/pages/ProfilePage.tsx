import { useParams } from "react-router-dom";
import MainView from "../components/profile/MainView";
import Sidebar from "../components/profile/Sidebar";
import Topbar from "../components/Topbar";
import { getUserByUsername } from "../lib/api/user";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState({ username: "" });
  const [notes, setNotes] = useState([]);

  const { username } = useParams();

  useEffect(() => {
    async function fetchData() {
      const { user, notes } = await getUserByUsername(username);
      setUser(user);
      setNotes(notes);
    }

    fetchData();
  }, [username]);

  return (
    <div className="flex h-screen flex-col bg-gray-950">
      <Topbar />
      <div className="flex min-h-0 flex-1 items-stretch">
        <Sidebar user={user} notes={notes} />
        <MainView user={user} notes={notes} />
      </div>
    </div>
  );
}
