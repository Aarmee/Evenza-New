import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, MapPin, Clock, Star } from 'lucide-react';
import { Movie } from '../types'; // Ensure you have a Movie type defined
 // 3D model component

// Mock movie data
const MOCK_MOVIES: Movie[] = [
  {
      id: '1',
      title: 'Inception',
      description: 'A thief who steals corporate secrets through dream-sharing technology.',
      releaseDate: '2010-07-16',
      location: 'AMC Empire 25, New York',
      priceRange: '$10 - $20',
      imageUrl: 'https://musicart.xboxlive.com/7/806b5100-0000-0000-0000-000000000002/504/image.jpg',
      duration: '2h 28m',
      cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
      director: 'Christopher Nolan',
      language: 'English',
      rating: 8.8,
      genre: ['Sci-Fi', 'Thriller'],
      reviews: [
          { user: 'Alice', comment: 'Mind-bending and visually stunning!', rating: 9 },
          { user: 'Bob', comment: 'A masterpiece of modern cinema.', rating: 10 }
      ],
      posterUrl: undefined
  },
  {
    id: '2',
    title: 'Avatar',
    description: 'A paraplegic Marine dispatched to the moon Pandora on a unique mission.',
    releaseDate: '2009-12-18',
    location: 'AMC Theatres, Los Angeles',
    priceRange: '$12 - $25',
    imageUrl: 'https://i.ytimg.com/vi/4UhhjK9UJ5g/maxresdefault.jpg',
    duration: '2h 42m',
    cast: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver'],
    director: 'James Cameron',
    language: 'English',
    rating: 7.8,
    genre: ['Sci-Fi', 'Adventure'],
    reviews: [
      { user: 'Alice', comment: 'A visually stunning experience.', rating: 8 },
    ],
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b0/Avatar-Teaser-Poster.jpg'
},
{
    id: '3',
    title: '3 Idiots',
    description: 'Two friends search for their long-lost companion.',
    releaseDate: '2009-12-25',
    location: 'PVR Cinemas, Mumbai',
    priceRange: '$5 - $15',
    imageUrl: 'https://circle.youthop.com/wp-content/uploads/2021/07/3_Idiots.jpg',
    duration: '2h 50m',
    cast: ['Aamir Khan', 'R. Madhavan', 'Sharman Joshi'],
    director: 'Rajkumar Hirani',
    language: 'Hindi',
    rating: 8.4,
    genre: ['Comedy', 'Drama'],
    reviews: [
      { user: 'Charlie', comment: 'Heartwarming and hilarious!', rating: 9 },
      { user: 'Dave', comment: 'A must-watch for everyone.', rating: 8 }
    ],
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/6/68/3_idiots_poster.jpg'
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
    description: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',
    priceRange: '$10 - $20',
    location: 'IMAX Theatre, Gotham City',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/8/81/Dark_Knight.jpg'
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
    description: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal, and other historical events unfold through the perspective of an Alabama man.',
    priceRange: '$8 - $15',
    location: 'Regal Cinemas, Los Angeles',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg'
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
    description: 'A young couple falls in love during a trip to Europe, but their relationship faces challenges from their families.',
    priceRange: '₹200 - ₹500',
    location: 'PVR Cinemas, Mumbai',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/8/8c/Dilwale_Dulhania_Le_Jayenge.jpg'
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
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    priceRange: '$10 - $18',
    location: 'AMC Theaters, New York',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg'
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
    description: 'In Victorian India, a group of villagers stake their future on a game of cricket against their ruthless British rulers.',
    priceRange: '₹150 - ₹350',
    location: 'Cinepolis, Delhi',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/1/1c/Lagaan_poster.jpg'
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
      description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
      priceRange: '$10 - $25',
      location: 'Regal Cinemas, San Francisco',
      posterUrl: 'https://upload.wikimedia.org/wikipedia/en/8/8d/Gladiator_ver1.jpg'
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
      description: 'Three friends set out on a road trip to Spain, where they confront their fears and discover the true meaning of life.',
      priceRange: '₹200 - ₹600',
      location: 'PVR Cinemas, Mumbai',
      posterUrl: 'https://upload.wikimedia.org/wikipedia/en/4/43/Zindagi_Na_Milegi_Dobara_poster.jpg'
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
      description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
      priceRange: '$10 - $20',
      location: 'AMC Theaters, Los Angeles',
      posterUrl: 'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg'
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
      description: 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
      priceRange: '$12 - $25',
      location: 'Regal Cinemas, New York',
      posterUrl: 'https://upload.wikimedia.org/wikipedia/en/2/22/Titanic_poster.jpg'
    },
    {
      id: '13',
      title: 'Dangal',
      genre: ['Biography', 'Drama'],
      releaseDate: '2016-12-23',
      rating: 8.4,
      imageUrl: 'https://i.ytimg.com/vi/ebFbdg5U_Hw/maxresdefault.jpg',
      duration: '2h 41m',
      cast: ['Aamir Khan', 'Sakshi Tanwar', 'Fatima Sana Shaikh'],
      director: 'Nitesh Tiwari',
      language: 'Hindi',
      reviews: [
        { user: 'Omar', comment: 'A powerful message about women empowerment.', rating: 10 },
      ],
      description: 'Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle against the societal norms.',
      priceRange: '₹150 - ₹400',
      location: 'PVR Cinemas, Delhi',
      posterUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9e/Dangal_poster.jpg'
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
      description: 'An organized crime dynasty\'s aging patriarch transfers control of his clandestine empire to his reluctant son.',
      priceRange: '$10 - $20',
      location: 'AMC Theaters, New York',
      posterUrl: 'https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg'
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
      description: 'In the slums of Rio, two kids\' paths diverge as one struggles to become a photographer and the other a kingpin.',
      priceRange: '$8 - $15',
      location: 'Cinepolis, Rio de Janeiro',
      posterUrl: 'https://upload.wikimedia.org/wikipedia/en/8/8c/City_of_God_poster.jpg'
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
      description: 'As Harvard students create the social networking site that would become known as Facebook, they must deal with both personal and legal issues.',
      priceRange: '$10 - $18',
      location: 'AMC Theaters, San Francisco',
      posterUrl: 'https://upload.wikimedia.org/wikipedia/en/7/7c/The_Social_Network_poster.jpg'
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
      description: 'A bandit terrorizes a small village and two ex-convicts are hired to capture him.',
      priceRange: '₹200 - ₹500',
      location: 'PVR Cinemas, Delhi',
      posterUrl: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Sholay_poster.jpg'
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
      description: 'A struggling salesman takes custody of his son as he’s poised to begin a life-changing professional career.',
      priceRange: '$10 - $15',
      location: 'AMC Theaters, San Francisco',
      posterUrl: 'https://upload.wikimedia.org/wikipedia/en/8/81/The_Pursuit_of_Happyness.jpg'
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
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
      priceRange: '$12 - $20',
      location: 'IMAX Theatre, Los Angeles',
      posterUrl: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg'
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
      description: 'Lion cub Simba flees his kingdom after the death of his father, but returns as an adult to reclaim his throne.',
      priceRange: '$8 - $15',
      location: 'Disneyland Theatre, Anaheim',
      posterUrl: 'https://upload.wikimedia.org/wikipedia/en/6/6c/The_Lion_King_poster.jpg'
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
      description: 'The story of Gangubai, a young woman who becomes a powerful figure in Mumbai\'s underworld and fights for the rights of sex workers.',
      priceRange: '₹200 - ₹600',
      location: 'PVR Cinemas, Mumbai',
      posterUrl: 'https://upload.wikimedia.org/wikipedia/en/7/7f/Gangubai_Kathiawadi_poster.jpg'
    }
  
  
];

export default function MovieDetailPage() {
  const { id } = useParams();
  const [] = useState(false);

  // Find the movie based on the id from the URL
  const movie = MOCK_MOVIES.find(movie => movie.id === id);

  // If the movie is not found, handle it gracefully
  if (!movie) {
    return <p>Movie not found</p>;
  }

  return (
    <div className="container mx-auto py-8">
      {/* Movie Details */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <img src={movie.imageUrl} alt={movie.title} className="w-full md:w-1/3 rounded-lg" />

        {/* Details */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-lg">{movie.description}</p>

          {/* Release Date */}
          <div className="flex items-center gap-2">
            <Calendar />
            <span>{movie.releaseDate}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin />
            <span>{movie.location}</span>
          </div>

          {/* Price Range */}
          <div className="flex items-center gap-2">
            <Clock />
            <span>{movie.priceRange}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <Star />
            <span>{movie.rating} / 10</span>
          </div>

          {/* Cast */}
          <div>
            <h2 className="text-xl font-semibold">Cast</h2>
            <ul className="list-disc list-inside">
              {movie.cast.map(actor => (
                <li key={actor}>{actor}</li>
              ))}
            </ul>
          </div>

          {/* Director and Language */}
          <p>
            <strong>Director:</strong> {movie.director}
          </p>
          <p>
            <strong>Language:</strong> {movie.language}
          </p>
        </div>
      </div>
<button className="mt-6 w-1/2 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
  <Link to="/seat" className="w-full h-full flex items-center justify-center">
    Book Tickets
  </Link>
</button>

      
      </div>
    
  );
}
