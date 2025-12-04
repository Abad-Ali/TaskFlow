import React from 'react'
import Link from 'next/link'
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav>
      <div className='bg-black flex justify-between p-2 items-center gap-3'>

        <div className='flex items-center'>
          <Image className='w-12' src='/logo.png' alt='logo' width={100} height={100}></Image>
          <div className='logo font-black font-serif text-xl md:text-3xl text-red-500 '>
            TaskFlow
          </div>
        </div>
  
        <div className='flex gap-3.5 items-center'>
          <Link href='/login'><button className='md:text-xl text-blue-700 font-bold bg-[#121212] px-3 py-1 rounded-xl hover:cursor-pointer hover:bg-[#121212] border   hover:border-gray-300'>Login</button></Link>
          <Link href='/signup'><button className='md:text-xl text-green-500 font-bold bg-[#121212] px-4 py-1 rounded-full hover:cursor-pointer hover:bg-[#121212]   border hover:border-gray-300'>Signup</button></Link>
          <Link href='https://github.com/Abad-Ali/TaskFlow' target='_blank'>
            <button className='hidden md:inline'>
              <Image className='invert w-10 md:p-1  md:ml-0 mr-2 rounded-full hover:cursor-pointer' src='/github.svg' alt='gitHub' width={100} height={100}></Image>
            </button>
          </Link>
        </div>
      </div>
      <div className='bg-gray-200 pt-[1px] w-full'></div>
    </nav>
  )
}

export default Navbar
