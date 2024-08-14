import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IconBadge } from '@/components/icon-badge'
import { BookOpen } from 'lucide-react'
import { format } from 'path'
=import CourseProgress from './CourseProgress'
interface CourseCardProps {
    id: string,
    title: string,
    imageUrl: string,
    chaptersLength: number,
    price: number,
    progress: number | null,
    category: string,
}
const CourseCard = ({id, imageUrl, category, chaptersLength, price, progress, title}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
        <div className='group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full '>
            <div className='relative w-full aspect-video rounded-md overflow-hidden '>
                <Image alt={title} src={imageUrl} fill className='object-cover' />

            </div>
            <div className='flex flex-col pt-2 '>
                <div className='text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2'>{title}</div>
                <p className='text-xl text-muted-foreground '>{category}</p>
                <div className='my-3 flex items-center gap-x-2 md:text-xs '>
                    <div className='flex items-center gap-x-1 text-slate-500 '>
                        <IconBadge size={'sm'} icon={BookOpen} />
                        <span>{chaptersLength} {chaptersLength == 1 ? 'Chapter' : 'Chapters'}</span>

                    </div>

                </div>
                {progress !== null ? (
                    
                    <div>
                        <CourseProgress size='sm' value={progress} variant={progress == 100 ? 'success': 'default'} />
                    </div>
                ) : (
                    <p className='text-md md:text-sm font-medium text-slate-700'>${price}</p>

                )}
            </div>

        </div>
      
    </Link>
  )
}

export default CourseCard
