import React from "react";
import styles from "./MenuToogle.module.css";

const MenuToogle = (props) => {
  const classes = [styles.MenuToggle, "fa"];
  if (props.isOpen) {
    classes.push("fa-times");
    classes.push(styles.open);
  } else {
    classes.push("fa-bars");
  }
  return <i className={classes.join(" ")} onClick={props.onToggle} />;
};

export default MenuToogle;
