import { FaStar } from "react-icons/fa"

export function DisplayRating({avg_rating}) {

    const handleRound = (avg_rating) => {
        const starValue = Math.round(avg_rating)
        console.log(starValue)
        return starValue
    }

  return (
    <div className='App'>
        
      {[...Array(handleRound(avg_rating))].map(() => {
        return <FaStar size={30} />
      })}
    </div>
  )
}