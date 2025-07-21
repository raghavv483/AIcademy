"use client"
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const CourseCard = ({ course }: any) => {

  return (
    <Link href={'/course/' + course?.courseId}>
      <div className="bg-violet-50 border border-violet-200 rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 hover:cursor-pointer">
        <Image  alt="Topic Image" src={course.courseBanner} width={300} height={200} className="w-full h-[200px] object-cover" />
        <div className="p-4 flex-1 flex flex-col">
          <h2 className="text-lg font-semibold mb-2 text-violet-700">{course.name}</h2>
          <p className="text-sm text-violet-500 mb-2">Duration: {course.courseOutput.Duration || 'N/A'}</p>
          {/* Add more course info here if available */}
        </div>
      </div>
    </Link>
  );
}

export default CourseCard