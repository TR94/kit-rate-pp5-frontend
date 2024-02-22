import { FaStar } from "react-icons/fa"

export function DisplayRating({rating=0}) {
    console.log(rating)
  return (
    <div className='App'>
        
      {[...Array(rating)].map(() => {
        return <FaStar size={20} />
      })}
    </div>
  )
}