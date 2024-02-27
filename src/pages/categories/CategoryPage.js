import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import NoResults from "../../assets/no-results.png";

import PopularCategories from "./PopularCategories.js";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults.js";
import { useCategoryData, useSetCategoryData } from "../../contexts/CategoryDataContext.js";
import { useParams } from "react-router-dom/cjs/react-router-dom.js";
import InfiniteScroll from "react-infinite-scroll-component";
import Product from "../products/Product.js";
import { fetchMoreData } from "../../utils/utils.js";

function CategoryPage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const {id} = useParams();
  const {setCategoryData, handleSubscribe, handleUnsubscribe} = useSetCategoryData();
  const {pageCategory} = useCategoryData();
  const [category] = pageCategory.results;
  const [categoryProducts, setCategoryProducts] = useState({ results: []})
  const [subscriptions, setSubscriptions] = useState({results: []})

  useEffect(() => {
      const fetchData = async () => {
        try {
          const [{data: pageCategory}, {data: categoryProducts}, {data: subscriptions}] = await Promise.all([
            axiosReq.get(`/categories/${id}/`),
            axiosReq.get(`/products/?category=${id}`),
            axiosReq.get("/subscriptions/my-subscriptions")
          ]);
          setCategoryData((prevState) => ({
            ...prevState,
            pageCategory: { results: [pageCategory] },
          }));
          setCategoryProducts(categoryProducts);
          setSubscriptions(subscriptions)
          setHasLoaded(true);

        } catch (err) {
          console.log(err)
        };
      };
      fetchData()
  }, [id, setCategoryData]);

  const mainCategory = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{category?.category}</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={6} className="my-2">
              <div>{category?.product_count}</div>
              <div>Products</div>
            </Col>
            <Col xs={6} className="my-2">
              <div>{category?.subscriptions_count}</div>
              <div>Subscribers</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
        {currentUser && (category?.subscribe_id ? (
          <Button
          className={`${btnStyles.Button} ${btnStyles.Black}`}
          onClick={() => handleUnsubscribe(category, currentUser)}
          >
            Unsubscribe
          </Button>
        ) : (
          <Button
            className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
            onClick={() => handleSubscribe(category, currentUser)}
          >
            Subscribe
          </Button>
        ))}
        </Col>
      </Row>
    </>
  );

  const mainCategoryProducts = (
    <>
      <hr />
      {categoryProducts.results.length ? (
        <InfiniteScroll 
          children={categoryProducts.results.map((product) => (
            <Product key={product.id} {...product} setProducts={setCategoryProducts} />
          ))}
          dataLength={categoryProducts.results.length}
          loader={<Asset spinner />}
          hasMore={!!categoryProducts.next}
          next={() => fetchMoreData(categoryProducts, setCategoryProducts)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, be the first to create a product in ${category?.category}`}
        />
      )}

    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularCategories mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainCategory}
              {mainCategoryProducts}
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
};

export default CategoryPage;