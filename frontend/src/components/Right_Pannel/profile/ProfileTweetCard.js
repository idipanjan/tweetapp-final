import {useRef, useState} from 'react';
import './ProfileTweetCard.css'
import { Avatar, IconButton, InputBase, TextareaAutosize, Tooltip, Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import moment from 'moment'
import { useSnackbar } from "notistack";
import { config } from "../../../App";
import axios from 'axios';

import Button from '@mui/material/Button';


const ProfileTweetCard = ({tweet, passTweetId, getUpdatedTweets}) => {
    const { enqueueSnackbar } = useSnackbar();
    const token = localStorage.getItem("token");


    const [updatedTweet, setUpdatedTweet] = useState("");
    const [edited, setEdited]  = useState("");
    const [isEditing, setIsEditing ] = useState(false);

    const handleEdit = () => setIsEditing(true);

    const performEditApiCall = async()=>{
        const backendEndpoint = config.endpoint;
        let APIurl = `${backendEndpoint}/update/${tweet.id}`;
        try{
            const response = await axios.put(APIurl, {description: updatedTweet}, { 
                headers : { Authorization: `Bearer ${token}`} 
            });
            debugger;
            const responseData = response.data;
            getUpdatedTweets();
            const message = "Tweet updated";
            enqueueSnackbar(message, { variant: "success" });
            setEdited("edited")
            setIsEditing(false);
        }
        catch(error){
            if (error.response && error.response.status === 400) {
                enqueueSnackbar(error.response.data.description, { variant: "error" });
            }
            
            else
            {
                enqueueSnackbar(
                  "Could not perform edit. Check that the backend is running, reachable and returns valid JSON.",
                  {
                    variant: "error",
                  }
                );
            }
        }
    }

    function timeDiffCalc(prevDate) {
        let createdOrUpdatedDate = prevDate.split("T").join(" ");
        let prevMoment = moment(createdOrUpdatedDate);
        let nowMoment = moment();

        const years = nowMoment.diff(prevMoment, 'years');
        const months = nowMoment.diff(prevMoment, 'months');
        const days = nowMoment.diff(prevMoment, 'days');
        const hours = nowMoment.diff(prevMoment, 'hours');
        const minutes = nowMoment.diff(prevMoment, 'minutes');
        const seconds = nowMoment.diff(prevMoment, 'seconds');
        
        let timeStr = "";
        if(seconds < 2){
            timeStr = "just now";
        }
        else if(seconds > 2 && minutes < 1){
            timeStr = `${seconds} seconds ago`;
        }
        else if(minutes >=1 && hours<1){
            timeStr = `${minutes} minutes ago`;
        }
        else if(hours >=1 && days<1){
            timeStr = `${hours} hours ago`;
        }
        else if(days >=1 && months<1){
            timeStr = `${days} days ago`;
        }
        else if (months >= 1 && years < 1) {
            timeStr = `${months} months ago`;
        }
        else if (years >= 1 ) {
            timeStr = `${years} years ago`;
        }

        return timeStr;
    }

    let timeDiff = timeDiffCalc(tweet.lastUpdatedDate);

    return (
        <div className="tweetcard__main" id={tweet.id}>
        <div className="tweetcard__top">

            <Avatar
                sx={{ bgcolor: deepOrange[500] }}
                alt="Remy Sharp"
                style={{ display: 'inline-block', height: '20px', width: '20px', fontSize: '16px', textAlign: 'center', padding: '3px' }}
            >
                {tweet.user.name[0]}
            </Avatar>
            <span>
                &nbsp;
                <span style={{ fontWeight: "600", color: "#ffff" }}>{tweet.user.name}</span>
                &nbsp; &#x2022; &nbsp;
                <span style={{ fontSize: "10px", color: "#ffff" }}>{edited}&nbsp;{timeDiff}</span>
            </span>
        </div>

        <div className="tweetcard__middle">
            {isEditing===true && <>
                <TextareaAutosize
                    aria-label="minimum height"
                    minRows={2}
                    style={{ width: "100%" }}
                    defaultValue={tweet.description}
                    onChange={(event)=>setUpdatedTweet(event.target.value)}               
                    />
            </>}
            {isEditing === false && <Typography variant="body1" gutterBottom>
                {tweet.description}
            </Typography>}
            
        </div>

        <div className="tweetcard__bottom">
        {isEditing=== false &&
            <>
            <Tooltip title="Delete" onClick={()=>passTweetId(tweet.id, "delete")}>
            <IconButton >
                <DeleteIcon id="delete_icon" />
            </IconButton>
        </Tooltip>
        <Tooltip title="edit" onClick={handleEdit}>
            <IconButton value={tweet.id}>
                <EditIcon id="edit_icon" />
            </IconButton>
        </Tooltip>
            </>
        }

        {isEditing  === true && 
            <>
                <Button variant="contained" color="secondary" onClick = {performEditApiCall}>update</Button>
                <Button variant="outlined" color="error" onClick={()=> setIsEditing(false)}>cancel</Button>
            </>
        }
        </div>
    </div>
    )
}

export default ProfileTweetCard
