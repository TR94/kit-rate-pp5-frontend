import React from "react";
import { FaStar } from "react-icons/fa";

export function DisplayRating({rating=0}) {
  return (
    <div className='App'>
        
      {[...Array(rating)].map((value, index) => {
        return <FaStar key={index} size={18} />
      })}
    </div>
  );
};