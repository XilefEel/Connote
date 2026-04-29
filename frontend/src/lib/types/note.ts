export type NewNote = {
  title: string;
  description: string;
  content: string;
  author: string;
  tags: string[];
  visibility: "public" | "private";
};

export type Note = NewNote & {
  id: number;
  likes: number;
  comments: number;
  forks: number;
  contributors: number;
  version: string;
  tags: string[];
  forkedFrom?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type NoteVersion = {
  id: number;
  noteId: number;
  version: string;
  changeSummary: string;
  author: string;
  createdAt: string;
};

export type PullRequest = {
  id: number;
  noteId: number;
  author: string;
  title: string;
  content: string;
  status: "open" | "merged" | "rejected";
  createdAt: string;
};
