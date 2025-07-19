import { UserButton } from '@clerk/nextjs'
import React from 'react'
import DashboardLayout from './layout'
import AddCourse from '../_components/AddCourse'

const Dashboard = () => {
  return (
    <div>
      <div className='flex '>
        <AddCourse/>
        </div> 
    </div>
  )
}

export default Dashboard