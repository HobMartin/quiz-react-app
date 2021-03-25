import React from "react";
import styles from "./Drawer.module.css";
import { NavLink } from "react-router-dom";
import Backdrop from "../../UI/Backdrop/Backdrop";

const links = [
  { to: "/", label: "Список", exec: true },
  { to: "/auth", label: "Авторизування", exec: false },
  { to: "/quiz-creator", label: "Створити тест", exec: false },
];

function Drawer(props) {
  const clickHandler = () => {
    props.onClose();
  };

  const renderLinks = () => {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exec}
            activeClassName={styles.active}
            onClick={clickHandler}
          >
            {link.label}
          </NavLink>
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
