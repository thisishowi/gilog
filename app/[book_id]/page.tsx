import Header from "@/features/book/header";
import Problems from "@/features/book/problems";
import { getBook } from "@/lib/db";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ book_id: string }>;
}) {
  const { book_id } = await params;
  const book = await getBook(book_id);
  if (!book) redirect("/");

  return (
    <>
      <Header book={book} />

      <Suspense>
        <Problems book_id={book_id} />
      </Suspense>
    </>
  );
}
