import { useState } from "react";

import {letters} from './Data'
import Letter from './Letter'

export default function MailClient1() {
    const[selected, setSelectedId]  = useState(null);
    const selectedCount = 1;

    function handleToggle(toggleID){
        setSelectedId(toggleID);
    }

    return (

        <>
          <h2>Inobx</h2>
       <ul>
        {letters.map(letter => (
            <Letter
            key={letter}
            letter={letter}
            isSelected={
                letter.id === selected
            }
            onToggle={handleToggle}
            
            />
        ))}

        <hr />

        <p>
            <b>You selected {selectedCount} letters</b>
        </p>
       </ul>
        
        </>
     
    );
}