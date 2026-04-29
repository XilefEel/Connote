import type { PullRequest } from "../lib/types/note";

export default function NoteCard({
  pullRequest,
}: {
  pullRequest: PullRequest;
}) {
  return (
    <div className="flex min-h-40 w-full flex-col rounded-xl border border-zinc-700 bg-zinc-900 p-4">
      <h2 className="text-base font-semibold text-zinc-100 transition-colors hover:text-teal-200">
        {pullRequest.title}
      </h2>
    </div>
  );
}
