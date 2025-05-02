import React, { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, DollarSign } from 'lucide-react';
import axios from 'axios';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Seat {
  id: string;
  row: string;
  number: number;
  isBooked: boolean;
}

interface Section {
  id: string;
  name: string;
  price: number;
  category: 'EXECUTIVE' | 'STANDARD';
  ring: 3 | 4;
  seats: Seat[];
  color: string;
}

function App() {
  const [zoom, setZoom] = useState(1);
  const [bookedSeats, setBookedSeats] = useState<Set<string>>(new Set());
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);

  useEffect(() => {
    axios.get<string[]>('http://localhost:8080/api/bookings')
      .then(response => setBookedSeats(new Set(response.data)))
      .catch(err => console.error('Error fetching booked seats:', err));
  }, []);

  const generateSeats = (sectionId: string, rowCount: number, seatsPerRow: number): Seat[] => {
    const seats: Seat[] = [];
    const rows = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, rowCount);
    rows.split('').forEach(row => {
      for (let i = 1; i <= seatsPerRow; i++) {
        const seatId = `${sectionId}-${row}${i}`;
        seats.push({
          id: seatId,
          row,
          number: i,
          isBooked: bookedSeats.has(seatId)
        });
      }
    });
    return seats;
  };

  const [sections] = useState<Section[]>(() => {
    const sectionTypes = [
      { ring: 3, category: 'EXECUTIVE', price: 2000, color: 'bg-blue-500', count: 16 },
      { ring: 4, category: 'STANDARD', price: 1000, color: 'bg-green-500', count: 20 }
    ];
    return sectionTypes.flatMap(type =>
      Array.from({ length: type.count }, (_, i) => {
        const id = `${type.category}-${i + 1}`;
        return {
          id,
          name: `${type.category} Section ${i + 1}`,
          price: type.price,
          category: type.category as Section['category'],
          ring: type.ring as Section['ring'],
          color: type.color,
          seats: generateSeats(id, 5, 20)
        };
      })
    );
  });

  const handleSectionClick = (section: Section) => {
    setSelectedSection(section);
  };

  const handleSeatClick = (seat: Seat) => {
    if (seat.isBooked) return;
    setSelectedSeats(prev =>
      prev.includes(seat.id) ? prev.filter(id => id !== seat.id) : [...prev, seat.id]
    );
  };

  const totalAmount = selectedSeats.reduce((total, seatId) => {
    const section = sections.find(s => seatId.includes(s.id));
    return total + (section?.price || 0);
  }, 0);

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/payment/create-order', {
        amount: totalAmount // Pass the amount directly in INR
      });

      const options = {
        key: 'rzp_test_gI67fXiO9u1sAK', // Replace with your Razorpay key
        amount: response.data.amount * 100, // Razorpay expects the amount in paise
        currency: 'INR',
        name: 'Seat Booking',
        description: 'Booking payment',
        order_id: response.data.id,
        handler: async function (res: any) {
          alert('Payment successful!');
          await axios.post('http://localhost:8080/api/bookings/confirm', {
            seats: selectedSeats,
            paymentId: res.razorpay_payment_id
          });
          alert('Seats booked!');
          window.location.reload();
        },
        prefill: {
          name: 'Test User',
          email: 'test@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#3399cc'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error('Payment error:', err);
      alert('Payment failed to start.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <button onClick={() => setZoom(z => Math.min(z + 0.2, 2))} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
              <ZoomIn size={20} />
            </button>
            <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
              <ZoomOut size={20} />
            </button>
          </div>
          <div className="relative w-full aspect-square max-w-4xl mx-auto mb-8 overflow-hidden" style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}>
            <div className="absolute inset-1/4 bg-green-700 rounded-full flex items-center justify-center">
              <div className="w-1/3 h-1/2 bg-green-600 border-2 border-white rounded-lg"></div>
            </div>
            <div className="absolute inset-0">
              {sections.map((section, index) => {
                const totalSections = sections.filter(s => s.ring === section.ring).length;
                const angle = (index % totalSections) * (360 / totalSections);
                const radius = 100 - (section.ring * 20);
                const left = `${50 + radius * Math.cos((angle - 90) * (Math.PI / 180))}%`;
                const top = `${50 + radius * Math.sin((angle - 90) * (Math.PI / 180))}%`;
                return (
                  <button
                    key={section.id}
                    className={`absolute w-16 h-16 ${section.color} rounded-lg transform -translate-x-1/2 -translate-y-1/2 hover:brightness-110 transition-all duration-200 cursor-pointer flex items-center justify-center text-xs font-bold ${selectedSection?.id === section.id ? 'ring-4 ring-white' : ''}`}
                    style={{ left, top }}
                    onClick={() => handleSectionClick(section)}
                  >
                    {section.id.split('-')[1]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {selectedSection && (
          <div className="bg-gray-800 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold mb-4">{selectedSection.name}</h3>
            <div className="grid grid-cols-21 gap-1">
              <div className="col-span-1"></div>
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="text-center text-xs text-gray-400">{i + 1}</div>
              ))}
              {Array.from({ length: 5 }, (_, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <div className="flex items-center justify-center text-xs text-gray-400">
                    {String.fromCharCode(65 + rowIndex)}
                  </div>
                  {selectedSection.seats.filter(seat => seat.row === String.fromCharCode(65 + rowIndex)).map(seat => (
                    <button
                      key={seat.id}
                      className={`w-6 h-6 rounded-t-lg ${
                        seat.isBooked ? 'bg-gray-700 cursor-not-allowed' :
                        selectedSeats.includes(seat.id) ? 'bg-blue-500' :
                        'bg-gray-300 hover:bg-gray-400'
                      }`}
                      onClick={() => handleSeatClick(seat)}
                      disabled={seat.isBooked}
                    />
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Selected Seats ({selectedSeats.length})</h2>
          <div className="mb-4">
            {selectedSeats.length > 0 ? (
              <ul className="space-y-2">
                {selectedSeats.map(seatId => {
                  const section = sections.find(s => seatId.includes(s.id));
                  return (
                    <li key={seatId} className="flex justify-between">
                      <span>{seatId}</span>
                      <span>₹{section?.price}</span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-400">No seats selected</p>
            )}
          </div>
          <div className="flex justify-between items-center font-bold text-lg border-t border-gray-700 pt-4">
            <span>Total Amount:</span>
            <span>₹{totalAmount}</span>
          </div>

          <button
            onClick={handlePayment}
            disabled={selectedSeats.length === 0}
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;