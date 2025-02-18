"use client"

import { useSession } from 'next-auth/react'; // Using NextAuth's useSession hook
import { store } from '../../store';
import ChatInterface from '@/components/ChatInterface';

const Home =  () => {

  const { data: session } = useSession();
  const { user } = store();

  const userSession = user || session?.user;

  return (
    <>
      {userSession ? (
        <ChatInterface />
      ) : (
        <div className='flex justify-center items-center min-h-[calc(100vh-90px)]'>
          <p className='text-center'>Please sign in or guest login to use the chatbot</p>
        </div>
      )}
    </>
  );
};

export default Home; 
