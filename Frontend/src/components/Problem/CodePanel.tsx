import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import CodeEditor from "./CodeEditor";
import { LangSelect } from "./LangSelect";
import { useToast } from "../ui/use-toast";
const CodePanel = () => {
  const [resultValue, setResultValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [lang, setLang] = useState<string>("cpp");
  const [code, setCode] = useState<string>("");
  const [loading, setloading] = useState<boolean>(false);
  const { toast } = useToast();
  const onRun = () => {
    setloading(true);
    const data = {
      lang,
      code,
      inputValue,
    };
    console.log(data);
  };
  return (
    <div className="md:h-[90vh] py-3 overflow-y-scroll no-scrollbar bg-white rounded-lg shadow-md dark:bg-gray-950">
      <div className="p-6 space-y-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <div className="flex space-x-5 items-center">
              <label
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="result"
              >
                Code
              </label>
              <LangSelect lang={lang} setLang={setLang} />
            </div>
            <div
              className=" shadow-sm no-scrollbar"
              style={{ height: "300px", overflowY: "auto" }}
            >
              <CodeEditor
                setCode={setCode}
                code={code}
                lang={lang}
                disabled={loading}
              ></CodeEditor>
            </div>
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="input"
            >
              Input
            </label>
            <Textarea
              disabled={loading}
              className="resize-none rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              id="input"
              placeholder="Enter your input here..."
              rows={4}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="result"
            >
              Output
            </label>
            <Textarea
              disabled={true}
              aria-readonly
              className=" resize-none rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              id="result"
              placeholder="Your result will be displayed here..."
              readOnly
              rows={4}
              value={resultValue}
            />
          </div>
        </div>
        <div className="flex w-full gap-4 flex-col sm:flex-row">
          <Button
            variant={"outline"}
            className="w-full bg-slate-200 hover:bg-slate-300"
            onClick={() => {
              loading
                ? toast({
                    title: "wait till code is running",
                    description: "User activity Restricted",
                  })
                : onRun();
            }}
          >
            Run Code
          </Button>
          <Button
            className="w-full"
            onClick={() => {
              /* Run Code Logic */
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CodePanel;
