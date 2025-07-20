import React, { useState } from 'react';
import { FaBookOpen, FaClock,FaRegCheckCircle } from 'react-icons/fa';

const ChapterList = ({ Course }: any) => {
    const chapters = Course?.courseOutput?.Chapters || [];
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    return (
        <div className="mt-10">
            <h3 className="text-2xl font-bold mb-6 text-violet-600">Lessons</h3>
            <div className="grid grid-cols-1 gap-6">
                {chapters.map((chapter: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-4 bg-violet-100 rounded-xl p-6 shadow-sm">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-violet-100">
                                <FaBookOpen className="text-violet-600 text-2xl" />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold text-lg text-violet-700 mb-1">Chapter {idx + 1}</div>
                            <div className="text-gray-900 font-semibold mb-1">{chapter.ChapterName}</div>
                            <div className='flex gap-2'>
                                <FaClock className='text-violet-400 mt-3 ' />
                                {chapter.Duration && chapter.Duration && (

                                    <div className="text-gray-600 text-sm mt-2">{chapter.Duration}</div>
                                )}
                            </div>

                            <button
                                className="text-violet-600 underline text-sm mb-1"
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                            >
                                {openIndex === idx ? 'Hide About' : 'Show About'}
                            </button>

                            {openIndex === idx && chapter.About && (
                                <div className="text-gray-600 text-sm mt-2">{chapter.About}</div>
                            )}
                        </div >
             
                    </div>
                    
                ))}
                
            </div>
        </div>
    );
};

export default ChapterList;