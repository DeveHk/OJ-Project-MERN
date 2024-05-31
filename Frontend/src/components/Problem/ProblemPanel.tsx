import React from "react";
import Markdown from "react-markdown";
import { Problem } from "@/api/problemUser";
import remarkGfm from "remark-gfm";
type TestCase = {
  testin: string;
  testout: string;
};
const ProblemPanel = ({
  problem,
  testcase,
}: {
  problem: Problem;
  testcase: TestCase[];
}) => {
  return (
    <div className="md:h-[90vh] overflow-y-scroll no-scrollbar space-y-6">
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
            <Markdown className="markdown" remarkPlugins={[remarkGfm]}>
              {problem?.description || ""}
            </Markdown>
          </p>
          {testcase.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Test Cases</h3>
              <div className="space-y-1">
                {testcase.length > 0 &&
                  testcase.map((test, i) => (
                    <div
                      key={`${test.testin}-${i}`}
                      className="bg-gray-100 px-4 py-2 rounded-md text-sm font-mono dark:bg-gray-800"
                    >
                      <span className="text-gray-500 dark:text-gray-400">
                        Input:
                      </span>
                      <div className="whitespace-pre-line">{test.testin}</div>
                      <br />
                      <span className="text-gray-500 dark:text-gray-400">
                        Output:
                      </span>
                      <div className="whitespace-pre-line">{test.testout}</div>
                      <br />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemPanel;
