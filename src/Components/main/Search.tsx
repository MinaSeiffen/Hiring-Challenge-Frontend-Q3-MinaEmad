import React from 'react'

function Search({search, setSearch}: {search: string, setSearch: React.Dispatch<React.SetStateAction<string>>}) {
  return (
    <input
        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        placeholder="🔍 Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />
  )
}

export default Search