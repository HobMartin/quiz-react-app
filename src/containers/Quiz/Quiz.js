import React, { useEffect, useState } from "react";
import styles from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";

// {
//   question: "Що таке осінь?",
//   rightAnswerId: 4,
//   id: 1,
//   answers: [
//     { text: "Пора року", id: 1 },
//     { text: "Стан душі", id: 2 },
//     { text: "Що таке осінь?", id: 3 },
//     { text: "Це небо", id: 4 },
//   ],
// },
// {
//   question: "Як батончик Mars пов'язаний з Карлом Марксом?",
//   rightAnswerId: 2,
//   id: 2,
//   answers: [
//     { text: "Ляпис Трубецкой - Капитал", id: 1 },
//     { text: "На Марсі була колонія Радянського союзу", id: 2 },
//     { text: "Незнаю, я люблю праву паличку Twix", id: 3 },
//     { text: "Незнаю, я люблю ліву паличку Twix", id: 4 },

function Quiz(props) {
  const [quiz, setQuiz] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answerState, setAnswerState] = useState(null);
  const [isFinish, setIsFinish] = useState(false);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);

  const onAnswerClickHandler = (answerId) => {
    if (answerState) {
      const key = Object.keys(answerState)[0];
      if (answerState[key] === "success") {
        return;
      }
    }

    const question = quiz[activeQuestion];
    const result = results;
    console.log(result[answerId]);
    if (question.rightAnswerId === answerId) {
      if (!result[question.id]) {
        result[question.id] = "success";
      }
      setResults(result);
      setAnswerState({ [answerId]: "success" });
      const timeout = window.setTimeout(() => {
        if (isQuizFinish()) {
          setIsFinish(true);
        } else {
          setActiveQuestion(activeQuestion + 1);
          setAnswerState(null);
        }

        window.clearTimeout(timeout);
      }, 1000);
    } else {
      result[question.id] = "error";
      setAnswerState({ [answerId]: "error" });
      setResults(result);
    }
  };

  useEffect(() => {
    async function getQuiz() {
      try {
        const response = await axios.get(
          `/quizes/${props.match.params.id}.json`
        );
        const quiz = response.data;
        setQuiz(quiz);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getQuiz();
  }, [props.match.params.id]);
  const isQuizFinish = () => {
    return activeQuestion + 1 === quiz.length;
  };

  const retryHandler = () => {
    setActiveQuestion(0);
    setAnswerState(null);
    setIsFinish(false);
    setResults({});
  };
  return (
    <div className={styles.Quiz}>
      <div className={styles.QuizWrapper}>
        <h1>Дайте відповіді на запитання</h1>

        {loading ? (
          <Loader />
        ) : isFinish ? (
          <FinishedQuiz results={results} quiz={quiz} onRetry={retryHandler} />
        ) : (
          <ActiveQuiz
            answers={quiz[activeQuestion].answers}
            question={quiz[activeQuestion].question}
            onAnswerClick={onAnswerClickHandler}
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
