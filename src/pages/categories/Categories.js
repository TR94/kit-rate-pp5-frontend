import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useSetCategoryData } from "../../contexts/CategoryDataContext";


const Category = (props) => {
  const { id, category, subscribe_id, mobile} = props;

  const currentUser = useCurrentUser();
  const {handleSubscribe} = useSetCategoryData();

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        <Link 
            className="align-self-center" to={`/categories/${id}`}>
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{category}</strong>
      </div>
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {!mobile && currentUser &&
          (subscribe_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
              onClick={() => {}}
            >
              unsubscribe
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Black}`}
              onClick={() => handleSubscribe(category, currentUser)}
            >
              subscribe
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Category;