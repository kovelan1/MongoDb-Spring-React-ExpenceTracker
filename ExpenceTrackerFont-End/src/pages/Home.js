import { Button, Card, Container, Grid, Link } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Chart } from "react-google-charts";
import ExpenseTable from '../components/ExpenseTable';
import { createExpences, pieChartData,expensesByUserAndDate,getUser,expensesLimitAlertByUser } from '../services/api';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { formatDate } from '../services/DateFormater';
import Alert from '@mui/material/Alert';
import TextFieldModel from '../components/TextFieldModel';
import MaxExpence from './MaxExpence';
import Typography from '@mui/material/Typography';


export const options = {
  title: "My Monthly Activities",
};

export default function Home() {

  const[user,setUser]=useState("");
  const[loading,setLoading]=useState(false);
  const [chartData, setChartData] = useState([]);
  const [inputs, setInputs] = useState(values => ({...values, ["user"]: {["userName"]:localStorage.getItem('userName')}}));
  const [alert, setAlert]= useState(false);
  const [limitAlert, setLimitAlert]= useState(false);
  const [alertVerient, setAlertVerient]= useState("");
  const [alertMessage, setAlertMessage]= useState("");
  const [open, setOpen] =useState(false);
  const[rows , setRows]=useState([])

  useEffect(() => {
    getUserById()
    getPicChartData()
    getExpences()
    getMaxLimitAlert()
  }, []);

  const getMaxLimitAlert=()=>{
    expensesLimitAlertByUser(localStorage.getItem('userName'),formatDate(new Date())).then(res=>{
      setLimitAlert(res.data.status);
      console.log(res.data);
    })
  }

  const getUserById = () =>{
    setLoading(true)
     getUser(localStorage.getItem('userName')).then(res=>{
         setUser(res.data);
     })
     setLoading(false)
 }

  // model popup
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // get expences by user and current month
  
  const getExpences= async ()=>{
    var monthStart=new Date().setDate(1);
    var monthEnd=new Date();
    
     expensesByUserAndDate(localStorage.getItem('userName'),formatDate(monthStart),formatDate(monthEnd)).then(res=>{
        
         setRows(res.data)
    })
}

  // get pie chart data

  const getPicChartData =async () => {
    let yourDate = new Date()
    
     pieChartData(localStorage.getItem('userName'), formatDate(yourDate)).then(res => {
      setChartData(generatePicData(res.data))
      
    })
    
  }

  const generatePicData=(data)=>{
    var arry=[["Category","Monthly Total"]];
    
    data.map((value,key)=>{
      arry.push([value.category, value.sum]);
    })
    return arry;
  }

  //add expence
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  

  const handleSubmit =async (event)=>{
    
    event.preventDefault();
    console.log(inputs)
    await createExpences(inputs).then(res=>{
      getPicChartData();
      setRows(values => [...values,res.data]);
      
      setAlert(true);   
      setAlertVerient("success")
      setAlertMessage("Expence Added")
    }).catch(error=>{
        console.log(error.response)
        setAlert(true);
        setAlertVerient("warning")
        setAlertMessage("Some thing went wrong !")
    });
  }

  return (
    <Container maxWidth="lg">
     
     
      <Grid container spacing={3}>
        <Grid item md={12}>
        <div style={{marginBottom:'10px'}}>
          {limitAlert=='true' ? <Alert severity='warning'> Max Expense Limit Exceeded 90%</Alert> :<></>}
      <Typography variant='h5'> Your Max Expence Limit {user.maxExpense} </Typography> 
      <Link href="/maxExpence" variant="body2"> Edit Max Limit</Link>  
      </div>

          <Card variant="outlined" >
            <Chart
              chartType="PieChart"
              data={chartData}
              options={options}
              width={"100%"}
              height={"400px"}
            />
          </Card>
        </Grid>
        <Grid item md={12}>
          <div style={{textAlign:'right', margin:'10px'}}>
          <Button variant="contained" onClick={handleClickOpen}>Add Expense</Button>
          </div>
          <ExpenseTable rows={rows}/>
          
        </Grid>
      </Grid>


      <TextFieldModel open={open} handleClose={handleClose} inputs={inputs} handleChange={handleChange} handleSubmit={handleSubmit} alert={alert} alertMessage={alertMessage} alertVerient={alertVerient} title="Add New Expence"/>
      {/* <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth="lg">
        <DialogTitle>Add New Expence</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {alert==true ? <Alert severity={alertVerient}>{alertMessage}</Alert> :<></>}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="category"
            label="Category"
            fullWidth
            variant="standard"
            value={inputs.category || ""} 
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            variant="standard"
            value={inputs.description || ""} 
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            type="number"
            step=".01"
            name="price"
            label="Amount $"
            fullWidth
            variant="standard"
            value={inputs.price || ""} 
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="date"
            type="date"
            fullWidth
            variant="standard"
            value={inputs.date || ""} 
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog> */}

    </Container>
  )
}
