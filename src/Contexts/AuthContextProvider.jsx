import React, { createContext, useEffect, useState } from "react";
import { getUserDataApi } from "../Services/AuthApi";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") != null
  );

  async function getUserData() {
    const response = await getUserDataApi();
    console.log(response);
    
    if (response.message == "success") {
      setUserData(response.user);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      getUserData()
    }else{
      setUserData(null)
    }
  }, [isLoggedIn]);

  return (
    <authContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userData, setUserData }}
    >
      {children}
    </authContext.Provider>
  );
}
