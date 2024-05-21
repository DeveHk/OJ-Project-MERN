import React from "react";
import { Button } from "../ui/button";
import { SVGProps } from "react";

const Navbar = () => {
  return (
    <header className="w-full bg-gray-900 py-6 px-4 md:px-6 lg:py-8">
      <div className="container mx-auto flex items-center justify-between">
        <a className="text-white font-bold text-lg" href="#">
          Online Judge
        </a>
        <nav className="hidden md:flex items-center space-x-6">
          <a className="text-gray-400 hover:text-white" href="#">
            Challenges
          </a>
          <a className="text-gray-400 hover:text-white" href="#">
            Leaderboard
          </a>
          <a className="text-gray-400 hover:text-white" href="#">
            Community
          </a>
          <a className="text-gray-400 hover:text-white" href="#">
            About
          </a>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <a
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            href="#"
          >
            Sign In
          </a>
          <a
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            href="#"
          >
            Sign Up
          </a>
        </div>
        <Button className="md:hidden" variant="ghost">
          <MenuIcon className="h-6 w-6 text-white" />
        </Button>
      </div>
    </header>
  );
};

export default Navbar;

const MenuIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
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
};
