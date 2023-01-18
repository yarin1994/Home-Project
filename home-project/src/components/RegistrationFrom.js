import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
const BASE_URL = "http://localhost:5001/user/signup";


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

const RegistrationFrom = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  
  const handleSubmit = (e) => {
    // e.preventdefault();
    axios
      .post(BASE_URL, {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      })
      .then((data) => {
        console.log("data is", data);
        if(data.status === 200){
          navigate('/main');
        }
        // if(data.data.message === "Auth Successfull"){
        //     localStorage.setItem('token', data.data.token)
        //     navigate('/main')
        // } 
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

  const handleSignedUp = (e) => {
    e.preventDefault();
    // navigate('/login');
  }

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
              name="firstName"
              label="First Name"
              type="text"
              size="medium"
              onChange={handleInputOnChange}
            />
          </Grid>
          <Grid item>
            <TextField
              name="lastName"
              label="Last Name"
              type="text"
              size="medium"
              onChange={handleInputOnChange}
            />
          </Grid>
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
          <br />
          <Button
            onClick={handleSubmit}
            className={classes.loginBtn}
            variant="outlined"
          >
            Sign UP
          </Button>
        </Grid>
      </form>

      <Button
        type="button"
        // onClick={navigate('/main')}
        onClick={() => navigate('/login')}
        //   className={classes.loginBtn}
        variant="outlined"
      >
        Already Signed Up?
      </Button>
    </>
  );
};

export default RegistrationFrom;
