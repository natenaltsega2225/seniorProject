import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import swal from 'sweetalert'


export default function RecipeReviewCard({data,dec,recip,addFavorite,deleteItem,auth}) {
    const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 320 ,minWidth:320 }}>
      <CardMedia
        component="img"
        height="194"
        image={data.img}
        alt="Paella dish"
      />
      <CardContent>
        <Typography 
            style={{cursor:'pointer'}}
            onClick={()=>{
                navigate(`/Recipe/${data?.title}`,{state:data})
            }}
        variant="body2" 
        color="text.secondary">
          {dec}
        </Typography>
        <Typography
        variant="body2" 
        color="text.secondary"
        style={{display:'flex',}}
        ><AccountCircleIcon style={{color:'#ccc',marginRight:'5px'}}/>{data?.creator?.name}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton 
            onClick={()=>{
                addFavorite(data.id)
            }}
            aria-label="add to favorites">
            {recip?.includes(data.id)?
            <BookmarkIcon/>
            :
            <BookmarkBorderIcon/>
            }
        </IconButton>
        <IconButton
            onClick={()=>{
                if(auth?.lastNotifiedUid == data.Uid){
                  navigate(`/AddRecipe`,{state:data})
                }else{
                  swal('you are not authorized')
                }
            }}    
        >
            <span>&#128393;</span>
        </IconButton>
        <IconButton
        onClick={()=>deleteItem(data.Uid,data.id)} 
        >
            <span>&#128465;</span>
        </IconButton>
      </CardActions>
    </Card>
  );
}
