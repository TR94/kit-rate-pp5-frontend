import { FaStar } from "react-icons/fa";

export function DisplayAvgRating({avg_rating=0}) {

    const handleRound = (avg_rating) => {
        const starValue = Math.round(avg_rating);
        return starValue;
    };

  return (
    <div className='App'>
        
      {[...Array(handleRound(avg_rating))].map(() => {
        return <FaStar size={30} />
      })}
    </div>
  );
};