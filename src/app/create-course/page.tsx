"use client"
import React, { useContext, useEffect, useState } from 'react'
import { HiOutlineCash, HiOutlineLightBulb } from "react-icons/hi";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import Header from '../dashboard/_components/Header';
import { Button } from '@/components/ui/button';
import SelectCategory from './_components/SelectCategory';
import TopicDescription from './_components/TopicDescription';
import SelectOption from './_components/SelectOption';
import { UserInputContext } from '../_context/UserInputContext';
import { getGroqChatCompletion } from '../_configs/AiModels';
import LoadingDialog from './_components/LoadingDialog';
import { db } from '../_configs/db';
import { CourseList } from '../_configs/Schema';
import { useUser } from '@clerk/nextjs';
import { v4 as uuidv4 } from 'uuid';
import { SaveCourseLayoutInDb } from "./action";
import { useRouter } from 'next/navigation';
const CreateCourse = () => {
  const { user } = useUser();
  const [activeIndex, setActiveIndex] = useState(0)
  const context = useContext(UserInputContext);
  const [loading, setLoading] = useState(false);
  if (!context) throw new Error('UserInputContext.Provider is missing');
  const { userCourseInput, setUserCourseInput } = context;
  const StepperOptions = [
    {
      id: 1,
      name: 'Category',
      icon: <HiOutlineCash />
    },
    {
      id: 2,
      name: 'Topic',
      icon: <HiOutlineLightBulb />
    },
    {
      id: 3,
      name: 'Options',
      icon: <HiOutlineClipboardCheck />
    }
  ]
  const router = useRouter()
  const GenerateCourseLayout = async () => {
    setLoading(true);
    const BASIC_PROMPT = "Generate A Course Tutorial on Following Detail With field Course Name, Description, Along with Chapter Name, about, Duration. "
    const USER_INPUTPROMPT = "Topic: " + userCourseInput?.topic + " , Level: " + userCourseInput?.level + ", Duration: " + userCourseInput?.duration + ", NoOf Chapters: " + userCourseInput?.noOfChapters + " , in JSON format";
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUTPROMPT;
    console.log(FINAL_PROMPT);
    const result = await getGroqChatCompletion(FINAL_PROMPT)
    console.log(result.choices[0].message.content);
    
    const pushedCourseId = await SaveCourseLayoutInDb({
      userCourseInput,
      courseLayout: result.choices[0].message.content,
      user: {
        email: user?.primaryEmailAddress?.emailAddress || "",
        fullName: user?.fullName || "",
        imageUrl: user?.imageUrl || ""
      },
    });
    router.replace("/create-course/" + pushedCourseId)
    setLoading(true); 
  }

  useEffect(() => {

  }, [userCourseInput])
  return (
    <div >
      <Header />
      <div className="flex flex-col items-center justify-center mt-20">
        <h1 className="font-bold text-5xl text-purple-600 mb-12">Create Course</h1>
        <div className="flex items-center w-full max-w-2xl justify-between">
          {StepperOptions.map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center 
                        w-10 h-10 rounded-full text-xl
                        ${activeIndex >= idx
                      ? 'bg-purple-200 text-purple-700'
                      : 'bg-gray-200 text-gray-500'
                    }`}
                >
                  {item.icon}
                </div>
                <span className="mt-2 text-sm font-medium text-gray-800">{item.name}</span>
              </div>
              {/* Draw line unless it's the last step */}
              {idx < StepperOptions.length - 1 && (
                <div className="flex-1 h-1 bg-gray-200 mx-2" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className='px-10 md:px-20 lg:px-44 mt-10 '>
        {/* component */}
        {activeIndex == 0 && <SelectCategory />}
        {activeIndex == 1 && <TopicDescription />}
        {activeIndex == 2 && <SelectOption />}
        {/* Next Previous Button */}
        <div className='flex justify-between mt-10 '>
          <Button disabled={activeIndex == 0} onClick={() => setActiveIndex((activeIndex - 1))}>Previous</Button>
          {activeIndex < 2 && <Button onClick={() => setActiveIndex((activeIndex + 1))}>Next</Button>}
          {activeIndex == 2 && <Button onClick={GenerateCourseLayout}>Generate Course Layout</Button>}

        </div>
      </div>
      <LoadingDialog loading={loading}></LoadingDialog>
    </div>
  )
}

export default CreateCourse