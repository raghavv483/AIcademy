import React, { useContext } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { UserInputContext } from '@/app/_context/UserInputContext';

const SelectOption = () => {
    const context = useContext(UserInputContext);
    if (!context) throw new Error('UserInputContext.Provider is missing');
    const { userCourseInput, setUserCourseInput } = context;
    const handleInputChange = (field: string, value: any) => {
        setUserCourseInput(prev => ({
            ...prev,
            [field]: value
        }))
    }
    return (
        <div className="flex flex-col items-center justify-center w-full h-full py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-purple-700">Difficulty Level</label>
                    <Select
                        defaultValue={userCourseInput?.level}
                        onValueChange={(value) => handleInputChange('level', value)}
                    >
                        <SelectTrigger className="w-full min-w-[180px]">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Begginer">Begginer</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advance">Advance</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-purple-700">Course Duration</label>
                    <Select
                        defaultValue={userCourseInput?.duration}
                        onValueChange={(value) => handleInputChange('duration', value)}>
                        <SelectTrigger className="w-full min-w-[180px]">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1 Hours">1 Hours</SelectItem>
                            <SelectItem value="2 Hours">2 Hours</SelectItem>
                            <SelectItem value="3 Hours">3 Hours</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-purple-700">Add Tutorial Video</label>
                    <Select
                        defaultValue={userCourseInput?.displayVideo}
                        onValueChange={(value) => handleInputChange('displayVideo', value)}>
                        <SelectTrigger className="w-full min-w-[180px]">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-purple-700">No of Chapters</label>
                    <Input
                        className="w-full min-w-[180px]"
                        defaultValue={userCourseInput?.noOfChapters}
                        onChange={(e) => handleInputChange('noOfChapters', e.target.value)}
                        type='number'
                    />
                </div>
            </div>
        </div>
    )
}

export default SelectOption