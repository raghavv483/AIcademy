import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Course {
    name: string;
    duration?: string;
    courseBanner?: string;
    // add other fields as needed
}

interface UserCourseListContextType {
    userCourseList: Course[];
    setUserCourseList: React.Dispatch<React.SetStateAction<Course[]>>;
}

export const UserCourseListContext = createContext<UserCourseListContextType | undefined>(undefined);

export const UserCourseListProvider = ({ children }: { children: ReactNode }) => {
    const [userCourseList, setUserCourseList] = useState<Course[]>([]);
    return (
        <UserCourseListContext.Provider value={{ userCourseList, setUserCourseList }}>
            {children}
        </UserCourseListContext.Provider>
    );
};

export const useUserCourseList = () => {
    const context = useContext(UserCourseListContext);
    if (!context) {
        throw new Error('useUserCourseList must be used within a UserCourseListProvider');
    }
    return context;
};