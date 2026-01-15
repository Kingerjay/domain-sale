import React from 'react'
import godaddy from '/src/assets/godaddy-img.png'

const footer = () => {
  return (
    <div>
    <section className='w-full border-t-[1px] py-2'>

    <div className='w-[90%]  my-0 mx-auto '>

    <div className='h-[40px] w-fit my-2 mx-auto lg:mx-0 '>
    <img src={godaddy} alt="godaddy" className='w-[60] h-[33px]'/>
    </div>

    <div className='flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:gap-6 gap-2'>
    <p className='text-xs md:text-sm font-thin text-black/80 lg:text-[13px] text-center '>Copyright © 2024 GoDaddy Operating Company, LLC. All Rights Reserved.</p>
    
    <div className='flex items-center gap-6 text-[11px] py-2 font-thin text-black/70 font-mono'>
        <p>Do not share personal information</p>
        <ul><li className='list-disc underline'>Privacy right</li></ul>
    </div>
    </div>

</div>

</section>
    </div>
  )
}

export default footer