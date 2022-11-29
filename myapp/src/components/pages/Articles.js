import React,{useEffect,useState} from 'react';
import '../Navbar';
import './Articles.css'

import Navbar from '../Navbar';
import { collection, getDocs,deleteField,doc ,deleteDoc,addDoc,updateDoc } from "firebase/firestore"; 
import { db,storage } from '../../fireConfig';


function Articles() {
  const [articals,setArticals]=useState([])
  useEffect(async()=>{
    const querySnapshot = await getDocs(collection(db, "articles"));
    let arr = []
    querySnapshot.forEach((doc) => {
      // console.log(doc.id,'getting id')
      let data = doc.data()
      data['id'] = doc.id
      arr.push(data)
      console.log({data});
    });
    setArticals(arr)
  },[])
  console.log(articals)


  return (
    
    <div>
      <Navbar />


      <div className='heading-container'>
        <h1>Featured Articles</h1>
        <p>what do people say about Ethiopian food ?</p>
      </div>

<div  style={{margin:"0px",display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',marginTop:'20px'}}>

    {articals.map((data)=>{
      return  <div className="card-artl" style={{marginBottom:"10px"}}>
        <img src={data.image} alt="food blof by wild junket"></img>


        <p>
          <a href={data.url}>
            <button aria-label="Read More Button ">Read More</button>
          </a>
        </p>


      </div>
    })}
</div>

      <div>
        <footer className="articles"> © EthioFood 2021</footer>
      </div>











    </div>



  );


}



export default Articles;