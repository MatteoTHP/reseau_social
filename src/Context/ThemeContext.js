import React,{ createContext, useState} from 'react';

export const ThemeContext = createContext();

const ThemeContextProvider =(props) => {
  
  let storedTheme = localStorage.getItem('storedTheme');
  storedTheme === null ? storedTheme = true : storedTheme = JSON.parse(storedTheme);

  const[theme, setTheme] = useState(storedTheme); // mettre une variable pas un string

  const toggleTheme = () =>{
    localStorage.setItem("storedTheme", JSON.stringify(!theme));
    setTheme(!theme)
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider;