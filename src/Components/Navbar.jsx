import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import sun from '../assets/sun.png'
import moon from '../assets/cloudy-night.png'
import github from '../assets/github.png'

const Navbar = () => {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const root = window.document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = location.pathname === '/'

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300
      ${scrolled
        ? 'bg-white/80 dark:bg-[#0e1117]/90 backdrop-blur-xl shadow-sm border-b border-gray-200/60 dark:border-white/[0.06]'
        : 'bg-transparent border-b border-transparent'
      }`}>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between'>

        {/* Logo */}
        <Link to='/' className='flex items-center gap-2.5 group'>
          <div className='relative'>
            <div className='absolute inset-0 bg-blue-500/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300' />
            <img src={github} alt='GitHub Logo'
              className='relative h-8 w-8 group-hover:scale-110 transition-transform duration-300' />
          </div>
          <span className='text-lg font-bold text-gray-900 dark:text-white hidden sm:inline tracking-tight'>
            Github <span className='text-blue-600 dark:text-blue-400'>Analyzer</span>
          </span>
        </Link>

        {/* Right side */}
        <div className='flex items-center gap-1'>

          {/* Compare link — icon on mobile, icon+text on sm+ */}
          <Link to='/compare'
            className={`flex items-center gap-1.5 px-2 sm:px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200
              ${location.pathname.startsWith('/compare')
                ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.06]'
              }`}>
            <svg className='w-4 h-4 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
            </svg>
            <span className='hidden sm:inline'>Compare</span>
          </Link>

          {/* Search link — only on inner pages, icon on mobile */}
          {!isHome && (
            <Link to='/'
              className='flex items-center gap-1.5 px-2 sm:px-3 py-2 rounded-xl text-sm font-medium
                         text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white
                         hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-all duration-200'>
              <svg className='w-4 h-4 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>
              <span className='hidden sm:inline'>Search</span>
            </Link>
          )}

          {/* Theme toggle */}
          <button
            onClick={() => setDark(!dark)}
            aria-label='Toggle theme'
            className='ml-1 p-2 rounded-xl
              bg-gray-100 dark:bg-white/[0.06]
              hover:bg-gray-200 dark:hover:bg-white/10
              border border-gray-200 dark:border-white/10
              transition-all duration-200 hover:scale-110 active:scale-95'>
            <img
              src={dark ? sun : moon}
              alt={dark ? 'Light mode' : 'Dark mode'}
              className='h-5 w-5'
            />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
