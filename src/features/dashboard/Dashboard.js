import React from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../auth/authSlice";
import AdminView from "./AdminView";

export default function Dashboard(props) {
  const { user } = useSelector(selectAuth);
  React.useEffect(() => {}, [user]);
  return user?.role === "admin" ? <AdminView /> : <h1>Dashboard</h1>;
}
