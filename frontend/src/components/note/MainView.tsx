import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ThumbsUp, MessageSquare, GitFork } from "lucide-react";
import CommentBlock from "./CommentBlock";

const dummyNote = {
  id: 1,
  title: "Binary trees — traversal algorithms + interview problems",
  description:
    "In-order, pre-order, post-order with animated trace diagrams. 8 LeetCode-style problems with solutions.",
  author: "John Doe",
  createdAt: "2h ago",
  version: "6.2",
  likes: 150,
  comments: 60,
  forks: 40,
  contributors: 4,
  tags: ["Computer Science", "Data Structures", "Binary Trees"],
  content: `
  # Binary Trees — Traversal Algorithms

  ## What is a Binary Tree?
  A binary tree is a tree data structure where each node has at most two children...

  ## Traversal Algorithms
  ### In-order (Left, Root, Right)
  \`\`\`python
  def inorder(root):
      if root:
          inorder(root.left)
          print(root.val)
          inorder(root.right)
  \`\`\`

  ### Pre-order (Root, Left, Right)
  \`\`\`python
  def preorder(root):
      if root:
          print(root.val)
          preorder(root.left)
          preorder(root.right)
  \`\`\`

  ### Post-order (Left, Right, Root)
  \`\`\`python
  def postorder(root):
      if root:
          postorder(root.left)
          postorder(root.right)
          print(root.val)
  \`\`\`

  ## Time Complexity
  | Traversal Type | Time Complexity |
  |----------------|-----------------|
  | In-order       | O(n)            |
  | Pre-order      | O(n)            |
  | Post-order     | O(n)            |
    `,
};

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

export default function MainView() {
  const { id } = useParams();

  useEffect(() => {
    // TODO: implement API call to fetch note data based on id
  }, [id]);

  return (
    <div className="flex h-full flex-1 flex-col gap-3 overflow-y-auto px-5 py-3">
      <h1 className="text-2xl font-bold text-gray-100">{dummyNote.title}</h1>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        {dummyNote.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-blue-500 px-3 py-0.5 text-gray-200"
          >
            {tag}
          </span>
        ))}

        <span className="text-gray-600">by</span>
        <span className="font-medium text-gray-300">{dummyNote.author}</span>
        <span className="text-gray-600">·</span>
        <span className="text-gray-500">{dummyNote.createdAt}</span>
      </div>

      <div className="flex items-center gap-5 border-t border-t-gray-800 px-5 pt-2 text-sm text-gray-500">
        <p className="flex items-center gap-2 rounded transition-colors hover:text-gray-200">
          <ThumbsUp size={12} />
          {dummyNote.likes} likes
        </p>

        <p className="flex items-center gap-2 rounded transition-colors hover:text-gray-200">
          <MessageSquare size={12} />
          {dummyNote.comments} comments
        </p>

        <p className="ml-auto flex items-center gap-2 rounded transition-colors hover:text-gray-200">
          <GitFork size={12} />
          {dummyNote.forks} forks
        </p>
      </div>

      <pre className="border-t border-t-gray-800 pt-5 font-mono text-sm whitespace-pre-wrap text-gray-200">
        {dummyNote.content}
      </pre>

      <div className="flex flex-col gap-3 border-t border-t-gray-800 pt-5">
        <h2 className="text-base font-semibold text-gray-100">
          {dummyNote.comments} Comments
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
