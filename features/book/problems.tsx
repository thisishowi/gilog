import { getLogs, getProblems } from "@/lib/db";
import ProblemsDisplay from "./problems-display";
import { ProblemsContextProvider } from "@/contexts/problems-context";

export default async function Problems({ book_id }: { book_id: string }) {
  const problems = await getProblems(book_id);
  const logs = await getLogs(book_id);

  const uniqueNames = [...new Set(problems.map((row) => row.name))];
  return (
    <ProblemsContextProvider {...{ book_id, problems, logs, uniqueNames }}>
      <div className="fade-in">
        <ProblemsDisplay />
      </div>
    </ProblemsContextProvider>
  );
}
