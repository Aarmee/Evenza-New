import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Calendar } from 'lucide-react';
import { Movie } from '../types';
interface MovieCardProps {
  movie: Movie;
}
export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link to={`/movies/${movie.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-105"> {/* Scale effect on hover */}
        <div className="relative">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-110" // Scale effect for the image
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-white font-medium">{movie.rating}/10</span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{movie.title}</h3>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              <span className="text-sm">{movie.duration}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-sm">{movie.releaseDate}</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {movie.genre.map((genre, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
          <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
            Book Tickets
          </button>
        </div>
      </div>
    </Link>
  );
}