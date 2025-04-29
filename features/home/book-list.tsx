"use client";

import {
  ActionIcon,
  Anchor,
  Table,
  Text,
  Menu,
  Box,
} from "@mantine/core";
import { BookType } from "@/lib/types";
import Link from "next/link";
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";
import EditBookModal from "../../components/edit-book-modal";
import { useDisclosure } from "@mantine/hooks";
import useDeleteBookModal from "@/components/use-delete-book-modal";

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
            <Text size="xs" c="dimmed">
              since {book.start_date}
            </Text>
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
  // Delete modal
  const openDeleteModal = useDeleteBookModal(book);

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
            onClick={openDeleteModal}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <EditBookModal book={book} opened={opened} close={close} />
    </>
  );
}
