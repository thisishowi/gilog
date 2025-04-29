import { getBooks } from "@/lib/db";
import { Box } from "@mantine/core";
import BookList from "./book-list";

export default async function Books() {
  const books = await getBooks();

  return (
    <Box className="fade-in" pb={65}>
      <BookList books={books} />
    </Box>
  );
}
