
import React from 'react';
import './Form.css'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import app from '../../../fireConfig'

// import { TabContainer } from 'react-bootstrap';
const auth = getAuth(app)

// old code for the login.js file 
const Login = (props) => {

  // const signUp = (e) => {
  //   e.preventDefault()
  //   const email = document.querySelector('#email').value;
  //   const password = document.querySelector('#password').value;
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((u) => {
  //       console.log('Successfully Signed Up');
  //       alert("signed up!")
  //       props.test(u);
  //      //change 
  //       history.push('/home')
  //     })
  //     .catch((error) => {
        
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     alert(errorMessage);
  //     })
  // }

  function login(e) {
    e.preventDefault()
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    signInWithEmailAndPassword(auth, email, password)
      .then((u) => {
        console.log('Successfully Logged In');
        alert("logged in!")
       
      })
      .catch((err) => {
        alert("there was a problem logging in")
        
      })
  }

  

  return (
    <div className='form-content-right'>
     
        <div className="form_img"> 
          <img src="images/logo.png"></img>
        </div>

      <form>
        <h4 className='login-title'> Login </h4>
        <div className="form-inputs_email">
          <label className='form-label'>Email</label>
          <input id="email" placeholder="Enter your email .." type="text" />
        </div>
       <br></br>

        <div className="form-inputs_password">
          <label className="form-label"> Password </label>
          <input className="form-input" id="password" placeholder="Enter Password.." type="password" />
        </div>

          <div>
          <button className="form-input-btn-1" type="submit" onClick={(e) => login(e)}>Log in</button>
          </div>

            <div>
            <button className="form-input-btn-2">
           <a href='./sign-up'>
           SIGN UP</a> </button>          
          </div>
        
      </form>
    </div>
  )
}


export default Login;