import React,{useEffect,useState} from 'react';
import Navbar from '../../Navbar';
import './Food.css'
// import addIcon from '../../../images/addIcon.jpg'
import { collection, getDocs,deleteField,doc ,deleteDoc,addDoc,updateDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';
import { db,storage } from '../../../fireConfig';
import { getAuth, multiFactor, onAuthStateChanged } from 'firebase/auth'
import { async } from '@firebase/util';
import RecipeReviewCard from './card'
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import CardActions from '@mui/material/CardActions';

import swal from 'sweetalert'

function Food() {
  const [recips,setRecips] = useState([])
  const [recipsb,setRecipsb] = useState([])
  const [sortedRecips,setSortedRecips] = useState([])
  const [recip,setRecip] = useState([])
  const [SearchRecip,setSearchRecip] = useState([])
  const [deleted,setDeleted] = useState('')
  const [searchInput,setSearch] = useState('')
  const [isLoading,setIsLoading] = useState(false)
  const auth = getAuth();
  const navigate = useNavigate();
  const [selectedRecipe,setSelectedRecipe] = useState('')
  const [filterRecip, setFilterRecip] = useState('All')


  useEffect( async() => {
    fetchRecipes()
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

    const cityRef = doc(db, 'recipe', id);
    const deletedItem  = await deleteDoc(cityRef)
    swal('Deleted successfully..')

    setDeleted(`${Date.now()}`)
  }else if(auth?.lastNotifiedUid == '7kbPy4lOBPc5orYApkmMjoviBu82'){
    const cityRef = doc(db, 'recipe', id);
    const deletedItem  = await deleteDoc(cityRef)
    swal('Deleted successfully..')

    setDeleted(`${Date.now()}`)
  }
  else{
    swal('you are not authorized')
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
        swal('unsaved successfully')
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
        swal('saved successfully')
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
        swal('saved successfully')
      })
    }




}else{
  swal('login first')
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
      swal("No result found");
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

const fetchRecipes = async()=>{
  const querySnapshot = await getDocs(collection(db, "recipe"));
  let arr = []
  querySnapshot.forEach((doc) => {
    // console.log(doc.id,'getting id')
    let data = doc.data()
    data['id'] = doc.id
    arr.push(data)
  console.log({data});
  });
  setRecipsb(arr)
}
const filterInPlace = (array, predicate) => {
  let end = 0;

  for (let i = 0; i < array.length; i++) {
      const obj = array[i];

      if (predicate(obj)) {
          array[end++] = obj;
      }
  }

  array.length = end;
};

const handleFilter = (e,ar)=>{
  setFilterRecip(e)
  setIsLoading(true)
  fetchRecipes()
  console.log('sorted',recips,ar)

  let carr = []
  let sorted = []
  let isadded = true
  let arr = []
 let count = 0
  ar.map((ditem)=>{
    recipsb.map((item)=>{
      count++
    isadded = true
    carr = item.steps
    carr?.map((step)=>{
      if(step.search(ditem) !== -1){
        isadded = false
        arr.push(item.id)
        return
      }
    })
    if(isadded){
      sorted.push(item)

    }
  })
})
console.log(sorted,arr)
const toDelete = new Set(arr);
let sortedARR = Object.values(sorted.reduce((acc,cur)=>Object.assign(acc,{[cur.id]:cur}),{}))
filterInPlace(sortedARR, obj => !toDelete.has(obj.id));
console.log(sortedARR);

setRecipsb(sortedARR)
setRecips(sortedARR)
console.log(sortedARR,count)

setTimeout(() => {

  setIsLoading(false)
}, 1000);
}

  return (
    <div>
      <Navbar />

      <div className='heading-container'>
        <h1>How much do you know about Ethiopian food ?</h1>
        <p>learn about different kinds of Ethiopian Food</p>
      </div>

      <div  style={{width:'100%',justifyContent:'center',display:'flex'}}>
        <input
          type="text"
          style={{width:'70%',borderRadius:'20px'}}
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

    <Grid container  spacing={3} style={{padding:'20px',display:'flex',justifyContent:'center'}}>
            <Grid item>
            <Card sx={{ maxWidth: 100 ,minWidth:50,maxHeight:100,minHeight:50 ,cursor:'pointer',borderRadius:'50px',border:filterRecip=='All' && '2px solid #CD7F32' }}
                onClick={()=>{
                  handleFilter('All',['No-filter'])
                }}
              >
                <CardMedia
                  component="img"
                  height="60"
                  width="40"
                  image='images/clear.png'
                   style={{width:'60px',margin:'auto'}}
                />
                <CardContent>
                  <Typography
                      style={{cursor:'pointer',fontSize:'10px',textAlign:'center',width:'70px'}}

                  variant="body2"
                  color="text.secondary">

                    All
                  </Typography>

                </CardContent>

              </Card>
            </Grid>
            <Grid item>
            <Card sx={{ maxWidth: 100 ,minWidth:50,maxHeight:100,minHeight:50 ,cursor:'pointer',borderRadius:'50px',border:filterRecip=='Low-Calorie' && '2px solid #CD7F32' }}
                onClick={()=>{
                  handleFilter('Low-Calorie',['flour','chia-seeds','fish','potatoes'])
                }}
              >
                <CardMedia
                  component="img"
                  height="60"
                  width="40"
                  image='images/IMG-20221111-WA0003.jpg'
                   style={{width:'60px',margin:'auto'}}
                />
                <CardContent>
                  <Typography
                      style={{cursor:'pointer',fontSize:'10px',textAlign:'center',width:'70px'}}

                  variant="body2"
                  color="text.secondary">

                    Low-Calorie
                  </Typography>

                </CardContent>

              </Card>
            </Grid>
            <Grid item>
            <Card sx={{ maxWidth: 100 ,minWidth:50,maxHeight:100,minHeight:50 ,cursor:'pointer',borderRadius:'50px',border:filterRecip=='Allergy-Free' && '2px solid #CD7F32' }}
                onClick={()=>{
                  handleFilter('Allergy-Free',['flour','calamari','mushrooms','mushroom'])
                }}
              >
                <CardMedia
                  component="img"
                  height="60"
                  width="40"
                  image='images/i (3).jpg'
                   style={{width:'60px',margin:'auto'}}
                />
                <CardContent>
                  <Typography
                      style={{cursor:'pointer',fontSize:'10px',textAlign:'center',width:'70px'}}

                  variant="body2"
                  color="text.secondary">

                    Allergy-Free
                  </Typography>

                </CardContent>

              </Card>
            </Grid>
            <Grid item>
            <Card sx={{ maxWidth: 100 ,minWidth:50,maxHeight:100,minHeight:50 ,cursor:'pointer',borderRadius:'50px',border:filterRecip=='Vegan' && '2px solid #CD7F32' }}
                onClick={()=>{
                  handleFilter('Vegan',['lamb','chiken','beef','steak','pork','milk','egg','cheese','yogurt'])

                }}
              >
                <CardMedia
                  component="img"
                  height="60"
                  width="40"
                  image='images/i (1).jpg'
                   style={{width:'60px',margin:'auto'}}
                />
                <CardContent>
                  <Typography
                      style={{cursor:'pointer',fontSize:'10px',textAlign:'center',width:'70px'}}

                  variant="body2"
                  color="text.secondary">

                    Vegan
                  </Typography>

                </CardContent>

              </Card>

            </Grid>
            <Grid item>
            <Card sx={{ maxWidth: 100 ,minWidth:50,maxHeight:100,minHeight:50 ,cursor:'pointer',borderRadius:'50px' ,border:filterRecip=='dairy-free' && '2px solid #CD7F32'}}
                onClick={()=>{
                  handleFilter('dairy-free',['butter','egg','milk','cheese','yogurt'])

                }}
              >
                <CardMedia
                  component="img"
                  height="60"
                  width="40"
                  image='images/i (2).jpg'
                  style={{width:'60px',margin:'auto'}}
                />
                <CardContent>
                  <Typography
                      style={{cursor:'pointer',fontSize:'10px',textAlign:'center',width:'70px'}}

                  variant="body2"
                  color="text.secondary">

                    dairy-free
                  </Typography>

                </CardContent>

              </Card>
            </Grid>
    </Grid>

      <div style={{textAlign:'center'}}>
        {isLoading && <CircularProgress />}
      </div>

      <div style={{margin:'50px'}}>

        <h2 className="bfast">Recipes Added by Users </h2>
      </div>

      <div class="cards-list" style={{display:'flex',flexWrap:"wrap"}}>
        <Card sx={{ maxWidth: 320 ,minWidth:320,cursor:'pointer' }}
          onClick={()=>{
            if(auth?.lastNotifiedUid){
              navigate(`/AddRecipe`)
            }else{
              swal("Hey you are not logged in.", "Login to add your recipes");
              navigate('/Login')
            }
          }}
        >
          <CardMedia
            component="img"
            height="270"
            image='images/addIcon.jpg'
            alt="add recipe"
          />
          <CardContent>
            <Typography
                style={{cursor:'pointer'}}

            variant="body2"
            color="text.secondary">
              Add new Recipe
            </Typography>

          </CardContent>

        </Card>

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

      <div>
      <footer> © EthioFood 2022</footer>
    </div>



    </div>
  );
}

export default Food;
