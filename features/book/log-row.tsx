import { useProblems } from "@/contexts/problems-context";
import { ProblemType } from "@/lib/types";
import { ActionIcon, Button, Group, Popover, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ProblemDetails from "./problem-details";
import { IconPlus } from "@tabler/icons-react";
import AddLog from "./add-log";
import { logRateArray } from "@/lib/constants";
import LogDetails from "./log-details";

export default function LogsRow({
  problem,
  maxDigits,
}: {
  problem: ProblemType;
  maxDigits: number;
}) {
  const { logs } = useProblems();
  const filteredLogs = logs.filter(
    (log) => log.problem_id === problem.problem_id
  );

  const [opened, { toggle, close }] = useDisclosure(false);

  const cellSize = "1.6rem";

  return (
    <Group align="start" gap="8">
      <Button
        size="compact-xs"
        variant="default"
        p="0"
        w={`${maxDigits + 2}ch`}
        h={cellSize}
        onClick={toggle}
      >
        {problem.number}
      </Button>

      <Stack gap="5" flex="1">
        {opened && <ProblemDetails close={close} problem={problem} />}
        <Group gap="4">
          {filteredLogs.map((log, i, a) => (
            <LogDetails key={log.log_id} log={log}>
              {(toggle, setRef) => (
                <ActionIcon
                  size={cellSize}
                  color={logRateArray[log.rate].color}
                  opacity={i < a.length - 1 ? 0.35 : 1}
                  onClick={toggle}
                  ref={setRef}
                >
                  {logRateArray[log.rate].label}
                </ActionIcon>
              )}
            </LogDetails>
          ))}
          <AddLog problem={problem}>
            {(open) => (
              <ActionIcon
                variant="subtle"
                size={cellSize}
                c="gray"
                onClick={open}
              >
                <IconPlus size={18} />
              </ActionIcon>
            )}
          </AddLog>
        </Group>
      </Stack>
    </Group>
  );
}
