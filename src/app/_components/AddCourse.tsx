"use client"
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const AddCourse = () => {
    const { user } = useUser()
    return (
        <div className='flex items-center justify-between w-full px-6'>
            <div>
                <h2 className='text-2xl'>Hello,<span className='font-bold'>{user?.fullName}</span></h2>
                <p className='text-sm text-gray-500'>Create new course with AI, Share with friends and earn from it</p>
            </div>
            <Link  href={'/create-course'}>
               <Button className='cursor-pointer '>+ Create AI Course</Button>
            </Link>
            
        </div>
    )
}

export default AddCourse