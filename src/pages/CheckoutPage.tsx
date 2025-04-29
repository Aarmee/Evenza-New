import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CreditCard, Gift, Shield, Lock } from 'lucide-react';

export default function CheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/confirmation');
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white rounded-xl shadow-xl p-8">
            <div className="flex items-center space-x-2 mb-6">
              <Lock className="h-6 w-6 text-indigo-600" />
              <h2 className="text-2xl font-bold">Secure Checkout</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Information
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Card number"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <CreditCard className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="px-4 py-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="px-4 py-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 px-4 py-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 ${
                  isProcessing ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Complete Purchase</span>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-xl p-8">
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Ticket Price</span>
                <span>$99.99</span>
              </div>
              <div className="flex justify-between">
                <span>Service Fee</span>
                <span>$10.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>$8.80</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>$118.79</span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center text-gray-600 bg-gray-50 p-4 rounded-lg">
                <Shield className="h-5 w-5 mr-2 text-green-500" />
                <span className="text-sm">Secure checkout powered by Stripe</span>
              </div>
              <div className="flex items-center text-gray-600 bg-gray-50 p-4 rounded-lg">
                <Gift className="h-5 w-5 mr-2 text-indigo-500" />
                <span className="text-sm">100% money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}