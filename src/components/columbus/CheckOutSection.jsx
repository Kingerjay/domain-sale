import React, { useEffect, useState } from 'react'
import PaymentMethod from './PaymentMethod'
import OrderSummary from './OrderSummary'
import OrderHistory from './OrderHistory';

const CheckOutSection = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [savedCardData, setSavedCardData] = useState(null);
    const [savedBillingData, setSavedBillingData] = useState(null);
    const [orders, setOrders] = useState([]);

    const handleCompletePayment = () => {
        const orderData = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          payment: savedCardData,    // Contains cardNumber, expiryDate, cvc, cardType
          billing: savedBillingData, // Contains firstName, lastName, email, etc.
          total: 500.94
        };
        
        setOrders([orderData, ...orders]);
      };

      // Load orders from localStorage on mount
useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
    }
}, []);

// Save orders to localStorage whenever they change
useEffect(() => {
    if (orders.length > 0) {
        localStorage.setItem('orders', JSON.stringify(orders));
    }
}, [orders]);


    // Delay the whole page before Loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-white">
                <div className="w-12 h-12 md:w-16 md:h-16 border-8 border-gray-200 border-t-teal-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div>
            {/* Header Section */}
            <div className='w-full bg-[#f7f7f7] min-h-[90px] lg:h-[86px] border-t border-black/30 mb-4 lg:mb-8'>
                <div className='w-[90%] md:w-[89%] py-4 my-0 mx-auto'>
                    <p className='text-2xl md:text-3xl font-bold'>Checkout</p>
                    <p className='text-xs md:text-sm'>GoDaddy is a trusted growth partner to millions of everyday entrepreneurs.</p>
                </div>
            </div>

            {/* Cart and Order Summary */}
            <div className='w-full flex justify-center items-center px-4 lg:px-0'>
                <div className='w-full md:w-[89%] flex flex-col lg:flex-row justify-between items-start gap-4 lg:gap-6'>
                    <div className='w-full lg:flex-1'>
                        <PaymentMethod 
                            savedCardData={savedCardData}
                            setSavedCardData={setSavedCardData}
                            savedBillingData={savedBillingData}
                            setSavedBillingData={setSavedBillingData}
                        />
                    </div>
                    <div className='w-full lg:w-auto lg:sticky lg:top-4 lg:self-start'>
                        <OrderSummary 
                            isPaymentComplete={savedCardData && savedBillingData}
                            onCompletePayment={handleCompletePayment}
                            savedCardData={savedCardData}
                            savedBillingData={savedBillingData}
                            />
                    </div>
                </div>
            </div>

            {/* Add Order History Component Below */}
            {/* <div className='w-full flex justify-center items-center px-4 lg:px-0'>
                <div className='w-full md:w-[89%]'>
                    <OrderHistory orders={orders} />
                </div>
            </div> */}
        </div>
    )
}

export default CheckOutSection