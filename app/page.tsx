import Greeting from "@/components/greeting";
import SignOutButton from "@/components/sign-out-button";
import { Container, Group } from "@mantine/core";
import { Suspense } from "react";
import Books from "@/features/home/books";
import Quote from "@/components/quote";
import AddBook from "@/features/home/add-book";

export default function Home() {
  return (
    <Container h="100%" py="5">
      <Group justify="space-between">
        <Greeting />
        <SignOutButton />
      </Group>

      <Suspense>
        <Quote />
      </Suspense>

      <Suspense>
        <Books />
      </Suspense>

      <AddBook />
    </Container>
  );
}
