import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./QuizList.module.css";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from "redux";

const QuizList = () => {
  // const [quizes, setQuizes] = useState([]);
  // const [loading, setLoading] = useState(true);

  const renderQuizes = () => {
    return props.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
        </li>
      );
    });
  };

  useEffect(() => {
    props.fetchQuizes();
    // async function getQuizList() {
    //   try {
    //     const response = await axios.get("/quizes.json");
    //     const quizes = [];
    //     Object.keys(response.data).forEach((key, index) => {
    //        quizes.push({
    //         id: key,
    //         name: `Тест №${index + 1}`,
    //       });
    //     });
    //     break;
    //     setQuizes(quizes);
    //     setLoading(false);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    // getQuizList();
  }, []);

  return (
    <div className={styles.QuizList}>
      <div>
        <h1>Список тестів</h1>
        {props.loading && props.quizes.length !== 0 ? (
          <Loader />
        ) : (
          <ul>{renderQuizes()}</ul>
        )}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
