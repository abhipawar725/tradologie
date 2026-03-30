import React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light"
  })

  useEffect(()=> {
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
        {children}  
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)