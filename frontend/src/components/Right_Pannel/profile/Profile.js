import React, { useEffect, useState } from 'react'
import './Profile.css'
import TweetCard from '../home/TweetCard'

import Stack from '@mui/material/Stack';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';

import { useSnackbar } from "notistack";
import { config } from "../../../App";
import axios from 'axios';
import ProfileTweetCard from './ProfileTweetCard';
import moment from 'moment';




const Profile = () => {
    const { enqueueSnackbar } = useSnackbar();
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const [tweets, setTweets] = useState([]);

    const [user, setUser] = useState({});

    const getTweets = async () => {
        const backendEndpoint = config.endpoint;
        let APIurl = `${backendEndpoint}/${username}`;
        try {
            const response = await axios.get(APIurl, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const responseData = response.data;
            setTweets(responseData);

        }
        catch (error) {
            if (error.response && error.response.status === 400) {
                enqueueSnackbar(error.response.data.message, { variant: "error" });
            }

            else {
                enqueueSnackbar(
                    "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
                    {
                        variant: "error",
                    }
                );
            }
        }
    }

    const performDelete = async (id) => {
        const backendEndpoint = config.endpoint;
        let APIurl = `${backendEndpoint}/delete/${id}`;
        try {
            const response = await axios.delete(APIurl, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const responseData = response.data;
            const message = "Tweets deleted successfully";
            enqueueSnackbar(message, { variant: "success" });
            getTweets();
        }
        catch (error) {
            if (error.response && error.response.status === 404) {
                enqueueSnackbar(error.response.data.description, { variant: "error" });
            }
        }
    }

    const getTwwetId = (id, operation) => {
        if (operation === "delete") {
            performDelete(id);
        }
    }

    useEffect(() => {
        getTweets();
    }, [])

    return (
        <div className="profile__main">
            <div className="profile__inner">
                <div className="profile__top">
                    <div><AccountCircleSharpIcon style={{ width: '100px', height: '100px' }} /></div>
                    <div>
                        <h3>{username}</h3>
                        <p>Email: {email}</p>
                    </div>
                </div>
                {tweets.length !== 0 && <>

                    <h4>Your tweets</h4>
                    <div className="profile__tweets">
                        {tweets.map((tweet, index) => {
                            return <ProfileTweetCard tweet={tweet} key={index + 1} passTweetId={getTwwetId} getUpdatedTweets={getTweets} />
                        })}
                    </div>

                </>}

                {tweets.length === 0 && <h2> You haven't posted any tweet :(  </h2>}
            </div>
        </div>
    )
}

export default Profile
