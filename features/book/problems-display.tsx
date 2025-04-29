"use client";

import NoProblems from "./no-problems";
import { Button, Tabs } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import EditProblemsModal from "./edit-problems-modal";
import ProblemsPanel from "./problems-panel";
import { useState } from "react";
import { useProblems } from "@/contexts/problems-context";

export default function ProblemsDisplay() {
  const { book_id, problems, uniqueNames } = useProblems();

  const isEmpty = !uniqueNames.length;

  const [activeTab, setActiveTab] = useState(uniqueNames[0] || null);

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Tabs value={activeTab} onChange={setActiveTab} variant="pills">
        <Tabs.List
          p="6"
          style={{
            borderBottom: "2px solid var(--mantine-color-default-border)",
          }}
        >
          {!isEmpty &&
            uniqueNames.map((name) => (
              <Tabs.Tab key={name} value={name} py={8} px={13}>
                {name}
              </Tabs.Tab>
            ))}
          <Button variant="subtle" py={8} px={11} h="30px" onClick={open}>
            <IconPlus size={20} style={{ marginRight: "4px" }} />
            Add Problems
          </Button>
          <EditProblemsModal
            add
            opened={opened}
            close={close}
            book_id={book_id}
            names={uniqueNames}
            setActiveTab={setActiveTab}
          />
        </Tabs.List>

        {!isEmpty &&
          uniqueNames.map((name) => (
            <Tabs.Panel key={name} value={name} p="5">
              <ProblemsPanel
                name={name}
                setActiveTab={setActiveTab}
              />
            </Tabs.Panel>
          ))}
      </Tabs>

      {isEmpty && <NoProblems />}
    </>
  );
}
