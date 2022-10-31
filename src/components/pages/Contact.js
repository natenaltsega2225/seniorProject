
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

})
 alert('succefully submitted !');


}

    return (
       
        <div>
          <Navbar />
        <div className='hero-container'>
      
      <h1 className="contact_heading" aria-label="contact us header">Contact Us </h1>      
      
    </div>
    <div className="message">
    <form onSubmit={handleSubmit}>
      <label for="fname">Name </label>
        <input type="text" id="fname" name="firstname" placeholder="Your name..." value={name} onChange={(e)=>setName(e.target.value)} />
        <label for="email"  >Email </label>
        <input type="text"  name="email" placeholder="email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <label for="subject">Subject</label>
        <textarea name="subject" id="subject" placeholder="Your feed back goes here..."
        value={subject} onChange={(e)=>setSubject(e.target.value)}
        ></textarea>
        <button class="btn_ing" aria-label="Submit button"
        type='submit'>Submit</button>
    </form>

    
    </div>


    <div>
    <footer> © EthioFood 2021</footer>
    </div>
    
    </div>
        

        
    );
};

export default Contact;





  