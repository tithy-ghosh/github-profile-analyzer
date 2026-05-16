import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Compare from './pages/Compare';
import NotFound from './pages/NotFound';
import { ToastContainer } from './Components/Toast';

const App = () => {
  return (
    <div className='min-h-screen bg-[#fafaf9] dark:bg-[#0e1117] transition-colors duration-500'>

      {/* ── Background layer ── */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none select-none'>

        {/* Light mode */}
        <div className='dark:hidden absolute inset-0'
          style={{ background: 'linear-gradient(160deg, #f5f3ff 0%, #fafaf9 40%, #fdf8f0 100%)' }} />

        {/* Dark mode: cool blue-grey base, no color theatrics */}
        <div className='hidden dark:block absolute inset-0'
          style={{ background: 'linear-gradient(180deg, #131720 0%, #0e1117 35%, #090c12 100%)' }} />

        {/* Horizontal light band — like a monitor glow across the middle of the room */}
        <div className='hidden dark:block absolute top-0 left-0 right-0 h-[1px]'
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.06) 70%, transparent 100%)' }} />

        {/* Very faint cool top-center glow — like screen backlight */}
        <div className='hidden dark:block absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px]'
          style={{ background: 'radial-gradient(ellipse at center top, rgba(148,163,184,0.06) 0%, transparent 65%)' }} />

      </div>

      <div className='relative z-10'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='/users/:username' element={<Profile />} />
          <Route path='/compare/:user1/:user2' element={<Compare />} />
          <Route path='/compare' element={<Compare />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
