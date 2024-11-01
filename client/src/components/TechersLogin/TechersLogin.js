import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../utils/api";
import LeftsideBanner from "./LeftsideBanner";
import { Link } from "react-router-dom";
import "../../styles/LoginScreen.css";

function TeachersLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Teacher"); 

 const handleUserTypeChange = (event) => {
  setUserType(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userType === "Principal" && email === "principal@gmail.com" && password === "123456") {
        // Login Principal
        alert("Welcome to Sri Techno School Principal Account!");
        navigate("/Principal-Dashboard");
      } else {
        // Attempt Teacher Login (Management)
        const response = await apiService.login({ email, password, userType });
        
        // if (response.status === 400) {
        //   const data = await response.json();
        //   alert(data.message || `Invalid credentials for ${userType}`);
        // } else 
        if (response.user && userType === "Teacher") {
          alert("Welcome to Sri Techno School Management Account!");
          navigate("/Teachers-Dashboard");
        } else {
          const errorData = await response.json();
          alert(errorData.message || `Invalid credentials for ${userType}`);
        }
      }
    } catch (error) {
      alert(`Invalid credentials for ${userType}`);
    }
  };
  

  return (
    <>
      <div className="container">
        <LeftsideBanner />
        <div className="login-right">
        <h2>
            {userType === "Principal" ? "Principal " : "Management "} Login
          </h2>
        <p>If U Are Teacher or Facality then  Please login to your account with the email ID and password</p>
          <Link to="/" className="forgot-password">
           Home
          </Link>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
              <label>User Type:</label>
              <select value={userType} onChange={handleUserTypeChange} className="selectOption" required>
                <option value="Principal">Principal</option>
                <option value="Teacher">Management</option>
              </select>
            </div>
          <div className="form-group">
            <label>Email ID</label>
            <div className="form-input">
            <i class="fa-regular fa-envelope"></i>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            </div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="form-input">
            <i class="fa-solid fa-key"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            </div>
          </div>
          <Link to="/Teachers-Register" className="forgot-password">
            Forgot Password?
          </Link>
          <button type="submit" className="login-button">
            Login
          </button>
          <br></br>
          <button
            type="button"
            onClick={() => {
              navigate("/Teachers-Register");
            }}
            className="login-button">
            New Teacher
          </button>
        </form>
      </div>
      </div>
    </>
  );
}

export default TeachersLogin;