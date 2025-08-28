import React, { useContext, useState } from "react";
import Logo from "../components/Logo";
import "./Login.css";
import { NavLink } from "react-router-dom";
import { DataContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { serverUrl, setUserData } = useContext(DataContext);
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
          `${serverUrl}/login`,
          {
            email,
            password,
          },
          { withCredentials: true }
        )
        .then((response) => {
          setUserData(response.data);
          navigate("/");
          toast.success("Login Successfully");
          setLoader(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoader(false);
        });
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
      <div className="login-container">
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h1 style={{ color: "#ff385c" }}>Login</h1>
          <input
            type="email"
            placeholder="Email ..."
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            Login {loader && <div className="loader"></div>}
          </button>
          <div style={{ display: "flex" }}>
            <pre>Don't have an account yet? </pre>
            <NavLink
              style={{ color: "#ff385c", textDecoration: "none" }}
              to={"/sign-up"}
            >
              Sign Up
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
