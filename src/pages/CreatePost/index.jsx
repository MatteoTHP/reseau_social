import React, {useContext, useState} from 'react';
import {ThemeContext} from '../../Context/ThemeContext';
import Cookies from 'js-cookie';
import {useHistory} from 'react-router-dom'


const CreatePost = () => { 

  const {theme} = useContext(ThemeContext);

  const token = Cookies.get('token')
  const id = Cookies.get('id')
  const history = useHistory();
  const [data, setData] = useState({
    text: '',
    
    user: id,
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })

  };

  const API_URL = 'http://localhost:1337/posts';

  const postFetch = (e) => {
    e.preventDefault();

    fetch(API_URL, {
        method: 'post',
        headers: { 
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        history.push('/');
       
      })

  };

  return(

    <div className={theme ? 'minHeight content light' : 'minHeight content dark'}>
        <h1>Create a post !</h1>
        <form onSubmit={postFetch}>
          <label htmlFor="title"> Text :
            <input type="text" name="text" onChange={handleChange}/>
          </label>  
       
          <input type="submit" value="submit" />
        </form>
     

    </div>

  )
}


 
export default CreatePost;



 