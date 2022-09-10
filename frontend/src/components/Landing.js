import React from 'react'
import { useEffect, useState } from "react";
import Pannel from './Left_Pannel/Pannel'
import DashBoard from './Right_Pannel/DashBoard'
import { useSnackbar } from "notistack";
import { useHistory, Link } from "react-router-dom";



import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';



import './Landing.css'
import BottomNav from './Bottom_Navigation/BottomNav';

const Landing = () => {

  const [page, setPage] = useState("home");
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const token = localStorage.getItem("token");
  let isUserLoggedIn = false;
  if (token === null) {
    //redirect user to login page
    history.push("/login", { from: "home" });
  }
  if (token !== null) {
    isUserLoggedIn = true;
  }


  const getPage = (page) => {
    setPage(page);
  }
  return (
    <>
      {isUserLoggedIn && <div className="landing__container">
        <Pannel passPage={getPage} />
        <DashBoard page={page} />
        <BottomNav passPage={getPage}/>
      </div>
      }

    </>


  )
}

export default Landing
