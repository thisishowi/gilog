import { Group, Paper, Text } from "@mantine/core";
import SpeechButton from "./speech-button";

export default async function Quote() {
  const response = await fetch("https://api.adviceslip.com/advice", {
    cache: "force-cache",
    next: { revalidate: 43200 },
  });
  const data = await response.json();

  return (
    <Paper p="sm" mb="xs" shadow="sm" withBorder>
      <Group justify="space-between">
        <Text c="dimmed">Advice #{data.slip.id}</Text>
        <SpeechButton text={data.slip.advice} />
      </Group>
      <Text>{data.slip.advice}</Text>
    </Paper>
  );
}
