import React, { useEffect } from "react";
import styles from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchQuizById,
  quizAnswerClick,
  retryQuiz,
} from "../../store/actions/quiz";

function Quiz(props) {
  const {
    results,
    isFinish,
    activeQuestion,
    answerState,
    quiz,
    loading,
  } = useSelector((state) => ({
    results: state.quiz.results,
    isFinish: state.quiz.isFinish,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuizById(props.match.params.id));
    return function cleanup() {
      dispatch(retryQuiz());
    };
  }, [dispatch, props.match.params.id]);

  return (
    <div className={styles.Quiz}>
      <div className={styles.QuizWrapper}>
        <h1>Дайте відповіді на запитання</h1>

        {loading || !quiz ? (
          <Loader />
        ) : isFinish ? (
          <FinishedQuiz
            results={results}
            quiz={quiz}
            onRetry={() => dispatch(retryQuiz())}
          />
        ) : (
          <ActiveQuiz
            answers={quiz[activeQuestion].answers}
            question={quiz[activeQuestion].question}
            onAnswerClick={(id) => dispatch(quizAnswerClick(id))}
            quizLength={quiz.length}
            answerNumber={activeQuestion + 1}
            state={answerState}
          />
        )}
      </div>
    </div>
  );
}

export default Quiz;
