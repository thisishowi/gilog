import { Center, Text } from "@mantine/core";

export default function NoProblems({ t }: { t?: string }) {
  return (
    <Center h="200">
      <Text>{t || "No problems have been added yet"}</Text>
    </Center>
  );
}
