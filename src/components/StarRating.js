
import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'

export default function StarRating() {
  const [rating, setRating] = useState(0) // initial rating value

  // Catch Rating value
  // const handleRating = (rating) => {
  //   const value = (rating/20)
  //   setRating(value)
  //   console.log(value)

  const handleRating = (rate) => {
    const value = (rate/20)  
    // setRating doesn't appear to be working...???
    setRating(value)
    console.log("Value: " + value)
    console.log("Rating: " + rating)
  }

  return (
    <div className='App'>
      <Rating onClick={handleRating} ratingValue={rating} /* Available Props */ />
    </div>
  )
}