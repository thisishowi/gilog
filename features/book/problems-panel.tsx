import { ActionIcon, Group, Stack, Text, Title } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import EditProblemsModal from "./edit-problems-modal";
import { useDisclosure } from "@mantine/hooks";
import { useProblems } from "@/contexts/problems-context";
import LogsRow from "./log-row";

export default function ProblemsPanel({
  name,
  setActiveTab,
}: {
  name: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const { book_id, problems } = useProblems();
  const [opened, { open, close }] = useDisclosure(false);
  const filteredProblems = problems.filter((p) => p.name === name);

  return (
    <>
      <Group
        gap="5"
        justify="space-between"
        align="flex-start"
        wrap="nowrap"
        px="5"
      >
        <Title order={3}>{name}</Title>
        <ActionIcon variant="subtle" onClick={open}>
          <IconPencil />
        </ActionIcon>
        <EditProblemsModal
          prevName={name}
          book_id={book_id}
          prevLength={filteredProblems.length}
          opened={opened}
          close={close}
          setActiveTab={setActiveTab}
        />
      </Group>

      <Stack mt="xs" gap="5">
        {filteredProblems.map((problem) => (
          <LogsRow
            key={problem.problem_id}
            problem={problem}
            maxDigits={problems.length.toString().length}
          />
        ))}
      </Stack>
    </>
  );
}
