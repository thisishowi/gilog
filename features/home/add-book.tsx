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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendarWeek, IconPlus } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";
import { addBook } from "@/lib/db";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

export default function AddBook() {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      title: "",
      start_date: new Date(),
      note: "",
    },
  });

  async function handleSubmit(values: typeof form.values) {
    setLoading(true);
    try {
      const newBookId = await addBook({
        title: values.title,
        start_date: dayjs(values.start_date).format("YYYY-MM-DD"),
        note: values.note,
      });
      form.reset();
      close();
      router.push(`/${newBookId}`);
    } catch (error) {
      alert("本の登録に失敗しました");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add book" centered>
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
              Add Book
            </Button>
          </Group>
        </form>
      </Modal>

      {!opened && <Affix position={{ bottom: 10, right: 10 }}>
        <ActionIcon variant="filled" size="xl" radius="md" onClick={open}>
          <IconPlus size={30} />
        </ActionIcon>
      </Affix>}
    </>
  );
}
