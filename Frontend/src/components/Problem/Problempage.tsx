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

export default function ProblemPage() {
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
                <FilterIcon className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button size="sm" variant="outline">
                <ListOrderedIcon className="w-4 h-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:gap-6">
            <Card className="p-4 md:p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-[#55efc4] rounded-lg w-12 h-12 flex items-center justify-center text-2xl">
                  1
                </div>
                <div className="grid gap-1">
                  <h3 className="text-lg font-semibold">Two Sum</h3>
                  <div className="flex items-center gap-2">
                    <Badge className="px-2 py-1 text-sm" variant="secondary">
                      Easy
                    </Badge>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">
                      Array, Hash Table
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
                href="#"
              >
                View Problem
                <ArrowRightIcon className="w-4 h-4" />
              </a>
            </Card>
            <Card className="p-4 md:p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-[#ffeaa7] rounded-lg w-12 h-12 flex items-center justify-center text-2xl">
                  2
                </div>
                <div className="grid gap-1">
                  <h3 className="text-lg font-semibold">Add Two Numbers</h3>
                  <div className="flex items-center gap-2">
                    <Badge className="px-2 py-1 text-sm" variant="secondary">
                      Medium
                    </Badge>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">
                      Linked List, Math
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
                href="#"
              >
                View Problem
                <ArrowRightIcon className="w-4 h-4" />
              </a>
            </Card>
            <Card className="p-4 md:p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-[#fdcb6e] rounded-lg w-12 h-12 flex items-center justify-center text-2xl">
                  3
                </div>
                <div className="grid gap-1">
                  <h3 className="text-lg font-semibold">
                    Longest Substring Without Repeating Characters
                  </h3>
                  <div className="flex items-center gap-2">
                    <Badge className="px-2 py-1 text-sm" variant="secondary">
                      Medium
                    </Badge>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">
                      Hash Table, String, Sliding Window
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
                href="#"
              >
                View Problem
                <ArrowRightIcon className="w-4 h-4" />
              </a>
            </Card>
            <Card className="p-4 md:p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-[#ff7675] rounded-lg w-12 h-12 flex items-center justify-center text-2xl">
                  4
                </div>
                <div className="grid gap-1">
                  <h3 className="text-lg font-semibold">
                    Median of Two Sorted Arrays
                  </h3>
                  <div className="flex items-center gap-2">
                    <Badge className="px-2 py-1 text-sm" variant="secondary">
                      Hard
                    </Badge>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">
                      Array, Binary Search, Divide and Conquer
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
                href="#"
              >
                View Problem
                <ArrowRightIcon className="w-4 h-4" />
              </a>
            </Card>
          </div>
        </div>
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </main>
  );
}

function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function FilterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function ListOrderedIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  );
}
