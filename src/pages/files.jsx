import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

function Files() {
  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <Navbar />
          <div className="main-content">
            <div className="bodyContainer">
              <h1>Files</h1>
            </div>
            <div className="activityContainer">
              <h2>My Hub Activity</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Files;
