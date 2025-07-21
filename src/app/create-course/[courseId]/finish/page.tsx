"use client"
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import { GetCourse, GetCourseContent } from '../../action';
import ChapterContent from './_components/ChapterContent';
import { Menu } from 'lucide-react';
import Header from '@/app/_components/Header';

const FinalContentPage = ({ params }: any) => {
    const { user } = useUser();
    const [courseData, setCourseData] = useState<any>(null);
    const [courseContentData, setcourseContentData] = useState<any>(null)
    const [activeIndex, setActiveIndex] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (params && user) {
            fetchCourse();
            fetchCourseContent();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, user]);

    const fetchCourse = async () => {
        if (!user?.fullName || !params?.courseId) return;
        try {
            const result = await GetCourse(params.courseId, user.fullName);
            setCourseData(result[0]);
        } catch (error) {
            console.error('Error fetching course:', error);
        }
    }

    const fetchCourseContent = async () => {
        if (!user?.fullName || !params?.courseId) return;
        try {
            const result: Array<{ chapterId: number }> = await GetCourseContent(params.courseId);
            if (Array.isArray(result)) {
                const sortedChapters = result.sort((a, b) => a.chapterId - b.chapterId);
                setcourseContentData(sortedChapters);
            } else {
                setcourseContentData([]);
            }
        } catch (error) {
            console.error('Error fetching course content:', error);
        }
    }

    if (!courseData) {
        return (
            <div>
                <Header />
                <div className="flex">
                    <div className="w-80 h-screen bg-slate-200 animate-pulse"></div>
                    <div className="flex-1 h-screen bg-slate-100 animate-pulse"></div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header />
            <div className='flex'>
                {/* Mobile Menu Button - positioned relative to the content area */}
                <button
                    className="md:hidden p-2 m-2 absolute top-16 left-2 z-20 bg-violet-600 text-white rounded-full"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <Menu size={24} />
                </button>

                {/* Sidebar */}
                <div className={`w-80 h-screen border-r overflow-y-auto shadow-sm transition-transform transform 
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                    fixed md:relative md:translate-x-0 bg-white z-10`}
                >
                    <div className="p-4 bg-violet-600 text-white text-center">
                        <h2 className="text-xl font-bold">{courseData.courseOutput.CourseName}</h2>
                    </div>
                    <div className="p-4">
                        {courseData?.courseOutput?.Chapters.map((chapter: any, index: number) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setActiveIndex(index);
                                    setIsSidebarOpen(false); // Close sidebar on selection
                                }}
                                className={`flex items-center gap-3 p-3 my-1.5 cursor-pointer rounded-lg transition-all
                                    ${activeIndex === index ? 'bg-violet-200 text-violet-800 font-semibold' : 'hover:bg-gray-100'}`}
                            >
                                <span className={`flex items-center justify-center h-8 w-8 rounded-full text-white ${activeIndex === index ? 'bg-violet-600' : 'bg-gray-400'}`}>
                                    {index + 1}
                                </span>
                                <div className="flex-1">
                                    <span className="block text-sm">{chapter.ChapterName}</span>
                                    <span className="text-xs text-gray-500">{chapter.Duration}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 h-screen overflow-y-auto">
                    <ChapterContent courseData={courseData} courseContentData={courseContentData} activeIndex={activeIndex} />
                </div>
            </div>
        </div>
    )
}
export default FinalContentPage