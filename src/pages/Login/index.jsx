import React, {useContext, useState} from 'react';
import {ThemeContext} from '../../Context/ThemeContext';
import './content.css'
import Cookies from 'js-cookie';
import {useDispatch, useSelector} from 'react-redux'
import {newUserSucces} from '../../Reduxx/Action'
import {useHistory} from 'react-router-dom'

const Login= () => {
  
    const {theme} = useContext(ThemeContext);
    const history = useHistory();
    const dispatch = useDispatch(); 
    const {user, token} = useSelector(state => state);

    const [data, setData] = useState({
      identifier: '',
      password: ''
    });
  
    const handleChange = (e) => {
      setData({
        ...data,
        [e.target.name]: e.target.value
      })
  
    };
  
    const API_URL = 'http://localhost:1337/auth/local';
  
    const loginFetch = (e) => {
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

      return (
        <div className={theme ? 'minHeight content light' : 'minHeight content dark'}>
          <h1>Login</h1>
          <form onSubmit={loginFetch}>
          <label htmlFor="identifier"> Identifier :
            <input type="text" name="identifier" onChange={handleChange}/>
          </label>
          <label htmlFor="password"> Password :
            <input type="text" name="password" onChange={handleChange}/>
          </label>
          <input type="submit" value="submit" />
        </form>

        </div>

    )}
        
export default Login;



 