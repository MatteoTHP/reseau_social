import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'
import Cookies from 'js-cookie';
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'


function Navbar () {
  
  const {isChecked} = useSelector(state => state);
  
  const token = Cookies.get('token')
 
  const handleClick= () => {
    Cookies.remove('token')
    Cookies.remove('id')
    window.location.href = "/"
    
  };


    return (
      <nav className='navbar'>
        <Link to="/"><button  className='nav-link'>Home</button></Link>
       
        {isChecked  ? 

        <div>
          <Link to="/posts/create" ><button className='nav-link'>Create post</button></Link>
          <button onClick={handleClick} className='nav-link'>Logout</button>
          <Link to="/users/me" ><button className='nav-link'>  🙎‍♂️  </button></Link>
        </div> 

        : 
        <div>
          <Link to="/auth/local/register" ><button className='nav-link'>Register</button></Link>
          <Link to="/auth/local" ><button className='nav-link'>Login</button></Link>
        </div>
        } 
      </nav>
    );  
      // {data.user && data.user.username}   if data.user.username est true affiche data.user.username sinon rien
};
 
export default Navbar;
