import app from '../../../fireConfig'
import swal from 'sweetalert'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';






const auth = getAuth(app)

// setting the login credentials 
const Login = (props) => {
const [email,setEmail] = useState()
const [password,setPassword] = useState()


  function login(e) {
    e.preventDefault()
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    signInWithEmailAndPassword(auth, email, password)
      .then((u) => {
        console.log('Successfully Logged In');
        swal("logged in!")
       
      })
      .catch((err) => {
        swal("there was a problem logging in")
        
      })
  }


  return (
    <Container style={{
      marginTop: '5%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background:'#EEF0EE'
   
      }}
      maxWidth="xs"
    >
      <div className="form_img" style={{textAlign:'center'}}> 
        <img src="images/logo.png"></img>
        <h3>Login

        </h3>
      </div>
    <form  
      style={{
          width:'100%',
          backgroundColor:'white',
          padding:'5%'

      }}
      onSubmit={login}
      >

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            tyle={{border:'none'}}
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
          />
        </Grid>                       
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        style={{ 
          margin: '16px auto ',
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        }}
      >
        Sign In
      </Button>
    </form>
    <Grid container style={{paddingLeft:'20px'}}>
      <Grid item>
        <Link to="/sign-up" >
          {"Does not have an Account? Sign Up"}
        </Link>
      </Grid>
    </Grid>
</Container>
  )
}


export default Login;