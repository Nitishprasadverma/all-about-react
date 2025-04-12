// import React from 'react'

function Signin() {
    return (
        <form >
            <input
                type="text"
                placeholder='Username'
                required
                className='w-full px-4 py-2 border-gray-300 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400'
            />

            <input
                type="password"
                placeholder='Password'
                required
                className='w-full px-4 py-2 border-gray-300 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400'

            />

            <button
                type="submit"
                className='w-full
                mt-4 
                bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 '
            >
                Sign in
            </button>
        </form>
    );
}

export default Signin
