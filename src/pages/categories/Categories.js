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
  const {handleSubscribe, handleUnsubscribe} = useSetCategoryData();

  return (
    <div
      className={"my-3 d-flex align-items-center flex-column"}
    >
        <Link 
            className="align-self-center" to={`/categories/${id}`}>
              <strong>{category}</strong>
        </Link>
      <div className={`text-left ${!mobile && "ml-0"}`}>
        {!mobile && currentUser &&
          (subscribe_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.BlackOutline} ${styles.Subscribe} d-flex justify-content-around`}
              onClick={() => handleUnsubscribe(category, currentUser)}
            >
              unsubscribe
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Black} d-flex justify-content-around`}
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