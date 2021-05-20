import React, {useContext, useState} from 'react';
import {ThemeContext} from '../../Context/ThemeContext';
import './content.css'
import Cookies from 'js-cookie';
import {useDispatch, useSelector} from 'react-redux'
import {newUserSucces} from '../../Reduxx/Action'
import {useHistory} from 'react-router-dom'


const Register = () => { 

  const {theme} = useContext(ThemeContext);
  
  const history = useHistory();
  const dispatch = useDispatch(); 
  const {user, token} = useSelector(state => state);

  const [data, setData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })

  };

  const API_URL = 'http://localhost:1337/auth/local/register';

  const registerFetch = (e) => {
    e.preventDefault();

    fetch(API_URL, {
        method: 'post',
        headers: { 
          
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        
        dispatch(newUserSucces(true, data)); // met dans le fucking bateau
        Cookies.set('token', data.jwt );
        Cookies.set('id', data.user.id );
        history.push('/');
      })


  };


  return(

    <div className={theme ? 'minHeight content light' : 'minHeight content dark'}>
        <h1>Register</h1>
        <form onSubmit={registerFetch}>
          <label htmlFor="username"> Username :
            <input type="text" name="username" onChange={handleChange}/>
          </label>
          <label htmlFor="email"> Email:
            <input type="text" name="email" onChange={handleChange}/>
          </label>
          <label htmlFor="password"> Password :
            <input type="text" name="password" onChange={handleChange}/>
          </label>
          <input type="submit" value="submit" />
        </form>
        <div className="image">
          <img  src='' alt="Logo"></img>
        </div>

    </div>

  )
}


 
export default Register;



 