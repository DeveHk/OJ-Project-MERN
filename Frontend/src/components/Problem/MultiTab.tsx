import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "../ui/textarea";

export function MultiTab({
  setVal,
  val,
  error,
  output,
  loading,
  inputValue,
  setInputValue,
}) {
  return (
    <Tabs
      value={val}
      onValueChange={(value) => {
        setVal(value);
      }}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="input">Input</TabsTrigger>
        <TabsTrigger value="output">Output</TabsTrigger>
        <TabsTrigger value="console">console</TabsTrigger>
      </TabsList>
      <TabsContent value="input">
        <Textarea
          disabled={loading}
          className="resize-none rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 font-semibold dark:text-gray-300"
          id="input"
          placeholder="Enter your input here..."
          rows={4}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </TabsContent>
      <TabsContent value="output">
        <Textarea
          aria-readonly
          className=" resize-none rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 font-semibold dark:text-gray-300"
          id="result"
          placeholder="Your result will be displayed here..."
          readOnly
          rows={4}
          value={output}
        />
      </TabsContent>
      <TabsContent value="console">
        <Textarea
          aria-readonly
          className=" resize-none text-red-600 font-semibold dark:text-red-300 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 "
          id="result"
          placeholder="Your Console will be displayed here..."
          readOnly
          rows={4}
          value={error || ""}
        />
      </TabsContent>
    </Tabs>
  );
}
