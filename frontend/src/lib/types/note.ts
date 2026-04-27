export type NewNote = {
  title: string;
  description: string;
  content: string;
  author: string;
  tags: string[];
};

export type Note = {
  id: number;
  title: string;
  description: string;
  content: string;
  author: string;
  version: string;
  likes: number;
  comments: number;
  forks: number;
  contributors: number;
  tags: string[];
  forkedFrom?: number | null;
  createdAt: string;
  updatedAt: string;
};
