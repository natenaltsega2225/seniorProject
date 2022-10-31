import React,{useEffect,useState} from 'react';
import Navbar from '../../Navbar';
import './Food.css'
import addIcon from '../subpages/addIcon.jpg' 
import { collection, getDocs,deleteField,doc ,deleteDoc,addDoc,updateDoc } from "firebase/firestore"; 
import { Link, useNavigate } from 'react-router-dom';
import { db,storage } from '../../../fireConfig';
import { getAuth, multiFactor, onAuthStateChanged } from 'firebase/auth'
import { async } from '@firebase/util';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import RecipeReviewCard from './card'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

function Food() {
  const [recips,setRecips] = useState([])
  const [recip,setRecip] = useState([])
  const [SearchRecip,setSearchRecip] = useState([])
  const [deleted,setDeleted] = useState('')
  const [searchInput,setSearch] = useState('')
  const auth = getAuth();
  const navigate = useNavigate();
  const [selectedRecipe,setSelectedRecipe] = useState('')

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
              myRcipes.push(item.id)
            }
          }
        })
        setRecip(myRcipes)
        arr = myRcipes
       
      }else{
        setRecip([])
      }
    }


    },[]);

  useEffect(async()=>{
    const querySnapshot = await getDocs(collection(db, "recipe"));
    let arr = []
    querySnapshot.forEach((doc) => {
      // console.log(doc.id,'getting id')
      let data = doc.data()
      data['id'] = doc.id
      arr.push(data)
    console.log({data});
    });
    setRecips(arr)
  },[deleted])

const deleteItem = async (Uid,id)=>{
  if(auth?.lastNotifiedUid == Uid){
    alert('Your recipe is removed!')
    const cityRef = doc(db, 'recipe', id);
    const deletedItem  = await deleteDoc(cityRef)
    setDeleted(`${Date.now()}`)
  }else{
    alert('you are not authorized')
  }

}

const addFavorite = async(id)=>{
//check if user loged in or not
if(auth?.lastNotifiedUid){
    //add favorite recipies to my collection
    let alldoc = {};
    let getFavorites = await getDocs(collection(db, "favorite"))
    getFavorites.forEach((doc) => {
      alldoc = doc.data()
    });

    let UID = auth?.lastNotifiedUid
    console.log(id,'favorite recipe id')
    let myFavorites = alldoc[UID]
    console.log(myFavorites,'my fav')

    if(recip.includes(id)){
      let sorted = []
      recip.map((item)=>{
         if (item == id){
            
         }
         else{
          sorted.push(item)
         } 
      })

      let obj = {
        [UID]:sorted
      }
      const docRef = doc(db, "favorite", 'ZrrC2vq1ksuIxOdikgwh')
      updateDoc(docRef, obj)
      .then(()=>{
        setRecip(sorted)
        alert('unsaved successfully')
      })
      console.log(sorted,'sorted')
      return
    }


    if(myFavorites){
      myFavorites.push(id)
      let obj = {
        [UID]:myFavorites
      }
      const docRef = doc(db, "favorite", 'ZrrC2vq1ksuIxOdikgwh')
      updateDoc(docRef, obj)
      .then(()=>{
        setRecip(myFavorites)
        alert('saved successfully')
      })
    }else{
      let arr = []
      arr.push(id)
      let obj = {
        [UID]:arr
      }
      const docRef = doc(db, "favorite", 'ZrrC2vq1ksuIxOdikgwh')
      updateDoc(docRef, obj)
      .then(()=>{
        alert('saved successfully')
      })
    }




}else{
alert('Please login first')
navigate('/Login')
}

}

const hendleClick = ()=>{
  console.log(searchInput)
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
  .then(res=>res.json())
  .then((data)=>{
    console.log(data)
    if(data.meals === null){
      alert('no result found')
      return
    }
    let arr = []
    data?.meals?.map((item)=>{
      console.log(item)
      let obj = {
        img:item.strMealThumb, 
        id:item.idMeal
      }
      arr.push(obj)
    })
    setSearchRecip(arr);

  })

  
}

const handleClick = (e)=>{
  console.log(e.id)
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e.id}`)
  .then(res=>res.json())
  .then(({meals})=>{
    console.log(meals[0])
    let obj = {
      steps:[`${meals[0].strInstructions}`],
      ingredients:[
      `${meals[0].strIngredient1}`,
      `${meals[0].strIngredient2}`,
      `${meals[0].strIngredient3}`,
      `${meals[0].strIngredient4}`,
      `${meals[0].strIngredient5}`,
      `${meals[0].strIngredient6}`,
      `${meals[0].strIngredient7}`
    ],
      title:meals[0].strMeal,
      img:meals[0].strMealThumb,
    }
    navigate(`/Recipe/${obj?.title}`,{state:obj})
    setSelectedRecipe(obj)
  })
}
  return (
    <div>
      <Navbar />


      <div className='hero-container'>
        <h1 className="food_heading">How much do you know about Ethiopian food ?</h1>
        <p className="food_text">Explore & learn about different kinds of Ethiopian Food </p>


      </div>
      <div  style={{width:'100%',justifyContent:'center',display:'flex'}}>
        <input
          type="text"
          style={{width:'70%',borderRadius:'20px', marginBottom: '-80px'}}
          placeholder="Search recipes"
          value={searchInput}
          onChange={(e)=>{
            setSearch(e.target.value)
          }}
          >
          
          </input>
        <p style={{
          padding:'14px 12px',
          borderRadius:'16px',
          border:'1px solid green',
          color: 'white',
          backgroundColor:'green',
          marginTop:'5px',
          height:'53px',
          cursor:'pointer'
          
          }}
          onClick={hendleClick}
          >
          <SearchIcon/>
        </p>
      </div>
      {SearchRecip.length > 0 && <div>
        <p style={{margin:'30px'}}>search results...</p>
          <div style={{display:'flex',width:'100%',flexWrap:'wrap'}}>
            {SearchRecip?.map((item)=>{
              return<div onClick={()=>handleClick(item)} >
                <img src={item?.img} alt="chechebsa" style={{height:'300px',width:'300px',borderRadius:'10px',marginLeft:'20px',cursor:'pointer'}}/>
              </div>
            })}
          </div>
      </div> } 
      <div className='hero-container-food'>

        <h2 className="bfast">Featured Recipes</h2>
      </div>
   



      <div class="cards-list" style={{display:'flex',flexWrap:"wrap"}}>
        <div class="card">
          <div 
          onClick={()=>{
            if(auth?.lastNotifiedUid){
              navigate(`/AddRecipe`)
            }else{
              alert('Please log in first')
              navigate('/Login')
            }
            
          }}
            class="card_image"> <img src={addIcon} alt="chechebsa" />
                <p className="card_details_food-1_btn"> Add new recipe</p>
           
          </div>
          

        </div>
        
        {recips?.map((item,{description})=>{
          // item?.description = 10;
          let dec = item?.description
          let str = []
          for(let i=0 ;i<70;i++ ){
            str.push(dec[i])
          }
          dec = str
          return<RecipeReviewCard 
          data={item} 
          dec={dec} 
          recip={recip}
          auth={auth}
          deleteItem={deleteItem}
          addFavorite={addFavorite}/>
        })}

      </div>

      {/* <div>
        <h5 className="hero-container-food-text"> Are you Vegan or Carn ?</h5>
        <p className="hero-container-food-text-2"> click below & see the  Vegan & Carn food choices </p>
      </div> */}

      {/* <div>
        <Link to="/nutrition" onClick="">

          <button aria-label="button" className='btn_explore'> Explore </button>
        </Link>
      </div> */}

    </div>
  );
}

export default Food;
