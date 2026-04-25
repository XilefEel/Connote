import { GitFork, MessageSquare, ThumbsUp } from "lucide-react";

export default function NoteCard({
  title,
  description,
  likes,
  comments,
  forks,
  tags,
}: {
  title: string;
  description: string;
  likes: number;
  comments: number;
  forks: number;
  tags: string[];
}) {
  return (
    <div className="flex h-40 w-full flex-col rounded-xl border border-gray-700 bg-gray-900 p-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-full bg-blue-800 px-2 py-px transition-colors hover:text-gray-200"
            >
              <span className="text-xs text-blue-100">{tag}</span>
            </div>
          ))}
        </div>

        <span className="text-xs text-gray-500">John Doe • 2h ago</span>
      </div>

      <div className="mt-1 flex flex-col gap-1">
        <h2 className="text-base font-semibold text-gray-100">{title}</h2>
        <p className="text-xs text-gray-400">{description}</p>
      </div>

      <div className="mt-auto flex flex-row gap-5 border-t border-gray-700 pt-2 text-xs text-gray-300">
        <div className="flex items-center gap-2 rounded border-b-gray-700 transition-colors hover:text-gray-200">
          <ThumbsUp size={12} />
          {likes} likes
        </div>

        <div className="flex items-center gap-2 rounded border-b-gray-700 transition-colors hover:text-gray-200">
          <MessageSquare size={12} />
          {comments} comments
        </div>

        <div className="flex items-center gap-2 rounded border-b-gray-700 transition-colors hover:text-gray-200">
          <GitFork size={12} />
          {forks} forks
        </div>

        <div className="ml-auto flex items-center gap-2 rounded border-b-gray-700 bg-blue-900 px-2 py-0.5 text-blue-100 transition-colors hover:text-gray-200">
          v6.2
        </div>
      </div>
    </div>
  );
}
