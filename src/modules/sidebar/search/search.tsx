import React from "react";

interface SearchProps {
  query: string;
  setQuery: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ query, setQuery }) => {
  return (
    <div className="p-3 border-b border-gray-100">
      <input
        type="text"
        placeholder="Поиск..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>
  );
};

export default Search;
