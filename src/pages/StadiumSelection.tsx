import React, { useState } from 'react';
import { DollarSign, Link, ZoomIn, ZoomOut } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom'; // Import Link from react-router-dom
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
  category: 'EXECUTIVE' | 'STANDARD'; // Updated categories
  ring: 3 | 4; // Updated rings
  seats: Seat[];
  color: string;
}
function App() {
  const [zoom, setZoom] = useState(1);
  const generateSeats = (sectionId: string, rowCount: number, seatsPerRow: number): Seat[] => {
    const seats: Seat[] = [];
    const rows = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, rowCount);
    rows.split('').forEach(row => {
      for (let i = 1; i <= seatsPerRow; i++) {
        seats.push({
          id: `${sectionId}-${row}${i}`,
          row,
          number: i,
          isBooked: Math.random() > 0.8 // Randomly mark some seats as booked
        });
      }
    });
    return seats;
  };
  const [sections] = useState<Section[]>(() => {
    const sectionTypes = [
      { ring: 3, category: 'EXECUTIVE', price: 200, color: 'bg-blue-500', count: 16 },
      { ring: 4, category: 'STANDARD', price: 100, color: 'bg-green-500', count: 20 }
    ];
    return sectionTypes.flatMap(type => 
      Array.from({ length: type.count }, (_, i) => ({
        id: `${type.category}-${i + 1}`,
        name: `${type.category} Section ${i + 1}`,
        price: type.price,
        category: type.category as Section['category'],
        ring: type.ring as Section['ring'],
        color: type.color,
        seats: generateSeats(`${type.category}-${i + 1}`, 5, 20) // 100 seats per section (5 rows × 20 seats)
      }))
    );
  });
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const handleSectionClick = (section: Section) => {
    setSelectedSection(section);
  };
  const handleSeatClick = (seat: Seat) => {
    if (seat.isBooked) return;
    setSelectedSeats(prev => {
      const isSelected = prev.includes(seat.id);
      if (isSelected) {
        return prev.filter(id => id !== seat.id);
      } else {
        return [...prev, seat.id];
      }
    });
  };
  const totalAmount = selectedSeats.reduce((total, seatId) => {
    const [sectionId] = seatId.split('-');
    const section = sections.find(s => s.id.startsWith(sectionId));
    return total + (section?.price || 0);
  }, 0);
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Stadium Layout */}
        <div className="relative">
          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <button 
              onClick={() => setZoom(z => Math.min(z + 0.2, 2))}
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
            >
              <ZoomIn size={20} />
            </button>
            <button 
              onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))}
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
            >
              <ZoomOut size={20} />
            </button>
          </div>
          <div 
            className="relative w-full aspect-square max-w-4xl mx-auto mb-8 overflow-hidden"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
          >
            {/* Field */}
            <div className="absolute inset-1/4 bg-green-700 rounded-full flex items-center justify-center">
              <div className="w-1/3 h-1/2 bg-green-600 border-2 border-white rounded-lg"></div>
            </div>
            {/* Sections */}
            <div className="absolute inset-0">
              {sections.map((section, index) => {
                const totalSections = sections.filter(s => s.ring === section.ring).length;
                const angle = (index % totalSections) * (360 / totalSections);
                const radius = 100 - (section.ring * 20); // Adjust radius based on ring number
                const left = `${50 + radius * Math.cos((angle - 90) * (Math.PI / 180))}%`;
                const top = `${50 + radius * Math.sin((angle - 90) * (Math.PI / 180))}%`;
                return (
                  <button
                    key={section.id}
                    className={`absolute w-16 h-16 ${section.color} rounded-lg transform -translate-x-1/2 -translate-y-1/2 
                      hover:brightness-110 transition-all duration-200 cursor-pointer flex items-center justify-center
                      text-xs font-bold ${selectedSection?.id === section.id ? 'ring-4 ring-white' : ''}`}
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
        {/* Section Detail View */}
        {selectedSection && (
          <div className="bg-gray-800 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold mb-4">{selectedSection.name}</h3>
            <div className="grid grid-cols-21 gap-1">
              {/* Seat numbers header */}
              <div className="col-span-1"></div>
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="text-center text-xs text-gray-400">{i + 1}</div>
              ))}
              {/* Seats grid */}
              {Array.from({ length: 5 }, (_, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <div className="flex items-center justify-center text-xs text-gray-400">
                    {String.fromCharCode(65 + rowIndex)}
                  </div>
                  {selectedSection.seats
                    .filter(seat => seat.row === String.fromCharCode(65 + rowIndex))
                    .map(seat => (
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
        {/* Selection Summary */}
        <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Selected Seats ({selectedSeats.length})</h2>
          <div className="mb-4">
            {selectedSeats.length > 0 ? (
              <ul className="space-y-2">
                {selectedSeats.map(seatId => {
                  const [sectionId] = seatId.split('-');
                  const section = sections.find(s => s.id.startsWith(sectionId));
                  return (
                    <li key={seatId} className="flex justify-between">
                      <span>{seatId}</span>
                      <span>${section?.price}</span>
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
            <span>${totalAmount}</span>
          </div>
          {selectedSeats.length > 0 ? (
            <RouterLink to="/checkout">
              <button
                className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg 
                  flex items-center justify-center gap-2"
              >
                <DollarSign size={20} />
                Proceed to Payment
              </button>
            </RouterLink>
          ) : (
            <button
              className="w-full mt-4 bg-gray-400 text-white py-3 px-6 rounded-lg 
                flex items-center justify-center gap-2 cursor-not-allowed"
              disabled
            >
              <DollarSign size={20} />
              Proceed to Payment
            </button>
          )}
        </div>
        {/* Legend */}
        <div className="mt-6 p-4 bg-gray-800 rounded-lg text-sm">
          <h3 className="font-bold mb-2">Seating Information:</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            <li>Executive sections provide dedicated service and comfortable seating</li>
            <li>Standard sections offer great value with clear views of the field</li>
            <li>Each section contains 100 seats (5 rows × 20 seats)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default App;