import React, {useContext, useState, useEffect} from 'react';
import {ThemeContext} from '../../Context/ThemeContext';
import Cookies from 'js-cookie';
import {useHistory, useParams} from 'react-router-dom'


const ModifyPost = () => { 
  
  const {theme} = useContext(ThemeContext);

  const token = Cookies.get('token')
  const id = Cookies.get('id')
  const history = useHistory();
  

  const [Posts, setPosts] = useState([])
  const [Post, setPost] = useState([])

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })

  };

  const {slug} = useParams();
  const PostID = slug;
  


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

    useEffect(() => {
      
      Posts.forEach((post) => {
        if(post.id == PostID){setPost(post)}
      })

    },[handleChange])
    
    

    const handleModify = (e) => {
      e.preventDefault();
      
      fetch(`http://localhost:1337/posts/${PostID}`, {
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
    }
    
    const [data, setData] = useState({
      text: Post.text,
      user: id,
    });

  return(

    <div className={theme ? 'minHeight content light' : 'minHeight content dark'}>
      
        <h1>Modify your Post</h1>

      
        <p>Post id : {PostID}</p>
        <p > id: {Post.id} </p>
        <p > Post: {Post.text} </p>
        <p > Likes: {Post.like}</p>
        <p > by: {Post.user && Post.user.username}</p>
      

        <form onSubmit={handleModify}>
          <label htmlFor="title"> Text :
            <input type="text" name="text" onChange={handleChange}/>
          </label>  
       
          <input type="submit" value="submit" />
        </form>
     

    </div>

  )
}


 
export default ModifyPost;



 