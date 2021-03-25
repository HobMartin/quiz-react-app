import React from "react";
import styles from "./Backdrop.module.css";

const Backdrop = (props) => (
  <div className={styles.Backdrop} onClick={props.onClose} />
);

export default Backdrop;
