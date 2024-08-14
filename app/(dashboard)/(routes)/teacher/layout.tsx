import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

const TeacherLayout = ({children}: {children: React.ReactNode}) => {
  const {userId} = auth();
  return (
    <div>
      {children}
    </div>

  )
}

export default TeacherLayout ;
