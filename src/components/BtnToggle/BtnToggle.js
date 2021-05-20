import React, { useContext } from 'react';
import './BtnToggle.css'
import {ThemeContext} from '../../Context/ThemeContext';

function BtnToggle() {

  const {toggleTheme, theme} = useContext(ThemeContext)
 
  
  return (
    <button onClick = {toggleTheme} className={theme ? "btn-toggle goLight" : "btn-toggle goDark"}>
      {theme ? "🌙" : "☀️"}
    </button>
  );
}

export default BtnToggle;