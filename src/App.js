import React from "react";
import Layout from "./hoc/Layout/Layout";
import { Route, Switch, Redirect } from "react-router-dom";
import Quiz from "./containers/Quiz/Quiz";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import { useSelector } from "react-redux";
import Logout from "./components/Logout/Logout";

function App() {
  const isAuthenticated = useSelector((state) => !!state.auth.token);

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/quiz-creator" component={QuizCreator} />
      <Route path="/quiz/:id" component={Quiz} />
      <Route path="/" component={QuizList} />
      <Redirect to="/" />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/quiz-creator" component={QuizCreator} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" component={QuizList} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return <Layout>{routes}</Layout>;
}

export default App;
