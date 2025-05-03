"use client";

import { LogType, ProblemType } from "@/lib/types";
import { createContext, useContext, useReducer } from "react";

interface ProblemsContextType {
  book_id: string;
  problems: ProblemType[];
  logs: LogType[];
  uniqueNames: string[];
  detailId: number | null;
  detailDispatch: React.Dispatch<
    | {
        type: string;
        panel: "problem" | "log";
        id: number;
      }
    | { type: "close" }
  >;
}

export const ProblemsContext = createContext({} as ProblemsContextType);

export function ProblemsContextProvider({
  children,
  book_id,
  problems,
  logs,
  uniqueNames,
}: {
  children: React.ReactNode;
  book_id: string;
  problems: ProblemType[];
  logs: LogType[];
  uniqueNames: string[];
}) {
  function detailReducer(
    state: number | null,
    action:
      | {
          type: string;
          panel: "problem" | "log";
          id: number;
        }
      | { type: "close" }
  ) {
    switch (action.type) {
      case "toggle":
        return state === action.id ? null : action.id;
      case "close":
        return null;
      default:
        return state;
    }
  }

  const [detailId, detailDispatch] = useReducer(detailReducer, null);

  return (
    <ProblemsContext.Provider
      value={{
        book_id,
        problems,
        logs,
        uniqueNames,
        detailId,
        detailDispatch,
      }}
    >
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
