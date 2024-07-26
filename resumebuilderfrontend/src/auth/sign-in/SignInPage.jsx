import React from 'react'
import { SignIn } from '@clerk/clerk-react'

export const SignInPage = () => {
  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <SignIn/>
    </div>
  )
}
