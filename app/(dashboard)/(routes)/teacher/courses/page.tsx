
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { columns } from './_components/columns'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { DataTable } from './_components/data-table';

const CoursesPage = async () => {
  const {userId} = auth();
  if (!userId) redirect("/");
  const courses  = await db.course.findMany({
    where: {
      userId
    },
    orderBy:{
      createdAt: "desc"
    }
    
  })
  return (
    <div className='p-6'>
      <Link href={'/teacher/create'}>
        <Button>
            New Course
        </Button>
      </Link>
      <DataTable columns={columns} data={courses} />
    </div>

  )
}

export default CoursesPage
