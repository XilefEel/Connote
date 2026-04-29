import type { User } from "../../lib/types/user";
import { cn } from "../../lib/utils";

const badges = [
  { label: "Top Contributor", color: "bg-yellow-500" },
  { label: "Open Source Enthusiast", color: "bg-green-500" },
  { label: "Algorithm Guru", color: "bg-blue-500" },
  { label: "PR Master", color: "bg-purple-500" },
  { label: "Bug Squasher", color: "bg-red-500" },
];

export default function Sidebar({
  user,
  notesCount,
}: {
  user: User;
  notesCount: number;
}) {
  const stats = [
    {
      label: "Catatan",
      value: notesCount,
    },
    { label: "Pengikut", value: 12 },
    { label: "PR digabung", value: 3 },
    { label: "Forks", value: 7 },
  ];

  return (
    <div className="flex h-full w-64 flex-col gap-10 border-r border-r-zinc-700 p-3 px-5">
      <div className="flex flex-col items-center gap-2">
        <div className="flex size-16 items-center justify-center rounded-full bg-teal-500 text-xl font-bold text-white uppercase">
          {user.username.slice(0, 2)}
        </div>

        <div>
          <h2 className="font-semibold text-zinc-200">{user.username}</h2>
          <p className="text-xs text-zinc-600">@{user.username}</p>
        </div>

        <p className="text-center text-xs text-zinc-400">
          CS student @ NUS. Notes on algorithms, data structures & calculus.
          Open to collabs.
        </p>

        <button className="w-full cursor-pointer rounded-lg border border-zinc-800 px-3 py-1 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100">
          Ubah Profil
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2"
          >
            <span className="text-lg font-semibold text-zinc-200">
              {stat.value}
            </span>
            <span className="text-xs text-zinc-500">{stat.label}</span>
          </div>
        ))}
      </div>

      <div>
        <h3 className="mb-2 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
          Badges
        </h3>

        <div className="flex flex-row flex-wrap gap-2">
          {badges.map((badge, index) => (
            <div
              key={index}
              className={cn(
                "rounded-full px-2 py-0.5 text-xs font-medium text-white",
                badge.color,
              )}
            >
              {badge.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
