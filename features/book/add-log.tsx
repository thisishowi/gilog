"use client";

import {
  Button,
  Modal,
  Stack,
  Textarea,
  Group,
  NativeSelect,
} from "@mantine/core";
import { IconCalendarWeek } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";
import { addLog } from "@/lib/db";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { ProblemType } from "@/lib/types";
import { logRateOptions } from "@/lib/constants";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

export default function AddLog({
  children,
  problem,
}: {
  children: (open: () => void) => React.ReactNode;
  problem: ProblemType;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      date: new Date(),
      rate: 0,
      comment: "",
    },
  });

  async function handleSubmit(values: typeof form.values) {
    setLoading(true);
    try {
      await addLog({
        book_id: problem.book_id,
        problem_id: problem.problem_id,
        date: dayjs(values.date).format("YYYY-MM-DD"),
        rate: values.rate,
        comment: values.comment,
      });
      form.reset();
      close();
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to add the log.");
    } finally {
      setLoading(false);
    }
  }

  const [opened, { open, close }] = useDisclosure(false);

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {children(open)}
      <Modal opened={opened} onClose={close} title="Add log" centered>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="xs">
            <DatePickerInput
              label="Date"
              placeholder="YYYY-MM-DD"
              valueFormat="YYYY-MM-DD"
              rightSection={<IconCalendarWeek stroke={1.5} />}
              rightSectionPointerEvents="none"
              highlightToday
              required
              dropdownType={isMobile ? "modal" : "popover"}
              modalProps={{ centered: true }}
              {...form.getInputProps("date")}
            />
            <NativeSelect
              label="Rate"
              data={logRateOptions}
              {...form.getInputProps("rate")}
            />
            <Textarea
              label="Comment"
              placeholder="Optional comment"
              autosize
              minRows={1.5}
              maxRows={4}
              {...form.getInputProps("comment")}
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
    </>
  );
}
