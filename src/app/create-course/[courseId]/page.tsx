"use client";
import { GetCourse } from '../action';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import LoadingDialog from '../_components/LoadingDialog';
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetail from './_components/CourseDetail';
import ChapterList from './_components/ChapterList';

const CourseLayout = ({ params }: any) => {
  const { user } = useUser();
  const [courseData, setCourseData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!user?.fullName || !params?.courseId) {
        return;
      }
      setLoading(true);
      try {
        const result = await GetCourse(params.courseId, user.fullName);
        setCourseData(result[0]);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params && user) {
      fetchCourse();
    }
  }, [params, user]);

  return (
    <div className="mt-10 px-10 md:px-20 lg:px-44">
      <LoadingDialog loading={loading} />
      <h2 className="font-bold text-2xl text-center">Course Layout</h2>
      {/* Basic Info */}
      <CourseBasicInfo Course={courseData} />

      {/* Course Detail */}
      <CourseDetail Course={courseData} />
      {/* List of Lessons */}
      <ChapterList Course={courseData} />
    </div>
  );
};

export default CourseLayout;
