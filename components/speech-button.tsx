"use client";

import { ActionIcon } from "@mantine/core";
import { IconEar } from "@tabler/icons-react";
import { useState } from "react";

export default function SpeechButton({ text }: { text: string }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    console.log("handleSpeak");
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // 英語（アメリカ）
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <ActionIcon
      variant="subtle"
      onClick={handleSpeak}
    >
      <IconEar />
    </ActionIcon>
  );
}