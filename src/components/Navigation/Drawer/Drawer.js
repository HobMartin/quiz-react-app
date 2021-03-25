import React from "react";
import styles from "./Drawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const links = [1, 2, 3];

function Drawer(props) {
  const renderLinks = () => {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <a>Link {link}</a>
        </li>
      );
    });
  };
  const classes = [styles.Drawer];
  if (!props.isOpen) {
    classes.push(styles.close);
  }
  return (
    <>
      <nav className={classes.join(" ")}>
        <ul>{renderLinks()}</ul>
      </nav>
      {props.isOpen ? <Backdrop onClose={props.onClose} /> : null}
    </>
  );
}

export default Drawer;
