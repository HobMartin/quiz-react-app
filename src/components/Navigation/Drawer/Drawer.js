import React from "react";
import styles from "./Drawer.module.css";
import { NavLink } from "react-router-dom";
import Backdrop from "../../UI/Backdrop/Backdrop";
// import { useSelector } from "react-redux";

// const links = [
//   { to: "/", label: "Список", exec: true },
//   { to: "/auth", label: "Авторизування", exec: false },
//   { to: "/quiz-creator", label: "Створити тест", exec: false },
// ];

function Drawer(props) {
  const clickHandler = () => {
    props.onClose();
  };

  const renderLinks = (links) => {
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

  const links = [
    { to: "/", label: "Список", exec: true },
    { to: "/auth", label: "Авторизування", exec: false },
    { to: "/quiz-creator", label: "Створити тест", exec: false },
  ];

  if (props.isAuthenticated) {
    links.push({ to: "/quiz-creator", label: "Створити тест", exec: false });
    links.push({ to: "/logout", label: "Вийти", exec: false });
  } else {
    links.push({ to: "/auth", label: "Авторизування", exec: false });
  }

  return (
    <>
      <nav className={classes.join(" ")}>
        <ul>{renderLinks(links)}</ul>
      </nav>
      {props.isOpen ? <Backdrop onClose={props.onClose} /> : null}
    </>
  );
}

export default Drawer;
