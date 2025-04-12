import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

function Notifications() {
  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <Navbar />
          <div className="main-content">
            <div className="bodyContainer2">
              <h1>Notifications</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notifications;
