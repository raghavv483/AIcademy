import { db } from '@/app/_configs/db';
import { CourseList } from '@/app/_configs/Schema';
import { Button } from '@/components/ui/button';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { UpdateCourseImage, UpdateVideoId } from '../../action';
import { GenerateChapterContent_AI } from '@/app/_configs/AiModels';
import LoadingDialog from '../../_components/LoadingDialog';
import axios from 'axios'
// @ts-ignore
import getVideos from '../../api/get-videos';
import { useRouter } from 'next/navigation';

const CourseBasicInfo = ({ Course }: any) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const courseOutput = Course?.courseOutput;
    const [selectedFile, setselectedFile] = useState<string>()
        useEffect(()=>{
            if(Course){
                setselectedFile(Course?.courseBanner)
            }
            
        },[Course])
    const handlefiles = async (event: { target: { files: any; }; }) => {
        const files = event.target.files[0];
        if (!files) {
            console.log("error upload file");
            return;
        }

        const formData = new FormData();
        formData.append('file', files);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error('Upload failed:', errorData.error);
                return;
            }

            const data = await res.json();
            setselectedFile(data.url);
            await UpdateCourseImage({ courseId: Course?.courseId, imageUrl: data.url })
        } catch (err) {
            console.error('Network or server error:', err);
        }
    };
    const GenerateChapterContent = async () => {
        const chapters = Course?.courseOutput?.Chapters;
        if (!Array.isArray(chapters)) return;
        chapters.forEach(async (chapter: any, index: number) => {
            const PROMPT = `Explain the concept in Detail on Topic: ${Course.courseOutput.CourseName}, Chapter: ${chapter.ChapterName}, in JSON Format with list of array with field as title, description in detail, Code Example <precode> if applicable`;
            if (index < 3) {
                setLoading(true)
                try {
                    let videoId = ""
                    const content = await GenerateChapterContent_AI(PROMPT)
                    //console.log(result.choices[0].message.content);
                    const result = content.choices[0].message.content
                    // generate video url
                    const query = `${courseOutput.CourseName}:${chapter.ChapterName}`;
                    const response = await axios.get(`/api/get-videos?q=${encodeURIComponent(query)}`)
                    videoId = response.data[0]?.id?.videoId

                    await UpdateVideoId({ content: result, videoId, courseId: Course?.courseId, chapterId: index });

                    //save chaptercontent+video url
                    setLoading(false)
                } catch (error) {
                    setLoading(false)
                    console.log("error in fetching chapter content");
                }
                router.replace('/create-course/' + Course?.courseId + "/finish")
            }
        });

    };
    return (
        <>
            <div className="flex flex-col md:flex-row items-stretch gap-8 mt-10 w-full">
                {/* Left: Course Info */}
                <div className="flex-1 bg-white rounded-2xl shadow-lg p-10 flex flex-col justify-center min-h-[320px]">
                    <h2 className="text-4xl font-extrabold mb-4 text-violet-600">
                        {courseOutput?.CourseName || Course?.name}
                    </h2>
                    <p className="text-lg text-gray-700 mb-6">
                        {courseOutput?.Description}
                    </p>
                    <Button onClick={GenerateChapterContent} className="w-11/12 max-w-md text-lg py-3 bg-violet-600 hover:bg-violet-700 text-white">Start</Button>
                </div>

                {/* Right: Icon/Visual */}
                <div className="flex-1 flex items-center justify-center">
                    <label htmlFor="upload" className="flex-1 h-full cursor-pointer flex items-center justify-center">
                        <div className="flex-1 bg-blue-100 rounded-2xl flex items-center justify-center min-h-[320px] p-10 cursor-pointer relative">
                            {selectedFile ? (
                                <>
                                    <img src={selectedFile} alt="Preview" className="max-h-full max-w-full object-cover rounded-2xl " />
                                    <Button
                                        type="button"
                                        onClick={e => {
                                            e.stopPropagation();
                                            setselectedFile(undefined);
                                        }}
                                        className="absolute top-4 right-4 bg-white rounded-full p-1 shadow hover:bg-gray-200"
                                        aria-label="Remove image"
                                    >
                                        <span className="text-xl font-bold text-gray-600">&times;</span>
                                    </Button>
                                </>
                            ) : (
                                <FaCloudUploadAlt className="text-5xl text-blue-500" />
                            )}
                        </div>
                        <input
                            className="opacity-0 absolute w-0 h-0"
                            type="file"
                            id="upload"
                            tabIndex={-1}
                            onChange={handlefiles}
                        />
                    </label>
                </div>
                <LoadingDialog loading={loading} />
            </div>
            {/* Fixed Start Button at the bottom */}

        </>
    );
};

export default CourseBasicInfo;


