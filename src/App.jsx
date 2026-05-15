import React, { useEffect } from 'react'
import { getUser } from './utils/github'

const App = () => {
  useEffect(() => {
    getUser("torvalds").then(res => console.log(res.data))
  }, []);
  return (
    <div>
     Testing ...... 
    </div>
  )
}

export default App
