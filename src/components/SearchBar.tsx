import React, { useState } from 'react';
import { Search } from 'lucide-react';
interface SearchBarProps {
  onSearch: (query: string) => void;
}
export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query); // Call the onSearch function with the current query
  };
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for events..."
          className="w-full px-4 py-3 pl-12 pr-4 text-gray-700 bg-white border rounded-lg focus:border-indigo-600 focus:outline-none"
        />
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
      </div>
    </form>
  );
}