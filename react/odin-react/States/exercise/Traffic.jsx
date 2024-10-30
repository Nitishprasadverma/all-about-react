import { useState } from "react";

const TrafficLight = () =>{
    const [walk, setWalk] = useState(true);
    
    const handleClick = () => {
        setWalk(!walk);
        alert(walk? "stop is next": "walk is next");
    }

    return (
        <>
        <button onClick={handleClick}>Change to {walk? 'Stop': 'Walk'}

        </button>
        <h1 style={{color:walk ? "darkgreen" : "darkred"}}>
           {walk? 'Walk' : 'Stop'}
        </h1>
        </>
    )
}

export default TrafficLight