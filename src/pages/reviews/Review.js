import React, { useState } from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Reviews.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosRes } from "../../api/axiosDefaults";
import ReviewEditForm from "./ReviewEditForm";
import { DisplayRating } from "../../components/DisplayRating";

const Review = (props) => {
  const { 
    profile_id, 
    profile_image, 
    owner, 
    updated_at, 
    content, 
    rating, 
    setProduct, 
    setReviews, 
    id,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const [showEditForm, setShowEditForm] = useState(false)

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/reviews/${id}/`);
      setProduct((prevProduct) => ({
        results: [{
            ...prevProduct.results[0],
            review_count: prevProduct.results[0].review_count - 1,
          },
        ],
      }));

      setReviews((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.filter((review) => review.id !== id),
      }))
    } catch (err) {
      // console.log(err)
    }
  };

  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          <span className={styles.Rating}><DisplayRating rating={rating} /></span>
          {showEditForm ? (
            <ReviewEditForm 
                id={id}
                profile_id={profile_id}
                content={content}
                rating={rating}
                profileImage={profile_image}
                setReviews={setReviews}
                setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  )
};

export default Review