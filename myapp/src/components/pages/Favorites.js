
import '../Navbar';
import './Page.css'

import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import { collection, getDocs, getFirestore,doc,updateDoc } from "firebase/firestore";
import { db,storage } from './../../fireConfig';
import Navbar from '../Navbar';
import { getAuth, multiFactor, onAuthStateChanged } from 'firebase/auth'
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import swal from 'sweetalert'


function Favorites() {
  const [recips,setRecips] = useState([])
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect( async() => {

    const querySnapshot = await getDocs(collection(db, "recipe"));
    let arr = []
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      data['id'] = doc.id
      arr.push(data)
    console.log({data});
    });
    if(auth?.lastNotifiedUid){
      //add favorite recipies to my collection
      let alldoc;
      let getFavorites = await getDocs(collection(db, "favorite"))
      getFavorites.forEach((doc) => {
        alldoc = doc.data()
      });
  
      let UID = auth?.lastNotifiedUid
      let myFavorites = alldoc[UID]
      console.log(myFavorites,arr,'my fav')
      if(myFavorites){
        let myRcipes = []
        arr.map((item)=>{
        // console.log(item.id,myFavorites)
          for(let i=0 ;i< myFavorites.length; i++){
            console.log(myFavorites[i])
            if(item.id == myFavorites[i]){
              myRcipes.push(item)
            }
          }
        })
        setRecips(myRcipes)
        arr = myRcipes
       
      }else{
        setRecips([])
      }
    }
    },[]);

const removeFavorite = (id) =>{
  let UID = auth?.lastNotifiedUid
  
    let sorted = []
    let favList = []
    recips.map((item)=>{
       if (item.id !== id){
          sorted.push(item)
          favList.push(item.id)
       }
      })
      let obj = {
        [UID]:favList
      }
      const docRef = doc(db, "favorite", 'ZrrC2vq1ksuIxOdikgwh')
      updateDoc(docRef, obj)
      .then(()=>{
          swal('unsaved successfully')
        })
         setRecips(sorted)
console.log(sorted)
   
}

  return (


    <div style={{height:'100vh',display:'flex',flexDirection:'column'}}>
      <Navbar />

      <div>
        <div style={{display:'flex',flexWrap:'wrap',width:'100%',padding:'150px 10px'}}>
        {recips?.map((item,{description})=>{
      // item?.description = 10;
      let dec = item?.description
      let str = []
      for(let i=0 ;i<70;i++ ){
        console.log(dec[i])
        str.push(dec[i])
      }
      dec = str
       console.log(dec.length)
      return<div class="card 1">
      <div class="card_image"> <img src={item?.img} alt="chechebsa" />
      <div 
        style={{
          display:'flex',
          justifyContent:'right',
          margin:'30px 10px'
          }}
      >
        <span 
          onClick={()=>{
            removeFavorite(item.id)
          }} 
          style={{
            cursor:'pointer'
          }}>
              <BookmarkRemoveIcon/>
        </span>
        </div>            
        <div 
          style={{
            display:'flex',
            justifyContent:'right',
            margin:'30px 10px'
            }}>
          
        </div>
        <Link 
          to={`/Recipe/${item?.title}`} 
          state={item} 
          style={{
            textDecoration:'none',
            cursor:'pointer',
            color:'black'
          }}>
          <p className="">{item?.title}</p>
        </Link>
     
        <p className="">{dec}</p>
      </div>
    </div>
    })}

        </div>
      </div>


      <div style={{marginTop: 'auto'}}>
        <footer> © EthioFood 2022</footer>
      </div>

    </div>





  );
}

export default Favorites;

