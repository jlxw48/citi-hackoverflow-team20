import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import {database, auth} from "./firebase.js"
import { v4 as uuidv4 } from 'uuid';
import { Toast, ToastContainer } from "react-bootstrap";

const bcrypt = require('bcryptjs')
const saltRounds = 10;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const CashierSignUp = (e) => {
  const history = useHistory();
  const classes = useStyles();
  const [formData, setFormData] = useState({})
  const [showCashierExistsToast, setCashierExistsToast] = useState(false)
  const closeToast = () => setCashierExistsToast(false);

  const signupSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    await database.collection('cashier')
      .where('email', '==', formData.email)
      .get()
      .then(async (snapshots) => {
        if (!snapshots.empty) {
          setCashierExistsToast(true)
          return;
        } 
        
        const hash = bcrypt.hashSync(formData.password, bcrypt.genSaltSync(saltRounds));
        const uuid = uuidv4();
    
        const cashierData = {
            name: formData.name,
            email: formData.email,
            hash: hash
        }
    
        await database.collection('cashier')
            .doc(uuid)
            .set(cashierData)
            .catch(error => {
                console.log('Something went wrong with added cashier to firestore: ', error);
            })
    
        history.push("/");

      })

    
  };
  
  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value.trim()
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer position='top-end'>
        <Toast show={showCashierExistsToast} onClose={closeToast}>
          <Toast.Header>
            <strong className="me-auto">Signup Failed!</strong>
          </Toast.Header>
          <Toast.Body>User with email already exists!</Toast.Body>
        </Toast>
      </ToastContainer>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Sign up
        </Typography>
        <form className={classes.form} onSubmit={signupSubmit} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                onChange={handleChange}
             />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
             />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign Up
            </Button>
        </form>
      </div>
    </Container>
  );
};

export default CashierSignUp;
