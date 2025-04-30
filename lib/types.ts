export interface BookType {
  book_id: number;
  user_id: string;
  title: string;
  start_date: string;
  note: string;
  last_updated: string;
}

export type NewBookType = Omit<BookType, "book_id" | "user_id" | "last_updated">;

export interface ProblemType {
  problem_id: number;
  book_id: number;
  page: number;
  name: string;
  number: number;
  text: string;
  note: string;
  reserved: boolean;
}

// export type NewProblemType = Omit<ProblemType, "problem_id">;

export interface LogType {
  log_id: number;
  book_id: number;
  problem_id: number;
  date: string;
  rate: number;
  comment: string;
}

export type NewLogType = Omit<LogType, "log_id">;