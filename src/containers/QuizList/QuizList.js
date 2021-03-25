import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./QuizList.module.css";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";

const QuizList = () => {
  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(true);

  const renderQuizes = () => {
    return quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
        </li>
      );
    });
  };

  useEffect(() => {
    async function getQuizList() {
      try {
        const response = await axios.get("/quizes.json");
        const quizes = [];
        Object.keys(response.data).forEach((key, index) => {
          quizes.push({
            id: key,
            name: `Тест №${index + 1}`,
          });
        });
        setQuizes(quizes);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getQuizList();
  }, []);

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
