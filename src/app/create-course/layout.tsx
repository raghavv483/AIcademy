"use client"
import React, { ReactNode, useState } from 'react'
import { UserInputContext, CourseInput } from '../_context/UserInputContext'

const layout = ({ children }: { children: ReactNode }) => {
    const [userCourseInput, setUserCourseInput] = useState<CourseInput>({});
    return (
        <div>
            <UserInputContext.Provider value={{ userCourseInput, setUserCourseInput }}>
                {children}
            </UserInputContext.Provider>
        </div>
    )
}

export default layout