import { React, useState, useEffect } from 'react';
import '../Page.css'
import { Link, useNavigate,useLocation} from "react-router-dom";

import { getDatabase, ref, onValue } from "firebase/database";
import app,{db,storage} from '../../../fireConfig'
import Navbar from '../../Navbar';
import image from '../../pages/chicken_stew.jpg'

import { collection, getDocs,deleteField,doc ,deleteDoc } from "firebase/firestore"; 

function Recipe({props}) {
  const navigate = useNavigate();
  const location = useLocation();


console.log(location)
  const [rec, setRec] = useState({});
  const [loading, setLoading] = useState(true);
  const [recipe,setRecips] = useState('')
  const [selectedRecipe,setSelectedRecipe] = useState('')


useEffect(async()=>{
if(location?.state?.category){

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${location?.state?.category}`)
  
  .then(res=>res.json())
  .then(data=> {
    let arr = []
    data?.meals.map((item)=>{
      console.log(item)
      let obj = {
        img:item.strMealThumb, 
        id:item.idMeal
      }
      arr.push(obj)
    })
    setRecips(arr);
  })
}

},[location?.state?.category])

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
  
      setSelectedRecipe(obj)
    })
  }

  useEffect(()=>{
    let obj = {
      steps:location.state.steps,
      ingredients:location.state.ingredients,
      description:location.state.description,
      title:location.state.title,
      img:location.state.img,
    }

    setSelectedRecipe(obj)

  },[location.state])
  
    return (
      <>
         <Navbar />
      <div className="recipe">
    
        {selectedRecipe && (
        <>
        <h1>{selectedRecipe?.title}
        </h1>
        <img src={selectedRecipe.img} alt='recipe ' />
        <p style={{textAlign:'center'}}>{selectedRecipe?.description}</p>
        <h1>Ingredients</h1>
        <ul>{ selectedRecipe?.ingredients.map(e => { return <li>{e}</li> }) 
        }</ul>
        <h1>Steps</h1>
        <ol>{selectedRecipe?.steps.map(e => { return <li>{e} </li> })}</ol>
        </>
        )}

        <div style={{margin:'10px',padding:'10px'}}>
          <p style={{margin:'10px',padding:'10px',fontSize:'18px'}}>You’ll Also Love</p>
          <div style={{display:'flex',width:'100%',flexWrap:'wrap'}}>
            {recipe?.length && recipe?.map((item)=>{
              return<div onClick={()=>handleClick(item)} >
                <img src={item?.img} alt="chechebsa" style={{height:'300px',width:'300px',borderRadius:'10px',marginLeft:'20px'}}/>
              </div>
            })}
          </div>
        </div>


        <div class="hero_container">
          <h3 className="hero-container-recipe-text"> Check out the common Ethiopian Cooking items</h3>
          <p className="hero-container-recipe-text-2">use the recipes and  give it a try . </p>



          <div>

            <Link to="/cook" onClick="">

              <button aria-label="button" className='btn_explore'> Cookware </button>
            </Link>

          </div>
        </div>


      </div>
      </>
   

    );
  
}

export default Recipe;