"use Client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  PaginationPrevious,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationContent,
  Pagination,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { CiBoxList } from "react-icons/ci";
import apicalls from "@/api/problemUser";
import { Problem } from "@/api/problemUser";
import { FaArrowRight, FaFilter } from "react-icons/fa";

export default function ProblemsPage() {
  const [pagenumber, setPagenumber] = useState(1);
  const [problems, setProblems] = useState<Problem[]>([]);
  const getproblems = async () => {
    const res = await apicalls(pagenumber);
    if (res) setProblems(res?.problems);
    console.log(res);
    console.log(problems);
  };
  useEffect(() => {
    getproblems();
  }, [pagenumber]);

  return (
    <main className="container mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20">
      <div className="grid gap-6 md:gap-8 lg:gap-10">
        <div className="grid gap-4 md:gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
              Coding Problems
            </h1>
            <div className="flex items-center gap-4">
              <Button size="sm" variant="outline">
                <FaFilter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button size="sm" variant="outline">
                <CiBoxList className="w-4 h-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:gap-6">
            {problems.map((problem, i) => (
              <Card
                key={i}
                className="p-4 md:p-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-[#55efc4] rounded-lg w-12 h-12 flex items-center justify-center text-2xl">
                    {(pagenumber - 1) * 4 + i + 1}
                  </div>
                  <div className="grid gap-1">
                    <h3 className="text-lg font-semibold">{problem.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge className="px-2 py-1 text-sm" variant="secondary">
                        {problem.difficulty}
                      </Badge>
                      <div className="text-gray-500 dark:text-gray-400 text-sm">
                        Problems Tags to be added
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
                  href={`/problems/${problem._id}`}
                >
                  View Problem
                  <FaArrowRight className="w-4 h-4" />
                </a>
              </Card>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              {pagenumber > 1 && (
                <>
                  <PaginationItem
                    onClick={() => {
                      setPagenumber(pagenumber - 1);
                    }}
                  >
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">{pagenumber - 1}</PaginationLink>
                  </PaginationItem>
                </>
              )}
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  {pagenumber}
                </PaginationLink>
              </PaginationItem>
              {problems.length == 4 && (
                <>
                  <PaginationItem>
                    <PaginationLink href="#">{pagenumber + 1}</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem
                    onClick={() => {
                      setPagenumber(pagenumber + 1);
                    }}
                  >
                    <PaginationNext href="#" />
                  </PaginationItem>
                </>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </main>
  );
}
