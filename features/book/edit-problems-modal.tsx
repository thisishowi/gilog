"use client";

import {
  Button,
  Modal,
  TextInput,
  Stack,
  Group,
  Text,
  Code,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import {
  deleteProblems,
  updateProblemsName,
  updateProblemsNumber,
} from "@/lib/db";
import { useRouter } from "next/navigation";
import { modals } from "@mantine/modals";

export default function EditProblemsModal({
  add = false,
  book_id,
  prevLength,
  names,
  prevName,
  opened,
  close,
  setActiveTab,
}: {
  add?: boolean;
  book_id: string | number;
  prevLength?: number;
  names?: string[];
  prevName?: string;
  opened: boolean;
  close: () => void;
  setActiveTab: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: add ? "" : prevName!,
      length: prevLength || 1,
    },
    validate: {
      name: (v) =>
        v !== prevName && names?.includes(v)
          ? `The name "${v}" already exists`
          : null,
      length: (v) => (v < 1 ? "Length must be at least 1" : null),
    },
  });

  async function handleSubmit(values: typeof form.values) {
    setLoading(true);
    try {
      if (values.length !== prevLength)
        await updateProblemsNumber(
          book_id,
          values.name,
          values.length,
          prevLength || 0
        );
      if (values.name !== prevName)
        await updateProblemsName(book_id, prevName!, values.name);

      if (add) form.reset();
      close();
      setActiveTab(values.name);
      router.refresh();
    } catch (error) {
      alert(add ? "更新に失敗しました" : "追加に失敗しました");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Delete your book",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your problems <Code>{prevName}</Code>?
          This action cannot be undone.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        try {
          await deleteProblems(book_id, prevName!);
          router.refresh();
        } catch {
          alert("削除に失敗しました");
        }
      },
    });

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={add ? "Add problems" : "Edit problems"}
      centered
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="xs">
          <TextInput
            label="Problems name"
            maxLength={50}
            required
            {...form.getInputProps("name")}
          />
          <NumberInput
            label="Number of problems"
            min={1}
            required
            {...form.getInputProps("length")}
          />
        </Stack>
        <Group mt="md" justify="space-between">
          <Group gap="xs">
            <Button variant="default" onClick={form.reset}>
              Reset
            </Button>
            {!add && (
              <Button color="red" variant="light" onClick={openDeleteModal}>
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
