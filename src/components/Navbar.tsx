import { Link } from 'react-router-dom';
import { User, Ticket, LogIn } from 'lucide-react'; // Import the Ticket icon from lucide-react
export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Ticket className="h-8 w-8 text-indigo-600" /> {/* Use the Ticket icon */}
              <span className="text-2xl font-bold text-gray-900"><i>Evenza</i></span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
            <Link to="/events" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">Events</Link>
            <Link to="/concert" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">Concerts</Link>
            <Link to="/sport" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">Sports</Link>
            <Link to="/movies" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">Movies</Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600">Dashboard</Link>
            <Link to="/profile" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
            <Link to="/login" className="flex items-center space-x-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              <LogIn className="h-5 w-5" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}