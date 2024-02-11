import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "../styles/Asset.module.css";

const Asset = ({ spinner, src, message }) => {
    // reusable component that can display items depending on which prop is passed to it
    return (
        <div className={`${styles.Asset} p-4`}>
            {spinner && <Spinner animation="border" />}
            {src && <img src={src} alt={message} />}
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
};

export default Asset;