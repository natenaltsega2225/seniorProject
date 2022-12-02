import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './components/pages/Home'
import AddRecipe from './components/pages/AddRecipe'
import Favorites from './components/pages/Favorites'
import Articles from './components/pages/Articles'
import Contact from './components/pages/Contact'
import Food from './components/pages/subpages/Food'
import Cook from './components/pages/subpages/Cook'
import Recipe from './components/pages/subpages/Recipe'
import Ingredients from './components/pages/subpages/ingredients';
import Login from './components/pages/subpages/Login';
import SignUp from './components/pages/subpages/Signup';
import Admin from './components/pages/Admin';


import { getAuth, onAuthStateChanged } from 'firebase/auth'


const App = () => {
  const auth = getAuth();
const navigate = useNavigate();
  // this state is storing user details.
  const [user, setUser] = useState('')
  const [isAdmin,setIsadmin] = useState(false)

useEffect(()=>{

    onAuthStateChanged(auth, (user) => {
      if (user) {
       
        const uid = user.uid;

        setUser(user)
        navigate('/home')
        console.log("user is here",uid)
        if(uid == '7kbPy4lOBPc5orYApkmMjoviBu82'){
          setIsadmin(true)
        }

      } else {
        // User is signed out
        // ...
        // navigate('/home')
        setUser(false)

      console.log("user is not here")

      }
    });
},[auth])
    



  return (

    <div className='App'>
      
        <Routes>  
              <Route path='/sign-up'  element={<SignUp/>} />
              <Route path='/Login'  element={<Login/>} />
              <Route path='/' exact  element={<Home/>} />
              <Route path='/Home' exact  element={<Home/>} />
              {isAdmin && <Route path='/Admin' exact  element={<Admin/>} />}
              <Route path='/AddRecipe' exact  element={<AddRecipe/>} />
              <Route path='/Favorites' element={<Favorites/>} />
              <Route path='/Articles' element={<Articles/>} />
              <Route path='/Contact' element={<Contact/>} />
              <Route path='/Recipies' element={<Food/>} />
              <Route path='/Ingredients' element={<Ingredients/>} />
              <Route path='/Cook' element={<Cook/>} />
              <Route path='/Recipe/:id' element={<Recipe/>} />
        </Routes>
      


    </div>

    


  );



}
export default App;
