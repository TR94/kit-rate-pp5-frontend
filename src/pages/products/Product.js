import React from "react";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/Product.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { DisplayAvgRating } from "../../components/DisplayAvgRating";


const Product = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        review_count,
        favourited_count,
        favourite_id,
        title,
        description,
        image,
        category,
        category_detail,
        average_rating,
        productPage,
        setProducts,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post("/favourites/", { product: id });
            setProducts((prevProducts) => ({
                ...prevProducts,
                results: prevProducts.results.map((product) => {
                    return product.id === id
                        ? { ...product, favourited_count: product.favourited_count + 1, favourite_id: data.id }
                        : product;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/favourites/${favourite_id}/`);
            setProducts((prevProducts) => ({
                ...prevProducts,
                results: prevProducts.results.map((product) => {
                    return product.id === id
                        ? { ...product, favourited_count: product.favourited_count - 1, like_id: null }
                        : product;
                }),
            }));
        } catch (err) {
            console.log(err);
        };
    };

    const handleEdit = () => {
        history.push(`/products/${id}/edit`);
    };
    
    const handleDelete = async () => {
    try {
        await axiosRes.delete(`/products/${id}/`);
        history.goBack();
    } catch (err) {
        console.log(err);
    }
    };

    return (
        <Card className={styles.Product}>
            <Card.Body>
                <Media className="align-items-center justify-content-between">
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={55} />
                        {owner}
                    </Link>
                    <div className="d-flex align-items-center">
                        <span><DisplayAvgRating avg_rating={average_rating} /></span>
                        {is_owner && productPage && <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete}/>}
                    </div>
                </Media>
            </Card.Body>
            <Link to={`/products/${id}`}>
                <Card.Img src={image} alt={title} />
            </Link>
            <Card.Body>
                <Link to={`/categories/${category}`}>
                    {category_detail && <Card.Title>{category_detail.category}</Card.Title>}
                </Link>
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
                        <span onClick={handleUnlike}>
                            <i className={`fas fa-heart ${styles.Heart}`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleLike}>
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
                    {review_count}
                </div>
            </Card.Body>
        </Card>
    )
}

export default Product;