import React from "react";
import { FaStar } from "react-icons/fa";

export function DisplayAvgRating({avg_rating=0}) {

    const handleRound = (avg_rating) => {
        const starValue = Math.round(avg_rating);
        return starValue;
    };

  return (
    <div className='App'>
        
      {[...Array(handleRound(avg_rating))].map((value, index) => {
        return <FaStar key={index} size={30} />
      })}
    </div>
  );
};