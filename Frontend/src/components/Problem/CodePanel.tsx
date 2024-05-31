import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import CodeEditor from "./CodeEditor";
import { LangSelect } from "./LangSelect";
import { useToast } from "../ui/use-toast";
import { apicallcompile, apicallsubmit } from "@/api/compilation";
import { FcProcess } from "react-icons/fc";
import { useNavigate, useParams } from "react-router-dom";
const CodePanel = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [lang, setLang] = useState<string>("cpp");
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string | null>("");
  const [output, setOutput] = useState("");
  const [loading, setloading] = useState<boolean>(false);
  const [running, setRunning] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { toast } = useToast();
  const onRun = async () => {
    setRunning(true);
    setloading(true);
    const data = {
      lang,
      code,
      inputValue: [inputValue],
    };
    try {
      const res = await apicallcompile(data);
      setOutput(res?.data?.output[0]);
      console.log("[successfull]", res), output;
      setError("");
    } catch (err) {
      console.log("[Unsuccessfull]", err);
      if (err?.response.status == 403) {
        if (err?.response.data.isAuthenticated == true) {
          toast({
            title: "Unauthorised",
            description: "Only Non Admin user can submit a Solution",
          });
        } else {
          toast({
            title: "Unauthorised",
            description: "Login to submit Solutions",
          });
          navigate("/login");
        }
      }
      let _error = String(err);
      if (data.lang == "cpp" || data.lang == "c")
        _error = err?.response?.data.error.formattedErrors.join("\n");
      else if (data.lang == "python") _error = err?.response?.data.error.error;
      setError(_error);
      setOutput("");
    } finally {
      setloading(false);
      setRunning(false);
    }
    console.log(data);
  };
  const onSubmit = async () => {
    setSubmitting(true);
    setloading(true);
    const data = {
      lang,
      code,
      prob_id: problemId || " ",
    };
    try {
      const res = await apicallsubmit(data);
      console.log("[Successfull]", res);
      /*setOutput(res?.data?.output[0]);
      console.log("[successfull]", res), output;*/
      setError("SOLUTION SUBMITTED");
      toast({
        title: "Solution Submitted",
        description: "Congratulations of Successfull submission!!",
      });
    } catch (err) {
      console.log("[Unsuccessfull]", err);

      if (err?.response.status == 403) {
        if (err?.response.data.isAuthenticated == true) {
          toast({
            title: "Unauthorised",
            description: "Only Non Admin user can submit a Solution",
          });
        } else {
          toast({
            title: "Unauthorised",
            description: "Login to submit Solutions",
          });
          navigate("/login");
        }
      }
      setError(err?.response.data.error.error);
      setOutput("");
    } finally {
      setloading(false);
      setSubmitting(false);
    }
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
              aria-readonly
              className=" resize-none rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              id="result"
              placeholder="Your result will be displayed here..."
              readOnly
              rows={4}
              value={output}
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="result"
            >
              Console
            </label>
            <Textarea
              aria-readonly
              className=" resize-none rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              id="result"
              placeholder="Your result will be displayed here..."
              readOnly
              rows={4}
              value={error}
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
            <div className="gap-4 flex items-center">
              <span className="">{running ? "Code Runnig" : "Run Code"}</span>
              {running && <FcProcess className="animate-spin"></FcProcess>}
            </div>
          </Button>
          <Button
            className="w-full"
            onClick={() => {
              loading
                ? toast({
                    title: "wait till code is Submiting",
                    description: "User activity Restricted",
                  })
                : onSubmit();
            }}
          >
            <div className="gap-4 flex items-center">
              <span className="">
                {submitting ? "Code Submitting" : "Submit"}
              </span>
              {submitting && <FcProcess className="animate-spin"></FcProcess>}
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CodePanel;
