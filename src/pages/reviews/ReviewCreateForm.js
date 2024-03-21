import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/ReviewForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function ReviewCreateForm(props) {
  const { product, setProduct, setReviews, profileImage, profile_id } = props;
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/reviews/", {
        content,
        product,
        rating,
      });
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
      // console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
        <Form.Group>
            <InputGroup>
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profileImage} />
                </Link>
                <Form.Group>
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
            </InputGroup>
            <Form.Control
                className={styles.Form}
                placeholder="my review..."
                as="textarea"
                value={content}
                onChange={handleContentChange}
                rows={2}
                required
            />
        </Form.Group>
     
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        submit
      </button>
    </Form>
  )
};

export default ReviewCreateForm;