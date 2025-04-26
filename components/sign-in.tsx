import { signIn } from "@/auth";
import { Button, Center } from "@mantine/core";

export default function SignIn() {
  return (
    <Center h="100%" className="fade-in">
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <Button type="submit">Signin with Google</Button>
      </form>
    </Center>
  );
}
