import React from 'react';
import { FaChartBar, FaClock, FaVideo, FaListOl } from 'react-icons/fa';

const CourseDetail = ({ Course }: any) => {
    const courseOutput = Course?.courseOutput;
    return (
        <div className="border rounded-xl shadow-sm p-8 mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {/* Skill Level */}
                <div className="flex items-center gap-3">
                    <FaChartBar className="text-violet-600 text-3xl" />
                    <div>
                        <span className="text-gray-500 text-sm">Skill Level</span>
                        <div className="font-bold text-lg text-black">{courseOutput?.Level || Course?.level}</div>
                    </div>
                </div>
                {/* Duration */}
                <div className="flex items-center gap-3">
                    <FaClock className="text-violet-600 text-3xl" />
                    <div>
                        <span className="text-gray-500 text-sm">Duration</span>
                        <div className="font-bold text-lg text-black">{courseOutput?.Duration}</div>
                    </div>
                </div>
                {/* Include Video */}
                <div className="flex items-center gap-3">
                    <FaVideo className="text-violet-600 text-3xl" />
                    <div>
                        <span className="text-gray-500 text-sm">Include Video</span>
                        <div className="font-bold text-lg text-black">{Course?.includeVideo}</div>
                    </div>
                </div>
                {/* No of Chapters */}
                <div className="flex items-center gap-3">
                    <FaListOl className="text-violet-600 text-3xl" />
                    <div>
                        <span className="text-gray-500 text-sm">No of Chapters</span>
                        <div className="font-bold text-lg text-black">{courseOutput?.NoOfChapters}</div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default CourseDetail;