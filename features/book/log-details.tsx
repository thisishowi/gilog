import { LogType } from "@/lib/types";
import {
  ActionIcon,
  CloseButton,
  Group,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMessage, IconPencil, IconStars } from "@tabler/icons-react";
import EditLog from "./edit-log";
import { logRateArray } from "@/lib/constants";
import { useProblems } from "@/contexts/problems-context";

export default function LogDetails({
  children,
  log,
}: {
  children: (toggle: () => void) => React.ReactNode;
  log: LogType;
}) {
  const modalState = useDisclosure(false);

  const { detailId, detailDispatch } = useProblems();

  return (
    <>
      {children(() =>
        detailDispatch({ type: "toggle", panel: "log", id: log.log_id })
      )}
      {detailId === log.log_id && (
        <Paper
          bg="var(--mantine-color-default"
          bd="1px solid var(--mantine-color-default-border)"
          p="xs"
          w="100%"
        >
          <Group gap="5">
            <Title order={3} flex="1">
              Log {log.date}
            </Title>
            <ActionIcon variant="subtle" onClick={modalState[1].open}>
              <IconPencil />
            </ActionIcon>
            <CloseButton onClick={() => detailDispatch({ type: "close" })} />
          </Group>

          <Group gap="5">
            <IconStars
              style={{ marginTop: "2px", opacity: 0.6 }}
              size={22}
              stroke={1.5}
            />
            <Text>{logRateArray[log.rate].label || "no data"}</Text>
          </Group>
          <Group gap="5">
            <IconMessage
              style={{ marginTop: "2px", opacity: 0.6 }}
              size={22}
              stroke={1.5}
            />
            <Text>{log.comment || "no data"}</Text>
          </Group>
        </Paper>
      )}
      <EditLog log={log} opened={modalState[0]} close={modalState[1].close} />
    </>
  );
}
