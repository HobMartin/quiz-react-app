import React, { useState } from "react";
import styles from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import axios from "axios";

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function Auth(props) {
  const [formValid, setFromValid] = useState(false);
  const [formsControls, setFormControls] = useState({
    email: {
      value: "",
      type: "email",
      label: "Email",
      errorMassage: "Input valid email",
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true,
      },
    },
    passwords: {
      value: "",
      type: "password",
      label: "Password",
      errorMassage: "Input valid password",
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6,
      },
    },
  });

  const loginHandler = async () => {
    const authData = {
      email: formsControls.email.value,
      password: formsControls.passwords.value,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCwgmgtVbZcKooZWFpo8SPVNN5t2hzRAKQ",
        authData
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const signupHandler = async () => {
    const authData = {
      email: formsControls.email.value,
      password: formsControls.passwords.value,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCwgmgtVbZcKooZWFpo8SPVNN5t2hzRAKQ",
        authData
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const validateControl = (value, validation) => {
    if (!validation) {
      return true;
    }
    let isValid = true;
    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }
    return isValid;
  };

  const onChangeHandler = (e, controlName) => {
    const formControls = { ...formsControls };
    const control = { ...formControls[controlName] };

    control.value = e.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);
    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    setFormControls(formControls);
    setFromValid(isFormValid);
  };

  const renderInputs = () => {
    return Object.keys(formsControls).map((controlName, index) => {
      const control = formsControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMassage={control.errorMassage}
          onChange={(event) => onChangeHandler(event, controlName)}
        />
      );
    });
  };
  return (
    <div className={styles.Auth}>
      <div>
        <h1>Auth</h1>

        <form onSubmit={submitHandler} className={styles.AuthForm}>
          {renderInputs()}
          <Button type="success" onClick={loginHandler} disabled={!formValid}>
            Log In
          </Button>
          <Button type="primary" onClick={signupHandler} disabled={!formValid}>
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
