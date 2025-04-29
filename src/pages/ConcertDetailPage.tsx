import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Concert } from '../types'; // Ensure this imports the correct Concert interface
import VenueModel from '../components/3d/VenueModel'; // Assuming you have this component for 3D view
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
// Sample concert data
const MOCK_CONCERTS: Concert[] = [
  {
      id: '1',
      title: 'Arijit Singh Live Concert',
      description: 'Experience the soulful voice of Arijit Singh live in concert.',
      date: '2024-07-15',
      time: '19:00',
      venue: 'Mumbai Arena',
      price: 150.00,
      location: 'Mumbai', // Added location
      category: 'Bollywood', // Added category
      imageUrl: 'https://i.ytimg.com/vi/K5jnC5tvjis/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAcMPSVhGCYHCd0z8IhkRJUQ0HSlg',
    },
    {
      id: '2',
      title: 'Taylor Swift: The Eras Tour',
      description: 'Join Taylor Swift as she performs hits from all her albums.',
      date: '2024-08-01',
      time: '20:00',
      venue: 'MetLife Stadium, New Jersey',
      price: 250.00,
      location: 'New Jersey', // Added location
      category: 'Pop', // Added category
      imageUrl: 'https://ew.com/thmb/YgMWC7zpv8MvAWpKUnvGM-sUDe4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/taylor-swift-031823-01-2000-5efc5ff678ec42a8abdb1b7b4fd35486.jpg',
    },
    {
      id: '3',
      title: 'Justin Bieber World Tour',
      description: 'Catch Justin Bieber live on his world tour!',
      date: '2024-09-10',
      time: '21:00',
      venue: 'Staples Center, Los Angeles',
      price: 200.00,
      location: 'Los Angeles', // Added location
      category: 'Pop', // Added category
      imageUrl: 'https://static-cdn.toi-media.com/www/uploads/2021/11/%D7%A4%D7%95%D7%A1%D7%98%D7%A8-%D7%A8%D7%99%D7%91%D7%95%D7%A2-e1636991772708.jpg',
    },
    {
      id: '4',
      title: 'Shreya Ghoshal: Live in Concert',
      description: 'A magical evening with the melodious Shreya Ghoshal.',
      date: '2024-08-15',
      time: '19:30',
      venue: 'Hyderabad International Centre',
      price: 120.00,
      location: 'Hyderabad', // Added location
      category: 'Bollywood', // Added category
      imageUrl: 'https://connector.ae/dynamicimages/SHREYYYY.jpg',
    },
    {
      id: '5',
      title: 'Diljit Dosanjh: Concert Tour',
      description: 'Join Diljit Dosanjh for an evening of Punjabi music and fun.',
      date: '2024-07-20',
      time: '20:00',
      venue: 'Punjab Cricket Association Stadium',
      price: 100.00,
      location: 'Punjab', // Added location
      category: 'Punjabi', // Added category
      imageUrl: 'https://media.assettype.com/freepressjournal/2024-09-14/0hzvk9ak/diljit.jpg',
    },
    {
      id: '6',
      title: 'Neha Kakkar: Live Performance',
      description: 'Don’t miss Neha Kakkar live with her chart-topping hits!',
      date: '2024-09-05',
      time: '18:00',
      venue: 'Delhi Indira Gandhi Stadium',
      price: 90.00,
      location: 'Delhi', // Added location
      category: 'Bollywood', // Added category
      imageUrl: 'https://curlytales.com/wp-content/uploads/2023/08/Neha-Kakkar-1.jpg',
    },
    {
      id: '7',
      title: 'Atif Aslam: Concert Night',
      description: 'A night filled with romantic hits by Atif Aslam.',
      date: '2024-08-30',
      time: '20:30',
      venue: 'Dubai Opera',
      price: 130.00,
      location: 'Dubai', // Added location
      category: 'Bollywood', // Added category
      imageUrl: 'https://eventmx.com/media/event_image/bDvKXNnQy2SCC9WjXVZwBy.jpg',
    },
    {
      id: '8',
      title: 'Darshan Raval: Live in Concert',
      description: 'Join Darshan Raval for an unforgettable evening of music.',
      date: '2024-07-25',
      time: '19:00',
      venue: 'Bangalore International Centre',
      price: 85.00,
      location: 'Bangalore', // Added location
      category: 'Bollywood', // Added category
      imageUrl: 'https://images.t2online.in/cdn-cgi/image/width=1280,quality=70/https://apis.t2online.in/image/journal/article.jpg?img_id=788773&t=1708937081067',
    },
    {
      id: '9',
      title: 'Lana Del Rey: The Tour',
      description: 'Experience the enchanting voice of Lana Del Rey live.',
      date: '2024-09-15',
      time: '20:00',
      venue: 'Hollywood Bowl',
      price: 220.00,
      location: 'Los Angeles', // Added location
      category: 'Pop', // Added category
      imageUrl: 'https://i.redd.it/best-lana-del-rey-concert-show-opener-v0-rwugjxoxir9d1.jpg?width=2005&format=pjpg&auto=webp&s=64cad64efbe42787d21e40202276bf611437504d',
    },
    {
      id: '10',
      title: 'Selena Gomez: Revival Tour',
      description: 'Don’t miss Selena Gomez performing her greatest hits live.',
      date: '2024-08-20',
      time: '21:00',
      venue: 'United Center, Chicago',
      price: 180.00,
      location: 'Chicago', // Added location
      category: 'Pop', // Added category
      imageUrl: 'https://people.com/thmb/B6t2ALjscjlLuOWrfoVJn91aYwA=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/selena-gomez-who-says-almost-went-to-another-artist-082423-01-6879eb5f5eee444a81dea7a7fc815a66.jpg',
    },
    {
        id: '11',
        title: 'Beyoncé: World Tour',
        description: 'Join Beyoncé for a night of unforgettable music and performance.',
        date: '2024-06-15',
        time: '20:00',
        venue: 'MetLife Stadium, New Jersey',
        price: 300.00,
        location: 'New Jersey',
        category: 'Pop',
        imageUrl: 'https://media.allure.com/photos/64d3f22f081a221f0f610acc/16:9/w_1280,c_limit/beyonce%CC%81%20one%20size%20setting%20spray%20.jpg',
      },
      {
        id: '12',
        title: 'Sunidhi Chauhan Live',
        description: 'Experience the powerful voice of Sunidhi Chauhan live in concert.',
        date: '2024-07-20',
        time: '19:30',
        venue: 'Jawaharlal Nehru Stadium, Delhi',
        price: 120.00,
        location: 'Delhi',
        category: 'Bollywood',
        imageUrl: 'https://cdn.thevoiceoffashion.com/article_images/6603c0bc84d71.jpg',
      },
      {
        id: '13',
        title: 'Sonu Nigam: The Voice of India',
        description: 'A magical evening with the legendary Sonu Nigam.',
        date: '2024-08-01',
        time: '21:00',
        venue: 'Kshetra Dharmasthala, Karnataka',
        price: 150.00,
        location: 'Karnataka',
        category: 'Bollywood',
        imageUrl: 'https://www.hindustantimes.com/ht-img/img/2024/05/18/original/sonu_5_1716029302076.jpeg',
      },
      {
        id: '14',
        title: 'Billie Eilish: Happy World Tour',
        description: 'Catch Billie Eilish live as she performs her latest hits.',
        date: '2024-09-10',
        time: '20:00',
        venue: 'Hollywood Bowl, Los Angeles',
        price: 250.00,
        location: 'Los Angeles',
        category: 'Pop',
        imageUrl: 'https://people.com/thmb/rP6M7tImRkDDeyUtIQ37LHj3-_w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/billie-eilish-tout-121724-009a6798cb9c4db28ecad4f7836e7363.jpg',
      },
      {
        id: '15',
        title: 'Papon: The Live Concert',
        description: 'Join Papon for a night filled with soulful music.',
        date: '2024-07-30',
        time: '19:00',
        venue: 'Indira Gandhi Stadium, Guwahati',
        price: 100.00,
        location: 'Guwahati',
        category: 'Bollywood',
        imageUrl: 'https://assets-in.bmscdn.com/discovery-catalog/events/et00440322-ubfeysvyxw-landscape.jpg',
      },
      {
        id: '16',
        title: 'Kailash Kher: Live in Concert',
        description: 'A night of spiritual and folk music with Kailash Kher.',
        date: '2024-08-25',
        time: '19:30',
        venue: 'Mahatma Mandir, Gandhinagar',
        price: 130.00,
        location: 'Gandhinagar',
        category: 'Bollywood',
        imageUrl: 'https://www.myfirstevent.com/wp-content/uploads/2018/12/kailash-kher-live-concert.png',
      },
      {
        id: '17',
        title: 'Anuv Jain: Live Performance',
        description: 'Join Anuv Jain for an evening of soothing melodies.',
        date: '2024-09-15',
        time: '20:00',
        venue: 'Indira Gandhi Stadium, Delhi',
        price: 90.00,
        location: 'Delhi',
        category: 'Indie',
        imageUrl: 'https://i.ytimg.com/vi/k24xkSr6Uos/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBox6dMQ0AHeoEcXGhpTY-yGzPrrw',
      },
      {
        id: '18',
        title: 'Lucky Ali: The Live Concert',
        description: 'Experience the magic of Lucky Ali live.',
        date: '2024-08-10',
        time: '21:00',
        venue: 'Bangalore International Centre',
        price: 85.00,
        location: 'Bangalore',
        category: 'Bollywood',
        imageUrl: 'https://www.noidadiary.in/wp-content/uploads/2023/02/image-1-1024x683.png',
      },
      {
        id: '19',
        title: 'Kanye West: Donda Tour',
        description: 'Catch Kanye West live on his Donda tour!',
        date: '2024-09-20',
        time: '20:00',
        venue: 'United Center, Chicago',
        price: 300.00,
        location: 'Chicago',
        category: 'Hip Hop',
        imageUrl: 'https://www.usatoday.com/gcdn/-mm-/98c88f66dedc33e13e6cc28e741e44d38281b35f/c=0-0-2760-2075/local/-/media/2016/11/21/USATODAY/USATODAY/636153602053989898-538401266.jpg',
      },
      {
        id: '20',
        title: 'Armaan Malik: Live in Concert',
        description: 'Join Armaan Malik for an unforgettable musical experience.',
        date: '2024-08-28',
        time: '20:30',
        venue: 'Dubai World Trade Centre',
        price: 140.00,
        location: 'Dubai',
        category: 'Bollywood',
        imageUrl: 'https://www.fridaywall.com/wp-content/uploads/2024/05/WhatsApp-Image-2024-05-27-at-23.48.13.jpeg',
      },
      {
        id: '21',
        title: 'Blanco: Live Performance',
        description: 'Experience Blanco live with his latest hits.',
        date: '2024-08-15',
        time: '19:00',
        venue: 'Hollywood Bowl, Los Angeles',
        price: 110.00,
        location: 'Los Angeles',
        category: 'Pop',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Blanco_White_am_Haldern_Pop_Festival_2019_-_04_-_Foto_Alexander_Kellner.jpg/1200px-Blanco_White_am_Haldern_Pop_Festival_2019_-_04_-_Foto_Alexander_Kellner.jpg',
      },
];
export default function ConcertDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [showAR, setShowAR] = useState<boolean>(false);
  
  // Find the concert based on the id from the URL
  const concert = MOCK_CONCERTS.find(concert => concert.id === id);
  // If the concert is not found, handle it gracefully
  if (!concert) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center">Concert Not Found</h1>
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
              src={concert.imageUrl}
              alt={concert.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-8 text-white">
                <h1 className="text-4xl font-bold mb-2">{concert.title}</h1>
                <p className="text-lg">{concert.description}</p>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Concert Details</h2>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{concert.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{concert.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{concert.venue}, {concert.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-bold">Price: ${concert.price.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-bold">Category: {concert.category}</span>
                  </div>
                </div>
                <div className="mt-6">
                  <Link 
                    to={'/concertseat'} 
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