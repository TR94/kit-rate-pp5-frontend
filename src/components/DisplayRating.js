import { FaStar } from "react-icons/fa"

export function DisplayRating({rating=0}) {
  return (
    <div className='App'>
        
      {[...Array(rating)].map(() => {
        return <FaStar size={18} />
      })}
    </div>
  )
}