'use client'

import React from "react";
import { ChatbotBtn } from "./ChatbotBtn";
import { useSession } from 'next-auth/react'; 
import { store } from '../store';
 
const MainPage = () => {

  const { data: session, status } = useSession(); 
  const { user } = store(); 

  const userSession = user || session?.user;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 flex flex-col min-h-[calc(100vh-90px)]">
      <main className="flex-grow">
        <div className="max-w-screen-xl mx-auto px-4 pt-12 pb-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 animate__animated animate__fadeInUp">
            Welcome to Snapzly
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300 animate__animated animate__fadeInUp animate__delay-2s mb-10">
            Generate HTML and CSS code instantly and see live previews directly
            in the chat.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border rounded-lg bg-white shadow-lg dark:bg-gray-800 dark:border-gray-700 transform hover:scale-105 transition-all ease-in-out duration-300 animate__animated animate__fadeInLeft animate__delay-2.5s">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Generate Complete HTML & CSS Code
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Use natural language prompts to create fully functional HTML and
                CSS code. Perfect for prototyping for landing page.
              </p>
            </div>
            <div className="p-8 border rounded-lg bg-white shadow-lg dark:bg-gray-800 dark:border-gray-700 transform hover:scale-105 transition-all ease-in-out duration-300 animate__animated animate__fadeInRight animate__delay-2.5s">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Live Code Previews
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Instantly preview your generated code without leaving the chat
                interface. Make real-time edits and see the results immediately.
              </p>
            </div>
          </div>

          <div className="mt-8 animate__animated animate__fadeInUp animate__delay-3s">
            {userSession ? (
              <>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                Hi {userSession?.name}, now you can access the Chatbot.
                </p>
                <div className="flex justify-center">
                <ChatbotBtn />
                </div>
              </>
             
            ) : (
              <p className="text-lg text-gray-600 py-6 dark:text-gray-400 mb-4">
                Sign in with your Google account or Guest Login to start building landing page with AI.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
