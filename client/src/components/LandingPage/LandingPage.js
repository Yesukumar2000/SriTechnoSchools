import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/LandingPage.css";
import logo from "../../assets/images/image.png";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="root-container">
      <header className="navbar">
        <div className="logo-name-container">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="school-name">Sri Techno Schools</h1>
        </div>
        <button className="Login-button"  onClick={() => {
                navigate("/Login");
              }}>Login</button>
      </header>

      <section className="main-content">
        <div className="overlay"></div>
        <div className="content">
          <h2 className="Title">Welcome to Our Sri Techno Schools</h2>
          <p className="description">
            Empowering students and fostering innovation in education
          </p>
          <div className="button-container">
            <button
              className="action-button"
              onClick={() => {
                navigate("/Login");
              }}>
              Principal
            </button>
            <button
              className="action-button"
              onClick={() => {
                navigate("/Login");
              }}>
              Management
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
