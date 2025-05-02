import React, { useState } from 'react';
import { Star as Stage, Users, User, Crown, Star, Users2 } from 'lucide-react';


interface SeatCategory {
  id: string;
  name: string;
  type: 'seated' | 'standing';
  price: number;
  color: string;
  icon: React.ElementType;
  available: number;
}

const categories: SeatCategory[] = [
  {
    id: 'table',
    name: "TABLE'S",
    type: 'seated',
    price: 5000,
    color: 'bg-amber-300',
    icon: Crown,
    available: 20
  },
  {
    id: 'mip',
    name: 'MIP',
    type: 'seated',
    price: 4000,
    color: 'bg-pink-300',
    icon: Star,
    available: 30
  },
  {
    id: 'vip',
    name: 'VIP',
    type: 'standing',
    price: 3000,
    color: 'bg-orange-200',
    icon: Users,
    available: 50
  },
  {
    id: 'gold',
    name: 'GOLD',
    type: 'standing',
    price: 2000,
    color: 'bg-yellow-400',
    icon: Users2,
    available: 100
  },
  {
    id: 'general',
    name: 'GENERAL',
    type: 'standing',
    price: 1000,
    color: 'bg-gray-300',
    icon: User,
    available: 200
  }
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState<SeatCategory | null>(null);

  const handleProceedToPayment = async () => {
    if (!selectedCategory) {
      alert('Please select a seating category');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: selectedCategory.price })
      });

      const order = await res.json();

      const options = {
        key: 'rzp_test_gI67fXiO9u1sAK', // Replace with your Razorpay key
        amount: order.amount,
        currency: order.currency,
        name: 'Concert Booking',
        description: `${selectedCategory.name} - Seat Booking`,
        order_id: order.id,
        handler: function (response: any) {
          alert('Payment Successful!\nPayment ID: ' + response.razorpay_payment_id);
          // Optionally: send response.razorpay_payment_id to backend to verify
        },
        prefill: {
          name: 'Guest User',
          email: 'guest@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#0d6efd',
        }
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error('Payment initiation failed:', err);
      alert('Something went wrong while initiating payment.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-black p-4 shadow-lg">
        <h1 className="text-2xl font-bold">Concert Seating Selection</h1>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stage display */}
        <div className="relative mb-12">
          <div className="w-full h-24 bg-gray-800 rounded-lg flex items-center justify-center mb-8">
            <Stage className="w-12 h-12" />
            <span className="ml-2 text-xl font-bold">STAGE</span>
          </div>
        </div>

        {/* Seating categories */}
        <div className="space-y-4 max-w-2xl mx-auto mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className={`w-full p-4 rounded-lg transition-all duration-300 ${category.color} ${
                selectedCategory?.id === category.id
                  ? 'ring-4 ring-white ring-opacity-50 transform scale-102'
                  : 'hover:opacity-90'
              }`}
            >
              <div className="flex items-center justify-between text-black">
                <div className="flex items-center space-x-3">
                  <category.icon className="w-6 h-6" />
                  <div className="text-left">
                    <h3 className="font-bold text-lg">{category.name}</h3>
                    <p className="text-sm">
                      ({category.type === 'seated' ? 'Chair Seated' : 'Standing Area'})
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{category.price}</p>
                  <p className="text-sm">{category.available} available</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Payment button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={handleProceedToPayment}
            disabled={!selectedCategory}
            className={`w-1/2 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center ${
              selectedCategory
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-gray-600 cursor-not-allowed opacity-50'
            }`}
          >
            Proceed to Payment
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
