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
  IconFileText,
  IconMessage,
  IconPencil,
} from "@tabler/icons-react";
import EditProblemModal from "./edit-problem-modal";

export default function ProblemDetails({
  close,
  problem,
}: {
  close: () => void;
  problem: ProblemType;
}) {
  const [opened, { open, close: closeModal }] = useDisclosure(false);

  return (
    <Paper
      bg="var(--mantine-color-default"
      bd="1px solid var(--mantine-color-default-border)"
      p="xs"
    >
      <Group gap="5">
        <Title order={3} flex="1">
          {problem.name} {problem.number}
        </Title>
        <ActionIcon variant="subtle" onClick={open}>
          <IconPencil />
        </ActionIcon>
        <EditProblemModal
          problem={problem}
          opened={opened}
          close={closeModal}
        />
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
  );
}
