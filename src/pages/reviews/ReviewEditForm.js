import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";

import styles from "../../styles/ReviewForm.module.css";

function ReviewEditForm(props) {
  const { id, content, rating, setShowEditForm, setReviews } = props;

  const [formContent, setFormContent] = useState(content);
  const [newRating, setNewRating] = useState(rating);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  // error here where setFormRating isn't working correctly. 
  // line 21 is correct but it isn't settingFormRating correctly.
  const handleRatingChange = (event) => {
    const rating = event.target.value;
    setNewRating(rating);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/reviews/${id}/`, {
        content: formContent.trim(),
        rating: newRating
      });
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.map((review) => {
          return review.id === id
            ? {
                ...review,
                content: formContent.trim(),
                rating: newRating,
                updated_at: "now",

              }
            : review;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      console.log(err);
    };
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Rating: </Form.Label>
        <select
        aria-label="Select a new product rating"
          name="rating"
          onChange={handleRatingChange}
          className="rounded ml-2"
        >
          <option value="">Select new rating</option>
          <option key="1" value="1">One</option>
          <option key="2" value="2">Two</option>
          <option key="3" value="3">Three</option>
          <option key="4" value="4">Four</option>
          <option key="5" value="5">Five</option>
        </select>
      </Form.Group>
      <Form.Group className="pr-1">
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="text-right">
        <button
          className={styles.Button}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </button>
        <button
          className={styles.Button}
          disabled={!content.trim()}
          type="submit"
        >
          save
        </button>
      </div>
    </Form>
  );
};

export default ReviewEditForm;