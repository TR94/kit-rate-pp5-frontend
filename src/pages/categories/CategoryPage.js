import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

// import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import PopularCategories from "./PopularCategories.js";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults.js";
import { useCategoryData, useSetCategoryData } from "../../contexts/CategoryDataContext.js";
import { useParams } from "react-router-dom/cjs/react-router-dom.js";

function CategoryPage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const {id} = useParams();
  const setCategoryData = useSetCategoryData()
  const {pageCategory} = useCategoryData();
  const [category] = pageCategory.results

  useEffect(() => {
      const fetchData = async () => {
        try {
          const [{data: pageCategory}] = await Promise.all([
            axiosReq.get(`/categories/${id}/`)
          ])
          setCategoryData((prevState) => ({
            ...prevState,
            pageCategory: { results: [pageCategory] },
          }));
          setHasLoaded(true);
        } catch (err) {
          console.log(err)
        }
      }
      fetchData()
  }, [id, setCategoryData]);

  const mainProfile = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
        </Col>
        <Col lg={6}>
          <h3 className="m-2">Profile username</h3>
          <p>Profile stats</p>
        </Col>
        <Col lg={3} className="text-lg-right">
        <p>Follow button</p>
        </Col>
        <Col className="p-3">Profile content</Col>
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <p className="text-center">Profile owner's posts</p>
      <hr />
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularCategories mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularCategories />
      </Col>
    </Row>
  );
}

export default CategoryPage;