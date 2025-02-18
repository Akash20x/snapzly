'use client'

import React, { ReactNode } from 'react';
import { ChatbotBtn } from './ChatbotBtn';
import UsernameDropdown from './UsernameDropdown';
import { SignOut } from './SignOutBtn';
import { useSession } from 'next-auth/react'; 
import { store } from '../store';

interface AuthSessionProps {
  children: ReactNode;
}

const AuthSession: React.FC<AuthSessionProps> = ({ children }) => { 
  const { data: session } = useSession(); 
  const { user } = store(); 

  const userSession = session?.user || user;

  return (
    <>
      {userSession ? (
        <div className="flex items-center space-x-4">
          <span className='hidden md:block'>
            <ChatbotBtn />
          </span>
          <UsernameDropdown userName={userSession?.name} />
          <SignOut />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default AuthSession;
