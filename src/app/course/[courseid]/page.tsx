"use client";
import React, { useEffect, useState } from "react";
import { getCourseById } from "../action";

import CourseBasicInfo from "@/app/create-course/[courseId]/_components/CourseBasicInfo";
import CourseDetail from "@/app/create-course/[courseId]/_components/CourseDetail";
import ChapterList from "@/app/create-course/[courseId]/_components/ChapterList";

const SkeletonLoader = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
    {/* ...Skeleton content... */}
  </div>
);

interface CourseOutput {
  CourseName?: string;
  Description?: string;
  Duration?: string;
  Level?: string;
  Chapters?: Array<any>;
}

interface Course {
  courseId: string;
  courseBanner: string;
  name: string;
  includeVideo?: string;
  level?: string;
  courseOutput?: CourseOutput;
}


export default function CoursePage({
  params,
}: {
  params: { courseid: string };
}) {
  const [course, setCourse] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const result = await getCourseById(params.courseid);
        const fixedResult = Array.isArray(result)
          ? result.map((item) => ({
              ...item,
              courseBanner: item.courseBanner ?? "",
              courseOutput: item.courseOutput as CourseOutput,
            }))
          : [];
        setCourse(fixedResult);
      } catch (error) {
        console.error("Error fetching course:", error);
        setCourse([]);
      }
    };

    if (params?.courseid) {
      fetchCourse();
    }
  }, [params.courseid]);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {course.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <CourseBasicInfo Course={course[0]} />
            <CourseDetail Course={course[0]} />
          </div>
          <div className="col-span-1">
            <ChapterList Course={course[0]} />
          </div>
        </div>
      ) : (
        <SkeletonLoader />
      )}
    </div>
  );
}
