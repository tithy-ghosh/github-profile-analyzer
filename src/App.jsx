import React from 'react'
import {  Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Search from './pages/Search';
import Profile from './pages/Profile';

const App = () => {
  
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Search />} />
        <Route path='/users/:username' element={<Profile />} />
      </Routes>
    </div>
    
  )
}

export default App
