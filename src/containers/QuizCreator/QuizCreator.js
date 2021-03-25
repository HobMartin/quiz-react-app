import React, { useState } from "react";
import styles from "./QuizCreator.module.css";
import Button from "../../components/UI/Button/Button";
import Select from "../../components/UI/Select/Select";
import Input from "../../components/UI/Input/Input";
import {
  createControl,
  validate,
  validateForm,
} from "../../form/formFramework";

const QuizCreator = () => {
  const submitHandler = (event) => {
    event.preventDefault();
  };

  const createQuizHandler = (event) => {
    event.preventDefault();
  };

  const createOptionControll = (number) => {
    return createControl(
      {
        label: `Варіант ${number}`,
        errorMassage: "Значення не можe бути пусте",
        id: number,
      },
      { required: true }
    );
  };

  const createFormsControls = () => {
    return {
      question: createControl(
        {
          label: "Введіть запитання",
          errorMassage: "Питання не може бути пусте",
        },
        { required: true }
      ),
      option1: createOptionControll(1),
      option2: createOptionControll(2),
      option3: createOptionControll(3),
      option4: createOptionControll(4),
    };
  };

  const addQuestionHandler = (event) => {
    event.preventDefault();

    const quizCopy = quiz.concat();
    const index = quizCopy.length + 1;

    const { question, option1, option2, option3, option4 } = formControls;

    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    };
    quizCopy.push(questionItem);

    setQuiz({ quizCopy });
    setIsFormValid(false);
    setRightAnswerId(1);
    setFormControls(createFormsControls());
  };
  const [rightAnswerId, setRightAnswerId] = useState(1);
  const [isFormValid, setIsFormValid] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const [formControls, setFormControls] = useState(createFormsControls());

  const changeHandler = (value, controlName) => {
    const formsCtrl = { ...formControls };
    const control = { ...formsCtrl[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formsCtrl[controlName] = control;
    setFormControls(formsCtrl);
    setIsFormValid(validateForm(formsCtrl));
  };

  const renderControls = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];
      return (
        <React.Fragment key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMassage={control.errorMassage}
            onChange={(event) => changeHandler(event.target.value, controlName)}
          />
          {index === 0 ? <hr /> : null}
        </React.Fragment>
      );
    });
  };

  const selectChangeHandler = (e) => {
    setRightAnswerId(+e.target.value);
  };

  const select = (
    <Select
      label="Виберіть правильну відповідь"
      value={rightAnswerId}
      onChange={selectChangeHandler}
      options={[
        { text: 1, value: 1 },
        { text: 2, value: 2 },
        { text: 3, value: 3 },
        { text: 4, value: 4 },
      ]}
    />
  );

  return (
    <div className={styles.QuizCreator}>
      <div>
        <h1>Create test</h1>

        <form onSubmit={submitHandler}>
          {renderControls()}
          {select}
          <Button
            type="primary"
            onClick={addQuestionHandler}
            disabled={!isFormValid}
          >
            Add question
          </Button>

          <Button
            type="success"
            onClick={createQuizHandler}
            disabled={quiz.length === 0}
          >
            Create test
          </Button>
        </form>
      </div>
    </div>
  );
};

export default QuizCreator;
