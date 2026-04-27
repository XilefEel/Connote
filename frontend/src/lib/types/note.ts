export type NewNote = {
  title: string;
  description: string;
  content: string;
  author: string;
  tags: string[];
  visibility: "public" | "private";
};

export type Note = {
  id: number;
  title: string;
  description: string;
  content: string;
  author: string;
  version: string;
  visibility: "public" | "private";
  likes: number;
  comments: number;
  forks: number;
  contributors: number;
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
