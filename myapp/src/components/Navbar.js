import React,{useState,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { getAuth, signOut } from 'firebase/auth'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';




function Navbar() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [isAdmin,setIsadmin] = useState(false)
    useEffect(()=>{
      
      if(auth?.lastNotifiedUid == '7kbPy4lOBPc5orYApkmMjoviBu82'){
        setIsadmin(true)
      }

    },[auth])

    return (
            <>
           <Box sx={{ display: 'flex' ,width:'100%',display:'flex',justifyContent:'end'}}>
           <AppBar component="nav" style={{backgroundColor:'#CD7F32'}}>
        <Toolbar style={{display:'flex',justifyContent:'end'}}>

          <IconButton
          style={{}}
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <img src="/images/logo.png" alt="EthioFood Logo" style={{height: '55px'}}></img>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            
              {isAdmin && <Button k sx={{ color: '#fff' }} 
                onClick={()=>{
                  navigate('/Admin')
                }}>
                Admin
              </Button>}
              <Button k sx={{ color: '#fff' }} 
                onClick={()=>{
                  navigate('/')
                }}>
                home
              </Button>
              <Button k sx={{ color: '#fff' }} 
                onClick={()=>{
                  navigate('/Recipies')
                }}>
                Recipes
              </Button>
              <Button k sx={{ color: '#fff' }} 
                onClick={()=>{
                  navigate('/Favorites')
                }}>
                Favorites
              </Button>
              <Button k sx={{ color: '#fff' }} 
                onClick={()=>{
                  navigate('/Ingredients')
                }}>
        
                Ingredients
              </Button>
              <Button k sx={{ color: '#fff' }} 
                onClick={()=>{
                  navigate('/Cook')
                }}>
                Cook
              </Button>
              
              <Button k sx={{ color: '#fff' }} 
                onClick={()=>{
                  navigate('/Articles')
                }}>
                Articles
              </Button>
              <Button k sx={{ color: '#fff' }} 
                onClick={()=>{
                  navigate('/contact')
                }}>
                contact
              </Button>
              <Button k sx={{ color: '#fff' }} 
                style={{border:'1px solid white',backgroundColor:'#2874A6'}}
                onClick={()=>{
                  if(auth?.lastNotifiedUid){
                    signOut(auth)
                    navigate('/')

                  }else{
                    navigate('/Login')
                  }
                }}>
                {
                  auth?.lastNotifiedUid?
                  <>
                  LOGOUT
                  </> 
                  :
                  <>
                  LOGIN
                  </>
                }
              </Button>
            
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
    </>
    );
}

export default Navbar;
