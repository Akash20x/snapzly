"use client";

import { signOut } from 'next-auth/react'; // Correct import
import { useRouter } from "next/navigation";

import { store } from '../store'

export function SignOut() {

  const { user, logoutGuest } = store();
  const router = useRouter();


  const handleLogout = async () => {
    if (user) {
      logoutGuest();
      router.push("/");
    } else {
      await signOut({ callbackUrl: "/" }); 
    }
  };


  return (
    <button
      onClick={handleLogout}
      className="flex items-center space-x-2 text-gray-800 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 dark:focus:ring-gray-600"
    >
      {/* Sign-out logo */}
      <div className="flex items-center justify-center bg-gray-200 w-9 h-9 rounded-l dark:bg-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-5 h-5 text-gray-600 dark:text-gray-300"
        >
          <title>Sign out</title>
          <desc>Logout Icon</desc>
          <path
            d="M16 13v-2H7v2h9zm3-9h-4V2h4c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2h-4v-2h4V4zm-7 10H7v2H5v-2H2V9h3V7h2v2h5v6z"
            className="fill-current"
          ></path>
        </svg>
      </div>
      <span>{"Log out"}</span>
    </button>
  );
}
