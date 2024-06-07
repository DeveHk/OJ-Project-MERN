import { useState, useEffect } from "react";
import { Problem, TestCase, apicall } from "@/api/problemUser";
import ProblemPanel from "./ProblemPanel";
import CodePanel from "./CodePanel";
import axios from "axios";

export default function ProblemSinglePage({
  problemId,
}: {
  problemId: string | null;
}) {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [testcase, setTestcase] = useState<TestCase[]>([]);

  useEffect(() => {
    const getData = async () => {
      if (problemId) {
        try {
          const data = await apicall(problemId);
          setProblem(data.problem);
          setTestcase(data.testcases || []);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            console.error("Error fetching problem data:", err.response?.data);
          } else {
            console.error("An unexpected error occurred:", err);
          }
        }
      }
    };

    getData();
  }, [problemId]);

  return (
    <div className="grid lg:grid-cols-[500px_1fr] md:grid-cols-[300px_1fr] gap-6 w-full lg:px-5 mx-auto py-8">
      {problem && <ProblemPanel problem={problem} testcase={testcase} />}
      <CodePanel />
    </div>
  );
}
