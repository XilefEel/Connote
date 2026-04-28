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
