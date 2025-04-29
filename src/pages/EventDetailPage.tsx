import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Link, useParams } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';
import VenueModel from '../components/3d/VenueModel';
import { Event } from '../types'; // Ensure this imports the correct Event interface


const MOCK_EVENTS: Event[] = [
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
export default function EventDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [showAR, setShowAR] = useState<boolean>(false);
    // Find the event based on the id from the URL
    const event = MOCK_EVENTS.find(event => event.id === id);
    // If the event is not found, handle it gracefully
    if (!event) {
      return (
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-center">Event Not Found</h1>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-96">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <div className="p-8 text-white">
                  <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
                  <p className="text-lg">{event.description}</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Event Details</h2>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{event.venue}, {event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="font-bold">Price: ${event.price.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="font-bold">Category: {event.category}</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link 
                      to={'/seat'} // Adjust the link as needed
                      className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Book Tickets
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="bg-gray-100 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold">Venue View</h3>
                      <button
                        onClick={() => setShowAR(!showAR)}
                        className="text-indigo-600 hover:text-indigo-700"
                      >
                        {showAR ? 'Hide 3D View' : 'Show 3D View'}
                      </button>
                    </div>
                    {showAR && (
                      <div className="h-[400px] rounded-lg overflow-hidden">
                        <Canvas>
                          <Suspense fallback={null}>
                            <PerspectiveCamera makeDefault position={[0, 2, 5]} />
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} />
                            <VenueModel selectedSection={''} /> {/* Assuming VenueModel is a component rendering the venue */}
                            <OrbitControls />
                          </Suspense>
                        </Canvas>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }