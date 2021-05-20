import React, {useContext, useEffect, useState} from 'react';
import {ThemeContext} from '../../Context/ThemeContext';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import {useHistory} from 'react-router-dom'


const ModifyProfil = () => { 

  const {theme} = useContext(ThemeContext);

  const token = Cookies.get('token')
  const id = Cookies.get('id')
  const history = useHistory();
  const [userinfo, setUserinfo] = useState('')

  useEffect(() => {

    fetch('http://localhost:1337/users/me', {
      method: 'get',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      setUserinfo(data)
      console.log(data)
    })
  },[token])

  const [data, setData] = useState({
    username: userinfo.username,
    email: userinfo.email,
    password: userinfo.password
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })

  };

  console.log(token)

  const updateFetch = (e) => {
    e.preventDefault();

    fetch(`http://localhost:1337/users/${id}`, {
        method: 'put',
        headers: { 
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        history.push('/users/me');
      })


  };

  return(

    <div className={theme ? 'minHeight content light' : 'minHeight content dark'}>
      <h1>Modify Profile</h1>

      <p>{userinfo.username}</p>
      <p>{userinfo.email}</p>

      <form onSubmit={updateFetch}>
          <label htmlFor="username"> Username :
            <input type="text" name="username" onChange={handleChange}/>
          </label>
          <label htmlFor="email"> Email:
            <input type="text" name="email" onChange={handleChange}/>
          </label>
          <label htmlFor="password"> Password :
            <input type="text" name="password" onChange={handleChange}/>
          </label>
          <input type="submit" value="update" />
        </form>
     
    </div>

  )
}

export default ModifyProfil;