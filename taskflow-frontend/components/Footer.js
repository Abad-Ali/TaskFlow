import React from 'react'

const Footer = () => {
  return (
    <div>
        <div className='bg-gray-200 pt-[1px] w-full'></div>
        <div className='bg-black text-gray-400 flex flex-col justify-center items-center p-7'>
          <p>© 2025 <span className='text-red-500 font-bold font-serif'>TaskFlow</span>. All rights reserved.</p>
          <p>Your productivity partner.Organize smarter. Work better</p>
          <p>Privacy Policy | Terms of Service | <a href='https://github.com/Abad-Ali' target='_blank'>Contact Us</a></p>
        </div>
    </div>
  )
}

export default Footer
