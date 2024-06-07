import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SubmissionData } from "./DashProblemPanel";

export function SubmissionModal({
  submission,
  isOpen,
  setOpen,
}: {
  submission: SubmissionData | null;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={() => setOpen(false)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{submission?._id}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/*<CodeEditor lang={submission?.language || ""}
  code={submission?.code_ref || ""}
  disabled={true}></CodeEditor>*/}
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
