import React, { useState } from 'react';
import './signup.css'
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import app from '../../../fireConfig';
import { getFirestore, collection, addDoc} from "firebase/firestore";
const SignUp = () => {

    // all states for storing input values
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const auth = getAuth();

    // Initialize Cloud Firestore and get a reference to the service
    
    // function for getting input values and pass it to firebase sign up method.


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
    const storeUserValues = async(userName, userEmail,userPassword) => {
        try {
            const docRef = await addDoc(collection(db, "users"), {
              userName,
              userEmail,
              userPassword
              
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    const registerUser = () => {

        createUserWithEmailAndPassword(auth, userEmail, userPassword)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("Success!!")
                console.log(user)
                storeUserValues(userName,userEmail,userPassword)

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }



    return <div className='form-content-right' style={{width:'100%'}}>
        
        
        <div className="form_img"> 
          <img src="images/logo.png"></img>
        </div>

        <form>

        <div style={{width:'50%',margin:'auto'}} >
        
        
        <h1>SIGN UP FORM</h1>
        <div className="form-inputs">
            <input type="text" placeholder="Your Name" onChange={(e) => { setUserName(e.target.value) }} />
            
        </div>
        <div className="form-inputs">
            <input type="email" placeholder="Your email" onChange={(e) => { setUserEmail(e.target.value) }} />
            
        </div>
        <div className="form-inputs">
            <input type="password" placeholder="Your Password" onChange={(e) => { setUserPassword(e.target.value) }} />
            
        </div>
        <button className='signup-button form-input-btn-2'
        
        onClick={(e) => {
            registerUser()
           
        }}>REGISTER</button>

        <button
            className='signup-button form-input-btn-2'
        >
        
            <a 
            href='/Login'>LOGIN</a>
        </button>    
        </div>

        </form>
    </div>
}
export default SignUp;