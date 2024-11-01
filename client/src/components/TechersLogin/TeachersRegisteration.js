import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../utils/api";
import LeftsideBanner from "./LeftsideBanner";
import "../../styles/LoginScreen.css";

const TeachersRegisteration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [userType, setUserType] = useState("Teacher");

  const navigate = useNavigate();

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match"); // Show alert popup
      return; // Stop execution if there's an error
    }
    try {
      await apiService.register({ email, password, userType });
      navigate("/Login");
      alert("User Created Successfully");
    } catch (error) {
      //  alert(`Invalid credentials for ${userType}`);
      setErrors({ general: error.response?.data?.message || "Server error" });
    }
  };

  return (
    <div className="container">
      <LeftsideBanner />
      <div className="login-right">
        <h2>Register</h2>
        <p>
          If U Are New Teacher then Please register with your email ID and
          password
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User Type:</label>
            <select
              value={userType}
              onChange={handleUserTypeChange}
              className="selectOption">
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
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="form-input">
              <i class="fa-solid fa-key"></i>
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <div className="form-input">
              <i class="fa-solid fa-key"></i>
              <input
                type="password"
                placeholder="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
          </div>
          <button type="submit" className="login-button">
            Register
          </button>
          {errors.general && <p className="error">{errors.general}</p>}
        </form>
      </div>
    </div>
  );
};

export default TeachersRegisteration;
