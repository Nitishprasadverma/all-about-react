import React, {useState, useContext} from "react";
import userContext from "../userContext";

import './Login.css'
function Login() {
const [userName, SetUserName] = useState(' ');

const [password, setPassword] = useState(' ');

const {setUser} = useContext(userContext);

    const handleSubmit = (e) =>{
        e.preventDefault();
        setUser({userName, password})

    }
    return (
<div className="hrx">


    <h2>Login</h2>
    <input type="text" 
    value={userName}

    onChange={(e) => SetUserName(e.target.value)}
    placeholder="username"/>
    <input type="password"
    value={password}

    onChange={(e) => setPassword(e.target.value)}
    placeholder="password" />

    <button onClick={handleSubmit}>Submit</button>
</div>
    )
}

export default Login;