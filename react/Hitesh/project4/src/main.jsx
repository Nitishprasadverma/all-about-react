import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import {createBrowserRouter,  createRoutesFromElements,  RouterProvider,Route} from 'react-router-dom'

import Layout from './Layout'

import Home from './components/Home/Home'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import User from './components/Users/User'
import Github from './components/Github/Github'
// const router = createBrowserRouter([
//   {
//     path:'/',
//     element : <Route/>,
//     children: [
//       {
//         path :"",
//         element : <Home />
//       },
//       {
//         path : "about",
//         element: <About />
//       },
//       {
//         path : "contact",
//         element : <Contact/>
//       }
//     ]
//   }
// ])

//2nd method of router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
     <Route  path='github' element ={<Github />}/>
      <Route path='User/:userid' element={<User />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
