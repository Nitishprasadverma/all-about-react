import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import {createBrowserRouter,  RouterProvider} from 'react-router-dom'
import Route from './route'
import Home from './components/Home/Home'
import About from './components/About/About'
import Contact from './components/Contact/Contact'

const router = createBrowserRouter([
  {
    path:'/',
    element : <Route/>,
    children: [
      {
        path :"",
        element : <Home />
      },
      {
        path : "about",
        element: <About />
      },
      {
        path : "contact",
        element : <Contact/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
