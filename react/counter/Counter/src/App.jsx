import { useState } from 'react'

import './App.css'

function App() {
 
let[counter, setCounter] = useState(10);
  const addValue = () =>{
    if(counter > 19){
      alert("can not be increase above 20");
    }else{
      setCounter(counter + 1)
    }
  
  }

  const decreaseValue = () =>{
  if(counter >0){
    setCounter(counter - 1)
  }else{
    alert("can not be decrease below 0")
  }
   
  }
  return (

    <>
    <h1>Chai aur react</h1>
    <h2>Counter Value:{counter}</h2>
    
    <button onClick={addValue} >Add value</button>
     
     <button onClick={decreaseValue}>Remove value</button>
    
    
    </>
  )
}

export default App
