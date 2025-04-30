import { ProblemType } from "@/lib/types";
import {
  ActionIcon,
  CloseButton,
  Group,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBlockquote,
  IconCalendarClock,
  IconFileText,
  IconMessage,
  IconPencil,
} from "@tabler/icons-react";
import EditProblemModal from "./edit-problem-modal";
import { useState } from "react";
import { reserveProblem } from "@/lib/db";
import { useRouter } from "next/navigation";

export default function ProblemDetails({
  close,
  problem,
  ref
}: {
  close: () => void;
  problem: ProblemType;
  ref: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
}) {
  const [opened, { open, close: closeModal }] = useDisclosure(false);

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function handleReserve() {
    setLoading(true);
    try {
      await reserveProblem(problem.problem_id, !problem.reserved);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to reserving the problem");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Paper
        bg="var(--mantine-color-default)"
        bd={`1px solid ${
          problem.reserved
            ? "var(--mantine-primary-color-filled)"
            : "var(--mantine-color-default-border)"
        }`}
        p="xs"
        ref={ref}
      >
        <Group gap="5">
          <Title order={3} flex="1">
            {problem.name} {problem.number}
          </Title>
          <ActionIcon
            variant="subtle"
            color={problem.reserved ? "teal" : "gray"}
            loading={loading}
            onClick={handleReserve}
          >
            <IconCalendarClock />
          </ActionIcon>
          <ActionIcon variant="subtle" onClick={open}>
            <IconPencil />
          </ActionIcon>
          <CloseButton onClick={close} />
        </Group>

        <Group align="flex-start" gap="5" wrap="nowrap">
          <IconFileText
            style={{ marginTop: "3px", opacity: 0.6 }}
            size={22}
            stroke={1.5}
          />
          <Text>{problem.page || "no data"}</Text>
        </Group>
        <Group gap="5">
          <IconBlockquote
            style={{ marginTop: "3px", opacity: 0.6 }}
            size={22}
            stroke={1.5}
          />
          <Text>{problem.text || "no data"}</Text>
        </Group>
        <Group gap="5">
          <IconMessage
            style={{ marginTop: "3px", opacity: 0.6 }}
            size={22}
            stroke={1.5}
          />
          <Text>{problem.note || "no data"}</Text>
        </Group>
      </Paper>

      <EditProblemModal problem={problem} opened={opened} close={closeModal} />
    </>
  );
}
