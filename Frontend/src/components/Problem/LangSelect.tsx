import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LangSelect({
  lang,
  setLang,
}: {
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
}) {
  React.useEffect(() => {}, []);
  return (
    <Select defaultValue={lang} onValueChange={(value) => setLang(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Language</SelectLabel>
          <SelectItem value="cpp">c++</SelectItem>
          <SelectItem value="c">c</SelectItem>
          <SelectItem value="java">java</SelectItem>
          <SelectItem value="python">python</SelectItem>
          <SelectItem value="javascript">javascript</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
