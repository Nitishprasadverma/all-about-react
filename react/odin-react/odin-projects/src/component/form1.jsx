import { useState } from "react";

// function Form3() {
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [fullName, setFullName] = useState('');

//     function handlerFirstNameChange(e) {
//         setFirstName(e.target.value);
//         setFullName(e.target.value + ' ' + lastName);
//     }

//     function handleLastNameChange(e) {
//         setLastName(e.target.value);
//         setFullName(firstName + ' ' + e.target.value);
//     }

//     return (
//         <>
//             <h2>Let's check you in</h2>
//             <label>
//                 first name:
//                 <input
//                     value={firstName}
//                     onChange={handlerFirstNameChange}

//                 />
//             </label>

//             <label>

//                 last name:{' '}
//                 <input
//                     value={lastName}
//                     onChange={handleLastNameChange}

//                 />
//             </label>
//             <p>
//                 your ticket will be issued to: <b>{fullName}</b>
//             </p>

//         </>
//     )

// }

function Form3() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const fullName = firstName + ' ' + lastName;
    
    function handlerFirstNameChange( e){
        setFirstName(e.target.value);
    }

    function handleLastNameChange(e){
        setLastName(e.target.value);
    }

    return (
        <>
        <h2>Let's check you in</h2>
        <label>
            first name{' '}
            <input
                value = {firstName}
                onChange={handlerFirstNameChange}
            />
        </label>
        <label>

            last name: {' '}
            <input 
            value={lastName}
            onChange={handleLastNameChange}
            
            />
        </label>

        <p>
            your ticket will be issued to: <b>{fullName}</b>
        </p>
        </>
    )
}
export default Form3;