import { Link } from 'react-router-dom';
import { Movie } from '../types';
import { format } from 'date-fns';
// Sample movie data
const MOVIES: Movie[] = [
  {
    id: '1',
    title: 'Inception',
    genre: ['Sci-Fi', 'Thriller'],
    releaseDate: '2010-07-16',
    rating: 8.8,
    imageUrl: 'https://musicart.xboxlive.com/7/806b5100-0000-0000-0000-000000000002/504/image.jpg',
    duration: '2h 28m',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
    director: 'Christopher Nolan',
    language: 'English',
    reviews: [
      { user: 'Alice', comment: 'Mind-bending and visually stunning!', rating: 9 },
      { user: 'Bob', comment: 'A masterpiece of modern cinema.', rating: 10 }
    ],
    description: undefined,
    priceRange: undefined,
    location: undefined,
    posterUrl: undefined
  },
  {
    id: '2',
    title: 'Avatar',
    genre: ['Sci-Fi', 'Adventure'],
    releaseDate: '2009-12-18',
    rating: 7.8,
    imageUrl: 'https://i.ytimg.com/vi/4UhhjK9UJ5g/maxresdefault.jpg',
    duration: '2h 42m',
    cast: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver'],
    director: 'James Cameron',
    language: 'English',
    reviews: [
      { user: 'Alice', comment: 'A visually stunning experience.', rating: 8 },
    ],
    description: undefined,
    priceRange: undefined,
    location: undefined,
    posterUrl: undefined
  },
  {
    id: '3',
    title: '3 Idiots',
    genre: ['Comedy', 'Drama'],
    releaseDate: '2009-12-25',
    rating: 8.4,
    imageUrl: 'https://circle.youthop.com/wp-content/uploads/2021/07/3_Idiots.jpg',
    duration: '2h 50m',
    cast: ['Aamir Khan', 'R. Madhavan', 'Sharman Joshi'],
    director: 'Rajkumar Hirani',
    language: 'Hindi',
    reviews: [
      { user: 'Charlie', comment: 'Heartwarming and hilarious!', rating: 9 },
      { user: 'Dave', comment: 'A must-watch for everyone.', rating: 8 }
    ],
    description: undefined,
    priceRange: undefined,
    location: undefined,
    posterUrl: undefined
  },
  {
    id: '4',
    title: 'The Dark Knight',
    genre: ['Action', 'Crime'],
    releaseDate: '2008-07-18',
    rating: 9.0,
    imageUrl: 'https://i0.wp.com/egreg.io/wp-content/uploads/bat.jpg?fit=640%2C333&ssl=1',
    duration: '2h 32m',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    director: 'Christopher Nolan',
    language: 'English',
    reviews: [
      { user: 'Emma', comment: 'A thrilling experience!', rating: 10 },
    ],
    description: undefined,
    priceRange: undefined,
    location: undefined,
    posterUrl: undefined
  },
  {
    id: '5',
    title: 'Forrest Gump',
    genre: ['Drama', 'Romance'],
    releaseDate: '1994-07-06',
    rating: 8.8,
    imageUrl: 'https://ntvb.tmsimg.com/assets/p15829_v_h8_aw.jpg?w=960&h=540',
    duration: '2h 22m',
    cast: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
    director: 'Robert Zemeckis',
    language: 'English',
    reviews: [
      { user: 'Frank', comment: 'A beautiful story about life.', rating: 9 },
    ],
    description: undefined,
    priceRange: undefined,
    location: undefined,
    posterUrl: undefined
  },
  {
    id: '6',
    title: 'Dilwale Dulhania Le Jayenge',
    genre: ['Romance', 'Drama'],
    releaseDate: '1995-10-20',
    rating: 8.1,
    imageUrl: 'https://assets-in.bmscdn.com/discovery-catalog/events/et00000652-tqhcmfkywc-landscape.jpg',
    duration: '3h 9m',
    cast: ['Shah Rukh Khan', 'Kajol', 'Amrish Puri'],
    director: 'Aditya Chopra',
    language: 'Hindi',
    reviews: [
      { user: 'Geeta', comment: 'A classic love story!', rating: 10 },
    ],
    description: undefined,
    priceRange: undefined,
    location: undefined,
    posterUrl: undefined
  },
  {
    id: '7',
    title: 'The Shawshank Redemption',
    genre: ['Drama'],
    releaseDate: '1994-09-23',
    rating: 9.3,
    imageUrl: 'https://justalrightreviews.com/wp-content/uploads/2016/07/the-shawshank-redemption.png?w=940',
    duration: '2h 22m',
    cast: ['Tim Robbins', 'Morgan Freeman', 'William Sadler'],
    director: 'Frank Darabont',
    language: 'English',
    reviews: [
      { user: 'Hannah', comment: 'An inspiring story of hope.', rating: 10 },
    ],
    description: undefined,
    priceRange: undefined,
    location: undefined,
    posterUrl: undefined
  },
  {
    id: '8',
    title: 'Lagaan',
    genre: ['Drama', 'History'],
    releaseDate: '2001-06-15',
    rating: 8.1,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BNGYzOTk3NjAtM2Y1Ni00OGY2LTlhNTktZDNlMmYxZWYxMTc5XkEyXkFqcGc@._V1_.jpg',
    duration: '3h 4m',
    cast: ['Aamir Khan', 'Gracy Singh', 'Raj Zutshi'],
    director: 'Ashutosh Gowariker',
    language: 'Hindi',
    reviews: [
      { user: 'Irfan', comment: 'An epic tale of resilience.', rating: 9 },
    ],
    description: undefined,
    priceRange: undefined,
    location: undefined,
    posterUrl: undefined
  },
  {
    id: '9',
    title: 'Gladiator',
    genre: ['Action', 'Drama'],
    releaseDate: '2000-05-05',
    rating: 8.5,
    imageUrl: 'https://ntvb.tmsimg.com/assets/p24674_v_h8_ah.jpg?w=960&h=540',
    duration: '2h 35m',
    cast: ['Russell Crowe', 'Joaquin Phoenix', 'Connie Nielsen'],
    director: 'Ridley Scott',
    language: 'English',
    reviews: [
      { user: 'Jack', comment: 'A powerful story with amazing visuals.', rating: 10 },
    ],
    description: undefined,
    priceRange: undefined,
    location: undefined,
    posterUrl: undefined
  },
  {
    id: '10',
    title: 'Zindagi Na Milegi Dobara',
    genre: ['Drama', 'Adventure'],
    releaseDate: '2011-07-15',
    rating: 8.1,
    imageUrl: 'https://i.ytimg.com/vi/gxi5dYCCios/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDgXYlOrFsvfeRdddXDEC56ptx0tQ',
    duration: '2h 35m',
    cast: ['Hrithik Roshan', 'Farhan Akhtar', 'Abhay Deol'],
    director: 'Zoya Akhtar',
    language: 'Hindi',
    reviews: [
      { user: 'Lina', comment: 'A beautiful journey of friendship.', rating: 9 },
    ],
    description: undefined,
    priceRange: undefined,
    location: undefined,
    posterUrl: undefined
  },
  {
    id: '11',
    title: 'The Matrix',
    genre: ['Sci-Fi', 'Action'],
    releaseDate: '1999-03-31',
    rating: 8.7,
    imageUrl: 'https://popcult.blog/wp-content/uploads/2021/12/matrix-banner.png',
    duration: '2h 16m',
    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
    director: 'The Wachowskis',
    language: 'English',
    reviews: [
      { user: 'Mark', comment: 'A revolutionary film!', rating: 10 },
    ],
    description: undefined,
    priceRange: undefined,
    location: undefined,
    posterUrl: undefined
  },
  {
    id: '12',
    title: 'Titanic',
    genre: ['Drama', 'Romance'],
    releaseDate: '1997-12-19',
    rating: 7.8,
    imageUrl: 'https://i.ytimg.com/vi/A1FtRovJMxk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDSDRGU7c9EGMuHNqhR9nbWEfFrrg',
    duration: '3h 14m',
    cast: ['Leonardo DiCaprio', 'Kate Winslet', 'Billy Zane'],
    director: 'James Cameron',
    language: 'English',
    reviews: [
      { user: 'Nina', comment: 'An epic love story.', rating: 9 },
    ],
    description: undefined,
    priceRange: undefined,
    location: undefined,
    posterUrl: undefined
  },
  {
    id: '13',
    title: 'Dangal',
    genre: ['Biography', 'Drama'],
    releaseDate: '2016-12-23',
    rating: 8.4,
    imageUrl: 'https://i.ytimg.com/vi/ebFbdg5U_Hw/maxresdefault.jpg',
    cast: ['Aamir Khan', 'Sakshi Tanwar', 'Fatima Sana Shaikh'],
    director: 'Nitesh Tiwari',
    language: 'Hindi',
    reviews: [
      { user: 'Omar', comment: 'A powerful message about women empowerment.', rating: 10 },
    ],
    description: undefined,
    priceRange: undefined,
    location: undefined,
    posterUrl: undefined,
    duration: ''
  },
  {
    id: '14',
    title: 'The Godfather',
    genre: ['Crime', 'Drama'],
    releaseDate: '1972-03-24',
    rating: 9.2,
    imageUrl: 'https://nevadanewsgroup.media.clients.ellingtoncms.com/img/photos/2024/11/05/godfather_t670.jpg?b3f6a5d7692ccc373d56e40cf708e3fa67d9af9d',
    duration: '2h 55m',
    cast: ['Marlon Brando', 'Al Pacino', 'James Caan'],
    director: 'Francis Ford Coppola',
    language: 'English',
    reviews: [
      { user: 'Paul', comment: 'A cinematic masterpiece.', rating: 10 },
    ],
    description: undefined,
    priceRange: undefined,
    location: undefined,
    posterUrl: undefined
  },
  {
    id: '15',
    title: 'City of God',
    genre: ['Crime', 'Drama'],
    releaseDate: '2002-02-08',
    rating: 8.6,
    imageUrl: 'https://th-i.thgim.com/public/entertainment/movies/9rpy9o/article68417353.ece/alternates/LANDSCAPE_1200/GSsVeUtbwAA1_0a.jfif',
    duration: '2h 10m',
    cast: ['Alexandre Rodrigues', 'Leandro Firmino', 'Phellipe Haagensen'],
    director: 'Fernando Meirelles',
    language: 'Portuguese',
    reviews: [
      { user: 'Rita', comment: 'A powerful portrayal of life in the favelas.', rating: 9 },
    ],
    description: undefined,
    priceRange: undefined,
    location: undefined,
    posterUrl: undefined
  },
  {
    id: '16',
    title: 'The Social Network',
    genre: ['Biography', 'Drama'],
    releaseDate: '2010-10-01',
    rating: 7.7,
    imageUrl: 'https://i.ytimg.com/vi/bynULuoHi98/maxresdefault.jpg',
    duration: '2h 0m',
    cast: ['Jesse Eisenberg', 'Andrew Garfield', 'Justin Timberlake'],
    director: 'David Fincher',
    language: 'English',
    reviews: [
      { user: 'Sara', comment: 'A gripping story about ambition and betrayal.', rating: 8 },
    ],
    description: undefined,
    priceRange: undefined,
    location: undefined,
    posterUrl: undefined
  },
  {
    id: '17',
    title: 'Sholay',
    genre: ['Action', 'Adventure'],
    releaseDate: '1975-08-15',
    rating: 8.2,
    imageUrl: 'https://play-lh.googleusercontent.com/xVlWJUECu8i5XmGXs55mSXg7XAS510Fk0cOXLmaw_M8TFKT_HGRFSOMdRQA2CoiZDRKP3afoMdblSYuwgQI=s1280-w1280-h720',
    duration: '3h 0m',
    cast: ['Amitabh Bachchan', 'Dharmendra', 'Hema Malini'],
    director: 'Ramesh Sippy',
    language: 'Hindi',
    reviews: [
      { user: 'Anil', comment: 'A timeless classic!', rating: 10 },
    ],
    description: undefined,
    priceRange: undefined,
    location: undefined,
    posterUrl: undefined
  },
  {
    id: '18',
    title: 'Pursuit of Happyness',
    genre: ['Biography', 'Drama'],
    releaseDate: '2006-12-15',
    rating: 8.0,
    imageUrl: 'https://i.ytimg.com/vi/S29oVPMQ4QA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDOsnwbmyTE1RyR21p6iPZDHRUeag',
    duration: '1h 57m',
    cast: ['Will Smith', 'Jaden Smith', 'Thandie Newton'],
    director: 'Gabriele Muccino',
    language: 'English',
    reviews: [
      { user: 'Tom', comment: 'An inspiring story about perseverance.', rating: 9 },
    ],
    description: undefined,
    priceRange: undefined,
    location: undefined,
    posterUrl: undefined
  },
  {
    id: '19',
    title: 'Interstellar',
    genre: ['Sci-Fi', 'Adventure'],
    releaseDate: '2014-11-07',
    rating: 8.6,
    imageUrl: 'https://i.imgur.com/3ZH4ZZ8.jpg',
    duration: '2h 49m',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    director: 'Christopher Nolan',
    language: 'English',
    reviews: [
      { user: 'Jake', comment: 'A mind-blowing journey through space and time.', rating: 10 },
    ],
    description: undefined,
    priceRange: undefined,
    location: undefined,
    posterUrl: undefined
  },
  {
    id: '20',
    title: 'The Lion King',
    genre: ['Animation', 'Adventure'],
    releaseDate: '1994-06-15',
    rating: 8.5,
    imageUrl: 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/6E3379DBFDA41CF305BFD7FE6D14FDB5F901F0CDC9B27C66D7E6FBEA2864B4F2/scale?width=1200&aspectRatio=1.78&format=webp',
    duration: '1h 28m',
    cast: ['Matthew Broderick', 'James Earl Jones', 'Jeremy Irons'],
    director: 'Roger Allers',
    language: 'English',
    reviews: [
      { user: 'Lily', comment: 'A timeless classic for all ages.', rating: 10 },
    ],
    description: undefined,
    priceRange: undefined,
    location: undefined,
    posterUrl: undefined
  },
  {
    id: '21',
    title: 'Gangubai Kathiawadi',
    genre: ['Biography', 'Drama'],
    releaseDate: '2022-02-25',
    rating: 7.1,
    imageUrl: 'https://i.cdn.newsbytesapp.com/images/l78820221203130002.jpeg',
    duration: '2h 32m',
    cast: ['Alia Bhatt', 'Ajay Devgn', 'Vijay Raaz'],
    director: 'Sanjay Leela Bhansali',
    language: 'Hindi',
    reviews: [
      { user: 'Riya', comment: 'Alia Bhatt delivers a stellar performance!', rating: 9 },
      { user: 'Rahul', comment: 'A powerful story of resilience and strength.', rating: 8 }
    ],
    description: undefined,
    priceRange: undefined,
    location: undefined,
    posterUrl: undefined
  },
];
export default function MoviesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Movies</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOVIES.map(movie => (
            <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={movie.imageUrl} alt={movie.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{movie.title}</h2>
                <p className="text-sm text-gray-500">{format(new Date(movie.releaseDate), 'MMMM dd, yyyy')}</p>
                <p className="mt-2 text-sm text-gray-600">Genre: {movie.genre.join(', ')}</p>
                <p className="text-sm text-gray-600">Rating: {movie.rating}</p>
                <Link to={`/movies/${movie.id}`} className="mt-4 inline-block bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}