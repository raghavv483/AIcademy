"use client"
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import { GetCourse } from '../../action';
import CourseBasicInfo from '../_components/CourseBasicInfo';

const FinalContentPage = ({ params }: any) => {
    const { user } = useUser();
    const [courseData, setCourseData] = useState<any>([]);

    useEffect(() => {
        if (params && user) {
            fetchCourse();
        }
    }, [params, user]);

    const fetchCourse = async () => {

        if (!user?.fullName || !params?.courseId) {
            return;
        }

 
        try {
            const result = await GetCourse(params.courseId, user.fullName);
            setCourseData(result[0])
            console.log(result[0]);
        } catch (error) {
            console.error('Error fetching course:', error);
        } finally {
  
        }
        
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 i'>
            <h2>Congrats Your course is ready!!</h2>
            <CourseBasicInfo Course= {courseData}/>
            
        </div>
    )
}
    export default FinalContentPage;
