import { useState } from "react";

// function FeedbackForm() {
//     const [text,setText] = useState('');
//     const [isSending, setIsSending] = useState(false);
//     const [isSent, setIsSent] = useState(false);

//     async function handleSubmit(e) {
//         e.preventDefalut();
//         setIsSending(true);
//         await sendMessage(text);
//         setIsSending(false)
//         setIsSent(true)
//     }

//     if(isSent){
//         return <h1>Thanks for feedback!</h1>
//     }

//     return(
//         <form onSubmit={handleSubmit}>
//             <p>How was your stay at The Prancing pony?</p>

//             <textarea disabled = {isSending}
//             value={text}
//             onChange={e => setText(e.target.value)}
//             />

//             <br/>

//           <button disabled ={isSending}
//           type="submit"
//           >Send</button>

//           {isSending && <p> Sending...</p>}
//         </form>
//     )
// }
//     function sendMessage(text){
//         return new Promise(resolve =>{
//             setTimeout(resolve,2000);
//         })
//     }


function FeedbackForm(){
    const [text, setText] = useState('');
    const [status, setStatus] = useState('typing');
    async function handleSubmit(e){
        e.preventDefalut();
        setStatus('sending');
        await sendMessage(text);
        setStatus('sent');
    }

    const isSending = status === 'sending';
    const isSent = status === 'sent';
    if(isSent){
        return <h1>Thanks for feedback!</h1>
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>How was your stay at The Prancing pony?</p>
            <textarea 
            disabled = {isSending}
            value={text}
            onChange={e => setText(e.target.value)}
            />
            <br/>
           <button
           disabled ={isSending}
           type="submit"
           >
            send
           </button>
           {isSending && <p>Sending...</p>}
        </form>
    )
}

function sendMessage(text){
    return new Promise(resolve =>{
        setTimeout(resolve,2000);
    })
}

export default FeedbackForm;