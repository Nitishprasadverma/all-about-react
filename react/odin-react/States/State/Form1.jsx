import { useState } from "react";
const Function = () =>{
    const [to, setTo] = useState("Nitish");
    const [messaage, setMessage] = useState("Hello");

    function handleSubmit(e) {
        e.preventDefault();

        setTimeout(() =>{
            alert(`You said ${messaage} to ${to}`)
        },5000);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                To :{''}
                <select 
                 value={to}
                 onChange={e => setTo(e.target.value)}
                
                >
                    <option value={"Nitish"}>Nitish</option>

                    <option value={"Unknown"}>Unknown</option>

                </select>
            </label>

            <textarea 
            placeholder="Message"
            value={messaage}
            onChange={e => setMessage(e.target.value)}
            
            />

            <button type="submit">Send</button>
        </form>
    )
}
export default Function;