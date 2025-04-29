import { useState } from 'react';
import EventCard from '../components/EventCard';
import{ Event } from '../types';
// Sample event data for various events
const EVENTS: Event[] = [
    {
        id: '1',
        title: 'Beyoncé: World Tour',
        description: 'Join Beyoncé for a night of unforgettable music and performance.',
        date: '2024-06-15',
        time: '20:00',
        venue: 'MetLife Audiotorium, New Jersey',
        price: 300.00,
        location: 'New Jersey',
        category: 'Concert',
        imageUrl: 'https://media.allure.com/photos/64d3f22f081a221f0f610acc/16:9/w_1280,c_limit/beyonce%CC%81%20one%20size%20setting%20spray%20.jpg',
      },
      {
        id: '2',
        title: 'Hamlet',
        description: 'Experience Shakespeare’s classic play performed live.',
        date: '2024-07-01',
        time: '20:00',
        venue: 'Royal Theater, London',
        price: 40.00,
        location: 'London',
        category: 'theater',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWiTgWiFy4tTersjAnQazbCrJBHTj3vXI7aw&s',
      },
      {
        id: '3',
        title: 'Arijit Singh Live Concert',
        description: 'Experience the soulful voice of Arijit Singh live in concert.',
        date: '2024-07-15',
        time: '19:00',
        venue: 'New York Arena',
        price: 150.00,
        location: 'New York', // Added location
        category: 'Concert', // Added category
        imageUrl: 'https://i.ytimg.com/vi/K5jnC5tvjis/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAcMPSVhGCYHCd0z8IhkRJUQ0HSlg',
      },
      {
        id: '4',
        title: 'A Midsummer Night\'s Dream',
        description: 'Experience the magic of Shakespeare in this classic play.',
        date: '2024-08-15',
        time: '20:00',
        venue: 'Downtown Theater',
        price: 30.00,
        location: 'San Francisco',
        category: 'theater',
        imageUrl: 'https://thepac.net/wp-content/uploads/2023/08/Midsummer-logo-WEB.png',
      },
      {
        id: '5',
        title: 'Taylor Swift: The Eras Tour',
        description: 'Join Taylor Swift as she performs hits from all her albums.',
        date: '2024-08-01',
        time: '20:00',
        venue: 'MetLife Audiotorium, New Jersey',
        price: 250.00,
        location: 'New Jersey', // Added location
        category: 'Concert', // Added category
        imageUrl: 'https://ew.com/thmb/YgMWC7zpv8MvAWpKUnvGM-sUDe4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/taylor-swift-031823-01-2000-5efc5ff678ec42a8abdb1b7b4fd35486.jpg',
      },
      {
        id: '6',
        title: 'The Phantom of the Opera',
        description: 'A breathtaking performance of this classic musical.',
        date: '2024-09-15',
        time: '19:30',
        venue: 'Broadway Theater, New York',
        price: 100.00,
        location: 'New York',
        category: 'theater',
        imageUrl: 'https://seatplan.com/cdn/images/c/production/phantom-of-the-opera-hero-710wx355h-1695716387.webp',
      },
      {
        id: '7',
        title: 'Concert: Indie Music Festival',
        description: 'Discover new indie bands at this exciting festival.',
        date: '2022-11-9',
        time: '12:00',
        venue: 'Indie Hall, Austin',
        price: 25.00,
        location: 'Austin',
        category: 'concert',
        imageUrl: 'https://media.assettype.com/outlookindia/import/uploadimage/library/16_9/16_9_5/IMAGE_1667459432.webp?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true',
      },
      {
        id: '8',
        title: 'Les Misérables',
        description: 'Experience the powerful story of Les Misérables.',
        date: '2024-10-10',
        time: '18:00',
        venue: 'West End Theater, London',
        price: 60.00,
        location: 'London',
        category: 'theater',
        imageUrl: 'https://staticeu.sweet.tv/images/cache/horizontal_posters/BCYGYEQCMVXCAHJKAIEAE===/13872-les-miserables_.jpg',
      },
      {
        id: '9',
        title: 'Concert: Acoustic Evening',
        description: 'An intimate evening of acoustic performances by local artists.',
        date: '2024-10-20',
        time: '19:00',
        venue: 'Cafe, San Francisco',
        price: 20.00,
        location: 'San Francisco',
        category: 'concert',
        imageUrl: 'https://t4.ftcdn.net/jpg/08/52/43/17/360_F_852431753_mSZMX9iaxe7pIBjY4SB8pOwEc0qDR2iZ.jpg',
      },
      {
        id: '10',
        title: 'Romeo and Juliet',
        description: 'A timeless tale of love and tragedy performed live.',
        date: '2024-11-01',
        time: '19:30',
        venue: 'Shakespeare Theater, London',
        price: 45.00,
        location: 'London',
        category: 'theater',
        imageUrl: 'https://webapp2.wright.edu/web1/newsroom/files/2014/11/RomeoAndJuliet2.jpg',
      },
      {
        id: '11',
        title: 'Kanye West: Donda Tour',
        description: 'Catch Kanye West live on his Donda tour!',
        date: '2024-09-20',
        time: '20:00',
        venue: 'United Center, Chicago',
        price: 300.00,
        location: 'Chicago',
        category: 'Concert',
        imageUrl: 'https://www.usatoday.com/gcdn/-mm-/98c88f66dedc33e13e6cc28e741e44d38281b35f/c=0-0-2760-2075/local/-/media/2016/11/21/USATODAY/USATODAY/636153602053989898-538401266.jpg',
      },
      {
        id: '12',
        title: 'The Nutcracker',
        description: 'A magical ballet performance perfect for the holiday season.',
        date: '2024-12-01',
        time: '15:00',
        venue: 'Ballet Theater, Chicago',
        price: 50.00,
        location: 'Chicago',
        category: 'theater',
        imageUrl: 'https://nevadaballetorg-1faa6.kxcdn.com/wp-content/uploads/2024/06/NBT-TheNutcracker-TSC-Website-Image-864x490-1-1.jpg',
      },
      {
        id: '13',
        title: 'Concert: Classical Music Night',
        description: 'An evening of classical music performed by a symphony.',
        date: '2024-12-10',
        time: '19:30',
        venue: 'Concert Hall, San Francisco',
        price: 40.00,
        location: 'San Francisco',
        category: 'concert',
        imageUrl: 'https://www.eur.nl/sites/corporate/files/styles/open_graph/public/2024-01/20240411erasmus-classical-music-night-arie-kers-257.jpg?h=790be497&itok=BDE40yD6',
      },
      {
        id: '14',
        title: 'Wicked',
        description: 'Experience the untold story of the witches of Oz.',
        date: '2024-12-15',
        time: '19:00',
        venue: 'Broadway Theater, New York',
        price: 90.00,
        location: 'New York',
        category: 'theater',
        imageUrl: 'https://assets.aboutamazon.com/dims4/default/2bd9490/2147483647/strip/true/crop/1999x1125+1+0/resize/1240x698!/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2Fd2%2F86%2Faa2d0aa147c694f460aade5dafb2%2Faa-0110-wicked-standard-hero-v2-600kb-2000x1125.jpg',
      },
      {
        id: '15',
        title: 'Blanco: Live Performance',
        description: 'Experience Blanco live with his latest hits.',
        date: '2024-08-15',
        time: '19:00',
        venue: 'Hollywood Bowl, Los Angeles',
        price: 110.00,
        location: 'Los Angeles',
        category: 'Concert',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Blanco_White_am_Haldern_Pop_Festival_2019_-_04_-_Foto_Alexander_Kellner.jpg/1200px-Blanco_White_am_Haldern_Pop_Festival_2019_-_04_-_Foto_Alexander_Kellner.jpg',
      },
      {
        id: '16',
        title: 'The Lion King',
        description: 'A spectacular musical adaptation of the beloved film.',
        date: '2024-12-25',
        time: '15:00',
        venue: 'Broadway Theater, New York',
        price: 80.00,
        location: 'New York',
        category: 'theater',
        imageUrl: 'https://seatplan.com/cdn/images/show/lion-king-2024-hero-710wx355h-1722349692.jpg',
      },
      {
        id: '17',
        title: 'Anuv Jain: Live Performance',
        description: 'Join Anuv Jain for an evening of soothing melodies.',
        date: '2024-09-15',
        time: '20:00',
        venue: 'Indie Hall, Los Angeles',
        price: 90.00,
        location: 'Los Angeles',
        category: 'Concert',
        imageUrl: 'https://i.ytimg.com/vi/k24xkSr6Uos/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBox6dMQ0AHeoEcXGhpTY-yGzPrrw',
      },
      {
        id: '18',
        title: ' The Sound of Music',
        description: 'Join us for a delightful performance of this classic musical.',
        date: '2025-01-05',
        time: '19:00',
        venue: 'Theater Hall, Chicago',
        price: 50.00,
        location: 'Chicago',
        category: 'theater',
        imageUrl: 'https://i0.wp.com/kcstudio.org/wp-content/uploads/2023/10/music1.jpg?fit=1200%2C800&ssl=1',
      },
      {
        id: '18',
        title: 'Lucky Ali: The Live Concert',
        description: 'Experience the magic of Lucky Ali live.',
        date: '2024-08-10',
        time: '21:00',
        venue: 'Uranium Centre',
        price: 85.00,
        location: 'Chicago',
        category: 'Concert',
        imageUrl: 'https://www.noidadiary.in/wp-content/uploads/2023/02/image-1-1024x683.png',
      },
      {
        id: '20',
        title: 'The Wizard of Oz',
        description: 'A magical journey through the land of Oz.',
        date: '2025-01-25',
        time: '20:00',
        venue: 'Community Theater, Boston',
        price: 45.00,
        location: 'Boston',
        category: 'theater',
        imageUrl: 'https://everyonetheatres.com/wp-content/uploads/2024/10/1019b3dc-62e7-46e0-8b98-628caf20f265.jpg?v=1736824143',
      },
      {
        id: '21',
        title: 'Classical Guitar Evening',
        description: 'An intimate evening of classical guitar performances.',
        date: '2025-02-05',
        time: '19:00',
        venue: 'Guitar Hall, Nashville',
        price: 35.00,
        location: 'Nashville',
        category: 'concert',
        imageUrl: 'https://t3.ftcdn.net/jpg/10/02/10/94/360_F_1002109456_gnhhIXctlhyf1DY23uwPLUhOGzTPwWZA.jpg',
      },
];
const LOCATIONS = ['New York', 'San Francisco', 'Chicago', 'Los Angeles', 'Miami', 'Denver', 'Austin', 'Napa Valley', 'Boston', 'Seattle'];
const CATEGORIES = ['all', 'Theater', 'Concert','Theater'];
export default function EventPage() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const filteredEvents = EVENTS.filter(event => {
    const matchesPrice = event.price >= priceRange[0] && event.price <= priceRange[1];
    const matchesLocation = selectedLocation === 'all' || event.location === selectedLocation;
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesDate = !selectedDate || event.date === selectedDate;
    return matchesPrice && matchesLocation && matchesCategory && matchesDate;
  });
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 py-8"> {/* Updated background */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Upcoming Events</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-20 px-2 py-1 border rounded"
                    placeholder="Min"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-20 px-2 py-1 border rounded"
                    placeholder="Max"
                  />
                </div>
              </div>
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="all">All Locations</option>
                  {LOCATIONS.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          </div>
          {/* Event Cards Section */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Events ({filteredEvents.length})</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No events found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
     );
}