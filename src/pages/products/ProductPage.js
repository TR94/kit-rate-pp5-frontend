import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Product from "./Product";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({ results: []});

  useEffect(() => {
    const handleMount = async () => {
        try {
            const [{data:product}] = await Promise.all([
                axiosReq.get(`/products/${id}`)
            ])
            setProduct({results: [product]})
            console.log(product)
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
        <Product {...product.results[0]} setProduct={setProduct} productPage/>
        <Container className={appStyles.Content}>
          Reviews
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular categories for desktop
      </Col>
    </Row>
  );
}

export default ProductPage;