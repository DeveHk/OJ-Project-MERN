import { Problem } from "@/api/problemUser";
import { apicall } from "@/api/problemUser";
import { useState, useEffect } from "react";
import ProblemPanel from "./ProblemPanel";
import CodePanel from "./CodePanel";
type TestCase = {
  testin: string;
  testout: string;
};
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
        const res = await apicall(problemId);
        if (res && res.status === 200) {
          setProblem(res.data.problem);
          setTestcase(res.data.testcases || []);
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
