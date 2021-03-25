import React from "react";
import styles from "./Loader.module.css";

const Loader = (props) => {
  return (
    <div className={styles.Center}>
      <div className={styles.Loader}>
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loader;
