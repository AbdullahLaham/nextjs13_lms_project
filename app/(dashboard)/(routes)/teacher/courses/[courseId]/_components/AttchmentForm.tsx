"use client"

import { Attachment, Course } from '@prisma/client'
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
import { ImageIcon, Pencil, PlusCircle, File, Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import FileUpload from '@/components/FileUpload';

interface AttachmentFormProps {
    initialData: Course & { attachments: Attachment[] },
    courseId: string,
}


const AttachmentForm = ({initialData, courseId}: AttachmentFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => {
    setIsEditing(current => !current)
  }

    const formSchema = z.object({
      url: z.string().min(1),
    });


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        const res = await axios.post(`/api/courses/${courseId}/attachments`, values);

        toast.success("course updated successfully");
        toggleEdit();
        router.refresh();

      } catch (error) {
        toast.error("something went wrong");
      }
      
    }



    const onDelete = async (id: string) => {
      try {
        setDeletingId(id);
        await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
        toast.success("Attachment Deleted");
        router.refresh();
      }  catch (error) {
          toast.error('something went wrong')
      } finally {
        setDeletingId(null);
      }
    }
   
  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
        <div className='fomt-medium flex items-center justify-between '>
            Course Attchments
            <Button variant={'ghost'} onClick={toggleEdit} >
                {isEditing && <>Cancel</>}
                {!isEditing && 
                  (
                    <>
                      <Pencil className='h-4 w-4 mr-2' /> Add File
                    </>
                  )
                }
            </Button>
        </div>

       
        
        {!isEditing && 
          initialData?.attachments?.length === 0 && (
            <div onClick={toggleEdit} className='text-sm mt-2 text-slate-500 italic'>
              No Attachments Yet
            </div>
          )
        }



        {
          !isEditing && initialData?.attachments?.length > 0 && (
            <div className='space-y-2'>
              {
                initialData?.attachments?.map((attachment: any) => {
                  return (
                    <div className='flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md'>
                      <File className='h-4 w-4 mr-2 flex-shrink-0' />
                      <p>{attachment?.name}</p>
                      {deletingId === attachment?.id ? (
                        <Loader2 className='h-4 w-4 animate-spin'
                         />
                      ): (
                        <button className='ml-auto hover:opacity-75 transition ' onClick={() => onDelete(attachment?.id)}>
                          <X className='h-4 w-4 '
                         />
                        </button>
                      )}
                    </div>
                  )
                })
              }
            </div>
          )
        }

        
        {isEditing && (
          <div>
              <div className='' >
              <FileUpload
                endpoint='courseAttachment' onChange={(url) => {
                  if (url) onSubmit({url: url})

                }} />
                <div className='text-xs text-muted-foreground mt-4'>
                  Add anything your students might need to complete the course
                </div>
              </div>

          </div>
        )}        


    </div>
  )
}

export default AttachmentForm
