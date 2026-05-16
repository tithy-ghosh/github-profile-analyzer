import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import githubIcon from '../assets/github.png'
const suggestions = ['torvalds', 'gaearon', 'sindresorhus', 'addyosmani'];
const Search = () => {
   const [input, setInput] = useState('');
   const [error, setError] = useState('');
   const navigate = useNavigate();

   const handleSearch = () => {
    const username = name || input.trim();
    if(!username){
      setError('Please enter a username');
      return
    }
    setError('');
    navigate(`/users/${username}`);
   }
   return (
    <div className='min-h-[85vh] flex flex-col items-center justify-center px-4'>
      {/* Github Icon */}
      <div className='mb-4'>
        <img src={githubIcon} alt="Github Icon" className="w-16 h-16" />
      </div>

      {/* Title */}
      <h1 className='text-3xl font-bold text-gray-800 dark:text-white mb-2'>Github Profile Analyzer</h1>

      {/* Subtitle */}
      <p className='text-gray-500 dark:text-gray-400 mb-8'>Search any github username to explore their profile, repositories, and activities</p>

      {/* Search Input and buttons */}
      <div className='flex gap-2 w-full max-w-md'>
        <input type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' &&handleSearch()}
        placeholder='Enter a github username....'
        className='flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
        />
        <button
        onClick={() => handleSearch()}
        className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-colors font-medium'
        >Search</button>
      </div>

      {/* Error message */}
      {
        error && <p className="text-red-500 mt-2 text-sm">{error}</p>
      }

      {/* Suggestions buttons */}
      <div className='items-center flex gap-2 mt-6 flex-wrap justify-center'>
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
