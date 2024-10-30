import React, {useState} from "react";

function Person() {
    const[person, setPerson] = useState({name:"nitish",age:19});

    const handleIncreaseAge = () => {
        console.log("in handleIncreaseAage (before setPersoncall): ", person);
        setPerson({...person, age:person.age + 1});
        console.log("in handleIncreaseAge (after setPerson call):", person);
    }
    console.log("during render", person);
   
    return(
        <>
         <h1>{person.name}</h1>
         <h1>{person.age}</h1>
         <button onClick={handleIncreaseAge}>Increase Age</button>
        
        </>
       
    )
};
export default Person