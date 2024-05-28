import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import {
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import useAuth from "../hooks/Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // Make a request to the logout endpoint
      const res = await axios.get("http://localhost:5000/auth/logout", {
        withCredentials: true,
      });
      console.log(res);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle error if needed, such as displaying an error message to the user
    }
  };
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;
  return (
    <header className="sticky top-0 flex  py-2 w-full shrink-0 bg-white/40 dark:bg-black/40 backdrop-blur-[15px] items-center px-4 md:px-6">
      <div className="w-full flex justify-between ">
        <a className=" " href="/">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </a>
        <NavigationMenu className="hidden  lg:flex">
          <NavigationMenuList>
            <NavigationMenuLink asChild>
              <a
                className="group inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100/40 hover:text-gray-900 focus:bg-gray-100/40 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                href="/"
              >
                Home
              </a>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <a
                className="group inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100/40 hover:text-gray-900 focus:bg-gray-100/40 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                href="#"
              >
                About
              </a>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <a
                className="group inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100/40 hover:text-gray-900 focus:bg-gray-100/40 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                href="/problems"
              >
                Problems
              </a>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <a
                className="group inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100/40 hover:text-gray-900 focus:bg-gray-100/40 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                href="#"
              >
                Challenges
              </a>
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="ml-auto  flex gap-2">
        {!isAuthenticated ? (
          <>
            <a href="/login" className="">
              <Button variant="outline" className="h-6">
                Sign in
              </Button>
            </a>
            <a href="/register">
              <Button className="h-6">Sign Up</Button>
            </a>
          </>
        ) : (
          <>
            {" "}
            <a href="/dashboard">
              <Button className="h-6">Dashboard</Button>
            </a>
            <Button onClick={handleLogout} className="h-6" variant="outline">
              Logout
            </Button>
          </>
        )}
        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden h-6" size="icon" variant="outline">
              <MenuIcon className="h-4 w-4" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <a href="#">
              <MountainIcon className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </a>
            <div className="grid gap-2 py-6">
              <a
                className="flex w-full items-center py-2 text-lg font-semibold"
                href="#"
              >
                Home
              </a>
              <a
                className="flex w-full items-center py-2 text-lg font-semibold"
                href="#"
              >
                About
              </a>
              <a
                className="flex w-full items-center py-2 text-lg font-semibold"
                href="#"
              >
                Problems
              </a>
              <a
                className="flex w-full items-center py-2 text-lg font-semibold"
                href="#"
              >
                Challenges
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
