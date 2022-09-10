import React from 'react'
import { useEffect, useState } from "react";
import './Pannel.css';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AppsIcon from '@mui/icons-material/Apps';
import { Avatar, Box, Button, Modal, Typography } from '@mui/material';

import { useSnackbar } from "notistack";
import { useHistory, Link } from "react-router-dom";

const Pannel = ({ passPage }) => {

    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [active, setActive] = useState({
        home: true
    });

    const handleClick = (event) => {
        let page = event.target.id;
        setActive({ [page]: true });
        passPage(event.target.id);
    }

    const handleLogOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        //redirect user to login page
        history.push("/login", { from: "Home" });
        enqueueSnackbar("Logged out", { variant: "success" });
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'black',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    return (
        <div className="pannel__main">
            <img src="Twitter-logo.svg" className="pannel__logo" />
            <div className="pannel__wrapper">
                <div
                    className={
                        active.home === true
                            ? "pannel__item home active"
                            : "pannel__item home "
                    }
                    onClick={handleClick} id="home"><HomeIcon /> Home
                </div>
                <div className={
                    active.profile === true
                        ? "pannel__item profile active"
                        : "pannel__item profile "
                } onClick={handleClick} id="profile"><PersonIcon /> Profile</div>
                <div className={
                    active.more === true
                        ? "pannel__item profile active"
                        : "pannel__item profile "
                } onClick={handleClick} id="more"><AppsIcon />More</div>
            </div>

            <div className="pannel__bottom">
                <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: 'blue', display: 'inline', p: 1 }}
                            style={{ display: 'inline-block', height: '25px', width: '25px', fontSize: '16px', textAlign: 'center', padding: '3px' }}
                        >{localStorage.getItem("username")[0]}</Avatar> &nbsp; @{localStorage.getItem("username")}
                    </div>

                </div>
                <button className="logout__btn" onClick={handleOpen}>
                    Sign out
                </button>
                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-description" sx={{ pb: 2 }}>
                            Are you sure want to log out? Confirm and log out
                        </Typography>
                        <Button variant="contained" style={{ borderRadius: '20px' }} onClick={handleLogOut}>
                            CONFIRM
                        </Button> &nbsp;
                        <Button variant="contained" color="error" style={{ borderRadius: '20px' }} onClick={handleClose}>
                            CANCEL
                        </Button>

                    </Box>
                </Modal>
            </div>

        </div>
    )
}

export default Pannel
