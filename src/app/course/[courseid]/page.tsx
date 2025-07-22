"use client"
import React, { useEffect, useState } from 'react'
import { getCourseById } from '../action'

import CourseBasicInfo from '@/app/create-course/[courseId]/_components/CourseBasicInfo';
import CourseDetail from '@/app/create-course/[courseId]/_components/CourseDetail';
import ChapterList from '@/app/create-course/[courseId]/_components/ChapterList'

const SkeletonLoader = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
    {/* Left Column Skeleton */}
    <div className="col-span-1 md:col-span-2 space-y-8">
      {/* CourseBasicInfo Skeleton */}
      <div className="bg-slate-200 rounded-lg h-48 w-full"></div>
      {/* CourseDetail Skeleton */}
      <div className="space-y-4">
        <div className="bg-slate-200 rounded h-8 w-1/3"></div>
        <div className="bg-slate-200 rounded h-4 w-full"></div>
        <div className="bg-slate-200 rounded h-4 w-full"></div>
        <div className="bg-slate-200 rounded h-4 w-3/4"></div>
      </div>
    </div>

    {/* Right Column Skeleton */}
    <div className="col-span-1 space-y-4">
      <div className="bg-slate-200 rounded h-10 w-full"></div>
      <div className="bg-slate-200 rounded h-10 w-full"></div>
      <div className="bg-slate-200 rounded h-10 w-full"></div>
      <div className="bg-slate-200 rounded h-10 w-full"></div>
      <div className="bg-slate-200 rounded h-10 w-full"></div>
    </div>
  </div>
);

interface Params {
  courseid: string;
}

interface Course {
  courseId: string;
  courseBanner: string;
  name: string;
  includeVideo?: string;
  level?: string;
  courseOutput?: {
    CourseName?: string;
    Description?: string;
    Duration?: string;
    Level?: string;
    Chapters?: Array<any>; // You can further type this if you know the structure
  };
}

const Course = ({ params }: { params: Params }) => {
  const [course, setCourse] = useState<Course[]>([]);

  useEffect(() => {
    const getCourse = async () => {
      const result = await getCourseById(params.courseid);
      const fixedResult = Array.isArray(result)
        ? result.map((item) => ({
          ...item,
          courseBanner: item.courseBanner ?? "",
          courseOutput: item.courseOutput as Course["courseOutput"] // ensure correct type
        }))
        : [];
      setCourse(fixedResult as Course[]);
    };
    if (params?.courseid) {
      getCourse();
    }
  }, [params]);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {course.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Main Content */}
          <div className="col-span-1 md:col-span-2 space-y-8">
            <CourseBasicInfo Course={course[0]} />
            <CourseDetail Course={course[0]} />
          </div>

          {/* Right Column: Chapter List */}
          <div className="col-span-1">
            <ChapterList Course={course[0]} />
          </div>
        </div>
      ) : (
        <SkeletonLoader />
      )}
    </div>
  )
}

export default Course