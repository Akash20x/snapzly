'use client'

import { store } from '../store';
import React from 'react'

const GuestBtn = () => {

  const { loginAsGuest } = store(); 
    
  return (
    <div className='flex items-center space-x-2 text-white  hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-4 text-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-blue-800 border-orange border-2'>
         <button onClick={loginAsGuest} className='text-gray-800'>Guest Login</button>
    </div>
  )
}

export default GuestBtn
