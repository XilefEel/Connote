export type NewNote = {
  title: string;
  description: string;
  author: string;
  version: string;
  content: string;
  likes: number;
  comments: number;
  forks: number;
  contributors: number;
  tags: string[];
};

export type Note = NewNote & {
  id: number;
  createdAt: string;
  updatedAt: string;
};
