"use client";

import {
  Button,
  Modal,
  Stack,
  Textarea,
  Group,
  NativeSelect,
  Text,
} from "@mantine/core";
import { IconCalendarWeek } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";
import { deleteLog, editLog } from "@/lib/db";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { LogType } from "@/lib/types";
import { logRateOptions } from "@/lib/constants";
import { useMediaQuery } from "@mantine/hooks";
import { modals } from "@mantine/modals";

export default function EditLog({
  opened,
  close,
  log,
}: {
  opened: boolean;
  close: () => void;
  log: LogType;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      date: new Date(log.date),
      rate: log.rate,
      comment: log.comment,
    },
  });

  async function handleSubmit(values: typeof form.values) {
    setLoading(true);
    try {
      await editLog(log.log_id, {
        date: dayjs(values.date).format("YYYY-MM-DD"),
        rate: values.rate,
        comment: values.comment,
      });
      close();
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to add the log.");
    } finally {
      setLoading(false);
    }
  }

  const isMobile = useMediaQuery("(max-width: 768px)");

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Delete your log",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your log? This action cannot be
          undone.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        try {
          await deleteLog(log.log_id);
          router.refresh();
          close();
        } catch (error) {
          console.error(error);
          alert("Failed to delete the log.");
        }
      },
    });

  return (
  
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
              <Button color="red" onClick={openDeleteModal}>
                Delete
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
