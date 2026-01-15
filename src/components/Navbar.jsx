import React from 'react'
import { IoStarSharp } from 'react-icons/io5'
import godaddy from '/src/assets/godaddy-img.png'

const Navbar = () => {
  return (
    <div>
        {/* Header */}
    <div className='w-full'>

    <div className='w-[90%] md:w-[89%] h-[90px] lg:h-[86px] flex justify-between items-center my-0 mx-auto'>
        <div className='grid lg:grid-cols-2 place-items-center lg:place-items-start items-center '>
        <img src={godaddy} alt="godaddy" className='w-[30] h-[33px] md:w-[40] md:h-[39px] '/>
        
        </div>

        <div className='grid place-items-center gap-4 md:gap-2 text-[12px] lg:text-[15px] md:flex'>
            <p className='hover:text-blue-700/70 text-black/70 hover:underline'><a href="https://www.trustpilot.com/review/godaddy.com" target="_blank" rel="noopener noreferrer"><span className='font-semibold'>Excellent </span> <span className='text-xs md:text-sm'>4.6 out of 5</span></a></p>

            <div className='flex '>
            <IoStarSharp className='size-5 text-green-600 mt-[-3px]' />
            <p className='font-semibold text-[12px] lg:text-sm flex items-center gap-4'><a href="https://www.trustpilot.com/review/godaddy.com" target="_blank" rel="noopener noreferrer"> Trustpilot</a></p>
            </div>

        </div>
    </div>

    </div>
    {/* End of Header */}

    </div>
  )
}

export default Navbar