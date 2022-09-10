import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { useSnackbar } from "notistack";
import { useHistory, Link } from "react-router-dom";


const BottomNav = ({ passPage }) => {
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [active, setActive] = useState({
        home:true
    });

    const handleClick = (event) => {
        let page = event.target.id;
        setActive({[page] : true});
        passPage(event.target.id);
    }

    const handleLogOut = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        //redirect user to login page
        history.push("/login", { from: "Home" });
        enqueueSnackbar("Logged out", { variant: "success" });
    }

    return (
             <nav class="nav">
          <a lassName={
                        active.home === true
                            ? "pannel__item home active"
                            : "pannel__item home "
                    }
                    onClick={handleClick} id="home">
            <HomeIcon/>
            <span class="nav__text">Home</span>
          </a>
          <a className={
                        active.profile === true
                            ? "pannel__item profile active"
                            : "pannel__item profile "
                    } onClick={handleClick} id="profile">
            <PersonIcon/>
            <span class="nav__text">Profile</span>
          </a>
          <a href="#" class="nav__link">
            @Dipanjan
            <span class="nav__text">Logout</span>
          </a>
        </nav>
    )
}

export default BottomNav
