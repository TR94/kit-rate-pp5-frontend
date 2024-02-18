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

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/reviews/", {
        content,
        product,
      });
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: [data, ...prevReviews.results],
      }));
      setProduct((prevProduct) => ({
        results: [
          {
            ...prevProduct.results[0],
            review_count: prevProduct.results[0].review_count + 1,
          },
        ],
      }));
      setContent("");
    } catch (err) {
      console.log(err);
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
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                        as="select"
                        name="rating"
                        value={rating}
                        onChange={handleChange}
                    />
                </Form.Group>
            </InputGroup>
            <Form.Control
                className={styles.Form}
                placeholder="my review..."
                as="textarea"
                value={content}
                onChange={handleChange}
                rows={2}
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
  );
}

export default ReviewCreateForm;