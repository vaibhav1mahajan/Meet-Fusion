import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SingInPage = () => {
  return (
    <main className='flex justify-center items-center h-screen w-full'>

        <SignIn></SignIn>
    </main>
  )
}

export default SingInPage