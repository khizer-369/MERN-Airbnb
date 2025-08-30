import React, { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";

export const DataContext = createContext();

const UserContext = ({ children }) => {
  const serverUrl = "https://mern-airbnb-eight.vercel.app/api";
  const [userData, setUserData] = useState();

  const getUser = () => {
    setUserData(null);
    try {
      axios
        .post(`${serverUrl}/get-user`, {}, { withCredentials: true })
        .then((response) => {
          setUserData(response.data);
        })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const data = { serverUrl, userData, setUserData };

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export default UserContext;
