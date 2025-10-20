import React, { useContext } from "react";
import { authContext } from "../Contexts/AuthContextProvider";
import LoginPage from "../Pages/LoginPage/LoginPage";

export default function ProtectedRoute({ children }) {
  const {isLoggedIn} = useContext(authContext)
  return isLoggedIn ? children : <LoginPage />;
}
