import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./QuizList.module.css";
import Loader from "../../components/UI/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuizes } from "../../store/actions/quiz";

const QuizList = () => {
  const quizes = useSelector((state) => state.quiz.quizes);
  const loading = useSelector((state) => state.quiz.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuizes());
  }, [dispatch]);

  const renderQuizes = () => {
    return quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
        </li>
      );
    });
  };

  return (
    <div className={styles.QuizList}>
      <div>
        <h1>Список тестів</h1>
        {loading ? <Loader /> : <ul>{renderQuizes()}</ul>}
      </div>
    </div>
  );
};

export default QuizList;
