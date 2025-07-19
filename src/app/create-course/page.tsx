import React from 'react'
import { HiOutlineCash, HiOutlineLightBulb } from "react-icons/hi";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import Header from '../dashboard/_components/Header';

const CreateCourse = () => {
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
                        ${
                          idx === 0
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

      
      {/* component */}

      {/* Next Previos Button */}
    </div>
  )
}

export default CreateCourse