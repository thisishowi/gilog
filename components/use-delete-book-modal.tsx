import { deleteBook } from "@/lib/db";
import { BookType } from "@/lib/types";
import { Code, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useRouter } from "next/navigation";

export default function useDeleteBookModal(book: BookType, navigate?: string) {
  const router = useRouter();
  return () =>
    modals.openConfirmModal({
      title: "Delete your book",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your book <Code>{book.title}</Code>?
          This action cannot be undone.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        try {
          await deleteBook(book.book_id);
          if (navigate) router.push(navigate);
          else router.refresh();
        } catch {
          alert("削除に失敗しました");
        }
      },
    });
}
