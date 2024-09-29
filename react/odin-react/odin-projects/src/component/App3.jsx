import { useState } from "react";

function FeedbackForm() {
    const [isSent, setIsSent] = useState(false);
    const [message, setMessage] = useState('');

    if(isSent){
        return <h1>Thanku For Your Valuable Feedback</h1>
    }
    return (
        <form onSubmit={e =>{
            e.preventDefault()
            alert(`Sending : "${message}"`)
            setIsSent(true);
        }}
        >
            <textarea 
            placeholder="Message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            />
            <br />

            <button type="submit">Send</button>

           
        </form>
    )
}

export default FeedbackForm;