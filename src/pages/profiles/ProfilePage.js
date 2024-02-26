import React from 'react';
import Asset from '../../components/Asset';
import styles from "../../styles/ProfilePage.module.css"
import DefaultProfile from "../../assets/default_profile.jpg"

const ProfilePage = () => {
  return (
    <div className={styles.Default}>
        <Asset className={styles.Rounded}
            src={DefaultProfile}
            message="Sorry, the profile page is currently under construction"
        />
    </div>
  );
};

export default ProfilePage