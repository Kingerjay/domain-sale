/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"; 
import cardIcon from "/src/assets/credicard.png"
import { Amex, Discover, Mastercard, Paypal, Visa,  } from 'react-payment-logos/dist/flat';
 
const PaymentMethod = ({ 
  savedCardData, 
  setSavedCardData, 
  savedBillingData, 
  setSavedBillingData 
}) => { 
  const [showCardForm, setShowCardForm] = useState(false); 
  const [showPaypalMessage, setShowPaypalMessage] = useState(false); 
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [billingData, setBillingData] = useState({
    country: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    addressCont: '',
    city: '',
    province: '',
    zipCode: '',
    organization: ''
  });

  // Load saved card data from localStorage on mount
  useEffect(() => {
    const savedCard = localStorage.getItem('savedCardData');
    if (savedCard) {
      setSavedCardData(JSON.parse(savedCard));
    }
  }, [setSavedCardData]);

  // Load saved billing data from localStorage on mount
  useEffect(() => {
    const savedBilling = localStorage.getItem('savedBillingData');
    if (savedBilling) {
      setSavedBillingData(JSON.parse(savedBilling));
      setBillingData(JSON.parse(savedBilling));
    }
  }, [setSavedBillingData]);

  // Load card form data from localStorage on mount
  useEffect(() => {
    const savedCardForm = localStorage.getItem('cardFormData');
    if (savedCardForm) {
      const formData = JSON.parse(savedCardForm);
      setCardNumber(formData.cardNumber || '');
      setExpiryDate(formData.expiryDate || '');
      setCvc(formData.cvc || '');
    }
  }, []);

  // Load billing form data from localStorage on mount
  useEffect(() => {
    const savedBillingForm = localStorage.getItem('billingFormData');
    if (savedBillingForm) {
      setBillingData(JSON.parse(savedBillingForm));
    }
  }, []);

  // Save card form data to localStorage whenever it changes
  useEffect(() => {
    const cardFormData = {
      cardNumber,
      expiryDate,
      cvc
    };
    localStorage.setItem('cardFormData', JSON.stringify(cardFormData));
  }, [cardNumber, expiryDate, cvc]);

  // Save billing form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('billingFormData', JSON.stringify(billingData));
  }, [billingData]);

  // Save savedCardData to localStorage whenever it changes
  useEffect(() => {
    if (savedCardData) {
      localStorage.setItem('savedCardData', JSON.stringify(savedCardData));
    }
  }, [savedCardData]);

  // Save savedBillingData to localStorage whenever it changes
  useEffect(() => {
    if (savedBillingData) {
      localStorage.setItem('savedBillingData', JSON.stringify(savedBillingData));
    }
  }, [savedBillingData]);
  

  // Function to detect card type with progressive detection
  const detectCardType = (number) => {
    const n = number.replace(/\s/g, '');
    if (/^3[47]/.test(n)) return 'Amex';
    if (/^4/.test(n)) return 'Visa';
    if (/^(5[1-5]|2[2-7])/.test(n)) return 'Mastercard';
    if (/^(6011|65|64[4-9])/.test(n)) return 'Discover';
    return null; // Return null when no card type is detected
  };

  // Function to get card icon
  const getCardIcon = (cardType) => {
    const icons = {
      'Visa': <Visa />,
      'Mastercard': <Mastercard />,
      'Amex': <Amex />,
      'Discover': <Discover />,

    };
    return icons[cardType] || '💳';
  };

  // Get current card type being typed
  const currentCardType = detectCardType(cardNumber);

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  // Format phone number to (XXX) XXX-XXXX
const formatPhoneNumber = (value) => {
  // Remove all non-digits
  const phoneNumber = value.replace(/\D/g, '');
  
  // Format based on length
  if (phoneNumber.length <= 3) {
    return phoneNumber;
  } else if (phoneNumber.length <= 6) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  } else {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  }
};

  // Handle card number input
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 16) {
      setCardNumber(formatCardNumber(value));
    }
  };

  // Handle expiry date input
  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    // Auto-add slash after 2 digits
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    
    setExpiryDate(value);
  };

  // Handle CVC input
  const handleCvcChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 4) { // Amex can have 4 digits
      setCvc(value);
    }
  };

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setBillingData(prev => ({
      ...prev,
      phone: formattedPhone
    }));
  };
 
  const handleAddCard = () => { 
    setShowCardForm(true); 
    setShowPaypalMessage(false); 
  }; 
 
  const handleCancel = () => { 
    setShowCardForm(false);
    // Reset form if not saved
    if (!savedCardData) {
      setCardNumber('');
      setExpiryDate('');
      setCvc('');
    }
  }; 

  const handleSaveCard = () => {
    const cleanCardNumber = cardNumber.replace(/\s/g, '');
    const lastFour = cleanCardNumber;
    const lastFourDigit = lastFour.slice(-4);
    const cardType = detectCardType(cleanCardNumber);
    
    // Use the detected card type or default to 'Card' if null
    setSavedCardData({
      lastFour,
      lastFourDigit,
      cardType: cardType || 'Card',
      expiry: expiryDate,
      cvc
    });
    
    setShowCardForm(false);
  };
 
  const handlePaypal = () => { 
    setShowPaypalMessage(true); 
    setShowCardForm(false); 
  }; 

  const handleBillingInputChange = (e) => {
    const { name, value } = e.target;
    setBillingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddBillingAddress = () => {
    setShowBillingForm(true);
    if (savedBillingData) {
      setBillingData(savedBillingData);
    }
  };

  const handleCancelBilling = () => {
    setShowBillingForm(false);
  };

  const handleSaveBilling = () => {
    setSavedBillingData(billingData);
    setShowBillingForm(false);
  };
 
  return ( 
    <div className="space-y-4">

      {/* Billing Information Section */}
      <div className="w-full max-w-[700px] border border-black/70 rounded-md p-3 md:p-4">
        <div className="text-lg font-semibold pb-2 mb-4 border-b border-black/40">
          Billing Information
        </div>

        {!showBillingForm && !savedBillingData && (
          <button
            onClick={handleAddBillingAddress}
            className="bg-[#96fffe] font-semibold text-base text-gray-800 px-4 py-2 hover:bg-[#6ebdbe]"
          >
            Add Billing Information
          </button>
        )}

        {!showBillingForm && savedBillingData && (
            <div className="flex items-center gap-3 p-4 border border-black/40 rounded-md bg-gray-50">

            <div className="space-y-1 flex-1">
            <p className="text-sm ">
              <strong>{savedBillingData.firstName} {savedBillingData.lastName}</strong>
            </p>
            <p className="text-sm capitalize">
              {savedBillingData.city}, {savedBillingData.province}
            </p>
            <p className="text-sm capitalize">{savedBillingData.country}</p>
            </div>

            <button
              onClick={handleAddBillingAddress}
              className="mt-1 text-teal-600 hover:underline font-semibold text-sm"
            >
              Edit
            </button>
            </div>
        )}

        {showBillingForm && (
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSaveBilling();
          }} className="space-y-4">
            <p className="text-sm text-gray-600">All fields required unless otherwise stated.</p>

            {/* Country/Region */}
            <div>
              <label className="block text-sm font-medium mb-1">Country / Region</label>
              <select
                name="country"
                value={billingData.country}
                onChange={handleBillingInputChange}
                className="w-full border border-[#808080] px-3 py-2 outline-none"
                autoComplete="country"
                required
              >
                <option value="">Select country</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Mexico">Mexico</option>
                <option value="Germany">Germany</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Spain">Spain</option>
                <option value="France">France</option>
                <option value="Italy">Italy</option>
                <option value="Poland">Poland</option>
                <option value="Sweden">Sweden</option>
              </select>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={billingData.email}
                onChange={handleBillingInputChange}
                className="w-full border border-[#808080] px-3 py-2 outline-none"
                required
              />
            </div>

            {/* First Name & Last Name */}
            <div className="md:flex gap-3 max-sm:space-y-4">
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={billingData.firstName}
                  onChange={handleBillingInputChange}
                  className="w-full border border-[#808080] px-3 py-2 outline-none"
                  autoComplete="given-name"
                  required
                />
              </div>
              <div className="w-full md:w-1/2 ">
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={billingData.lastName}
                  onChange={handleBillingInputChange}
                  className="w-full border border-[#808080] px-3 py-2 outline-none"
                  autoComplete="family-name"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <div className="flex gap-2">
                <select className="border border-[#808080] px-2 py-2 outline-none">
                  <option>+ 1</option>
                  <option>+ 44</option>
                  <option>+ 46</option>
                  <option>+ 41</option>
                  <option>+ 31</option>
                  <option>+ 33</option>
                  <option>+ 34</option>
                  <option>+ 39</option>
                  <option>+ 48</option>
                  <option>+ 49</option>
                  <option>+ 52</option>
                </select>
                <input
                  type="tel"
                  name="phone"
                  value={billingData.phone}
                  onChange={handlePhoneChange}  // Changed from handleBillingInputChange
                  className="flex-1 border border-[#808080] px-3 py-2 outline-none"
                  autoComplete="tel"
                  placeholder="(XXX) XXX-XXXX"
                  maxLength={14}  // Added maxLength
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={billingData.address}
                onChange={handleBillingInputChange}
                className="w-full border border-[#808080] px-3 py-2 outline-none"
                autoComplete="street-address"
                required
              />
            </div>

            {/* Address Cont. */}
            <div>
              <label className="block text-sm font-medium mb-1">Address Cont.</label>
              <input
                type="text"
                name="addressCont"
                value={billingData.addressCont}
                onChange={handleBillingInputChange}
                className="w-full border border-[#808080] px-3 py-2 outline-none"
                autoComplete="address-line2"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                name="city"
                value={billingData.city}
                onChange={handleBillingInputChange}
                className="w-full border border-[#808080] px-3 py-2 outline-none"
                autoComplete="address-level2"
                required
              />
            </div>

            {/* Province/Region & Zip Code */}
            <div className="md:flex gap-3 max-sm:space-y-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">State / Region</label>
                <input
                  type="text"
                  name="province"
                  value={billingData.province}
                  onChange={handleBillingInputChange}
                  className="w-full border border-[#808080] px-3 py-2 outline-none"
                  autoComplete="address-level1"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={billingData.zipCode}
                  onChange={handleBillingInputChange}
                  className="w-full border border-[#808080] px-3 py-2 outline-none"
                  autoComplete="postal-code"
                  required
                />
              </div>
            </div>

            {/* Organization */}
            <div>
              <label className="block text-sm font-medium mb-1">Organization</label>
              <input
                type="text"
                name="organization"
                value={billingData.organization}
                onChange={handleBillingInputChange}
                className="w-full border border-[#808080] px-3 py-2 outline-none"
                autoComplete="organization"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 pt-4">
              <button
                type="submit"
                className="bg-black text-white px-8 py-2 w-full sm:w-[48.5%] border-2 hover:bg-gray-800 border-black"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancelBilling}
                className="border border-black px-8 w-full sm:w-[48.5%] border-2 py-2 hover:bg-gray-100 border-black"
              >
                Cancel
              </button>
            </div>
                      </form>
                    )}
      </div>
      {/* End of Billing Information Section */}

      {/* Payment Option */}
      <div className="w-full max-w-[700px] border border-black/70 rounded-md p-3 md:p-4"> 
 
        <div className="text-lg font-semibold pb-2 mb-4 border-b border-black/40"> 
            Payment Method 
        </div> 
 
        {/* Payment options - Show only if no card is saved */}
        {!savedCardData && (
          <div className="flex gap-5 mb-4"> 
            <button 
              onClick={handleAddCard} 
              className="flex font-semibold text-gray-800 text-lg items-center gap-2 bg-[#96fffe] px-2 md:px-4 py-2 hover:bg-[#6ebdbe] hover:text-black transition duration-300" 
            > 
              <p className="flex gap-2 items-center text-base ">
                <img src={cardIcon} alt="" className="w-6 md:w-8 border-2 border-gray-300"/>
                Add new card 
                </p>
            </button> 
 
            <button 
              onClick={handlePaypal} 
              className="px-4 font-semibold text-black/70 text-lg bg-[#E1F0FE] hover:bg-[#C9E2FC] transition duration-300" 
            > 
              <p className="flex gap-2 items-center text-sm md:text-base"><Paypal width={30} />PayPal </p>
            </button> 
          </div> 
        )}

        {/* Saved Card Display */}
        {savedCardData && !showCardForm && (
          <div className="mb-4">
            <div className="flex items-center gap-3 p-4 border border-black/40 rounded-md bg-gray-50">
              <span className="text-2xl">{getCardIcon(savedCardData.cardType)}</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">
                  {savedCardData.cardType} ****{savedCardData.lastFourDigit}
                </p>
                <p className="text-sm text-gray-600">Expires {savedCardData.expiry}</p>
              </div>
              <button
                onClick={handleAddCard}
                className="text-teal-600 hover:underline font-semibold text-sm"
              >
                Edit
              </button>
            </div>
          </div>
        )}
        
 
        {/* PayPal message */} 
        {showPaypalMessage && ( 
          <p className="text-red-600 mb-4 md:text-sm text-xs"> 
            Not available at the moment, use your card. 
          </p> 
        )} 
 
        {/* Card Form */} 
        {showCardForm && ( 
          <div className="pt-2 space-y-4"> 
 
            {/* Card Number */} 
            <div className="w-full border flex items-center border-[#808080]"> 
              {currentCardType && (
                <div className="px-3 text-gray-500 border-r border-[#808080]"> 
                  <span className="text-xl">{getCardIcon(currentCardType)}</span>
                </div>
              )}
              <input 
                type="text"
                value={cardNumber}
                onChange={handleCardNumberChange}
                className={`w-full px-3 py-3 outline-none placeholder:font-semibold text-base ${!currentCardType ? 'px-3' : ''}`}
                placeholder="Card number *"
                maxLength={19}
              /> 
            </div> 
 
            {/* Expiry & CVC */} 
            <div className="flex "> 
              <input 
                type="text"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                placeholder="MM/YY *" 
                className="w-[70%] placeholder:font-semibold border px-3 py-3 border-[#808080] outline-none text-base"
                maxLength={5}
              /> 
              <input 
                type="text"
                value={cvc}
                onChange={handleCvcChange}
                placeholder="CVC *" 
                className="w-[30%] placeholder:font-semibold border px-3 py-3 border-[#808080] outline-none text-base"
                maxLength={4}
              /> 
              {currentCardType && (
                <div className="px-3 text-gray-500 border border-[#808080]"> 
                  <span className="text-xl">{getCardIcon(currentCardType)}</span>
                </div>
              )}
            </div> 
 
            {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 mt-4"> 
                <button 
                  onClick={handleSaveCard}
                  disabled={!cardNumber || !expiryDate || !cvc}
                  className={`px-6 py-2 w-full sm:w-[48.5%] border-2 font-semibold ${
                    cardNumber && expiryDate && cvc
                      ? 'bg-black text-white hover:bg-gray-800 cursor-pointer border-black'
                      : 'bg-gray-400 text-white border-gray-400'
                  }`}
                > 
                  Save Card
                </button> 

                <button 
                  onClick={handleCancel} 
                  className="border-2 px-6 py-2 w-full sm:w-[48.5%] border-black hover:bg-gray-100 font-semibold" 
                > 
                  Cancel 
                </button> 
              </div>
 
            {/* Checkbox */} 
            <label className="flex items-center gap-2 mt-3 text-xs md:text-sm"> 
              <input type="checkbox" defaultChecked style={{accentColor: '#009688' }} /> 
              Use as backup payment method for this account 
            </label> 
 
          </div> 
        )} 
      </div>
      {/* End of Payment options */}

      <div></div>

    </div>
  ); 
}; 
 
export default PaymentMethod;