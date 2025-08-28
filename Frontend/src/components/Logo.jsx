import React from "react";
import logoImage from "../assets/airbnb.png";
import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <div
      style={{
        width: "130px",
      }}
    >
      <NavLink
        style={{
          display: "flex",
          textDecoration: "none",
          justifyContent: "center",
          alignItems: "center",
        }}
        to={"/"}
      >
        <img style={{ height: "40px" }} src={logoImage} alt="Airbnb Logo" />
        <h2 style={{ color: "#ff385c" }}>airbnb</h2>
      </NavLink>
    </div>
  );
};

export default Logo;
