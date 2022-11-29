import React,{useEffect,useState} from 'react';

import { collection, getDocs,deleteField,doc ,deleteDoc,addDoc,updateDoc } from "firebase/firestore"; 
import { db,storage } from '../../../fireConfig';
import '../Page.css';
import Navbar from '../../Navbar';
import { Grid } from '@mui/material';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function Cook() {
  const [cook,setCook]=useState([])
  useEffect(async()=>{
    const querySnapshot = await getDocs(collection(db, "cookwares"));
    let arr = []
    querySnapshot.forEach((doc) => {
      // console.log(doc.id,'getting id')
      let data = doc.data()
      data['id'] = doc.id
      arr.push(data)
      console.log({data});
    });
    setCook(arr)
  },[])
  console.log(cook)

  return (
    <div>
<Navbar />
      <div className='heading-container' style={{marginBottom:'30px'}}>
      <h1>The most common used Cookwares</h1>
      <p>Incase if you want to cook Ethiopian Food</p>
    </div> 

<Grid container style={{display:'flex',flexWrap:"wrap",justifyContent:'space-around'}} spacing={5}>
{cook.map((cook)=>{
  return  <Grid item>
    <Card sx={{ maxWidth: 320 ,minWidth:320,cursor:'pointer' }}
        onClick={()=>{
        
        }}  
      >
        <CardMedia
          component="img"
          height="270"
          image={cook.image}
          alt="add recipe"
        />
        <CardContent>
          <Typography 
              style={{cursor:'pointer',fontSize:'18px'}}
              
          variant="body2" 
          color="text.secondary">
            
            {cook.title}
          </Typography>
          <Typography 
              style={{cursor:'pointer'}}
              
          variant="body2" 
          color="text.secondary">
            
            {cook.description}
          </Typography>
              <a href={cook.url} style={{textDecoration:'none',display:'flex',justifyContent:'center',margin:'5px'}}>
                <span style={{backgroundColor:'rgb(25, 201, 128)',color:'#FFF',padding:'5px',borderRadius:'5px',margin:'5px'}}>Buy here</span>
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




export default Cook;