import { createContext } from "react";

// Define the context type
export type UserInputContextType = {
    userCourseInput: any[];
    setUserCourseInput: React.Dispatch<React.SetStateAction<any[]>>;
};

export const UserInputContext = createContext<UserInputContextType | null>(null);