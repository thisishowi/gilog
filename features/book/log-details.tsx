import { LogType } from "@/lib/types";
import {
  ActionIcon,
  CloseButton,
  Group,
  Paper,
  Text,
  Title,
  Transition,
} from "@mantine/core";
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import { IconMessage, IconPencil, IconStars } from "@tabler/icons-react";
import EditLog from "./edit-log";
import { useState } from "react";

export default function LogDetails({
  children,
  log,
}: {
  children: (
    toggle: () => void,
    setRef1: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>
  ) => React.ReactNode;
  log: LogType;
}) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const modalState = useDisclosure(false);

  const [ref1, setRef1] = useState<HTMLButtonElement | null>(null);
  const [ref2, setRef2] = useState<HTMLDivElement | null>(null);
  useClickOutside(close, ["mouseup", "touchend"], [ref1, ref2]);

  return (
    <>
      {children(toggle, setRef1)}
      {opened && (
        <Paper
          bg="var(--mantine-color-default"
          bd="1px solid var(--mantine-color-default-border)"
          p="xs"
          ref={setRef2}
          w="100%"
        >
          <Group gap="5">
            <Title order={3} flex="1">
              Log {`${log.date}`}
            </Title>
            <ActionIcon variant="subtle" onClick={modalState[1].open}>
              <IconPencil />
            </ActionIcon>
            <CloseButton onClick={close} />
          </Group>

          <Group gap="5">
            <IconStars
              style={{ marginTop: "3px", opacity: 0.6 }}
              size={22}
              stroke={1.5}
            />
            <Text>{log.rate || "no data"}</Text>
          </Group>
          <Group gap="5">
            <IconMessage
              style={{ marginTop: "3px", opacity: 0.6 }}
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
