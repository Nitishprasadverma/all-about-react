import React, {createContext,useContext} from "react";
export const ThemeContext = createContext({
    themeMode : "dark",
    darkMode: () => {},
    lightMode: () => {}
})
 
export const ThemeProvider =  ThemeContext.Provider

export default function useTheme(){
    return useContext(ThemeContext);
}