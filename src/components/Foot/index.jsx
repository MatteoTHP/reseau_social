import React, {useContext} from 'react';
import './footer.css'
import {ThemeContext} from '../../Context/ThemeContext';

function Foot () {
  
  const {theme} = useContext(ThemeContext);

    return (
     <footer className={theme ? 'content light' : 'content dark'}>
        © Copyright 2021
     </footer>
    );  
 
};
 
export default Foot;
