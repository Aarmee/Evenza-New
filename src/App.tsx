import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import SeatSelectionPage from './pages/SeatSelectionPage';
import SearchResults from './pages/SearchResults';
import MoviePage from './pages/MoviePage'; // Adjust the import path as necessary
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import MovieDetailPage from './pages/MovieDetailPage';
import StadiumSelection from './pages/StadiumSelection';
import ConcertSeat from './pages/ConcertSeat';
import ConcertPage from './pages/ConcertPage';
import ConcertDetailPage from './pages/ConcertDetailPage';
import SportPage from './pages/SportPage';
import SportDetailPage from './pages/SportDetailPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import RefundPage from './pages/RefundPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import FAQPage from './pages/FAQPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/movies" element={<MoviePage />} />
            <Route path="/select-seats" element={<SeatSelectionPage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/about" element={<AboutPage/>} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/movies/:id" element={<MovieDetailPage />} />
            <Route path="/seat" Component={SeatSelectionPage} /> 
            <Route path="/stadium" Component={StadiumSelection} /> 
            <Route path="/concertseat" Component={ConcertSeat} /> 
            <Route path="/concert" Component={ConcertPage} />
            <Route path="/concert/:id" element={<ConcertDetailPage />} />

            <Route path="/sport" Component={SportPage} /> 
            <Route path="/sport/:id" element={<SportDetailPage />} />
            <Route path="/terms-and-conditions" Component={TermsAndConditionsPage} />
            <Route path="/privacy-policy" Component={PrivacyPolicyPage} />
            <Route path="/refund" Component={RefundPage} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/faq" Component={FAQPage} />
            <Route path="/register" Component={RegisterPage} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;