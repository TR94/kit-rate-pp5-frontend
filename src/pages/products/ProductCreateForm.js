import React, { useState, useRef } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import Upload from "../../assets/file_upload_icon.png";
import Asset from "../../components/Asset";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import styles from "../../styles/ProductCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

function ProductCreateForm() {

  const [errors, setErrors] = useState({});

  const [productData, setProductData] = useState({
    title: "",
    category: "",
    description: "",
    rating: "",
    image: "",
    review: "",
  });

  const { title, category, description, rating, image, review } = productData;

  const imageInput = useRef(null)
  const history = useHistory()

  const handleChange = (event) => {
    setProductData({
      ...productData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setProductData({
        ...productData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("rating", rating);
    formData.append("image", imageInput.current.files[0]);
    formData.append("review",review);

    try {
      const { data } = await axiosReq.post("/products/", formData);
      history.push(`/products/${data.id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>

      {errors.title?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="text"
          rows={6}
          name="category"
          value={category}
          onChange={handleChange}
        />
      </Form.Group>

      {errors.category?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>

      {errors.description?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

      <Form.Group>
        <Form.Label>Rating</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="rating"
          value={rating}
          onChange={handleChange}
        />
      </Form.Group>

      {errors.rating?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
    </div>
  );

  const textFields2 = (
    <div>
      <Form.Group>
          <Form.Label>First review</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            name="review"
            value={review}
            onChange={handleChange}
          />
        </Form.Group>

        {errors.review?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
      
      <Button 
        className={`${btnStyles.Button} ${btnStyles.Blue}`} 
        type="submit"
      >
        create
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
    </div>
  )

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset src={Upload} message="Click or tap to upload an image" />
                </Form.Label>
              )}

              <Form.File 
                id="image-upload" 
                accept="image/*" 
                onChange={handleChangeImage} 
                ref={imageInput}
              />

            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
      <Row>
        <Col className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields2}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default ProductCreateForm;