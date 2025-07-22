import React from 'react'
import AddCourse from '../_components/AddCourse'
import UserCourseList from './_components/UserCourseList'

const Dashboard = () => {
  return (
    <div>
      <div className=' '>
        <AddCourse />
        {/* Display List of Course */}
        <UserCourseList />
      </div>
    </div>
  )
}

export default Dashboard