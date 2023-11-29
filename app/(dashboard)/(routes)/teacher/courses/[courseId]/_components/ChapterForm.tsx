"use client"

import { Chapter, Course } from '@prisma/client'
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
import { Pencil, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

interface DescriptionFormProps {
    initialData: Course & {chapters: Chapter[]},
    courseId: string,
}

 const formSchema = z.object({
         title: z.string().min(1)
     });

const ChapterForm = ({initialData, courseId}: DescriptionFormProps) => {
     // router
     const router = useRouter();

     const [isCreating, setIsCreating] = useState(false);
     const [isUpdating, setIsUpdating] = useState(false);

     const toggleCreate = () => setIsCreating(current => !current);

    

     const form = useForm<z.infer<typeof formSchema>>  ({
         resolver: zodResolver(formSchema),
         defaultValues: {
            title: "",
         },
     
       });
 
       const { isSubmitting, isValid } = form.formState;
 
       const onSubmit = async (values: z.infer<typeof formSchema>) => {
         try {
           const res = await axios.patch(`/api/courses/${courseId}/chapters`, values);
 
           toast.success("chapter created successfully");
           toggleCreate();
           router.refresh();
 
         } catch (error) {
           toast.error("something went wrong");
         }
         
       }
  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
        <div className='fomt-medium flex items-center justify-between '>
            Course Description
            <Button variant={'ghost'} onClick={toggleCreate}>
                {!isCreating ? <><PlusCircle className='w-4 h-4 mr-2' /> Add a chapter</> : 'Cancel'}
            </Button>

        </div>

        {isCreating && (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >
                    <FormField control={form.control} name={'title'} render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input disabled={isSubmitting} placeholder="Introduction to the course" {...field} />
                            
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}  />
                    <Button disabled={!isValid || isSubmitting} type='submit' >
                        Create
                    </Button>


                </form>
            </Form>
        )}

        {
            !isCreating && (
                <div className={cn("text-sm mt-2", !initialData.chapters.length && "text-slate-500 italic")} >
                    {!initialData?.chapters?.length ? "No Chapters" : (
                        <ChaptersList onEdit={() => {}} onReorder={() => {}} items={initialData?.chapters || []} />
                    )}
                </div>
            )
        }
        {
            !isCreating && (
                <p className='text-xs text-muted-foreground mt-4'>
                    Drag and drop to reorder the chapters
                </p>
            )
        }
        


      
    </div>
  )
}

export default ChapterForm
