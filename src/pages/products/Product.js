import React from "react";
import styles from "../../styles/Product.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

const Product = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    reviews_count,
    favourited_count,
    favourite_id,
    title,
    description,
    image,
    updated_at,
    category,
    average_rating,
    productPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <Card className={styles.Product}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{average_rating}</span>
            {is_owner && productPage && "..."}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/products/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {description && <Card.Text>{description}</Card.Text>}
        <div className={styles.ProductBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : favourite_id ? (
            <span onClick={() => {}}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={() => {}}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to favourite products!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          
          {favourited_count}
          <Link to={`/products/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {reviews_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;