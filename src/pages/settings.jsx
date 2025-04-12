import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

function Settings() {
  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <Navbar />
          <div className="main-content">
            <div className="bodyContainer2">
              <h1>Settings</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
