import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ScreenShare as Screen, Info } from 'lucide-react';
interface Seat {
  id: string;
  row: string;
  number: number;
  price: number;
  status: 'available' | 'selected' | 'sold';
}
const SEAT_LAYOUT = {
  NORMAL: { rows: ['K'], seatsPerRow: 25, price: 520 },
  EXECUTIVE: { rows: ['J', 'I', 'H', 'G', 'F', 'E'], seatsPerRow: 25, price: 320 },
  PREMIUM: { rows: ['D', 'C', 'B'], seatsPerRow: 25, price: 300 },
  VIP: { rows: ['A'], seatsPerRow: 25, price: 280 }
};
export default function SeatSelectionPage() {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const generateSeats = () => {
    const seats: Seat[] = [];
    Object.entries(SEAT_LAYOUT).forEach(([, layout]) => {
      layout.rows.forEach(row => {
        for (let i = 1; i <= layout.seatsPerRow; i++) {
          seats.push({
            id: `${row}${i}`,
            row,
            number: i,
            price: layout.price,
            status: Math.random() > 0.8 ? 'sold' : 'available'
          });
        }
      });
    });
    return seats;
  };
  const [seats] = useState<Seat[]>(generateSeats());
  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'sold') return;
    const isSelected = selectedSeats.find(s => s.id === seat.id);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };
  const totalAmount = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  const getSeatStatus = (seat: Seat) => {
    if (seat.status === 'sold') return 'bg-gray-300 cursor-not-allowed';
    if (selectedSeats.find(s => s.id === seat.id)) {
      return 'bg-green-500 text-white';
    }
    return 'bg-white hover:bg-indigo-100';
  };
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Select Your Seats</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-white border border-gray-300 rounded mr-2"></div>
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                <span className="text-sm">Selected</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                <span className="text-sm">Sold</span>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <div className="w-full h-4 bg-gradient-to-b from-gray-300 to-gray-200 rounded-t-lg"></div>
            <div className="flex justify-center my-8">
              <Screen className="h-8 w-8 text-gray-400" />
              <span className="ml-2 text-gray-500">Screen</span>
            </div>
          </div>
          <div className="space-y-8">
            {Object.entries(SEAT_LAYOUT).map(([category, layout]) => (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{category}</h3>
                  <span className="text-gray-600">₹{layout.price}</span>
                </div>
                {layout.rows.map(row => (
                  <div key={row} className="flex items-center">
                    <span className="w-6 text-gray-500">{row}</span>
                    <div className="flex flex-nowrap overflow-x-auto">
                      {seats
                        .filter(seat => seat.row === row)
                        .map(seat => (
                          <button
                            key={seat.id}
                            onClick={() => handleSeatClick(seat)}
                            disabled={seat.status === 'sold'}
                            className={`w-10 h-10 rounded text-xs font-medium border border-gray-300 ${getSeatStatus(seat)}`}
                          >
                            {seat.number}
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-8 border-t pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">Selected Seats: {selectedSeats.length}</p>
                <p className="text-sm text-gray-500">
                  {selectedSeats.map(seat => seat.id).join(', ')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">Total: ₹{totalAmount}</p>
                <button
                  onClick={() => navigate('/checkout')}
                  disabled={selectedSeats.length === 0}
                  className="mt-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
                >
                  <Link to="/checkout" className="w-full h-full flex items-center justify-center">
                  Proceed to Payment
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-start space-x-2">
            <Info className="h-5 w-5 text-gray-400 mt-0.5" />
            <div className="text-sm text-gray-600">
              <p className="font-medium mb-1">Important Information:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Seats are allocated on a first-come, first-served basis</li>
                <li>Maximum of 10 seats can be selected per transaction</li>
                <li>Seat selection cannot be modified after payment</li>
                <li>Keep your confirmation email handy for entry</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}