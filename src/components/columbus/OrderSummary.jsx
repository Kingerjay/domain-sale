/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import starImg from "/src/assets/star-rating.png"
import trustImg from "/src/assets/trustImg.png"

// eslint-disable-next-line react/prop-types
const OrderSummary = ({ isPaymentComplete, onCompletePayment }) => {
   const [openModal, setOpenModal] = useState(false);
   const [payModal, setPayModal] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [showWarning, setShowWarning] = useState(false);

   const handleNext = () => {
    if (!isPaymentComplete) {
      setShowWarning(true);
      
      // Hide warning after 2 seconds
      setTimeout(() => {
        setShowWarning(false);
      }, 2000);
      
      return;
    }
    onCompletePayment();
    setIsLoading(true);
    
    setTimeout(() => {
      setPayModal(true);
      setIsLoading(false);
    }, 3000);
  };

  // Add this useEffect to handle redirect
  useEffect(() => {
    if (payModal) {
      const redirectTimer = setTimeout(() => {
        window.location.replace("https://www.godaddy.com");
      }, 9000);
  
      return () => clearTimeout(redirectTimer);
    }
  }, [payModal]);


  return (
    <div>
    <div className="w-full lg:w-[400px] bg-[#f7f7f7] rounded-lg p-4 md:p-6 text-sm mb-4 lg:mb-8">
      
      {/* Header */}
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      {/* Items row */}
      <div className="flex justify-between items-center mb-3">
        <p className="">1 items</p>
        <button className="text-[16px] font-semibold font-mono">ColumbusRealEstate.com</button>
      </div>

      <hr className="mb-4" />

      {/* Disclaimer */}
      <p onClick={() => setOpenModal(true)}
      className="underline font-medium mb-4 cursor-pointer">
        View offer disclaimers
      </p>

      {/* Open Modal */}
    {openModal && (
        <div onClick={() => setOpenModal(false)}
        className="fixed inset-0 bg-white/80 flex justify-center items-center z-50">
          {/* Modal Box */}
          <div onClick={(e) => e.stopPropagation()}
          className="bg-white w-[90%]  max-h-[95vh] rounded-xl border border-gray-100 shadow-2xl absolutee p-4 relative">
            
            {/* Close Button */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute right-0 top-0 text-2xl md:text-4xl font-medium text-gray-600 hover:bg-gray-200 w-11 h-11 flex items-center justify-center rounded-md"
            >
              ×
            </button>

            <div className="w-full mx-auto p-4 md:p-8">
        <h1 className="text-2xl font-semibold mb-6">Disclaimers</h1>
        <div className="h-72 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scrollbar-hide md:h-full md:overflow-y-visible">
        <ul className="list-disc space-y-4 pl-5 ">
          <li>
            Plus an ICANN fee of **$0.20 per year** for certain TLDs. Some TLDs and ccTLDs require a minimum registration period of more than one year.
          </li>
          <li>
            Discounts do not apply to ICANN fees, taxes, transfers, premium domains, premium templates, Search Engine Visibility advertising budgets, gift cards, Priority Pre-registration fees, Trademark Holder fees, or pre-registration fees. May not be used in conjunction with any other offer, discount, or promotion. After the initial purchase term, discounted products will renew at the then-current renewal price. This offer is valid only for new product purchases and cannot be used for product renewals.
          </li>
          <li>
            Private registration will be renewed at the normal renewal rate.
          </li>
          <li>
            Savings are based on GoDaddy's regular pricing.
          </li>
          <li>
            Annual discounts apply to NEW purchases only.
          </li>
          <li>
            Special offer valid for the specified offer term for one new domain or domain transfer per customer. After the purchase term, additional years or domains can be purchased at the standard or then-current rate. Discounted offers cannot be used in conjunction with any other offer or promotion. This offer is not valid for all payment methods. Accepted payment methods are visible during checkout. Your discount will be applied to your shopping cart. After the initial purchase term, discounted products will renew at the then-current renewal rate. GoDaddy reserves the right to refuse the use of this offer and/or cancel domains purchased using this offer if this offer has been abused, as determined by and at GoDaddy's sole discretion.
          </li>
          <li>
            The number of criminal domain theft attempts is calculated by combining the number of transfer disputes and other claims related to domain theft handled by the GoDaddy DCAST team, and the total number of registered domains. The number of registered domains is provided by Verisign Industry.
          </li>
        </ul>
        </div>
      </div>         
          </div>
        </div>
      )}

      {/* Price breakdown */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p className="font-mono">$499.00</p>
        </div>

        <div className="flex justify-between">
          <p className="">VAT and Fees</p>
          <p className="font-mono">$1.94</p>
        </div>
      </div>

      <hr className="mb-4" />

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-lg font-semibold">Total (USD)</p>
        <p className="text-xl font-semibold text-teal-700">$<span className="font-mono">500.94</span></p>
      </div>

      {/* Loading Card */}
    {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 ">
          <div className="absolutee relative py-4 px-8 bg-white shadow-3xl rounded-md ">
            
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

      {/* Warning Message */}
        {showWarning && (
          <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-md animate-pulse">
            <p className="text-red-600 text-sm font-semibold text-center">
              ⚠️ Please complete payment method and billing information first.
            </p>
          </div>
        )}

      {/* CTA */}
      <button 
      onClick={handleNext}
      className="w-full py-4 bg-black text-white font-semibold rounded hover:bg-opacity-80 mb-4 transition duration-300">
        Complete Purchase
      </button>

      {payModal && (
        <div className="fixed inset-0 bg-white/80 flex justify-center items-center z-50">
          {/* Modal Box */}
          <div className="bg-white w-[90%] md:w-[400px] space-y-2  max-h-[95vh] rounded-xl border border-gray-100 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] p-4 relative">

          <p className="text-red-600 font-semibold">The domain name you selected is no longer available.</p>
          <p>Another interested party completed their purchase just moments before you did.</p>
          <p className="font-semibold">Your card has not been charged.</p>
          <p>You will be redirected to the homepage to explore other similar domain names.</p>

        </div>
        </div>
      )}

      {/* Disclaimer text */}
      <p className="text-[11px] leading-relaxed text-gray-700">
        By clicking "Complete Purchase", you agree to our{" "}
        <span className="underline cursor-pointer">Terms & Conditions</span> and{" "}
        <span className="underline cursor-pointer">Privacy Policy</span>, and
        consent to enroll your product(s) in our automatic renewal service,
        which can be canceled at any time in the Renewals and Billing page in
        your account. Automatic renewals are billed to the payment method
        selected for this order or your backup/alternate payment method(s),
        until canceled. Your payment details will be saved as an alternate
        payment method for future purchases and subscription renewals. Your
        payment is being processed in: United States.<br/>
        <span className="font-semibold">An account will be created with your email to receive the domain name.</span>
      </p>

    </div>


      {/* Star Rating */}
      <div className="flex flex-col items-center justify-center my-8 gap-1.5">
        <div className="flex gap-1">
          <img src={starImg} alt="" className="h-5"/> 
          <p className="text-sm pt-[3px]"><span className="font-semibold">4.5</span> out of 5.</p>
        </div>
        <div className="flex gap-0.5">
          <p className="text-sm">View all 128,938 reviews on</p>
          <a href="https://www.trustpilot.com/review/godaddy.com" target="_blank" rel="noopener noreferrer"><img src={trustImg} alt="" className="h-5 mt-[-2px]" />
          </a>
        </div>
      </div>
      {/* End of  Star Rating */}

    </div>

  );
};

export default OrderSummary;
