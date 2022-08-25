import React from 'react';
import {Rating} from "@mui/material";
import profilePng from "../../../assets/images/Profile.png";
import './ReviewCard.scss'

  const options = {
    readOnly: true,
    precision: 0.5,
  };

const ReviewCard = ({review}) => {
    return (
        <div className="reviewCard">
            <img src={profilePng} alt="User"/>
            <p>{review?.name ?? 'name'}</p>
            <Rating {...options} value={review?.rating ?? 1}/>
            <span className="reviewCardComment">{review?.comment ?? 'comment'}</span>
        </div>
    );
};

export default ReviewCard;