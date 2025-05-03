import { useProblems } from "@/contexts/problems-context";
import { ProblemType } from "@/lib/types";
import { ActionIcon, Button, Group, Stack } from "@mantine/core";
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
  const { logs, detailId, detailDispatch} = useProblems();
  const filteredLogs = logs.filter(
    (log) => log.problem_id === problem.problem_id
  );

  const cellSize = "1.6rem";

  return (
    <Group align="start" gap="8">
      <Button
        size="compact-xs"
        variant={problem.reserved ? "filled" : "default"}
        p="0"
        w={`${maxDigits + 2}ch`}
        h={cellSize}
        onClick={() =>
          detailDispatch({
            type: "toggle",
            panel: "problem",
            id: problem.problem_id,
          })
        }
      >
        {problem.number}
      </Button>

      <Stack gap="5" flex="1">
        {detailId === problem.problem_id && (
          <ProblemDetails problem={problem} />
        )}
        <Group gap="4">
          {filteredLogs.map((log, i, a) => (
            <LogDetails key={log.log_id} log={log}>
              {(toggle) => (
                <ActionIcon
                  size={cellSize}
                  color={logRateArray[log.rate].color}
                  opacity={i < a.length - 1 ? 0.35 : 1}
                  onClick={toggle}
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
                color={problem.reserved ? "teal" : "gray"}
                onClick={open}
              >
                <IconPlus size={18} stroke={problem.reserved ? 3 : 2} />
              </ActionIcon>
            )}
          </AddLog>
        </Group>
      </Stack>
    </Group>
  );
}
