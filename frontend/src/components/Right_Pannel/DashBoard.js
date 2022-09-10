
import React from 'react'
import './Dashboard.css'
import Home from './home/Home'
import Profile from './profile/Profile'

import { useSnackbar } from "notistack";
import { useHistory, Link } from "react-router-dom";

const DashBoard = ({ page }) => {

    const { enqueueSnackbar } = useSnackbar();

    return (
        <div className="dashboard__main">
            {page == "home" && <>
                <Home />

            </>
            }

            {page == "profile" && <>
                <Profile />
            </>}
        </div>
    )
}

export default DashBoard
