import { useEffect, useState } from 'react'

import './App.css'
import { ThemeProvider } from './contexts/theme'
import ThemeBtn from './components/ThemeBtn'
import Card from './components/card'

function App() {
const [themeMode, setThemeMode] = useState("light")

const lightMode = () =>{
setThemeMode("light")
}
const darkMode = () =>{
  setThemeMode("dark")
}

// actual change in theme

const background = document.querySelector('html');
useEffect(() =>{

background.classList.remove("light", "dark");
background.classList.add(themeMode);
},[themeMode])
  return (
    <ThemeProvider value={{themeMode,lightMode,darkMode}}>
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            {/* theme button */}

            <ThemeBtn />
          </div>

          <div className="w-full max-w-sm mx-auto">
            {/* card */}
            <Card />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
