import React, {useContext, useEffect, useState} from 'react';
import {ThemeContext} from '../../Context/ThemeContext';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import {useSelector} from 'react-redux'

const Home = () => {

  const {theme} = useContext(ThemeContext);

  const token = Cookies.get('token')
  const {isChecked} = useSelector(state => state)
  const [Posts, setPosts] = useState([])

  useEffect(() => {

    fetch('http://localhost:1337/posts', {
      method: 'get',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      setPosts(data)
      console.log(data)
    })
  },[token])

  return(

    <div className={theme ? 'minHeight content light' : 'minHeight content dark'}>
           <h1>Home</h1>
      
      
      <p>Welcome on My Social Network. This website is a training to Redux and React. We use auth and routing to create a small social media website.</p>
     
      { isChecked ? 
      <div>
        <p>Posts count : {Posts && Posts.length}</p>
        
        <br/>
        <ul>
          {Posts && Posts.map((post) =>
        <li key={post.id}>
          <p > Post: {post.text} </p>
          <p > Likes: {post.like}</p>
          <p > by:  <Link to={`/users/${post.user.id}`} ><button className='nav-link'>{post.user.username} </button></Link></p>
        
        
        </li>
        
        )}
        </ul>
      </div>
       : null }
      
     
    </div>

  )
}


export default Home;



 