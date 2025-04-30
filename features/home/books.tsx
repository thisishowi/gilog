import { getBooks } from "@/lib/db";
import { Box } from "@mantine/core";
import BookList from "./book-list";
import NoProblems from "@/components/no-problems";

export default async function Books() {
  const books = await getBooks();

  return (
    <Box className="fade-in" pb={65}>
      {books.length > 0 ? <BookList books={books} />: <NoProblems t={"No books have been added yet"} />}
    </Box>
  );
}
