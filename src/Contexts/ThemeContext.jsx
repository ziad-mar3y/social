import {  createContext, useEffect, useState } from "react";
export const themeContext = createContext();



export default function ThemeContextProvider({children}){
    const [theme, setTheme] = useState(null)
    
      function handleMoode() {
        document.documentElement.classList.toggle("dark");
        if (theme == "dark") {
          localStorage.setItem("theme", "light");
          setTheme("light");
        } else {
          localStorage.setItem("theme", "dark");
          setTheme("dark");
        }
      }
    
      useEffect(() => {
        if (
          !("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
          document.documentElement.classList.add("dark");
          setTheme("dark");
        } else {
          setTheme("light");
        }
    
        if ("theme" in localStorage) {
          if (localStorage.getItem("theme") == "dark") {
            document.documentElement.classList.add("dark");
            setTheme("dark");
          } else {
            setTheme("light");
          }
        }
      }, []);
      
    return <themeContext.Provider value={{theme , setTheme , handleMoode }}>
        {children}
    </themeContext.Provider>
}