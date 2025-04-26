"use server";

import { auth } from "@/auth";
import { neon } from "@neondatabase/serverless";
import { BookType, NewBookType } from "./types";

export async function getBooks() {
  const session = await auth();
  const sql = neon(process.env.DATABASE_URL!);
  const response = await sql`
    SELECT
      book_id,
      title,
      TO_CHAR(start_date, 'YYYY-MM-DD') AS start_date,
      TO_CHAR(last_updated, 'YYYY-MM-DD HH24:MI:SS') AS last_updated,
      note
    FROM books 
    WHERE user_id = ${session?.user?.email}
    ORDER BY last_updated DESC`;
  return response as BookType[];
}

export async function addBook({ title, start_date, note }: NewBookType) {
  const session = await auth();
  const sql = neon(process.env.DATABASE_URL!);
  const result = await sql`
    INSERT INTO books (user_id, title, start_date, note, last_updated)
    VALUES (${session?.user?.email}, ${title}, ${start_date}, ${note}, NOW())
    RETURNING book_id`;
  return result[0].book_id as string;
}

export async function deleteBook(book_id: number) {
  const sql = neon(process.env.DATABASE_URL!);
  await sql`DELETE FROM books WHERE book_id = ${book_id}`;
}

export async function updateBook(
  book_id: number,
  { title, start_date, note }: NewBookType
) {
  const sql = neon(process.env.DATABASE_URL!);
  await sql`
    UPDATE books
    SET title = ${title},
        start_date = ${start_date},
        note = ${note},
        last_updated = NOW()
    WHERE book_id = ${book_id}`;
}

export async function getBook(book_id: string) {
  const sql = neon(process.env.DATABASE_URL!);
  const response = await sql.query(
    `SELECT
       book_id,
       user_id,
       title,
       to_char(start_date, 'YYYY-MM-DD') AS start_date,
       note
     FROM books 
     WHERE book_id = $1`,
    [book_id]
  );
  return response[0] as BookType;
}
