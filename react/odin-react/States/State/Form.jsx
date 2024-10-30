import React, { useState } from "react";

export default function Form() {
    const [isSent, setIsSent] = useState(false)
    const [message, setMessage] = useState('Hi !');

    if(isSent){
        return <h1>Your messaage is on its way!</h1>
       
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            setIsSent(true);
            sendMessage(message);
        }}>
            <textarea placeholder="Message"
            value={message}

            onChange={e => setMessage(e.target.value)}
            />

            <button type="submit"> send</button>

        </form>
    )

    function sendMessage(messaage){
        
    }

}