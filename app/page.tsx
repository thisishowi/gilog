import Greeting from "@/components/greeting";
import SignOutButton from "@/components/sign-out-button";
import { Flex } from "@mantine/core";
import { Suspense } from "react";
import Books from "@/features/home/books";
import Quote from "@/components/quote";

export default function Home() {
  return (
    <div>
      <Flex justify="space-between">
        <Greeting />
        <SignOutButton />
      </Flex>

      <Suspense>
        <Quote />
      </Suspense>

      <Suspense>
        <Books />
      </Suspense>
    </div>
  );
}
