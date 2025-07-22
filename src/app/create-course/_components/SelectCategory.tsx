import React, { useContext } from 'react'
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { UserInputContext } from '@/app/_context/UserInputContext'

const categories = [
    { label: 'Programming' },
    { label: 'Health' },
    { label: 'Creative' },
];

const SelectCategory = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-8 py-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-purple-700 text-center mb-2 drop-shadow-sm">
                Select the Course Category
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
                {categories.map((cat) => (
                    <div
                        key={cat.label}
                        className="transition-all duration-200 cursor-pointer w-48 sm:w-44 md:w-56"
                    >
                        <Card className="border-2 border-purple-200 hover:border-purple-600 shadow-md hover:shadow-xl bg-white hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-200">
                            <CardContent className="flex items-center justify-center h-20 md:h-24">
                                <span className="text-lg md:text-xl font-bold text-gray-800 group-hover:text-purple-700 text-center w-full">
                                    {cat.label}
                                </span>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectCategory