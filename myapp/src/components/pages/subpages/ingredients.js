import React,{useEffect,useState} from 'react';
import { collection, getDocs,deleteField,doc ,deleteDoc,addDoc,updateDoc } from "firebase/firestore"; 
import { db,storage } from '../../../fireConfig';

import './../Page.css'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Navbar from '../../Navbar';


function Ingredients() {
  const [ingredients,setIngredients]=useState([])
  useEffect(async()=>{
    const querySnapshot = await getDocs(collection(db, "ingredients"));
    let arr = []
    querySnapshot.forEach((doc) => {
      // console.log(doc.id,'getting id')
      let data = doc.data()
      data['id'] = doc.id
      arr.push(data)
      console.log({data});
    });
    setIngredients(arr)
  },[])
  console.log(ingredients)


  return (
    <div>
<Navbar />
      <div className='heading-container' style={{marginBottom:'30px'}}>
        <h1>Common Spices used in Ethiopion Foods</h1>
        <p>Some of them are hot !</p>
      </div> 


<Grid container style={{display:'flex',flexWrap:"wrap",justifyContent:'space-around'}} spacing={5}>
 {ingredients.map((data)=>{
  return  <Grid item>
  <Card sx={{ maxWidth: 320 ,minWidth:320,cursor:'pointer',minHeight:'540px' }}
      onClick={()=>{
      
      }}  
    >
      <CardMedia
        component="img"
        height="270"
        image={data.image}
        alt="add recipe"
      />
      <CardContent>
        <Typography 
            style={{cursor:'pointer',fontSize:'18px'}}
            
        variant="body2" 
        color="text.secondary">
          
          {data.title}
        </Typography>
        <Typography 
            style={{cursor:'pointer'}}
            
        variant="body2" 
        color="text.secondary">
          
         {data.description}
        </Typography>
            <a href={data.url} style={{textDecoration:'none',display:'flex',justifyContent:'center',margin:'5px'}}>
              <span style={{backgroundColor:'rgb(25, 201, 128)',color:'#FFF',padding:'5px',borderRadius:'5px',margin:'5px'}}>Learn More</span>
            </a>
      </CardContent>
      
    </Card>

</Grid>
 })}

</Grid>

      <div>
        <footer> © EthioFood 2022</footer>
      </div>

    </div>

  );
}




export default Ingredients;