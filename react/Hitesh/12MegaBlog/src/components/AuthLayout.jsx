import React, { useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function Protected({ Children, authentication = true }) {

    const navigate = useNavigate()
    cont[loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {

        // Todo :- make it more easy to understand
        // if(authStatus == true){
        //     navigate("/")
        // }else if(authStatus === false){
        //     navigate("/login")
        // }
        // setLoader(false)
        // let authvalue = authStatus === true ? true : false;

        if (authentication && authStatus !== authentication) {
            navigate("/login")
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }

        setLoader(false)
    }, [authStatus, navigate, authentication])

    return (
        <div>

        </div>
    )
}


