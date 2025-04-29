"use client";

import { LogType, ProblemType } from "@/lib/types";
import { createContext, useContext } from "react";

interface ProblemsContextType {
  book_id: string;
  problems: ProblemType[];
  logs: LogType[];
  uniqueNames: string[];
}

export const ProblemsContext = createContext({} as ProblemsContextType);

export function ProblemsContextProvider({
  children,
  book_id,
  problems,
  logs,
  uniqueNames
}: {
  children: React.ReactNode;
  book_id: string;
  problems: ProblemType[];
  logs: LogType[];
  uniqueNames: string[];
}) {
  return (
    <ProblemsContext.Provider value={{ book_id, problems, logs, uniqueNames }}>
      {children}
    </ProblemsContext.Provider>
  );
}

export function useProblems() {
  const context = useContext(ProblemsContext);
  if (!context) {
    throw new Error(
      "useProblems must be used within a ProblemsContext.Provider"
    );
  }
  return context;
}
