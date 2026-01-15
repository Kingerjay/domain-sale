import React, { useState, useEffect } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage when component mounts
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter(
      (order) => order.id !== orderId
    );
  
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };
  

  if (!orders || orders.length === 0) {
    return (
      <div className="mt-10 p-6 bg-gray-50 border border-gray-200 rounded-md text-center">
        <p className="text-sm text-gray-600">
          No completed orders yet.
        </p>
      </div>
    );
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="mt-12 h-screen">
      <h2 className="text-2xl font-semibold mb-6">
        Order History ({orders.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">Customer</th>
              <th className="p-3 border">Billing Address</th>
              <th className="p-3 border">Payment</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => {
              const billing = order.billing || {};
              const payment = order.payment || {};

              return (
                <tr key={order.id} className="align-top">
                  {/* Order ID */}
                  <td className="p-3 border font-mono text-xs">
                    {order.id}
                  </td>

                  {/* Customer */}
                  <td className="p-3 border space-y-2">
                    <p className="">
                    <span className="font-semibold">First Name:</span>  {billing.firstName}
                    </p>
                    <p className="">
                    <span className="font-semibold">Last Name:</span>  {billing.lastName}
                    </p>
                    {billing.organization && (
                      <p className=" ">
                       <span className="font-semibold">Org:</span>  {billing.organization}
                      </p>
                    )}
                    <p className="">
                    <span className="font-semibold">Phone No:</span> {billing.phone || 'N/A'}
                    </p>
                    <p className="">
                    <span className="font-semibold">Email:</span>  {billing.email || 'N/A'}
                    </p>
                  </td>


                  {/* Billing Address */}
                  <td className="p-3 border leading-relaxed space-y-2">
                    <p><span className="font-semibold">Address:</span> {billing.address || 'N/A'}</p>
                    {billing.addressCont && <p><span className="font-semibold">Address Contd:</span> {billing.addressCont}</p>}
                    <p><span className="font-semibold">City:</span>  {billing.city}</p>
                    <p><span className="font-semibold">State/Province:</span>  {billing.province}</p>
                    <p><span className="font-semibold">Zipcode:</span>  {billing.zipCode}</p>
                    <p><span className="font-semibold">Country:</span>  {billing.country}</p>
                  </td>

                  {/* Payment */}
                  <td className="p-3 border space-y-2">
                  <p className="">
                  <span className="font-semibold">Card Type:</span> {payment.cardType || 'Card'}
                  </p>
                  <p className="">
                  <span className="font-semibold">Card Number:</span> {payment.lastFour || 'XXXX'}
                  </p>
                  <p className="">
                  <span className="font-semibold">Expiry Date:</span>  {payment.expiry || 'N/A'}
                  </p>
                  <p className="">
                  <span className="font-semibold">Cvc:</span>  {payment.cvc || 'N/A'}
                  </p>
                </td>

                  {/* Date */}
                  <td className="p-3 border text-xs whitespace-nowrap">
                    {formatDate(order.timestamp)}
                  </td>

                  <td className="p-3 border text-xs whitespace-nowrap">
                    <button
                      className="border bg-blue-300 font-semibold p-2 rounded-lg hover:bg-blue-500"
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;