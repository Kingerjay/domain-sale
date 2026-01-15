import React, { useState } from 'react'
import img1 from '/src/assets/secure-image.svg'
import img2 from '/src/assets/fast-image.svg'
import img3 from '/src/assets/hassle-free-payments.svg'
import TransactionBox from './TransactionBox'
import Footer from './Footer'


function HomeSection() {
        const [openModal, setOpenModal] = useState(false)

  return (
    <div>
     {/* Body */}
    <div className='w-full '>

    {/* Domain name section */}
    <div className='w-full h-[300px] md:h-[400px] lg:h-[320px] bg-[#00112c] mb-4 lg:py-14 py-7'>

        <div className='w-[88%] lg:w-[85%] my-0 mx-auto py-4 flex flex-col gap-4'>
            <p className='text-white text-[20px] md:text-[30px] font-semibold'>The domain name</p>
            <p className='domain-name text-white text-[30px] md:text-[42px] lg:text-[42px] xl:text-[52px] font-semibold my-[-10px] lg:my-[-1.5rem]'>AtlantaRealEstate.com</p>
            <p className='text-white text-[20px] md:text-[30px] font-semibold'>is for sale!</p>
        </div>
        
    </div>
    {/* End of Domain name section */}

    {/* Transaction Box */}
    <TransactionBox />
    {/* End of Transaction Box */}
    

    {/* Image and Text */}
    <section className='w-full flex justify-center items-center border-t lg:border-none lg:w-[57%] xl:w-[60%] lg:pl-[2rem]  py-8 lg:pb-12'>

    <div className=' flex flex-col lg:flex-row gap-6 lg:gap-6 xl:gap-16 items-center lg:items-start justify-center'>
        {/* Card 1 */}
        <div className='w-full lg:w-auto flex lg:flex-col items-center lg:items-start gap-4 lg:gap-2'>
            <img src={img1} alt="Safe & secure transactions" className='w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] flex-shrink-0' />
            <p className='text-center lg:text-left lg:whitespace-nowrap'>
                Safe & secure<br className='lg:hidden'/> transactions
            </p>
        </div>
        {/* End of Card 1 */}

        {/* Card 2 */}
        <div className=' w-full lg:w-auto flex lg:flex-col items-center lg:items-start gap-2 lg:gap-2'>
            <img src={img2} alt="Fast & easy Transfers" className='w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] flex-shrink-0' />
            <p className='text-center lg:text-left'>Fast & easy transfers</p>
        </div>
        {/* End of Card 2 */}

        {/* Card 3 */}
        <div className='w-full lg:w-auto flex lg:flex-col items-center lg:items-start gap-4 lg:gap-2'>
            <img src={img3} alt="Hassle free payment" className='w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] flex-shrink-0' />
            <p className='text-center lg:text-left'>Hassle free payments</p>
        </div>
        {/* End of Card 3 */}
    </div>

</section>
    {/* End of Image and Text */}

    <div className='w-full border-t lg:border-none py-8'>
        <div className='w-[70%] mx-auto my-0 lg:w-[51%] lg:border-t lg:ml-[5rem] lg:py-8 lg:pl-[1rem] space-y-4'>
        <p className='font-semibold text-lg'>The simple, and safe way to buy domain names</p>
        <p className=''>No matter what kind of domain you want to buy or lease, we make the transfer simple and safe.</p>
        <p onClick={() => setOpenModal(true)}
        className='w-fit my-3 py-2 font-semibold hover:bg-gray-200 hover:rounded-md pr-4 cursor-pointer'>Here's how it works </p>
        </div>
    </div>

    {/* Open Modal */}
    {openModal && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center z-50">
          {/* Modal Box */}
          <div className="bg-white w-[90%] md:w-[600px] lg:w-[700px] max-h-[95vh] rounded-xl shadow-xl p-8 relative">
            
            {/* Close Button */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute right-0 top-0 text-2xl md:text-4xl font-medium text-gray-600 hover:bg-gray-200 w-11 h-11 flex items-center justify-center rounded-md"
            >
              ×
            </button>

            {/* Header */}
            <h2 className="text-xl md:text-3xl font-bold mb-6">Here's how it works</h2>

            {/* Sections */}
            <div className="space-y-4 md:space-y-6">

            <div>
                <p className="text-lg md:text-xl font-semibold">Safe & secure transactions</p>
                <p className='text-black/80 text-sm md:text-base'>
                  We strictly monitor all transactions. If the seller doesn't deliver per
                  the agreement, we will refund you within 24 hours.
                </p>
              </div>

              <div>
                <p className="text-lg md:text-xl font-semibold">Fast and easy transfers</p>
                <p className='text-black/80 text-sm md:text-base'>
                  Our transfer process is automated, fast and risk-free, so you can be up
                  and running quickly. Moving your domain happens mostly in the background,
                  leaving you more time to work on your next big thing.
                </p>
              </div>

              <div>
                <p className="text-lg md:text-xl font-semibold">Hassle free payments</p>
                <p className='text-black/80 text-sm md:text-base'>
                  GoDaddy makes payment swift and secure by accepting multiple payment
                  methods, including credit/debit/prepaid cards, bank transfer, online
                  banking, PayPal*, electronic check (ACH)*, Klarna, and eWallets*.
                </p>
              </div>

              <p className="text-sm font-thin">
                *where supported, **US bank account required.
              </p>
            </div>
          </div>
        </div>
      )}
    
    </div>
    {/* End of Body */}

    {/* Footer Section */}
    <Footer />
    {/* End of Footer Section */}



    </div>
  )
}

export default HomeSection

