import React from 'react';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';
import Tasks from './Tasks/Tasks';
import '../../styles/DashBoard/DashBoard.css';

function TeachersDashboard() {
  return (
    <div className="dashboard-container">
      <Header />
      <SideBar className="side-bar" />
      <div className="main">
        <Tasks  userRole="teacher"/>
      </div>
    </div>
  );
}

export default TeachersDashboard;
