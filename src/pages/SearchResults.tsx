import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Event } from '../types';

const SearchResults = () => {
  const [results, setResults] = useState<Event[]>([]);
  const location = useLocation();

  // Extract the search query from the URL
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query) {
      axios
        .get(`/api/events?search=${query}`)
        .then((response) => {
          console.log(response.data); // Debug the response
          setResults(Array.isArray(response.data) ? response.data : []); // Ensure it's an array
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
          setResults([]); // Reset results on error
        });
    }
  }, [query]);

  return (
    <div>
      <h1>Search Results</h1>
      {Array.isArray(results) && results.length > 0 ? (
        <ul>
          {results.map((event) => (
            <li key={event.id}>{event.title}</li>
          ))}
        </ul>
      ) : (
        <p>No results found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchResults;