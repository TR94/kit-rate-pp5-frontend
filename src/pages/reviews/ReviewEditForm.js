import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";

import styles from "../../styles/ReviewForm.module.css";

function ReviewEditForm(props) {
  const { id, content, setShowEditForm, setReviews } = props;

  const [formContent, setFormContent] = useState(content);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/reviews/${id}/`, {
        content: formContent.trim(),
      });
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.map((review) => {
          return review.id === id
            ? {
                ...review,
                content: formContent.trim(),
                updated_at: "now",
              }
            : review;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
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
}

export default ReviewEditForm;