"use client"

import { Course } from '@prisma/client'
import React, { useState } from 'react'
import axios from 'axios'
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from '@/components/ui/input';
  import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { Pencil } from 'lucide-react';

interface TitleFormProps {
    initialData: {
        title: string,
    },
    courseId: string
}
const TitleForm: React.FC<TitleFormProps> = ({initialData, courseId}) => {
    // router
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing(current => !current)
    const formSchema = z.object({
        title: z.string().min(1, {
            message: "title is required"
        })
    });
    const form = useForm<z.infer<typeof formSchema>>  ({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    
      });

      const { isSubmitting, isValid } = form.formState;

      const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
          const res = await axios.post("/api/courses", values);
          router.push(`/teacher/courses/${res.data.id}`);
          toast.success("course created successfully");
        } catch (error) {
          toast.error("something went wrong");
        }
        
      }
  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
        <div className='fomt-medium flex items-center justify-between '>
            Course Title
            <Button variant={'ghost'} onClick={toggleEdit}>
                {!isEditing ? <><Pencil className='w-4 h-4 mr-2' /> Edit Title</> : 'Cancel'}

            </Button>

        </div>
        {!isEditing && 
            ( 
                <p>
                    {initialData.title}
                </p>
            )
        }
        {isEditing && (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >

                </form>
            </Form>
        )}
        


      
    </div>
  )
}

export default TitleForm
