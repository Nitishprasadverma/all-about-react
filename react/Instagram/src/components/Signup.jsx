// import React from 'react'

function Signup() {
    return (
        <form className="space-y-3">

            <input
                type="text"
                placeholder="Phone number, username, or email"
                required
                className="w-full px-3
     py-2 border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="email"
                placeholder="Email"
                required
                className="w-full px-3  py-2 border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
                type="text"
                placeholder="Username"
                required
                className="w-full px-4 py-2 border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
                type="password"
                placeholder="Password"
                required
                className="w-full px-4 py-2 border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 "
            >
                Sign up
            </button>

        </form>
    )
}

export default Signup
