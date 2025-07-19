import React, { useContext } from 'react'
import {
    Card,
    CardContent,

} from "@/components/ui/card"
import { UserInputContext } from '@/app/_context/UserInputContext'
const SelectCategory = () => {
   
    
    return (
        <div className='px-10 md:px-20'>
            <h2 className='px-55 font-bold my-5 text-violet-600'>Select the Course Category</h2>
            <div className='font-bold flex justify-between px-10 md:px-20 lg:px-54 '>
                <div className='hover:bg-violet-500 cursor-pointer'>
                    <Card>
                        <CardContent>
                            <p>Programming</p>
                        </CardContent>
                    </Card>
                </div>
                <div className='hover:bg-violet-500 cursor-pointer'>
                    <Card>
                        <CardContent>
                            <p>Health</p>
                        </CardContent>
                    </Card>
                </div>
                <div className='hover:bg-violet-500 cursor-pointer'>
                    <Card>
                        <CardContent>
                            <p>Creative</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default SelectCategory