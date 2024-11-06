import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Person from '../State/Person.jsx'
import CustomInput from '../State/Input.jsx'
import Form from '../State/Form.jsx'
import Function from '../State/Form1.jsx'
import TrafficLight from '../exercise/Traffic.jsx'
import FeedbackForm from '../State/Form2.jsx'
import Time from '../exercise/Clock/Src/App.jsx'
import TravelPlan from '../exercise/Packing/Src/App.jsx'
import MailClient from '../exercise/Letter/Src/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Person /> */}
{/* 
    <CustomInput /> */}

    {/* <Form /> */}

    {/* <Function /> */}

    {/* <TrafficLight /> */}

    {/* <FeedbackForm /> */}

    {/* <Time /> */}

   <MailClient />

    {/* <TravelPlan /> */}
  </StrictMode>
)
