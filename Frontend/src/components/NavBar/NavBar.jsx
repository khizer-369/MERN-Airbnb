import React, { useContext, useEffect, useState } from "react";
import Logo from "../Logo";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { DataContext } from "../../context/UserContext";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NavBar = () => {
  const { serverUrl, userData, setUserData } = useContext(DataContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState();

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const logOut = () => {
    try {
      axios
        .post(`${serverUrl}/log-out`, {}, { withCredentials: true })
        .then((response) => {
          setUserData(null);
          navigate("/");
          toast.success(response.data.message);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData) {
      setUserName(userData.userName.charAt(0).toUpperCase());
    }
  }, [userData]);

  return (
    <div className="nav-bar-container">
      <Logo />

      <div className="nav-bar-right-side">
        <div className="user-name">
          {userData ? (
            <div className="user-name">{userName}</div>
          ) : (
            <div className="empty-profile-image"></div>
          )}
        </div>
        <div className="nav-bar-nav" onClick={toggleDropdown}>
          <div className="hamburger-dropdown">
            <GiHamburgerMenu style={{ fontSize: "25px" }} />
            <ul
              style={{ display: dropdownOpen ? "block" : "none" }}
              className="dropdown-menu"
            >
              {!userData && (
                <li>
                  <NavLink to={"/sign-up"} style={{ textDecoration: "none" }}>
                    <div>Sign Up</div>
                  </NavLink>
                </li>
              )}
              {!userData && (
                <li>
                  <NavLink to={"/login"} style={{ textDecoration: "none" }}>
                    <div>Login</div>
                  </NavLink>
                </li>
              )}
              {userData && (
                <NavLink to={"/listing"} style={{ textDecoration: "none" }}>
                  <li>
                    <div>List Your Home</div>
                  </li>
                </NavLink>
              )}
              {userData && (
                <NavLink to={"/my-listing"} style={{ textDecoration: "none" }}>
                  <li>
                    <div>My Listing</div>
                  </li>
                </NavLink>
              )}
              {userData && (
                <NavLink to={"/my-booking"} style={{ textDecoration: "none" }}>
                  <li>
                    <div>My Booking</div>
                  </li>
                </NavLink>
              )}
              {userData && (
                <li>
                  <div style={{ color: "#dc2626" }} onClick={logOut}>
                    Log Out
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
