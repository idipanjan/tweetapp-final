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
import { Box } from "@mui/system";
import { Message } from '@mui/icons-material';


const Register = () => {
  const { enqueueSnackbar } = useSnackbar();

  const history = useHistory();

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    dateOfBirth:'',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [showComfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showComfirmPassword);
  const handleMouseDownConfirmPassword = () =>
    setShowConfirmPassword(!showComfirmPassword);

  const handleUserDetails = (event) => {
    const [key, value] = [event.target.name, event.target.value];
    setUserDetails({ ...userDetails, [key]: value });
  }

  const register = async() =>{

    const backendEndpoint = config.endpoint;
    debugger;
    const postData = {
      name: userDetails.name,
      email: userDetails.email,
      dateOfBirth:userDetails.dateOfBirth,
      password: userDetails.password
    };

    try{
      const response = await axios.post(`${backendEndpoint}/auth/register`, postData);
      const message = "Registered successfully";
      enqueueSnackbar(message, {
        variant: "success",
      });
      //redirect user to login page
      history.push("/login", { from: "Register" });
    }
    catch(error){
      if (error.response && error.response.status === 409) {
        const message = error.response.data.message;
        enqueueSnackbar(message, {
          variant: "error",
        });
      } else {
        const message =
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON.";
        enqueueSnackbar(message, {
          variant: "error",
        });
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validateInput(userDetails);
    if (validation) {
      register(userDetails);
      setUserDetails({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
  }

  const validateInput = (data) => {
    // Check that name field is not an empty value
    if (data.name.length === 0) {
      enqueueSnackbar("Username is a required field", {
        variant: "warning",
      });
      return false;
    }

    // Check that name field is not less than 4 characters in length
    if (data.name.length < 4) {
      enqueueSnackbar("Username must be at least 4 characters", {
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

    //Check that dob field is not an empty value
    if (data.dateOfBirth.length === 0) {
      enqueueSnackbar("date of birth is a required field", {
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

    // Check that confirmPassword field has the same value as password field
    if (data.password !== data.confirmPassword) {
      enqueueSnackbar("Passwords do not match", {
        variant: "warning",
      });

      return false;
    }

    return true;
  };

  return (
    <div className="login__wrapper">
      <div className="impression__container">
      </div>
      <div className="login__box__wrapper">
        <div className="login-box">
          <h2>Register</h2>
          <Stack component="form" noValidate spacing={4}>
            <TextField
              id="demo-helper-text-misaligned"
              name="name"
              label="Username"
              color="success"
              placeholder="Enter a username"
              fullWidth
              inputProps={{ style: { color: "white" } }}
              value={userDetails.name}
              onChange={handleUserDetails}
            />
            <TextField
              id="demo-helper-text-misaligned"
              name="email"
              label="Email"
              color="success"
              type="email"
              placeholder="Enter email"
              fullWidth
              inputProps={{ style: { color: "white" } }}
              value={userDetails.email}
              onChange={handleUserDetails}
            />
             <TextField
              id="demo-helper-text-misaligned"
              name="dateOfBirth"
              color="success"
              type="date"
              helperText="Enter your date of birth"
              fullWidth
              inputProps={{ style: { color: "white" } }}
              value={userDetails.dateOfBirth}
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
              placeholder="Enter a password"
              value={userDetails.password}
              onChange={handleUserDetails}
              inputProps={{ style: { color: "white" } }}
              InputProps={{
                // <-- This is where the eye toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      id="eye__btn__first"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="password"
              variant="outlined"
              label="Confirmed Password"
              name="confirmPassword"
              type={showComfirmPassword ? "text" : "password"} // <-- This is where the magic happens
              helperText="Password shuld be same as confirmed password"
              fullWidth
              placeholder="Enter confirmed password"
              value={userDetails.confirmPassword}
              onChange={handleUserDetails}
              inputProps={{ style: { color: "white" } }}
              InputProps={{
                // <-- This is where the eye toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                    id="eye__btn__second"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                    >
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <button href="#" className="login__btn" onClick={handleSubmit}>
              Sign up
            </button>

            <p className="secondary-action">
              Already have an account?{" "}&nbsp;
              <Link to="/login" className="link">
                Login here
              </Link>
            </p>
          </Stack>
        </div>
      </div>
    </div>
  )
}

export default Register
