import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TeachersLogin from "./components/TechersLogin/TechersLogin";
import TeachersRegisteration from "./components/TechersLogin/TeachersRegisteration";
import TeachersDashboard from "./components/TeachersDashboard/TeachersDashboard";
import LandingPage from "./components/LandingPage/LandingPage";
import PrincipalDaboard from "./components/PrincipalDashboard/PrincipalDaboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Principal-Dashboard" element={<PrincipalDaboard />} />
        <Route path="/Login" element={<TeachersLogin />} />
        <Route path="/Teachers-Register" element={<TeachersRegisteration />} />
        <Route path="/Teachers-Dashboard" element={<TeachersDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
