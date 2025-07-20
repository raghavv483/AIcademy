import { UserButton } from '@clerk/nextjs'
import React from 'react'
import DashboardLayout from './layout'
import AddCourse from '../_components/AddCourse'
import UserCourseList from './_components/UserCourseList'

const Dashboard = () => {
  return (
    <div>
      <div className=' '>
        <AddCourse/>
        {/* Display List of Course */}
        <UserCourseList/>
        </div> 
    </div>
  )
}

export default Dashboard