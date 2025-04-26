import { auth } from "@/auth";
import { Text } from "@mantine/core";

export default async function Hello() {
  const session = await auth();
  return (
    <Text size="xl" fw="bold">Hwaiting, {session?.user?.name}!</Text>
  );
}
