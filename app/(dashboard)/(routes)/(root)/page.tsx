import { UserButton, auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import Image from 'next/image'
import { getDashboardCourses } from '@/actions/getDashboardCourses';
import CoursesList from '@/components/CoursesList';
import { CheckCircle, Clock } from 'lucide-react';
import InfoCard from './_components/InfoCard';

export default async function Dashboard() {
  const {userId} = auth();
  if (!userId) return redirect('/');
  const {completedCourses, coursesInProgress} = await getDashboardCourses(userId);

  return (
    <div className="p-6 space-y-4">
      <div className='grid grid-cols-1 md:sm:grid-cols-2 gap-4'>
        <InfoCard icon={Clock} label='In Progress' numberOfItems={coursesInProgress?.length} />
        <InfoCard icon={CheckCircle} label='In Progress' numberOfItems={completedCourses?.length} variant='success' />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
      hello
    </div>
  )
}
