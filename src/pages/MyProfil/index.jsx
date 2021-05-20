import React, {useContext, useEffect, useState} from 'react';
import {ThemeContext} from '../../Context/ThemeContext';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';


const MyProfil = () => { 

  const {theme} = useContext(ThemeContext);

  const token = Cookies.get('token')
  const id = Cookies.get('id')

  const [Posts, setPosts] = useState([])
  const [userinfo, setUserinfo] = useState('')
  
  
  const getProfile = () => {

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
  }
  
  useEffect(() => {
    getProfile();
  },[])

  const getPosts = () => {

    fetch(`http://localhost:1337/posts?user.id=${id}`, {
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
  }
    useEffect(() => {
      getPosts();
    },[])
  
  const handleDelete = (postId) => {
    fetch(`http://localhost:1337/posts/${postId}`, {
      method: 'delete',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      getPosts();
    })
  }


  


  return(

    <div className={theme ? 'minHeight content light' : 'minHeight content dark'}>
      <h1>Profil</h1>

      <p>Username : {userinfo.username}</p>
      <p>Email : {userinfo.email}</p>
      <Link to={`/modify`} ><button className='nav-link'>Modify Profile</button></Link>

      <h1>My Posts</h1>
      <p>Posts count : {Posts.length}</p>
      <br/>
      
      <ul>
        {Posts.map((post) =>
        <li key={post.id}>
          <p > id: {post.id} </p>
          <p > Post: {post.text} </p>
          <p > Likes: {post.like}</p>
          <p > by: {post.user.username}</p>
          <Link to={`/posts/modify/${post.id} `}>
            <button onClick={() => (`${post}`) } className='nav-link'>Modify</button>
          </Link>
          <button onClick={() => handleDelete(post.id)} className='nav-link'>Delete</button>
          <br/>
        
        </li>
      
      )}
      </ul>
     
      
    </div>

  )

}

export default MyProfil;