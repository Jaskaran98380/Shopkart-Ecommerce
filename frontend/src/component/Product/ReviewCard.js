import React from 'react'
import ProfilePic from "../../images/profile.webp"
import ReactStars from "react-rating-stars-component"
import "./reviewCard.css"
import { Rating } from '@mui/material';

const ReviewCard = ({review}) => {
    const options={
        precision:0.5,
        size:"small",
        value:review.rating,
        readOnly:true
    }
  return (
    <div className="outerReview">
          <div className="reviewCard">
        <img src={ProfilePic} alt="pic" />
        <h2>{review.name}</h2>
    
        <Rating {...options} />
        <p>{review.comment}</p>
    </div>
    </div>
  
  )
}

export default ReviewCard