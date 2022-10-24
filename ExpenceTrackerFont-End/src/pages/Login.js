import { useNavigate } from "react-router-dom";
import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import {Alert, Box,Button,Card, Container, Link, Typography } from '@mui/material';
import { getAuthondicated } from '../services/api';



export default function Login() {

    const [inputs, setInputs] = useState({});
    const [alert, setAlert]= useState(false);
    const [alertVerient, setAlertVerient]= useState("");
    const [alertMessage, setAlertMessage]= useState("");
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }

      const handleSubmit =(event)=>{
        
        event.preventDefault();
        getAuthondicated(inputs).then(res=>{
            localStorage.setItem('authenticated',true)
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('userName',res.data.userName)
            navigate("/dashboard");
             
        }).catch(error=>{
            console.log(error.response)
            setAlert(true);
            if(error.response.status==400){
                setAlertVerient("error")
                setAlertMessage(error.response.data.message)
            }else{
                setAlertVerient("warning")
                setAlertMessage("Some thing went wrong !")
            }
                
           
        });
      }

  return (
    <Container maxWidth="sm" >
        {alert==true ? <Alert severity={alertVerient}>{alertMessage}</Alert> :<></>}
         <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '35ch' },
      }}
      
      noValidate
      autoComplete="off"
    >
    <Card variant="outlined" >
    <Typography variant="h5">
        Login
    </Typography>
    <div>
     <TextField
          required
          name='userName'
          id="outlined-required"
          label="User Name"
          placeholder="User Name"
          value={inputs.userName || ""} 
          onChange={handleChange}
        />
        </div>
        <div>
         <TextField
          name='password'
          required
          id="outlined-required"
          label="Password"
          type="Password"
          placeholder="password"
          value={inputs.password || ""} 
          onChange={handleChange}
        />
     </div>
     <Button onClick={handleSubmit}  variant="contained">Login</Button>
     <div>
     <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
     </Link>
     </div>
     
    
     </Card>
    </Box>
    
    
    </Container>
  )
}
