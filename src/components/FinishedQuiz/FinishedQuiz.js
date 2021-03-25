import React from "react";
import styles from "./FinishedQuiz.module.css";
import Buttom from "../UI/Button/Button";

const FinishedQuiz = (props) => {
  console.log(props);
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === "success") {
      total++;
    }
    return total;
  }, 0);

  return (
    <div className={styles.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, index) => {
          console.log(quizItem.id);
          console.log(props.results);
          const classes = [
            "fa",
            props.results[quizItem.id] === "error" ? "fa-times" : "fa-check",
            styles[props.results[quizItem.id]],
          ];
          return (
            <li key={quizItem.id}>
              <strong>{index + 1}</strong>.&nbsp;
              {quizItem.question}
              <i className={classes.join(" ")} />
            </li>
          );
        })}
      </ul>
      <p>
        Правильних {successCount} з {props.quiz.length}
      </p>
      <div>
        <Buttom onClick={props.onRetry} type="primary">
          Повторити
        </Buttom>
        <Buttom type="success">Перейти до списку тестів</Buttom>
      </div>
    </div>
  );
};

export default FinishedQuiz;
