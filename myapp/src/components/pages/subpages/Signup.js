import React, { useState } from 'react';
import './signup.css'
import { Link, useNavigate,useLocation} from "react-router-dom";

import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import app from '../../../fireConfig';
import { getFirestore,doc, collection, addDoc,updateDoc} from "firebase/firestore";
import swal from 'sweetalert'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const SignUp = () => {

  // all states for storing input values
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const auth = getAuth();


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
    const storeUserValues = async(userName, userEmail,userPassword,uid) => {
        try {

            const docRef = await addDoc(collection(db, "users"),{});
            await updateDoc(docRef, {
                userName,
                userEmail,
                userPassword,
                docRef:docRef.id,
                uid
            })

            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    const registerUser = async (e) => {
      e.preventDefault()

      createUserWithEmailAndPassword(auth, userEmail, userPassword)
          .then(async (userCredential) => {
              //         // Signed in
              const user = userCredential.user;
              console.log("Success!!")
              console.log(user)
              await storeUserValues(userName,userEmail,userPassword,user.uid)
      //         console.log(userCredential)

          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorMessage);
          });
  }

  return<Container style={{
    marginTop: '5%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background:'#EEF0EE'
    }}
    maxWidth="xs"
  >
    <div className="form_img" style={{textAlign:'center'}}>
      <img src="images/logo.png"></img>
      <h3> Sign Up</h3>

    </div>
  <form
    style={{
        width:'100%',
        backgroundColor:'white',
        padding:'5%'

    }}
    onSubmit={registerUser}
    >

    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          tyle={{border:'none'}}
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Your Name"
            name="Your Name"
            value={userName}
            onChange={(e)=>{setUserName(e.target.value)}}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          tyle={{border:'none'}}
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={userEmail}
            onChange={(e)=>{setUserEmail(e.target.value)}}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          name="Your password"
          label="Your Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={userPassword}
          onChange={(e)=>{setUserPassword(e.target.value)}}
        />
      </Grid>
    </Grid>
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      style={{
        margin: '16px auto ',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      }}
    >
      Sign Up
    </Button>
  </form>
  <Grid container style={{paddingLeft:'20px'}}>
    <Grid item>
      <Link to="/Login" >
      {"Already have an account ? Login"}

      </Link>
    </Grid>
  </Grid>
</Container>

}
export default SignUp;