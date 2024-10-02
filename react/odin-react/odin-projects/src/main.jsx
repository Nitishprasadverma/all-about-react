import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Gallery from './component/app1.jsx';

import FeedbackForm from './component/App3.jsx';
import MovingDot from './component/state.jsx';
import Form3 from './component/form1.jsx';
import Menu from './component/select.jsx';
import TravelPlan from './component/placesMain.jsx';
const animals = ['Tiger', 'Dog', 'lion', 'Lizard'];
createRoot(document.getElementById('root')).render(
  <StrictMode>

 {/* <FeedbackForm/> */}

{/* <Form3/> */}

<Menu/>

<TravelPlan/>
   
  </StrictMode>
)
