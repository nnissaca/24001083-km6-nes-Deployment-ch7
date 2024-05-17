import React, { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AfterLogIn from "./components/AfterLogIn";
import BeforeLogIn from "./components/BeforeLogIn";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [location]);

  useEffect(() => {
    const handleNavigation = () => {
      const path = window.location.pathname;
      const token = localStorage.getItem("token");
      if (path === "/home" && !token) {
        navigate("/");
        alert("You've to Login First!");
      } else if (path === "/" && token) {
        alert(
          "Remember, You're Still Logged In, You Can Logout to Return to the Non-Logged in View."
        );
        navigate("/home");
      }
    };
    handleNavigation();
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      setLoggedIn(false);
      navigate("/"); // Navigate back to "/" after logout
    }
  };

  return (
    <>
      {loggedIn ? <AfterLogIn handleLogout={handleLogout} /> : <BeforeLogIn />}
    </>
  );
}
