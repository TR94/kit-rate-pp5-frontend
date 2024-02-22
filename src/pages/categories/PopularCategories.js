import React from "react";
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
            <div className="d-flex justify-content-around">
                {popularCategories.results.slice(0,3).map((category) => (
                <Link to={`/categories/${category.id}`}>
                  <Category key={category.id} category={category.category} mobile />
                </Link>
                ))}
            </div>
          ):(
            popularCategories.results.map((category) => (
                <Link to={`/categories/${category.id}`}>
                  <Category key={category.id} category={category.category} />
                </Link>
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularCategories;