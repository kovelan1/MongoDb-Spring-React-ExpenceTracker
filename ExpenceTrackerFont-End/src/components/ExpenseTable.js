import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deleteExpences, expensesByUserAndDate, filterExpences, updateExpences } from '../services/api';
import { formatDate } from '../services/DateFormater';
import { IconButton, Alert, Grid, TextField, Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import TextFieldModel from './TextFieldModel';
import DeleteAlert from './DeleteAlert';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



export default function ExpenseTable(props) {

    const [inputs, setInputs] = useState(values => ({ ...values, ["user"]: { ["userName"]: localStorage.getItem('userName') } }));
    const [selectedItem, setSelectedItem] = useState({});
    const [alert, setAlert] = useState(false);
    const [alertVerient, setAlertVerient] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [rows, setRows] = useState(props.rows);
    const [selectedIndex, setSelectedIndex] = useState("");


    useEffect(() => {
        setRows(props.rows);
    }, [props.rows]);

    // model popup
    const handleClickOpen = (data) => {
        setInputs(data);
        setSelectedItem(data)
        setOpen(true);
    };

    const handleDeleteOpen = (index, data) => {
        setSelectedIndex(index)
        setSelectedItem(data)
        setDeleteOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };
    //add expence
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleDelete = () => {
        deleteExpences(selectedItem.id).then(res => {
            setRows(rows.filter((v, i) => i !== selectedIndex))
            setDeleteOpen(false);
            setAlert(true);
            setAlertVerient("info")
            setAlertMessage("Expence Deleted")
        })
    };

    const handleSubmit = async (event) => {

        event.preventDefault();
        console.log(inputs)
        await updateExpences(selectedItem.id, inputs).then(res => {
            //   props.getPicChartData();
            //   setRows(values => [...values,res.data]);

            setAlert(true);
            setAlertVerient("success")
            setAlertMessage("Expence Updated")
        }).catch(error => {
            console.log(error.response)
            setAlert(true);
            setAlertVerient("warning")
            setAlertMessage("Some thing went wrong !")
        });
    }

    //filetr methods
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value) 
    }
    const handleStartDateChange = (e) => {
        setStartDate(e.target.value)
    }
    const handleEndDateChange = (e) => {
        setEndDate(e.target.value)
    }

    const onFilter=()=>{
        filterExpences(localStorage.getItem('userName'),category,description,startDate,endDate).then(res=>{
            console.log(res.data);
            setRows(res.data.content)
        })
    }

    return (
        <div>
            {alert == true ? <Alert severity={alertVerient}>{alertMessage}</Alert> : <></>}

            <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="category"
                        label="Category"
                        fullWidth
                        variant="standard"
                        value={category || ""}
                        onChange={handleCategoryChange}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="description"
                        label="Description"
                        fullWidth
                        variant="standard"
                        value={description || ""}
                        onChange={handleDescriptionChange}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextField
                        autoFocus
                        type="date"
                        margin="dense"
                        name="startDate"
                        label="Start Date"
                        fullWidth
                        variant="standard"
                        value={startDate || ""}
                        onChange={handleStartDateChange}
                        InputLabelProps={{
                            shrink: true,
                          }}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextField
                        autoFocus
                        type="date"
                        margin="dense"
                        name="endDate"
                        label="End Date"
                        fullWidth
                        variant="standard"
                        value={endDate || ""}
                        onChange={handleEndDateChange}
                        InputLabelProps={{
                            shrink: true,
                          }}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Button variant="outlined" style={{marginTop:'15px'}} onClick={onFilter}>Filter</Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Description</StyledTableCell>
                            <StyledTableCell align="right">Category</StyledTableCell>
                            <StyledTableCell align="right">Date</StyledTableCell>
                            <StyledTableCell align="right">Amount&nbsp;($)</StyledTableCell>
                            <StyledTableCell align="right">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                    {row.description}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.category}</StyledTableCell>
                                <StyledTableCell align="right">{formatDate(row.date)}</StyledTableCell>
                                <StyledTableCell align="right">{(Math.round(row.price * 100) / 100).toFixed(2)}</StyledTableCell>
                                <StyledTableCell align="right" style={{ padding: '5px' }}>
                                    <IconButton edge="start" color="primary" onClick={() => handleClickOpen(row)} aria-label="menu">
                                        <Edit />
                                    </IconButton>
                                    <IconButton edge="start" color="secondary" onClick={() => handleDeleteOpen(index, row)} aria-label="menu">
                                        <Delete />
                                    </IconButton>

                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TextFieldModel
                open={open}
                handleClose={handleClose}
                inputs={inputs}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                alert={alert}
                alertMessage={alertMessage}
                alertVerient={alertVerient}
                title="Edit Expence"

            />
            <DeleteAlert open={deleteOpen} handleClose={handleDeleteClose} handleDelete={handleDelete} />
        </div>

    );
}
