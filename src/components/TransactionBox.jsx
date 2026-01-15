import React, { useState } from 'react'
import paymentLogos from '/src/assets/payment-logo.png'
import { IoDiamondOutline} from "react-icons/io5";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoCheckmarkOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const TransactionBox = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate('/cart/checkout=176573365&tmskey=columbusrealestate.com');
    }, 2500);
  };

  return (
    <div>
        {/* Transaction Section */}
    <div className='w-full h-[400px] lg:h-fit relative'>
    <div className=' absolutee w-[90%] h-fit lg:w-[400px] bg-white absolute top-[15rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg lg:left-[77.5%] top-[7rem] lg:top-[-0.7rem]'>

    {/* Top Text */}
    <div className='p-4 flex flex-col gap-4'>
        <p className='text-[25px] font-semibold'>Get this domain</p>

        <div className='flex items-center gap-3'>
        <p className='w-fit text-[12px] font-medium py-1 px-2 rounded-md bg-[#d3c1f7] flex items-center gap-0.5'><IoDiamondOutline /> PREMIUM </p>
        <p className='w-fit text-[12px] font-medium py-1 px-2 rounded-md bg-[#a6fff8] flex items-center gap-0.5'><IoCheckmarkCircleOutline /> VERIFIED DOMAIN</p>
        </div>

        <p>Own it today for $ 499 and make it yours.</p>

    </div>
    {/* ENd of Top Text */}


    {/* Buy now */}
    <section className='w-full h-[70px] bg-[#f5f5f5] border-[1px] border-gray-200 flex items-center '>

        <div className='w-[90%] my-0 mx-auto flex items-center justify-between'>
        <div className='flex items-center gap-2'>
        <input type="radio" className='custom-eye-radio'/>
        <p className='text-[16px] font-semibold '>Buy now</p>
        </div>
        

        <p className='text-[17px] font-semibold text-[#00a4a6]'>USD $499</p>
        </div>

    </section>
    {/* End of Buy now */}

    {/* Loading Card */}
    {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center rounded-md bg-white/80 ">
          <div className="absolutee relative py-4 px-8 bg-white shadow-3xl rounded-lg ">
            
            {/* The spinner */}
            <div 
          className="w-8 h-8 border-4 border-gray-200 border-t-teal-500 rounded-full animate-spin"
        ></div>
            <p className="text-sm text-gray-800 mt-2">
              Processing...
            </p>
          </div>
        </div>
      )}
      {/* End of Loading Card */}

    {/* Next Button */}
      <div className="w-full  mx-auto border-b-[1px] border-b-gray-200 p-4 ">
        <button
          onClick={handleNext}
          disabled={isLoading}
          className="w-full py-4 bg-black text-white rounded hover:bg-opacity-80 transition duration-300"
        >
          Next
        </button>
      </div>
    {/* End of Next Button */}

    {/* Bottom Text */}
    <section className='w-full my-4'>
        <div className='w-[95%] my-0 mx-auto flex flex-col gap-2 text-black/80'>
            <p className='flex items-center gap-2'><IoCheckmarkOutline className='size-5'/>Free transaction support</p>
            <p className='flex items-center gap-2'><IoCheckmarkOutline className='size-5'/>Secure payments</p>
            <p className='flex items-center gap-2'><IoCheckmarkOutline className='size-5'/>Local currency available in cart at checkout</p>
        </div>
    </section>
    {/* End of Bottom Text */}

    {/* Apple Images */}
    <div className='w-full flex justify-center items-center my-2'>
    <img src={paymentLogos} alt="" className='w-[90%]' />
    </div>
    {/* End of Apple Images */}

    </div>
    </div>
    {/* End of Transaction Section */}
    </div>
  )
}

export default TransactionBox