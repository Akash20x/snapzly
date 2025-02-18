"use client";

import React, { useState } from "react";
import Link from "next/link";

interface UsernameDropdownProps {
  userName: string | null | undefined;
}

const UsernameDropdown = ({ userName }: UsernameDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 text-base text-gray-800 dark:text-gray-300 focus:outline-none"
      >
        <span className="font-medium">{userName}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border rounded-lg shadow-lg z-10">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-300">
            <li>
              <Link
                href="/profile"
                onClick={() => setIsDropdownOpen(false)}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Go to Profile
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UsernameDropdown;
