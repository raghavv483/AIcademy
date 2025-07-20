"use client"
import { ReactNode } from 'react';
import Sidebar from './_components/Sidebar';
import { UserButton } from '@clerk/nextjs';
import Header from './_components/Header';
import { UserCourseListProvider } from '../_context/UserCourseListContext';

function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <UserCourseListProvider>
            <div>
                <div className='md:w-64 hidden md:block'>
                    <Sidebar />
                </div>
                <div className='md:ml-64'>
                    <Header />
                    <div className='p-5 '>
                        {children}
                    </div>
                </div>
            </div>
        </UserCourseListProvider>
    )
}
export default DashboardLayout