import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import logo from '../../../constats'

const Header = () => {
    return (
        <div className='flex justify-between p-5 shadow-sm'>
            <Image src={"https://imgs.search.brave.com/keA2VmLtS4-75p6An8tv5vEB1ycHCtlHhpd-wTiZyeQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/Y29sb3JmdWwtbGV0/dGVyLWdyYWRpZW50/LWxvZ28tZGVzaWdu/XzQ3NDg4OC0yMzA5/LmpwZz9zZW10PWFp/c19oeWJyaWQmdz03/NDA"} alt='logo'
                width={50}
                height={50}>
            </Image>
            <Button>Get Started</Button>
        </div>
    )
}

export default Header