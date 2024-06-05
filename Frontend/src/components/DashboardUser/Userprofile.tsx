import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
interface User {
  username: string;
  fname: string;
  lname: string;
  email: string;
  createdAt: string;
}
interface Problem {
  _id: string;
  title: string;
  difficulty: string;
}
export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [problems, setProblems] = useState<Problem[] | null>(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const apicall = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/profile", {
        withCredentials: true,
      });
      console.log(res);
      setUser(res.data.user);
      setProblems(res.data.problem);
      setMounted(true);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    apicall();
  }, []);
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="flex flex-col p-6 gap-1">
          {mounted ? (
            <>
              <div className="flex flex-row items-center gap-4 ">
                <Avatar className="h-16 w-16">
                  <AvatarFallback>
                    {user?.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1 text-left">
                  <div className="">{user?.username}</div>
                  <div className="text-lg font-medium">
                    {user?.fname} {user?.lname}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Joined on {user?.createdAt}
              </div>
            </>
          ) : (
            <Skeleton className="h-24 w-full"></Skeleton>
          )}
        </Card>
        <Card className="flex flex-col overflow-hidden gap-1">
          {mounted ? (
            <>
              <CardHeader className="bg-gray-600 text-white py-3 px-4">
                <CardTitle>Total Problems Attempted</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="text-4xl font-bold">{problems?.length}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Attempted so far
                </div>
              </CardContent>
            </>
          ) : (
            <Skeleton className="h-24 w-full"></Skeleton>
          )}
        </Card>
        <Card className="flex md:col-span-2 flex-col overflow-hidden gap-1">
          {mounted ? (
            <>
              {" "}
              <CardHeader className="bg-gray-600 text-white py-3 px-4">
                <CardTitle>Difficulty Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">
                      {
                        problems?.filter((prob) => prob.difficulty == "Easy")
                          .length
                      }
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Easy
                    </div>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">
                      {" "}
                      {
                        problems?.filter((prob) => prob.difficulty == "Medium")
                          .length
                      }
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Medium
                    </div>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">
                      {" "}
                      {
                        problems?.filter((prob) => prob.difficulty == "Hard")
                          .length
                      }
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Hard
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <Skeleton className="h-24 w-full"></Skeleton>
          )}
        </Card>
        <Card className="flex flex-col overflow-hidden gap-1">
          {mounted ? (
            <>
              {" "}
              <CardHeader className="bg-gray-600 text-white py-3 px-4">
                <CardTitle>Recently Attempted</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="space-y-2">
                  {problems?.map((prob, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{prob.title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {prob.difficulty}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Attempted
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>{" "}
            </>
          ) : (
            <Skeleton className="h-24 w-full"></Skeleton>
          )}
        </Card>
      </div>
    </main>
  );
}

function BookOpenIcon(props) {
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
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function CodeIcon(props) {
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
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function ListIcon(props) {
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
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  );
}

function MilestoneIcon(props) {
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
      <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z" />
      <path d="M12 13v8" />
      <path d="M12 3v3" />
    </svg>
  );
}

function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
