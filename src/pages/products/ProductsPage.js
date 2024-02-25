import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/ProductsPage.module.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Product from "./Product";

import NoResults from "../../assets/no-results.png";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularCategories from "../categories/PopularCategories";

function ProductsPage({ message, filter = "" }) {

    const [products, setProducts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const {pathname} = useLocation();
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const {data} = await axiosReq.get(`/products/?${filter}search=${query}`)
                setProducts(data)
                setHasLoaded(true)
            } catch (err) {
                console.log(err)
            };
        };
        setHasLoaded(false)
        // timer to reduce amount of API requests in searchbar - waits 1 sec before making request
        const timer = setTimeout(() => {
            fetchPosts();
        }, 1000)
        return () => {
            clearTimeout(timer)
        };

    },[filter, query, pathname])

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <PopularCategories mobile/>
                <i className={`fas fa-search ${styles.SearchIcon}`} />
                <Form
                className={styles.SearchBar}
                onSubmit={(event) => event.preventDefault()}
                >
                <Form.Control
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    type="text"
                    className="mr-sm-2"
                    placeholder="Search products"
                />
                </Form>

                {hasLoaded ? (
                    <>
                        {products.results.length ? (
                            <InfiniteScroll 
                                children = {
                                    products.results.map(product => (
                                        <Product key={product.id} {...product} setProducts={setProducts}/>
                                    ))
                                }
                                dataLength={products.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!products.next}
                                next={() => fetchMoreData(products, setProducts)}
                            />
                            
                            ):
                                <Container className={appStyles.Content}>
                                    <Asset src={NoResults} message={message}/>
                                </Container>
                        }
                    </>
                ):(
                    <Container className={appStyles.Content}>
                        <Asset spinner />
                    </Container>
                )};
            </Col>
            <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                <PopularCategories />
            </Col>
        </Row>
    );
};

export default ProductsPage;