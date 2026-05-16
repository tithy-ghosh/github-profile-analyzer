import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import githubIcon from '../assets/github.png'
import useSearchHistory from '../hooks/useSearchHistory'

const suggestions = ['torvalds', 'gaearon', 'sindresorhus', 'addyosmani']

const Search = () => {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [focused, setFocused] = useState(false)
  const navigate = useNavigate()
  const { history, addSearch, clearHistory } = useSearchHistory()

  const handleSearch = (username = null) => {
    const searchTerm = (username || input).trim()
    if (!searchTerm) {
      setError('Please enter a GitHub username')
      return
    }
    setError('')
    addSearch(searchTerm)
    navigate(`/users/${searchTerm}`)
  }

  return (
    <div className='min-h-[90vh] flex flex-col items-center justify-center px-4 py-12'>

      {/* Hero section */}
      <div className='text-center mb-10 animate-fade-in'>

        {/* Icon with glow */}
        <div className='relative inline-flex mb-6'>
          <div className='absolute inset-0 bg-blue-500/30 dark:bg-blue-400/20 rounded-full blur-2xl scale-150' />
          <div className='relative bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10
                          rounded-2xl p-4 shadow-xl shadow-blue-500/10'>
            <img src={githubIcon} alt='GitHub' className='w-12 h-12' />
          </div>
        </div>

        {/* Headline */}
        <h1 className='text-4xl sm:text-5xl font-extrabold tracking-tight mb-3'>
          <span className='text-gray-900 dark:text-white'>GitHub </span>
          <span className='bg-gradient-to-r from-blue-600 via-blue-500 to-violet-500
                           dark:from-blue-400 dark:via-blue-300 dark:to-violet-400
                           bg-clip-text text-transparent'>
            Profile Analyzer
          </span>
        </h1>

        <p className='text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-md mx-auto leading-relaxed'>
          Explore any developer's repositories, languages, and activity at a glance.
        </p>
      </div>

      {/* Search box */}
      <div className='w-full max-w-lg'>
        <div className={`relative flex items-center rounded-2xl transition-all duration-300
          bg-white dark:bg-white/[0.04]
          border-2 ${focused
            ? 'border-blue-500 dark:border-blue-400 shadow-lg shadow-blue-500/15 dark:shadow-blue-400/10'
            : 'border-gray-200 dark:border-white/10 shadow-md shadow-black/5'
          }`}>

          {/* Search icon */}
          <div className='pl-4 pr-2 text-gray-400 dark:text-gray-500 flex-shrink-0'>
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
            </svg>
          </div>

          <input
            type='text'
            value={input}
            onChange={(e) => { setInput(e.target.value); setError('') }}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder='Enter a GitHub username...'
            className='flex-1 bg-transparent py-3.5 px-2 text-gray-900 dark:text-white
                       placeholder-gray-400 dark:placeholder-gray-500
                       focus:outline-none text-sm sm:text-base'
          />

          <button
            onClick={() => handleSearch()}
            className='m-1.5 px-5 py-2.5 rounded-xl font-semibold text-sm
                       bg-blue-600 hover:bg-blue-700
                       text-white shadow-md shadow-blue-500/20
                       transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0'>
            Search
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className='mt-2.5 text-sm text-red-500 dark:text-red-400 flex items-center gap-1.5 pl-1'>
            <svg className='w-4 h-4 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
            </svg>
            {error}
          </p>
        )}
      </div>

      {/* Suggestions */}
      <div className='mt-6 flex flex-col items-center gap-2'>
        <p className='text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-medium'>
          Try these
        </p>
        <div className='flex flex-wrap gap-2 justify-center'>
          {suggestions.map((sug) => (
            <button
              key={sug}
              onClick={() => handleSearch(sug)}
              className='px-4 py-1.5 rounded-full text-sm font-medium
                         bg-white dark:bg-white/[0.04]
                         border border-gray-200 dark:border-white/10
                         text-gray-600 dark:text-gray-300
                         hover:border-blue-400 dark:hover:border-blue-500
                         hover:text-blue-600 dark:hover:text-blue-400
                         hover:bg-blue-50 dark:hover:bg-blue-500/10
                         shadow-sm transition-all duration-200 hover:scale-105 active:scale-95'>
              {sug}
            </button>
          ))}
        </div>
      </div>

      {/* Search history */}
      {history.length > 0 && (
        <div className='w-full max-w-lg mt-10'>
          <div className='bg-white/70 dark:bg-white/[0.03] backdrop-blur-sm
                          border border-stone-200/80 dark:border-white/[0.06]
                          rounded-2xl p-4 shadow-sm'>
            <div className='flex items-center justify-between mb-3'>
              <div className='flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300'>
                <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                    d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                Recent searches
              </div>
              <button
                onClick={clearHistory}
                className='text-xs text-gray-400 hover:text-red-500 dark:hover:text-red-400
                           transition-colors duration-200 font-medium'>
                Clear all
              </button>
            </div>
            <div className='flex flex-wrap gap-2'>
              {history.map((user) => (
                <button
                  key={user}
                  onClick={() => handleSearch(user)}
                  className='flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-xl
                             bg-blue-50 dark:bg-blue-500/10
                             border border-blue-100 dark:border-blue-500/20
                             text-blue-700 dark:text-blue-300
                             hover:bg-blue-100 dark:hover:bg-blue-500/20
                             transition-all duration-200 hover:scale-105 active:scale-95'>
                  <svg className='w-3 h-3 opacity-60' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                      d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                  </svg>
                  {user}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Feature pills */}
      <div className='mt-12 flex flex-wrap gap-3 justify-center'>
        {[
          { icon: '📊', label: 'Language breakdown' },
          { icon: '⭐', label: 'Top repositories' },
          { icon: '📈', label: 'Activity chart' },
          { icon: '👤', label: 'Profile stats' },
        ].map(({ icon, label }) => (
          <div key={label}
            className='flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium
                       bg-white/70 dark:bg-white/[0.04]
                       border border-gray-200/80 dark:border-white/[0.07]
                       text-gray-500 dark:text-gray-400 shadow-sm'>
            <span>{icon}</span>
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search
