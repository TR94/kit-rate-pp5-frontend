import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Product from "./Product";
import ReviewCreateForm from "../reviews/ReviewCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Review from "../reviews/Review";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({ results: []});
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [reviews, setReviews] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
        try {
            const [{data:product}, {data: reviews}] = await Promise.all([
                axiosReq.get(`/products/${id}`),
                axiosReq.get(`/reviews/?product=${id}`)
            ])
            setProduct({results: [product]})
            setReviews(reviews)
        } catch (err) {
            console.log(err)
        }
    }
    handleMount()
  }, [id])

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular categories for mobile</p>
        <Product {...product.results[0]} setProduct={setProduct} productPage />
        <Container className={appStyles.Content}>
          {currentUser ? (
            <ReviewCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              product={id}
              setProduct={setProduct}
              setReviews={setReviews}
            />
          ) : reviews.results.length ? (
            "Reviews"
          ) : null}
          {reviews.results.length ? (
            reviews.results.map(review => (
              <Review key={review.id} {...review} />
            ))
          ) : currentUser ? (
            <span>No reviews yet, be the first to submit a review!</span>
          ) : 
            <span>No reviews...yet</span>}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular categories for desktop
      </Col>
    </Row>
  );
}

export default ProductPage;