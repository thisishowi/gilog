"use server";

import { auth } from "@/auth";
import { neon } from "@neondatabase/serverless";
import {
  BookType,
  LogType,
  NewBookType,
  NewLogType,
  ProblemType,
} from "./types";

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
  if (response.length) {
    await sql`
      UPDATE books
      SET last_updated = NOW()
      WHERE book_id = ${book_id}`;
  }
  return response[0] as BookType;
}

export async function getProblems(book_id: string) {
  const sql = neon(process.env.DATABASE_URL!);
  const result = await sql`
    SELECT *
    FROM problems 
    WHERE book_id = ${book_id}
    ORDER BY number, problem_id`;
  return result as ProblemType[];
}

export async function deleteProblems(book_id: string | number, name: string) {
  const sql = neon(process.env.DATABASE_URL!);
  await sql`
    DELETE FROM problems
    WHERE book_id = ${book_id} AND name = ${name}`;
}

export async function updateProblemsNumber(
  book_id: string | number,
  prevName: string,
  length: number,
  prevLength: number
) {
  const sql = neon(process.env.DATABASE_URL!);

  if (length > prevLength) {
    // 追加が必要な場合
    const insertValues = Array.from(
      { length: length - prevLength },
      (_, i) => `(${book_id}, ${prevLength + i + 1}, '${prevName}', false)`
    ).join(",");
    await sql.query(
      `
      INSERT INTO problems (book_id, number, name, reserved)
      VALUES ` + insertValues
    );
  } else if (length < prevLength) {
    // 削除が必要な場合
    await sql`
      DELETE FROM problems
      WHERE name = ${prevName} AND number > ${length}`;
  }
}

export async function updateProblemsName(
  book_id: string | number,
  prevName: string,
  newName: string
) {
  const sql = neon(process.env.DATABASE_URL!);
  await sql`
    UPDATE problems
    SET name = ${newName}
    WHERE book_id = ${book_id} AND name = ${prevName}`;
}

export async function updateProblem(
  problem_id: number | string,
  {
    page,
    text,
    note,
  }: {
    page: number;
    text: string;
    note: string;
  }
) {
  const sql = neon(process.env.DATABASE_URL!);
  console.log("updateProblem", problem_id, page, text, note);
  await sql`
    UPDATE problems
    SET page = ${page}, text = ${text}, note = ${note}
    WHERE problem_id = ${problem_id}`;
}

export async function reserveProblem(
  problem_id: number | string,
  reserved: boolean
) {
  const sql = neon(process.env.DATABASE_URL!);
  await sql`
    UPDATE problems
    SET reserved = ${reserved}
    WHERE problem_id = ${problem_id}`;
}

export async function getLogs(book_id: string) {
  const sql = neon(process.env.DATABASE_URL!);
  const result = await sql`
    SELECT
      log_id,
      book_id,
      problem_id,
      TO_CHAR(date, 'YYYY-MM-DD') AS date,
      rate,
      comment
    FROM logs 
    WHERE book_id = ${book_id}
    ORDER BY date`;
  return result as LogType[];
}

export async function addLog({
  book_id,
  problem_id,
  date,
  rate,
  comment,
}: NewLogType) {
  const sql = neon(process.env.DATABASE_URL!);
  await sql`
    INSERT INTO logs (book_id, problem_id, date, rate, comment)
    VALUES (${book_id}, ${problem_id}, ${date}, ${rate}, ${comment})`;
}

export async function editLog(
  log_id: number,
  { date, rate, comment }: { date: string; rate: number; comment: string }
) {
  const sql = neon(process.env.DATABASE_URL!);
  await sql`
    UPDATE logs
    SET date = ${date}, rate = ${rate}, comment = ${comment}
    WHERE log_id = ${log_id}`;
}

export async function deleteLog(log_id: number) {
  const sql = neon(process.env.DATABASE_URL!);
  await sql`DELETE FROM logs WHERE log_id = ${log_id}`;
}
