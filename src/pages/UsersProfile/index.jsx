import React, {useContext, useEffect, useState} from 'react';
import {ThemeContext} from '../../Context/ThemeContext';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';


const UsersProfile = () => { 

  const {theme} = useContext(ThemeContext);

  const token = Cookies.get('token')

  const {slug} = useParams();
  const id = slug;

  const [Posts, setPosts] = useState([])
  const [userinfo, setUserinfo] = useState('')

  useEffect(() => {

    fetch(`http://localhost:1337/users/${id}`, {
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

  useEffect(() => {

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
  },[token])


  return(

    <div className={theme ? 'minHeight content light' : 'minHeight content dark'}>
      <h1>UsersProfile</h1>
      <p>id : {id}</p>
      <p>{userinfo.username}</p>
      <p>{userinfo.email}</p>

      <h1>{userinfo.username}'s Posts</h1>
      <p>Posts count : {Posts.length}</p>
      <br/>
      <br/>
      <div>{Posts.map((post) =>
        <div>
          <p key={post.id}> Post: {post.text} </p>
          <p key={post.id}> Likes: {post.like}</p>
          <p key={post.id}> by: {post.user.username}</p>
          
        <br/>
        <br/>
        </div>
      
      )}
      </div>

      

    </div>

  )
}

export default UsersProfile;