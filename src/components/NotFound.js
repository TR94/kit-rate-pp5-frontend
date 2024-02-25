import React from 'react';
import NoResults from "../assets/no-results.png";
import Asset from './Asset';
import styles from "../styles/NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.NotFound}>
        <Asset className={styles.NotFound}
            src={NoResults}
            message="Sorry, the page you are looking for does not exist"
        />
    </div>
  );
};

export default NotFound