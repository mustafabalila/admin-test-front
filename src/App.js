import React from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initAuth } from "./features/auth/authSlice";
import Dashboard from "./features/dashboard/Dashboard";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import PrivateRoute from "./features/common/PrivateRoute";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
