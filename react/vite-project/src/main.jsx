import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
//import Button,{ handledClick } from './Button.jsx'

// import Person from './Person.jsx'
//import Header from './Header.jsx'
import List from './list.jsx'

const fruit = ['apple','sev','banana']
createRoot(document.getElementById('root')).render(
  <StrictMode>
  
    <List items ={fruit}/>
   
  
  </StrictMode>,
)
