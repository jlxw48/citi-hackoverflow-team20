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

const bcrypt = require('bcryptjs')

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

const Login = (e) => {
  const history = useHistory();
  const classes = useStyles();
  const [formData, setFormData] = useState({})
  const [collection, setCollection] = useState("user")

  const loginSubmit = (event) => {
    event.preventDefault()
    console.log("logging in")
    console.log(formData.email)

    console.log(collection)

    // get password hash from firebase
    database.collection(collection)
      .where('email', '==', formData.email)
      .get()
      .then(snapshot => {
        console.log("snapshotting", snapshot)

        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        } 

        snapshot.forEach(doc => {
          // compare hash with hash of input password
          const validPassword = bcrypt.compareSync(formData.password, doc.data().hash);
  
          if (!validPassword) {
            history.push("/");
            return;
          }
  
          history.push("/citi/homepage");
        })
      })
      .catch(error => console.log(error.message))
  };

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value.trim()
    })
  }

  const updateCollection = (e) => {
    console.log("value", e.target.value)
    if (e.target.value === "2") {
      console.log("setting cashier")
      setCollection("cashier")
    } else {
      setCollection("user")
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={loginSubmit}>
          <select name="logintype" onChange={updateCollection}>
            <option value="1">User</option>
            <option value="2">Cashier</option>
          </select>
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
            Sign In
          </Button>
        </form>

        <p>
          Don't have a user account yet? Click <a href="/user/signup">here</a> to sign up!
        </p>
      </div>
    </Container>
  );
};

export default Login;
