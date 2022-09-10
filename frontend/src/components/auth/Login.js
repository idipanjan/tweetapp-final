import React from 'react'
import { useState, useEffect } from "react";
import './Register.css'
import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";


import { useSnackbar } from "notistack";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { config } from "../../App";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";



const Login = () => {

  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email:'',
    password: ''
  });
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [showComfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showComfirmPassword);
  }
  const handleMouseDownConfirmPassword = () => {
    setShowConfirmPassword(!showComfirmPassword);
  }

  
  const handleUserDetails = (event) =>{
    const [key, value] = [event.target.name, event.target.value];
    setUserDetails({...userDetails, [key]: value});
  }

  const login = async() =>{
    const backendEndpoint = config.endpoint;
    const postData = userDetails;
    try{
      const response = await axios.post(`${backendEndpoint}/auth/login`, postData);
      const {username, email, token} = response.data;
      persistLogin(username, email, token);
      const message = `Hi ${username} welcome back :)`;
      enqueueSnackbar(message, {
        variant: "success",
      });
      //redirect user to login page
      history.push("/", { from: "Login" });
    }
    catch(error){
      if (error.response && error.response.status === 404) {
        const message = "You dont have any rgistered account";
        enqueueSnackbar(message, {
          variant: "warning",
        });
      } 
      if (error.response && error.response.status === 401) {
        const message = "Password is incorrect";
        enqueueSnackbar(message, {
          variant: "error",
        });
      }
    }
  }
  
  const persistLogin = (username,email, token)=>{
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("token", token);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(validateInput(userDetails)){
      login(userDetails);
      setUserDetails({
        email:'',
        password: ''
      });
    }
  }

  const validateInput = (data) =>{
    //Check that email field is not an empty value
    if (data.email.length === 0) {
      enqueueSnackbar("email is a required field", {
        variant: "warning",
      });

      return false;
    }


    //verify email is valid email or not
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!data.email.match(regexEmail)) {
      enqueueSnackbar("email is not a valid email ", {
        variant: "warning",
      });
      return false; 
    } 

     //Check that password field is not an empty value
     if (data.password.length === 0) {
      enqueueSnackbar("Password is a required field", {
        variant: "warning",
      });

      return false;
    }

     // Check that password field is not less than 6 characters in length
     if (data.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "warning",
      });

      return false;
    }

    return true;

  }

  return (
    <div className="login__wrapper">
      <div className="impression__container">
      </div>
      <div className="login__box__wrapper">
        <div className="login-box">
          <h2>Login</h2>
          <Stack component="form" noValidate spacing={4}>
            <TextField
              id="demo-helper-text-misaligned"
              name="email"
              label="Email"
              color="success"
              placeholder="Enter email"
              fullWidth
              inputProps={{ style: { color: "white" } }}
              value={userDetails.email}
              onChange={handleUserDetails}
            />
            <TextField
              id="password"
              variant="outlined"
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"} // <-- This is where the magic happens
              helperText="Password must be atleast 6 characters length"
              fullWidth
              placeholder="Enter password"
              value={userDetails.password}
              onChange={handleUserDetails}
              inputProps={{ style: { color: "white" } }}
              InputProps={{
                // <-- This is where the eye toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      id="eye__btn"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <button href="#" className="login__btn" onClick={handleSubmit}>
              Sign in
            </button>

            <p className="secondary-action">
              New to Twitter?{" "}&nbsp;
              <Link to="/register" className="link">
                Sign Up here
              </Link>
            </p>
          </Stack>
        </div>
      </div>
    </div>
  )
}

export default Login
