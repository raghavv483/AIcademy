import React, { useContext } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { UserInputContext } from '@/app/_context/UserInputContext';
const TopicDescription = () => {
    const context = useContext(UserInputContext);
    if (!context) throw new Error('UserInputContext.Provider is missing');
    const { userCourseInput, setUserCourseInput } = context;
    const handleInputChange = (fieldname: any, value: any) => {
        setUserCourseInput(prev => ({
            ...prev,
            [fieldname]: value
        }))
    }
    return (
        <div className='md:mx-20 lg:mx-44'>
            <div className='py-9'>
                <label className='font-bold'>Write the topic for which you want to generate a course(eg, Python Course,Yoga,etc):</label>
                <Input 
                defaultValue={userCourseInput?.topic}
                onChange={(e) => { handleInputChange('topic', e.target.value) }} type='topic' placeholder='Add Topic' />
            </div>
            <div>
                <Textarea
                defaultValue={userCourseInput?.description}
                onChange={(e) => handleInputChange('description', e.target.value)} placeholder='Please give description of your topic' />
            </div>

        </div>

    )
}

export default TopicDescription