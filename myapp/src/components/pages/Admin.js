import React ,{useState}from 'react'
import Navbar from '../Navbar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { Link, useNavigate } from 'react-router-dom';
import { getAuth, multiFactor, onAuthStateChanged } from 'firebase/auth'

import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { db,storage } from '../../fireConfig';
import {
    collection,
    addDoc,
    serverTimestamp,
    doc,
    setDoc,
    updateDoc,
    deleteField ,
    getDocs
  } from "firebase/firestore";

import swal from 'sweetalert'
import { async } from '@firebase/util';
import { Description } from '@mui/icons-material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  
export default function Admin() {
    const [open, setOpen] = React.useState(false);
    const [openING, setOpenING] = React.useState(false);
    const [openCOOK, setOpenCOOK] = React.useState(false);
    const [imageToPost, setImageToPost] = React.useState(null);
    const [img, setImg] = useState('')
    const [itemtitle, setitemTitle] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenING = () => setOpenING(true);
    const handleCloseING = () => setOpenING(false);
    const handleOpenCOOK = () => setOpenCOOK(true);
    const handleCloseCOOK = () => setOpenCOOK(false);
    const navigate = useNavigate();
    const auth = getAuth();

    const addImageToPost =async  (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = async(readerevent) => {
            // console.log(readerevent.target.result)
          setImageToPost(readerevent.target.result);

          const storageRef = ref(storage, `img/${Date.now()}`);
        //   console.log(storageRef)
  
          const uploadTask = await uploadString(storageRef, readerevent.target.result, 'data_url');
        //   console.log(uploadTask,'pp')
          const url = await getDownloadURL(uploadTask.ref);
          setImg(url)
          console.log(url,'oooooooo')

        };
      
      };

const handlesubmit = async ()=>{
    const data= {
            image:img,
            url:title
        }
    
    const docRef = await addDoc(collection(db, `articles`),data);
    console.log("Document written with ID: ", docRef.id);
    swal('Article created successfully')
    handleClose()
    setImg('')
    setTitle('')
    setImageToPost('')

}
const handlesubmitING = async ()=>{
    const data= {
        image:img,
        url:title,
        title:itemtitle,
        description
    }
    console.log(data)
    
    const docRef = await addDoc(collection(db, `ingredients`),data);
    console.log("Document written with ID: ", docRef.id);
    swal('Ingredient added successfully')
    handleClose()
    setImg('')
    setTitle('')
    setitemTitle('')
    setDescription('')
    handleCloseING()
    setImageToPost('')
    navigate(`/Ingredients`)
}
const handlesubmitCOOK = async ()=>{
  const data= {
      image:img,
      url:title,
      title:itemtitle,
      description
  }
  console.log(data)
    
    const docRef = await addDoc(collection(db, `cookwares`),data);
    console.log("Document written with ID: ", docRef.id);
    swal('Cookware added successfully')
    handleClose()
    setImg('')
    setTitle('')
    setitemTitle('')
    setDescription('')
    handleCloseCOOK()
    setImageToPost('')
    navigate(`/Cook`)
}


  return (
    <>
        <Navbar />


        <div className='heading-container'>
          <h1>Welcome to Admin page</h1>
        </div>
        <Modal
            open={openING}
            onClose={handleCloseING}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                ADD INGREDENTS
            </Typography>
            <div>
                <img src={imageToPost} height={50} width={50}/>
                <p>Select Image</p>
                <input type="file" name="myImage" onChange={addImageToPost} />
            </div>
            <input type="text" placeholder="Enter Title" value={itemtitle} onChange={(e) => { setitemTitle(e.target.value) }} />
            <input type="text" placeholder="Enter URL" value={title} onChange={(e) => { setTitle(e.target.value) }} />
            <textarea placeholder="Description"  value={description} rows="4" onChange={(e) => { setDescription(e.target.value) }} >
            
            </textarea>  
          
              <Button onClick={handleCloseING}>Close</Button>
            <Button onClick={handlesubmitING}>Submit</Button>
            </Box>
        </Modal>
        <Modal
            open={openCOOK}
            onClose={handleCloseCOOK}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                ADD COOKWARES
            </Typography>
            <div>
                <img src={imageToPost} height={50} width={50}/>
                <p>Select Image</p>
                <input type="file" name="myImage" onChange={addImageToPost} />
            </div>
            <input type="text" placeholder="Enter Title" value={itemtitle} onChange={(e) => { setitemTitle(e.target.value) }} />
            <input type="text" placeholder="Enter URL" value={title} onChange={(e) => { setTitle(e.target.value) }} />
            <textarea  placeholder="Description" value={description} rows="4" onChange={(e) => { setDescription(e.target.value) }} >
            
            </textarea> 
          
              <Button onClick={handleCloseCOOK}>Close</Button>
              <Button onClick={handlesubmitCOOK}>Submit</Button>
            </Box>
        </Modal>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                ADD FEATURE ARTICLES / BLOGS
            </Typography>
            <div>
                <img src={imageToPost} height={50} width={50}/>
                <p>Select Image</p>
                <input type="file" name="myImage" onChange={addImageToPost} />
            </div>
            <input type="text" placeholder="Enter URL" value={title} onChange={(e) => { setTitle(e.target.value) }} />

            
          
              <Button onClick={handleClose}>Close</Button>
            <Button onClick={handlesubmit}>Submit</Button>
            </Box>
        </Modal>


        <Grid container spacing={3} style={{padding:'20px',justifyContent:'center'}}>
            <Grid item xs={12} md={3}
                onClick={()=>{
                    if(auth?.lastNotifiedUid){
                    navigate(`/AddRecipe`)
                    }else{
                    swal("Hey you are not logged in.", "Login to add your recipes");
                    navigate('/Login')
                    }
                }} 
                // style={{maxWidth:'30%'}}
            >
               
                <p style={{
                    padding:'5px',
                    border:'1px solid #000',
                    backgroundColor:'#ccc',
                    borderRadius:'20px',
                    minHeight:'100px',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center' ,
                    cursor:'pointer'
                    }}>ADD FEATURE RECIPES</p>
            </Grid>
            <Grid item xs={12} md={3}
                // style={{maxWidth:'30%'}}
                onClick={handleOpen}
            >
                <p style={{padding:'5px',
                border:'1px solid #000',
                backgroundColor:'#ccc',
                borderRadius:'20px',
                minHeight:'100px',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                cursor:'pointer'}}>ADD ARTICLES</p>
            </Grid>
            <Grid item xs={12} md={3}  onClick={handleOpenING}>
                <p style={{padding:'5px',
                border:'1px solid #000',
                backgroundColor:'#ccc',
                borderRadius:'20px',
                minHeight:'100px',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                cursor:'pointer'}}>ADD INGREDIENTS</p>
            </Grid>
            <Grid item xs={12} md={3}  onClick={handleOpenCOOK}>
                <p style={{padding:'5px',
                border:'1px solid #000',
                backgroundColor:'#ccc',
                borderRadius:'20px',
                minHeight:'100px',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                textAlign:'center',
                cursor:'pointer'}}>ADD COOKWARES</p>
            </Grid>
        </Grid>
    </>
  )
}
