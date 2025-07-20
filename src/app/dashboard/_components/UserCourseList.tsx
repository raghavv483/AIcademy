"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button';
import CourseCard from './CourseCard'
import { useUserCourseList } from '../../_context/UserCourseListContext';

const UserCourseList = () => {
    const { user } = useUser();
    const { userCourseList, setUserCourseList } = useUserCourseList();
    useEffect(() => {
        const fetchCourses = async () => {
            if (user && user.fullName) {
                try {
                    const res = await fetch(`/api/get-user-courses?fullName=${user.fullName}`);
                    const data = await res.json();
                    setUserCourseList(data || []);
                } catch (error) {
                    console.log("error fetching course", error);
                }
            }
        };
        fetchCourses();
    }, [user, setUserCourseList]);

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-violet-500">My Courses</h1>
            {userCourseList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userCourseList.map((course, idx) => (
                        <CourseCard key={idx} course={course} />
                    ))}
                </div>
            ) : (
                <p>No courses found.</p>
            )}
        </div>
    );
}

export default UserCourseList