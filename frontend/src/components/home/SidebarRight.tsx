import { useEffect, useState } from "react";
import { getUserDataByUsername } from "../../lib/api/user";
import { getCurrentUser } from "../../lib/api/auth";

const trending_tags = [
  {
    tag: "linear algebra",
    notes: 2100,
  },
  {
    tag: "calculus",
    notes: 1800,
  },
  {
    tag: "exam prep",
    notes: 1600,
  },
  {
    tag: "data structures",
    notes: 1500,
  },
  {
    tag: "algorithms",
    notes: 900,
  },
  {
    tag: "machine learning",
    notes: 731,
  },
];

export default function SidebarRight() {
  const currentUser = getCurrentUser();
  const [userStats, setUserStats] = useState({
    notesCreated: 0,
    forks: 0,
    openPRCount: 0,
  });

  const activities = [
    {
      activity: "catatan dibuat",
      count: userStats.notesCreated,
    },
    {
      activity: "forks",
      count: userStats.forks,
    },
    {
      activity: "PR aktif",
      count: userStats.openPRCount,
    },
    {
      activity: "suka",
      count: 0,
    },
  ];

  useEffect(() => {
    async function fetchData() {
      const { stats, openPRs } = await getUserDataByUsername(
        currentUser.username,
      );

      setUserStats({
        notesCreated: stats.notesCreated,
        forks: stats.forksCount,
        openPRCount: openPRs.length,
      });
    }

    fetchData();
  }, [currentUser.username]);

  return (
    <div className="flex w-56 flex-col items-center gap-4 border-l border-zinc-700 p-3 text-xs">
      <div className="flex w-full flex-col rounded-lg border border-zinc-700 bg-zinc-900 p-4">
        <p className="text-zinc-300">tag trending</p>
        <div className="mt-2 flex flex-col gap-2">
          {trending_tags.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-zinc-400">{item.tag}</span>
              <span className="text-zinc-500">
                {item.notes > 999
                  ? `${(item.notes / 1000).toFixed(1)}k`
                  : item.notes}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col rounded-lg border border-zinc-700 bg-zinc-900 p-4">
        <p className="text-zinc-300">aktivitas kamu</p>
        <div className="mt-2 flex flex-col gap-2">
          {activities.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-zinc-400">{item.activity}</span>
              <span className="text-teal-300">
                {item.count > 999
                  ? `${(item.count / 1000).toFixed(1)}k`
                  : item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
