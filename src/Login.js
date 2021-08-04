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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { database, auth } from "./firebase.js";
import { Toast, ToastContainer } from "react-bootstrap";

const bcrypt = require("bcryptjs");

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
}));

const Login = (props) => {
  var history = useHistory();
  const classes = useStyles();
  const [formData, setFormData] = useState({});
  const [collection, setCollection] = useState("user");
  const [loginFailedToast, setLoginFailedToast] = useState(false);

  const closeToast = () => setLoginFailedToast(false);

  const loginSubmit = (event) => {
    event.preventDefault();
    console.log("logging in");
    console.log(formData.email);

    console.log(collection);

    // get password hash from firebase
    database
      .collection(collection)
      .where("email", "==", formData.email)
      .get()
      .then((snapshot) => {
        console.log("snapshotting", snapshot);

        if (snapshot.empty) {
          console.log("No matching documents.");
          setLoginFailedToast(true);
          return;
        }

        snapshot.forEach((doc) => {
          // compare hash with hash of input password
          const validPassword = bcrypt.compareSync(
            formData.password,
            doc.data().hash
          );

          if (!validPassword) {
            setLoginFailedToast(true);
            console.log("hi toast");
            return;
          }

          if (collection === "user") {
            history.push({
              pathname: "/citi/homepage",
              state: { userid: doc.id },
            });
          } else {
            history.push({
              pathname: "/cashier/homepage",
              state: { cashierid: doc.id },
            });
          }
        });
      })
      .catch((error) => console.log(error.message));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer position="top-end">
        <Toast show={loginFailedToast} onClose={closeToast}>
          <Toast.Header>
            <strong className="me-auto">Login Failed!</strong>
          </Toast.Header>
          <Toast.Body>Invalid email or password!</Toast.Body>
        </Toast>
      </ToastContainer>

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            User Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={collection}
            onChange={(e) => {
              setCollection(e.target.value);
            }}
            label="User Type"
          >
            <MenuItem value="user">Customer</MenuItem>
            <MenuItem value="cashier">Cashier</MenuItem>
          </Select>
        </FormControl>
        <form className={classes.form} onSubmit={loginSubmit} noValidate>
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
          Don't have a user account yet? Click <a href="/user/signup">here</a>{" "}
          to sign up!
        </p>
      </div>
    </Container>
  );
};

export default Login;
