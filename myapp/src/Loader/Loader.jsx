import React from 'react'
import styles from './style.module.css';
import Loader from "react-js-loader";

const LoadingSpinner = () => {
  return (
    <div className={styles["loader-overlay"]}>
  <div className={styles.loader}>
    <Loader type="bubble-top" bgColor={"white"}   size={100} />
  </div>
</div>
  )
}

export default LoadingSpinner