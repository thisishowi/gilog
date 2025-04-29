"use client";

import {
  Button,
  Modal,
  Stack,
  Textarea,
  Group,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { updateProblem } from "@/lib/db";
import { useRouter } from "next/navigation";
import { ProblemType } from "@/lib/types";

export default function EditProblemModal({
  problem,
  opened,
  close,
}: {
  problem: ProblemType;
  opened: boolean;
  close: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      page: problem.page,
      text: problem.text || "",
      note: problem.note || "",
    },
  });

  async function handleSubmit(values: typeof form.values) {
    setLoading(true);
    try {
      await updateProblem(problem.problem_id, values);
      close();
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to update the problem");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal opened={opened} onClose={close} title="Edit problem" centered>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="xs">
          <NumberInput
            label="Page"
            placeholder=""
            min={0}
            {...form.getInputProps("page")}
          />
          <Textarea
            label="Text"
            placeholder=""
            autosize
            minRows={1.5}
            maxRows={4}
            {...form.getInputProps("text")}
          />
          <Textarea
            label="Note"
            placeholder=""
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
          </Group>
          <Button type="submit" loading={loading}>
            Save
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
