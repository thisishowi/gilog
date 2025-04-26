"use client";

import {
  ActionIcon,
  Anchor,
  Table,
  Text,
  Menu,
  Code,
  Box,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { BookType } from "@/lib/types";
import Link from "next/link";
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";
import { deleteBook } from "@/lib/db";
import { useRouter } from "next/navigation";
import EditBookModal from "./edit-book";
import { useDisclosure } from "@mantine/hooks";

export default function BookList({ books }: { books: BookType[] }) {
  const rows = books.map((book) => (
    <Table.Tr key={book.book_id}>
      <Table.Td w="100%">
        <Link
          href={`/${book.book_id}`}
          style={{ display: "block", textDecoration: "none", color: "inherit" }}
        >
          <Box>
            <Anchor component="span">{book.title}</Anchor>
            <Text size="xs" c="dimmed">since {book.start_date}</Text>
          </Box>
        </Link>
      </Table.Td>
      <Table.Td>
        <BookMenu book={book} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Table>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}

function BookMenu({ book }: { book: BookType }) {
  const router = useRouter();

  // Delete modal
  const openModal = () =>
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
          router.refresh();
        } catch {
          alert("削除に失敗しました");
        }
      },
    });

  // Edit modal
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Menu>
        <Menu.Target>
          <ActionIcon variant="subtle">
            <IconDotsVertical />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item leftSection={<IconPencil size={20} />} onClick={open}>
            Edit
          </Menu.Item>
          <Menu.Item
            leftSection={<IconTrash size={20} />}
            color="red"
            onClick={openModal}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <EditBookModal book={book} opened={opened} close={close} />
    </>
  );
}
