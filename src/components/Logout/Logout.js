import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(logout());
  }, [dispatch]);
  return <Redirect to={"/"} />;
};

export default Logout;
