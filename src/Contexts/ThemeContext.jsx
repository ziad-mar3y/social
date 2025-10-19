import {  createContext, useState } from "react";




export const themeContext = createContext();



export default function ThemeContextProvider({children}){
    const [theme, setTheme] = useState(null)
    return <themeContext.Provider value={{theme , setTheme}}>
        {children}
    </themeContext.Provider>
}