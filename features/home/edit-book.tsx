"use client";

import {
  ActionIcon,
  Affix,
  Button,
  Modal,
  TextInput,
  Stack,
  Textarea,
  Group,
  Menu,
} from "@mantine/core";
import { IconCalendarWeek } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";
import { updateBook } from "@/lib/db";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { BookType } from "@/lib/types";

export default function EditBook({
  book,
  opened,
  close,
}: {
  book: BookType;
  opened: boolean;
  close: () => void;
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
      form.reset();
      close();
      router.refresh();
    } catch (error) {
      alert("本の更新に失敗しました");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal opened={opened} onClose={close} title="Edit book" centered>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="xs">
          <TextInput
            label="Title"
            placeholder="Book title"
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
          <Button variant="default" onClick={form.reset}>
            Reset
          </Button>
          <Button type="submit" loading={loading}>
            Save
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
