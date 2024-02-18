import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Button } from "react-bootstrap";


const Category = (props) => {
  const { category, mobile, imageSize = 55 } = props;
  const { id, subscriptions_count, subscribe_id, product_count,} = category;

  const currentUser = useCurrentUser();

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
              onClick={() => {}}
            >
              subscribe
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Category;