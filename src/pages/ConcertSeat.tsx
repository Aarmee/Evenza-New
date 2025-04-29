import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Ensure you import Link
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
function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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
  const handleProceedToPayment = () => {
    if (!selectedCategory) {
      alert('Please select a seating category');
      return;
    }
    // Handle any additional logic here if needed
  };
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-black p-4 shadow-lg">
        <h1 className="text-2xl font-bold">Concert Seating Selection</h1>
      </div>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stage */}
        <div className="relative mb-12">
          <div className="w-full h-24 bg-gray-800 rounded-lg flex items-center justify-center mb-8">
            <Stage className="w-12 h-12" />
            <span className="ml-2 text-xl font-bold">STAGE</span>
          </div>
        </div>
        {/* Seating Categories */}
        <div className="space-y-4 max-w-2xl mx-auto mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full p-4 rounded-lg transition-all duration-300 ${
                category.color
              } ${
                selectedCategory === category.id
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
        {/* Proceed to Payment Button */}
        <div className="flex justify-center mb-4">
        <Link
    to="/checkout" // Link to the payment page
    onClick={handleProceedToPayment}
    className={`w-1/2 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center ${
      selectedCategory
        ? 'bg-blue-500 hover:bg-blue-600' // Enabled state styles
        : 'bg-gray-600 cursor-not-allowed opacity-50' // Disabled state styles
    }`}
  >
    Proceed to Payment
  </Link>
        </div>
      </div>
    </div>
  );
}
export default App;