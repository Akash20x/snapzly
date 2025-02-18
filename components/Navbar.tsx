import Link from 'next/link'
import React from 'react'
import { SignIn } from './GoogleSignInButton'
import AuthSession from './AuthSession'
import GuestBtn from './GuestBtn'

const Navbar = async () => {

  return (
    <nav className="bg-gray-100 border-b border-gray-200 dark:bg-gray-900 dark:border-violet-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900 dark:text-white">
            Snapzly
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4 ml-auto md:w-auto">
          <AuthSession>
            <div className="flex flex-row items-center space-x-4">
              <SignIn /> 
              <GuestBtn />
            </div>           
          </AuthSession>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
