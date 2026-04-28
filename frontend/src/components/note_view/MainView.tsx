import { useNavigate, useParams } from "react-router-dom";
import { ThumbsUp, MessageSquare, GitFork, Pencil } from "lucide-react";
import CommentBlock from "./CommentBlock";
import { forkNoteById } from "../../lib/api/note";
import { Editor, EditorContent } from "@tiptap/react";
import type { Note } from "../../lib/types/note";

const comments = [
  {
    username: "alice",
    time: "1h ago",
    content: "Great note! Really helped me understand binary trees.",
    likes: 30,
  },
  {
    username: "bob",
    time: "30m ago",
    content:
      "Can you explain the difference between in-order and pre-order traversal?",
    likes: 23,
  },
  {
    username: "charlie",
    time: "10m ago",
    content: "I found a typo in the post-order traversal code snippet.",
    likes: 15,
  },
  {
    username: "dave",
    time: "5m ago",
    content: "Thanks for sharing! Do you have notes on other data structures?",
    likes: 20,
  },
  {
    username: "eve",
    time: "2m ago",
    content: "This is exactly what I needed for my interview prep. Thanks!",
    likes: 25,
  },
  {
    username: "frank",
    time: "1m ago",
    content:
      "The time complexity table is super helpful. One thing — worst case for a skewed tree should also mention that this is why balanced trees (AVL, Red-Black) exist. Minor addition but makes it more complete.",
    likes: 18,
  },
];

export default function MainView({
  note,
  editor,
}: {
  note: Note;
  editor: Editor;
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/note/${id}/edit`);
  };

  const handleFork = async () => {
    const forkedNote = await forkNoteById(id, note.author);
    navigate(`/note/${forkedNote.id}`);
  };

  return (
    <div className="flex h-full flex-1 flex-col gap-3 overflow-y-auto px-5 py-3">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-gray-100">{note.title}</h1>

        <button onClick={handleEdit}>
          <Pencil
            size={20}
            className="cursor-pointer text-gray-500 transition-colors hover:text-gray-200"
          />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        {note.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-blue-500 px-3 py-0.5 text-blue-50"
          >
            {tag}
          </span>
        ))}

        <span className="text-gray-600">by</span>
        <span className="font-medium text-gray-300">{note.author}</span>
        <span className="text-gray-600">·</span>
        <span className="text-gray-500">
          {new Date(note.createdAt).toLocaleDateString("en-CA")}
        </span>
      </div>

      <div className="flex items-center gap-5 border-t border-t-gray-800 px-5 pt-2 text-sm text-gray-500">
        <p className="flex items-center gap-2 rounded transition-colors hover:text-gray-200">
          <ThumbsUp size={12} />
          {note.likes} likes
        </p>

        <p className="flex items-center gap-2 rounded transition-colors hover:text-gray-200">
          <MessageSquare size={12} />
          {note.comments} comments
        </p>

        <button
          onClick={handleFork}
          className="ml-auto flex items-center gap-2 rounded transition-colors hover:text-gray-200"
        >
          <GitFork size={12} />
          {note.forks} forks
        </button>
      </div>

      <EditorContent
        editor={editor}
        className="prose prose-invert max-w-none flex-1 rounded bg-gray-900 p-4 text-gray-100 [&_.ProseMirror]:min-h-100 [&_.ProseMirror]:outline-none"
      />

      <div className="flex flex-col gap-3 border-t border-t-gray-800 pt-5">
        <h2 className="text-base font-semibold text-gray-100">
          {note.comments} Comments
        </h2>

        <div className="flex min-h-40 flex-col items-start rounded-xl border border-gray-800 bg-gray-900 p-3">
          <textarea
            placeholder="Add a comment..."
            className="h-full w-full rounded px-3 py-2 text-sm text-gray-200 focus:outline-none"
          />

          <button className="ml-auto cursor-pointer rounded bg-blue-500 px-4 py-1 text-xs font-medium text-gray-200 transition-colors hover:bg-blue-600">
            comment
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {comments.map((comment, index) => (
            <CommentBlock key={index} {...comment} />
          ))}
        </div>
      </div>
    </div>
  );
}
