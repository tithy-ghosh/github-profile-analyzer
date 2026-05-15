import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import sun from '../assets/sun.png'
import moon from '../assets/moon.png'
import github from '../assets/github.png'
const Navbar = () => {
    const [dark, setDark] = useState(() =>{
        return localStorage.getItem('theme') === 'dark'
    })
    useEffect(() =>{
        const root = window.document.documentElement;
        if(dark){
            root.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else{
            root.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [dark])
  return (
    <nav className='bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3'>
        <div className='max-w-4xl mx-auto flex items-center justify-between'>
            
            <Link to="/" className='text-xl font-bold text-gray-900 dark:text-white flex
             gap-2 items-center'>
            <img src={github} alt="Github Logo" className='h-8 w-8' />
            <p>Github Analyzer</p>
            </Link>
            <button onClick={() => setDark(!dark)}>
                {dark ? (
                    <img src={sun} alt="Switch to light mode"  className='h-8 bg-amber-50 rounded-full py-2 px-2'/>
                ) : (
                    <img src={moon} alt="Switch to dark mode"  className='h-6 w-6'/>
                )}
            </button>
        </div>
    </nav>
  )
}

export default Navbar
