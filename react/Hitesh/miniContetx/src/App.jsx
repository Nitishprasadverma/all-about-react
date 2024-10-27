import { useState } from 'react'

import UserContextProvider from './context/userContextProvider'
import Login from './context/components/login'
import Profile from './context/components/profile'

function App() {
 

  return (
   <UserContextProvider>
   
   <Login/>
   <Profile/>
   </UserContextProvider>
  )
}

export default App
