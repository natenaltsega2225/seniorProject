
import { async } from '@firebase/util';
import React from 'react';
import '../Navbar';
import Navbar from '../Navbar';
import { db,storage } from '../../fireConfig';
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
  updateDoc,
  deleteField 
} from "firebase/firestore";
import swal from 'sweetalert'


function Contact () {
  const [name,setName] = React.useState('')
  const [email,setEmail] = React.useState('')
  const [subject,setSubject] = React.useState('')


const handleSubmit = async (event)=>{
  event.preventDefault()
let obj = {
  name,
  email,
  subject
}
console.log(obj)

const docRef = await addDoc(collection(db, `contactUs`),obj).then(()=>{

  setSubject('')
  setEmail('')
  setName('')
  swal({
    title: "Thanks for yor feedback!",
    text: "successfully submited!",
    icon: "success",
    button: "ok",
  });
})



}

    return (
       
        <div>
          <Navbar />
          <div className='heading-container' style={{marginBottom:"20px",marginTop:'-100px'}}>
              <h1>Contact Us</h1>
          </div>

    <div className="message">
    <form onSubmit={handleSubmit}>
      <label for="fname">Name </label>
        <input type="text" required id="fname" name="firstname" placeholder="Your name..." value={name} onChange={(e)=>setName(e.target.value)} />
        <label for="email"  >Email </label>
        <input type="text" required name="email" placeholder="email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <label for="subject">Subject</label>
        <textarea name="subject" required id="subject" placeholder="Your feed back goes here..."
        value={subject} onChange={(e)=>setSubject(e.target.value)}
        ></textarea>
        <button class="btn_ing" aria-label="Submit button"
        type='submit'
        
        >Submit</button>
    </form>

    
    </div>


    <div>
    <footer> © EthioFood 2022</footer>
    </div>
    
    </div>
        

        
    );
};

export default Contact;





  