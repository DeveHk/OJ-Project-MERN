import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import {
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import { IoMdMenu } from "react-icons/io";
import useAuth from "../hooks/Auth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCode, FaMountain } from "react-icons/fa";
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
    }
  };
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;
  return (
    <header className="sticky z-10 top-0 flex  py-2 w-full shrink-0 bg-white/40 dark:bg-black/40 backdrop-blur-[15px] items-center px-4 md:px-6">
      <div className="w-full flex items-center h-full justify-between ">
        <Link className="flex gap-2 h-full justify-center items-center " to="/">
          <FaCode className="h-6 w-6" />
          <span className="sr-only">Online Judge</span>
          <span className="lg:block hidden font-semibold">Online Judge</span>
        </Link>
        <NavigationMenu className="hidden  lg:flex">
          <NavigationMenuList>
            <NavigationMenuLink asChild>
              <Link
                className="group inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100/40 hover:text-gray-900 focus:bg-gray-100/40 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                to="/"
              >
                Home
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                className="group inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100/40 hover:text-gray-900 focus:bg-gray-100/40 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                to="#"
              >
                About
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                className="group inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100/40 hover:text-gray-900 focus:bg-gray-100/40 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                to="/problems"
              >
                Problems
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                className="group inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100/40 hover:text-gray-900 focus:bg-gray-100/40 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                to="#"
              >
                Challenges
              </Link>
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="ml-auto  flex gap-2">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="">
              <Button variant="outline" className="h-6">
                Sign in
              </Button>
            </Link>
            <Link to="/register">
              <Button className="h-6">Sign Up</Button>
            </Link>
          </>
        ) : (
          <>
            {" "}
            <Link to="/dashboard">
              <Button className="h-6">Dashboard</Button>
            </Link>
            <Button onClick={handleLogout} className="h-6" variant="outline">
              Logout
            </Button>
          </>
        )}
        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden h-6" size="icon" variant="outline">
              <IoMdMenu className="h-4 w-4" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link to="#">
              <FaMountain className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <div className="grid gap-2 py-6">
              <Link
                className="flex w-full items-center py-2 text-lg font-semibold"
                to="/"
              >
                Home
              </Link>
              <Link
                className="flex w-full items-center py-2 text-lg font-semibold"
                to="#"
              >
                About
              </Link>
              <Link
                className="flex w-full items-center py-2 text-lg font-semibold"
                to="/problems"
              >
                Problems
              </Link>
              <Link
                className="flex w-full items-center py-2 text-lg font-semibold"
                to="#"
              >
                Challenges
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
