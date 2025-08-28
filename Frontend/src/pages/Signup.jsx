import React, { useContext, useState } from "react";
import "./Signup.css";
import { DataContext } from "../context/UserContext";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const { serverUrl, setUserData } = useContext(DataContext);
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      axios
        .post(
          `${serverUrl}/sign-up`,
          {
            userName,
            email,
            password,
          },
          { withCredentials: true }
        )
        .then((response) => {
          setUserData(response.data);
          navigate("/");
          toast.success("Signup Successfully");
          setLoader(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoader(false);
        });
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div
        style={{
          height: "12vh",
          borderBottom: "1px solid rgb(225, 224, 224)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Logo />
      </div>
      <div className="sign-up-container">
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h1 style={{ color: "#ff385c" }}>Sign Up</h1>
          <input
            type="text"
            placeholder="User Name ..."
            value={userName}
            required
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Email ..."
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <input
            type="password"
            placeholder="Password ..."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            Sign Up {loader && <div className="loader"></div>}
          </button>
          <div style={{ display: "flex" }}>
            <pre>Do you have an account? </pre>
            <NavLink
              style={{ color: "#ff385c", textDecoration: "none" }}
              to={"/login"}
            >
              Login
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
