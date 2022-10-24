import React, { useEffect } from 'react'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import {Box,Button,Card, Container, Link ,Typography, Alert} from '@mui/material';
import { getUser, signup, updateUser } from '../services/api';

export default function MaxExpence(props) {
    
    const[user,setUser]=useState("");
    const [alert, setAlert]= useState(false);
    const [alertVerient, setAlertVerient]= useState("");
    const [alertMessage, setAlertMessage]= useState("");

    useEffect(() => {
        getUserById()

    }, [])
    
    const getUserById = () =>{
        
         getUser(localStorage.getItem('userName')).then(res=>{
             setUser(res.data);
         })
        
     }
    const handleChange =  (e)=>{
        setUser(value=>({...value,'maxExpense':e.target.value}))
        
    }

    const onSubmit = () => {
        updateUser(localStorage.getItem('userName'),user).then(res=>{
            setAlert(true);
            
            setAlertVerient("success")
            setAlertMessage("Max Amount Addedd. ")
        }).catch(error=>{
            console.log(error.response)
            setAlert(true);
            
            setAlertVerient("warning")
            setAlertMessage(error.response.data.message)
           
        });
    }
  return (
    <div>
        
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
        Add Max Expense
    </Typography>
    
        <div>
     <TextField
     type="number"
          required
          name='maxExpense'
          id="outlined-required"
          label="Max Expense"
          placeholder="Max Expense"
         
          onChange={handleChange}
        />
        </div>
        <div>
            <Button onClick={onSubmit}>save</Button>
            <Link href="/dashboard" variant="body2"> Back</Link>
        </div>
        </Card>
        </Box>
        </Container>
   
    </div>
  )
}
