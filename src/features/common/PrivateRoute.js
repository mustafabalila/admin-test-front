import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../auth/authSlice";

export default function PrivateRoute(props) {
  const { isAuthenticated } = useSelector(selectAuth);
  return isAuthenticated ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/login" />
  );
}
