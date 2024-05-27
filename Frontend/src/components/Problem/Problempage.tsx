import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Problem } from "@/api/problemUser";
import { useState, useEffect } from "react";
import { apicall } from "@/api/problemUser";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
const ProblemPage = ({ problemId }: { problemId: string | null }) => {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [testcase, setTestcase] = useState([""]);

  const [mounted, setMounted] = useState([""]);
  const getData = async () => {
    const res = await apicall(problemId);
    if (res && res?.status == 200) {
      setProblem(res.data.problem);
      console.log(res.data.testcases);
      setTestcase(res.data.testcases);
    }
    console.log(testcase);
  };
  useEffect(() => {
    if (problem == null) getData();
  }, []);
  return (
    <div className="grid  lg:grid-cols-[500px_1fr] md:grid-cols-[300px_1fr] gap-6 w-full lg:px-5 mx-auto py-8 ">
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md dark:bg-gray-950">
          <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">{problem?.title}</h1>
            <div className="flex items-center gap-2">
              <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-sm font-medium dark:bg-yellow-900 dark:text-yellow-200">
                {problem?.difficulty}
              </div>
              <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-sm font-medium dark:bg-gray-800 dark:text-gray-400">
                Array
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              <Markdown className={"markdown"} remarkPlugins={[remarkGfm]}>
                {problem?.description}
              </Markdown>
            </p>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Test Cases</h3>
              <div className="space-y-1">
                {testcase.length > 0 &&
                  testcase.map((test, i) => (
                    <div
                      key={i}
                      className="bg-gray-100 px-4 py-2 rounded-md text-sm font-mono dark:bg-gray-800"
                    >
                      <span className="text-gray-500 dark:text-gray-400">
                        Input:
                      </span>
                      <div className="whitespace-pre-line">{test?.testin}</div>
                      <br />
                      <span className="text-gray-500 dark:text-gray-400">
                        Output:
                      </span>
                      <div className="whitespace-pre-line">{test?.testout}</div>
                      <br />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md dark:bg-gray-950">
        <div className="p-6 space-y-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="input"
              >
                Input
              </label>
              <Textarea
                className="resize-none rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                id="input"
                placeholder="Enter your input here..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="result"
              >
                Result
              </label>
              <Textarea
                className="resize-none rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                id="result"
                placeholder="Your result will be displayed here..."
                readOnly
                rows={4}
              />
            </div>
          </div>
          <Button className="w-full">Run Code</Button>
        </div>
      </div>
    </div>
  );
};
export default ProblemPage;
