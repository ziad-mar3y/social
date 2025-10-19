import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../Contexts/AuthContextProvider";
import LoginPage from "../Pages/LoginPage/LoginPage";

export default function ProtectedRoute({ children }) {
  const {isLoggedIn} = useContext(authContext)
  return isLoggedIn ? children : <LoginPage />;
}
