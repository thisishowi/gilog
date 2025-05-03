"use client";

import {
  Button,
  Modal,
  TextInput,
  Stack,
  Textarea,
  Group,
} from "@mantine/core";
import { IconCalendarWeek } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";
import { updateBook } from "@/lib/db";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { BookType } from "@/lib/types";
import useDeleteBookModal from "./use-delete-book-modal";
import { useMediaQuery } from "@mantine/hooks";

export default function EditBookModal({
  book,
  opened,
  close,
  deleteButton = false,
}: {
  book: BookType;
  opened: boolean;
  close: () => void;
  deleteButton?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      title: book.title,
      start_date: new Date(book.start_date),
      note: book.note,
    },
  });

  async function handleSubmit(values: typeof form.values) {
    setLoading(true);
    try {
      await updateBook(book.book_id, {
        title: values.title,
        start_date: dayjs(values.start_date).format("YYYY-MM-DD"),
        note: values.note,
      });
      close();
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to update the book.");
    } finally {
      setLoading(false);
    }
  }

  const openDeleteModal = useDeleteBookModal(book, "/");

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Modal opened={opened} onClose={close} title={deleteButton ? "Edit book" : "Add book"} centered>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="xs">
          <TextInput
            label="Title"
            placeholder="Book title"
            maxLength={255}
            required
            {...form.getInputProps("title")}
          />

          <DatePickerInput
            label="Start date"
            placeholder="YYYY-MM-DD"
            valueFormat="YYYY-MM-DD"
            rightSection={<IconCalendarWeek stroke={1.5} />}
            rightSectionPointerEvents="none"
            highlightToday
            required
            dropdownType={isMobile ? "modal" : "popover"}
            modalProps={{centered: true}}
            {...form.getInputProps("start_date")}
          />
          <Textarea
            label="Note"
            placeholder="Optional note"
            autosize
            minRows={1.5}
            maxRows={4}
            {...form.getInputProps("note")}
          />
        </Stack>
        <Group mt="md" justify="space-between">
          <Group gap="xs">
            <Button variant="default" onClick={form.reset}>
              Reset
            </Button>
            {deleteButton && (
              <Button color="red" onClick={openDeleteModal}>
                Delete
              </Button>
            )}
          </Group>
          <Button type="submit" loading={loading}>
            Save
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
