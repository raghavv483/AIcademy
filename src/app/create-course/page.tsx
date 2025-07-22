"use client"
import React, { useContext, useEffect, useState } from 'react'
import { HiOutlineCash, HiOutlineLightBulb } from "react-icons/hi";
import { HiOutlineClipboardCheck, HiCheck } from "react-icons/hi";
import Header from '../dashboard/_components/Header';
import { Button } from '@/components/ui/button';
import SelectCategory from './_components/SelectCategory';
import TopicDescription from './_components/TopicDescription';
import SelectOption from './_components/SelectOption';
import { UserInputContext } from '../_context/UserInputContext';
import { getGroqChatCompletion } from '../_configs/AiModels';
import LoadingDialog from './_components/LoadingDialog';
import { SaveCourseLayoutInDb } from "./action";
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

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

const CreateCourse = () => {
  const { user } = useUser();
  const [activeIndex, setActiveIndex] = useState(0)
  const context = useContext(UserInputContext);
  const [loading, setLoading] = useState(false);
  if (!context) throw new Error('UserInputContext.Provider is missing');
  const { userCourseInput } = context;
  const router = useRouter()

  const GenerateCourseLayout = async () => {
    setLoading(true);
    const BASIC_PROMPT = "Generate A Course Tutorial on Following Detail With field Course Name, Description, Along with Chapter Name, about, Duration. "
    const USER_INPUTPROMPT = "Topic: " + userCourseInput?.topic + " , Level: " + userCourseInput?.level + ", Duration: " + userCourseInput?.duration + ", NoOf Chapters: " + userCourseInput?.noOfChapters + " , in JSON format";
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUTPROMPT;
    console.log(FINAL_PROMPT);
    const result = await getGroqChatCompletion(FINAL_PROMPT)
    //console.log(result.choices[0].message.content);

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
    setLoading(false);
  }

  useEffect(() => { }, [userCourseInput])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <Header />
      <div className="flex flex-col items-center justify-center mt-12 px-4">
        <h1 className="font-extrabold text-4xl md:text-5xl text-purple-700 mb-10 text-center drop-shadow-lg">Create Course</h1>
        {/* Stepper */}
        <div className="flex items-center w-full max-w-2xl justify-between relative mb-8">
          {StepperOptions.map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center z-10">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full text-2xl border-4 transition-all duration-300
                    ${activeIndex > idx
                      ? 'bg-purple-600 border-purple-600 text-white shadow-lg'
                      : activeIndex === idx
                        ? 'bg-white border-purple-400 text-purple-700 shadow-md'
                        : 'bg-gray-100 border-gray-200 text-gray-400'}
                  `}
                >
                  {activeIndex > idx ? <HiCheck className="text-white" /> : item.icon}
                </div>
                <span className={`mt-2 text-xs md:text-sm font-semibold transition-colors duration-300 ${activeIndex >= idx ? 'text-purple-700' : 'text-gray-400'}`}>{item.name}</span>
              </div>
              {/* Progress line */}
              {idx < StepperOptions.length - 1 && (
                <div className="flex-1 h-1 mx-1 md:mx-2 relative">
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 rounded-full -translate-y-1/2" />
                  <div
                    className={`absolute top-1/2 left-0 h-1 rounded-full -translate-y-1/2 transition-all duration-300
                      ${activeIndex > idx
                        ? 'bg-purple-600 w-full'
                        : activeIndex === idx
                          ? 'bg-purple-400 w-1/2'
                          : 'bg-gray-200 w-0'}
                    `}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className='w-full max-w-3xl mx-auto px-4 md:px-8 lg:px-16 mt-8 mb-16'>
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 min-h-[320px] flex flex-col gap-6">
          {/* component */}
          {activeIndex === 0 && <SelectCategory />}
          {activeIndex === 1 && <TopicDescription />}
          {activeIndex === 2 && <SelectOption />}
          {/* Next Previous Button */}
          <div className='flex flex-col md:flex-row justify-between gap-4 mt-8'>
            <Button
              variant="outline"
              className="w-full md:w-auto border-purple-400 text-purple-700 hover:bg-purple-50"
              disabled={activeIndex === 0}
              onClick={() => setActiveIndex((activeIndex - 1))}
            >
              Previous
            </Button>
            {activeIndex < 2 && (
              <Button
                className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-md"
                onClick={() => setActiveIndex((activeIndex + 1))}
              >
                Next
              </Button>
            )}
            {activeIndex === 2 && (
              <Button
                className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold shadow-lg"
                onClick={GenerateCourseLayout}
              >
                Generate Course Layout
              </Button>
            )}
          </div>
        </div>
      </div>
      <LoadingDialog loading={loading}></LoadingDialog>
    </div>
  )
}

export default CreateCourse