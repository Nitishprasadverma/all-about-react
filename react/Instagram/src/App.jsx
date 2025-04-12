import { useState } from "react";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
function App() {
  const [isSingup, setIsSingup] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className=" bg-white shadow-md rounded-md p-6 w-80 text-center">

        <h1 className="text-3xl font-cursive mb-6">Instagram</h1>
        {isSingup ? <Signup /> : <Signin />}

        <p className="text-sm mt-4">

          {isSingup ? 'Have an account?' : "Dont't have an account?"}

          <span
            onClick={() => setIsSingup(!isSingup)}
            className="text-blue-500 hover:undeline cursor-pointer"
          >

            {isSingup ? 'Log in' : 'Sing up'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default App
