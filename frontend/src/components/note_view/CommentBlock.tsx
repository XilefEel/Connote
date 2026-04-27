import { ThumbsUp } from "lucide-react";

export default function CommentBlock({
  username,
  time,
  content,
  likes,
}: {
  username: string;
  time: string;
  content: string;
  likes: number;
}) {
  return (
    <div className="flex items-start rounded-xl border border-gray-800 bg-gray-900 p-3">
      <div className="h-8 w-8 rounded-full bg-gray-700" />

      <div className="ml-3 flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-200">{username}</span>
          <span className="text-xs text-gray-500">{time}</span>
        </div>

        <p className="text-xs text-gray-400">{content}</p>

        <div className="flex items-center gap-8 text-xs">
          <button className="flex cursor-pointer items-center gap-1 rounded text-gray-500 transition-colors hover:text-gray-200">
            <ThumbsUp size={12} /> {likes} likes
          </button>

          <button className="cursor-pointer text-gray-600 transition-colors hover:text-gray-200">
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}
