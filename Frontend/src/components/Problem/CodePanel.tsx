import { useState } from "react";
import { Button } from "../ui/button";
import CodeEditor from "./CodeEditorMonaco";
import { LangSelect } from "./LangSelect";
import { useToast } from "../ui/use-toast";
import { apicallcompile, apicallsubmit } from "@/api/compilation";
import { FcProcess } from "react-icons/fc";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeSelect } from "./ThemeSelect";
import { MultiTab } from "./MultiTab";
const CodePanel = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [lang, setLang] = useState<string>("cpp");
  const [theme, setTheme] = useState<string>("vs");
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string | null>("");
  const [output, setOutput] = useState("");
  const [loading, setloading] = useState<boolean>(false);
  const [running, setRunning] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [val, setVal] = useState<string>("input");

  const { toast } = useToast();
  const onRun = async () => {
    setRunning(true);
    setloading(true);
    setError("");
    const data = {
      lang,
      code,
      inputValue: [inputValue],
    };
    try {
      const res = await apicallcompile(data);
      setOutput(res?.data?.output[0]);
      setVal("output");
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
      if (
        data.lang == "py" ||
        data.lang == "python" ||
        data.lang == "cpp" ||
        data.lang == "c" ||
        data.lang == "java"
      )
        _error = err?.response?.data.error.formattedErrors.join("\n");
      setError(_error);
      setVal("console");
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
    setError("");
    const data = {
      lang,
      code,
      prob_id: problemId || " ",
    };
    try {
      setVal("console");
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
      } else if (err?.response.status == 400) {
        let _error = String(err);
        if (
          data.lang == "py" ||
          data.lang == "python" ||
          data.lang == "cpp" ||
          data.lang == "c" ||
          data.lang == "java"
        )
          _error = err?.response?.data.error.formattedErrors.join("\n");
        setError(_error);
        setOutput("");
      } else {
        setError(err?.response.data.error.error);
      }
      setOutput("");
    } finally {
      setloading(false);
      setSubmitting(false);
    }
    console.log(data);
  };
  return (
    <div className="md:h-[90vh] md:py-0 py-2 overflow-y-scroll no-scrollbar bg-white rounded-lg shadow-md dark:bg-gray-950">
      <div className="p-6 space-y-5">
        <div className="grid gap-4">
          <div className="space-y-2  overflow-x-scroll">
            <div className="flex space-x-5 items-center">
              <label
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="result"
              >
                Code
              </label>
              <LangSelect
                code={code}
                setCode={setCode}
                lang={lang}
                setLang={setLang}
              />
              <ThemeSelect theme={theme} setTheme={setTheme} />
            </div>
            <div
              className=" shadow-sm relative flex  w-full overflow-x-scroll no-scrollbar"
              style={{ height: "300px", overflowY: "auto" }}
            >
              <CodeEditor
                setCode={setCode}
                code={code}
                lang={lang}
                theme={theme}
                disabled={loading}
              ></CodeEditor>
            </div>
          </div>
          <MultiTab
            setVal={setVal}
            val={val}
            error={error}
            output={output}
            setInputValue={setInputValue}
            inputValue={inputValue}
            loading={loading}
          ></MultiTab>
        </div>
        <div className="flex w-full gap-4 flex-col sm:flex-row">
          <Button
            variant={"outline"}
            className="w-full h-8 bg-slate-200 hover:bg-slate-300"
            onClick={() => {
              loading
                ? toast({
                    title: "wait till code is running",
                    description: "User activity Restricted",
                  })
                : onRun();
            }}
          >
            <div className="gap-4  flex items-center">
              <span className="">{running ? "Code Runnig" : "Run Code"}</span>
              {running && <FcProcess className="animate-spin"></FcProcess>}
            </div>
          </Button>
          <Button
            className="w-full h-8"
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
