import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import Category from "./Categories";
import { useCategoryData } from "../../contexts/CategoryDataContext";
import { Link } from "react-router-dom/cjs/react-router-dom";

const PopularCategories = ({mobile}) => {
  const { popularCategories } = useCategoryData();

  return (
    <Container className={`${appStyles.Content} ${mobile && 'd-lg-none text-center mb-3'}`}>
      {popularCategories.results.length ? (
        <>
          <p>Most popular categories.</p>
          {mobile ? (
            <div className="d-flex justify-content-center">
                {popularCategories.results.slice(0,3).map((category) => (
                  <React.Fragment key={category.id}>
                    <Col xs={4} className="pl-0">
                      <Link className="d-flex justify-content-center" to={`/categories/${category.id}`}>
                        <i className="fa-solid fa-person-biking"></i>
                      </Link>
                        <Category {...category}/>
                    </Col>
                </React.Fragment>
                ))}
            </div>
          ):(
            popularCategories.results.map((category) => (
                <Row key={category.id}>
                  <Col xs={3} className="pl-4 pt-4">
                    <Link to={`/categories/${category.id}`}>
                      <i className="fa-solid fa-person-biking"></i>
                    </Link>
                  </Col>
                  <Col xs={9}>
                      <span><Category {...category} /></span>
                  </Col>
                </Row>
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  )
};

export default PopularCategories;