"use client"
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { HiFolderOpen, HiHome, HiOutlineGift, HiOutlineXCircle } from "react-icons/hi";
import { Progress } from "@/components/ui/progress"
const Sidebar = () => {
    const Menu = [
        {
            id: 1,
            name: 'Home',
            icon: <HiHome />,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Explore',
            icon: <HiFolderOpen />,
            path: '/dashboard/explore'
        },
        {
            id: 3,
            name: 'Upgrade',
            icon: <HiOutlineGift />,
            path: '/dashboard/upgrade'
        },
        {
            id: 4,
            name: 'Logout',
            icon: <HiOutlineXCircle />,
            path: '/dashboard/logout'
        },

    ]
    const path = usePathname();
    return (
        <div className='fixed h-full md:w-64 p-5 shadow-md'>
            <Image src={"https://imgs.search.brave.com/keA2VmLtS4-75p6An8tv5vEB1ycHCtlHhpd-wTiZyeQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/Y29sb3JmdWwtbGV0/dGVyLWdyYWRpZW50/LWxvZ28tZGVzaWdu/XzQ3NDg4OC0yMzA5/LmpwZz9zZW10PWFp/c19oeWJyaWQmdz03/NDA"} alt='logo' width={50} height={60}></Image>
            <hr className='my-5'></hr>
            <ul>
                {Menu.map((item) => (
                    <Link href={item.path} key={item.path}>
                        <li
                            className={`flex items-center gap-6 text-gray-500 p-3 cursor-pointer hover:bg-gray-300 hover:text-black rounded ${item.path === path ? 'bg-gray-200 text-black' : ''}`}
                        >
                            <div className="text-3xl">{item.icon}</div>
                            <h2>{item.name}</h2>
                        </li>
                    </Link>
                ))}
            </ul>
            <div className='absolute bottom-20 w-[80%]'>
                <Progress value={33} />
            </div>

        </div>
    )
}

export default Sidebar