import React from "react";
import styles from "./FinishedQuiz.module.css";

const FinishedQuiz = (props) => {
  console.log(props);
  return (
    <div className={styles.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, index) => {
          console.log(quizItem.id);
          console.log(props.results[quizItem.id]);
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
      <p>Rigth 4 from 15</p>
      <div>
        <button>Repeat</button>
      </div>
    </div>
  );
};

export default FinishedQuiz;
