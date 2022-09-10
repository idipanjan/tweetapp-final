import React, { useState } from 'react'
import './TweetCard.css'

import { Avatar, Box, Button, IconButton, Stack, TextareaAutosize, Tooltip, Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite'
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import AddCommentIcon from '@mui/icons-material/AddComment';
import CancelIcon from '@mui/icons-material/Cancel';

import moment from 'moment'
import { useSnackbar } from "notistack";
import { config } from "../../../App";
import axios from 'axios';


const TweetCard = ({ tweet, editable }) => {
    const { enqueueSnackbar } = useSnackbar();
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("username");


    const [isLiked, setIsLiked] = useState(false);

    const [isCommenting, setIsCommenting] = useState(false);

    const [comments, setComments] = useState(tweet.comments);

    const [comment, setComment] = useState("");

    const handleCommenting = () => setIsCommenting(true);

    const handleLike = (event) => {
        setIsLiked(!isLiked);
    }

    const handlePostComment = async () => {
        const backendEndpoint = config.endpoint;
        let APIurl = `${backendEndpoint}/${tweet.id}/comments`;
        try {
            const response = await axios.post(APIurl, { content: comment, username: user }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const responseData = response.data;
            getCommentsByTweet();
            setComment("");
            setIsCommenting(false);
        }
        catch (error) {
            if (error.response && error.response.status === 400) {
                enqueueSnackbar(error.response.data.content, { variant: "error" });
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

    const getCommentsByTweet = async () => {
        const backendEndpoint = config.endpoint;
        let APIurl = `${backendEndpoint}/comments/${tweet.id}`;
        try {
            const response = await axios.get(APIurl, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const responseData = response.data;
            setComments(responseData);
        }
        catch (error) {
            if (error.response && error.response.status === 400) {
                enqueueSnackbar(error.response.data.description, { variant: "error" });
            }

            else {
                enqueueSnackbar(
                    "Could not fetch tweets. Check that the backend is running, reachable and returns valid JSON.",
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
        if (seconds < 2) {
            timeStr = "just now";
        }
        else if (seconds > 2 && minutes < 1) {
            timeStr = `${seconds} seconds ago`;
        }
        else if (minutes >= 1 && hours < 1) {
            timeStr = `${minutes} minutes ago`;
        }
        else if (hours >= 1 && days < 1) {
            timeStr = `${hours} hours ago`;
        }
        else if (days >= 1 && months < 1) {
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
        <div className="tweetcard__main">
            <div className="tweetcard__top">

                <Avatar
                    sx={{ bgcolor: deepOrange[500] }}
                    alt="Remy Sharp"
                    style={{ display: 'inline-block', height: '20px', width: '20px', fontSize: '16px', textAlign: 'center', padding: '3px' }}
                >
                    {tweet.user.name[0].toUpperCase()}
                </Avatar>
                <span>
                    &nbsp;
                    <span style={{ fontWeight: "600", color: "#ffff" }}>{tweet.user.name}</span>
                    &nbsp; &#x2022; &nbsp;
                    <span style={{ fontSize: "10px", color: "#ffff" }}>{timeDiff}</span>
                </span>
            </div>

            <div className="tweetcard__middle">
                <Typography variant="body1" gutterBottom>
                    {tweet.description}
                </Typography>
            </div>

            <div className="tweetcard__bottom">
                <FavoriteIcon className={
                    isLiked === true
                        ? "likebtn liked"
                        : "likebtn"
                } onClick={handleLike} />
            </div>

            <Accordion
                style={{ backgroundColor: 'black', color: '#ffff' }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <QuestionAnswerOutlinedIcon style={{ cursor: 'pointer' }} /> &nbsp; &nbsp; {comments.length > 0 ? comments.length : null} comments
                </AccordionSummary>
                <AccordionDetails>
                    {isCommenting === true &&
                        <>
                            <TextareaAutosize
                                aria-label="minimum height"
                                minRows={1}
                                style={{ width: "100%", fontSize: '18px', backgroundColor: 'rgba(139, 139, 139, 0.2)' }}
                                value={comment}
                                onChange={(event) => setComment(event.target.value)}
                            />
                            <Box sx={{ pt: 2 }}>
                                <AddCommentIcon onClick={handlePostComment} style={{ cursor: 'pointer' }} />  &nbsp;  &nbsp;
                                <CancelIcon onClick={() => setIsCommenting(false)} style={{ cursor: 'pointer' }} />
                            </Box>
                        </>}
                    {isCommenting === false && <Tooltip title="Add comment" onClick={() => setIsCommenting(true)}>
                        <AddCommentIcon />
                    </Tooltip>}

                    {comments.length === 0 && <h3>No comments</h3>}
                    {comments.length > 0 &&
                        <Stack direction="column" spacing={3} style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                            {comments.map((comment) => {
                                return <>
                                    <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
                                        <Avatar
                                            sx={{ bgcolor: 'secondary.main' }}
                                            alt="Remy Sharp"
                                            style={{ display: 'inline-block', height: '20px', width: '20px', fontSize: '16px', textAlign: 'center', padding: '3px' }}
                                        >
                                            {comment.username[0].toUpperCase()}
                                        </Avatar>
                                        <Box component="span" m="{1}">
                                            {comment.username}
                                        </Box>  &nbsp; &#x2022;
                                        <Box component="span" m="{1}" >
                                            {comment.content}
                                        </Box>
                                    </Stack>
                                </>
                            })}
                        </Stack>

                    }


                </AccordionDetails>
            </Accordion>

        </div>
    )
}

export default TweetCard;