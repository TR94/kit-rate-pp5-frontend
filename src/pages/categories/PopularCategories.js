import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Category from "./Categories";

const PopularCategories = ({mobile}) => {
  const [categoryData, setCategoryData] = useState({
    popularCategories: { results: [] },
  });
  const { popularCategories } = categoryData;
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
            // ordering not working
          "/categories/?ordering=-subscriptions_count"
        );
        setCategoryData((prevState) => ({
          ...prevState,
          popularCategories: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

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