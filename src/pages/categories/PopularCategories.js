import React from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import Category from "./Categories";
import { useCategoryData } from "../../contexts/CategoryDataContext";

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
                <Category key={category.id} category={category.category} mobile />
                ))}
            </div>
          ):(
            popularCategories.results.map((category) => (
                <Category key={category.id} category={category.category} />
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