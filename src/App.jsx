import React, { useEffect } from 'react'
import { getUser } from './utils/github'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Search from './pages/Search';
import Profile from './pages/Profile';

const App = () => {
  useEffect(() => {
    getUser("torvalds").then(res => console.log(res.data))
  }, []);
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Search />} />
      <Route path='/users/:username' element={<Profile />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
