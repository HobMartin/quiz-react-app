import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./QuizList.module.css";

const QuizList = () => {
  const renderQuizes = () => {
    return [1, 2, 3].map((quiz, index) => {
      return (
        <li key={index}>
          <NavLink to={"/quiz/" + quiz}>Test {quiz}</NavLink>
        </li>
      );
    });
  };
  console.log(renderQuizes);
  return (
    <div className={styles.QuizList}>
      <div>
        <h1>Список тестів</h1>
        <ul>{renderQuizes()}</ul>
      </div>
    </div>
  );
};

export default QuizList;
