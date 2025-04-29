"use client";

import { BookType } from "@/lib/types";
import { ActionIcon, Box, Group, Text, Title } from "@mantine/core";
import { IconArrowLeft, IconPencil } from "@tabler/icons-react";
import Link from "next/link";
import EditBookModal from "@/components/edit-book-modal";
import { useDisclosure } from "@mantine/hooks";

export default function Header({ book }: { book: BookType }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box
      style={{
        borderBottom: "2px solid var(--mantine-color-default-border)",
      }}
      className="fade-in"
    >
      <Group gap="md" p="5" pb="0">
        <ActionIcon variant="subtle" component={Link} href="/">
          <IconArrowLeft />
        </ActionIcon>
        <Text flex="1">Your Book</Text>
        <ActionIcon variant="subtle" onClick={open}>
          <IconPencil />
        </ActionIcon>
        <EditBookModal book={book} opened={opened} close={close} deleteButton />
      </Group>
      <Box px="sm" pb="xs">
        <Title size="h2">{book.title}</Title>
        <Text c="dimmed" size="xs">
          since {book.start_date} ({getDaysAgo(book.start_date)})
        </Text>
        <Text>{book.note}</Text>
      </Box>
    </Box>
  );
}

function getDaysAgo(dateString: string) {
  const today = new Date();
  const targetDate = new Date(dateString);
  const diffTime = today.getTime() - targetDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 0) {
    return "today";
  } else if (diffDays > 0) {
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  } else {
    const abs = Math.abs(diffDays);
    return `in ${abs} day${abs === 1 ? "" : "s"}`;
  }
}
