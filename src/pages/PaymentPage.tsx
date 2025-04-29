import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, Ban as Bank, Gift, Shield, ChevronRight, Check } from 'lucide-react';


interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: CreditCard,
    description: 'Pay securely with your card'
  },
  {
    id: 'upi',
    name: 'UPI',
    icon: Wallet,
    description: 'Google Pay, PhonePe, Paytm & more'
  },
  {
    id: 'netbanking',
    name: 'Net Banking',
    icon: Bank,
    description: 'All major banks supported'
  }
];

const BANKS = [
  { id: 'sbi', name: 'State Bank of India', logo: 'https://example.com/sbi.png' },
  { id: 'hdfc', name: 'HDFC Bank', logo: 'https://example.com/hdfc.png' },
  { id: 'icici', name: 'ICICI Bank', logo: 'https://example.com/icici.png' },
  { id: 'axis', name: 'Axis Bank', logo: 'https://example.com/axis.png' }
];

export default function PaymentPage() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [couponCode, setCouponCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    navigate('/confirmation');
  };

  const subtotal = 1000;
  const discount = 100;
  const tax = 90;
  const total = subtotal - discount + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {/* Payment Methods */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Choose Payment Method</h2>
              <div className="space-y-4">
                {PAYMENT_METHODS.map(method => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full flex items-center p-4 border rounded-lg transition-colors ${
                      selectedMethod === method.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-600'
                    }`}
                  >
                    <method.icon className="h-6 w-6 text-indigo-600" />
                    <div className="ml-4 flex-1 text-left">
                      <p className="font-medium">{method.name}</p>
                      <p className="text-sm text-gray-500">{method.description}</p>
                    </div>
                    {selectedMethod === method.id ? (
                      <Check className="h-5 w-5 text-indigo-600" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Bank Selection (shown only for netbanking) */}
            {selectedMethod === 'netbanking' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Select Bank</h3>
                <div className="grid grid-cols-2 gap-4">
                  {BANKS.map(bank => (
                    <button
                      key={bank.id}
                      className="p-4 border rounded-lg hover:border-indigo-600 transition-colors"
                    >
                      <p className="font-medium">{bank.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Card Details (shown only for card payment) */}
            {selectedMethod === 'card' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Card Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>₹{tax}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="mt-6">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    Apply
                  </button>
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={!selectedMethod || isProcessing}
                className="mt-6 w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Pay ₹{total}</span>
                )}
              </button>
            </div>

            {/* Security Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center text-gray-600">
                <Shield className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm">Secure payment powered by Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}