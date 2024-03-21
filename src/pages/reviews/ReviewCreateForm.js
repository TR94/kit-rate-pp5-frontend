import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/ReviewForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function ReviewCreateForm(props) {
  const { product, setProduct, setReviews, profileImage, profile_id } = props;
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");

  const [errors, setErrors] = useState({});

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  }

  const handleSubmit = async (event) => {
    console.log('IN SUBMIT FUNCTION')
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/reviews/", {
        content,
        product,
        rating,
      });
      console.log('DATA: ', data)
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: [data, ...prevReviews.results],
      }))
      setProduct((prevProduct) => ({
        results: [
          {
            ...prevProduct.results[0],
            review_count: prevProduct.results[0].review_count + 1,
          },
        ],
      }))
      setContent("");
      setRating("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
              <Link to={`/profiles/${profile_id}`}>
                  <Avatar src={profileImage} />
              </Link>
              <Form.Group controlId="rating">
                  <Form.Label>Rating: </Form.Label>
                  <select
                    aria-label="Choose your rating for this product"
                    name="rating"
                    value={rating}
                    onChange={handleRatingChange}
                    className="rounded ml-2"
                    required
                  >
                    <option value="" disabled default>Rate this product</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    <option value="4">Four</option>
                    <option value="5">Five</option>
                  </select>
              </Form.Group>
              {errors.rating?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

            <Form.Group controlId="content">
            <Form.Control
                className={styles.Form}
                placeholder="my review..."
                as="textarea"
                value={content}
                onChange={handleContentChange}
                rows={2}
                required
            />
            {errors.content?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
        </Form.Group>
     
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        type="submit"
      >
        submit
      </button>
    </Form>
  )
};

export default ReviewCreateForm;