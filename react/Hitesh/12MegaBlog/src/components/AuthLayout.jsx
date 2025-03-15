import React, { useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function Protected({ children, authentication = true }) {

    const navigate = useNavigate()
    const[loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)
console.log("AuthStatus is :", authStatus)
    useEffect(() => {

        // Todo :- make it more easy to understand
        // if(authStatus == true){
        //     navigate("/")
        // }else if(authStatus === false){
        //     navigate("/login")
        // }
        // setLoader(false)
        // let authvalue = authStatus === true ? true : false;

        if (authentication && !authStatus) {
            // Protected route and user is not authenticated
            navigate("/login");
          } else if (!authentication && authStatus) {
            // Non-protected route and user is authenticated
            navigate("/");
          }

        setLoader(false)
    }, [authStatus, navigate, authentication])

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         if (authentication === true && authStatus === false) {
    //             navigate("/login");
    //         } else if (authentication === false && authStatus === true) {
    //             navigate("/");
    //         }
    //     }, 500); // Small delay for Redux update
    
    //     return () => clearTimeout(timeout);
    // }, [authStatus, navigate, authentication]);

    return  loader ? <h1>Loading...</h1> :<>{children}</>
}


