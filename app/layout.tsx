import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { MantineProvider, createTheme, Container } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import { DatesProvider } from "@mantine/dates";

const font = Noto_Sans_JP({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Step²",
  description: "φ(*'д'* )ﾒﾓﾒﾓ",
};

const theme = createTheme({
  scale: 1.1,
  primaryColor: "teal",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="ja">
      <body className={`${font.className}`}>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <ModalsProvider>
            <DatesProvider settings={{ firstDayOfWeek: 0 }}>
              <Container h="100dvh" py="5">
                {session ? children : <SignIn />}
              </Container>
            </DatesProvider>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
