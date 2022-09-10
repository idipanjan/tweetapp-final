import React, { useEffect, useState } from 'react'

import './Home.css'
import TweetCard from './TweetCard'


import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { Box, TextareaAutosize, TextField } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import { useSnackbar } from "notistack";
import { config } from "../../../App";
import axios from 'axios';
import { idText } from 'typescript';



const Home = () => {

    const { enqueueSnackbar } = useSnackbar();
    const token = localStorage.getItem("token");

    const [isLoading, setIsloading] = useState(false);

    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    const [filteredTweets, setFilteredTweets] = useState([]);
    const [debounceTimeout, setDebounceTimeout] = useState(0);

    const getTweetsApi = async () => {
        setIsloading(true);
        const backendEndpoint = config.endpoint;
        let APIurl = `${backendEndpoint}/all`;
        try {
            const response = await axios.get(APIurl, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const responseData = response.data;
            setTweets(responseData);
            setFilteredTweets(responseData);
            setIsloading(false);

        }
        catch (error) {
            if (error.response && error.response.status === 400) {
                enqueueSnackbar(error.response.data.message, { variant: "error" });
            }

            else {
                enqueueSnackbar(
                    "Could not fetch tweets . Check that the backend is running, reachable and returns valid JSON.",
                    {
                        variant: "error",
                    }
                );
            }
        }
    }


    const handlePostTweet = async () => {
        const backendEndpoint = config.endpoint;
        const email = localStorage.getItem("email");
        let APIurl = `${backendEndpoint}/${email}/add`;
        try {
            const response = await axios.post(APIurl, { description: tweet }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const responseData = response.data;
            getTweetsApi();
            setTweet("");
            const message = "New tweet posted";
            enqueueSnackbar(message, { variant: "success" });
        }
        catch (error) {
            if (error.response && error.response.status === 400) {
                enqueueSnackbar(error.response.data.description, { variant: "error" });
            }

            else {
                enqueueSnackbar(
                    "Could not post tweet. Check that the backend is running, reachable and returns valid JSON.",
                    {
                        variant: "error",
                    }
                );
            }
        }
    }


    const performSearch = async (searchUser) => {
        // event.preventDefault();
        setIsloading(true);
        const backendEndpoint = config.endpoint;
        const user = searchUser;
        let APIurl = "";
        if (user === "") {
            APIurl = `${backendEndpoint}/all`
        }
        else {
            APIurl = `${backendEndpoint}/${user}`;
        }
        try {
            const response = await axios.get(APIurl, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const responseData = response.data;
            setFilteredTweets(responseData);
            setIsloading(false);

        }
        catch (error) {
            if (error.response && error.response.status === 400) {
                enqueueSnackbar(error.response.data.message, { variant: "error" });
            }
        }

    }


    const debounceSearch = (event, debounceTimeout) => {
        let searchQuery = event.target.value;
        if (debounceTimeout !== 0) {
            clearTimeout(debounceTimeout);
        }
        let timerId = setTimeout(() => {
            performSearch(searchQuery);
        }, 500);

        setDebounceTimeout(timerId);
    };

    useEffect(() => {
        const onLoadHandler = () => {
            getTweetsApi();
        }
        onLoadHandler();

    }, []);


    return (
        <div className="home__main">
            {isLoading ?
                <>
                    <div className="search-bar">
                        <Paper
                            component="form"
                            sx={{
                                p: "2px 4px",
                                display: "flex",
                                alignItems: "center",
                                bgcolor: "#202327",
                                color: "#ffff",
                                borderRadius: "20px",
                                width: "40%"
                            }}
                            width={{ xs: 100, sm: 200 }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1, color: "#ffff" }}
                                placeholder="Search user tweets"
                                inputProps={{ "aria-label": "search" }}
                            />
                            <IconButton
                                type="submit"
                                sx={{ p: "10px", color: "#ffff" }}
                                aria-label="search"
                            >
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </div>
                    <div className="tweet_form">
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={2}
                            placeholder="✍ What's happening? "
                            style={{ width: "50%" }}
                        />
                        <div className="tweet__submit">
                            <button className="tweet__btn">Tweet</button>
                        </div>
                    </div>
                    <Box sx={{ bgcolor: "#000", p: 3 }}>
                        <Skeleton sx={{ bgcolor: "grey.900" }} variant="text" />
                        <Skeleton
                            sx={{ bgcolor: "grey.900" }}
                            variant="circular"
                            width={40}
                            height={40}
                        />
                        <Skeleton
                            sx={{ bgcolor: "grey.900" }}
                            variant="rectangular"
                            width={1000}
                            height={118}
                        />
                    </Box>
                    <Box sx={{ bgcolor: "#000", p: 3 }}>
                        <Skeleton sx={{ bgcolor: "grey.900" }} variant="text" />
                        <Skeleton
                            sx={{ bgcolor: "grey.900" }}
                            variant="circular"
                            width={40}
                            height={40}
                        />
                        <Skeleton
                            sx={{ bgcolor: "grey.900" }}
                            variant="rectangular"
                            width={1000}
                            height={118}
                        />
                    </Box>
                    <Box sx={{ bgcolor: "#000", p: 3 }}>
                        <Skeleton sx={{ bgcolor: "grey.900" }} variant="text" />
                        <Skeleton
                            sx={{ bgcolor: "grey.900" }}
                            variant="circular"
                            width={40}
                            height={40}
                        />
                        <Skeleton
                            sx={{ bgcolor: "grey.900" }}
                            variant="rectangular"
                            width={1000}
                            height={118}
                        />
                    </Box>
                </> :
                <>
                    <div className="search-bar">
                        <Paper
                            component="form"
                            sx={{
                                p: "2px 4px",
                                display: "flex",
                                alignItems: "center",
                                bgcolor: "#202327",
                                color: "#ffff",
                                borderRadius: "20px",
                                width: "40%"
                            }}
                            width={{ xs: 100, sm: 200 }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1, color: "#ffff" }}
                                placeholder="Search user tweets"
                                inputProps={{ "aria-label": "search" }}
                                onChange={(event) => debounceSearch(event, debounceTimeout)}
                            />
                            <IconButton
                                type="submit"
                                sx={{ p: "10px", color: "#ffff" }}
                                aria-label="search"
                                onClick={(event) => event.preventDefault()}
                            >
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </div>
                    <div className="tweet_form">
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={2}
                            placeholder="✍ What's happening? "
                            style={{ width: "50%" }}
                            value={tweet}
                            onChange={(event) => setTweet(event.target.value)}

                        />
                        <div className="tweet__submit">
                            <button className="tweet__btn" onClick={handlePostTweet}>Tweet</button>
                        </div>
                    </div>
                    <div className="tweets__container">
                        {
                            filteredTweets.length > 0 ?
                                filteredTweets.map((tweet, index) => {
                                    return <TweetCard tweet={tweet} key={tweet.id} editable={false} id={tweet.id} />

                                })
                                :
                                <>
                                    <Box sx={{ bgcolor: "#000", p: 3 }}>
                                        <Skeleton sx={{ bgcolor: "grey.900" }} variant="text" />
                                        <Skeleton
                                            sx={{ bgcolor: "grey.900" }}
                                            variant="circular"
                                            width={40}
                                            height={40}
                                        />
                                        <Skeleton
                                            sx={{ bgcolor: "grey.900" }}
                                            variant="rectangular"
                                            width={1000}
                                            height={118}
                                        />
                                    </Box>
                                    <Box sx={{ bgcolor: "#000", p: 3 }}>
                                        <Skeleton sx={{ bgcolor: "grey.900" }} variant="text" />
                                        <Skeleton
                                            sx={{ bgcolor: "grey.900" }}
                                            variant="circular"
                                            width={40}
                                            height={40}
                                        />
                                        <Skeleton
                                            sx={{ bgcolor: "grey.900" }}
                                            variant="rectangular"
                                            width={1000}
                                            height={118}
                                        />
                                    </Box>
                                    <Box sx={{ bgcolor: "#000", p: 3 }}>
                                        <Skeleton sx={{ bgcolor: "grey.900" }} variant="text" />
                                        <Skeleton
                                            sx={{ bgcolor: "grey.900" }}
                                            variant="circular"
                                            width={40}
                                            height={40}
                                        />
                                        <Skeleton
                                            sx={{ bgcolor: "grey.900" }}
                                            variant="rectangular"
                                            width={1000}
                                            height={118}
                                        />
                                    </Box>
                                </>
                        }
                    </div>
                </>
            }

        </div>
    )
}

export default Home
