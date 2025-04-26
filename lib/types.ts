export interface BookType {
  book_id: number;
  user_id: string;
  title: string;
  start_date: string;
  note: string;
}

export type NewBookType = Omit<BookType, "book_id" | "user_id">;