import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const suggestions = ['torvalds', 'gaearon', 'sindresorhus']
const Search = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSearch =() =>{
        if(!username.trim()){
            setError('Please enter a username');
            return;
        }
        setError('');
        navigate(`/users/${username.trim()}`);
    }
    const handleKeyDown = (e) => {
        if(e.key === 'Enter') handleSearch();
    }
  return (
    <div className='min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center px-4'>
      <h1 className='text-4xl font-bold text-gray-900 dark:text-white'>Github Analyzer</h1>
      <p className='text-gray-500 dark:text-gray-400 mb-8'>Search any github profile</p>
      <div className='flex gap-2 w-full max-w-md'>
        <input type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder='Enter a github username'
        className='flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button
        onClick={handleSearch}
        className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition'
        >Search</button>
      </div>
      {
        error && <p className="text-red-500 mt-2 text-sm">{error}</p>
      }
      <div className='flex gap-2 mt-6 flex-wrap justify-center'>
        {
        suggestions.map((sug) => (
            <button key={sug}
            onClick={() => navigate(`/users/${sug}`)}
            className='text-sm px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-blue-500 hover:text-blue-500 transition'
            >
                {sug}
            </button>
        ))
      }
      </div>
      
    </div>

  )
}

export default Search
