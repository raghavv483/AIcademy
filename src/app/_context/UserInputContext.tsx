import { createContext } from "react";

// Define the course input type
export type CourseInput = {
    topic?:string;
    level?: string;
    duration?: string;
    displayVideo?: string;
    noOfChapters?: string;
    description?:string;
    // add other fields as needed
};

export type UserInputContextType = {
    userCourseInput: CourseInput;
    setUserCourseInput: React.Dispatch<React.SetStateAction<CourseInput>>;
};

export const UserInputContext = createContext<UserInputContextType | null>(null);