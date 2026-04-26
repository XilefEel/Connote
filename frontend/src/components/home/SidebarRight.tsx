const trending_subjects = [
  {
    subject: "linear algebra",
    notes: 2100,
  },
  {
    subject: "calculus",
    notes: 1800,
  },
  {
    subject: "data structures",
    notes: 1500,
  },
  {
    subject: "algorithms",
    notes: 900,
  },
  {
    subject: "machine learning",
    notes: 731,
  },
];

const activities = [
  {
    activity: "notes created",
    count: 5,
  },
  {
    activity: "forks",
    count: 2,
  },
  {
    activity: "open PRs",
    count: 1,
  },
  {
    activity: "likes",
    count: 10,
  },
];

export default function SidebarRight() {
  return (
    <div className="flex w-56 flex-col items-center gap-4 border-l border-gray-700 p-3 text-xs">
      <div className="flex w-full flex-col rounded-lg border border-gray-700 bg-gray-900 p-4">
        <p className="text-gray-300">trending subjects</p>
        <div className="mt-2 flex flex-col gap-2">
          {trending_subjects.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-gray-400">{item.subject}</span>
              <span className="text-gray-500">
                {item.notes > 999
                  ? `${(item.notes / 1000).toFixed(1)}k`
                  : item.notes}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col rounded-lg border border-gray-700 bg-gray-900 p-4">
        <p className="text-gray-300">your activity</p>
        <div className="mt-2 flex flex-col gap-2">
          {activities.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-gray-400">{item.activity}</span>
              <span className="text-blue-300">
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
