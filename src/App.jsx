import React from 'react';

import 'style.css';
import ThemeContextProvider from 'Context/ThemeContext'
import BtnToggle from 'components/BtnToggle/BtnToggle'
import Navbar from './components/Navbar';
import Foot from './components/Foot'

import Register from 'pages/Register';
import Home from 'pages/Home';
import Login from 'pages/Login';
import MyProfil from 'pages/MyProfil';
import UsersProfile from 'pages/UsersProfile';
import ModifyProfil from 'pages/ModifyProfil';
import CreatePost from 'pages/CreatePost';
import UserPosts from 'pages/UserPosts';
import ModifyPost from 'pages/ModifyPost';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Cookies from 'js-cookie';


const App = () =>  {
  
  const id = Cookies.get('id')

  return (
  <div className="body"> 
    <title>Reseau social</title>
    <ThemeContextProvider>
      <BtnToggle /> 
      
      <Router>
      <Navbar />
      <main>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/auth/local/register">
            <Register />
          </Route>
          <Route path="/auth/local">
            <Login />
          </Route>
          <Route path="/users/me">
            <MyProfil/>
          </Route>
          <Route path='/users/:slug'>
            <UsersProfile/>
          </Route>
          <Route exact path="/modify">
            <ModifyProfil/>
          </Route>
          <Route path="/posts/create">
            <CreatePost/>
          </Route>
          <Route path="/users/:slug/posts">
            <UserPosts/>
          </Route>
          <Route path="/posts/modify/:slug">
            <ModifyPost/>
          </Route>
          
        </Switch>
        <Foot />
      </main>
      
    </Router>
    
    </ThemeContextProvider>


  </div>

  
);
};

export default App;