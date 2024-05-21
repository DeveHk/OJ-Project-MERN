import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-8 px-4 md:px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-white font-bold text-lg">Online Judge</div>
        <nav className="flex items-center space-x-6 mt-4 md:mt-0">
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
        <p className="text-gray-400 mt-4 md:mt-0">
          © 2024 Online Judge. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
