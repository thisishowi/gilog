import { signOut } from "@/auth";
import { ActionIcon } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";

export default function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className=""
    >
      <ActionIcon type="submit" variant="default">
        <IconLogout/>
      </ActionIcon>
    </form>
  );
}
