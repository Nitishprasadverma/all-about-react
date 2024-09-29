import {useState} from 'react'

function Counter() {
    const[x, setx] = useState(0);
   return(
<>
    Count x :{x}

    <button onClick={() => setx(x + 1)}>Inc</button>
    
    <button onClick={() => x> 0? setx(x - 1) :alert("can not be less than 0")   }>Dec</button>
    </>
   ) 
}

export default Counter;