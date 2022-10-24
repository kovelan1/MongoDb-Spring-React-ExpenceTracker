import { Button, Card, Container, Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Chart } from "react-google-charts";
import ExpenseTable from '../components/ExpenseTable';
import { createExpences, pieChartData,expensesByUserAndDate } from '../services/api';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { formatDate } from '../services/DateFormater';
import Alert from '@mui/material/Alert';

export default function TextFieldModel(props) {
  return (
    <Dialog open={props.open} onClose={props.handleClose} maxWidth="sm" fullWidth="lg">
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {props.alert==true ? <Alert severity={props.alertVerient}>{props.alertMessage}</Alert> :<></>}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="category"
            label="Category"
            fullWidth
            variant="standard"
            value={props.inputs.category || ""} 
            onChange={props.handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            variant="standard"
            value={props.inputs.description || ""} 
            onChange={props.handleChange}
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
            value={props.inputs.price || ""} 
            onChange={props.handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="date"
            type="date"
            fullWidth
            variant="standard"
            value={props.inputs.date || ""} 
            onChange={props.handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button onClick={props.handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
  )
}
