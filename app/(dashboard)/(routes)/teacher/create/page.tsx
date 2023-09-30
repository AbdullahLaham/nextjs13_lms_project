"use client"

import React from 'react'
import * as z from 'zod';
import axios from 'axios';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is Required"
    })
});

const CreateCoursePage = () => {
  const form = useForm<z.infer<typeof formSchema>>  ({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: '',
    },

  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    
  }
  return (
    <div className='max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6 ' >
      <div>
        <h1 className='text-2xl'>
            Name your course
        </h1>
        <p>
            what would you like to name your course? Don&spos;t worrk, you can change this later
        </p>
        <Form>

        </Form>
      </div>
    </div>
  )
}

export default CreateCoursePage
