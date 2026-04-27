import { useEffect, useState } from "react";
import NoteCard from "../NoteCard";
import { getNotes } from "../../lib/api/note";
import type { Note } from "../../lib/types/note";

// const noteCards = [
//   {
//     id: 10,
//     title: "Integration by parts — complete guide with examples",
//     description:
//       "Covers tabular method, LIATE rule, and common traps. 12 worked examples from MIT past exams included.",
//     likes: 120,
//     comments: 45,
//     forks: 30,
//     contributors: 5,
//     tags: ["Mathematics", "Calculus", "Integration"],
//     content: "",
//     author: "Alice",
//     version: "1.0",
//     createdAt: "2024-06-01T12:00:00Z",
//     updatedAt: "2024-06-01T12:00:00Z",
//   },
//   {
//     id: 11,
//     title: "Reaction mechanisms — nucleophilic substitution SN1 & SN2",
//     description:
//       "Step-by-step walkthroughs with energy diagrams. Includes stereochemistry implications and leaving group rankings.",
//     likes: 95,
//     comments: 20,
//     forks: 15,
//     contributors: 3,
//     tags: ["Chemistry", "Organic Chemistry", "Reaction Mechanisms"],
//     content: "",
//     author: "Alice",
//     version: "1.0",
//     createdAt: "2024-06-01T12:00:00Z",
//     updatedAt: "2024-06-01T12:00:00Z",
//   },
//   {
//     id: 12,
//     title: "Binary trees — traversal algorithms + interview problems",
//     description:
//       "In-order, pre-order, post-order with animated trace diagrams. 8 LeetCode-style problems with solutions.",
//     likes: 150,
//     comments: 60,
//     forks: 40,
//     contributors: 4,
//     tags: ["Computer Science", "Data Structures", "Binary Trees"],
//     content: "",
//     author: "Alice",
//     version: "1.0",
//     createdAt: "2024-06-01T12:00:00Z",
//     updatedAt: "2024-06-01T12:00:00Z",
//   },
//   {
//     id: 13,
//     title: "Quantum mechanics — Schrödinger equation solved examples",
//     description:
//       "Detailed solutions to the particle in a box, harmonic oscillator, and hydrogen atom. Includes visualizations of wavefunctions.",
//     likes: 80,
//     comments: 25,
//     forks: 10,
//     contributors: 2,
//     tags: ["Physics", "Quantum Mechanics", "Schrödinger Equation"],
//     content: "",
//     author: "Alice",
//     version: "1.0",
//     createdAt: "2024-06-01T12:00:00Z",
//     updatedAt: "2024-06-01T12:00:00Z",
//   },
//   {
//     id: 14,
//     title: "Data structures — hash tables explained with code",
//     description:
//       "Hash functions, collision resolution strategies, and performance analysis. Implementations in Python and JavaScript.",
//     likes: 110,
//     comments: 35,
//     forks: 25,
//     contributors: 3,
//     tags: ["Computer Science", "Data Structures", "Hash Tables"],
//     content: "",
//     author: "Alice",
//     version: "1.0",
//     createdAt: "2024-06-01T12:00:00Z",
//     updatedAt: "2024-06-01T12:00:00Z",
//   },
// ];

const filters = [
  "All",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Computer Science",
  "Biology",
];

export default function MainView() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await getNotes();
      setNotes(notes);
    };

    fetchNotes();
  }, []);

  return (
    <div className="flex h-full flex-1 flex-col gap-3 overflow-y-auto px-5 py-2">
      <div>
        <h1 className="text-2xl font-bold text-white">Explore Notes</h1>

        <div className="mt-2 flex flex-row gap-1.5">
          {filters.map((filter, index) => (
            <button
              key={index}
              className="rounded-lg border border-gray-700 px-3 py-0.5 text-xs text-gray-300 transition-colors hover:bg-gray-900 hover:text-gray-100"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {notes.map((note, index) => (
          <NoteCard key={index} note={note} />
        ))}
      </div>
    </div>
  );
}
