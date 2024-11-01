import React from 'react'
import Header from '../TeachersDashboard/Header/Header';
import SideBar from '../TeachersDashboard/SideBar/SideBar';
import Tasks from '../TeachersDashboard/Tasks/Tasks';
import '../../styles/DashBoard/DashBoard.css';

function PrincipalDaboard() {
  return (
    <div className="dashboard-container">
      <Header />
      <SideBar className="side-bar" />
      <div className="main">
        <Tasks  userRole="principal"/>
      </div>
    </div>
  );
}

export default PrincipalDaboard