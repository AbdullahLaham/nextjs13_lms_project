import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import React from 'react'

const ChapterIdPage = ({params}: {params: {courseId: string, chapterId: string}}) => {
    const {userId} = auth();
    if (!userId) return redirect('/')
  return (
    <div>
      
    </div>
  )
}

export default ChapterIdPage
