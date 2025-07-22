"use client"
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useUserCourseList } from '../_context/UserCourseListContext';

const AddCourse = () => {
    const { user } = useUser();
    const { userCourseList } = useUserCourseList();
    const maxCourses = 5;
    const router = useRouter();
    const handleClick = () => {
        if (userCourseList.length >= maxCourses) {
            router.push('/dashboard/upgrade');
        } else {
            router.push('/create-course');
        }
    };
    return (
        <div className="bg-violet-50 border border-violet-200 rounded-lg shadow p-6 mb-6 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold text-violet-700">Hello,<span className="ml-2 uppercase">{user?.fullName || user?.username}</span></h2>
                <p className="text-violet-500 mt-2">Create new course with AI, Share with friends and earn from it</p>
            </div>
            <Button
                className="mt-4 md:mt-0 px-6 py-3 cursor-pointer text-lg font-semibold rounded-full bg-violet-600 text-white hover:bg-violet-700"
                onClick={handleClick}
            >
                + Create AI Course
            </Button>
        </div>
    )
}

export default AddCourse