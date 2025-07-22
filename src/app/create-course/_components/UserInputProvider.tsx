"use client";
import React, { useState, ReactNode } from 'react';
import { UserInputContext, CourseInput } from '../../_context/UserInputContext';

const UserInputProvider = ({ children }: { children: ReactNode }) => {
    const [userCourseInput, setUserCourseInput] = useState<CourseInput>({});
    return (
        <UserInputContext.Provider value={{ userCourseInput, setUserCourseInput }}>
            {children}
        </UserInputContext.Provider>
    );
};

export default UserInputProvider;