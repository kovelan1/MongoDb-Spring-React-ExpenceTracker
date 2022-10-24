import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import {Box,Button,Card, Container, Link ,Typography, Alert} from '@mui/material';
import { signup } from '../services/api';

export default function Signup() {

    const [inputs, setInputs] = useState({});
    const [alert, setAlert]= useState(false);
    const [alertVerient, setAlertVerient]= useState("");
    const [alertMessage, setAlertMessage]= useState("");

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }

      const handleSubmit =(event)=>{
        event.preventDefault();
        signup(inputs).then(res=>{
            setAlert(true);
            
            setAlertVerient("success")
            setAlertMessage("Registred Sucess. Login to continue ")
        }).catch(error=>{
            console.log(error.response)
            setAlert(true);
            
            setAlertVerient("warning")
            setAlertMessage(error.response.data.message)
           
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
        Register
    </Typography>
    
        <div>
     <TextField
          required
          name='firstName'
          id="outlined-required"
          label="First Name"
          placeholder="User Name"
          value={inputs.firstName || ""} 
          onChange={handleChange}
        />
        </div>
        <div>
     <TextField
          required
          name='lastName'
          id="outlined-required"
          label="Last Name"
          placeholder="User Name"
          value={inputs.lastName || ""} 
          onChange={handleChange}
        />
        </div>
        <div>
     <TextField
          required
          name="userName"
          id="outlined-required"
          label="User Name"
          placeholder="User Name"
          value={inputs.userName || ""} 
          onChange={handleChange}
        />
        </div>
        <div>
         <TextField
          name="password"
          type="password"
          required
          id="outlined-required"
          label="Password"
          placeholder="password"
          value={inputs.password || ""} 
          onChange={handleChange}
        />
     </div>
     <Button onClick={handleSubmit}  variant="contained">Register</Button>
     <div>
     <Link href="/login" variant="body2">
                {"Already have an account? Login"}
     </Link>
     </div>
     
    
     </Card>
    </Box>
    
    
    </Container>
  )
}
