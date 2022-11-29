import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from "axios";
import RegistrationFrom from './RegistrationFrom';
const BASE_URL = "http://localhost:5001/user/login";

const useStyles = makeStyles(() => ({
  loginBtn: {
    color: "#44B6EF",
    fontFamily: "Roboto Mono",
    contrastText: "black",
  },
  loginFrom: {
    marginTop: "5vh",
    padding: "1vh",
  },
  forgotPass: {
    fontFamily: "Roboto Mono",
    contrastText: "black",
  },
  rememberTitle: {
    fontFamily: "Roboto Mono",
    contrastText: "black",
  },
}));
const LoginForm = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    axios
      .post(BASE_URL, {
        email: values.email,
        password: values.password,
      })
      .then((data) => {
        if(data.data.message === "Auth Successfull"){
            localStorage.setItem('token', data.data.token)
            navigate('/main')
        } 
      });
  };

  const handleInputOnChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    console.log(`name, value`, name, value);
  };

  return (
    <>
        <form className={classes.loginFrom}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Grid item>
            <TextField
              name="email"
              label="Email"
              type="text"
              size="medium"
              onChange={handleInputOnChange}
            />
          </Grid>
          <Grid item>
            <TextField
              name="password"
              label="password"
              type="password"
              onChange={handleInputOnChange}
            />
          </Grid>
          <Button className={classes.forgotPass} onClick={navigate('/signup')}>
            Not Registered Yet?
          </Button>
          <Button onClick={handleSubmit} className={classes.loginBtn} variant="outlined">
            Login
          </Button>
        </Grid>
      </form>
    </>
  );
};

export default LoginForm;
